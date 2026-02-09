# Phase 4 Plan 01: Animated Gantt Chart (Chaos-to-Order) Summary

**One-liner:** Choreographed SVG animation using motion.rect with attrX/attrY replaces static GanttMockup -- 11 bars transition from chaotic red/amber overlapping positions to optimized brand-blue layout over ~3s with 80ms stagger, respecting prefers-reduced-motion.

---

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 04-animated-gantt-visuals |
| plan | 01 |
| subsystem | hero-animation |
| tags | animation, motion, svg, gantt, chaos-to-order, accessibility, reduced-motion |
| requires | 03-03 (Hero section, GanttMockup SVG structure) |
| provides | AnimatedGantt client component, motion library installed, react-compare-slider installed |
| affects | 04-02 (before/after comparison slider can layer on top), Phase 5 (visual storytelling pattern established) |
| tech-stack.added | motion v12.34.0, react-compare-slider v4.0.0-1 |
| tech-stack.patterns | motion.rect for SVG attribute animation, attrX/attrY for forced SVG attrs, state-driven animation (useState trigger), hex colors for Motion interpolation |
| duration | ~9 minutes |
| completed | 2026-02-09 |

---

## Key Files

### Created
- `src/components/sections/AnimatedGantt.tsx` -- Client component with `"use client"`, 11 animated bars using motion.rect, chaos-to-order choreography with 1s hold and staggered transitions

### Modified
- `src/components/sections/Hero.tsx` -- Swapped GanttMockup import for AnimatedGantt (remains async server component)
- `package.json` -- Added motion and react-compare-slider dependencies
- `package-lock.json` -- Lock file updated

### Unchanged (kept as reference)
- `src/components/sections/GanttMockup.tsx` -- Static SVG fallback, not deleted

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Hex colors instead of oklch for animated bars | Motion library cannot interpolate oklch color values; hex enables smooth color transitions |
| motion.rect with attrX/attrY instead of useAnimate | Motion interprets `x`/`y` as CSS transforms on SVG elements; `attrX`/`attrY` force SVG attribute mode for correct positioning |
| State-driven animation (useState) instead of useAnimate sequence | More reliable for SVG attribute animation; each motion.rect responds to `hasAnimated` state change independently with per-bar stagger delays |
| Keep GanttMockup.tsx | Reference/fallback for future use; can be removed in cleanup pass |
| Conditional rendering for reduced motion | When `shouldReduceMotion` is true, render plain `<rect>` elements (not motion.rect) with optimized positions -- zero JS animation overhead |

---

## Implementation Details

### Animation Choreography
1. **Initial render (server + client):** 11 bars in chaos positions with red/amber/orange colors at opacity 0.7
2. **1 second hold:** `setTimeout` in `useEffect` sets `hasAnimated = true` after 1000ms
3. **Staggered transition:** Each bar animates over 0.8s with easeInOut `[0.25, 0.1, 0.25, 1]`, bars staggered by 80ms (total ~1.8s for all 11)
4. **Final state:** Brand-blue bars in non-overlapping optimized layout at opacity 0.9

### Bar Data
- **CHAOS_BARS:** 11 entries with deliberate overlaps (bars 0+1 on Machine A), resource hogging (bar 2 spans 3.3 days on Machine B), gaps, and tiny tasks
- **OPTIMIZED_BARS:** 11 entries matching the original static GanttMockup positions exactly, using brand-400 through brand-700 hex equivalents

### Accessibility
- `useReducedMotion()` from motion/react checks `prefers-reduced-motion` media query
- When true: renders plain SVG `<rect>` elements in optimized positions (no animation at all)
- `aria-hidden="true"` on SVG (decorative content)

---

## Deviations from Plan

None -- plan executed exactly as written. The oklch-to-hex fallback was anticipated in the plan and hex was used directly since Motion's inability to interpolate oklch is a known limitation.

---

## Verification Results

- [x] `motion` v12.34.0 and `react-compare-slider` v4.0.0-1 installed
- [x] `npm run build` succeeds with zero errors
- [x] AnimatedGantt.tsx has `"use client"` directive
- [x] Hero.tsx imports and renders AnimatedGantt
- [x] Hero.tsx remains a server component (no `"use client"`)
- [x] SVG viewBox is 800x400
- [x] Reduced motion path renders static optimized bars
- [x] Animation: 1s chaos hold, staggered transition to optimized
- [x] SSG output contains correct SVG structure (11 bars, labels, grid)
- [x] No lint errors (only pre-existing warning in GanttMockup.tsx)

---

## Commits

| Hash | Message |
|------|---------|
| d84d555 | chore(04-01): install motion and react-compare-slider packages |
| 2e6297e | feat(04-01): create AnimatedGantt chaos-to-order animation and update Hero |

---

## Next Phase Readiness

**Ready for 04-02:** The react-compare-slider package is already installed. Plan 04-02 can wrap AnimatedGantt in a before/after comparison slider to let users drag between chaos and optimized states interactively.

**No blockers or concerns.**
