"use client";

import { useEffect } from "react";
import { initAnalytics, track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureAttribution();
    initAnalytics();
    track("funnel_page_viewed");
  }, []);

  return <>{children}</>;
}
