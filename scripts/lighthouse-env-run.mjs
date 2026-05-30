#!/usr/bin/env node
/**
 * Run lighthouse-ci with env flags (cross-platform; no cross-env needed).
 * Usage: node scripts/lighthouse-env-run.mjs [soft] [local]
 */
const mode = new Set(process.argv.slice(2));

if (mode.has("soft")) {
  process.env.LIGHTHOUSE_SOFT = "1";
}
if (mode.has("local")) {
  process.env.LIGHTHOUSE_LOCAL = "1";
}

await import("./lighthouse-ci.mjs");
