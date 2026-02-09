# Phase 4 Plan 2: Before/After Comparison Section Summary

**One-liner:** Draggable before/after slider with 4 KPI metrics (react-compare-slider + motion/react entrance animation) comparing manual scheduling vs Planifactor results.

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 4 |
| plan | 2 |
| subsystem | landing-page |
| tags | comparison, slider, kpi, motion, i18n |
| requires | 04-01 |
| provides | ComparisonSection, ComparisonSlider, MetricCard |
| affects | 05 (content pages may reuse comparison pattern) |
| tech-stack.patterns | react-compare-slider for drag interaction, LazyMotion for scroll entrance |
| completed | 2026-02-09 |
| duration | ~4 minutes |

## What Was Built

### Components Created

1. **MetricCard** (`src/components/sections/MetricCard.tsx`) -- Presentational component displaying a KPI value with icon, label, and color-coded variant (red for "before", brand-blue for "after"). No `"use client"` -- implicitly client via parent.

2. **ComparisonSlider** (`src/components/sections/ComparisonSlider.tsx`) -- Client component wrapping `ReactCompareSlider` (v4 beta) with two instances: landscape (desktop, vertical divider) and portrait (mobile, horizontal divider). Uses `LazyMotion` + `m.div` for scroll-triggered entrance animation with `whileInView`. Respects `prefers-reduced-motion` via `useReducedMotion`.

3. **ComparisonSection** (`src/components/sections/ComparisonSection.tsx`) -- Async server component that fetches Comparison translations and renders the section heading, subtext, and ComparisonSlider with 4 KPI metrics. Passes Lucide icon JSX elements as props across the server/client boundary.

### Translations Added

- `Comparison` namespace with 16 keys in both `messages/en.json` and `messages/bg.json`
- Section heading, subtext, before/after labels, 4 metric names, 8 metric values
- BG locale uses localized time values ("4 часа" / "15 мин")

### Page Integration

- ComparisonSection inserted between Hero and FeatureHighlights on the home page
- Section order: Hero > ComparisonSection > FeatureHighlights > SocialProof > CTABanner

## KPI Metrics Displayed

| Metric | Before (Manual) | After (Planifactor) |
|--------|-----------------|---------------------|
| Resource Utilization | 62% | 90% |
| On-Time Delivery | 74% | 96% |
| Scheduling Time | 4 hours | 15 min |
| Idle Time | 28% | 8% |

## Technical Details

- **react-compare-slider v4.0.0-1 (beta):** Uses `defaultPosition` prop (not `position`), `ReactCompareSliderHandle` with `buttonStyle` customization. Handle button styled with brand primary color `oklch(0.546 0.245 262.881)`.
- **Dual slider instances:** Two `ReactCompareSlider` components (hidden/shown via Tailwind responsive classes) handle landscape/portrait modes since the component doesn't dynamically switch orientation.
- **LazyMotion + domAnimation:** Smaller motion bundle for entrance-only animation (vs full `motion` import).
- **CLS prevention:** `min-h-[350px] md:min-h-[300px]` on the container reserves space before client hydration.
- **Server-to-client JSX passing:** Lucide icons (`Activity`, `Truck`, `Clock`, `Pause`) rendered as JSX in server component and passed as props to client component -- works via React element serialization.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Used `defaultPosition` instead of `position` | react-compare-slider v4 API changed from v3; `position` is no longer a prop |
| Two slider instances for responsive | Slider portrait/landscape can't be toggled dynamically; CSS hidden/shown approach is cleaner |
| LazyMotion over full motion | Only need entrance animation; LazyMotion + domAnimation is smaller bundle |
| No `"use client"` on MetricCard | Implicitly client via ComparisonSlider parent; keeps it a simple presentational component |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ReactCompareSliderHandle API correction**
- **Found during:** Task 2
- **Issue:** Plan specified `portrait` prop on `ReactCompareSliderHandle` but v4 API does not support it. Also plan used `position` prop but v4 uses `defaultPosition`.
- **Fix:** Removed `portrait` from Handle props; changed `position={50}` to `defaultPosition={50}`
- **Files modified:** `src/components/sections/ComparisonSlider.tsx`
- **Commit:** c5f6531

## Key Files

### Created
- `src/components/sections/MetricCard.tsx`
- `src/components/sections/ComparisonSlider.tsx`
- `src/components/sections/ComparisonSection.tsx`

### Modified
- `messages/en.json` (added Comparison namespace)
- `messages/bg.json` (added Comparison namespace)
- `src/app/[locale]/page.tsx` (added ComparisonSection import and render)

## Commits

| Hash | Message |
|------|---------|
| 2048050 | feat(04-02): add Comparison translations for EN and BG |
| c5f6531 | feat(04-02): create before/after comparison components |
| f891e90 | feat(04-02): insert ComparisonSection into home page |

## Verification Results

- [x] `messages/en.json` has `Comparison` namespace with all 16 keys
- [x] `messages/bg.json` has `Comparison` namespace with all 16 keys (Bulgarian text)
- [x] MetricCard.tsx exists at `src/components/sections/MetricCard.tsx`
- [x] ComparisonSlider.tsx exists at `src/components/sections/ComparisonSlider.tsx` with `"use client"`
- [x] ComparisonSection.tsx exists at `src/components/sections/ComparisonSection.tsx` (async server component)
- [x] page.tsx renders sections in order: Hero, ComparisonSection, FeatureHighlights, SocialProof, CTABanner
- [x] `npm run build` succeeds with zero errors (21/21 pages prerendered)
- [x] `npm run lint` passes (0 errors, 1 pre-existing warning in GanttMockup.tsx)
- [x] Both EN and BG locale JSON files parse correctly

## Next Phase Readiness

Phase 4 is now complete (both plans executed). Ready for Phase 5 (Content Pages).

No blockers. All dependencies satisfied.
