export const siteMeta = {
  name: "Carl Peaslee",
  description:
    "A personal landing page and blog about product engineering, AI systems, and the practice of shipping small, useful things on the internet.",
};

export const quickLinks = [
  {
    label: "Read the latest post",
    description: "Jump straight into the writing archive.",
    href: "/blog",
    external: false,
  },
  {
    label: "Email Carl",
    description: "Best for project ideas, collaborations, or a quick hello.",
    href: "mailto:hello@carlpeaslee.com",
    external: true,
  },
  {
    label: "Source code",
    description: "This site is meant to be hacked on and extended.",
    href: "https://github.com/carlpeaslee",
    external: true,
  },
];

export const studioNotes = [
  {
    title: "Static-first by default",
    body: "Every public route is prerendered to HTML at build time, so the site stays fast and cacheable without giving up React Router SSR.",
  },
  {
    title: "Markdown with real React",
    body: "Posts live in MDX so long-form writing can still embed stateful UI, visual demos, and experiments directly in the article body.",
  },
  {
    title: "One command surface",
    body: "All day-to-day tasks are routed through a justfile so local development, deployment, and verification stay explicit and repeatable.",
  },
];

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(value));
}
