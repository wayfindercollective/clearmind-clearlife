"use client";

import clsx from "clsx";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

export function ScrollReveal({ children, className, delay = 0, as = "div" }: Props) {
  // once:true — reveal a single time then unobserve, so elements don't re-run their
  // fade/slide transition every time they cross the viewport edge during scroll.
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={clsx("reveal", inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
