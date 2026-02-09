# STATE.md -- Planifactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Phase 3 complete. Full landing page assembled: Hero, FeatureHighlights (5 icon cards), SocialProof (logos + testimonials), CTABanner (brand-blue CTA). All sections render in EN and BG. Ready for Phase 4 (Animated Gantt & Visuals).

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 3 -- Layout Shell & Landing Page (COMPLETE)
**Current Plan:** 03-04 complete (4 of 4 in phase)
**Status:** Phase complete
**Last activity:** 2026-02-09 -- Completed 03-04-PLAN.md

**Progress:**
```
Phase 1: Foundation & i18n          [==========] VERIFIED
Phase 2: Brand Identity & Design    [==========] VERIFIED
Phase 3: Layout Shell & Landing     [==========] COMPLETE
Phase 4: Animated Gantt & Visuals   [          ] Not Started
Phase 5: Content Pages              [          ] Not Started
Phase 6: Blog Infrastructure        [          ] Not Started
Phase 7: Interactive Features       [          ] Not Started
Phase 8: SEO & Performance          [          ] Not Started
Phase 9: Blog Content & Launch      [          ] Not Started
```

**Overall:** 3/9 phases complete | 5/25 requirements done | 10/~25 plans complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 10 |
| Plans failed | 0 |
| Requirements completed | 5/25 (FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06) |
| Phases completed | 3/9 |

---

## Accumulated Context

### Key Decisions
| Decision | Rationale | Phase |
|----------|-----------|-------|
| i18n in Phase 1 | Retrofitting causes rewrites (research-validated) | 1 |
| Brand time-boxed | 1-2 weeks max to prevent paralysis (research flag) | 2 |
| Gantt scope-limited | 3-day time-box, choreographed animation only (research flag) | 4 |
| Contentlayer rejected | Abandoned/unmaintained -- use @next/mdx + gray-matter | 6 |
| Plausible over PostHog | Lightweight (<1KB), cookieless, GDPR-compliant without consent | 8 |
| next-intl for i18n | Best App Router support, server component support, type-safe | 1 |
| No public pricing | Enterprise/consultative sales -- "Contact for pricing" approach | 5 |
| Present future features as existing | Website shows full platform vision | 5 |
| Tailwind v4 CSS-first config | No tailwind.config.ts; all theme in globals.css @theme inline | 1 |
| shadcn new-york style (default) | Only style in shadcn 3.8.4; old default deprecated | 1 |
| Font Inter deferred to Plan 02 | Layout restructuring for i18n will handle font setup | 1 |
| proxy.ts in src/ not root | Next.js 16 --src-dir watches src/ for convention files | 1 |
| getTranslations in async components | useTranslations not callable in async server components | 1 |
| LanguageSwitcher in minimal header | Temporary placement; Phase 3 will integrate into navigation | 1 |
| navLinks extracted as const arrays | DRY pattern for Header (desktop+mobile) and Footer (product/company/legal) link data | 3 |
| Server-renders-client for Footer LanguageSwitcher | Async server Footer renders client LanguageSwitcher -- valid in Next.js App Router | 3 |
| Brand rename: Planifactor | "Plan + Factory" -- captures AI scheduling for factories | 2 |
| Blue-600 as primary color | oklch(0.546 0.245 262.881) -- vivid, trustworthy B2B blue | 2 |
| Light-mode only (no dark) | Marketing site complexity reduction; no B2B benefit from dark mode | 2 |
| 12px border radius | Rounded, approachable feel for marketing site | 2 |
| Monochrome blue design system | Primary, secondary, accent, charts all blue-family for brand consistency | 2 |
| Logo as inline SVG component | Supports currentColor, white variant, icon-only -- all from one component | 2 |
| SVG favicon via file convention | Scales perfectly, smaller file, brand blue baked in; deleted old favicon.ico | 2 |
| Gantt bars icon (4 staggered rects) | Geometric, recognizable at 16px, communicates scheduling at a glance | 2 |
| HomePage namespace replaced by Hero | Section-specific namespaces (Hero, Features, etc.) instead of monolithic HomePage | 3 |
| Privacy/Terms use Footer namespace | Page titles come from Footer namespace since they appear in footer nav, not main nav | 3 |
| SVG Gantt uses computed layout from constants | Makes bar positions maintainable vs magic numbers; easy to adjust | 3 |
| Home page delegates to Hero component | Page.tsx is composition root; Hero is self-contained async server component | 3 |
| Section composition via fragment | Layout wraps in `<main>`, page uses `<>...</>` to avoid double-wrapping | 3 |
| Company logos as styled text placeholders | Real partner logos will replace these when available | 3 |
| Avatar initials from name.split(' ') | Works for both Latin (EN) and Cyrillic (BG) characters | 3 |
| Secondary button on CTA banner | Creates visual contrast against brand-600 dark blue background | 3 |

### Research Flags
- Phase 4 (Animated Gantt): Animation performance patterns, Gantt mockup implementation -- needs research
- Phase 7 (ROI Calculator): B2B calculator best practices, conservative estimation models -- needs research
- Phases 5, 6 (Content, Blog): Well-documented patterns -- skip research

### Todos
- [x] Verify npm package versions before Phase 1: next@16.1.6, next-intl@4.8.2, tailwindcss@4.1.18
- [x] Confirm Tailwind v4 compatibility with shadcn/ui (confirmed working)
- [x] Configure Inter font with Cyrillic subsets (done in Plan 02)
- [x] Create LanguageSwitcher component (done in Plan 03)
- [x] Verify Phase 1 build end-to-end (done in Plan 03)
- [ ] Validate Bulgarian localization approach with native speaker
- [ ] Define Gantt animation design spec before Phase 4 implementation
- [ ] Define ROI calculator formula with customer data before Phase 7

### Blockers
None currently.

---

## Session Continuity

**Last session:** 2026-02-09 -- Phase 3 Plan 04 execution (phase finale)
**What happened:** Executed 03-04-PLAN.md (Feature Highlights, Social Proof, CTA Banner & Home Page Assembly). Task 1: Created FeatureHighlights (5 Lucide icon cards in 3-col grid) and CTABanner (brand-600 blue background with demo CTA). Task 2: Created SocialProof (6 company name placeholders + 3 testimonial cards with Avatar initials). Task 3: Rewrote page.tsx to compose all 4 sections (Hero, FeatureHighlights, SocialProof, CTABanner) in fragment. Task 4: Human visual verification approved -- full landing page renders correctly in both EN and BG.
**Stopped at:** Completed 03-04-PLAN.md -- Phase 3 complete
**Resume file:** None
**Next action:** Phase 4 (Animated Gantt & Visuals) -- requires research phase first

---
*Last updated: 2026-02-09 after 03-04 execution*
