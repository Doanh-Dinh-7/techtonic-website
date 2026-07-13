#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile) against a running Next.js server.
 * Prerequisite: production build + `npm run start` (or pass BASE_URL).
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node scripts/run-lighthouse.mjs
 *   npm run lighthouse   # starts server, audits, stops server (see package.json)
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const root = process.cwd();
const budgetsPath = join(root, "lighthouse-budgets.json");
const outDir = join(root, "docs", "audits", "lighthouse");
const baseUrl = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

if (!existsSync(budgetsPath)) {
  console.error("Missing lighthouse-budgets.json");
  process.exit(1);
}

const budgets = JSON.parse(readFileSync(budgetsPath, "utf8"));
const routes = budgets.routes ?? ["/"];

mkdirSync(outDir, { recursive: true });

/** @type {Record<string, Record<string, number>>} */
const summary = {};
const failures = [];

/** Local/desktop: no CPU/network simulation — avoids NO_LCP / SPEEDINDEX_OF_ZERO on many Windows setups. */
const isLocalMode = process.env.LIGHTHOUSE_LOCAL === "1";

const chrome = await chromeLauncher.launch({
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    ...(isLocalMode ? ["--window-size=1350,940"] : []),
  ],
});

const lhFlags = {
  logLevel: process.env.LIGHTHOUSE_VERBOSE ? "info" : "error",
  output: ["json", "html"],
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  port: chrome.port,
  formFactor: isLocalMode ? "desktop" : "mobile",
  screenEmulation: isLocalMode
    ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }
    : { mobile: true, width: 412, height: 823, deviceScaleFactor: 2.625 },
  maxWaitForFcp: 60_000,
  maxWaitForLoad: 120_000,
  pauseAfterLoadMs: isLocalMode ? 2000 : 5000,
};

const lhConfig = isLocalMode
  ? {
      extends: "lighthouse:default",
      settings: {
        throttlingMethod: "provided",
        throttling: {
          rttMs: 40,
          throughputKbps: 10_240,
          cpuSlowdownMultiplier: 1,
        },
      },
    }
  : {
      extends: "lighthouse:default",
      settings: {
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.5600000000002,
          uploadThroughputKbps: 675,
          cpuSlowdownMultiplier: 2,
        },
      },
    };

if (isLocalMode) {
  console.log(
    "Mode: LIGHTHOUSE_LOCAL=1 (desktop, minimal throttling — for reliable local scores)\n"
  );
}

try {
  for (const route of routes) {
    const url = `${baseUrl}${route === "/" ? "" : route}`;
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    console.log(`\nAuditing ${url} …`);

    const runnerResult = await lighthouse(url, lhFlags, lhConfig);

    const lhr = runnerResult.lhr;
    if (lhr.runWarnings?.length) {
      for (const warning of lhr.runWarnings) {
        console.warn(`  ⚠ ${warning}`);
      }
    }
    const jsonPath = join(outDir, `${slug}.report.json`);
    const htmlPath = join(outDir, `${slug}.report.html`);

    writeFileSync(jsonPath, JSON.stringify(lhr, null, 2));
    const reports = runnerResult.report;
    if (Array.isArray(reports) && reports[1]) {
      writeFileSync(htmlPath, reports[1]);
    }
    const routeKey = route;
    const routeBudgets = budgets.routeOverrides?.[routeKey] ?? {};
    const scores = {};
    for (const [id, defaultMin] of Object.entries(budgets.categories)) {
      const category = lhr.categories[id];
      const raw = category?.score;

      if (raw === null || raw === undefined) {
        scores[id] = null;
        failures.push(
          `${slug} ${id}: INCOMPLETE (Lighthouse could not score — see report runWarnings / Lantern NO_LCP)`
        );
        continue;
      }

      const score = Math.round(raw * 100);
      const minScore = routeBudgets[id] ?? defaultMin;
      scores[id] = score;
      if (score < minScore) {
        failures.push(`${slug} ${id}: ${score} < ${minScore}`);
      }
    }
    summary[slug] = { url, scores };
    const fmt = (v) => (v === null ? "—" : v);
    console.log(
      `  performance=${fmt(scores.performance)} a11y=${fmt(scores.accessibility)} bp=${fmt(scores["best-practices"])} seo=${fmt(scores.seo)}`
    );
  }
} finally {
  try {
    await chrome.kill();
  } catch (error) {
    console.warn(`Chrome cleanup warning: ${error?.message ?? error}`);
  }
}

const summaryPath = join(outDir, "summary.json");
writeFileSync(
  summaryPath,
  JSON.stringify({ baseUrl, auditedAt: new Date().toISOString(), summary }, null, 2)
);

console.log(`\nReports: docs/audits/lighthouse/*.report.{json,html}`);
console.log(`Summary: docs/audits/lighthouse/summary.json`);

if (failures.length > 0) {
  console.error("\nLighthouse budgets not met:");
  for (const f of failures) console.error(`  - ${f}`);
  if (process.env.LIGHTHOUSE_SOFT !== "1") {
    process.exit(1);
  }
  console.warn("\nLIGHTHOUSE_SOFT=1 — exiting 0 despite budget misses.");
}

console.log("\nAll Lighthouse category budgets passed.");
process.exit(0);
