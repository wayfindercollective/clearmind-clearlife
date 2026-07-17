"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, TOTAL_STEPS, normalizedType } from "@/config/questions";
import { ProgressBar } from "./ProgressBar";
import { OpenTextStep } from "./OpenTextStep";
import { ChoiceStep } from "./ChoiceStep";
import { ContactStep, emptyContact, findCountry, type ContactValue } from "./ContactStep";
import { analytics, isFormReached, onFormReached } from "@/lib/analytics";
import { usePendingLeadsSync } from "@/hooks/usePendingLeadsSync";
import { formatPhoneForCrm, formatPhoneE164 } from "@/lib/phone";
import { buildWayfinderPayload, type LeadData } from "@/lib/wayfinder";
import { generatePendingId, savePendingLead, removePendingLead, markLeadSyncing, clearLeadSyncingLock } from "@/lib/pendingLeads";
import { submitLead } from "@/lib/submitLead";

const PROGRESS_KEY = "clearmind-clearlife-application-progress";
type Responses = Record<string, string>;

/** question_progress for the slide at `step` (0-based) -> 1-based number + shared keys. */
function fireQuestionProgress(step: number) {
  const q = questions[step];
  analytics.questionProgress(step + 1, normalizedType(q), q.id, q.question);
}

/** Reason string for question_validation_blocked on the contact step. */
function contactReason(field: string) {
  return field === "email" ? "invalid_email" : field === "phone" ? "invalid_phone" : "required";
}

export function Questionnaire() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [contact, setContact] = useState<ContactValue>(emptyContact);
  const [submitting, setSubmitting] = useState(false);

  const started = useRef(false);
  const submittedOnce = useRef(false);
  const restored = useRef(false);
  const stepRef = useRef(0);
  const formReachedRef = useRef(false);

  usePendingLeadsSync();

  /* Restore progress (never isSubmitted). Set manual scroll restoration + preconnect. */
  useEffect(() => {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
      if (saved) {
        setResponses(saved.responses || {});
        setContact({ ...emptyContact, ...(saved.contact || {}), smsConsent: false });
        setStep(Math.min(saved.step ?? 0, TOTAL_STEPS - 1));
      }
    } catch {}
    restored.current = true;

    // no-www is canonical (www 301-redirects); warm the host the lead POST and the
    // booking iframe actually use. Layout also preconnects this from first paint.
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://wayfindercollective.io";
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, []);

  /* Persist progress on change. */
  useEffect(() => {
    if (!restored.current) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({ step, responses, contact: { ...contact, smsConsent: false, company: "" } }));
    } catch {}
  }, [step, responses, contact]);

  /* question_progress — suppressed until the application form scrolls into view,
     then fired for the current slide and every advance/back after. */
  useEffect(() => {
    stepRef.current = step;
    if (formReachedRef.current) fireQuestionProgress(step);
  }, [step]);

  /* Open the gate when #apply reaches the viewport (or is already in view on
     mount), firing progress once for whatever slide the user is parked on. */
  useEffect(() => {
    const open = () => {
      if (formReachedRef.current) return;
      formReachedRef.current = true;
      fireQuestionProgress(stepRef.current);
    };
    if (isFormReached()) {
      open();
      return;
    }
    return onFormReached(open);
  }, []);

  const markStarted = (firstField: string) => {
    if (started.current) return;
    started.current = true;
    analytics.formStarted(firstField);
  };

  const advance = () => {
    const q = questions[step];
    analytics.questionCompleted(step + 1, normalizedType(q), q.id);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    if (step === 0) return;
    // from_question / to_question, both 1-based.
    analytics.questionBack(step + 1, step);
    setStep((s) => Math.max(s - 1, 0));
  };

  const setResponse = (fieldName: string, value: string) => {
    markStarted(fieldName);
    setResponses((r) => ({ ...r, [fieldName]: value }));
  };

  const handleSubmit = async () => {
    if (submittedOnce.current || submitting) return;

    // Honeypot: bot filled the hidden field -> silent fake success, no webhook/analytics.
    if (contact.company.trim() !== "") {
      submittedOnce.current = true;
      router.push("/thank-you");
      return;
    }

    submittedOnce.current = true;
    setSubmitting(true);

    const country = findCountry(contact.countryCode);
    const data: LeadData = {
      situation: responses.situation || "",
      situationDetail: responses.situationDetail || "",
      lifeArea: responses.lifeArea || "",
      readiness: responses.readiness || "",
      investment: responses.investment || "",
      position: responses.position || "",
      firstName: contact.firstName.trim(),
      lastName: contact.lastName.trim(),
      email: contact.email.trim(),
      fullPhone: formatPhoneForCrm(contact.phone, country),
      phoneE164: formatPhoneE164(contact.phone, country),
      smsConsent: contact.smsConsent,
    };

    const pendingId = generatePendingId();
    const payload = buildWayfinderPayload(data, pendingId);

    // 1) SAVE BEFORE FETCH — never lose a lead to a tab-close or JS error.
    savePendingLead({ pendingId, payload, email: data.email });

    // 2) booking prefill for the thank-you page
    try {
      sessionStorage.setItem(
        "bookingPrefill",
        JSON.stringify({ name: data.firstName + " " + data.lastName, email: data.email, phone: data.phoneE164 })
      );
    } catch {}

    // clear the resumable progress so a returning submitter sees the funnel fresh
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch {}

    // Fires on reaching the success screen even if the backend call below fails
    // (the lead is saved locally + retried), so conversion tracks real completions.
    // income_bracket is intentionally omitted — this funnel has no income question.
    analytics.formSubmitted({ life_area: data.lifeArea });

    // 3) fire (with the 30s syncing lock), but ALWAYS advance to success
    try {
      if (markLeadSyncing(pendingId)) {
        const res = await submitLead(payload);
        if (res.ok) {
          removePendingLead(pendingId);
          analytics.wayfinderLeadSent("immediate", { pendingId });
        } else {
          clearLeadSyncingLock(pendingId);
          analytics.formSubmissionError({
            error_message: res.error ?? `HTTP ${res.status}`,
            current_slide: step + 1,
            error_type: res.errorType === "network" ? "network_error" : "server_error",
            pendingId,
            savedToLocalStorage: true,
          });
          analytics.wayfinderLeadFailed({ error: res.error, pendingId });
        }
      }
    } catch {
      clearLeadSyncingLock(pendingId);
      analytics.formSubmissionError({
        error_message: "network_error",
        current_slide: step + 1,
        error_type: "network_error",
        pendingId,
        savedToLocalStorage: true,
      });
    } finally {
      router.push("/thank-you");
    }
  };

  const q = questions[step];

  return (
    <div className="mx-auto max-w-xl">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div key={step} className="reveal is-visible">
        {q.type === "open" && (
          <OpenTextStep
            question={q.question}
            subtext={q.subtext}
            placeholder={q.placeholder}
            minLength={q.minLength}
            optional={q.optional}
            value={responses[q.fieldName] || ""}
            onChange={(v) => setResponse(q.fieldName, v)}
            onAdvance={advance}
            onBlocked={() => analytics.questionValidationBlocked(q.id, q.fieldName, "too_short")}
          />
        )}

        {q.type === "choice" && (
          <ChoiceStep
            question={q.question}
            subtext={q.subtext}
            options={q.options}
            value={responses[q.fieldName] || ""}
            detailValue={q.detailFieldName ? responses[q.detailFieldName] : undefined}
            onSelect={(v, detail) => {
              markStarted(q.fieldName);
              setResponses((r) => {
                const next = { ...r, [q.fieldName]: v };
                if (q.detailFieldName) next[q.detailFieldName] = detail || "";
                return next;
              });
              advance();
            }}
            onBlocked={() => analytics.questionValidationBlocked(q.id, q.fieldName, "too_short")}
          />
        )}

        {q.type === "contact" && (
          <ContactStep
            question={q.question}
            subtext={q.subtext}
            value={contact}
            onChange={(patch) => {
              markStarted("contact");
              setContact((c) => ({ ...c, ...patch }));
            }}
            onSubmit={handleSubmit}
            onBlocked={(field) => analytics.questionValidationBlocked(q.id, field, contactReason(field))}
            submitting={submitting}
          />
        )}
      </div>

      {step > 0 && !submitting && (
        <button
          type="button"
          onClick={back}
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}
    </div>
  );
}
