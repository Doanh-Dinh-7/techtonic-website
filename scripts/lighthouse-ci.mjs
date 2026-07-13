#!/usr/bin/env node
/**
 * Build, start production server on a free port, run Lighthouse audits, then stop server.
 */
import { createServer } from "node:net";
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { join } from "node:path";

const isWin = process.platform === "win32";
const root = process.cwd();
const runLighthouseScript = join(root, "scripts", "run-lighthouse.mjs");

async function findFreePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.listen(0, () => {
      const { port } = probe.address();
      probe.close(() => resolve(String(port)));
    });
    probe.on("error", reject);
  });
}

/**
 * Windows: npm is a .cmd shim — requires shell (or EINVAL on Node 22+).
 * Unix: invoke npm directly without shell.
 */
function spawnCommand(command, args, opts = {}) {
  const useShell = opts.shell ?? (isWin && command === "npm");
  return spawn(command, args, {
    stdio: "inherit",
    shell: useShell,
    windowsHide: useShell,
    ...opts,
  });
}

function run(command, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawnCommand(command, args, opts);
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`))
    );
  });
}

async function stopServer(child) {
  if (!child.pid) return;

  child.kill("SIGTERM");
  await delay(1000);

  if (isWin && child.exitCode === null) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
    await delay(1000);
  }

  child.stdout?.destroy();
  child.stderr?.destroy();
  child.stdin?.destroy();
}

async function waitForServer(url, maxAttempts = 90) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      const html = await res.text();
      if (
        res.ok &&
        html.includes("<title") &&
        html.includes('lang="vi"') &&
        html.includes("<main") &&
        html.includes("TECHTONIC")
      ) {
        return true;
      }
    } catch {
      // server still starting
    }
    await delay(1000);
  }
  return false;
}

const PORT = process.env.LIGHTHOUSE_PORT ?? (await findFreePort());
const BASE_URL = `http://127.0.0.1:${PORT}`;

console.log("Building production bundle…");
await run("npm", ["run", "build"]);

console.log(`Starting production server on port ${PORT}…`);
const server = spawnCommand("npm", ["run", "start"], {
  stdio: "pipe",
  env: { ...process.env, PORT },
});

let nextReady = false;
server.stdout?.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);
  if (text.includes("Ready")) nextReady = true;
});
server.stderr?.on("data", (chunk) => process.stderr.write(chunk.toString()));
server.on("error", (err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

for (let i = 0; i < 30 && !nextReady; i++) {
  await delay(500);
}

const healthUrl = `${BASE_URL}/`;
console.log(`Waiting for ${healthUrl} …`);
const ready = await waitForServer(healthUrl);

if (!ready) {
  console.error("Server did not become ready in time.");
  await stopServer(server);
  process.exit(1);
}

console.log("Server ready.");
await delay(5000);

try {
  await run(process.execPath, [runLighthouseScript], {
    shell: false,
    env: {
      ...process.env,
      BASE_URL,
      LIGHTHOUSE_LOCAL: process.env.LIGHTHOUSE_LOCAL ?? "",
      LIGHTHOUSE_SOFT: process.env.LIGHTHOUSE_SOFT ?? "",
    },
  });
} finally {
  await stopServer(server);
}

process.exit(0);
