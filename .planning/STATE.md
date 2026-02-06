# STATE.md -- Prefactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Roadmap created. Ready to begin Phase 1 planning.

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 1 -- Foundation & i18n (Not Started)
**Current Plan:** None (phase not yet planned)
**Status:** ROADMAP COMPLETE -- Awaiting phase planning

**Progress:**
```
Phase 1: Foundation & i18n          [ ] Not Started
Phase 2: Brand Identity & Design    [ ] Not Started
Phase 3: Layout Shell & Landing     [ ] Not Started
Phase 4: Animated Gantt & Visuals   [ ] Not Started
Phase 5: Content Pages              [ ] Not Started
Phase 6: Blog Infrastructure        [ ] Not Started
Phase 7: Interactive Features       [ ] Not Started
Phase 8: SEO & Performance          [ ] Not Started
Phase 9: Blog Content & Launch      [ ] Not Started
```

**Overall:** 0/9 phases complete | 0/25 requirements done

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 0 |
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

### Research Flags
- Phase 4 (Animated Gantt): Animation performance patterns, Gantt mockup implementation -- needs research
- Phase 7 (ROI Calculator): B2B calculator best practices, conservative estimation models -- needs research
- Phases 5, 6 (Content, Blog): Well-documented patterns -- skip research

### Todos
- [ ] Verify npm package versions before Phase 1: `npm view next version`, `npm view next-intl version`, `npm view motion version`
- [ ] Confirm Tailwind v4 compatibility with shadcn/ui (fall back to v3 if needed)
- [ ] Validate Bulgarian localization approach with native speaker
- [ ] Define Gantt animation design spec before Phase 4 implementation
- [ ] Define ROI calculator formula with customer data before Phase 7

### Blockers
None currently.

---

## Session Continuity

**Last session:** 2026-02-06 -- Roadmap creation
**What happened:** Derived 9 phases from 25 v1 requirements with 100% coverage. Wrote ROADMAP.md, STATE.md, updated REQUIREMENTS.md traceability.
**Next action:** Run `/gsd:plan-phase 1` to create execution plan for Foundation & i18n.

---
*Last updated: 2026-02-06 during roadmap creation*
