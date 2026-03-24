import type { ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { usePostHog } from "posthog-js/react";

import { siteMeta } from "@/lib/site";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const posthog = usePostHog();

  return (
    <div className="flex min-h-[101vh] flex-col bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-[-8rem] h-[24rem] bg-[radial-gradient(circle_at_top,rgba(214,140,69,0.22),transparent_55%)]" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(67,95,82,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-6rem] top-[10rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.08),transparent_70%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link className="group inline-flex items-center gap-3" to="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-card text-sm font-semibold text-foreground shadow-sm transition group-hover:-translate-y-0.5">
              CP
            </span>
            <span>
              <span className="block text-sm uppercase tracking-[0.3em] text-muted-foreground">
                carlpeaslee.com
              </span>
              <span className="block font-display text-lg text-foreground">{siteMeta.name}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) =>
                    [
                      "rounded-full px-4 py-2 text-sm transition",
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-card hover:text-foreground",
                    ].join(" ")
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-border/50 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-xs text-muted-foreground sm:px-8">
          <p>&copy; {new Date().getFullYear()} Carl Peaslee</p>
          <div className="flex gap-3">
            <a className="hover:text-foreground" href="https://github.com/carlpeaslee" target="_blank" rel="noopener noreferrer" onClick={() => posthog?.capture("footer_social_clicked", { platform: "GitHub" })}>
              GitHub
            </a>
            <a className="hover:text-foreground" href="https://linkedin.com/in/carlpeaslee" target="_blank" rel="noopener noreferrer" onClick={() => posthog?.capture("footer_social_clicked", { platform: "LinkedIn" })}>
              LinkedIn
            </a>
            <a className="hover:text-foreground" href="https://x.com/carlpeaslee" target="_blank" rel="noopener noreferrer" onClick={() => posthog?.capture("footer_social_clicked", { platform: "X" })}>
              X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
