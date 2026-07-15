---
name: verify
description: Build, launch, and visually verify the clearmind-clearlife funnel pages
---

# Verify: clearmind-clearlife

- Build: `npm run build` (lint + typecheck run inside it). Serve: `npm start` on port 3000.
  If `EADDRINUSE`, a previous `next start` child survived — `netstat -ano | grep :3000`
  then `taskkill //PID <pid> //F`.
- Drive with Playwright: chromium is already installed system-wide; `npm install playwright`
  in a scratch dir gives the module. Screenshot desktop at 1440x900 and mobile at 390x844.
- Key flows: landing hero (the application form `#apply` lives inside the hero section),
  6-step questionnaire (choice options auto-advance on click; contact step is last).
- ⚠️ NEVER click Submit on the contact step — it posts a real lead to the production
  Wayfinder webhook. Fill the fields to check validation/enable state, then stop.
  Verify `/thank-you` by navigating to it directly.
- The `/thank-you` booking iframe is the external Wayfinder booking app — it often sits on
  its spinner in headless runs. Verify page layout and iframe geometry, not iframe content.
