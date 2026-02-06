# PROJECT.md — Prefactor Marketing Site

## What This Is

A marketing website for **Prefactor** — an AI-powered production scheduling platform targeting SME and mid-market manufacturers across Bulgaria and the EU. The site's purpose is to establish Prefactor as a modern, AI-driven scheduling solution, generate demo requests, and build brand credibility through content marketing.

## Core Value

**AI finds the optimal production schedule automatically** — minimizes downtime, respects constraints (resources, shifts, changeovers, BOM dependencies), and delivers results that manual planning cannot match. The site must communicate this clearly and compellingly.

## What We're Building

A Next.js marketing site with:

1. **Landing page** with animated Gantt chart mockup demonstrating AI scheduling in action
2. **Features page** showcasing the platform capabilities (scheduling, resource management, optimization, and the growing ERP suite)
3. **Use Cases / Industries page** for manufacturing, production planning, job shops
4. **ROI Calculator** — interactive tool where visitors input production data and see estimated time/cost savings
5. **Pricing page** — feature comparison with "Contact for pricing" approach (no public prices)
6. **About page** — team, story, mission
7. **Blog** — SEO content about production scheduling, AI in manufacturing, industry insights (from launch)
8. **Contact / Demo Request** — primary conversion point, form with email integration
9. **Full i18n** — English + Bulgarian with URL-based switching (/en, /bg)

## The Product (Context)

The Prefactor platform (separate codebase) currently provides:
- **Production scheduling** with Gantt chart visualization
- **Order management** with operations, priorities, quantities
- **Resource/Group management** with shifts, breaks, calendars
- **Changeover management** with attribute-based setup time matrices
- **BOM table** (being integrated into the app proper)
- **AI optimization engine** that respects all constraints

**Coming soon** (present on the website as existing capabilities):
- Full BOM management with multi-level support
- Inventory/stock tracking
- Purchase order management
- MRP-lite (automated order generation from BOM)
- Shop floor tracking (real-time production status)

The website should present Prefactor as a **complete AI-driven scheduling and production management platform** — not as a work-in-progress.

Live demo: `https://preactor-client-production.up.railway.app/` (will get official domain soon)

## Target Audience

- **Who:** Production managers, operations directors, C-suite/owners of manufacturing companies
- **Company size:** SME (10-100 people) and mid-market (100-500 people)
- **Geography:** Bulgaria + EU (dual language site)
- **Pain points:** Manual scheduling inefficiency, production bottlenecks, lack of visibility, legacy tools that are complex and expensive

## Brand Identity

**To be created from scratch.** No existing logo, colors, or fonts.

- **Tone:** Modern + Approachable — clean, friendly, innovative. Think Linear/Notion aesthetic but for manufacturing.
- **Message:** AI + Simplicity — smart enough to optimize complex schedules, simple enough that you don't need an IT team to use it.
- **Positioning:** Modern alternative to SAP/Oracle/legacy ERP scheduling tools. Affordable, accessible, AI-native.

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router) | SSR/SSG for SEO — critical for B2B acquisition |
| Styling | Tailwind CSS | Team knows it from the product codebase |
| UI Components | shadcn/ui (Radix UI) | Team uses Radix in the product |
| CMS / Blog | MDX or Contentlayer | Blog content without a backend |
| Hosting | Vercel or Cloudflare Pages | Zero-config, global CDN |
| Forms | Resend + React Email | Contact/demo request emails |
| Analytics | Plausible or PostHog | Privacy-friendly |
| Animations | Framer Motion | Smooth scroll animations, Gantt demo previews |
| i18n | next-intl or similar | URL-based locale switching (/en, /bg) |

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Landing page with hero section, animated Gantt mockup, and CTA
- [ ] Features page showcasing platform capabilities
- [ ] Use cases / industries page
- [ ] Interactive ROI calculator
- [ ] Pricing page with feature comparison (contact for pricing)
- [ ] About page (team, story, mission)
- [ ] Blog with MDX support (SEO content from launch)
- [ ] Contact / Demo Request form with email integration
- [ ] Full i18n (English + Bulgarian, URL-based switching)
- [ ] Brand identity creation (logo, colors, typography, design system)
- [ ] Animated Gantt chart mockup for the landing page
- [ ] Before/After comparisons (manual scheduling vs. Prefactor)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] SEO optimization (meta tags, structured data, sitemap)
- [ ] Privacy-friendly analytics integration

### Out of Scope

- Embedded live product demo — too complex, using animated mockup instead
- User authentication / login — this is a marketing site, not the product
- E-commerce / self-serve purchase — enterprise sales model (demo request)
- Multi-language beyond EN/BG — can be added later
- CRM integration — start with email-based lead capture

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | SSR/SSG critical for SEO, team familiarity | Decided |
| Animated Gantt mockup (not live embed) | Controlled experience, no dependency on product API | Decided |
| Contact for pricing (no public tiers) | Enterprise/consultative sales approach | Decided |
| Full i18n from day one | Targeting Bulgaria + EU requires both languages | Decided |
| Blog from launch | SEO content is part of the acquisition strategy | Decided |
| Brand identity from scratch | No existing assets — need logo, colors, typography | Decided |
| ROI calculator in v1 | Key conversion tool, differentiates from competitors | Decided |
| Present future features as existing | Website should show the full platform vision | Decided |

---
*Last updated: 2026-02-06 after initialization*
