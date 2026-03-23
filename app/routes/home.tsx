import { Link } from "react-router";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { getFeaturedPost, getRecentPosts } from "@/lib/posts";
import { quickLinks, siteMeta, studioNotes } from "@/lib/site";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${siteMeta.name} | Landing page and blog` },
    { name: "description", content: siteMeta.description },
  ];
}

export default function Home() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(2, featuredPost?.slug);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-8 lg:py-16">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,248,235,0.92))] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.1)]">
          <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,140,69,0.18),transparent_70%)] blur-3xl" />
          <p className="relative text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Personal site
          </p>
          <div className="relative mt-4 max-w-3xl space-y-6">
            <h1 className="font-display text-5xl leading-tight text-balance text-foreground sm:text-6xl">
              Carl Peaslee builds thoughtful software and writes about how it gets shipped.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteMeta.description}
            </p>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/blog">Read the blog</Link>
            </Button>
            {featuredPost ? (
              <Button asChild size="lg" variant="outline">
                <Link to={`/blog/${featuredPost.slug}`}>Open featured post</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Quick links
          </p>
          <div className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                className="group flex items-center justify-between rounded-2xl border border-border/70 bg-background/80 px-4 py-3 transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                href={link.href}
                rel={link.external ? "noreferrer" : undefined}
                target={link.external ? "_blank" : undefined}
              >
                <span>
                  <span className="block text-sm font-medium text-foreground">{link.label}</span>
                  <span className="block text-sm text-muted-foreground">{link.description}</span>
                </span>
                <span className="text-sm text-muted-foreground transition group-hover:text-foreground">
                  {link.external ? "Open" : "View"}
                </span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Featured writing
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground">Recent notes from the blog</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/blog">All posts</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-5">
            {featuredPost ? <PostCard post={featuredPost} tone="feature" /> : null}
            <div className="grid gap-5 md:grid-cols-2">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(250,248,243,0.94),rgba(240,238,231,0.88))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Studio notes</p>
          <div className="mt-5 space-y-4">
            {studioNotes.map((note) => (
              <article key={note.title} className="rounded-2xl border border-border/70 bg-background/80 p-4">
                <h3 className="text-lg font-medium text-foreground">{note.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
