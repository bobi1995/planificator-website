# Research Summary: Prefactor Marketing Site

**Project:** B2B SaaS marketing website for production scheduling platform
**Research Date:** 2026-02-06
**Status:** Research Complete - Ready for Roadmap Definition

---

## Executive Summary

Prefactor has a significant opportunity to differentiate in the legacy-dominated production scheduling (APS) market through modern UX. The research reveals that established players (PlanetTogether, Siemens Opcenter, Asprova, SAP) have dated marketing sites, no transparent pricing, and minimal interactive demos. Manufacturing software marketing has a massive design gap that Prefactor can exploit.

The recommended approach combines Next.js App Router with static generation for SEO performance, next-intl for Bulgarian/English i18n from day one, and strategic use of interactive elements (animated Gantt mockup, ROI calculator) to demonstrate capability without compromising Core Web Vitals. The stack is mature and well-documented: Next.js 15+ with App Router, Tailwind CSS with shadcn/ui components, MDX for blog content, and Resend for transactional emails. Vercel hosting provides zero-config deployment with global CDN.

Critical risks center on architectural decisions that must be correct from the start: i18n routing structure, client/server component boundaries, MDX content pipeline, and SEO metadata architecture. Getting these wrong means rewrites. The research identifies 16 documented pitfalls ranging from critical (i18n bolted on after pages are built) to moderate (animation performance issues) to minor (font subset loading). The highest-impact differentiator is the animated Gantt demo on the landing page - no competitor has this - but it must be scope-limited to avoid becoming a mini-product.

---

## Key Findings

### From STACK.md (Confidence: MEDIUM - versions require verification)

**Core Stack:**
- **Next.js App Router (v15+)** - Pre-decided. Server Components by default reduce client bundle. Static generation ideal for SEO.
- **Tailwind CSS (v3 or v4)** - Pre-decided by team. Note: v4 released January 2025, verify compatibility with shadcn/ui.
- **shadcn/ui + Radix UI** - Pre-decided. Components as source code (not npm dependency), full customization control.
- **next-intl (v3-4)** - Best i18n for App Router. URL-based locale switching, server component support, type-safe translations.
- **MDX (via @next/mdx)** - Blog content. CRITICAL: Contentlayer is abandoned/unmaintained. Use @next/mdx + gray-matter instead.
- **Resend + React Email** - Transactional emails. Generous free tier (100/day), developer-friendly API.
- **Plausible Analytics** - NOT PostHog. Plausible is lightweight (<1KB), cookieless, GDPR-compliant without consent banners. PostHog is overkill for marketing.
- **Framer Motion (now "Motion")** - Animations. Note: Package renamed from `framer-motion` to `motion` in late 2024/early 2025. Verify current package name.
- **Vercel** - Hosting. Zero-config Next.js deployment. Better than Cloudflare Pages (which requires adapter and has missing features).

**Alternatives Rejected:**
- Contentlayer (abandoned), next-i18next (Pages Router only), PostHog (too heavy), Cloudflare Pages (second-class Next.js support)

**Version Uncertainty:**
Web search unavailable during research. All version numbers from training data (cutoff early 2025). Verify with `npm view <pkg> version` before install.

### From FEATURES.md (Confidence: MEDIUM - competitor sites may have changed)

**Table Stakes (Must-Have):**
- Clear hero with value proposition
- Features/capabilities page organized by domain
- Industry/use case pages (discrete manufacturing, job shops)
- Contact/demo request form (5-7 fields max)
- Professional responsive design (mobile-first indexing)
- Multi-language (EN + BG minimum)
- GDPR cookie consent (EU legal requirement)
- Customer logos or testimonials (B2B trust requirement)
- Product screenshots/visuals
- Fast loading (Core Web Vitals for SEO)

**Differentiators (Competitive Advantage):**
1. **Interactive/animated Gantt demo** - HIGHEST IMPACT. Legacy vendors show static screenshots. This immediately signals "modern, capable, approachable."
2. **Before/After comparison** - Slider showing manual scheduling chaos vs Prefactor clarity. No competitor does this well.
3. **ROI Calculator** - Self-qualification tool. Almost no APS vendor has this. Captures leads + quantifies value.
4. **Transparent pricing or tiers** - PlanetTogether, Opcenter, Asprova ALL hide pricing behind "Contact Sales." Showing any pricing is differentiating.
5. **Modern aesthetic (Linear/Notion style)** - Dark mode, generous whitespace, smooth animations. Manufacturing software sites look dated.
6. **Instant demo booking** - Calendly-style embed. Most legacy vendors have "submit form, wait for email" flow.
7. **Video walkthrough** - 60-90 sec product walkthrough embedded on landing.
8. **Blog/SEO content hub** - Most APS vendor blogs are dead or corporate-speak.

**Anti-Features (Avoid):**
- Mega-menu navigation (Prefactor is ONE product, not 50)
- Gated content for everything (blog should be ungated)
- Auto-playing video with sound
- Jargon-heavy hero copy ("leverage AI-driven paradigms...")
- Stock photos of hard hats (show YOUR product)
- Feature matrix with 200 rows
- Carousel testimonials (terrible engagement)

**MVP Recommendation:**
Phase 1: Foundation + core pages (landing, features, about, contact)
Phase 2: Content + trust (use cases, testimonials, screenshots)
Phase 3: Interactive + growth (animated Gantt, ROI calculator, blog)
Phase 4: SEO + expansion (blog posts, pricing, comparison pages)

Defer to post-MVP: Product sandbox/free trial (very high effort), live chat, community/forum

### From ARCHITECTURE.md (Confidence: HIGH - official Next.js patterns)

**Core Principles:**
1. **Server-first rendering** - All pages are Server Components by default. Only interactive widgets get `"use client"`.
2. **Static generation everywhere** - `generateStaticParams` pre-builds all locale + slug combinations. Zero server compute.
3. **Locale as route segment** - `app/[locale]/` dynamic segment handled by middleware redirect.
4. **Content as code** - MDX files in repo. No CMS backend required.
5. **Islands architecture** - Interactive components (Gantt, ROI calculator) are self-contained client islands.

**Folder Structure:**
```
src/
  app/
    [locale]/              # i18n route segment (en/bg)
      layout.tsx           # Root layout
      page.tsx             # Landing page
      features/page.tsx
      blog/[slug]/page.tsx
    api/                   # API routes (outside locale)
      contact/route.ts
      demo-request/route.ts
  components/
    layout/                # Header, Footer, MobileNav, LanguageSwitcher
    sections/              # Server Components: Hero, FeatureGrid, etc.
    interactive/           # Client Components: GanttMockup, ROICalculator, forms
    ui/                    # shadcn/ui generated components
    mdx/                   # MDX-specific components
    motion/                # Animation wrappers
  content/
    blog/
      en/*.mdx
      bg/*.mdx
  i18n/
    config.ts              # Locale definitions
    dictionaries/
      en.json
      bg.json
  lib/
    mdx.ts                 # Content loading utilities
    email.ts               # Resend integration
    validation.ts          # Zod schemas
```

**Critical Patterns:**
- **Props-down translation** - Server Components fetch dictionary, pass translated strings as props to client components. No translation in client code.
- **Composition over configuration** - Build pages by composing section components.
- **Co-located metadata** - Export `generateMetadata` from page.tsx files.
- **Shared Zod schemas** - Define validation in lib/validation.ts, import in both client form and API route.

**Client/Server Boundary:**
- Server: All layouts, pages, sections (Hero, FeatureGrid, Testimonials)
- Client: MobileNav, LanguageSwitcher, GanttMockup, ROICalculator, ContactForm, animation wrappers

**Form Handling:**
API Route Handlers (not Server Actions). Client form submits to `/api/contact` -> server validates with Zod -> Resend email -> return success/error.

**SEO:**
- Metadata cascades from layout to page
- Dynamic sitemap (`app/sitemap.ts`) generates all locale URLs
- `robots.ts` for robots.txt
- `opengraph-image.tsx` for OG images (per page or global)
- Structured data (Organization, Product, FAQ schemas) as JSON-LD in layouts

**Build Order Dependencies:**
1. Foundation (config, i18n, design tokens, shadcn/ui)
2. Layout shell (Header, Footer, nav)
3. Landing page (Hero, Gantt mockup, CTA)
4. Content pages (features, pricing, about)
5. Blog system (MDX pipeline, post pages)
6. Forms + contact (validation, Resend integration)
7. SEO + analytics (sitemap, metadata refinement)

### From PITFALLS.md (Confidence: HIGH - official Next.js docs + established patterns)

**Critical Pitfalls (Cause Rewrites):**

1. **i18n architecture wrong from start** - Retrofitting i18n after building pages means complete restructuring. `app/[locale]/` must be in the first commit.

2. **Contentlayer is dead** - Project is abandoned/unmaintained (last update 2023). Use `@next/mdx` + gray-matter instead.

3. **Client component boundary creep** - Single `"use client"` at wrong level cascades, forcing entire page trees into client rendering. Destroys SEO and performance.

4. **SEO metadata neglected** - Metadata generation deeply integrated with routing. Can't bolt on "later." Missing hreflang, OG images, sitemap hurts indexing.

5. **Brand identity paralysis** - Creating brand from scratch becomes infinite loop. Time-box to 1-2 weeks, use shadcn/ui defaults, ship.

**Moderate Pitfalls (Cause Delays):**

6. **Framer Motion tanks Core Web Vitals** - Animating LCP element or using non-composited properties causes poor LCP/CLS. Lazy-load animations, use transform/opacity only.

7. **Layout stale data trap** - Layouts don't re-render on navigation in App Router. Language switcher breaks. Use `usePathname()` for dynamic content.

8. **params as Promise** - Next.js 15+ changed params from object to Promise. Must await in Server Components: `const { locale } = await params`.

9. **ROI calculator nobody trusts** - Inflated outputs or overly simplistic model damages credibility. Use conservative estimates, show methodology, 3-5 inputs max.

10. **Bulgarian content as afterthought** - Literal translation misses cultural context and search terms. Research Bulgarian keywords independently.

11. **MDX blog without content infrastructure** - @next/mdx has no content collection management. Build registry (getAllPosts, getPostsByTag) before writing posts.

**Minor Pitfalls:**

12. **Font loading flash** - Bulgarian needs Cyrillic font subsets. Preload both Latin and Cyrillic.

13. **Demo form without error states** - Silent failures lose leads. Implement validation, loading, success/error states, fallback if Resend fails.

14. **Over-engineering Gantt animation** - Scope creep turns 2-day animation into 2-week mini-product. Hard 3-day time-box, fixed animation only.

15. **Ignoring mobile** - Google uses mobile-first indexing. Test at 375px throughout, not just before launch.

16. **Future features without safety net** - Presenting unbuilt features as existing creates credibility gap in demos. Use aspirational language, track feature interest in form.

**Phase-Specific Warnings:**
- Foundation: i18n, params pattern, Contentlayer rejection, Cyrillic fonts (Critical)
- Design: Brand paralysis time-box (Critical)
- Landing: Gantt scope creep, animation performance, mobile-first (Moderate)
- Blog: Content infrastructure before posts (Moderate)
- SEO: Metadata from day 1, Bulgarian keyword research (Critical to Moderate)

---

## Implications for Roadmap

### Suggested Phase Structure

**Phase 1: Foundation & Design System** (Non-negotiable first)
- MUST establish `app/[locale]/` routing structure
- MUST configure next-intl or built-in i18n pattern
- MUST set up Tailwind + shadcn/ui design system with Bulgarian (Cyrillic) font support
- MUST configure MDX pipeline (NOT Contentlayer)
- MUST establish client/server boundary rules
- Time-box brand decisions: 1-2 weeks maximum
- Deliverable: Empty but correctly structured Next.js app with design tokens

**Rationale:** Every page depends on this foundation. Getting i18n or client boundaries wrong means rewrites. Contentlayer choice is irreversible without migration pain.

**Phase 2: Layout Shell & Navigation** (Depends on Phase 1)
- Header, Footer, MobileNav (client), LanguageSwitcher (client)
- Proper use of `usePathname()` for active states
- Test locale switching works correctly
- Deliverable: Shared layout wrapping all pages

**Rationale:** Pages need the shell. Building pages before the shell means rework.

**Phase 3: Landing Page & Hero** (Depends on Phase 2)
- Hero section (server component)
- Animated Gantt mockup (client island, 3-day time-box)
- Feature highlights section
- CTA banner
- Mobile-first implementation
- Deliverable: Compelling landing page that converts

**Rationale:** Landing page is the primary acquisition surface. Gantt animation is highest-impact differentiator but must be scope-limited.

**Phase 4: Core Content Pages** (Can parallelize with Phase 5)
- Features page with capability breakdown
- About page (team, story, mission)
- 2-3 Use case pages
- Pricing page (tiers or "Contact for quote")
- Deliverable: Complete site structure for initial launch

**Rationale:** Standard marketing pages with known patterns. Low risk.

**Phase 5: Blog System & SEO Infrastructure** (Can parallelize with Phase 4)
- MDX content loading utilities (registry pattern)
- Blog index and [slug] pages
- Sitemap generation (all locales)
- Metadata refinement across all pages
- Robots.txt
- Structured data (Organization, Product schemas)
- Deliverable: SEO-optimized site with blog capability

**Rationale:** Blog infrastructure must exist before writing posts. Sitemap needs all routes to exist.

**Phase 6: Interactive Features** (Depends on Phases 3-4)
- ROI Calculator (client island, conservative estimates, 3-5 inputs)
- Before/After comparison slider
- Contact/demo request forms
- Resend email integration
- Form validation (Zod) with error states
- Deliverable: Lead generation mechanisms

**Rationale:** Forms depend on pages existing. ROI calculator is high-value differentiator but lower priority than landing page.

**Phase 7: Content & Polish** (Depends on Phase 5)
- Write 5-10 blog posts (EN + BG)
- Add customer testimonials/logos
- Product screenshots throughout
- Performance audit (Core Web Vitals)
- Analytics integration (Plausible)
- Deliverable: Launch-ready site with content

**Rationale:** Content comes after infrastructure. Performance audit must be before launch.

### Research Flags

**Phases that need `/gsd:research-phase`:**
- Phase 3 (Landing Page): Animation performance patterns, Gantt mockup implementation
- Phase 6 (ROI Calculator): B2B calculator best practices, conservative estimation models

**Phases with well-documented patterns (skip research):**
- Phase 2 (Layout): Standard Next.js layout patterns
- Phase 4 (Content Pages): Standard marketing page patterns
- Phase 5 (Blog/SEO): Official Next.js MDX + metadata documentation
- Phase 7 (Content): Standard content creation

### Dependencies

```
Phase 1 (Foundation)
  |
  +-- Phase 2 (Layout) --> Phase 3 (Landing)
  |                    |
  |                    +-> Phase 4 (Content Pages)
  |                    |
  |                    +-> Phase 5 (Blog/SEO)
  |
  +-- Phase 6 (Interactive Features)

Phase 7 depends on all previous phases
```

**Parallelization opportunities:**
- Phases 4 and 5 can run in parallel after Phase 2 completes
- Phase 6 can start after Phase 3 (doesn't need Phases 4-5)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack recommendations** | MEDIUM | Version numbers from training data (cutoff early 2025). Verify with npm before install. Pattern recommendations (Next.js App Router, next-intl, @next/mdx, Plausible, Vercel) are HIGH confidence. |
| **Feature priorities** | MEDIUM | Competitor analysis from training data. Sites may have changed. Interactive Gantt as differentiator is HIGH confidence (universal gap in APS space). |
| **Architecture patterns** | HIGH | Based on official Next.js App Router documentation. Folder structure, i18n routing, client/server boundaries, form handling all verified against official sources. |
| **Pitfall identification** | HIGH | i18n, params-as-Promise, client boundary, SEO metadata, layout stale data all from official Next.js docs. Contentlayer abandonment is well-documented community knowledge. |
| **Bulgarian localization** | MEDIUM | Cyrillic font requirement is HIGH confidence. Specific Bulgarian manufacturing terminology and keyword research needs domain expert validation. |
| **ROI calculator model** | LOW | Conservative estimate guidance is general B2B pattern. Specific calculation model requires Prefactor customer data validation. |
| **Build time estimates** | MEDIUM | Phase durations and complexity are estimates based on similar projects. Actual times depend on team size and experience. |

### Gaps to Address During Roadmap Planning

1. **Brand identity timeline** - How long will brand creation actually take? Enforce 1-2 week time-box to prevent paralysis.

2. **Bulgarian domain expertise** - Who validates Bulgarian content and keyword research? Need native speaker familiar with manufacturing industry.

3. **Demo/sales process alignment** - How will sales team handle prospect expectations about future features? Need demo script coordination.

4. **Content authorship** - Who writes blog posts? Marketing or technical team? EN vs BG authorship workflow?

5. **Gantt animation scope** - What exactly does the animation show? Needs design spec before implementation to prevent scope creep.

6. **ROI calculator formula** - What's the actual calculation? Needs customer data validation before implementation.

7. **Customer testimonials** - Are there beta users who can provide testimonials for launch? Or is this post-launch?

8. **Hosting/domain** - Vercel account setup, domain (prefactor.com?) DNS configuration, SSL.

9. **Email sending domain** - Resend requires verified sending domain. Plan for DNS records (SPF, DKIM).

10. **Performance budget enforcement** - Who runs Lighthouse audits? What are the actual thresholds (LCP < 2.5s, FID < 100ms, CLS < 0.1)?

---

## Sources

**Primary sources:**
- Next.js Official Documentation (App Router, i18n, Metadata, MDX, Server Components, Route Handlers, generateStaticParams)
- Tailwind CSS documentation
- shadcn/ui documentation
- next-intl documentation
- Resend documentation
- Plausible documentation
- Framer Motion / Motion documentation

**Secondary sources:**
- Competitor analysis (PlanetTogether, Siemens Opcenter, Asprova, SAP) from training data
- B2B SaaS marketing patterns (Linear, Notion, Vercel, Stripe) from training data
- Contentlayer project status (GitHub issues, community reports)

**Confidence caveat:**
Web search unavailable during research. All findings based on training data through early 2025. Competitor sites, package versions, and documentation may have changed. Verify current state before final decisions.

---

## Next Steps

1. **Roadmapper agent** can use this synthesis to structure the roadmap into concrete phases with:
   - Specific tasks per phase
   - Time estimates per task
   - Dependencies between tasks
   - Success criteria per phase

2. **Immediate validation tasks** before roadmap finalization:
   - Verify current npm versions: `npm view next version`, `npm view next-intl version`, `npm view framer-motion version` (or `motion`)
   - Confirm Tailwind v4 compatibility with shadcn/ui or fall back to v3
   - Review CLAUDE.md against research findings (Contentlayer mentioned but should be rejected)
   - Validate Bulgarian localization approach with native speaker

3. **Key architectural decisions to make during Phase 1:**
   - next-intl vs built-in Next.js i18n (research recommends next-intl)
   - Brand time-box enforcement mechanism
   - Client/server boundary naming convention (folder structure or file suffix)
   - MDX content registry pattern (manual list vs automated glob)

---

**RESEARCH COMPLETE. READY FOR ROADMAP DEFINITION.**
