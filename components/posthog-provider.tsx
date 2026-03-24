import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

function PageViewTracker({ enabled }: { enabled: boolean }) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    posthog.capture("$pageview", {
      $current_url: window.location.href,
      path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [enabled, location.hash, location.pathname, location.search]);

  return null;
}

function getApiHost() {
  if (typeof window === "undefined") return "https://us.i.posthog.com";
  return window.location.hostname === "carlpeaslee.com"
    ? "https://a.carlpeaslee.com"
    : "https://us.i.posthog.com";
}

export function AnalyticsProvider({
  apiKey,
  children,
}: {
  apiKey: string;
  children: ReactNode;
}) {
  const enabled = Boolean(apiKey);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const client = posthog as typeof posthog & { __loaded?: boolean };

    if (!client.__loaded) {
      posthog.init(apiKey, {
        api_host: getApiHost(),
        capture_pageleave: true,
        capture_pageview: false,
        person_profiles: "identified_only",
        __add_tracing_headers: [window.location.host, "localhost"],
      });
    }
  }, [apiKey, enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <PageViewTracker enabled={enabled} />
      {children}
    </PostHogProvider>
  );
}
