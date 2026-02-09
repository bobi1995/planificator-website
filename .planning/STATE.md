# STATE.md -- Prefactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Phase 1 in progress. Project initialized, ready for i18n routing.

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 1 -- Foundation & i18n (In Progress)
**Current Plan:** 01-01 complete, 01-02 next
**Status:** IN PROGRESS -- Plan 01-01 complete

**Progress:**
```
Phase 1: Foundation & i18n          [=.........] Plan 1/3 complete
Phase 2: Brand Identity & Design    [ ] Not Started
Phase 3: Layout Shell & Landing     [ ] Not Started
Phase 4: Animated Gantt & Visuals   [ ] Not Started
Phase 5: Content Pages              [ ] Not Started
Phase 6: Blog Infrastructure        [ ] Not Started
Phase 7: Interactive Features       [ ] Not Started
Phase 8: SEO & Performance          [ ] Not Started
Phase 9: Blog Content & Launch      [ ] Not Started
```

**Overall:** 0/9 phases complete | 0/25 requirements done | 1/~25 plans complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 1 |
| Plans failed | 0 |
| Requirements completed | 0/25 |
| Phases completed | 0/9 |

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

### Research Flags
- Phase 4 (Animated Gantt): Animation performance patterns, Gantt mockup implementation -- needs research
- Phase 7 (ROI Calculator): B2B calculator best practices, conservative estimation models -- needs research
- Phases 5, 6 (Content, Blog): Well-documented patterns -- skip research

### Todos
- [x] Verify npm package versions before Phase 1: next@16.1.6, next-intl@4.8.2, tailwindcss@4.1.18
- [x] Confirm Tailwind v4 compatibility with shadcn/ui (confirmed working)
- [ ] Validate Bulgarian localization approach with native speaker
- [ ] Define Gantt animation design spec before Phase 4 implementation
- [ ] Define ROI calculator formula with customer data before Phase 7

### Blockers
None currently.

---

## Session Continuity

**Last session:** 2026-02-09 -- Plan 01-01 execution
**What happened:** Initialized Next.js 16.1.6 project with Tailwind v4, shadcn/ui, next-intl. Established component directory structure. Build passes with zero errors.
**Stopped at:** Completed 01-01-PLAN.md
**Resume file:** None
**Next action:** Execute 01-02-PLAN.md (i18n routing with next-intl)

---
*Last updated: 2026-02-09 during 01-01 plan execution*
