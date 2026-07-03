/**
 * The funnel definition. 5 steps: 1 open (unscored) + 3 scored choice + 1 contact.
 *
 * ⚠️ CONTRACT: the `value` strings on scored options are matched character-for-character
 * by Wayfinder's scoring rules. These are DRAFTS. Before launch, copy the exact strings
 * out of Wayfinder admin and paste them here - never retype. A one-character difference
 * = lead scores 0, no rep paged. INCOME strings below are the canonical set already.
 */

export type ChoiceOption = { label: string; value: string };

export type Question =
  | {
      id: string;
      type: "open";
      fieldName: string;
      question: string;
      subtext?: string;
      placeholder?: string;
      minLength: number;
    }
  | {
      id: string;
      type: "choice";
      fieldName: string;
      question: string;
      subtext?: string;
      options: ChoiceOption[];
    }
  | { id: "contact"; type: "contact"; fieldName: "contact"; question: string; subtext?: string };

export const questions: Question[] = [
  {
    id: "situation",
    type: "open",
    fieldName: "situation",
    question: "Where are you at with alcohol right now - and why do you want to change it?",
    subtext: "A sentence or two is perfect. This goes straight to Dan before your call.",
    placeholder: "Be as honest as you like...",
    minLength: 4,
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
    id: "income",
    type: "choice",
    fieldName: "income",
    question: "What is your current monthly income?",
    subtext: "This helps us understand your situation - it stays private.",
    // Canonical income scoring strings — do not edit.
    options: [
      { label: "$100k+ per month", value: "$100k+ Per Month" },
      { label: "$10-100k per month", value: "$10-100k Per Month" },
      { label: "$5-10k per month", value: "$5-10k Per Month" },
      { label: "$3-5k per month", value: "$3-5k Per Month" },
      { label: "$1-3k per month", value: "$1-3k Per Month" },
      { label: "$0-1k per month", value: "$0-1k Per Month" },
    ],
  },
  {
    id: "readiness",
    type: "choice",
    fieldName: "readiness",
    question: "How ready are you to change this in the next 6 months?",
    subtext: "There is no wrong answer - just be honest.",
    options: [
      { label: "I am ready to start now", value: "Ready to start now" },
      { label: "Serious - I just need the right system", value: "Serious, need the system" },
      { label: "Exploring my options", value: "Exploring options" },
      { label: "Just curious for now", value: "Just curious" },
    ],
  },
  {
    id: "contact",
    type: "contact",
    fieldName: "contact",
    question: "Where should we send your call details?",
    subtext: "Almost done. We will only use this to arrange your discovery call.",
  },
];

export const TOTAL_STEPS = questions.length;
