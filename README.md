# carlpeaslee.com

Personal landing page and blog for Carl Peaslee.

## Stack

- Vite
- React
- React Router framework mode
- Cloudflare Workers
- Tailwind CSS
- shadcn/ui
- PostHog
- `just` for the command surface

## Features

- SSR enabled with static prerendered HTML for the public routes
- `/blog` index route
- `/blog/:slug` post route
- MDX-backed posts in [`content/posts`](/work/carlpeaslee-dot-com/content/posts)
- Interactive client-side React components embedded directly in post content
- Cloudflare deploy flow with `preview` and `production` targets
- Verification flow that can run against local, preview, or production environments

## Commands

- `just dev`: hot-reloading development server
- `just build`: production build with prerendered pages
- `just dev-static`: build and locally serve the static output
- `just deploy preview`: deploy the preview worker
- `just deploy production`: deploy the production worker
- `just verify local`: build, serve, and verify the local site
- `just verify preview`: verify a deployed preview URL
- `just verify prod`: verify the production URL

## Environment

Build-time analytics values:

- `VITE_PUBLIC_POSTHOG_KEY`
- `VITE_PUBLIC_POSTHOG_HOST`

Remote verification values:

- `PREVIEW_URL`
- `PROD_URL`

## Notes

- The Cloudflare compatibility date is pinned to `2026-03-17`, which matches the runtime supported by the currently installed Wrangler toolchain.
- Profile links and copy in [`lib/site.ts`](/work/carlpeaslee-dot-com/lib/site.ts) are easy to swap as the real site content evolves.
