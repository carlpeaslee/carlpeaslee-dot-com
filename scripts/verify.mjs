import { spawn } from "node:child_process";
import path from "node:path";

const [, , target = "local"] = process.argv;
const cwd = process.cwd();

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: false,
      ...options,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function waitForServer(baseUrl, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the timeout expires.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${baseUrl}`);
}

await run("node", [path.join("scripts", "verify-repo.mjs")]);

if (target === "local") {
  await run("npm", ["run", "build"]);

  const preview = spawn("npm", ["run", "dev-static", "--", "--host", "127.0.0.1", "--port", "4173"], {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  try {
    await waitForServer("http://127.0.0.1:4173/");
    await run("node", [path.join("scripts", "verify-http.mjs"), "http://127.0.0.1:4173/"]);
  } finally {
    preview.kill("SIGTERM");
  }
} else {
  const variableName =
    target === "prod" || target === "production" ? "PROD_URL" : "PREVIEW_URL";
  const baseUrl = process.env[variableName];

  if (!baseUrl) {
    throw new Error(`Missing ${variableName} for remote verification`);
  }

  await run("node", [path.join("scripts", "verify-http.mjs"), baseUrl]);
}
