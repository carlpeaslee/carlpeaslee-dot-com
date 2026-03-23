import fs from "node:fs";
import path from "node:path";

import type { Config } from "@react-router/dev/config";

function getPrerenderPaths() {
  const postsDirectory = path.resolve("content/posts");
  const postPaths = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => `/blog/${fileName.replace(/\.mdx$/, "")}`);

  return ["/", "/blog", ...postPaths];
}

export default {
  ssr: true,
  prerender: getPrerenderPaths(),
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
