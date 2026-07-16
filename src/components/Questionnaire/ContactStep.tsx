"use client";

import { useState } from "react";
import clsx from "clsx";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "@/config/countryCodes";
import { isValidPhone } from "@/lib/phone";
import { content } from "@/config/content";

export type ContactValue = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string; // Country.code
  smsConsent: boolean;
  company: string; // honeypot
};

export const emptyContact: ContactValue = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: DEFAULT_COUNTRY.code,
  smsConsent: false,
  company: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function findCountry(code: string): Country {
  return COUNTRIES.find((c) => c.code === code) ?? DEFAULT_COUNTRY;
}

type Props = {
  question: string;
  subtext?: string;
  value: ContactValue;
  onChange: (patch: Partial<ContactValue>) => void;
  onSubmit: () => void;
  onBlocked: (field: string) => void;
  submitting: boolean;
};

const MESSAGES: Record<string, string> = {
  firstName: "Please enter your first name",
  lastName: "Please enter your last name",
  email: "Enter a valid email address, including an @",
  phone: "Enter a valid phone number",
};

export function ContactStep({ question, subtext, value, onChange, onSubmit, onBlocked, submitting }: Props) {
  const [blurred, setBlurred] = useState<Record<string, boolean>>({});
  const country = findCountry(value.countryCode);

  // SMS consent is deliberately NOT in this gate - it must be optional (TCPA/10DLC).
  // Phone stays required (needed to process the application).
  const errors: Record<string, boolean> = {
    firstName: value.firstName.trim().length < 1,
    lastName: value.lastName.trim().length < 1,
    email: !EMAIL_RE.test(value.email.trim()),
    phone: !isValidPhone(value.phone, country),
  };
  const firstError = Object.entries(errors).find(([, bad]) => bad)?.[0];
  const canSubmit = !firstError && !submitting;

  const submit = () => {
    if (canSubmit) onSubmit();
  };

  const markBlur = (name: string) => {
    setBlurred((b) => ({ ...b, [name]: true }));
    if (errors[name]) onBlocked(name);
  };
  const showErr = (name: string) => Boolean(blurred[name] && errors[name]);

  const field = "w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-dim focus:outline-none";
  const errClass = (name: string) => (showErr(name) ? "border-primary-light" : "border-border focus:border-primary");
  const FieldError = ({ name }: { name: string }) =>
    showErr(name) ? <p className="mt-1.5 text-xs text-primary-light">{MESSAGES[name]}</p> : null;

  return (
    <div>
      <h3 className="text-xl md:text-2xl font-display font-semibold leading-tight">{question}</h3>
      {subtext && <p className="mt-2 text-muted">{subtext}</p>}

      {/* Privacy reassurance lives WITH the fields (not as fine print under the
          button) - it's doing persuasion work at the moment of hesitation. */}
      <p className="mt-4 flex items-center gap-2.5 rounded-lg border border-border bg-background/60 px-3.5 py-2 text-sm text-foreground/90">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-primary">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {content.contact.privacyNote}
      </p>

      <div className="mt-4 grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              autoFocus
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              data-posthog-mask
              value={value.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              onBlur={() => markBlur("firstName")}
              className={clsx(field, errClass("firstName"))}
            />
            <FieldError name="firstName" />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              data-posthog-mask
              value={value.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              onBlur={() => markBlur("lastName")}
              className={clsx(field, errClass("lastName"))}
            />
            <FieldError name="lastName" />
          </div>
        </div>

        <div>
          <input
            type="email"
            inputMode="email"
            placeholder="Email address"
            autoComplete="email"
            data-posthog-mask
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
            onBlur={() => markBlur("email")}
            className={clsx(field, errClass("email"))}
          />
          <FieldError name="email" />
        </div>

        <div>
          <div className="flex gap-3">
            <select
              aria-label="Country code"
              value={value.countryCode}
              onChange={(e) => onChange({ countryCode: e.target.value })}
              className={clsx(field, "w-auto max-w-[7.5rem] shrink-0 border-border focus:border-primary")}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.dialCode}
                </option>
              ))}
            </select>
            <input
              type="tel"
              inputMode="tel"
              placeholder="Phone number"
              autoComplete="tel"
              data-posthog-mask
              value={value.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              onBlur={() => markBlur("phone")}
              className={clsx(field, errClass("phone"), "flex-1")}
            />
          </div>
          <FieldError name="phone" />
        </div>

        {/* Honeypot — hidden from users, bots fill it */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={value.company}
          onChange={(e) => onChange({ company: e.target.value })}
          name="company"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {/* SMS consent: dedicated, unchecked by default, optional (does not gate submit).
            The bold callout + gold border exist so nobody misses the box. */}
        <div className="mt-1 rounded-lg border border-primary/35 bg-background/60 p-3">
          <p className="text-sm font-semibold text-foreground">{content.contact.smsCallout}</p>
          <label className="mt-2 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value.smsConsent}
              onChange={(e) => onChange({ smsConsent: e.target.checked })}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
            />
            <span className="text-xs leading-normal text-muted">{content.contact.smsLine}</span>
          </label>
          <p className="mt-2 pl-8 text-xs text-muted-dim">
            <a href={content.contact.privacyHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
              {content.contact.privacyLabel}
            </a>
            <span className="mx-2">·</span>
            <a href={content.contact.termsHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
              {content.contact.termsLabel}
            </a>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
        className={clsx(
          "btn-primary mt-4 w-full sm:w-auto transition-opacity duration-200",
          canSubmit ? "opacity-100" : "opacity-40 cursor-not-allowed"
        )}
      >
        {submitting ? "Sending..." : "Submit"}
        {!submitting && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {!canSubmit && !submitting && (
        <p className="mt-3 text-xs text-muted-dim">Fill in your details above and the button will activate.</p>
      )}
    </div>
  );
}
