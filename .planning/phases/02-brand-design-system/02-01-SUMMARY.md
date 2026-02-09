---
phase: 02-brand-design-system
plan: 01
title: "Brand Rename & Design Token System"
subsystem: "design-system"
tags: [branding, design-tokens, tailwind-v4, oklch, typography, color-palette]

dependency-graph:
  requires:
    - "01 (Foundation & i18n -- globals.css, messages/, CLAUDE.md)"
  provides:
    - "Planifactor brand name across all user-facing text"
    - "Blue-600 primary color replacing default shadcn near-black"
    - "Brand color scale (brand-50 through brand-950) as Tailwind utilities"
    - "Typography scale (text-hero through text-label) as Tailwind utilities"
    - "12px border radius for rounded, approachable feel"
    - "Light-mode-only theme (no dark mode)"
  affects:
    - "02-02 (font system -- will build on typography tokens)"
    - "03 (layout shell -- all components consume these tokens)"
    - "All subsequent phases (every UI element uses brand colors and typography)"

tech-stack:
  added: []
  patterns:
    - "OKLCH color space for perceptually uniform brand palette"
    - "Monochrome blue design system (primary, secondary, accent all blue-family)"
    - "Tailwind v4 custom typography utilities via @theme inline (--text-hero, etc.)"
    - "CSS variable consumption chain: :root -> @theme inline -> Tailwind utility -> component"

key-files:
  created: []
  modified:
    - "messages/en.json"
    - "messages/bg.json"
    - "CLAUDE.md"
    - "src/app/globals.css"

decisions:
  - id: "brand-rename-planifactor"
    decision: "Rename all 'Prefactor' references to 'Planifactor'"
    rationale: "Brand name change -- Plan + Factory"
  - id: "blue-600-primary"
    decision: "Use oklch(0.546 0.245 262.881) (blue-600) as primary brand color"
    rationale: "Vivid, professional blue that communicates trust and technology for B2B manufacturing audience"
  - id: "light-mode-only"
    decision: "Remove .dark block and @custom-variant dark"
    rationale: "Marketing site is light-mode only per CONTEXT.md -- dark mode adds complexity with no B2B benefit"
  - id: "no-sidebar-vars"
    decision: "Remove all sidebar-* CSS variables"
    rationale: "Marketing site has no sidebar navigation; reduces CSS surface area"
  - id: "radius-12px"
    decision: "Set --radius to 0.75rem (12px)"
    rationale: "Rounded, approachable feel for marketing site per CONTEXT.md"

metrics:
  duration: "~4 minutes"
  completed: "2026-02-09"
  tasks: "2/2"
  commits: 2
---

# Phase 02 Plan 01: Brand Rename & Design Token System Summary

**One-liner:** Renamed Prefactor to Planifactor everywhere and replaced default shadcn near-black theme with a monochrome blue design system -- OKLCH brand palette (50-950), typography scale (hero through label), and 12px radius.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Rename Prefactor to Planifactor across codebase | 48fe252 | messages/en.json, messages/bg.json, CLAUDE.md |
| 2 | Replace default shadcn theme with Planifactor design tokens | 1cad36c | src/app/globals.css |

## What Was Built

### Task 1: Brand Rename
- Updated `messages/en.json` metadata title to "Planifactor - AI production scheduling"
- Updated `messages/en.json` description to include AI angle: "AI-powered production scheduling..."
- Updated `messages/bg.json` with matching title and description
- Replaced all 5 occurrences of "Prefactor" in `CLAUDE.md` with "Planifactor"
- Replaced "Previously called Preactor/Optiplan, rebranded to Prefactor" with "Plan + Factory -- an AI-powered B2B production scheduling platform"
- Verified: zero occurrences of "Prefactor" remain in messages/ or CLAUDE.md

### Task 2: Design Token System
- **Primary color**: Changed from `oklch(0.205 0 0)` (near-black) to `oklch(0.546 0.245 262.881)` (blue-600)
- **Secondary/muted**: Changed from neutral gray to blue-50 (`oklch(0.97 0.014 254.604)`)
- **Accent**: Changed to blue-100 (`oklch(0.932 0.032 255.585)`)
- **Ring**: Changed from gray to blue-600 for consistent blue focus rings
- **Charts**: All 5 chart colors now use the blue palette (600, 400, 300, 700, 500)
- **Brand scale**: Added 11-stop blue palette (brand-50 through brand-950) in `@theme inline`
- **Typography scale**: Added 6 custom text utilities:
  - `text-hero`: 3.5rem / 1.1 / 800 / -0.025em
  - `text-display`: 3rem / 1.15 / 700 / -0.02em
  - `text-heading`: 2.25rem / 1.2 / 700 / -0.02em
  - `text-subheading`: 1.5rem / 1.35 / 600
  - `text-body-lg`: 1.25rem / 1.6 / 400
  - `text-label`: 0.875rem / 1.5 / 500 / 0.01em
- **Radius**: Changed from 0.625rem (10px) to 0.75rem (12px)
- **Removed**: Entire `.dark` block, `@custom-variant dark` directive, all `--sidebar-*` variables and their `--color-sidebar-*` mappings
- **Preserved**: All `@import` statements, `@layer base` block, font variables, radius calculations

## Key Link Verification

| From | To | Via | Status |
|------|----|-----|--------|
| `:root --primary: oklch(0.546...)` | `button.tsx bg-primary` | CSS variable -> @theme inline -> Tailwind utility | Verified |
| `@theme inline --color-brand-*` | Tailwind `bg-brand-600` etc. | @theme inline registration | Verified |

## Verification Results

- [x] `npm run build` passes with zero errors
- [x] Zero occurrences of "Prefactor" in messages/*.json and CLAUDE.md
- [x] `--primary` is `oklch(0.546 0.245 262.881)` (blue-600, not near-black)
- [x] `--color-brand-600` exists in `@theme inline` (enables `bg-brand-600` utility)
- [x] `--text-hero` through `--text-label` defined with size/line-height/weight/letter-spacing
- [x] `--ring` is blue-600 for consistent focus ring color
- [x] No `.dark` block in globals.css
- [x] No `sidebar` variables in globals.css
- [x] globals.css is 116 lines (above 80-line minimum)
- [x] Button component at `src/components/ui/button.tsx` uses `bg-primary` (auto-consumes blue-600)

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

1. **Brand rename to Planifactor**: All user-facing text now says "Planifactor" instead of "Prefactor". The tagline "Plan + Factory" captures the brand essence.
2. **Blue-600 as primary**: `oklch(0.546 0.245 262.881)` chosen as the core brand color -- vivid, professional, trustworthy for B2B.
3. **Light-mode only**: Removed dark theme entirely to reduce complexity for a marketing site.
4. **No sidebar variables**: Stripped sidebar CSS variables since marketing site uses no sidebar navigation.
5. **12px radius**: Increased from 10px to 12px for a more rounded, approachable feel.

## Next Phase Readiness

Ready for Plan 02-02 (Font System & Visual Polish):
- Typography scale tokens exist (`text-hero` through `text-label`) and need only font-family pairing
- Brand color palette is complete and available via Tailwind utilities
- All shadcn components auto-consume the blue primary via CSS variables
- No dark mode to worry about in any subsequent component work
