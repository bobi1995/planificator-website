# STATE.md -- Prefactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Phase 1 COMPLETE & VERIFIED. All i18n foundation, routing, font, and language switching operational. Ready for Phase 2 (Brand Identity & Design System).

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 1 -- Foundation & i18n (VERIFIED COMPLETE)
**Current Plan:** All plans complete, verification passed (17/17 must-haves)
**Status:** PHASE 1 VERIFIED -- Ready for Phase 2

**Progress:**
```
Phase 1: Foundation & i18n          [==========] VERIFIED ✓
Phase 2: Brand Identity & Design    [ ] Not Started
Phase 3: Layout Shell & Landing     [ ] Not Started
Phase 4: Animated Gantt & Visuals   [ ] Not Started
Phase 5: Content Pages              [ ] Not Started
Phase 6: Blog Infrastructure        [ ] Not Started
Phase 7: Interactive Features       [ ] Not Started
Phase 8: SEO & Performance          [ ] Not Started
Phase 9: Blog Content & Launch      [ ] Not Started
```

**Overall:** 1/9 phases complete | 3/25 requirements done | 3/~25 plans complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 3 |
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

**Last session:** 2026-02-09 -- Phase 1 execution & verification
**What happened:** Executed all 3 Phase 1 plans sequentially (Waves 1-3). Plan 01-01: Next.js 16 project init with Tailwind v4, shadcn/ui, next-intl. Plan 01-02: i18n routing, proxy, navigation, message files, locale layout (2 deviations auto-fixed: proxy.ts in src/, getTranslations for async). Plan 01-03: LanguageSwitcher component, build verification. Verifier confirmed 17/17 must-haves, zero gaps. Phase 1 complete and verified.
**Stopped at:** Phase 1 fully verified
**Resume file:** None
**Next action:** Run `/gsd:discuss-phase 2` or `/gsd:plan-phase 2` for Brand Identity & Design System

---
*Last updated: 2026-02-09 after phase 1 verification*
