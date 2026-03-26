# CLAUDE.md - Planificator Marketing Site

## Project Overview

Marketing website for **Planificator** — Plan + Factory -- an AI-powered B2B production scheduling platform with Gantt chart visualization, resource/shift/order management, and optimization scenarios.

The actual product (app) lives separately at `C:\mypc\programming\Optiplan\dev\preactor-client`. This repo is the public-facing marketing site only.

## Decided Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js (App Router)** | SSR/SSG for SEO — critical for B2B acquisition |
| Styling | **Tailwind CSS** | Team already knows it from the product codebase |
| UI Components | **shadcn/ui** (built on Radix UI) | Team already uses Radix in the product |
| CMS / Blog | **MDX** or **Contentlayer** | Blog content without a backend |
| Hosting | **Vercel** or **Cloudflare Pages** | Zero-config, global CDN |
| Forms | **Resend + React Email** | Contact/demo request emails |
| Analytics | **Plausible** or **PostHog** | Privacy-friendly |
| Animations | **Framer Motion** | Smooth scroll animations, Gantt demo previews |

## Site Structure (Planned Pages)

1. **Landing / Hero** — headline, value proposition, CTA (demo/trial), animated Gantt preview
2. **Features** — Gantt scheduling, resource management, shift planning, order optimization, multi-language
3. **Use Cases / Industries** — manufacturing, production planning, job shops
4. **Pricing** — tiers or "Contact for demo"
5. **About** — team, story, mission
6. **Blog / Resources** — SEO content around production scheduling
7. **Contact / Demo Request** — form with CRM integration

## Key Marketing Elements

- Interactive or animated Gantt demo on the landing page
- Before/After comparisons (manual scheduling vs. Planificator)
- ROI calculator ("How much time could you save?")
- Multi-language support (English + Bulgarian minimum)

## Product Features to Highlight

- Gantt chart visualization for production scheduling
- Resource management (machines, workers, stations)
- Shift and schedule management
- Order tracking and optimization
- Break and changeover management
- Attribute-based scheduling
- Optimizer with configurable settings
- Multi-language interface

## Pre-Push Checklist

Before every `git push`, remind the user about the status of items in `TODO_BEFORE_GOING_LIVE.md` — especially the Resend domain verification status and any other blockers for production deployment.

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```
