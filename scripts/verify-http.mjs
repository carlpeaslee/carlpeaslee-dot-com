const [, , baseUrl, postSlug = "hello-world"] = process.argv;

if (!baseUrl) {
  console.error("Usage: node scripts/verify-http.mjs <base-url> [post-slug]");
  process.exit(1);
}

const checks = [
  {
    path: "/",
    text: "Carl Peaslee",
  },
  {
    path: "/blog",
    text: "Blog",
  },
  {
    path: `/blog/${postSlug}`,
    text: "Hello World",
  },
];

const failures = [];

for (const check of checks) {
  const response = await fetch(new URL(check.path, baseUrl));
  if (!response.ok) {
    failures.push(`${check.path} returned ${response.status}`);
    continue;
  }

  const html = await response.text();
  if (!html.includes(check.text)) {
    failures.push(`${check.path} did not include expected text "${check.text}"`);
  }
}

if (failures.length > 0) {
  console.error("HTTP verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`HTTP verification passed for ${baseUrl}`);
