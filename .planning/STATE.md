# STATE.md -- Planifactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Phase 2 in progress. Plan 02-01 (Brand Rename & Design Tokens) complete. Brand name is now Planifactor, primary color is blue-600, typography scale and brand palette defined.

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 2 -- Brand Identity & Design System (In Progress)
**Current Plan:** 02-01 complete, 02-02 pending
**Status:** In progress
**Last activity:** 2026-02-09 -- Completed 02-01-PLAN.md

**Progress:**
```
Phase 1: Foundation & i18n          [==========] VERIFIED
Phase 2: Brand Identity & Design    [=====     ] Plan 1/2 complete
Phase 3: Layout Shell & Landing     [          ] Not Started
Phase 4: Animated Gantt & Visuals   [          ] Not Started
Phase 5: Content Pages              [          ] Not Started
Phase 6: Blog Infrastructure        [          ] Not Started
Phase 7: Interactive Features       [          ] Not Started
Phase 8: SEO & Performance          [          ] Not Started
Phase 9: Blog Content & Launch      [          ] Not Started
```

**Overall:** 1/9 phases complete | 3/25 requirements done | 4/~25 plans complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 4 |
| Plans failed | 0 |
| Requirements completed | 3/25 (FOUND-01, FOUND-02, FOUND-06) |
| Phases completed | 1/9 |

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
| Brand rename: Planifactor | "Plan + Factory" -- captures AI scheduling for factories | 2 |
| Blue-600 as primary color | oklch(0.546 0.245 262.881) -- vivid, trustworthy B2B blue | 2 |
| Light-mode only (no dark) | Marketing site complexity reduction; no B2B benefit from dark mode | 2 |
| 12px border radius | Rounded, approachable feel for marketing site | 2 |
| Monochrome blue design system | Primary, secondary, accent, charts all blue-family for brand consistency | 2 |

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

**Last session:** 2026-02-09 -- Phase 2 Plan 01 execution
**What happened:** Executed 02-01-PLAN.md (Brand Rename & Design Tokens). Task 1: Renamed all "Prefactor" to "Planifactor" in messages/en.json, messages/bg.json, CLAUDE.md. Task 2: Replaced default shadcn near-black theme with blue-600 primary, brand-50 through brand-950 color scale, typography scale (hero through label), removed dark mode and sidebar vars. Both tasks committed, build passes.
**Stopped at:** Completed 02-01-PLAN.md
**Resume file:** None
**Next action:** Execute 02-02-PLAN.md (Font System & Visual Polish)

---
*Last updated: 2026-02-09 after 02-01 plan execution*
