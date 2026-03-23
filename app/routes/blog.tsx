import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { siteMeta } from "@/lib/site";
import type { Route } from "./+types/blog";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `Blog | ${siteMeta.name}` },
    { name: "description", content: "Markdown-first writing with client-side React demos." },
  ];
}

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Blog</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">Blog</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          Essays, build notes, and experiments from a Vite + React Router stack that prerenders
          every route to static HTML.
        </p>
      </section>

      <section className="grid gap-5">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} tone={index === 0 ? "feature" : "default"} />
        ))}
      </section>
    </main>
  );
}
