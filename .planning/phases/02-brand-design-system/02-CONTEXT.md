# Phase 2: Brand Identity & Design System — Context

**Created:** 2026-02-09
**Phase goal:** Planifactor has a complete visual identity -- logo, colors, typography, and responsive design tokens -- that every page and component can use consistently.

---

## Critical: Brand Name Change

**The product is now called Planifactor** (previously Prefactor/Preactor/Optiplan). All references across the codebase, translations, metadata, and marketing copy must be updated. This is a complete rebrand with no visual connection to any previous branding.

**Name meaning:** "Plan + Factory" — the brand should lean into the manufacturing/planning visual metaphor.

---

## Decision 1: Color Palette & Mood

**Mood:** Clean & approachable. Not cold/corporate, not flashy/startup. Think: Notion, Stripe — simplicity signals ease-of-use, differentiating from clunky legacy manufacturing tools.

**Primary color:** Bright/vivid blue in the blue-600 range. Energetic and modern, pairs with clean white layouts.

**Palette approach:** Monochrome blue. No competing secondary/accent color. CTAs, links, active states — all blue. Use the full blue shade range (50-950) for hierarchy:
- Blue-600 for primary actions and brand elements
- Blue-50/100 for subtle backgrounds
- Blue-700/800 for hover states and text accents
- Neutral grays for text, borders, muted content

**Theme:** Light mode only. No dark mode toggle. Manufacturing decision-makers expect light, professional interfaces. Simplifies the design system significantly.

**Brand break:** Complete rebrand. Zero visual DNA from Preactor/Optiplan. Fresh start.

---

## Decision 2: Logo Direction

**Type:** Icon + text logomark (icon can be used standalone as favicon/app icon).

**Icon metaphor:** Gantt bars / timeline. Abstract horizontal bars suggesting a schedule — directly communicates "planning/scheduling." NOT a literal Gantt chart, but an abstraction recognizable at small sizes.

**Weight:** Light & elegant. Thin strokes, breathing room. Feels premium and modern, not heavy or industrial.

**Polish level:** Good enough for launch. Professional SVG that works at all sizes. Can be refined by a designer later, but should not look like a placeholder.

**Requirements:**
- SVG format, scalable from favicon (16px) to hero (200px+)
- Works on both white background and blue background (for footer/hero variants)
- Icon alone works as favicon
- Text + icon works as header logo

---

## Decision 3: Typography Hierarchy

**Font:** Inter everywhere. Single font family, different weights for hierarchy. Already installed with Latin + Cyrillic subsets.

**Heading scale:** Large & bold hero headings with generous whitespace. Think Stripe/Vercel-style hero sections — big statements, lots of breathing room. This creates impact on the landing page.

**Text casing:** Sentence case throughout ("Production scheduling, simplified" not "Production Scheduling, Simplified"). Conversational and approachable, matching the brand mood.

**Weight guidance:**
- Hero h1: Inter 700-800 (bold/extrabold), large size
- Section h2: Inter 600-700 (semibold/bold)
- Body text: Inter 400 (regular)
- UI labels: Inter 500 (medium)

---

## Decision 4: Component Density & Style

**Layout density:** Spacious / airy. Generous whitespace between sections. Content feels curated, not crammed. Modern SaaS marketing site feel.

**Corner radius:** Rounded, 8-12px range. Soft, friendly, modern. Matches the "approachable" mood. Consistent across buttons, cards, containers, inputs.

**CTA buttons:** Clean & confident. Medium size, solid blue fills, clear but not aggressive. "Request a Demo" should be obvious but not screaming.

**Visual texture:** Minimal / flat. Pure flat design — no gradients, no dot patterns, no background textures. Clean surfaces. Let content, whitespace, and typography create the visual interest.

---

## Deferred Ideas

- Dark mode toggle — intentionally excluded for v1. Could be added in a future phase if user demand exists.
- Custom illustration system — not in scope for Phase 2. Could enhance content pages later.
- Motion/animation guidelines — belongs in Phase 4 (Animated Gantt) where motion is actually needed.

---

## Implementation Guidance for Planner

1. **Rename first**: Update all "Prefactor" references to "Planifactor" before any brand work. This affects CLAUDE.md, translations (en.json, bg.json), metadata, page content, and any hardcoded strings.

2. **Design tokens in CSS**: All brand colors, typography scale, and spacing go into `globals.css` via `@theme inline` (Tailwind v4 CSS-first approach). No separate config file.

3. **shadcn/ui theming**: Override the default shadcn neutral theme with Planifactor blue. Map `--primary` to the chosen blue, update `--radius` to 8-12px range.

4. **Logo as SVG component**: Create the logo as a React component that accepts size/variant props, not as a static file. This enables easy use in header, footer, favicon, and OG images.

5. **Responsive verification**: Success criteria require visual verification at 375px, 768px, and 1440px. The plan should include explicit breakpoint checks.

---
*Discussed: 2026-02-09 with project stakeholder*
