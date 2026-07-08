"use client";

import { useEffect } from "react";
import { initAnalytics, analytics } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureAttribution();
    initAnalytics();
    // $pageview comes free from capture_pageview; we only fire our session_start.
    analytics.sessionStart();
  }, []);

  return <>{children}</>;
}
