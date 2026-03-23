import type { ComponentType, ElementType } from "react";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  featured?: boolean;
  tags?: string[];
};

type PostModule = {
  default: ComponentType<{ components?: Record<string, ElementType> }>;
  frontmatter: PostFrontmatter;
};

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  featured: boolean;
  tags: string[];
  Content: PostModule["default"];
};

const modules = import.meta.glob("../content/posts/*.mdx", {
  eager: true,
}) as Record<string, PostModule>;

const posts = Object.entries(modules)
  .map(([filePath, module]) => {
    const slug = filePath.split("/").pop()?.replace(/\.mdx$/, "");

    if (!slug) {
      throw new Error(`Could not derive slug from ${filePath}`);
    }

    return {
      slug,
      title: module.frontmatter.title,
      description: module.frontmatter.description,
      date: module.frontmatter.date,
      featured: Boolean(module.frontmatter.featured),
      tags: module.frontmatter.tags ?? [],
      Content: module.default,
    } satisfies PostSummary;
  })
  .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

export function getAllPosts() {
  return posts;
}

export function getFeaturedPost() {
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export function getRecentPosts(limit = 2, omitSlug?: string) {
  return posts.filter((post) => post.slug !== omitSlug).slice(0, limit);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null;
}
