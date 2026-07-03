import { getAttributionParams } from "./attribution";

export const FUNNEL_SLUG = "clearmind-clearlife";
export const SOURCE_DOMAIN = "clearmindclearlife.com";

export type LeadData = {
  // open + scored answers
  situation: string; // Q1 open text (unscored context)
  lifeArea: string; // Q2 scored
  income: string; // Q3 scored
  readiness: string; // Q4 scored
  // contact
  firstName: string;
  lastName: string;
  email: string;
  fullPhone: string; // pre-formatted CRM string
  phoneE164: string; // for booking prefill
  smsConsent: boolean;
};

/**
 * The payload. Scored fields sent BOTH flat and nested under `responses` — free,
 * and whichever shape the Wayfinder handler reads wins. fieldName keys are contracts.
 */
export function buildWayfinderPayload(d: LeadData, pendingId: string) {
  const utm = getAttributionParams();
  const scored = {
    lifeArea: d.lifeArea,
    income: d.income,
    readiness: d.readiness,
  };

  return {
    pendingId,
    // contact / routing
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    name: `${d.firstName} ${d.lastName}`.trim(),
    phone: d.fullPhone,
    smsConsent: d.smsConsent,
    // scored (flat)
    ...scored,
    // scored (nested — newer handlers read here)
    responses: { ...scored, situation: d.situation },
    // extra context (stored under rawResponses on the customer record)
    situation: d.situation,
    // attribution
    source: SOURCE_DOMAIN,
    funnel: FUNNEL_SLUG,
    submittedAt: new Date().toISOString(),
    timestamp: Date.now(),
    ...utm,
  };
}
