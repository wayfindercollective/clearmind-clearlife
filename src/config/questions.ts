/**
 * The funnel definition. 6 steps:
 *   Q1 choice (+ conditional "Something else" text) -> Q2 choice -> Q3 choice (investment)
 *   -> Q4 choice -> Q5 optional open -> Q6 contact.
 *
 * ⚠️ CONTRACT: the `value` strings on scored options are matched character-for-character
 * by Wayfinder's scoring rules. Copy the final strings out of Wayfinder admin before
 * launch - never retype. A one-character difference = lead scores 0, no rep paged.
 *
 * ⚠️ Q3 (investment) REPLACES the old income question by client decision (July 2026).
 * Wayfinder-side scoring must be remapped before deploy:
 *   "Yes, comfortably"        -> highest score band
 *   "Yes, with some planning" -> middle band
 *   "Not right now"           -> lowest band
 * Also update the CRM field label + any sales notifications/call-prep views that
 * displayed the old income value. Do not ship front-end without the scoring remap.
 */

export type ChoiceOption = {
  label: string;
  value: string;
  /** When selected, reveals a required text input instead of auto-advancing. */
  requiresText?: boolean;
  textPlaceholder?: string;
};

export type Question =
  | {
      id: string;
      type: "open";
      fieldName: string;
      question: string;
      subtext?: string;
      placeholder?: string;
      minLength: number;
      /** Skippable with no validation; empty value is simply omitted. */
      optional?: boolean;
    }
  | {
      id: string;
      type: "choice";
      fieldName: string;
      /** Where the conditional "requiresText" answer text is stored (e.g. situationDetail). */
      detailFieldName?: string;
      question: string;
      subtext?: string;
      options: ChoiceOption[];
    }
  | { id: "contact"; type: "contact"; fieldName: "contact"; question: string; subtext?: string };

export const questions: Question[] = [
  {
    id: "situation",
    type: "choice",
    fieldName: "situation",
    detailFieldName: "situationDetail",
    question: "Where are you at with alcohol right now?",
    options: [
      { label: "I drink most days and I want to get control of it", value: "I drink most days and I want to get control of it" },
      { label: "I keep saying I'll cut down and it never sticks", value: "I keep saying I'll cut down and it never sticks" },
      { label: "Something happened recently that scared me", value: "Something happened recently that scared me" },
      { label: "From the outside I'm fine, but I know it's a problem", value: "From the outside I'm fine, but I know it's a problem" },
      { label: "Something else", value: "Something else", requiresText: true, textPlaceholder: "Say it in your own words..." },
    ],
  },
  {
    id: "lifeArea",
    type: "choice",
    fieldName: "lifeArea",
    question: "What is drinking costing you the most right now?",
    subtext: "Pick the one that stings the most.",
    options: [
      { label: "My focus & performance at work", value: "Work & performance" },
      { label: "My health & energy", value: "Health & energy" },
      { label: "My relationships & family", value: "Relationships & family" },
      { label: "My self-respect & confidence", value: "Self-respect & confidence" },
    ],
  },
  {
    id: "investment",
    type: "choice",
    fieldName: "investment",
    question: "If this turns out to be a fit, are you in a position to invest in six months of private coaching?",
    // Scoring contract - see file header. Strings must match Wayfinder admin exactly.
    options: [
      { label: "Yes, comfortably", value: "Yes, comfortably" },
      { label: "Yes, with some planning", value: "Yes, with some planning" },
      { label: "Not right now", value: "Not right now" },
    ],
  },
  {
    id: "readiness",
    type: "choice",
    fieldName: "readiness",
    question: "How ready are you to change this in the next 6 months?",
    subtext: "There's no wrong answer. Be honest.",
    options: [
      { label: "I am ready to start now", value: "Ready to start now" },
      { label: "Serious - I just need the right system", value: "Serious, need the system" },
      { label: "Exploring my options", value: "Exploring options" },
      { label: "Just curious for now", value: "Just curious" },
    ],
  },
  {
    id: "notes",
    type: "open",
    fieldName: "notes",
    question: "Anything else we should know before the call?",
    subtext: "Optional. Goes straight to Dan.",
    placeholder: "Whatever you think is worth saying...",
    minLength: 0,
    optional: true,
  },
  {
    id: "contact",
    type: "contact",
    fieldName: "contact",
    question: "Where should we send your call details?",
    subtext: "Almost done. We'll only use this to arrange your call.",
  },
];

export const TOTAL_STEPS = questions.length;
