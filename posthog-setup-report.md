# PostHog Setup Report

## Summary

PostHog analytics has been integrated into `carlpeaslee.com` (React Router v7, Cloudflare Workers). The integration covers page view tracking, custom interaction events, and error capture.

### What was set up

- **`posthog-js`** initialized via `AnalyticsProvider` in `app/root.tsx`, gated by `VITE_PUBLIC_POSTHOG_KEY`
- **Page views** tracked on every client-side route change via `PageViewTracker` in `components/posthog-provider.tsx`
- **Page leaves** captured automatically (`capture_pageleave: true`)
- **Error tracking** via `posthog.captureException` in the root `ErrorBoundary`
- **5 custom interaction events** tracked across 3 components

### Environment variables

| Variable | File |
|---|---|
| `VITE_PUBLIC_POSTHOG_KEY` | `.env` |
| `VITE_PUBLIC_POSTHOG_HOST` | `.env` |

---

## Tracked Events

| Event | Description | File | Properties |
|---|---|---|---|
| `$pageview` | Every client-side route change | `components/posthog-provider.tsx` | `$current_url`, `path` |
| `blog_cta_clicked` | "Read the blog" CTA on home hero | `app/routes/home.tsx` | — |
| `featured_post_opened` | "Open featured post" button on home hero | `app/routes/home.tsx` | `post_slug`, `post_title` |
| `quick_link_clicked` | Quick links sidebar on home page | `app/routes/home.tsx` | `label`, `href`, `external` |
| `post_card_clicked` | Blog post card title or "Read" link | `components/post-card.tsx` | `post_slug`, `post_title`, `post_tags`, `featured` |
| `footer_social_clicked` | Footer social links (GitHub, LinkedIn, X) | `components/site-shell.tsx` | `platform` |

---

## Dashboard

**Analytics basics** — [https://us.posthog.com/project/353938/dashboard/1392322](https://us.posthog.com/project/353938/dashboard/1392322)

### Insights

| Insight | URL |
|---|---|
| Page views (daily) | [https://us.posthog.com/project/353938/insights/zpcwqU7M](https://us.posthog.com/project/353938/insights/zpcwqU7M) |
| Blog engagement (clicks) | [https://us.posthog.com/project/353938/insights/XGY4TVTt](https://us.posthog.com/project/353938/insights/XGY4TVTt) |
| Quick links by destination | [https://us.posthog.com/project/353938/insights/oj5M6bqA](https://us.posthog.com/project/353938/insights/oj5M6bqA) |
| Social link clicks by platform | [https://us.posthog.com/project/353938/insights/BB9vuqiX](https://us.posthog.com/project/353938/insights/BB9vuqiX) |
