"use client";

import { useEffect, useRef } from "react";
import { submitLead } from "@/lib/submitLead";
import { analytics } from "@/lib/analytics";
import { FUNNEL_SLUG } from "@/lib/wayfinder";
import {
  getPendingLeads,
  removePendingLead,
  updatePendingLead,
  markLeadSyncing,
  clearLeadSyncingLock,
} from "@/lib/pendingLeads";

const MAX_RETRIES = 10;

/** Drains the offline queue on mount (2s), on `online`, and on focus/visibility (5s debounce). */
export function usePendingLeadsSync() {
  const running = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (running.current || typeof navigator === "undefined" || !navigator.onLine) return;
      running.current = true;
      try {
        for (const lead of getPendingLeads()) {
          if (lead.retryCount >= MAX_RETRIES) continue;
          if (!markLeadSyncing(lead.pendingId)) continue; // 30s lock guards the race with immediate submit
          const res = await submitLead(lead.payload);
          if (res.ok) {
            removePendingLead(lead.pendingId);
            analytics.wayfinderLeadSent("retry", { pendingId: lead.pendingId });
          } else {
            clearLeadSyncingLock(lead.pendingId);
            updatePendingLead(lead.pendingId, {
              retryCount: lead.retryCount + 1,
              lastError: res.error,
            });
            analytics.pendingLeadSyncFailed({
              pendingId: lead.pendingId,
              error: res.error,
              funnel: FUNNEL_SLUG,
            });
          }
          await new Promise((r) => setTimeout(r, 200));
        }
      } finally {
        running.current = false;
      }
    };

    const mountTimer = setTimeout(run, 2000);
    let debounce: ReturnType<typeof setTimeout>;
    const onSignal = () => {
      clearTimeout(debounce);
      debounce = setTimeout(run, 5000);
    };

    window.addEventListener("online", run);
    window.addEventListener("focus", onSignal);
    document.addEventListener("visibilitychange", onSignal);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(debounce);
      window.removeEventListener("online", run);
      window.removeEventListener("focus", onSignal);
      document.removeEventListener("visibilitychange", onSignal);
    };
  }, []);
}
