/**
 * First-touch, write-once attribution. Captured on first load, persisted so a
 * viewer who clicks a YouTube link today and books next week still attributes
 * to the video. Fresh explicit ?utm_* on a new visit wins over stored values.
 * SSR-safe + private-mode safe. Never logs.
 */
const FIRST_KEY = "wf_attribution_first";
const SESSION_KEY = "wf_attribution_session";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const CLICK_KEYS = ["gclid", "fbclid"] as const;
const AFFILIATE_KEYS = ["AFID", "CID", "SID", "ref"] as const;

export type Attribution = Record<string, string>;

function readParams(): Attribution {
  const out: Attribution = {};
  try {
    const p = new URLSearchParams(window.location.search);
    [...UTM_KEYS, ...CLICK_KEYS, ...AFFILIATE_KEYS].forEach((k) => {
      const v = p.get(k);
      if (v) out[k] = v;
    });
    if (document.referrer) out.referrer = document.referrer;
  } catch {}
  return out;
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const current = readParams();
    const hasExplicitUtm = UTM_KEYS.some((k) => current[k]);

    // First-touch: write once, unless this visit carries fresh explicit UTMs.
    const existingFirst = localStorage.getItem(FIRST_KEY);
    if (!existingFirst || hasExplicitUtm) {
      if (Object.keys(current).length) localStorage.setItem(FIRST_KEY, JSON.stringify(current));
    }

    // Session copy so attribution survives the /thank-you navigation.
    if (Object.keys(current).length) sessionStorage.setItem(SESSION_KEY, JSON.stringify(current));
  } catch {}
}

export function getAttributionParams(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const first = JSON.parse(localStorage.getItem(FIRST_KEY) || "{}");
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}");
    // First-touch is the source of truth; session fills any gaps.
    return { ...session, ...first };
  } catch {
    return {};
  }
}
