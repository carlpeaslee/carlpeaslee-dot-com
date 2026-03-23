import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { mdxComponents } from "@/lib/mdx-components";
import { getPostBySlug } from "@/lib/posts";
import { formatPostDate, siteMeta } from "@/lib/site";
import type { Route } from "./+types/blog-post";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug ?? "");

  if (!post) {
    throw new Response("Not found", { status: 404 });
  }

  return null;
}

export function meta({ params }: Route.MetaArgs) {
  const post = getPostBySlug(params.slug ?? "");

  if (!post) {
    return [{ title: `Not found | ${siteMeta.name}` }];
  }

  return [
    { title: `${post.title} | ${siteMeta.name}` },
    { name: "description", content: post.description },
  ];
}

export default function BlogPost({ params }: Route.ComponentProps) {
  const post = getPostBySlug(params.slug ?? "");

  if (!post) {
    throw new Response("Not found", { status: 404 });
  }

  const Content = post.Content;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 sm:px-8 lg:py-16">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="ghost">
          <Link to="/blog">Back to blog</Link>
        </Button>
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
          {formatPostDate(post.date)}
        </p>
      </div>

      <header className="space-y-4 rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Essay</p>
        <h1 className="font-display text-5xl leading-tight text-balance text-foreground">
          {post.title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">{post.description}</p>
      </header>

      <article className="prose prose-stone max-w-none rounded-[2rem] border border-border/70 bg-background/90 px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-foreground prose-a:underline-offset-4 prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-pre:border prose-pre:border-border/70 prose-pre:bg-[#171717] prose-pre:text-[#f7f4ed] sm:px-10 sm:py-10">
        <Content components={mdxComponents} />
      </article>
    </main>
  );
}
