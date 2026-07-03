import type { Country } from "@/config/countryCodes";

/** CRM-facing formatter: pretty string with country code, e.g. "+1 (555) 123-4567". */
export function formatPhoneForCrm(raw: string, country: Country): string {
  const digits = normalizeDigits(raw, country);
  if (!digits) return "";
  if (country.dialCode === "+1" && digits.length === 10) {
    return `${country.dialCode} (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (country.dialCode === "+44") {
    return `${country.dialCode} ${digits}`;
  }
  return `${country.dialCode} ${digits}`;
}

/** Booking-prefill formatter (E.164, digits only after +). Kept SEPARATE from the CRM formatter. */
export function formatPhoneE164(raw: string, country: Country): string {
  const digits = normalizeDigits(raw, country);
  if (!digits) return "";
  return `${country.dialCode}${digits}`.replace(/[^\d+]/g, "");
}

/** Strip to national digits, handling pasted "+…", duplicated country codes, UK trunk-0. */
export function normalizeDigits(raw: string, country: Country): string {
  let d = (raw || "").replace(/[^\d]/g, "");
  const cc = country.dialCode.replace("+", "");
  // Remove a leading duplicated country code the user may have pasted.
  if (d.startsWith(cc) && d.length > cc.length) d = d.slice(cc.length);
  // UK trunk-0: drop a leading 0 when a +44 code is selected.
  if (country.dialCode === "+44" && d.startsWith("0")) d = d.slice(1);
  if (country.maxDigits) d = d.slice(0, country.maxDigits);
  return d;
}

export function isValidPhone(raw: string, country: Country): boolean {
  const d = normalizeDigits(raw, country);
  return d.length >= (country.minDigits ?? 10);
}
