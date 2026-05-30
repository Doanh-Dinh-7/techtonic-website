#!/usr/bin/env node
/**
 * Enforces First Load JS budgets from bundle-budgets.json.
 * Prefers Next.js build log; falls back to .next/app-build-manifest.json.
 *
 * Usage:
 *   npm run build 2>&1 | tee build-output.log
 *   node scripts/check-bundle-budget.mjs [build-output.log]
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const budgetsPath = join(root, "bundle-budgets.json");
const logPath = process.argv[2] ?? join(root, "build-output.log");
const manifestPath = join(root, ".next", "app-build-manifest.json");
const staticDir = join(root, ".next", "static");

if (!existsSync(budgetsPath)) {
  console.error("Missing bundle-budgets.json");
  process.exit(1);
}

const budgets = JSON.parse(readFileSync(budgetsPath, "utf8"));

/** @type {Map<string, number>} */
const routeFirstLoadKb = new Map();
let sharedKb = null;

function sumUniqueChunks(chunkPaths) {
  const seen = new Set();
  let totalBytes = 0;
  for (const chunk of chunkPaths) {
    if (seen.has(chunk)) continue;
    seen.add(chunk);
    const filePath = join(staticDir, chunk.replace(/^static\//, ""));
    if (existsSync(filePath)) {
      totalBytes += statSync(filePath).size;
    }
  }
  return totalBytes / 1024;
}

function parseFromManifest() {
  if (!existsSync(manifestPath)) {
    return false;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const pages = manifest.pages ?? {};

  const layoutChunks = [...(pages["/layout"] ?? []), ...(pages["/(site)/layout"] ?? [])];

  const routeMap = {
    "/": "/(site)/page",
    "/about": "/(site)/about/page",
    "/departments": "/(site)/departments/page",
    "/events": "/(site)/events/page",
    "/portfolio": "/(site)/portfolio/page",
    "/recruitment": "/(site)/recruitment/page",
    "/_not-found": "/_not-found/page",
  };

  for (const [route, pageKey] of Object.entries(routeMap)) {
    const pageChunks = pages[pageKey] ?? [];
    const allChunks = [...layoutChunks, ...pageChunks];
    routeFirstLoadKb.set(route, Math.round(sumUniqueChunks(allChunks) * 10) / 10);
  }

  sharedKb = Math.round(sumUniqueChunks(pages["/layout"] ?? []) * 10) / 10;
  return routeFirstLoadKb.size > 0;
}

function parseFromBuildLog(log) {
  // Next.js 14/15 build table (box-drawing chars optional): route, page size, First Load JS
  const routePattern = /[┌├└○\s]*(\/[\w/_-]*)\s+[\d.]+\s+kB\s+([\d.]+)\s+kB/g;
  let match;
  while ((match = routePattern.exec(log)) !== null) {
    const [, route, firstLoadKb] = match;
    routeFirstLoadKb.set(route, Number(firstLoadKb));
  }

  const sharedMatch = /First Load JS shared by all\s+([\d.]+)\s+kB/.exec(log);
  if (sharedMatch) {
    sharedKb = Number(sharedMatch[1]);
  }

  return routeFirstLoadKb.size > 0;
}

const hasLog = existsSync(logPath);
if (hasLog) {
  const log = readFileSync(logPath, "utf8");
  if (!parseFromBuildLog(log)) {
    routeFirstLoadKb.clear();
    sharedKb = null;
  }
}

if (routeFirstLoadKb.size === 0) {
  if (!parseFromManifest()) {
    console.error("Could not parse bundle sizes.");
    console.error("Run: npm run build 2>&1 | tee build-output.log");
    process.exit(1);
  }
  console.log("(using .next/app-build-manifest.json — approximate chunk sum)\n");
} else if (hasLog) {
  console.log("(using build log)\n");
}

const failures = [];

if (sharedKb !== null && sharedKb > budgets.sharedFirstLoadJSKb) {
  failures.push(
    `shared First Load JS ${sharedKb} kB exceeds budget ${budgets.sharedFirstLoadJSKb} kB`
  );
}

for (const [route, actualKb] of routeFirstLoadKb) {
  const limitKb = budgets.routes[route] ?? budgets.defaultRouteKb;

  if (actualKb > limitKb) {
    failures.push(`route ${route}: ${actualKb} kB > budget ${limitKb} kB`);
  }
}

console.log("Bundle budget report:");
console.log(`  shared: ${sharedKb ?? "n/a"} kB (max ${budgets.sharedFirstLoadJSKb} kB)`);

for (const [route, kb] of [...routeFirstLoadKb.entries()].sort()) {
  const limit = budgets.routes[route] ?? budgets.defaultRouteKb;
  const status = kb <= limit ? "ok" : "FAIL";
  console.log(`  ${route}: ${kb} kB / ${limit} kB [${status}]`);
}

if (failures.length > 0) {
  console.error("\nBundle budget exceeded:");
  for (const message of failures) {
    console.error(`  - ${message}`);
  }
  process.exit(1);
}

console.log("\nAll bundle budgets passed.");
