---
phase: 02-brand-design-system
plan: 02
subsystem: brand-identity
tags: [logo, svg, favicon, typography, responsive, shadcn]
dependency-graph:
  requires: ["02-01"]
  provides: ["Logo component", "SVG favicon", "branded home page"]
  affects: ["03-01", "03-02", "04-01"]
tech-stack:
  added: []
  patterns: ["SVG React component with variant/size props", "responsive typography scale via Tailwind custom tokens", "shadcn Button integration"]
key-files:
  created:
    - src/components/brand/Logo.tsx
    - src/app/icon.svg
  modified:
    - src/app/[locale]/page.tsx
  deleted:
    - src/app/favicon.ico
decisions:
  - id: "LOGO-SVG-INLINE"
    description: "Logo built as inline SVG React component (not external asset) for variant/color flexibility"
    rationale: "Supports currentColor inheritance, white variant for blue backgrounds, and icon-only variant -- all from one component"
  - id: "FAVICON-SVG-OVER-ICO"
    description: "Replaced favicon.ico with icon.svg using Next.js file convention"
    rationale: "SVG favicon scales perfectly at all resolutions, smaller file size, blue brand color baked in"
  - id: "GANTT-BARS-4-RECT"
    description: "Logo icon is 4 staggered rounded rectangles suggesting a Gantt chart"
    rationale: "Simple geometric design recognizable at 16px favicon size, communicates scheduling/planning at a glance"
metrics:
  duration: "~6 minutes (execution) + checkpoint wait"
  completed: "2026-02-09"
  tasks: 3
  commits: 2
---

# Phase 2 Plan 02: Logo, Favicon & Home Page Summary

**SVG Logo component with 3 variants and 4 sizes, blue Gantt-bars favicon, and responsive branded home page with shadcn Buttons and custom typography scale.**

---

## What Was Done

### Task 1: Create Logo component and favicon
**Commit:** `580fa4c`

Created `src/components/brand/Logo.tsx` -- a reusable SVG React component with:
- **3 variants:** `default` (currentColor), `white` (#ffffff for blue backgrounds), `icon` (Gantt bars only, square viewBox)
- **4 sizes:** `xs` (24px/120x24), `sm` (28px/140x28), `md` (36px/180x36), `lg` (48px/240x48)
- **Icon design:** 4 horizontal rounded rectangles of varying lengths and x-offsets, stacked vertically within a 48x48 viewBox. Bars are 4px tall with 4px gaps. The staggered starts and varying widths suggest a Gantt chart / production schedule.
- **Full logo:** Icon + "Planifactor" text (Inter semi-bold, 22px) positioned to the right
- **Accessibility:** `role="img"` and `aria-label="Planifactor"` on all variants
- **Utility:** Uses `cn()` from `@/lib/utils` for className merging

Created `src/app/icon.svg` -- standalone Gantt bars icon with `fill="#2563eb"` (blue-600) for the browser tab favicon. Next.js auto-detects this file convention.

Deleted `src/app/favicon.ico` which would have taken precedence over the new SVG favicon.

### Task 2: Update home page with Logo and brand typography
**Commit:** `c8db542`

Updated `src/app/[locale]/page.tsx`:
- Imported and rendered `<Logo size="lg" className="mb-8" />` centered above the heading
- Applied responsive typography: `text-heading md:text-display lg:text-hero` on the h1 (2.25rem -> 3rem -> 3.5rem)
- Applied responsive body text: `text-base md:text-body-lg` on the description paragraph
- Replaced raw `<button>` elements with shadcn `<Button>` components (default + outline variants, `size="lg"`)
- Adjusted padding from `p-24` to `px-6 py-16 md:px-12 md:py-24` for mobile-friendly layout

### Task 3: Visual verification (checkpoint)
**Status:** Approved by human

User verified at http://localhost:3000:
- Blue Gantt-bars favicon visible in browser tab
- Planifactor logo renders centered above heading
- Buttons use correct shadcn styles (blue primary, outline secondary)
- Responsive typography scales correctly at 375px, 768px, and 1440px breakpoints
- No horizontal overflow on mobile
- Bulgarian locale (/bg) shows same branding with translated text

---

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| LOGO-SVG-INLINE | Logo as inline SVG React component | Supports currentColor, white variant, icon-only -- all from one component |
| FAVICON-SVG-OVER-ICO | SVG favicon via Next.js file convention | Scales perfectly, smaller file, brand blue baked in |
| GANTT-BARS-4-RECT | 4 staggered rounded rects as logo icon | Geometric, recognizable at 16px, communicates scheduling |

---

## Deviations from Plan

None -- plan executed exactly as written.

---

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` passes | PASS |
| Logo component renders 3 variants x 4 sizes | PASS |
| Favicon shows blue Gantt bars in browser tab | PASS (human verified) |
| Home page shows logo + responsive heading + shadcn buttons | PASS (human verified) |
| No horizontal overflow at 375px | PASS (human verified) |
| Brand colors visible throughout | PASS (human verified) |
| Both /en and /bg routes show Planifactor branding | PASS (human verified) |

---

## Key Files

| File | Role |
|------|------|
| `src/components/brand/Logo.tsx` | Reusable SVG logo with variant/size props |
| `src/app/icon.svg` | Blue Gantt-bars favicon (Next.js file convention) |
| `src/app/[locale]/page.tsx` | Home page with Logo, responsive typography, shadcn Buttons |

---

## Next Phase Readiness

Phase 2 is now complete. The brand identity system is ready for Phase 3 (Layout Shell & Landing Page):
- **Logo component** can be placed in the header/footer navigation
- **Typography tokens** (text-hero, text-display, text-heading, etc.) are proven working on the home page
- **Brand color scale** (brand-50 through brand-950) is available for section backgrounds
- **shadcn Button** integration is validated and working with the blue primary theme

No blockers for Phase 3.
