#!/usr/bin/env node
process.env.LIGHTHOUSE_LOCAL = "1";
await import("./run-lighthouse.mjs");
