# v1 Milestone Archive — Planifactor Marketing Site

**Milestone:** v1 — Marketing Site Launch
**Timeline:** 2026-02-06 to 2026-02-12 (7 days)
**Status:** COMPLETE

## Stats

| Metric | Value |
|--------|-------|
| Phases | 9/9 complete |
| Plans | 28/28 executed |
| Plans failed | 0 |
| Requirements | 25/25 satisfied |
| Commits | 113 |
| Files changed | 210 |
| Lines added | ~45,600 |
| Source files | 91 (.ts/.tsx/.css) + 20 (.mdx) + 2 (messages JSON) |

## Key Accomplishments

1. **Full bilingual marketing site** — 13 pages in English and Bulgarian with URL-based locale switching, Cyrillic font support, and ~400 translation keys per locale
2. **Brand identity from scratch** — Planifactor logo (SVG), blue-600 design system, typography scale, responsive design tokens all in Tailwind v4 CSS-first config
3. **Animated Gantt differentiator** — Chaos-to-order SVG animation on landing page + before/after comparison slider — visuals no competitor has
4. **Interactive conversion tools** — ROI calculator with conservative methodology, Calendly demo booking, GDPR-compliant cookie consent
5. **Complete SEO infrastructure** — Dynamic sitemap with hreflang, OG images for all pages, Plausible analytics, JSON-LD structured data, metadata cascading
6. **10 substantive blog posts** — 3 ToFu + 3 MoFu + 2 BoFu comparison posts in both EN and BG, with tag filtering, pagination, and RSS feed

## Phase Summary

| Phase | Name | Plans | Requirements |
|-------|------|-------|--------------|
| 1 | Foundation & i18n | 3 | FOUND-01, FOUND-02, FOUND-06 |
| 2 | Brand Identity & Design System | 2 | FOUND-03, FOUND-05 |
| 3 | Layout Shell & Landing Page | 4 | LAND-01, LAND-03, LAND-04, LAND-05 |
| 4 | Animated Gantt & Visual Differentiators | 2 | LAND-02, INTER-04 |
| 5 | Content Pages | 4 | CONT-01, CONT-02, CONT-03, CONT-04 |
| 6 | Blog Infrastructure | 2 | BLOG-01 |
| 7 | Interactive Features & Forms | 3 | INTER-01, INTER-02, INTER-03 |
| 8 | SEO & Performance | 4 | FOUND-04, OPS-01, OPS-02, OPS-03 |
| 9 | Blog Content & Launch Polish | 4 | BLOG-02, BLOG-03 |

## Tech Stack (as shipped)

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React | 19.2.3 |
| i18n | next-intl | ^4.8.2 |
| Styling | Tailwind CSS (v4 CSS-first) | ^4 |
| UI Components | shadcn/ui (new-york style) | 3.8.4 |
| Animations | motion (v12.x) | ^12 |
| Blog | next-mdx-remote-client/rsc + gray-matter | - |
| Analytics | Plausible (next-plausible) | - |
| Demo booking | react-calendly | 4.4.0 |
| Comparison slider | react-compare-slider | 4.0.0-1 |
| Structured data | schema-dts | - |
| RSS | feed | - |

## Architecture Decisions

See STATE.md key decisions table (132 decisions across 9 phases).

---
*Archived: 2026-02-12*
