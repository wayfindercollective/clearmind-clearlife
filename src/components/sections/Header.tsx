"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { content } from "@/config/content";
import { CTAButton } from "@/components/ui/CTAButton";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container-tight flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center shrink-0" aria-label={content.brand.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.brand.logo} alt={content.brand.name} className="h-11 md:h-14 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-sm">
          {content.brand.nav.map((item) => (
            <a key={item.href} href={item.href} className="link-quiet font-medium">
              {item.label}
            </a>
          ))}
        </nav>

        <CTAButton location="header" label={content.header.ctaLabel} className="!px-5 !py-2.5 text-sm" />
      </div>
    </header>
  );
}
