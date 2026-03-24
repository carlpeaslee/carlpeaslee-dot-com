import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import posthog from "posthog-js";

import { AnalyticsProvider } from "@/components/posthog-provider";
import { SiteShell } from "@/components/site-shell";
import type { Route } from "./+types/root";
import "./globals.css";

export function loader() {
  return {
    analytics: {
      apiKey: "phc_PHgUVavTPvqIXerB7NNvO9EPB8MYbwdpYYHLixwFoyV",
    },
  };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default function App() {
  const { analytics } = useLoaderData<typeof loader>();

  return (
    <AnalyticsProvider apiKey={analytics.apiKey}>
      <SiteShell>
        <Outlet />
      </SiteShell>
      <ScrollRestoration />
      <Scripts />
    </AnalyticsProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (typeof window !== "undefined") {
    posthog.captureException(error);
  }

  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? "Page not found"
      : error.statusText
    : "Unexpected error";

  const details = isRouteErrorResponse(error)
    ? error.status === 404
      ? "That route does not exist yet."
      : error.data
    : error instanceof Error
      ? error.message
      : "Something went wrong while rendering the page.";

  return (
    <Layout>
      <SiteShell>
        <main className="mx-auto flex min-h-[50vh] w-full max-w-6xl items-center px-6 py-20 sm:px-8">
          <section className="max-w-2xl space-y-4 rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Error
            </p>
            <h1 className="font-display text-4xl text-foreground">{message}</h1>
            <p className="text-base leading-7 text-muted-foreground">{String(details)}</p>
          </section>
        </main>
      </SiteShell>
      <ScrollRestoration />
      <Scripts />
    </Layout>
  );
}
