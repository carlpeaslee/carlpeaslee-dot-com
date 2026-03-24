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

export function AnalyticsProvider({
  apiHost,
  apiKey,
  children,
}: {
  apiHost: string;
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
        api_host: apiHost,
        capture_pageleave: true,
        capture_pageview: false,
        person_profiles: "identified_only",
        __add_tracing_headers: [window.location.host, "localhost"],
      });
    }
  }, [apiHost, apiKey, enabled]);

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
