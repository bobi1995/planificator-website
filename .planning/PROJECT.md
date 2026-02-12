# PROJECT.md — Planifactor Marketing Site

## Current State

**v1 SHIPPED** (2026-02-12) — Full marketing site with 13 pages, 10 blog posts, animated Gantt, ROI calculator, Calendly booking, bilingual EN/BG, and complete SEO infrastructure.

See [milestones/v1-ROADMAP.md](milestones/v1-ROADMAP.md) for full v1 archive.

**Next:** Deploy to production (Vercel/Cloudflare Pages), then plan v2 milestone.

---

## What This Is

A marketing website for **Planifactor** — an AI-powered production scheduling platform targeting SME and mid-market manufacturers across Bulgaria and the EU. The site generates demo requests and builds brand credibility through content marketing.

## Core Value

**AI finds the optimal production schedule automatically** — minimizes downtime, respects constraints (resources, shifts, changeovers, BOM dependencies), and delivers results that manual planning cannot match.

## Target Audience

- **Who:** Production managers, operations directors, C-suite/owners of manufacturing companies
- **Company size:** SME (10-100 people) and mid-market (100-500 people)
- **Geography:** Bulgaria + EU (dual language site)
- **Pain points:** Manual scheduling inefficiency, production bottlenecks, lack of visibility, legacy tools that are complex and expensive

## Brand Identity

- **Name:** Planifactor ("Plan + Factory")
- **Primary color:** oklch(0.546 0.245 262.881) (blue-600)
- **Tone:** Modern + Approachable — clean, friendly, innovative
- **Positioning:** Modern alternative to SAP/Oracle/legacy APS tools. Affordable, accessible, AI-native.

## Tech Stack (as shipped in v1)

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React | 19.2.3 |
| i18n | next-intl | ^4.8.2 |
| Styling | Tailwind CSS v4 (CSS-first) | ^4 |
| UI Components | shadcn/ui (new-york) | 3.8.4 |
| Animations | motion | ^12 |
| Blog | next-mdx-remote-client/rsc | - |
| Analytics | Plausible (next-plausible) | - |
| Demo booking | react-calendly | 4.4.0 |

## The Product (Context)

The Planifactor platform (separate codebase at `C:\mypc\programming\Optiplan\dev\preactor-client`) provides:
- Production scheduling with Gantt chart visualization
- Order management with operations, priorities, quantities
- Resource/Group management with shifts, breaks, calendars
- Changeover management with attribute-based setup time matrices
- AI optimization engine that respects all constraints

The website presents Planifactor as a complete AI-driven scheduling and production management platform.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | SSR/SSG critical for SEO, team familiarity | Shipped |
| Planifactor brand name | "Plan + Factory" captures AI scheduling for factories | Shipped |
| Blue-600 primary color | Vivid, trustworthy B2B blue | Shipped |
| Light mode only | Marketing site complexity reduction | Shipped |
| Animated Gantt mockup (not live embed) | Controlled experience, no product API dependency | Shipped |
| Contact for pricing (no public tiers) | Enterprise/consultative sales approach | Shipped |
| Full i18n from day one | Bulgaria + EU requires both languages | Shipped |
| MDX blog from launch | SEO content is acquisition strategy | Shipped |
| Plausible over PostHog | Lightweight, cookieless, GDPR-compliant | Shipped |
| ROI calculator in v1 | Key conversion tool, competitor differentiation | Shipped |

## v2 Candidates (not yet scoped)

- Contact form with Resend email integration
- Resource library / downloadable guides
- Live chat / AI chatbot
- Product sandbox / free trial
- Video walkthrough (60-90 sec product demo)
- Newsletter signup with email nurture sequence
- Additional comparison pages
- Advanced A/B testing

---
*Last updated: 2026-02-12 after v1 milestone completion*
