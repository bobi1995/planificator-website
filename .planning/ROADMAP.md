# ROADMAP.md -- Prefactor Marketing Site

## Overview

Nine phases delivering a complete B2B marketing site for Prefactor's AI-powered production scheduling platform. The structure follows natural delivery boundaries: foundation and i18n first (research-validated as non-negotiable), then brand/design system, then layout + landing page as the primary acquisition surface, followed by parallel content and blog infrastructure tracks, interactive conversion features, SEO/performance hardening, and finally blog content for launch.

**Depth:** Comprehensive
**Total Phases:** 9
**Total v1 Requirements:** 25/25 mapped

---

## Phase 1: Foundation & i18n

**Goal:** A correctly structured Next.js App Router project with i18n routing, Cyrillic font support, and all architectural decisions locked in -- so every subsequent phase builds on solid ground.

**Dependencies:** None (starting point)

**Requirements:** FOUND-01, FOUND-02, FOUND-06

**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md -- Project initialization with Next.js 16, Tailwind v4, shadcn/ui, next-intl
- [x] 01-02-PLAN.md -- i18n infrastructure: routing, proxy, navigation, message files, locale layout
- [x] 01-03-PLAN.md -- LanguageSwitcher component and end-to-end build verification

**Success Criteria:**
1. Navigating to `/en` and `/bg` renders locale-specific content with correct HTML `lang` attribute
2. Language switcher component toggles between English and Bulgarian while preserving the current page path
3. Bulgarian pages render Cyrillic text with preloaded font subsets and zero flash of unstyled text
4. The project builds and deploys to Vercel with zero errors and a working preview URL
5. Client/server component boundaries are established in the folder structure (interactive/ vs sections/)

---

## Phase 2: Brand Identity & Design System

**Goal:** Planifactor has a complete visual identity -- logo, colors, typography, and responsive design tokens -- that every page and component can use consistently.

**Dependencies:** Phase 1

**Requirements:** FOUND-03, FOUND-05

**Plans:** 2 plans

Plans:
- [x] 02-01-PLAN.md -- Rename Prefactor to Planifactor, replace default shadcn theme with blue brand design tokens
- [x] 02-02-PLAN.md -- Create Logo SVG component, favicon, update home page with brand typography

**Success Criteria:**
1. A Planifactor logo exists in SVG format and renders correctly at all viewport sizes (mobile 375px through desktop 1440px+)
2. Tailwind config contains custom color palette, typography scale, and spacing tokens that produce a cohesive "modern + approachable" aesthetic
3. shadcn/ui components render with Planifactor brand colors (not default shadcn theme)
4. All design system components are responsive -- visually verified at 375px, 768px, and 1440px breakpoints

---

## Phase 3: Layout Shell & Landing Page

**Goal:** Visitors land on a professional, conversion-oriented homepage with clear value proposition, feature highlights, social proof, and a demo request CTA -- wrapped in a site-wide navigation shell.

**Dependencies:** Phase 2

**Requirements:** LAND-01, LAND-03, LAND-04, LAND-05

**Plans:** 4 plans

Plans:
- [x] 03-01-PLAN.md -- Foundation: shadcn components (Sheet, Avatar), all translations, stub pages
- [x] 03-02-PLAN.md -- Layout shell: Header with mobile drawer, Footer, locale layout update
- [x] 03-03-PLAN.md -- Hero section with static SVG Gantt mockup
- [x] 03-04-PLAN.md -- Feature Highlights, Social Proof, CTA Banner, home page assembly

**Success Criteria:**
1. Header with site navigation and language switcher appears on every page, with mobile hamburger menu working at 375px
2. Hero section displays headline, subtext, and "Request a Demo" CTA button in both English and Bulgarian
3. Feature highlights section shows 3-5 key capabilities with icons linking to the features page
4. Social proof section displays a customer logo grid and testimonial quotes (placeholder content acceptable)
5. Footer with site links, contact info, and secondary CTA renders on every page

---

## Phase 4: Animated Gantt & Visual Differentiators

**Goal:** The landing page showcases Planifactor's core differentiator through an animated Gantt chart mockup and a before/after comparison -- the two visuals no competitor has.

**Dependencies:** Phase 3

**Requirements:** LAND-02, INTER-04

**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md -- Animated Gantt chart (chaos-to-order choreographed SVG animation replacing static mockup)
- [x] 04-02-PLAN.md -- Before/after comparison section with draggable slider and KPI metrics dashboard

**Success Criteria:**
1. An animated Gantt chart mockup plays on the landing page showing AI scheduling operations filling in over time (choreographed Motion animation, not interactive)
2. A before/after comparison (drag slider or side-by-side) contrasts manual scheduling chaos with Planifactor's clean Gantt output
3. Both animations lazy-load and do not degrade Core Web Vitals (LCP remains under 2.5s, CLS under 0.1)
4. Both visuals render correctly and are viewable on mobile (375px) -- simplified if necessary but still communicative

---

## Phase 5: Content Pages

**Goal:** Visitors can explore Planifactor's full capabilities, use cases, team story, and pricing -- building enough trust and understanding to request a demo.

**Dependencies:** Phase 3 (layout shell must exist)

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04

**Plans:** 4 plans

Plans:
- [ ] 05-01-PLAN.md -- Features page: install shadcn components, 6 feature domains with cards, full EN/BG translations
- [ ] 05-02-PLAN.md -- Use Cases pages: index + 3 sub-routed detail pages (discrete manufacturing, job shops, production planning)
- [ ] 05-03-PLAN.md -- Pricing page: 3 tier cards, feature comparison table, FAQ accordion
- [ ] 05-04-PLAN.md -- About page: company story, mission/values, team section

**Success Criteria:**
1. Features page organizes capabilities by domain (scheduling, resource management, optimization, BOM, inventory, shop floor) with clear descriptions in both EN and BG
2. Two to three use case pages exist targeting discrete manufacturing, job shops, and production planning with industry-specific language
3. About page displays team section, company story, and mission statement
4. Pricing page shows feature comparison across tiers with "Contact for pricing" as primary CTA per tier
5. All content pages are navigable from the header and render correctly at mobile, tablet, and desktop breakpoints

---

## Phase 6: Blog Infrastructure

**Goal:** The MDX blog system is fully operational -- content authors can add new posts by dropping MDX files into the content directory, and visitors can browse, read, and subscribe via RSS.

**Dependencies:** Phase 3 (layout shell must exist); can parallelize with Phase 5

**Requirements:** BLOG-01

**Success Criteria:**
1. Blog index page at `/[locale]/blog` lists posts with pagination, sorted by date
2. Individual blog post pages render MDX content with proper typography, code blocks, and embedded components
3. Posts support categories/tags and can be filtered by tag on the index page
4. RSS feed is generated and accessible at a public URL
5. Adding a new `.mdx` file to the content directory with frontmatter automatically appears on the blog index after rebuild

---

## Phase 7: Interactive Features & Forms

**Goal:** Visitors can self-qualify with the ROI calculator, book a demo instantly via Calendly, and encounter GDPR-compliant cookie consent -- converting interest into leads.

**Dependencies:** Phase 5 (content pages exist for form placement); Phase 4 (landing page complete)

**Requirements:** INTER-01, INTER-02, INTER-03

**Success Criteria:**
1. ROI calculator accepts 3-5 inputs (e.g., orders/week, current scheduling time), computes estimated savings, and displays results with visible methodology (conservative estimates, not inflated)
2. Calendly or Cal.com embed loads on the contact page and as a modal triggered from CTA buttons across the site
3. Cookie consent banner appears on first visit for EU visitors, is GDPR-compliant, non-intrusive, and remembers the user's choice
4. All interactive features work correctly in both EN and BG locales

---

## Phase 8: SEO & Performance

**Goal:** The site is fully optimized for search engine discovery and achieves passing Core Web Vitals -- ensuring organic traffic acquisition works from launch day.

**Dependencies:** Phases 5, 6 (all pages and blog must exist for complete sitemap and metadata)

**Requirements:** FOUND-04, OPS-01, OPS-02, OPS-03

**Success Criteria:**
1. Dynamic sitemap at `/sitemap.xml` includes all pages across both locales with correct hreflang annotations
2. Every page has locale-aware metadata (title, description, OG image) cascading from layout to page level, with structured data (Organization, Product schemas)
3. Plausible Analytics is integrated and tracking page views and conversion events (demo button clicks) without requiring cookie consent
4. Lighthouse audit on the landing page scores 90+ on Performance, Accessibility, Best Practices, and SEO -- with LCP < 2.5s, FID < 100ms, CLS < 0.1
5. OG images render correctly when sharing any page URL on social media (LinkedIn, Twitter/X)

---

## Phase 9: Blog Content & Launch Polish

**Goal:** The site launches with substantive SEO content -- 5-10 blog posts and competitor comparison pages in both languages -- establishing Prefactor as a thought leader from day one.

**Dependencies:** Phase 6 (blog infrastructure), Phase 8 (SEO infrastructure)

**Requirements:** BLOG-02, BLOG-03

**Success Criteria:**
1. Five to ten blog posts are published in both English and Bulgarian covering production scheduling, AI in manufacturing, and industry insights
2. At least two competitor comparison pages exist ("Prefactor vs Excel scheduling", "Prefactor vs [competitor]") optimized for search capture
3. All blog content has proper metadata, OG images, and appears in the sitemap
4. Blog posts are discoverable via the blog index, tag filtering, and search engines (pages are indexable)

---

## Progress

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 1 | Foundation & i18n | FOUND-01, FOUND-02, FOUND-06 | Complete (3/3 plans) |
| 2 | Brand Identity & Design System | FOUND-03, FOUND-05 | Complete (2/2 plans) |
| 3 | Layout Shell & Landing Page | LAND-01, LAND-03, LAND-04, LAND-05 | Complete (4/4 plans) |
| 4 | Animated Gantt & Visual Differentiators | LAND-02, INTER-04 | Complete (2/2 plans) |
| 5 | Content Pages | CONT-01, CONT-02, CONT-03, CONT-04 | Planned (0/4 plans) |
| 6 | Blog Infrastructure | BLOG-01 | Not Started |
| 7 | Interactive Features & Forms | INTER-01, INTER-02, INTER-03 | Not Started |
| 8 | SEO & Performance | FOUND-04, OPS-01, OPS-02, OPS-03 | Not Started |
| 9 | Blog Content & Launch Polish | BLOG-02, BLOG-03 | Not Started |

---

## Dependency Graph

```
Phase 1 (Foundation & i18n)
  |
  v
Phase 2 (Brand Identity & Design System)
  |
  v
Phase 3 (Layout Shell & Landing Page)
  |
  +---> Phase 4 (Animated Gantt & Visual Differentiators)
  |       |
  |       +---> Phase 7 (Interactive Features & Forms)
  |
  +---> Phase 5 (Content Pages) ----+
  |                                  |
  +---> Phase 6 (Blog Infrastructure)+---> Phase 8 (SEO & Performance)
                                              |
                                              v
                                     Phase 9 (Blog Content & Launch Polish)
```

**Parallelization opportunities:**
- Phases 5 and 6 can run in parallel after Phase 3
- Phase 4 can run in parallel with Phases 5 and 6
- Phase 7 can start after Phases 4 and 5

---

## Coverage

| Requirement | Phase | Verified |
|-------------|-------|----------|
| FOUND-01 | Phase 1 | Yes |
| FOUND-02 | Phase 1 | Yes |
| FOUND-03 | Phase 2 | Yes |
| FOUND-04 | Phase 8 | Yes |
| FOUND-05 | Phase 2 | Yes |
| FOUND-06 | Phase 1 | Yes |
| LAND-01 | Phase 3 | Yes |
| LAND-02 | Phase 4 | Yes |
| LAND-03 | Phase 3 | Yes |
| LAND-04 | Phase 3 | Yes |
| LAND-05 | Phase 3 | Yes |
| CONT-01 | Phase 5 | Yes |
| CONT-02 | Phase 5 | Yes |
| CONT-03 | Phase 5 | Yes |
| CONT-04 | Phase 5 | Yes |
| INTER-01 | Phase 7 | Yes |
| INTER-02 | Phase 7 | Yes |
| INTER-03 | Phase 7 | Yes |
| INTER-04 | Phase 4 | Yes |
| BLOG-01 | Phase 6 | Yes |
| BLOG-02 | Phase 9 | Yes |
| BLOG-03 | Phase 9 | Yes |
| OPS-01 | Phase 8 | Yes |
| OPS-02 | Phase 8 | Yes |
| OPS-03 | Phase 8 | Yes |

**25/25 v1 requirements mapped. No orphans. No duplicates.**

---
*Last updated: 2026-02-09 after phase 5 planning*
