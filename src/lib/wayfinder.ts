import { getAttributionParams } from "./attribution";

export const FUNNEL_SLUG = "dan-mentoring";
export const SOURCE_DOMAIN = "clearmindclearlife.com";

export type LeadData = {
  // Q1 categorical + conditional detail
  situation: string;
  situationDetail: string; // only set when Q1 = "Something else"
  // scored answers / qualifiers
  lifeArea: string; // Q2 (what they want to gain)
  readiness: string; // Q3
  investment: string; // Q4 (commitment)
  position: string; // Q5 (position at work)
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
    position: d.position,
  };
  const context: Record<string, string> = { situation: d.situation };
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
