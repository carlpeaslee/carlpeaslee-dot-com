import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readText(relativePath) {
  const fullPath = path.join(root, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : null;
}

function hasDependency(packageJson, name) {
  return Boolean(
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name]
  );
}

const failures = [];

const packageJsonPath = path.join(root, "package.json");
if (!fs.existsSync(packageJsonPath)) {
  failures.push("Missing package.json");
} else {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  const requiredDependencies = [
    "react",
    "react-dom",
    "react-router",
    "vite",
    "tailwindcss",
    "wrangler",
    "posthog-js",
  ];

  for (const dependency of requiredDependencies) {
    if (!hasDependency(packageJson, dependency)) {
      failures.push(`Missing required dependency "${dependency}"`);
    }
  }

  const requiredDevDependencies = ["@react-router/dev", "@cloudflare/vite-plugin"];

  for (const dependency of requiredDevDependencies) {
    if (!hasDependency(packageJson, dependency)) {
      failures.push(`Missing required dependency "${dependency}"`);
    }
  }

  if (hasDependency(packageJson, "next")) {
    failures.push('Unexpected "next" dependency; project should be Vite + React Router');
  }
}

const justfile = readText("justfile");
if (!justfile) {
  failures.push("Missing justfile");
} else {
  for (const recipe of ["dev:", "build:", "dev-static:", "deploy ", "verify "]) {
    if (!justfile.includes(recipe)) {
      failures.push(`justfile is missing the "${recipe.trim()}" recipe`);
    }
  }
}

const reactRouterConfig = readText("react-router.config.ts");
if (!reactRouterConfig) {
  failures.push("Missing react-router.config.ts");
} else {
  if (!reactRouterConfig.includes("ssr: true")) {
    failures.push("react-router.config.ts must enable SSR");
  }
  if (!reactRouterConfig.includes("prerender")) {
    failures.push("react-router.config.ts must configure prerendering");
  }
}

const viteConfig = readText("vite.config.ts");
if (!viteConfig) {
  failures.push("Missing vite.config.ts");
} else {
  for (const snippet of ["reactRouter(", "cloudflare(", "tailwind"]) {
    if (!viteConfig.includes(snippet)) {
      failures.push(`vite.config.ts is missing expected plugin usage: ${snippet}`);
    }
  }
}

if (!fs.existsSync(path.join(root, "wrangler.jsonc"))) {
  failures.push("Missing wrangler.jsonc");
}

if (!fs.existsSync(path.join(root, "workers/app.ts"))) {
  failures.push("Missing workers/app.ts");
}

const routeConfig = readText("app/routes.ts");
if (!routeConfig) {
  failures.push("Missing app/routes.ts");
} else {
  for (const snippet of ['"blog"', '"blog/:slug"']) {
    if (!routeConfig.includes(snippet)) {
      failures.push(`app/routes.ts is missing route ${snippet}`);
    }
  }
}

const contentDir = path.join(root, "content", "posts");
if (!fs.existsSync(contentDir)) {
  failures.push("Missing content/posts directory");
} else {
  const posts = fs
    .readdirSync(contentDir)
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"));
  if (posts.length === 0) {
    failures.push("content/posts must contain at least one markdown post");
  }
}

if (failures.length > 0) {
  console.error("Repository verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository verification passed.");
