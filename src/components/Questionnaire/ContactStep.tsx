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

export function ContactStep({ question, subtext, value, onChange, onSubmit, onBlocked, submitting }: Props) {
  const [touched, setTouched] = useState(false);
  const country = findCountry(value.countryCode);

  const errors = {
    firstName: value.firstName.trim().length < 1,
    lastName: value.lastName.trim().length < 1,
    email: !EMAIL_RE.test(value.email.trim()),
    phone: !isValidPhone(value.phone, country),
    smsConsent: !value.smsConsent,
  };
  const firstError = Object.entries(errors).find(([, bad]) => bad)?.[0];

  const submit = () => {
    if (submitting) return;
    if (!firstError) onSubmit();
    else {
      setTouched(true);
      onBlocked(firstError);
    }
  };

  const field = "w-full rounded-xl border bg-surface/60 px-4 py-3.5 text-foreground placeholder:text-muted-dim focus:outline-none";
  const errClass = (bad: boolean) => (touched && bad ? "border-primary-light" : "border-border focus:border-primary");

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-display font-semibold leading-tight">{question}</h3>
      {subtext && <p className="mt-3 text-muted">{subtext}</p>}

      <div className="mt-7 grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            autoFocus
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            value={value.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={clsx(field, errClass(errors.firstName))}
          />
          <input
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
            value={value.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={clsx(field, errClass(errors.lastName))}
          />
        </div>

        <input
          type="email"
          inputMode="email"
          placeholder="Email address"
          autoComplete="email"
          value={value.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={clsx(field, errClass(errors.email))}
        />

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
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={clsx(field, errClass(errors.phone), "flex-1")}
          />
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

        <label className="mt-1 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value.smsConsent}
            onChange={(e) => onChange({ smsConsent: e.target.checked })}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--primary)]"
          />
          <span className={clsx("text-sm leading-relaxed", touched && errors.smsConsent ? "text-primary-light" : "text-muted")}>
            {content.contact.smsConsent}
          </span>
        </label>
      </div>

      <button type="button" onClick={submit} disabled={submitting} className="btn-primary mt-7 w-full sm:w-auto">
        {submitting ? "Sending..." : "Apply & Book My Call"}
        {!submitting && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <p className="mt-3 text-xs text-muted-dim">Your details are private and only used to arrange your call.</p>
    </div>
  );
}
