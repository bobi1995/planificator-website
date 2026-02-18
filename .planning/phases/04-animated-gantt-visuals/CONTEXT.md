# Phase 4 Context — Animated Gantt & Visual Differentiators

> Decisions gathered through discussion on 2026-02-09. These are **locked** — downstream agents should not re-ask these questions.

---

## 1. Animated Gantt Chart — Story & Choreography

**Narrative:** Chaos-to-order. The animation tells the story of AI optimization by starting with a messy, manual schedule and transforming it into a clean, optimized Gantt chart.

**Chaos state (before):**
- Bars overlap each other (semi-transparent, red/amber/orange tints)
- Visible empty gaps between some tasks on certain resources
- Looks like a bad manual schedule — recognizable to manufacturing decision-makers

**Optimized state (after):**
- Clean, non-overlapping bars in brand blue color palette (brand-400 through brand-700)
- Same layout as the current static `GanttMockup` component — 6 resource rows, 11 task bars
- No gaps, no overlaps, balanced load across the week

**Transition:**
- 1-second hold on the chaos state (so visitors register the "before")
- Smooth slide transitions — bars glide from chaotic positions to optimized positions
- Color shift during transition: red/amber/orange bars → brand blue bars
- Total animation duration: 4-5 seconds (including the 1s hold)
- No text overlays — pure visual storytelling

**Placement:**
- **Replaces** the current static `GanttMockup` in the Hero section's right column
- The existing `GanttMockup.tsx` component will be replaced/refactored into an animated version
- Same container: `rounded-xl border bg-card shadow-lg overflow-hidden`

**Looping:** Plays once, then holds the final optimized state permanently. No loop, no replay button.

---

## 2. Before/After Comparison — Metrics Dashboard

**Format:** Drag slider with a draggable vertical divider. Left side reveals "before" state, right side reveals "after" state.

**Content:** Business impact metrics dashboard (NOT a second Gantt — the animated Gantt already covers the schedule visual).

**KPIs (4 cards):**

| Metric | Before (Manual) | After (Planifactor) |
|--------|-----------------|---------------------|
| Resource Utilization | 62% | 90% |
| On-Time Delivery | 74% | 96% |
| Scheduling Time | 4 hours | 15 minutes |
| Idle Time | 28% | 8% |

These are illustrative/marketing numbers, not real customer data.

**Visual style:** Card grid with big numbers. Each card shows:
- Large prominent number
- Metric label
- Subtle icon
- Color: red/muted tones on "before" side → green/brand tones on "after" side

**Labels:** Short headers only above each side:
- Left: "Manual Scheduling" (EN) / translated equivalent (BG)
- Right: "With Planifactor" (EN) / translated equivalent (BG)

**Placement:** Own dedicated section below the Hero, before Feature Highlights. Section heading like "See the Difference" (translated).

---

## 3. Animation Trigger Behavior

**Gantt animation (Hero — above the fold):**
- Autoplay immediately on page load
- No delay, no scroll trigger needed (it's already visible)
- Plays once → holds final optimized state

**Before/After slider (below the fold):**
- Entrance animation plays when the section scrolls into viewport
- After entrance animation completes, the slider becomes fully interactive (user can drag)
- The slider itself is always draggable once visible

**`prefers-reduced-motion` accessibility:**
- If `prefers-reduced-motion: reduce` is set, skip ALL animations
- Show the final optimized Gantt chart as a static state (equivalent to current GanttMockup)
- Show the "after" dashboard state directly with no entrance animation
- Slider remains interactive regardless of motion preference

---

## 4. Mobile Adaptation

**Breakpoint:** `md` (768px) — matches existing site breakpoint patterns.

**Gantt animation on mobile (<768px):**
- Same animation with all 6 rows and all bars — just scaled down within the container
- SVG viewBox stays the same (800x400), container width shrinks
- The chaos-to-order animation still plays in full
- No row reduction or simplification needed

**Before/After slider on mobile (<768px):**
- Switches from vertical divider (left/right) to horizontal divider (top/bottom)
- "Before" on top, "After" on bottom
- User drags the horizontal divider up/down to reveal

**KPI cards on mobile (<768px):**
- 2x2 grid layout (2 columns, 2 rows)
- Full desktop layout uses wider arrangement (4 across or 2x2 — researcher/planner decides)

---

## Deferred Ideas

None raised during discussion.

---

## Existing Assets to Build On

- `src/components/sections/GanttMockup.tsx` — Static SVG Gantt (will be replaced/refactored)
- `src/components/sections/Hero.tsx` — Currently renders static GanttMockup in right column
- Brand color variables: `--color-brand-50` through `--color-brand-950` in `globals.css`
- Framer Motion listed in tech stack (CLAUDE.md) but not yet installed

## Translation Needs

New translation namespace(s) needed for:
- Before/After section heading ("See the Difference" or similar)
- Slider labels: "Manual Scheduling" / "With Planifactor"
- KPI metric names: "Resource Utilization", "On-Time Delivery", "Scheduling Time", "Idle Time"
- Both EN and BG locale files

---
*Created: 2026-02-09 via /gsd:discuss-phase 4*
