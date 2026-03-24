import { siteMeta } from "@/lib/site";
import type { Route } from "./+types/blog";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `Blog | ${siteMeta.name}` },
    { name: "description", content: "Markdown-first writing with client-side React demos." },
  ];
}

export default function Blog() {
  // const posts = getAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:px-8 lg:py-16">
      <p className="text-muted-foreground">No posts yet.</p>
    </main>
  );
}
