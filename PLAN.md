# Clear Mind Clear Life — Funnel Site Plan (Draft v1)

> Coach: **Dan Hunter** — brand **Clear Mind, Clear Life** (clearmindclearlife.com)
> Offer: quit-drinking / take-control-of-alcohol coaching for **business owners & professionals**.
> Real copy, program docs, logos and testimonials received from Dan — see **ASSETS.md**. The pitch
> deck / program overview / framework PDFs are the authoritative source for all positioning below.
> This plan is specific to this coach. For all reusable mechanism detail (payload shape, offline-first
> submit, retry hook, booking crop, analytics taxonomy, gotchas) see the **Master Funnel Handoff**;
> this doc only records the decisions and content unique to Clear Mind Clear Life.

---

## 1. Goal — collapse the current 5-step maze into ONE page + form + booking

**Current funnel (too many steps):**
`YouTube → Typeform (contact + questions) → Calendly → VSL page → testimonials page → another video page`

**New funnel (what we're building):**
```
YouTube / ads
        │
        ▼
┌─────────────────────────────────────────────┐
│  clearmindclearlife.com  (ONE long-scroll)  │
│  educate → build belief → qualify           │
│  ...every CTA scrolls to the application ▾  │
│  5-step questionnaire (the conversion event)│
└─────────────────────────────────────────────┘
        │  submit → lead posts to Wayfinder OS
        ▼
┌─────────────────────────────────────────────┐
│  /thank-you                                 │
│  ①  Book your call — Wayfinder booking iframe│
│  ②  VSL below/beside it ("watch before your  │
│      call") to warm them + drive show-up rate│
└─────────────────────────────────────────────┘
```

Note the deliberate choice (from Nathan's brief): **VSL comes AFTER booking**, not before. The page's
job is to get the application + the booked call first; the VSL then does show-up/anticipation work on
the thank-you page. (We can A/B a short hero VSL later if show-rate needs it.)

---

## 2. What we know about the coach & offer

**Positioning (from his own live copy):**
- 1-on-1 support, **87% success rate**
- "Without willpower, negative labels, AA, therapy, or medication"
- "No shame, no struggle, no labels"
- Proof stat: **members average $3,200 saved in the first 60 days**
- Audience: business owners, entrepreneurs, professionals — people for whom alcohol is capping their
  performance, not "rock-bottom" cases.

**The mechanism / deeper hook (from Nathan's notes):** it's not about the drink, it's the deep
psychological drivers — **self-esteem, imposter syndrome**. We should name the method (see §5).

**The transformation ("who you become"):**
- Reliable — stick to your word, do what you say you'll do
- Testosterone / sex drive / energy back up
- More present (relationships, family)
- All-in on career & goals, mental clarity
- Able to absorb pressure and keep moving

**The program (for FAQ / How-It-Works, usually not priced on-page):**
- 6 months total
- 13-week core curriculum taught over **weekly calls**
- then **biweekly maintenance calls** for the rest of the 6 months
- includes a breakthrough/mapping session, custom plan, 1-on-1 + group mastermind calls

---

## 3. Competitor landscape (why we go dark)

Full teardown in research notes. The short version:

| Competitor | Audience | Look | Funnel |
|---|---|---|---|
| **Soberclear** (Leon Sylvester) — closest comparable | business owners, "no AA/willpower/rehab", 92% stat | **white / navy corporate** | VSL → quiz → discovery call |
| Alcohol-Free Lifestyle (Swanwick) | executives, "Project 90", UW 98% stat | white / cream | apply → application → consult |
| This Naked Mind (Annie Grace) | broad, no-shame neuroscience | white + pastels | quiz + lead magnet |
| Hello Someday (Casey Davidson) | women | warm neutrals | CTA + free guide |

**The single most useful finding: every serious competitor is light-themed and looks like a clinic or
a corporate consultancy.** Dan's existing YouTube brand is already **black + gold, bold, high-energy**.
So the art direction writes itself: **lean into dark premium.** It (a) matches his existing identity,
(b) is the biggest visual differentiator in the category, and (c) reads "high-status performance
upgrade," not "recovery / rehab" — exactly the promise this audience wants.

**Structure to emulate (Soberclear's mechanics, inverted skin):** hard success stat + named mechanism
+ the "without AA/willpower/rehab" negation + real before/after proof + employer/credential logos +
repeated single-CTA. We keep those bones and dress them dark.

---

## 4. Art direction (LOCKED — refined dark-editorial with conviction)

**Decision:** refined **dark-editorial premium**, black + gold. Chosen because the audience is business
owners & professionals — this register reads "executive advisor," not "motivational recovery guru," and
is the sharpest differentiator in an all-white category. Kept **confident and masculine, not delicate**:
bold high-contrast serif display headlines with conviction, clean sans body, generous whitespace,
hairline rules, gold used sparingly (CTAs, key numbers, one emphasis word). Honor the handoff's
anti-AI-tell rules (no gradient text, no glassmorphism, no glowing CTAs). If the hero reads too quiet we
dial up headline weight/size — the punch lever, not glow.

Palette taken from Dan's actual logo (a silver + gold "CC" infinity monogram on black — the file is
literally the "Platinum" logo), so the brand is **black + gold + platinum/silver**. Sample exact hexes
from `brand-source/logos/Clear Mind Platinum Logo.png` at build time; approximate:

```css
--background:  #0a0a0a;   /* near-black (matches logo bg) */
--surface:     #141414;   /* charcoal cards */
--foreground:  #F5F1E8;   /* warm ivory text */
--primary:     #F0C24A;   /* brand GOLD — bright warm yellow-gold from the logo (re-skin lever) */
--primary-dark:#C99A2E;
--primary-light:#F7D77E;
--platinum:    #C9CDD2;   /* secondary metallic — the silver 'C' / "Clear Mind" wordmark */
--muted:       #8a8a82;
--border:      rgba(255,255,255,0.08);
```
Use gold as the hero accent and platinum/silver as the quiet secondary (rules, sub-labels, the "Clear
Mind" half of the wordmark) — mirrors the logo's own two-tone split.
- **Type:** bold confident sans for headlines (condensed/tight, matching the banner's energy), clean
  neutral sans for body. (If we go "refined-editorial" instead, headlines become a high-contrast serif
  — that's the fork in Question 1.)
- Gold used with discipline: CTAs, key numbers, one word of headline emphasis — never everywhere.
- Respect the handoff's anti-AI-tell rules if we pick the editorial route (no glow/glass/gradient-text).
- Accent glow / subtle motion is OK if we pick the "bold premium" route.

---

## 5. The mechanism — RESOLVED: "The Clear Choice Framework"

Dan already has a named method: **The Clear Choice Framework** (full write-up in
`brand-source/program-docs`). This becomes its own page section and the spine of "Why It Works."

- **One-line promise:** stop asking *"Do I feel like a drink?"* and start asking *"Does this choice
  match the life I'm building?"* — decisions from identity & ROI, not impulse. **Not willpower.**
- **4 core principles (the visual):** **Pause · Expose · Test · Choose.**
- **7-step model (for a deeper block / FAQ / lead-nurture):** Name the Decision → Remember Who's in
  Charge (future you) → Surface the Assumption → Test It Against Your Own Evidence (first-principles) →
  Compare the Real Trade (Option A vs B) → Make a Clear Choice & Own It → Debrief Without Shame.
- It's explicitly a *first-principles* framing (a genuine, ownable version of what Soberclear gestures
  at) — flatters the analytical business-owner audience.

---

## 6. Page section order (long-scroll, tuned for cold YouTube/ad traffic)

Following the handoff's proven order, adapted to Dan's offer. Copy is **bracketed placeholder** where
Dan hasn't written final words — Nathan/Dan supply the words, we build the frame.

1. **Header** — sticky, transparent at top: logo + "Apply Now" + optional scarcity badge ("X spots this month").
2. **Hero** — headline + subhead + "Apply Now" (scrolls to form).
   - Draft H1 angle: *"Break free from alcohol — without willpower, AA, or rehab."*
   - Draft subhead: business-owner framing + the 87% / $3,200 proof.
3. **The cost of staying the same** — short empathetic "is this you?" — the high-functioning drinker
   who looks fine but knows it's capping them (imposter syndrome / self-esteem hook).
4. **Video testimonial carousel** — 3 short client videos, auto-scroll, inline click-to-unmute (no modal).
5. **"What this actually is"** — 3 short paragraphs killing the "another fad / another rehab" objection.
   It's a system, root-cause, no shame, no labels.
6. **Social proof strip** — press / screenshots / DMs (4-up).
7. **How it works** — 4 steps: Apply → Breakthrough Call → Custom Plan (13-week curriculum) → Ongoing
   support (weekly → biweekly over 6 months).
8. **Who you become** — the transformation checklist (reliability, energy/testosterone, presence,
   career all-in, mental clarity, absorbing pressure). 6-8 checkmark bullets.
9. **Why it works** — 3 cards (root-cause vs willpower / system not shame / built for professionals) +
   a stats row (87% success · $3,200 saved in 60 days · clients coached · YouTube reach).
10. **APPLICATION QUESTIONNAIRE** — the conversion event (§7).
11. **Who this is for / Don't apply if…** — qualifies & raises selectivity (business owners/professionals
    serious about change; not for people wanting a quick hack or not ready).
12. **About Dan** — the vulnerable founder story: his own drinking → discovery → method.
13. **FAQ** — cost ("discussed on the call"), time commitment, "I've tried everything," "is this AA?",
    "do I have to quit forever / label myself?"
14. **Bottom CTA** — second scroll-to-form pass.
15. **Footer** — © Clear Mind Clear Life / Wayfinder entity · Privacy (wayfindercollective.io/privacy) ·
    Instagram/YouTube · any required disclaimer.
16. **Success → `/thank-you`** — booking iframe + VSL (§8).

One verb everywhere: **"Apply Now."** Every CTA records its location for last-CTA attribution.

---

## 7. The questionnaire (5 steps — DRAFT, answer strings are a Wayfinder contract)

Structure per handoff: **1 open text (unscored) + 3 scored multiple-choice + 1 contact.**
⚠️ The scored answer strings below are DRAFT — the **final strings must be copied character-for-character
out of Wayfinder admin** once Dan's funnel scoring is configured, or leads score 0 and no rep is paged.

**Step 1 — open text (unscored, low-commitment first action):**
> "Where are you at with alcohol right now — and why do you want to change it?"
> (min 4 chars; qualitative context for Dan)

**Step 2 — scored: impact / life area**
> "What's drinking costing you the most right now?"
> options e.g. Health & energy / My business & focus / My relationships & family / My self-respect
> *(map to Wayfinder lifeArea scoring)*

**Step 3 — scored: income (qualifier — canonical strings, do NOT retype):**
> "What's your current monthly income?"
> `$100k+ Per Month` / `$10-100k Per Month` / `$5-10k Per Month` / `$3-5k Per Month` /
> `$1-3k Per Month` / `$0-1k Per Month`

**Step 4 — scored: readiness / commitment**
> "How ready are you to fix this in the next 6 months?"
> options e.g. "I'm ready to start now" / "Serious, need the right system" / "Exploring options" /
> "Just curious" *(map to Wayfinder readiness/commitment scoring)*

**Step 5 — contact:** first name, last name, email, full intl phone (country picker),
**SMS consent checkbox (required, TCPA)** — consent copy names **"Wayfinder Coaching"** as sender:
> "I agree to receive SMS messages from Wayfinder Coaching about my application. Msg & data rates may
> apply. Reply STOP to opt out."

Behavior (all from handoff): choice steps auto-advance ~300ms; open/contact validate before advancing;
progress persists to `clearmind-clearlife-application-progress`; honeypot field; fire-once submit guard;
custom rAF scroll-to-form.

---

## 8. Thank-you page (`/thank-you`) — booking + VSL

- **Two columns (desktop) / stacked (mobile):**
  - **Left/top:** "You're in — book your call" + Wayfinder booking iframe
    (`wayfindercollective.io/book/team/<round-robin-slug>`), **prefilled** with name/email/phone from
    the submit (sessionStorage handoff). Crop Wayfinder's header (negative marginTop). **No `sandbox` attr.**
  - **Right/bottom:** **VSL** — "Watch this before your call" (YouTube/Vidalytics). This is where Dan's
    existing VSL goes, doing the warm-up work that used to be spread across 3 separate pages.
- 10s iframe-load fallback → "Book Your Call Now" external link card.
- Preconnect to wayfindercollective.io from the questionnaire on mount.

---

## 9. Wayfinder wiring (money path — see handoff §5 for full detail)

- **Endpoint:** `POST https://{convex}.convex.site/api/funnel/{clearmind-slug}/lead`,
  header `Authorization: Bearer {API_KEY}`. Client-side direct POST (Pattern A) is the default; we can
  use the Next.js server-proxy (Pattern B) if we want the key off the client (mild plus given the
  sensitive niche — decided by stack choice).
- Offline-first: **save to localStorage BEFORE fetch**, always advance to success, 30s syncing lock,
  `usePendingLeadsSync` retry hook, `?admin=pending-leads` recovery page.
- Payload: send scored fields flat **and** nested under `responses` (free, whichever the handler reads
  wins). `source: 'clearmindclearlife.com'`, `funnel: '<slug>'`, first-touch UTMs.
- Honeypot → silent fake success.
- **Before launch:** funnel slug + scoring + round-robin booking link configured in Wayfinder;
  clearmindclearlife.com added to the funnel's **CORS allowlist**; separate slug+key for Preview vs Prod.

---

## 10. Analytics & attribution (build in from day one — handoff §7)

- PostHog with the standard cross-site event taxonomy (cta_clicked, form_started, question_*,
  form_submitted, wayfinder_lead_sent with `source: immediate|retry`, etc.).
- First-touch write-once UTM capture (so a YouTube click that converts next week still attributes to
  the video) + last-CTA attribution.
- **Vanity per-video links** (Dan drops clean links in his YouTube videos, e.g.
  `clearmindclearlife.com/imposter`) → redirect to `?utm_campaign=<slug>`. High value given his channel
  is the main traffic source. Slug normalization must match the Wayfinder VU store exactly.

---

## 11. Recommended stack

**Next.js (App Router) + TypeScript + Tailwind v4**, two routes: `/` (landing + questionnaire) and
`/thank-you` (booking + VSL). Rationale: the "book, then VSL on a second page" flow is a clean fit for a
separate `/thank-you` route; server-side proxy option available for the sensitive niche; it's the stack
of the most recent builds. (Vite SPA one-pager is the alternative — faster to iterate, fine if we keep
everything single-page with an inline success screen. This is Question 2.)

---

## 12. Build order (once plan is locked)

1. Scaffold stack + `globals.css` tokens (the black/gold vars above) + fonts → empty dark branded page
   deployed to Vercel day one.
2. Static sections top-to-bottom, copy in config/JSON (bracketed placeholders OK), scroll reveals,
   CTAs → stub form.
3. Questionnaire config + slides + auto-advance + localStorage + contact step.
4. Wayfinder wiring (set up the funnel in Wayfinder FIRST) — env, payload, offline-first, retry,
   honeypot, admin recovery.
5. `/thank-you` — booking iframe (prefill) + VSL.
6. Analytics taxonomy + last-CTA + first-touch UTM + vanity links.
7. Polish: favicon/OG from Dan's mark, Lighthouse, **full pass on a real phone** (iframe crop + video
   carousel are the device-specific risks).
8. Run the 10-step pre-launch test plan — especially a **scored test lead + confirm the Slack page** on
   a HOT lead before calling it launched.

---

## 13. Inputs we need (from Nathan / Dan / Wayfinder admin)

**Brand & assets**
- [ ] Confirm coach's name (Dan?) + business entity for footer/meta/SMS copy
- [ ] Logo (square PNG, transparent) + exact gold hex from the real brand
- [ ] Hero photo of Dan; founder portrait; any before/after or lifestyle shots
- [ ] 3 testimonial videos (30-90s); the VSL video (YouTube or Vidalytics ID)
- [ ] Social-proof assets (press, screenshots, DMs) + real stats (clients coached, YouTube views/subs)
- [ ] Dan's founder story (the vulnerable version)

**Copy / offer**
- [ ] Final method name (§5) and hero headline/subhead direction
- [ ] Niche FAQ answers; any required legal/medical disclaimer for the alcohol niche
- [ ] Confirm price/duration facts for FAQ (not quoted on-page)

**Wayfinder (contracts — nothing wires without these)**
- [ ] Funnel slug + per-funnel API key (Prod + separate Preview)
- [ ] The **exact scored answer strings + field names** for each question (copy from admin)
- [ ] Round-robin booking slug
- [ ] Convex webhook base URL; add clearmindclearlife.com to CORS allowlist

**Analytics**
- [ ] PostHog project key/host; Instagram + YouTube handles

---

## 14. Decisions (LOCKED)
1. **Art direction:** refined dark-editorial, black + gold, serif display headlines (§4).
2. **Stack:** Next.js (App Router) + TypeScript, two-page (`/` + `/thank-you`), server-side proxy for
   the Wayfinder key (Pattern B) given the sensitive niche.
3. **VSL:** after booking only — on `/thank-you` beside the calendar. No hero VSL for v1.
