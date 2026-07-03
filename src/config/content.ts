/**
 * ALL site copy. Voice: Dan Hunter, peer-to-peer to business owners — direct,
 * concrete, unsentimental. No hype words, no "Not X. Just Y." headlines, each
 * phrase used once. Hyphens, never em dashes. No unverified stats.
 * Sourced from Dan's pitch deck / program / framework docs (see ASSETS.md).
 */

export const content = {
  brand: {
    name: "Clear Mind, Clear Life",
    coach: "Dan Hunter",
    logo: "/logo.png",
    logoMark: "/logo-mark.png",
    instagram: "https://www.instagram.com/", // [CONFIRM handle]
    youtube: "https://www.youtube.com/@clearmind-clearlife",
    privacyUrl: "https://www.wayfindercollective.io/privacy",
    entity: "Wayfinder Coaching",
    nav: [
      { label: "The cost", href: "#problem" },
      { label: "The method", href: "#method" },
      { label: "The program", href: "#program" },
      { label: "Results", href: "#results" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  header: {
    ctaLabel: "Apply for a call",
  },

  hero: {
    kicker: "Quit drinking · for business owners",
    headline: "Get alcohol out of the way",
    headlineDim: "of the life you are building.",
    subhead:
      "A private program for business owners and professionals who function fine on the outside and know drinking is costing them on the inside. You keep running your life. We get the alcohol handled.",
    cta: "Apply for a call",
    meta: "Six-month program · 1:1 plus weekly group calls · Founded by Dan Hunter, sober since 2017",
  },

  performanceTax: {
    kicker: "The cost",
    heading: "The real cost of high-functioning drinking",
    intro:
      "On paper you are doing well. In private you know you are running at 70 to 80 percent of what you have got. Nobody else sees it, which is exactly why it keeps going.",
    points: [
      "Mornings you quietly write off, and decisions that come slower than they should",
      "A shorter fuse with your team and the people at home",
      "Confidence and drive that slip a little further each year",
      "The thought that if someone on your team worked like this, you would have a word with them",
    ],
    closer: "Most people I work with are not in crisis. They are just done operating with the handbrake on.",
  },

  whatThisIs: {
    kicker: "What this is",
    heading: "I treat this like a business problem, because that is what it is",
    paragraphs: [
      "There is no group circle and no talk of being powerless. We look at drinking the way you would look at anything else draining time, money and focus out of your operation, then we go and fix the inputs.",
      "You will not be asked to call yourself an alcoholic or swear off it forever on day one. You get a clear method and a small room of people who run businesses and think the way you do.",
      "And we work on why you drink, not only whether you drink. Change the reason and the behaviour follows. That is the part that holds once the early motivation wears off.",
    ],
  },

  framework: {
    kicker: "The method",
    heading: "The Clear Choice Framework",
    lede: "One question you can run in the moment, so a drink becomes a decision instead of a reflex. Instead of 'do I fancy one', you learn to ask 'does this match what I am building'.",
    principles: [
      { key: "Pause", title: "Pause", body: "Put a gap between the urge and the pour. That gap is where the whole thing turns." },
      { key: "Expose", title: "Expose", body: "Name what you are telling yourself the drink will do. Relax you, reward you, switch you off." },
      { key: "Test", title: "Test", body: "Hold that story against your own evidence: your sleep, your next morning, your temper, your numbers." },
      { key: "Choose", title: "Choose", body: "Decide as the person you are becoming, not the tired version of you at 8pm." },
    ],
    closer: "Willpower runs out. A better question, asked at the right moment, does not.",
  },

  howItWorks: {
    kicker: "The program",
    heading: "How the six months run",
    steps: [
      { n: "01", title: "Apply and talk", body: "You fill in the form and we get on a call. If I do not think I can help you, I will say so." },
      { n: "02", title: "The 12-week intensive", body: "Weekly group calls plus 1:1 time. We steady the first month, then rebuild your work, social life and identity around it." },
      { n: "03", title: "Drill the framework", body: "You run the Clear Choice Framework on real situations - client dinners, travel, the Friday wind-down - until it is automatic." },
      { n: "04", title: "Maintenance and the hotline", body: "Months four to six protect what you built, with a private line for the wobble at 9pm on a Tuesday." },
    ],
  },

  outcomes: {
    kicker: "What changes",
    heading: "What you get back",
    intro: "Less about removing a drink, more about what fills the space it leaves.",
    items: [
      "Mornings that start sharp instead of foggy",
      "Sleep that holds, and the mood that comes with it",
      "Lower anxiety and cleaner decisions under pressure",
      "Energy, drive and libido back where they used to be",
      "You doing the things you said you would do, again",
      "Full attention on the business instead of half of it",
      "More of you in the room with your family",
      "The quiet proof that you can run at full clarity without it",
    ],
  },

  results: {
    kicker: "Results",
    heading: "They were where you are now",
    intro: "Real clients, in their own words. Business owners and professionals who got the alcohol handled and kept building.",
  },

  whyItWorks: {
    kicker: "Why it sticks",
    heading: "Why this holds when the last attempt did not",
    cards: [
      { title: "Root cause, not white-knuckling", body: "We change the thinking behind the drink, so you are not fighting yourself every evening for the rest of your life." },
      { title: "Built for a full calendar", body: "Client dinners, travel, deals closing, stress stacking. The plan assumes your real week, not a quiet one." },
      { title: "Support at the wrong moment", body: "A private line for the Tuesday night when you are about to talk yourself into one. That is when it counts." },
    ],
    stats: [] as { value: string; label: string }[],
  },

  whoItsFor: {
    kicker: "Fit",
    heading: "Who this is for",
    forHeading: "This is for you if",
    forItems: [
      "You run a business or carry real responsibility at work",
      "You look fine from the outside and know the inside story",
      "You want this handled as performance, not a moral failing",
      "You are ready to be honest and do the work",
    ],
    notHeading: "This is not for you if",
    notItems: [
      "You want a hack or a patch, not a change",
      "You want to keep negotiating your way back to moderate drinking",
      "You are not willing to look at this straight",
      "You are physically dependent and need a medical detox first. See a doctor - that comes before any coaching.",
    ],
  },

  about: {
    kicker: "Dan Hunter",
    heading: "I stopped in 2017. My revenue went up, not down.",
    paragraphs: [
      "For years I looked like I had it together while running at half of what I had. I was not the man in the gutter. I was high-functioning, which is the version nobody stages an intervention for.",
      "Then I stopped. The fog lifted, the mornings came back, and the work got sharper. The thing I was scared to lose turned out to be the thing holding me back.",
      "I built Clear Mind, Clear Life to hand other business owners the method and the in-the-moment support I had to work out the hard way.",
    ],
    portrait: "/dan-portrait.jpg",
  },

  faq: {
    kicker: "Questions",
    heading: "Straight answers",
    items: [
      { q: "Is this AA or a 12-step program?", a: "No. There is no label to accept and no powerlessness to admit. We treat drinking as a performance problem and give you a method to solve it." },
      { q: "Do I have to quit forever or call myself an alcoholic?", a: "No. This is about the choices you make and the person you are becoming, not a title you have to wear. The aim is simple: make not drinking the obvious call and prove to yourself you run better without it." },
      { q: "I have tried to stop before and it did not last. Why would this?", a: "Because we fix the reason behind the drink, not only the drink, and you get real support in the exact moments most programs leave you on your own." },
      { q: "How much time does it take?", a: "Weekly group calls, 1:1 time as you need it, and a short course you work through at your pace. Most of the change happens in decisions you were already making, made differently." },
      { q: "How long is the program?", a: "Six months. A 12-week intensive to steady things and rebuild, then three months of maintenance to protect what you built and push on the business." },
      { q: "What does it cost?", a: "We cover that on the call, once we both know it is a fit. It is a premium program with direct access to me, priced accordingly." },
      { q: "What happens if I slip?", a: "You do not spiral. We look at which part of the framework broke down, fix it, and move on. A slip becomes information, not proof you are broken." },
      { q: "Is it private?", a: "Completely. Your 1:1 work stays between us, and nothing you share leaves the room." },
    ],
  },

  bottomCta: {
    kicker: "Next step",
    heading: "Let's get the alcohol handled.",
    subhead: "Fill in the form and book a call. We will map out what six months without drinking does for you and the business.",
    cta: "Apply for a call",
  },

  footer: {
    tagline: "Quit drinking without putting your life on hold. Coaching for business owners and professionals.",
    columns: [
      {
        title: "Program",
        links: [
          { label: "The cost", href: "#problem" },
          { label: "The method", href: "#method" },
          { label: "How it runs", href: "#program" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Clear Mind",
        links: [
          { label: "About Dan", href: "#about" },
          { label: "Results", href: "#results" },
          { label: "Apply", href: "#apply" },
        ],
      },
    ],
    disclaimer:
      "Clear Mind, Clear Life provides coaching and education, not medical advice or treatment. If you are physically dependent on alcohol, speak to a doctor before making changes. Individual results vary.",
  },

  contact: {
    smsConsent:
      "I agree to receive SMS messages from Wayfinder Coaching about my application. Msg & data rates may apply. Reply STOP to opt out.",
  },

  thankYou: {
    kicker: "Application received",
    heading: "You're in. Now book the call.",
    subhead: "Pick a time below. Then watch the short video so you turn up to our call ready to use it.",
    bookingHeading: "Book your call",
    vslHeading: "Watch this first",
    nextSteps: [
      "Choose a time on the calendar, it takes about 30 seconds",
      "Add it to your calendar so it does not slip",
      "Watch the short video below before we speak",
      "Come honest. The straighter you are, the more I can do with the call.",
    ],
  },
} as const;

export type SiteContent = typeof content;
