"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, TOTAL_STEPS } from "@/config/questions";
import { ProgressBar } from "./ProgressBar";
import { OpenTextStep } from "./OpenTextStep";
import { ChoiceStep } from "./ChoiceStep";
import { ContactStep, emptyContact, findCountry, type ContactValue } from "./ContactStep";
import { analytics } from "@/lib/analytics";
import { usePendingLeadsSync } from "@/hooks/usePendingLeadsSync";
import { formatPhoneForCrm, formatPhoneE164 } from "@/lib/phone";
import { buildWayfinderPayload, type LeadData } from "@/lib/wayfinder";
import { generatePendingId, savePendingLead, removePendingLead, markLeadSyncing, clearLeadSyncingLock } from "@/lib/pendingLeads";
import { submitLead } from "@/lib/submitLead";

const PROGRESS_KEY = "clearmind-clearlife-application-progress";
type Responses = Record<string, string>;

export function Questionnaire() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Responses>({});
  const [contact, setContact] = useState<ContactValue>(emptyContact);
  const [submitting, setSubmitting] = useState(false);

  const started = useRef(false);
  const submittedOnce = useRef(false);
  const enterTime = useRef<number>(0);
  const restored = useRef(false);

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

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://www.wayfindercollective.io";
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

  /* Question view analytics — suppressed until the funnel actually starts. */
  useEffect(() => {
    enterTime.current = performance.now();
    if (started.current || step > 0) {
      analytics.questionViewed(questions[step].id, step + 1);
    }
  }, [step]);

  const markStarted = (firstField: string) => {
    if (started.current) return;
    started.current = true;
    analytics.formStarted(firstField);
  };

  const advance = () => {
    analytics.questionCompleted(questions[step].id, step + 1, Math.round(performance.now() - enterTime.current));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    if (step === 0) return;
    analytics.questionBack(questions[step].id, step + 1);
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
      investment: responses.investment || "",
      readiness: responses.readiness || "",
      notes: responses.notes || "",
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

    analytics.formSubmitted({
      situation: data.situation,
      investment: data.investment,
      life_area: data.lifeArea,
      readiness: data.readiness,
    });

    // 3) fire (with the 30s syncing lock), but ALWAYS advance to success
    try {
      if (markLeadSyncing(pendingId)) {
        const res = await submitLead(payload);
        if (res.ok) {
          removePendingLead(pendingId);
          analytics.wayfinderLeadSent("immediate", { pendingId });
        } else {
          clearLeadSyncingLock(pendingId);
          analytics.formSubmissionError({ error_type: res.errorType, pendingId, savedToLocalStorage: true });
          analytics.wayfinderLeadFailed({ error: res.error, pendingId });
        }
      }
    } catch {
      clearLeadSyncingLock(pendingId);
      analytics.formSubmissionError({ error_type: "network", pendingId, savedToLocalStorage: true });
    } finally {
      router.push("/thank-you");
    }
  };

  const q = questions[step];

  return (
    <div className="mx-auto max-w-xl">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {step > 0 && !submitting && (
        <button type="button" onClick={back} className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}

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
            onBlocked={() => analytics.validationBlocked(q.fieldName)}
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
            onBlocked={() => analytics.validationBlocked(q.fieldName)}
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
            onBlocked={(field) => analytics.validationBlocked(field)}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
