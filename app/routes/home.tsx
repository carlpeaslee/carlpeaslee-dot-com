import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Carl Peaslee" },
    { name: "description", content: "Product engineering, AI systems, and the practice of shipping small, useful things on the internet." },
  ];
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl px-6 py-12 sm:px-8 lg:py-16">
      <div className="space-y-1">
        <p className="text-muted-foreground">former kindergarten teacher</p>
        <p className="text-muted-foreground">mfa in creative writing</p>
        <p className="text-muted-foreground">software engineer</p>
        <p className="text-muted-foreground">founder and ceo at loopwork</p>
      </div>
    </main>
  );
}
