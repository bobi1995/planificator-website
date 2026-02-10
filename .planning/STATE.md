# STATE.md -- Planifactor Marketing Site

## Project Reference

**Core Value:** AI finds the optimal production schedule automatically -- the marketing site must communicate this clearly and compellingly to manufacturing decision-makers.

**Current Focus:** Phase 5 complete. All 4 content pages done (Features, Use Cases, Pricing, About). Ready for Phase 6.

---

## Current Position

**Milestone:** v1 -- Marketing Site Launch
**Current Phase:** Phase 5 -- Content Pages (COMPLETE)
**Current Plan:** All 4 plans complete
**Status:** Phase verified
**Last activity:** 2026-02-10 -- Phase 5 verified

**Progress:**
```
Phase 1: Foundation & i18n          [==========] VERIFIED
Phase 2: Brand Identity & Design    [==========] VERIFIED
Phase 3: Layout Shell & Landing     [==========] VERIFIED
Phase 4: Animated Gantt & Visuals   [==========] VERIFIED
Phase 5: Content Pages              [==========] VERIFIED
Phase 6: Blog Infrastructure        [          ] Not Started
Phase 7: Interactive Features       [          ] Not Started
Phase 8: SEO & Performance          [          ] Not Started
Phase 9: Blog Content & Launch      [          ] Not Started
```

**Overall:** 5/9 phases complete | 15/25 requirements done | 16/~25 plans complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Plans completed | 16 |
| Plans failed | 0 |
| Requirements completed | 15/25 (FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06, LAND-01, LAND-02, LAND-03, LAND-04, LAND-05, INTER-04, CONT-01, CONT-02, CONT-03, CONT-04) |
| Phases completed | 5/9 |

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
| Hex colors for animated bars | Motion cannot interpolate oklch; hex enables smooth color transitions | 4 |
| attrX/attrY for SVG animation | Motion interprets x/y as CSS transforms; attrX/attrY force SVG attribute mode | 4 |
| State-driven animation (useState) | More reliable than useAnimate for SVG attribute animation with motion.rect | 4 |
| defaultPosition for react-compare-slider v4 | v4 API uses defaultPosition (not position); Handle no longer accepts portrait prop | 4 |
| Dual slider instances for responsive | Landscape/portrait can't toggle dynamically; hidden/shown via Tailwind responsive classes | 4 |
| LazyMotion for comparison entrance | Only entrance animation needed; LazyMotion + domAnimation smaller than full motion bundle | 4 |
| Static icon maps for domain sections | Server component -- no serialization boundary; static maps are type-safe and tree-shakeable | 5 |
| Domain section composition pattern | Page maps over domain keys; each section calls getTranslations independently | 5 |
| t.raw() for comparison table booleans | next-intl 4.8.2 t.raw() retrieves raw JSON values (true/false/string) without coercion | 5 |
| PricingFAQ as client, rest as server | Only FAQ needs client state (Accordion); tier cards and comparison table are server components | 5 |
| Badge absolute positioning for tier cards | "Most Popular" badge floats above card border with -top-3 + -translate-x-1/2 | 5 |
| About page values as 2-col grid | 4 values with longer descriptions need more horizontal space; 2-col balances readability | 5 |
| Mission statement as italic quote | Visually distinguished from body text; quotes convey aspiration and purpose | 5 |
| Lucide icons for values (Wrench, Shield, Rocket, Factory) | Semantic mapping: practitioners=Wrench, honest=Shield, ship=Rocket, manufacturing=Factory | 5 |
| generateStaticParams for [slug] sub-routing | Parent [locale] handles locale; child [slug] only returns slug values | 5 |
| Slug-based icon maps (Factory, Scissors, CalendarRange) | Server components can't use dynamic icon imports; module-level maps are type-safe | 5 |
| AlertTriangle (red) vs CheckCircle (brand-blue) | Visual contrast between pain points and solutions sections aids comprehension | 5 |

### Research Flags
- Phase 4 (Animated Gantt): Animation performance patterns, Gantt mockup implementation -- RESEARCHED
- Phase 7 (ROI Calculator): B2B calculator best practices, conservative estimation models -- needs research
- Phases 5, 6 (Content, Blog): Well-documented patterns -- skip research

### Todos
- [x] Verify npm package versions before Phase 1: next@16.1.6, next-intl@4.8.2, tailwindcss@4.1.18
- [x] Confirm Tailwind v4 compatibility with shadcn/ui (confirmed working)
- [x] Configure Inter font with Cyrillic subsets (done in Plan 02)
- [x] Create LanguageSwitcher component (done in Plan 03)
- [x] Verify Phase 1 build end-to-end (done in Plan 03)
- [x] Define Gantt animation design spec before Phase 4 implementation
- [ ] Validate Bulgarian localization approach with native speaker
- [ ] Define ROI calculator formula with customer data before Phase 7

### Blockers
None currently.

---

## Session Continuity

**Last session:** 2026-02-10 -- Phase 5 execution and verification
**What happened:** Executed all 4 plans in Phase 5. Wave 1: 05-01 (Features page with 6 domains, 22 feature cards, 6 shadcn components). Wave 2 (parallel): 05-02 (Use Cases index + 3 detail pages with sub-routing), 05-03 (Pricing with tier cards, comparison table, FAQ accordion), 05-04 (About with company story, mission/values, team grid). Verifier confirmed 6/6 must-haves passed. All locale files contain full EN+BG translations.
**Stopped at:** Phase 5 complete and verified
**Resume file:** None
**Next action:** Phase 6 (Blog Infrastructure)

---
*Last updated: 2026-02-10 after phase 5 verification*
