import { spawn } from "node:child_process";

const [, , rawTarget = "preview"] = process.argv;
const target = rawTarget.toLowerCase();

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
      shell: false,
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

await run("npm", ["run", "build"]);

if (target === "prod" || target === "production") {
  await run("npx", ["wrangler", "deploy"]);
} else if (target === "preview") {
  await run("npx", ["wrangler", "deploy", "--env", "preview"]);
} else {
  throw new Error(`Unknown deployment target "${rawTarget}". Use "preview" or "production".`);
}
