/**
 * The funnel definition. 6 steps:
 *   Q1 situation (choice + conditional "Something else" text)
 *   Q2 lifeArea (choice)
 *   Q3 drinkingPattern (choice - call-prep / readiness + safety signal)
 *   Q4 readiness (choice, scored)
 *   Q5 investment (choice, scored) - money question sits right before contact
 *   Q6 contact (+ optional SMS consent)
 *
 * ⚠️ CONTRACT: the `value` strings on scored options are matched character-for-character
 * by Wayfinder's scoring rules. Copy the final strings out of Wayfinder admin before
 * launch - never retype. A one-character difference = lead scores 0, no rep paged.
 *
 * ⚠️ Q5 investment scoring bands (remap pending Wayfinder admin):
 *   "Ready to invest if it's a fit"   -> highest band
 *   "Depends on the commitment"       -> middle band
 *   "Not right now"                   -> lowest band
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
      optional?: boolean;
    }
  | {
      id: string;
      type: "choice";
      fieldName: string;
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
    id: "drinkingPattern",
    type: "choice",
    fieldName: "drinkingPattern",
    question: "Where are you in your drinking pattern right now?",
    subtext: "This helps us understand the best timing and structure for your call.",
    options: [
      { label: "I haven't had a drink in 7+ days", value: "Haven't drunk in 7+ days" },
      { label: "I drank within the past few days", value: "Within the past few days" },
      { label: "I drank yesterday", value: "Yesterday" },
      { label: "I've had a drink today", value: "Today" },
    ],
  },
  {
    id: "readiness",
    type: "choice",
    fieldName: "readiness",
    question: "How ready are you to start this now?",
    subtext: "There's no wrong answer. Be honest.",
    options: [
      { label: "Ready to start, I need to change", value: "Ready to start, I need to change" },
      { label: "Serious - I just need the right system", value: "Serious, need the system" },
      { label: "Exploring my options", value: "Exploring options" },
      { label: "Not ready yet", value: "Not ready yet" },
    ],
  },
  {
    id: "investment",
    type: "choice",
    fieldName: "investment",
    question: "If the Clear Choice Program turns out to be a fit, how do you feel about investing in yourself?",
    subtext: "This just helps us have an honest conversation on the call.",
    options: [
      { label: "If it's the right fit, I'm ready to invest", value: "Ready to invest if it's a fit" },
      { label: "I'm not sure, it depends on a few things lining up and knowing the commitment required first", value: "Depends on the commitment" },
      { label: "I'm not in a position to invest right now", value: "Not right now" },
    ],
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
