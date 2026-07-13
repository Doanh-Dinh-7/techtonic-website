#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const logPath = join(process.cwd(), "build-output.log");

const result = spawnSync("npm", ["run", "build"], {
  encoding: "utf8",
  shell: true,
  stdio: ["inherit", "pipe", "pipe"],
});

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
writeFileSync(logPath, output, "utf8");

if (output) {
  process.stdout.write(output);
}

process.exit(result.status ?? 1);
