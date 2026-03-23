import type { ComponentPropsWithoutRef } from "react";

import { SignalBench } from "@/components/demos/signal-bench";

function SmartLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <a
      {...props}
      href={href}
      rel={external ? "noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
    />
  );
}

export const mdxComponents = {
  a: SmartLink,
  SignalBench,
};
