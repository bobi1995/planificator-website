# Phase 4: Animated Gantt & Visual Differentiators - Research

**Researched:** 2026-02-09
**Domain:** SVG animation with Motion for React, before/after comparison slider, Core Web Vitals performance, accessibility
**Confidence:** HIGH

## Summary

Phase 4 transforms the static SVG Gantt mockup into a choreographed chaos-to-order animation and adds a before/after metrics comparison slider. The primary animation library is **Motion for React** (the rebranded Framer Motion), version 12.x, installed as `motion` and imported from `"motion/react"`. The before/after slider uses **react-compare-slider** (v4 beta for React 19 support, or a lightweight custom implementation using CSS `clip-path: inset()`).

The core technical challenge is animating SVG `<rect>` elements (position, width, and fill color) through a choreographed sequence using Motion's `useAnimate` hook and animation timeline API. The Gantt SVG already uses computed layout constants (labelWidth, chartLeft, dayWidth, rowHeight), making it straightforward to define "chaos" and "optimized" position sets as data arrays. The before/after comparison slider is a separate section with KPI metric cards revealed by a draggable divider.

All animated components must be client components (`"use client"` directive). The Hero section currently renders a server component (`GanttMockup`), so it needs restructuring: Hero remains a server component for translations, but the animated Gantt becomes a client component child. Performance is addressed through `LazyMotion` + `domAnimation` (reduces Motion's bundle from ~34kb to ~5kb), `next/dynamic` for below-fold components, and ensuring animations use only `transform`/`opacity` where possible. `prefers-reduced-motion` is handled via Motion's built-in `useReducedMotion` hook.

**Primary recommendation:** Install `motion` (npm package), use `useAnimate` for the Gantt timeline sequence, use `whileInView` for the comparison section entrance, and build the comparison slider with `react-compare-slider@beta` (v4 supports React 19) or a custom ~80-line implementation with CSS `clip-path: inset()`.

## Standard Stack

### Core (new for this phase)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | ^12.33.0 | Animation library for React | Official successor to framer-motion. Supports React 19. Hybrid engine (JS + native browser APIs) for 120fps GPU-accelerated animations. Tree-shakeable. |

### Supporting (decision needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-compare-slider | 4.0.0-1 (beta) | Before/after drag slider | If you want a battle-tested, accessible, zero-dependency slider with portrait mode and keyboard support |
| Custom clip-path slider | N/A | Before/after drag slider | If you want zero additional dependencies and full control over the mobile horizontal variant |

### Already Installed (no changes)

| Library | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.563.0 | Icons for KPI metric cards |
| next-intl | ^4.8.2 | Translations for comparison section text |
| tailwindcss | ^4 | Styling |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion (npm) | framer-motion (npm) | framer-motion is the old package name. `motion` is the current official package. Same library, different import path (`motion/react` vs `framer-motion`). Use `motion`. |
| react-compare-slider | Custom implementation | Custom is ~80 lines, zero dependencies, full control. But react-compare-slider handles edge cases (touch events, keyboard a11y, boundary padding, portrait mode). For a marketing site where polish matters, the library is safer. |
| react-compare-slider | img-comparison-slider (web component) | Web component approach has React wrapper friction. react-compare-slider is native React. |
| useAnimate (timeline) | variants + staggerChildren | Variants are great for parent-child orchestration, but the Gantt needs precise per-element control (each bar moves to a specific x/y). useAnimate's timeline API with `at` parameter is the right tool for this. |

**Recommendation:** Use `react-compare-slider@beta` (v4.0.0-1). It supports React 19, has zero dependencies, ~3kb gzipped, handles keyboard/screen reader accessibility, supports portrait mode (needed for mobile horizontal variant), and accepts any React component (not just images) via `itemOne`/`itemTwo` props. The v4 beta uses CSS variables for positioning instead of JS calculations, which is more performant.

**Installation:**
```bash
npm install motion react-compare-slider@beta
```

If the beta introduces issues, fall back to a custom implementation (see Code Examples section).

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    sections/
      AnimatedGantt.tsx       # 'use client' - replaces GanttMockup.tsx
      Hero.tsx                # Server component (unchanged) - renders AnimatedGantt
      ComparisonSection.tsx   # Server component - section wrapper with translations
      ComparisonSlider.tsx    # 'use client' - interactive slider + KPI cards
      MetricCard.tsx          # Client component - individual KPI card
    providers/
      MotionProvider.tsx      # 'use client' - LazyMotion wrapper (optional optimization)
```

### Pattern 1: Client Component Inside Server Component (Hero + AnimatedGantt)

**What:** Hero.tsx remains a server component for translations. The animated Gantt is a separate client component rendered as a child.

**When to use:** When you need server-side translations but client-side interactivity in the same section.

**Example:**
```typescript
// src/components/sections/Hero.tsx (server component - mostly unchanged)
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {AnimatedGantt} from '@/components/sections/AnimatedGantt';

export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="min-h-dvh flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column (unchanged) */}
          <div className="text-center lg:text-left">
            <h1 className="text-heading md:text-display lg:text-hero">{t('headline')}</h1>
            {/* ... buttons ... */}
          </div>

          {/* Visual column - animated Gantt replaces static mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none rounded-xl border bg-card shadow-lg overflow-hidden">
              <AnimatedGantt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Pattern 2: useAnimate Timeline for Choreographed SVG Animation

**What:** The `useAnimate` hook provides a scoped `animate` function that accepts an array of animation segments (a timeline). Each segment targets an element (by CSS selector or ref) and specifies the animation. The `at` parameter controls timing.

**When to use:** When you need precise control over when each element animates, not just parent-child cascading.

**Example:**
```typescript
// Conceptual pattern for the Gantt animation
'use client';

import {useAnimate, useReducedMotion} from 'motion/react';
import {useEffect} from 'react';

export function AnimatedGantt() {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return; // Show final state directly

    // Timeline sequence
    const sequence = [
      // Phase 1: Hold chaos state (1 second)
      // (bars start in chaos positions via initial render)

      // Phase 2: Slide bars to optimized positions + color shift
      ['.bar-0', {attrX: optimizedX0, width: optimizedW0, fill: 'var(--color-brand-600)'}, {duration: 0.8, at: 1}],
      ['.bar-1', {attrX: optimizedX1, width: optimizedW1, fill: 'var(--color-brand-400)'}, {duration: 0.8, at: 1.1}],
      ['.bar-2', {attrX: optimizedX2, width: optimizedW2, fill: 'var(--color-brand-500)'}, {duration: 0.8, at: 1.2}],
      // ... all 11 bars with staggered start times
    ];

    animate(sequence);
  }, [animate, shouldReduceMotion]);

  return (
    <svg ref={scope} viewBox="0 0 800 400" aria-hidden="true">
      {/* Render bars in chaos positions initially */}
      {/* Each bar has a className like "bar-0", "bar-1", etc. */}
    </svg>
  );
}
```

**Key details about `at` parameter:**
- Absolute time: `at: 1` means start at 1 second from animation begin
- Relative time: `at: "+0.1"` means start 0.1s after previous segment ends
- Simultaneous: `at: "<"` means start at same time as previous segment

### Pattern 3: whileInView for Scroll-Triggered Section Entrance

**What:** The `whileInView` prop triggers animation when the element scrolls into the viewport. With `viewport: { once: true }`, it plays once and stays.

**When to use:** For below-fold sections that should animate in on first scroll.

**Example:**
```typescript
'use client';

import {motion} from 'motion/react';

export function ComparisonSlider() {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.6, ease: 'easeOut'}}
    >
      {/* Comparison slider content */}
    </motion.div>
  );
}
```

### Pattern 4: LazyMotion for Bundle Size Optimization

**What:** Replace `motion.div` with `m.div` and wrap with `LazyMotion` to reduce initial bundle from ~34kb to ~5kb.

**When to use:** Always for production sites where bundle size matters.

**Example:**
```typescript
'use client';

import {LazyMotion, domAnimation, m} from 'motion/react';

export function MotionProvider({children}: {children: React.ReactNode}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// In animated components, use m.div instead of motion.div
// Note: useAnimate works with both motion and LazyMotion
```

**Important:** `LazyMotion` with `domAnimation` provides: animations, variants, exit animations, scroll-triggered animations, and `whileInView`. It does NOT include: drag gesture, layout animations, or `AnimatePresence` (use `domMax` for those). For this phase, `domAnimation` is sufficient.

**Note on useAnimate:** The `useAnimate` hook works independently of LazyMotion/motion component choice. It uses the imperative `animate()` function which is always available. However, for declarative `whileInView` on `m.div`, you need `LazyMotion` with `domAnimation`.

### Pattern 5: Reduced Motion Accessibility

**What:** Motion provides `useReducedMotion()` hook that returns `true` when `prefers-reduced-motion: reduce` is set. Skip all animations and show final states directly.

**When to use:** Always. This is a hard requirement from CONTEXT.md.

**Example:**
```typescript
'use client';

import {useReducedMotion} from 'motion/react';

export function AnimatedGantt() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Render the final optimized state directly (same as current static GanttMockup)
    return <StaticGantt bars={optimizedBars} />;
  }

  // Render animated version
  return <AnimatedGanttInner />;
}
```

### Pattern 6: Data-Driven Bar Positions (Chaos vs Optimized)

**What:** Define two arrays of bar position data -- one for chaos state, one for optimized state. Both use the same computed layout constants (labelWidth, chartLeft, dayWidth, rowHeight) from the existing GanttMockup. The animation interpolates between them.

**When to use:** For any animation that transitions between two known states.

**Example:**
```typescript
// Shared layout constants (same as current GanttMockup)
const labelWidth = 90;
const chartLeft = labelWidth;
const chartWidth = 800 - labelWidth; // 710
const dayWidth = chartWidth / 5; // 142
const headerHeight = 40;
const rowHeight = 60;

// Bar definition: [rowIndex, startDay, endDay, colorVar]
type BarDef = [number, number, number, string];

// Chaos state: overlapping, gaps, red/amber/orange colors
const chaosBars: BarDef[] = [
  [0, 0.0, 2.0, '#ef4444'],   // red-500, overlaps with next
  [0, 1.2, 2.8, '#f97316'],   // orange-500, overlapping!
  [1, 0.5, 3.5, '#f59e0b'],   // amber-500
  // ... 11 bars total with overlaps and gaps
];

// Optimized state: clean, non-overlapping, brand blue colors
// (exactly matching current static GanttMockup positions)
const optimizedBars: BarDef[] = [
  [0, 0.0, 1.4, 'var(--color-brand-600)'],
  [0, 1.7, 3.0, 'var(--color-brand-400)'],
  [1, 0.3, 3.3, 'var(--color-brand-500)'],
  // ... same 11 bars as current GanttMockup.tsx
];
```

### Anti-Patterns to Avoid

- **Animating SVG x/y via CSS transform instead of SVG attributes:** SVG `<rect>` elements position with `x`/`y` attributes, not CSS `left`/`top`. Use Motion's `attrX`/`attrY` for SVG attribute animation, or animate the `x` attribute directly. Do NOT try to use `transform: translate()` on individual SVG rects -- it works differently than HTML elements and the transform origin may surprise you.
- **Making Hero.tsx a client component:** Hero uses `getTranslations` (server-only). Keep it as a server component. The animated Gantt is a separate client component child.
- **Using motion.rect inside an SVG without proper scope:** When using `useAnimate`, the scope ref goes on the `<svg>` element, and you target child rects via CSS class selectors (`.bar-0`, `.bar-1`, etc.).
- **Animating layout-triggering properties:** Do NOT animate `width`/`height` on HTML elements for the comparison section. Use `transform`/`opacity` for entrance animations. SVG is different -- `width`/`x`/`y` on SVG elements do not trigger HTML layout reflow.
- **Importing `motion` in server components:** Motion components and hooks require `"use client"`. Never import from `motion/react` in a server component file.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG animation library | Custom requestAnimationFrame loop | Motion `useAnimate` | Handles easing, interruption, cleanup, GPU acceleration, reduced motion |
| Before/after slider | Custom pointer event + clip-path from scratch | react-compare-slider v4 OR copy a proven ~80-line pattern | Touch events, keyboard navigation, boundary handling, portrait mode, ARIA labels -- lots of edge cases |
| Reduced motion detection | Custom `matchMedia('(prefers-reduced-motion: reduce)')` listener | Motion's `useReducedMotion()` hook | Handles SSR, subscription cleanup, reactive updates |
| Scroll-triggered animation | Custom IntersectionObserver | Motion's `whileInView` prop | Built-in, handles cleanup, configurable threshold via `viewport.amount` |
| Animation timeline/sequencing | Custom Promise chains or setTimeout | Motion's `animate()` sequence API with `at` | Handles interruption, cleanup, easing per segment, scoped selectors |

**Key insight:** Motion's `useAnimate` hook provides a complete timeline/sequence API that replaces what would be hundreds of lines of custom animation code. The `at` parameter on each segment provides precise timing control without manual delay calculations.

## Common Pitfalls

### Pitfall 1: SVG Attribute Animation vs CSS Property Animation

**What goes wrong:** Trying to animate SVG rect `x`, `y`, `width` attributes using CSS-style animation (e.g., `animate({x: 100})`) which Motion interprets as CSS `transform: translateX(100px)` instead of the SVG `x` attribute.
**Why it happens:** Motion treats `x` and `y` as CSS transforms by default. SVG elements use `x`/`y` as presentation attributes, not CSS transforms.
**How to avoid:** Use `attrX` and `attrY` when animating SVG positional attributes with Motion. For `width` and `height`, these should work directly as they are treated as SVG attributes. Alternatively, render bars using the `<motion.rect>` component with `initial` and `animate` props where the attribute names are explicit.
**Warning signs:** Bars appear to move from their container origin instead of from their current position; bars move in unexpected directions.

### Pitfall 2: Client Component Boundary in Hero Section

**What goes wrong:** Adding `"use client"` to Hero.tsx to support the animated Gantt breaks `getTranslations` (server-only API).
**Why it happens:** `getTranslations` from `next-intl/server` is an async server function. Client components cannot call server-only functions.
**How to avoid:** Keep Hero.tsx as a server component. Extract the animated Gantt into its own `"use client"` component file. Import and render it inside the server component Hero.
**Warning signs:** Build error: "getTranslations is not a function" or "Cannot use server-only APIs in client components".

### Pitfall 3: Motion Bundle Size Bloat

**What goes wrong:** Importing `motion` from `"motion/react"` adds ~34kb (minified) to the client bundle, degrading LCP.
**Why it happens:** The `motion` component's declarative API makes it impossible for bundlers to tree-shake smaller.
**How to avoid:** Use `LazyMotion` + `domAnimation` + `m` component. This brings the initial load to ~5kb. For the Gantt animation using `useAnimate`, the hook itself is much smaller (~2-17kb depending on usage).
**Warning signs:** Lighthouse reports a large JavaScript bundle; LCP exceeds 2.5s threshold.

### Pitfall 4: CLS from Comparison Section Loading

**What goes wrong:** The comparison section causes Cumulative Layout Shift when it loads below the fold, especially if lazy-loaded.
**Why it happens:** If the section has no reserved height before hydration, content below it shifts when it renders.
**How to avoid:** Give the comparison section container a fixed `min-height` via CSS (e.g., `min-h-[400px] md:min-h-[500px]`). This reserves space even before the client component hydrates.
**Warning signs:** CLS score exceeds 0.1; visible content jumping when scrolling down.

### Pitfall 5: Animation Playing Before Component is Visible (SSR Flash)

**What goes wrong:** The chaos state briefly renders server-side, then the animation plays, causing a visual flash.
**Why it happens:** The server renders the initial state (chaos), then hydration triggers the animation. On fast connections, users see the chaos state flicker.
**How to avoid:** For the Gantt (above the fold, autoplay): start in chaos state and begin animation in `useEffect` -- the visual transition IS the intended behavior. For the comparison section (below the fold): use `whileInView` so the animation only plays when scrolled into view.
**Warning signs:** Users on fast connections see a brief flash of the chaos state before animation begins. This is actually fine for the Gantt -- the 1-second hold on chaos IS the design intent.

### Pitfall 6: react-compare-slider v4 Beta Stability

**What goes wrong:** The v4 beta has breaking changes from v3 and may have unresolved bugs.
**Why it happens:** It is a beta release.
**How to avoid:** Pin the exact version (`4.0.0-1`). Test thoroughly. Have a fallback plan: a custom slider implementation using CSS `clip-path: inset()` is ~80 lines and covers the core use case. The v4 API is cleaner (context-based, CSS variable positioning) but if issues arise, the custom approach is viable.
**Warning signs:** Unexpected behavior on mobile touch events; slider position jumps.

### Pitfall 7: SVG Fill Color Animation with CSS Variables

**What goes wrong:** Animating `fill` from a hex color (`#ef4444`) to a CSS variable (`var(--color-brand-600)`) may not interpolate smoothly because Motion cannot parse CSS variables at animation time.
**Why it happens:** CSS variables are resolved by the browser, not by JavaScript. Motion needs numeric color values to interpolate between them.
**How to avoid:** Use resolved color values for both chaos and optimized states. Either use hex/rgb/hsl literals for both states, or resolve the CSS variable values to oklch/hex values at build time. The brand colors are defined in `globals.css` as oklch values -- use those directly.
**Warning signs:** Fill color snaps from red to blue instead of smoothly transitioning; console warnings about invalid color values.

## Code Examples

### Animated Gantt - Complete Structure

```typescript
// src/components/sections/AnimatedGantt.tsx
'use client';

import {useAnimate, useReducedMotion} from 'motion/react';
import {useEffect, useCallback} from 'react';
import {cn} from '@/lib/utils';

// Layout constants (same as original GanttMockup)
const LABEL_WIDTH = 90;
const CHART_LEFT = LABEL_WIDTH;
const CHART_WIDTH = 800 - LABEL_WIDTH; // 710
const DAY_WIDTH = CHART_WIDTH / 5; // 142
const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 60;
const BAR_PADDING = 14;
const BAR_HEIGHT = ROW_HEIGHT - 28; // 32

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const RESOURCES = ['Machine A', 'Machine B', 'Machine C', 'Line 1', 'Line 2', 'Line 3'];

// Bar: [rowIndex, startDay, endDay, fillColor]
type BarDef = [number, number, number, string];

// Chaos state (overlaps, gaps, warm/red colors)
const CHAOS_BARS: BarDef[] = [
  [0, 0.0, 2.0, '#ef4444'],   // overlaps with next bar
  [0, 1.2, 2.8, '#f97316'],   // overlapping!
  [1, 0.5, 3.8, '#f59e0b'],   // too long, hogs resource
  [2, 2.0, 4.2, '#ef4444'],   // gap before this bar
  [2, 0.2, 1.0, '#fb923c'],   // small task, big gap after
  [3, 0.0, 1.5, '#f97316'],
  [3, 3.0, 5.0, '#f59e0b'],   // gap in middle
  [4, 0.0, 0.8, '#ef4444'],   // tiny task
  [4, 2.5, 4.8, '#fb923c'],   // big gap before
  [5, 0.5, 2.0, '#f59e0b'],
  [5, 2.2, 3.0, '#ef4444'],   // small leftover
];

// Optimized state (matches current static GanttMockup exactly)
const OPTIMIZED_BARS: BarDef[] = [
  [0, 0.0, 1.4, 'oklch(0.546 0.245 262.881)'],  // brand-600
  [0, 1.7, 3.0, 'oklch(0.707 0.165 254.624)'],  // brand-400
  [1, 0.3, 3.3, 'oklch(0.623 0.214 259.815)'],  // brand-500
  [2, 0.8, 2.2, 'oklch(0.488 0.243 264.376)'],  // brand-700
  [2, 2.6, 4.0, 'oklch(0.707 0.165 254.624)'],  // brand-400
  [3, 0.0, 2.0, 'oklch(0.546 0.245 262.881)'],  // brand-600
  [3, 2.5, 4.5, 'oklch(0.623 0.214 259.815)'],  // brand-500
  [4, 0.5, 1.5, 'oklch(0.623 0.214 259.815)'],  // brand-500
  [4, 1.9, 4.5, 'oklch(0.488 0.243 264.376)'],  // brand-700
  [5, 1.2, 3.7, 'oklch(0.707 0.165 254.624)'],  // brand-400
  [5, 3.9, 5.0, 'oklch(0.546 0.245 262.881)'],  // brand-600
];

function barX(startDay: number) { return CHART_LEFT + startDay * DAY_WIDTH; }
function barW(startDay: number, endDay: number) { return (endDay - startDay) * DAY_WIDTH; }
function barY(row: number) { return HEADER_HEIGHT + row * ROW_HEIGHT + BAR_PADDING; }

interface AnimatedGanttProps {
  className?: string;
}

export function AnimatedGantt({className}: AnimatedGanttProps) {
  const shouldReduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate();

  const runAnimation = useCallback(async () => {
    if (shouldReduceMotion) return;

    // Build sequence: after 1s hold, animate each bar to optimized position
    const sequence: any[] = [];
    OPTIMIZED_BARS.forEach((optimized, i) => {
      const [row, startDay, endDay, fill] = optimized;
      sequence.push([
        `.bar-${i}`,
        {
          x: barX(startDay),
          width: barW(startDay, endDay),
          y: barY(row),
          fill: fill,
          opacity: 0.9,
        },
        {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1], // easeInOut
          at: 1 + i * 0.08, // stagger by 80ms
        },
      ]);
    });

    await animate(sequence);
  }, [animate, shouldReduceMotion]);

  useEffect(() => {
    runAnimation();
  }, [runAnimation]);

  // Choose which bars to render initially
  const initialBars = shouldReduceMotion ? OPTIMIZED_BARS : CHAOS_BARS;

  return (
    <svg
      ref={scope}
      viewBox="0 0 800 400"
      className={cn('w-full h-auto', className)}
      role="img"
      aria-hidden="true"
    >
      {/* Background, grid lines, labels (same as current GanttMockup) */}
      {/* ... static SVG elements ... */}

      {/* Animated bars */}
      {initialBars.map(([row, startDay, endDay, fill], i) => (
        <rect
          key={`bar-${i}`}
          className={`bar-${i}`}
          x={barX(startDay)}
          y={barY(row)}
          width={barW(startDay, endDay)}
          height={BAR_HEIGHT}
          rx="6"
          ry="6"
          fill={fill}
          opacity={shouldReduceMotion ? 0.9 : 0.7}
        />
      ))}
    </svg>
  );
}
```

**Important implementation notes:**
- The `useAnimate` `animate()` function targets elements using CSS class selectors scoped to the `ref` element
- SVG `x`, `y`, `width` are animated as direct properties (Motion handles SVG attribute animation)
- Colors must be in a format Motion can interpolate (hex, rgb, hsl, oklch) -- NOT CSS `var()` references
- Chaos bars start with `opacity: 0.7` (semi-transparent as per CONTEXT.md), optimized end at `0.9`

### Before/After Comparison Slider with react-compare-slider

```typescript
// src/components/sections/ComparisonSlider.tsx
'use client';

import {ReactCompareSlider, ReactCompareSliderHandle} from 'react-compare-slider';
import {motion} from 'motion/react';
import {useReducedMotion} from 'motion/react';
import {MetricCard} from './MetricCard';

interface ComparisonSliderProps {
  beforeLabel: string;
  afterLabel: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    icon: React.ReactNode;
  }[];
}

export function ComparisonSlider({beforeLabel, afterLabel, metrics}: ComparisonSliderProps) {
  const shouldReduceMotion = useReducedMotion();

  const beforeContent = (
    <div className="p-6 md:p-8 bg-muted/50 h-full">
      <h3 className="text-label text-muted-foreground uppercase tracking-wider mb-6">
        {beforeLabel}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            value={m.before}
            label={m.label}
            icon={m.icon}
            variant="before"
          />
        ))}
      </div>
    </div>
  );

  const afterContent = (
    <div className="p-6 md:p-8 bg-background h-full">
      <h3 className="text-label text-brand-600 uppercase tracking-wider mb-6">
        {afterLabel}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            value={m.after}
            label={m.label}
            icon={m.icon}
            variant="after"
          />
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? false : {opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.6}}
    >
      {/* Desktop: landscape (vertical divider), Mobile: portrait (horizontal divider) */}
      <div className="hidden md:block">
        <ReactCompareSlider
          itemOne={beforeContent}
          itemTwo={afterContent}
          defaultPosition={50}
        />
      </div>
      <div className="block md:hidden">
        <ReactCompareSlider
          itemOne={beforeContent}
          itemTwo={afterContent}
          portrait
          defaultPosition={50}
        />
      </div>
    </motion.div>
  );
}
```

### Custom Comparison Slider Fallback (if react-compare-slider has issues)

```typescript
// Lightweight custom slider using CSS clip-path: inset()
// ~80 lines, zero dependencies beyond React
'use client';

import {useRef, useState, useCallback} from 'react';

interface CustomSliderProps {
  itemOne: React.ReactNode;
  itemTwo: React.ReactNode;
  portrait?: boolean;
}

export function CustomSlider({itemOne, itemTwo, portrait = false}: CustomSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = portrait
      ? ((clientY - rect.top) / rect.height) * 100
      : ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pos)));
  }, [portrait]);

  const handlePointerDown = useCallback(() => setIsDragging(true), []);
  const handlePointerUp = useCallback(() => setIsDragging(false), []);
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX, e.clientY);
  }, [isDragging, updatePosition]);

  const clipPath = portrait
    ? `inset(0 0 ${100 - position}% 0)`
    : `inset(0 ${100 - position}% 0 0)`;

  return (
    <div
      ref={containerRef}
      className="relative select-none touch-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Item Two (background, full size) */}
      <div>{itemTwo}</div>

      {/* Item One (foreground, clipped) */}
      <div className="absolute inset-0" style={{clipPath}}>
        {itemOne}
      </div>

      {/* Drag handle */}
      <div
        className="absolute z-10 cursor-grab active:cursor-grabbing"
        style={portrait
          ? {top: `${position}%`, left: 0, right: 0, height: 4, transform: 'translateY(-50%)'}
          : {left: `${position}%`, top: 0, bottom: 0, width: 4, transform: 'translateX(-50%)'}
        }
        onPointerDown={handlePointerDown}
      >
        <div className={cn(
          'bg-brand-600 rounded-full',
          portrait ? 'h-1 w-full' : 'w-1 h-full'
        )} />
      </div>
    </div>
  );
}
```

### MetricCard Component

```typescript
// src/components/sections/MetricCard.tsx
import {cn} from '@/lib/utils';

interface MetricCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  variant: 'before' | 'after';
}

export function MetricCard({value, label, icon, variant}: MetricCardProps) {
  return (
    <div className={cn(
      'rounded-lg border p-4 text-center',
      variant === 'before'
        ? 'bg-red-50 border-red-200'
        : 'bg-brand-50 border-brand-200'
    )}>
      <div className={cn(
        'mx-auto mb-2 w-8 h-8',
        variant === 'before' ? 'text-red-400' : 'text-brand-600'
      )}>
        {icon}
      </div>
      <div className={cn(
        'text-2xl md:text-3xl font-bold',
        variant === 'before' ? 'text-red-600' : 'text-brand-700'
      )}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
```

### Translation Structure

```json
{
  "Comparison": {
    "sectionHeading": "See the Difference",
    "sectionSubtext": "See how AI scheduling transforms your production planning",
    "beforeLabel": "Manual Scheduling",
    "afterLabel": "With Planifactor",
    "resourceUtilization": "Resource Utilization",
    "onTimeDelivery": "On-Time Delivery",
    "schedulingTime": "Scheduling Time",
    "idleTime": "Idle Time"
  }
}
```

### next/dynamic for Below-Fold Lazy Loading

```typescript
// In page.tsx, lazy-load the comparison section
import dynamic from 'next/dynamic';

const ComparisonSection = dynamic(
  () => import('@/components/sections/ComparisonSection').then(mod => mod.ComparisonSection),
  {
    loading: () => <div className="min-h-[400px]" />, // Reserve space to prevent CLS
    ssr: true, // Keep SSR for SEO; client components still hydrate
  }
);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` npm package | `motion` npm package | Feb 2025 (rebrand) | Import path changed from `"framer-motion"` to `"motion/react"`. Same library, new name. |
| `useAnimation` + `controls.start()` | `useAnimate` + `animate()` sequence | Motion v10+ | useAnimate provides timeline API, scoped selectors, auto-cleanup. Much more powerful for choreography. |
| `onViewportEnter` callback | `whileInView` prop | Framer Motion v7+ | Declarative, simpler API for scroll-triggered animations. |
| Manual IntersectionObserver | `useInView` hook (0.5kb) | Motion v10+ | Built-in hook, handles cleanup, configurable threshold. |
| Full `motion` import (~34kb) | `LazyMotion` + `m` + `domAnimation` (~5kb) | Framer Motion v4+ | Significant bundle reduction for production sites. |
| `react-compare-slider` v3 (`forwardRef`) | v4 (no `forwardRef`, CSS variables, hooks) | Jan 2025 beta | React 19 compatible, better performance, context-based API. |

**Deprecated/outdated:**
- `framer-motion` npm package: Use `motion` instead. The `framer-motion` package still works but is the legacy name.
- `useAnimation` hook: Replaced by `useAnimate` which has a more powerful API (timeline sequences, scoped selectors).
- `AnimatePresence` for scroll reveal: `whileInView` is simpler and more performant for most scroll-triggered use cases.

## Open Questions

1. **SVG attribute animation with useAnimate selector API**
   - What we know: `useAnimate` uses CSS selectors (`.bar-0`) to target elements within the scoped ref. Motion supports animating SVG attributes via `attrX`/`attrY`. The `animate()` function accepts SVG attribute targets.
   - What's unclear: Whether the selector-based `animate()` (from `useAnimate`) correctly handles SVG attribute names like `x`, `width`, and `fill` on `<rect>` elements, or whether they need to be prefixed with `attr`. The docs show `attrX`/`attrY` for `<motion.rect>` props but the behavior with imperative `animate()` targeting plain `<rect>` may differ.
   - Recommendation: Test both approaches during implementation. If `animate('.bar-0', {x: 100, width: 200})` does not work on SVG rects, try `animate('.bar-0', {attrX: 100})` or switch to rendering `<motion.rect>` components with `animate` prop instead of using the imperative API.

2. **oklch Color Interpolation in Motion**
   - What we know: The brand colors are defined in oklch format. Motion can interpolate hex, rgb, and hsl colors.
   - What's unclear: Whether Motion v12 supports oklch color interpolation natively, or if it needs hex equivalents.
   - Recommendation: Test oklch first. If interpolation fails (snaps instead of gradual transition), convert chaos bar colors (red/amber/orange) to hex AND convert brand colors to hex for the animation targets. The CSS variables can still use oklch for static rendering.

3. **react-compare-slider v4 Beta Stability with React 19.2**
   - What we know: v4.0.0-1 (Jan 2025 beta) removes `forwardRef` for React 19 compatibility. The project uses React 19.2.3.
   - What's unclear: Whether the beta has been tested against React 19.2.x specifically. Only one beta release exists.
   - Recommendation: Install and test. If any issues arise, implement the custom slider fallback (~80 lines). The custom approach handles the core use case (drag divider, clip-path reveal) and can be enhanced incrementally.

4. **KPI Cards Desktop Layout**
   - What we know: CONTEXT.md says mobile is 2x2 grid. Desktop is "4 across or 2x2 -- researcher/planner decides."
   - Recommendation: Use 4 columns on desktop (`grid-cols-4`) for maximum visual impact when the slider reveals all 4 KPIs side by side. On mobile (`<md`), use 2x2 (`grid-cols-2`).

## Sources

### Primary (HIGH confidence)
- [Motion for React installation](https://motion.dev/docs/react-installation) - Package name `motion`, import from `"motion/react"`
- [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) - Migration from framer-motion to motion
- [Motion reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size) - LazyMotion, domAnimation, m component, size numbers
- [Motion useAnimate docs](https://motion.dev/docs/react-use-animate) - Scoped animate, timeline sequences, `at` parameter
- [Motion SVG animation](https://motion.dev/docs/react-svg-animation) - SVG-specific animation: attrX, attrY, fill, pathLength
- [Motion whileInView](https://motion.dev/docs/react-scroll-animations) - Scroll-triggered animations, viewport options
- [Motion useReducedMotion](https://motion.dev/docs/react-use-reduced-motion) - Accessibility hook for reduced motion
- [Motion accessibility](https://motion.dev/docs/react-accessibility) - reducedMotion on MotionConfig
- [react-compare-slider GitHub](https://github.com/nerdyman/react-compare-slider) - v4 beta release notes, React 19 compat, API props
- [motion npm](https://www.npmjs.com/package/motion) - Latest version 12.33.0
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) - Legacy package, 12.33.0

### Secondary (MEDIUM confidence)
- [Motion stagger function](https://motion.dev/docs/stagger) - Stagger delay utility for multiple animations
- [Motion variants tutorial](https://motion.dev/tutorials/react-variants) - Variants propagation and orchestration
- [Croct blog: React comparison sliders 2026](https://blog.croct.com/post/best-react-before-after-image-comparison-slider-libraries) - Library comparison
- [react-compare-slider releases](https://github.com/nerdyman/react-compare-slider/releases) - v4.0.0-1 release details, React 19 note
- [Josh Comeau: prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/) - Accessible animation patterns

### Tertiary (LOW confidence)
- SVG `x`/`width` animation via `useAnimate` selector API: Based on general Motion docs about SVG support + training data. Needs hands-on validation during implementation.
- oklch color interpolation in Motion: Not confirmed in official docs. Needs testing.
- react-compare-slider v4 stability with React 19.2.3: Single beta release, untested with this exact React version.

## Metadata

**Confidence breakdown:**
- Standard stack (Motion): HIGH - Official package, well-documented, React 19 tested in CI
- Animation patterns (useAnimate, whileInView): HIGH - Well-documented in official Motion docs
- SVG-specific animation details: MEDIUM - Documented conceptually, but imperative SVG attribute animation via selector API needs validation
- Before/after slider approach: MEDIUM - react-compare-slider is established, but v4 beta + React 19.2 combination is untested
- Performance optimization (LazyMotion): HIGH - Official recommendation with documented size numbers
- Accessibility (useReducedMotion): HIGH - Built-in hook, well-documented
- Color interpolation (oklch): LOW - Unverified; may need hex fallbacks

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (Motion is stable; react-compare-slider v4 may exit beta in this window)
