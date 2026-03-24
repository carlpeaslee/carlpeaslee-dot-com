import { Link } from "react-router";
import { usePostHog } from "posthog-js/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostSummary } from "@/lib/posts";
import { formatPostDate } from "@/lib/site";

export function PostCard({
  post,
  tone = "default",
}: {
  post: PostSummary;
  tone?: "default" | "feature";
}) {
  const posthog = usePostHog();

  const handleClick = () => {
    posthog?.capture("post_card_clicked", {
      post_slug: post.slug,
      post_title: post.title,
      post_tags: post.tags,
      featured: post.featured,
    });
  };

  return (
    <Card
      className={[
        "overflow-hidden border-border/70 transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]",
        tone === "feature"
          ? "bg-[linear-gradient(140deg,rgba(255,255,255,1),rgba(253,245,231,0.95))]"
          : "bg-card/90",
      ].join(" ")}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {formatPostDate(post.date)}
          </span>
          {post.featured ? (
            <span className="rounded-full border border-border/70 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Featured
            </span>
          ) : null}
        </div>
        <div className="space-y-2">
          <CardTitle className="font-display text-3xl leading-tight">
            <Link className="hover:underline" to={`/blog/${post.slug}`} onClick={handleClick}>
              {post.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-base leading-7">{post.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link className="text-sm font-medium text-foreground underline-offset-4 hover:underline" to={`/blog/${post.slug}`} onClick={handleClick}>
          Read
        </Link>
      </CardContent>
    </Card>
  );
}
