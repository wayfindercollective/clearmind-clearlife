/**
 * The funnel definition. 6 steps (positive-framed):
 *   Q1 situation   (choice + conditional "Something else" text) - current drinking pattern
 *   Q2 lifeArea    (choice) - what they want to GAIN
 *   Q3 readiness   (choice) - do they want to change now
 *   Q4 investment  (choice) - commitment to move forward
 *   Q5 position    (choice) - position at work (qualifier)
 *   Q6 contact     (+ optional SMS consent)
 *
 * ⚠️ CONTRACT: the `value` strings on scored options are matched character-for-character
 * by Wayfinder's scoring rules. Copy the final strings out of Wayfinder admin before
 * launch - never retype. Labels are positive; VALUES kept stable across the reframe so
 * scoring config doesn't need re-doing for lifeArea/readiness/investment.
 *
 * ⚠️ Scoring bands still pending Wayfinder admin for investment + position.
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
    question: "What is your current drinking pattern?",
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
    question: "What are you looking to gain from cutting back your drinking?",
    subtext: "Pick the one that matters most.",
    // Positive labels; values kept stable (scoring contract unchanged).
    options: [
      { label: "Sharper focus and performance at work", value: "Work & performance" },
      { label: "More energy and better health", value: "Health & energy" },
      { label: "Stronger relationships with my family", value: "Relationships & family" },
      { label: "More confidence and self-respect", value: "Self-respect & confidence" },
    ],
  },
  {
    id: "readiness",
    type: "choice",
    fieldName: "readiness",
    question: "Do you want to change this right now?",
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
    question: "If Dan opened up his availability to take you on as a client, how committed are you to move forward?",
    subtext: "This just helps us have an honest conversation on the call.",
    options: [
      { label: "If it's the right fit, I'm ready to invest", value: "Ready to invest if it's a fit" },
      { label: "I'm not sure, it depends on a few things lining up and knowing the commitment required first", value: "Depends on the commitment" },
      { label: "I'm not in a position to invest right now", value: "Not right now" },
    ],
  },
  {
    id: "position",
    type: "choice",
    fieldName: "position",
    question: "What best describes your position at work?",
    subtext: "This helps us understand where you're coming from.",
    options: [
      { label: "Business owner / CEO", value: "Business owner / CEO" },
      { label: "Manager", value: "Manager" },
      { label: "Employee", value: "Employee" },
      { label: "Not working right now", value: "Not working" },
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
