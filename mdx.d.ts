declare module "*.mdx" {
  import type { ComponentType, ElementType } from "react";

  export const frontmatter: {
    title: string;
    description: string;
    date: string;
    featured?: boolean;
    tags?: string[];
  };

  const MDXComponent: ComponentType<{ components?: Record<string, ElementType> }>;
  export default MDXComponent;
}
