import { getAttributionParams } from "./attribution";

export const FUNNEL_SLUG = "clearmind-clearlife";
export const SOURCE_DOMAIN = "clearmindclearlife.com";

export type LeadData = {
  // Q1 categorical + conditional detail
  situation: string;
  situationDetail: string; // only set when Q1 = "Something else"
  // call-prep context
  drinkingPattern: string; // Q3
  // scored answers
  lifeArea: string; // Q2
  readiness: string; // Q4
  investment: string; // Q5 (replaces income - see questions.ts scoring note)
  // contact
  firstName: string;
  lastName: string;
  email: string;
  fullPhone: string; // pre-formatted CRM string
  phoneE164: string; // for booking prefill
  smsConsent: boolean;
};

/**
 * The payload. Scored fields sent BOTH flat and nested under `responses` - free,
 * and whichever shape the Wayfinder handler reads wins. fieldName keys are contracts.
 * situation / situationDetail / notes must reach the sales call-prep view.
 */
export function buildWayfinderPayload(d: LeadData, pendingId: string) {
  const utm = getAttributionParams();
  const scored = {
    lifeArea: d.lifeArea,
    readiness: d.readiness,
    investment: d.investment,
  };
  const context: Record<string, string> = { situation: d.situation, drinkingPattern: d.drinkingPattern };
  if (d.situationDetail) context.situationDetail = d.situationDetail;

  return {
    pendingId,
    // contact / routing
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    name: `${d.firstName} ${d.lastName}`.trim(),
    phone: d.fullPhone,
    // SMS consent - top-level boolean is the wire contract. Three keys cover older +
    // newer Wayfinder handlers; all default false, never true. This is an
    // operational/informational campaign (reminders/confirmations/updates), so the
    // single checkbox grants operational consent, not marketing.
    smsConsent: d.smsConsent,
    smsConsentOperational: d.smsConsent,
    smsConsentMarketing: false,
    // scored (flat)
    ...scored,
    // call-prep context (flat; extra top-level fields land in rawResponses)
    ...context,
    // nested - newer handlers read here
    responses: { ...scored, ...context },
    // attribution
    source: SOURCE_DOMAIN,
    funnel: FUNNEL_SLUG,
    submittedAt: new Date().toISOString(),
    timestamp: Date.now(),
    ...utm,
  };
}
