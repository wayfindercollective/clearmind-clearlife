/**
 * Centralized analytics — the ONLY place that touches posthog.
 * No-ops cleanly when NEXT_PUBLIC_POSTHOG_KEY is absent (dev / previews).
 *
 * Event names + property keys are a CROSS-SITE contract shared with the sister
 * application funnel (wayfindercollective/general-application) so both roll up
 * into the same PostHog funnels. PostHog is case- and string-sensitive:
 * `question_completed` ≠ `questionCompleted`. Do not rename without updating the
 * sister site + dashboards. Snake_case keys, question_number is 1-based, and
 * question_type is normalized to underscores (`multiple-choice` -> multiple_choice).
 *
 * The shared funnel is keyed on these four names, identical on every site:
 *   session_start -> form_started -> question_completed (per step) -> form_submitted
 */
import posthog from "posthog-js";

let loaded = false;

export function initAnalytics() {
  if (loaded || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return; // no-op when unconfigured
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    autocapture: true,
    capture_pageview: true, // pageviews come free — never fire $pageview manually
    capture_pageleave: true,
    enable_heatmaps: true,
    disable_session_recording: false, // session recording ON
    persistence: "localStorage+cookie",
    session_recording: {
      // Don't blanket-mask; mask PII selectively via [data-posthog-mask] on the
      // name/email/phone inputs, with input-type masking as a defense-in-depth backstop.
      maskAllInputs: false,
      maskTextSelector: "[data-posthog-mask]",
      maskInputOptions: { password: true, email: true, tel: true },
    },
  });
  loaded = true;
}

/**
 * The ONE capture wrapper. Auto-attaches $session_id so every event links back
 * to its session recording. Never call posthog.capture() directly from components.
 */
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

/* ─── Form-reached gate ─────────────────────────────────────────────────────
   question_progress must stay suppressed until the user actually scrolls the
   application form into view — otherwise Q1 fires on page load while the form
   sits below the fold. SectionTracker flips this when #apply enters view; the
   Questionnaire reads it to decide when to start emitting question_progress. */
let formReached = false;
const formReachedListeners = new Set<() => void>();

export function markFormReached() {
  if (formReached) return;
  formReached = true;
  formReachedListeners.forEach((fn) => fn());
}

export function isFormReached() {
  return formReached;
}

/** Subscribe to the gate opening; returns an unsubscribe. Fires at most once. */
export function onFormReached(fn: () => void) {
  formReachedListeners.add(fn);
  return () => {
    formReachedListeners.delete(fn);
  };
}

/* ─── Fire-once guards ──────────────────────────────────────────────────────
   session_start / apply_section_reached / form_submitted must never duplicate
   across refresh re-renders, StrictMode double-effects, or double-clicks. A
   duplicate form_submitted inflates the conversion rate. */
let sessionStarted = false;
let applyReachedSent = false;
let formSubmittedSent = false;

const now = () => new Date().toISOString();

/* ─── Named helpers (typed call sites) ─────────────────────────────────── */
export const analytics = {
  /** Fires once on app load. */
  sessionStart: () => {
    if (sessionStarted || typeof window === "undefined") return;
    sessionStarted = true;
    track("session_start", {
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_width: window.screen?.width,
      screen_height: window.screen?.height,
      viewport_width: window.innerWidth,
    });
  },

  ctaClicked: (location: string, label: string) => {
    setLastCtaLocation(location);
    track("cta_clicked", { cta_location: location, location, label, timestamp: now() });
  },

  /** Any landing section scrolling into view (SectionTracker fires once each). */
  sectionViewed: (sectionId: string) =>
    track("section_viewed", { section_id: sectionId, section: sectionId, timestamp: now() }),

  /** The application section scrolling into view (fires once). */
  applySectionReached: (trigger = "scroll") => {
    if (applyReachedSent) return;
    applyReachedSent = true;
    track("apply_section_reached", { trigger });
  },

  /** First answer entered on Q1 (caller guards it to fire once). */
  formStarted: (firstQuestionField: string) =>
    track("form_started", {
      first_question_field: firstQuestionField,
      last_cta_location: getLastCtaLocation(),
      timestamp: now(),
    }),

  /** A question slide is shown (gated: caller only calls once the form is reached). */
  questionProgress: (questionNumber: number, questionType: string, questionId: string, questionLabel: string) =>
    track("question_progress", {
      question_number: questionNumber,
      question_type: questionType,
      question_id: questionId,
      question_label: questionLabel,
    }),

  /** User advanced past a question with a valid answer. */
  questionCompleted: (questionNumber: number, questionType: string, questionId: string) =>
    track("question_completed", {
      question_number: questionNumber,
      question_type: questionType,
      question_id: questionId,
    }),

  questionBack: (fromQuestion: number, toQuestion: number) =>
    track("question_back", { from_question: fromQuestion, to_question: toQuestion }),

  questionValidationBlocked: (questionId: string, questionField: string, reason: string) =>
    track("question_validation_blocked", { question_id: questionId, question_field: questionField, reason }),

  /** User reached the success/thank-you screen. Fires once (guards double-submit). */
  formSubmitted: (props: Record<string, unknown>) => {
    if (formSubmittedSent) return;
    formSubmittedSent = true;
    track("form_submitted", { ...props, last_cta_location: getLastCtaLocation() });
  },

  formSubmissionError: (props: Record<string, unknown>) => track("form_submission_error", props),

  /* ─── Internal lead-delivery telemetry (not part of the shared funnel) ─── */
  wayfinderLeadSent: (source: "immediate" | "retry", props: Record<string, unknown> = {}) =>
    track("wayfinder_lead_sent", { source, ...props }),
  wayfinderLeadFailed: (props: Record<string, unknown>) => track("wayfinder_lead_failed", props),
  pendingLeadSyncFailed: (props: Record<string, unknown>) => track("pending_lead_sync_failed", props),
};
