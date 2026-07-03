/**
 * Centralized analytics — the ONLY place that touches posthog.
 * No-ops cleanly when NEXT_PUBLIC_POSTHOG_KEY is absent (dev / previews).
 * Event names are a cross-site contract — do not rename without updating dashboards.
 */
import posthog from "posthog-js";

let loaded = false;

export function initAnalytics() {
  if (loaded || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return; // no-op when unconfigured
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie",
  });
  loaded = true;
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    const sessionId = loaded ? posthog.get_session_id?.() : undefined;
    if (loaded) posthog.capture(event, { ...props, ...(sessionId ? { $session_id: sessionId } : {}) });
    else if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, props);
  } catch {
    /* never break the funnel on an analytics error */
  }
}

/* ─── Last-CTA attribution (which button actually converts) ─────────────── */
const LAST_CTA_KEY = "lastCtaLocation";

export function setLastCtaLocation(location: string) {
  try {
    sessionStorage.setItem(LAST_CTA_KEY, location);
  } catch {}
}

export function getLastCtaLocation(): string {
  try {
    return sessionStorage.getItem(LAST_CTA_KEY) || "direct";
  } catch {
    return "direct";
  }
}

/* ─── Named helpers (typed call sites) ─────────────────────────────────── */
export const analytics = {
  ctaClicked: (location: string, label: string) => {
    setLastCtaLocation(location);
    track("cta_clicked", { location, label });
  },
  formStarted: (firstQuestionField: string) =>
    track("form_started", { first_question_field: firstQuestionField, last_cta_location: getLastCtaLocation() }),
  questionViewed: (id: string, n: number) => track("question_viewed", { question_id: id, question_number: n }),
  questionCompleted: (id: string, n: number, msOnQuestion: number) =>
    track("question_completed", { question_id: id, question_number: n, ms_on_question: msOnQuestion }),
  questionBack: (id: string, n: number) => track("question_back", { question_id: id, question_number: n }),
  validationBlocked: (field: string) => track("validation_blocked", { question_field: field }),
  formSubmitted: (props: Record<string, unknown>) =>
    track("form_submitted", { ...props, last_cta_location: getLastCtaLocation() }),
  formSubmissionError: (props: Record<string, unknown>) => track("form_submission_error", props),
  wayfinderLeadSent: (source: "immediate" | "retry", props: Record<string, unknown> = {}) =>
    track("wayfinder_lead_sent", { source, ...props }),
  wayfinderLeadFailed: (props: Record<string, unknown>) => track("wayfinder_lead_failed", props),
  pendingLeadSyncFailed: (props: Record<string, unknown>) => track("pending_lead_sync_failed", props),
};
