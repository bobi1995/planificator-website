# REQUIREMENTS.md -- Prefactor Marketing Site

## v1 Requirements

### Foundation (FOUND)

- [x] **FOUND-01**: Next.js App Router project initialized with Tailwind CSS and shadcn/ui component library
- [x] **FOUND-02**: Full i18n setup with next-intl -- English and Bulgarian with URL-based switching (/en, /bg) and language switcher component
- [x] **FOUND-03**: Brand identity created from scratch -- logo, color palette, typography (Latin + Cyrillic), design tokens integrated into Tailwind config
- [x] **FOUND-04**: SEO infrastructure -- dynamic sitemap generation, metadata cascading from layout to page, structured data (Organization, Product schemas), robots.txt
- [x] **FOUND-05**: Responsive design system -- mobile-first approach, all components work on mobile (375px), tablet, and desktop
- [x] **FOUND-06**: Cyrillic font support -- preloaded Latin + Cyrillic subsets for Bulgarian content, no flash of unstyled text

### Landing Page (LAND)

- [x] **LAND-01**: Hero section with clear value proposition headline, subtext, and primary CTA ("Request a Demo") in both EN and BG
- [x] **LAND-02**: Animated Gantt chart mockup -- Framer Motion animation showing AI scheduling in action (scope-limited, choreographed animation, not interactive product)
- [x] **LAND-03**: Feature highlights section -- 3-5 key capabilities with icons and brief descriptions linking to features page
- [x] **LAND-04**: Social proof section -- placeholder grid for customer logos and 3-4 testimonial quotes (can use placeholder content initially)
- [x] **LAND-05**: CTA banner section -- secondary conversion point at page bottom with demo booking link

### Content Pages (CONT)

- [x] **CONT-01**: Features page -- detailed capability breakdown organized by domain: scheduling, resource management, optimization, BOM, inventory, shop floor tracking
- [x] **CONT-02**: Use Cases / Industries pages -- 2-3 pages targeting discrete manufacturing, job shops, production planning with industry-specific language
- [x] **CONT-03**: About page -- team section, company story, mission statement, values
- [x] **CONT-04**: Pricing page -- feature comparison table across tiers with "Contact for pricing" as primary CTA per tier

### Interactive Features (INTER)

- [x] **INTER-01**: ROI Calculator -- interactive tool with 3-5 inputs (e.g., orders/week, current scheduling time), shows estimated time/cost savings with conservative methodology visible
- [x] **INTER-02**: Instant demo booking -- Calendly or Cal.com embed on contact page and as modal from CTA buttons
- [x] **INTER-03**: Cookie consent banner -- GDPR-compliant consent management, lightweight, non-intrusive for EU visitors
- [x] **INTER-04**: Before/After comparison -- drag slider or side-by-side animation showing manual scheduling (spreadsheet chaos) vs Prefactor (clean Gantt)

### Blog & Content (BLOG)

- [x] **BLOG-01**: MDX blog infrastructure -- content registry (getAllPosts, getPostsByTag), index page with pagination, individual post pages, categories/tags, RSS feed
- [ ] **BLOG-02**: Initial blog posts (5-10) -- SEO content about production scheduling, AI in manufacturing, industry insights in both EN and BG
- [ ] **BLOG-03**: Comparison pages -- "Prefactor vs Excel scheduling", "Prefactor vs PlanetTogether" style competitor comparison for SEO capture

### Operations & Analytics (OPS)

- [x] **OPS-01**: Plausible Analytics integration -- privacy-friendly, cookieless analytics tracking page views and conversions
- [x] **OPS-02**: Performance optimization -- Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1), image optimization, lazy-loaded animations
- [x] **OPS-03**: Open Graph images -- auto-generated or custom OG images for social sharing, per-page metadata with locale-aware images

---

## v2 Requirements (Deferred)

- [ ] Contact form with Resend email integration (separate from Calendly booking)
- [ ] Resource library / downloadable guides (gated lead gen content)
- [ ] Live chat / AI chatbot for visitor questions
- [ ] Product sandbox / free trial environment
- [ ] Video walkthrough (60-90 sec product demo)
- [ ] Community / user forum
- [ ] Advanced A/B testing
- [ ] Additional comparison pages
- [ ] Newsletter signup with email nurture sequence

---

## Out of Scope

- **Embedded live product demo** -- using animated mockup instead (too complex, product dependency)
- **User authentication / login** -- marketing site only, not the product
- **E-commerce / self-serve purchase** -- enterprise/consultative sales model
- **Multi-language beyond EN/BG** -- can be added later with the i18n infrastructure
- **CRM integration** -- start with Calendly + Plausible analytics for lead tracking
- **Custom CMS** -- MDX content in repo is sufficient
- **Building a custom email system** -- Calendly handles booking, Plausible handles tracking

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 2 | Complete |
| FOUND-04 | Phase 8 | Complete |
| FOUND-05 | Phase 2 | Complete |
| FOUND-06 | Phase 1 | Complete |
| LAND-01 | Phase 3 | Complete |
| LAND-02 | Phase 4 | Complete |
| LAND-03 | Phase 3 | Complete |
| LAND-04 | Phase 3 | Complete |
| LAND-05 | Phase 3 | Complete |
| CONT-01 | Phase 5 | Complete |
| CONT-02 | Phase 5 | Complete |
| CONT-03 | Phase 5 | Complete |
| CONT-04 | Phase 5 | Complete |
| INTER-01 | Phase 7 | Complete |
| INTER-02 | Phase 7 | Complete |
| INTER-03 | Phase 7 | Complete |
| INTER-04 | Phase 4 | Complete |
| BLOG-01 | Phase 6 | Complete |
| BLOG-02 | Phase 9 | Pending |
| BLOG-03 | Phase 9 | Pending |
| OPS-01 | Phase 8 | Complete |
| OPS-02 | Phase 8 | Complete |
| OPS-03 | Phase 8 | Complete |

---
*Last updated: 2026-02-11 after phase 8 completion*
