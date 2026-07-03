"use client";

import { useEffect, useRef, useState } from "react";

type Options = { threshold?: number; rootMargin?: string; once?: boolean };

export function useInView<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = false } = opts;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
