# Phase 8 Plan 4: CLS Prevention & Performance Audit Summary

**One-liner:** CLS-safe dynamic content via matched min-h on CalendlyInline fallback/widget states and min-h on fixed CookieConsent; full performance audit confirms zero anti-patterns

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 8 |
| plan | 4 |
| subsystem | performance |
| tags | cls, core-web-vitals, lighthouse, performance, layout-shift |
| requires | Plan 08-02 (Plausible + metadata), Plan 08-03 (OG images) |
| provides | CLS-safe dynamic components, performance-audited codebase |
| affects | Lighthouse scores, Core Web Vitals, search ranking signals |
| tech-stack.added | None |
| tech-stack.patterns | Fixed-position overlays for no-CLS banners, matched min-h for state-toggling containers |
| completed | 2026-02-10 |
| duration | ~15 minutes |

## What Was Done

### Task 1: CLS Prevention and Performance Fixes

**CookieConsent Banner Audit:**
- Verified: Already uses `position: fixed` (`fixed bottom-0 left-0 right-0 z-50`) -- overlays on viewport, does NOT push page content
- Verified: SSR renders nothing (`useState(false)` default), hydration shows banner only if consent unknown -- no CLS since fixed positioning
- Added: `min-h-[60px]` for consistent banner sizing, preventing any internal reflow during text rendering

**CalendlyInline Widget Audit:**
- FOUND CLS RISK: Fallback state (consent not accepted) used `min-h-[300px]` while accepted state used `min-h-[700px]` -- toggling consent caused a 400px layout shift
- FIX: Changed fallback `min-h-[300px]` to `min-h-[700px]` to match the Calendly widget container height -- consent state changes no longer cause layout shift

**AnimatedGantt Audit:**
- Verified: Uses full `motion` import from `motion/react` for SVG attribute animation (correct -- `domAnimation` from LazyMotion does not support SVG attrs)
- Verified: ComparisonSlider correctly uses `LazyMotion + domAnimation` for simpler entrance animations (smaller bundle)
- No changes needed

**General Performance Audit:**
- `npm run build` passes with zero errors, 36 static pages generated, no bundle size warnings
- No raw `<img>` tags found in any component -- all visual content is SVG or CSS
- No client components importing heavy server-only dependencies
- LazyMotion used where appropriate (ComparisonSlider), full motion only where needed (AnimatedGantt SVG)

### Task 2: Human Verification (Checkpoint)

User verified the complete Phase 8 output:
- Sitemap, robots.txt, OG images, metadata cascading, Plausible analytics, JSON-LD structured data
- CLS prevention on dynamic components
- Result: APPROVED

## Key Files

### Modified
- `src/components/interactive/CookieConsent.tsx` -- Added `min-h-[60px]` for consistent banner sizing
- `src/components/interactive/CalendlyInline.tsx` -- Changed fallback `min-h-[300px]` to `min-h-[700px]` to match widget height

### Audited (No Changes Needed)
- `src/components/sections/AnimatedGantt.tsx` -- Full motion import correct for SVG animation
- `src/components/sections/ComparisonSlider.tsx` -- LazyMotion + domAnimation correct for entrance-only animation

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Fallback min-h matches widget min-h (700px) | Prevents layout shift when consent state changes between declined/accepted |
| CookieConsent min-h-[60px] added | Consistent banner sizing for fixed-position overlay; prevents internal reflow |
| AnimatedGantt keeps full motion import | SVG attribute animation (attrX/attrY) requires full motion bundle, not domAnimation |
| No other performance changes needed | Build clean, no raw img tags, no anti-patterns found in component audit |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] CalendlyInline fallback height mismatch causing CLS**
- **Found during:** Task 1
- **Issue:** Fallback state used `min-h-[300px]` while accepted state used `min-h-[700px]`, creating a 400px layout shift when consent toggles
- **Fix:** Changed fallback to `min-h-[700px]` to match widget container
- **Files modified:** `src/components/interactive/CalendlyInline.tsx`
- **Commit:** 959abba

## Verification Results

All verification checks passed:
1. PASS: `npm run build` completes with zero errors (36 static pages generated)
2. PASS: CookieConsent uses `position: fixed` -- no content push, no CLS
3. PASS: CookieConsent has `min-h-[60px]` for consistent sizing
4. PASS: CalendlyInline has matched `min-h-[700px]` on both fallback and widget states
5. PASS: No raw `<img>` tags found in any component
6. PASS: LazyMotion used for ComparisonSlider, full motion only for AnimatedGantt SVG
7. PASS: Human verification approved -- sitemap, robots, OG images, metadata, analytics all working

## Phase 8 Complete Summary

Phase 8 (SEO & Performance) delivered across 4 plans:
- **08-01**: Dynamic sitemap.xml with hreflang alternates, robots.txt, shared SEO utilities
- **08-02**: Plausible Analytics (cookieless, proxy), title.template cascading, generateMetadata on all 12 pages, JSON-LD (Organization, SoftwareApplication, Article)
- **08-03**: 10 branded OG images (1200x630 PNG, blue gradient) for all route segments
- **08-04**: CLS prevention audit and fixes, full performance verification

## Commits

| Hash | Message |
|------|---------|
| 959abba | perf(08-04): fix CLS prevention for dynamic content |
