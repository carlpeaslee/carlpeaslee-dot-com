import { createRequestHandler } from "react-router";

declare module "react-router" {
  interface AppLoadContext {
    cloudflare: {
      ctx: ExecutionContext;
      env: Env;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { ctx, env },
    });
  },
} satisfies ExportedHandler<Env>;
