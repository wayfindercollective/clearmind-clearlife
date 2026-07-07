/**
 * ALL site copy - v2 FINAL per Nathan's enhanced handoff (July 2026).
 * Voice: Dan Hunter, peer-to-peer - direct, concrete, unsentimental.
 * Rules: no hype words, hyphens never em dashes, no unverified stats, natural
 * contractions. The initial call is handled by THE TEAM (no first-person for the
 * initial call); first-person for the program itself ("a private line to me") stays.
 * Program is presented as six months only - no 13-week references anywhere.
 */

export const content = {
  brand: {
    name: "Clear Mind, Clear Life",
    coach: "Dan Hunter",
    logo: "/logo.png",
    logoMark: "/logo-mark.png",
    instagram: "https://www.instagram.com/", // [CONFIRM handle]
    youtube: "https://www.youtube.com/@clearmind-clearlife",
    supportEmail: "support@wayfindercoaching.net",
    privacyUrl: "https://www.wayfindercollective.io/privacy",
    entity: "Wayfinder Coaching",
    // Public Wayfinder round-robin booking slug. Committed so it works on every deploy
    // without env setup; NEXT_PUBLIC_WAYFINDER_BOOKING_SLUG overrides it if set.
    bookingSlug: "dan-team",
    nav: [
      { label: "The cost", href: "#problem" },
      { label: "Results", href: "#results" },
      { label: "The method", href: "#method" },
      { label: "How it works", href: "#program" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  header: {
    ctaLabel: "Apply Now",
  },

  hero: {
    kicker: "Quit drinking · private coaching for busy professionals",
    headline: "You said you'd cut down.",
    headlineDim: "This time, make it stick.",
    subhead:
      "Has the drinking stopped being a choice? Maybe it was a scare at the doctor's. Maybe a relationship at breaking point. Maybe one hangover too many. This is where things change.",
    cta: "Apply Now",
  },

  performanceTax: {
    kicker: "The cost",
    heading: "What it's costing you",
    intro: "It rarely looks like a crisis. Your body doesn't shout about this stuff - it whispers.",
    points: [
      "Wrecked sleep, rising blood pressure, mornings where your heart races before the day begins",
      "The fog is costing you at work. In the judgement calls. In the edge you used to have.",
      "Sunday's promises don't make it to Thursday, and every restart costs a little more self-respect",
      "You're at the table with the people you love, but you're not really there",
    ],
  },

  whatThisIs: {
    kicker: "What this is",
    heading: "No labels, rehab or church basements",
    paragraphs: [
      "\"Am I an alcoholic?\" is the wrong question. The one worth answering: is alcohol giving you more than it's taking? You wouldn't be reading this if the answer was yes.",
      "This is private coaching built around a method. We work on why you drink - the stress, the habit, the story that starts when the glass is already in your hand. So when you're standing in the empty kitchen after a brutal day, there's an actual decision happening, and you're the one making it.",
    ],
  },

  results: {
    kicker: "Results",
    heading: "They were in your situation",
    intro: "Real clients, in their own words.",
    cta: "Apply Now",
  },

  framework: {
    kicker: "The method",
    heading: "The Clear Choice Framework",
    lede: "One question you can run in the moment. Right now the only thing you're asking is \"do I fancy one\", and the answer is always yes. You'll learn to ask something with more weight behind it: \"does this match the life I'm building?\"",
    principles: [
      { key: "Pause", title: "Pause", body: "Put a gap between the urge and the pour." },
      { key: "Expose", title: "Expose", body: "Name what you're telling yourself the drink will do." },
      { key: "Test", title: "Test", body: "Hold that story against your own evidence: the sleep, the 3am wake-ups, the mood, the mornings." },
      { key: "Choose", title: "Choose", body: "Make the decision you'll be glad about at 6am." },
    ],
    closer: "Willpower runs out. A better question, asked at the right moment, doesn't.",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "How the six months run",
    steps: [
      { n: "01", title: "Apply and talk", body: "You fill in the form, then get on a call with my team. We'll tell you straight whether we can help you or not." },
      { n: "02", title: "Rebuild", body: "We steady things first, then you run the Clear Choice Framework on the real stuff - client dinners, travel, the Friday wind-down - until it's automatic." },
      { n: "03", title: "Protect", body: "Then we make sure it holds. Ongoing support while the change beds in, including a private line to me for the Tuesday night when you're about to talk yourself into a drink." },
    ],
  },

  outcomes: {
    kicker: "What changes",
    heading: "What you get back",
    items: [
      "Waking up at 6am clear headed",
      "Energy, libido and the numbers your doctor cares about, all moving the right way",
      "Sticking to your word and doing the things you said you'd do",
      "Dealing with pressure instead of drowning it on a Friday night",
      "The low hum of anxiety gone from the background",
      "Evenings where you're properly there with your kids and your partner",
    ],
    cta: "Apply Now",
  },

  whoItsFor: {
    kicker: "Fit",
    heading: "Who this is for",
    forHeading: "This is for you if",
    forItems: [
      "Something shifted recently: a scare, a warning, a look on someone's face you can't unsee",
      "You want this dealt with privately, without a label attached",
      "You're ready to be straight with yourself",
    ],
    notHeading: "This is not for you if",
    notItems: [
      "You're after a 30-day reset or a quick trick, and aren't prepared to put in the work",
      "You're not ready to be honest about what it's taking from you",
      "You're physically dependent and need a medical detox first. See a doctor - that comes before any coaching.",
    ],
  },

  about: {
    kicker: "Dan Hunter",
    heading: "I quit in 2017 - not from rock bottom, from frustration.",
    paragraphs: [
      "I was the high-functioning version. The one nobody stages an intervention for. Good job, full life, but there was a growing gap between how things looked from the outside and how it really felt to me.",
      "So I stopped. Not quickly or easily. I made years of mistakes. But eventually, I stopped. The fog lifted, the mornings came back, and everything I thought alcohol was helping me cope with got easier without it. Turns out the thing I was scared to lose was the thing in the way.",
      "Clear Mind, Clear Life is the method I wish someone had handed me at the start - for people who want this sorted quietly and for good.",
    ],
    portrait: "/dan-portrait.jpg",
  },

  apply: {
    kicker: "Apply",
    heading: "Apply for a call",
    intro: "A few short questions to see if the Clear Choice approach is a fit for you. Takes about two minutes.",
    confidential: "Everything you share is private and confidential.",
    deRisk: "No hard sell on the call. If we can't help you, we'll tell you straight.",
  },

  faq: {
    kicker: "Questions",
    heading: "Straight answers",
    items: [
      {
        q: "Is this AA or a 12-step program?",
        a: "No. No circle, no label, nobody making you say you're powerless. We treat drinking as a thinking problem with a practical fix, and you do it without putting your life on pause.",
      },
      {
        q: "Do I have to call myself an alcoholic, or promise never to drink again?",
        a: "No and no. Labels do nothing for you, so we skip them. You make a clear decision for the next stretch, see how much better life runs, and decide the long term from there - with a clear head.",
      },
      {
        q: "I've stopped before and it didn't last. Why would this be different?",
        a: "Because willpower was doing all the work last time. It did for me too, for years. This time you get a method for the moments that beat you, and someone in your corner while they're happening - which is exactly what Monday-morning resolutions are missing.",
      },
      {
        q: "My health is already paying for it. Is it too late?",
        a: "For most people, no. Bodies are forgiving once the alcohol stops, and people are routinely surprised how quickly sleep, energy and blood work turn around. But I'm a coach, not a doctor - if something's worrying you, get it checked either way. If you're physically dependent, a medical detox comes first. Then we make the change permanent.",
      },
      {
        q: "How long will it take?",
        a: "Six months. We steady things and rebuild first, then it's ongoing support so the change survives contact with real life. Week to week it's built around your schedule, and we'll walk you through exactly how it runs on the call. No retreats, no clinics - nothing that shows up in your diary as anything other than a meeting.",
      },
      {
        q: "What does it cost?",
        a:
          "It's an investment for us both over a six-month, one-to-one engagement. It is not a $29 app or a course you'll abandon by week three.\n" +
          "Here's the honest maths, though. Add up what you spend on drinks, the dinners that turn into big nights, the taxis, the takeaways the next day, and the days you write off recovering. Over six months, most people I work with find the program costs less than the drinking did. The drinking doesn't give anything back, but your sobriety lasts forever.\n" +
          "We cover exact numbers on the call, once we've both established it's a fit. No pressure tactics. If it's not right for you, I'll tell you.",
      },
      {
        q: "What happens if I slip?",
        a: "You don't spiral. We look at where the implementation of the framework gave way, fix it, and carry on. Nobody resets your counter to zero.",
      },
      {
        q: "Is it private?",
        a: "Completely. It's one of the reasons people choose this over anything with a waiting room. Your 1:1 work stays between us.",
      },
    ],
  },

  bottomCta: {
    kicker: "Next step",
    heading: "Let's get this handled.",
    subhead:
      "Fill in the form and book a call - straight answers and a clear picture of what six months from now looks like. You'll have convinced yourself 'it's not that big of a deal' by Friday. Do something with it while it's still loud.",
    cta: "Apply Now",
  },

  footer: {
    tagline: "Private coaching to quit drinking. For people with a lot to lose - and a lot to get back.",
    columns: [
      {
        title: "Program",
        links: [
          { label: "The cost", href: "#problem" },
          { label: "The method", href: "#method" },
          { label: "How it works", href: "#program" },
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
    // TCPA / 10DLC-compliant consent (informational/operational campaign).
    // Seven load-bearing elements: brand · use-case · frequency · rates · STOP · HELP · no-third-party-share.
    // [BRAND] = "Clear Mind, Clear Life" per handoff. If the 10DLC campaign is registered
    // under Wayfinder, swap to "Wayfinder Coaching" - single-string change.
    smsLine:
      "By providing your phone number, you agree to receive SMS appointment reminders, booking confirmations, and account updates from Clear Mind, Clear Life. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help. We will not share mobile information with third parties for promotional or marketing purposes.",
    privacyLabel: "Privacy Policy",
    privacyHref: "https://wayfindercollective.io/privacy",
    termsLabel: "Terms of Service",
    termsHref: "https://wayfindercollective.io/terms",
  },

  thankYou: {
    kicker: "Application received",
    heading: "You're in. Now book the call.",
    subhead: "Pick a time below. Then watch the short video so you turn up to our call ready to use it.",
    bookingHeading: "Book your call",
    vslHeading: "Watch this first",
    nextSteps: [
      "Book a time on the calendar",
      "Watch the short video below before we speak",
      "Show up to the call being honest, the more you do that, the more we can do on the call",
    ],
  },
} as const;

export type SiteContent = typeof content;
