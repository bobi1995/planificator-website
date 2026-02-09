# Phase 2: Brand Identity & Design System - Research

**Researched:** 2026-02-09
**Domain:** CSS design tokens, Tailwind v4 theming, shadcn/ui customization, SVG logo components, responsive typography
**Confidence:** HIGH

## Summary

This phase requires renaming all "Prefactor" references to "Planifactor," then building a complete design system: a monochrome blue color palette in OKLCH, Inter typography scale, custom shadcn/ui theme overrides, an SVG logo component, and responsive verification at three breakpoints.

The technical approach is straightforward because the existing codebase already uses Tailwind v4 CSS-first configuration (`@theme inline` in `globals.css`), shadcn/ui with OKLCH CSS variables, and Inter font with a `--font-inter` CSS variable. The work is primarily about replacing the default neutral shadcn theme with a blue brand palette and adding typography/spacing design tokens.

Key finding: shadcn/ui's CSS variable system maps perfectly to this use case. The `:root` block defines raw OKLCH values, the `@theme inline` block registers them as Tailwind utilities, and all shadcn components automatically consume the updated variables. No component code changes are needed for the color rebrand -- only CSS variable updates.

**Primary recommendation:** Use Tailwind v4's built-in blue color palette (OKLCH values) as the foundation for the Planifactor brand palette, mapping blue-600 as `--primary`. Override shadcn's neutral defaults in `:root` with blue-derived OKLCH values. Define all design tokens exclusively in `globals.css` via `@theme inline` and `:root`.

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | ^4 | Design token system, utility classes | CSS-first config with `@theme` directive for token definition |
| shadcn/ui | ^3.8.4 | Component library consuming CSS variables | Uses OKLCH CSS variables, auto-consumes `:root` overrides |
| next/font/google (Inter) | Next.js 16.1.6 built-in | Font loading with `--font-inter` variable | Self-hosted, variable font, Latin + Cyrillic subsets |
| Lucide React | ^0.563.0 | Icon library (already installed) | Used by shadcn components |

### Supporting (No New Dependencies Needed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| class-variance-authority | ^0.7.1 (installed) | Logo component variants | Size/variant props for logo |
| clsx + tailwind-merge | installed | Class merging | Conditional class application |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-crafted OKLCH blue palette | Tailwind v4 default blue palette | Default blue palette is already perceptually uniform in OKLCH; use it directly rather than creating custom values from scratch |
| SVGR package for SVG imports | Inline SVG React component | No build tool config needed; logo is one component, not an icon library |
| Fluid typography plugin | Responsive utility classes (text-base md:text-lg) | Standard Tailwind breakpoint approach is simpler; fluid/clamp adds complexity without clear benefit for a marketing site with 3 breakpoints |

**Installation:** No new packages needed. Everything is already installed.

## Architecture Patterns

### Recommended File Structure

```
src/
  app/
    globals.css              # ALL design tokens: :root vars + @theme inline
    icon.svg                 # SVG favicon (Next.js auto-detects)
    apple-icon.png           # Apple touch icon (180x180)
  components/
    brand/
      Logo.tsx               # SVG logo React component with size/variant props
      Logo.test.tsx          # Optional: logo render tests
    ui/
      button.tsx             # Existing shadcn component (auto-themed)
  lib/
    utils.ts                 # Existing cn() helper
messages/
  en.json                    # Updated: Prefactor -> Planifactor
  bg.json                    # Updated: Prefactor -> Planifactor
CLAUDE.md                    # Updated: Prefactor -> Planifactor
```

### Pattern 1: Design Token Architecture (Two-Layer System)

**What:** Split token definition into two layers: `:root` for raw semantic values, `@theme inline` for Tailwind registration.

**When to use:** Always -- this is the established shadcn/ui + Tailwind v4 pattern already in the codebase.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme + https://ui.shadcn.com/docs/theming */

/* Layer 1: Raw semantic tokens (consumed by shadcn components) */
:root {
  --radius: 0.75rem;  /* 12px - rounded, approachable */
  --primary: oklch(0.546 0.245 262.881);         /* blue-600 */
  --primary-foreground: oklch(0.985 0 0);         /* white text on blue */
  --secondary: oklch(0.97 0.014 254.604);         /* blue-50 */
  --secondary-foreground: oklch(0.379 0.146 265.522); /* blue-900 */
  --accent: oklch(0.932 0.032 255.585);           /* blue-100 */
  --accent-foreground: oklch(0.379 0.146 265.522); /* blue-900 */
  --muted: oklch(0.97 0.014 254.604);             /* blue-50 */
  --muted-foreground: oklch(0.556 0 0);           /* neutral-500 for readability */
  --background: oklch(1 0 0);                     /* white */
  --foreground: oklch(0.145 0 0);                 /* near-black */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.546 0.245 262.881);             /* blue-600 for focus rings */
  --destructive: oklch(0.577 0.245 27.325);
  /* ... chart and sidebar vars ... */
}

/* Layer 2: Register with Tailwind (generates utility classes) */
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... all other mappings ... */
}
```

### Pattern 2: Brand Blue Color Scale

**What:** Define the full Planifactor blue palette (50-950) as custom Tailwind colors for use beyond shadcn semantic variables.

**When to use:** When you need specific blue shades that are not mapped to a shadcn semantic variable (e.g., a hero section background at blue-50, text accents at blue-700).

**Example:**
```css
/* Source: https://tailwindcss.com/docs/customizing-colors */
@theme {
  --color-brand-50: oklch(0.97 0.014 254.604);
  --color-brand-100: oklch(0.932 0.032 255.585);
  --color-brand-200: oklch(0.882 0.059 254.128);
  --color-brand-300: oklch(0.809 0.105 251.813);
  --color-brand-400: oklch(0.707 0.165 254.624);
  --color-brand-500: oklch(0.623 0.214 259.815);
  --color-brand-600: oklch(0.546 0.245 262.881);
  --color-brand-700: oklch(0.488 0.243 264.376);
  --color-brand-800: oklch(0.424 0.199 265.638);
  --color-brand-900: oklch(0.379 0.146 265.522);
  --color-brand-950: oklch(0.282 0.091 267.935);
}
```

This generates classes like `bg-brand-600`, `text-brand-50`, `border-brand-200`.

### Pattern 3: Typography Scale with Design Tokens

**What:** Define custom font sizes with accompanying line-height and font-weight as Tailwind theme variables.

**When to use:** For heading hierarchy that goes beyond Tailwind defaults.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/font-size */
@theme {
  /* Hero heading: large, bold, tight leading */
  --text-hero: 3.5rem;
  --text-hero--line-height: 1.1;
  --text-hero--font-weight: 800;
  --text-hero--letter-spacing: -0.025em;

  /* Section heading */
  --text-section: 2.25rem;
  --text-section--line-height: 1.2;
  --text-section--font-weight: 700;
  --text-section--letter-spacing: -0.02em;

  /* Sub-section heading */
  --text-subsection: 1.5rem;
  --text-subsection--line-height: 1.3;
  --text-subsection--font-weight: 600;
}
```

This generates `text-hero`, `text-section`, `text-subsection` utilities that apply font-size, line-height, letter-spacing, and font-weight in a single class.

### Pattern 4: SVG Logo as React Component

**What:** Inline SVG wrapped in a React component with TypeScript props for size and color variant.

**When to use:** For the Planifactor logo used in header, footer, favicon context.

**Example:**
```tsx
// Source: React SVG component best practices
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "white" | "icon-only";
type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 120, height: 28 },
  md: { width: 160, height: 36 },
  lg: { width: 200, height: 44 },
  xl: { width: 280, height: 60 },
};

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

export function Logo({ variant = "default", size = "md", className }: LogoProps) {
  const { width, height } = sizeMap[size];
  const color = variant === "white" ? "#ffffff" : "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 44"
      width={width}
      height={height}
      fill={color}
      className={cn("shrink-0", className)}
      aria-label="Planifactor"
      role="img"
    >
      {/* Icon: abstract Gantt bars */}
      {variant !== "icon-only" && (
        <text>{ /* Logotype text */ }</text>
      )}
      {/* ... SVG paths ... */}
    </svg>
  );
}
```

### Anti-Patterns to Avoid

- **Defining colors in both `tailwind.config.ts` AND `globals.css`:** Tailwind v4 uses CSS-first config only. There is no `tailwind.config.ts`. All tokens go in `globals.css`.
- **Using HSL for new color definitions:** shadcn/ui and Tailwind v4 have standardized on OKLCH. Do not mix HSL and OKLCH in the same file.
- **Hardcoding blue hex values in component classes:** Always reference CSS variables or Tailwind utilities (`bg-primary`, `text-brand-600`), never inline hex/oklch values.
- **Creating a `.dark` theme:** The CONTEXT.md explicitly states light mode only. Remove or keep the existing `.dark` block but do not invest time theming it.
- **Importing SVG files with webpack/SVGR loaders:** For a single logo, use an inline SVG React component. No build configuration needed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Blue color palette generation | Custom OKLCH calculations | Tailwind v4 default blue palette values | Already perceptually uniform, well-tested, exact OKLCH values available |
| Component theming | Per-component color overrides | shadcn CSS variable system (`:root` overrides) | All shadcn components read from CSS variables; change once, applies everywhere |
| Font loading | Manual `@font-face` declarations | `next/font/google` (already set up) | Self-hosted, auto-optimized, prevents FOUT, already configured with `--font-inter` variable |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) | Standard Tailwind breakpoints: 640px, 768px, 1024px, 1280px |
| Focus ring styling | Manual focus styles | shadcn's built-in `--ring` CSS variable | Already wired into all shadcn components via `focus-visible:ring-ring` |
| Icon system | Custom SVG sprite system | Lucide React (already installed) | shadcn components already use Lucide; consistent icon style |

**Key insight:** The existing shadcn/ui + Tailwind v4 setup means 90% of the "design system" work is just editing CSS variables in `globals.css`. No new dependencies, no build config changes, no component rewrites.

## Common Pitfalls

### Pitfall 1: Forgetting to Map `:root` Vars to `@theme inline`

**What goes wrong:** You define `--primary: oklch(0.546 0.245 262.881)` in `:root` but forget to add `--color-primary: var(--primary)` in `@theme inline`. shadcn components work (they read `:root` vars directly), but Tailwind utility classes like `bg-primary` break.
**Why it happens:** The two-layer system is non-obvious. `:root` serves shadcn, `@theme inline` serves Tailwind utilities.
**How to avoid:** Every `:root` variable that should generate a Tailwind utility MUST have a corresponding `@theme inline` entry. The current `globals.css` already has this pattern -- follow it exactly.
**Warning signs:** `bg-primary` renders as transparent or wrong color, but shadcn `<Button>` looks correct.

### Pitfall 2: OKLCH Values Without Function Wrapper

**What goes wrong:** Writing `--primary: 0.546 0.245 262.881` (space-separated) instead of `--primary: oklch(0.546 0.245 262.881)` (function-wrapped).
**Why it happens:** Older shadcn (HSL era) used space-separated values. Tailwind v4 requires the full `oklch()` function wrapper.
**How to avoid:** Always use `oklch(L C H)` format. The existing `globals.css` already uses this correctly.
**Warning signs:** Colors render as black or transparent.

### Pitfall 3: Breaking shadcn Component Updates

**What goes wrong:** Modifying shadcn component source files (`button.tsx`, etc.) to add brand colors instead of using CSS variables.
**Why it happens:** Temptation to "just add a class" directly.
**How to avoid:** NEVER edit shadcn component files for theming. All theming goes through CSS variables. When you run `npx shadcn add [component]`, it should work with brand colors automatically.
**Warning signs:** Running `npx shadcn diff` shows unexpected changes in component files.

### Pitfall 4: Inconsistent Border Radius

**What goes wrong:** Some components use `rounded-lg` (Tailwind default 0.5rem) while others use the shadcn `--radius` variable. Visual inconsistency.
**Why it happens:** The `--radius` variable in `:root` controls shadcn components, but custom elements might use Tailwind's default radius utilities.
**How to avoid:** Use the shadcn radius system (`rounded-sm`, `rounded-md`, `rounded-lg` which are derived from `--radius`) for components. For custom elements, use the same `rounded-lg` / `rounded-xl` classes that map to the theme.
**Warning signs:** Cards have different corner radii than buttons.

### Pitfall 5: Renaming Misses in Translation Files

**What goes wrong:** Updating `en.json` but forgetting `bg.json`, or updating translations but missing `CLAUDE.md` or planning docs. "Prefactor" appears inconsistently.
**Why it happens:** Multiple files contain the brand name across different directories.
**How to avoid:** Run a global search for "Prefactor" (case-insensitive) across the entire codebase. Update all occurrences. The grep search shows occurrences in: `messages/en.json`, `messages/bg.json`, `CLAUDE.md`, and multiple `.planning/` files.
**Warning signs:** Browser tab shows "Prefactor" while page content shows "Planifactor".

### Pitfall 6: Favicon Not Updating in Development

**What goes wrong:** After adding `icon.svg` to `src/app/`, the favicon does not appear or shows the default Next.js icon.
**Why it happens:** Next.js caches favicons aggressively. Also, `favicon.ico` in `src/app/` takes precedence over `icon.svg`.
**How to avoid:** Delete any existing `favicon.ico` file. Place `icon.svg` directly in `src/app/`. Clear browser cache or use incognito mode to verify. For Apple devices, also add `apple-icon.png` (180x180).
**Warning signs:** Old favicon persists despite new file. Check `<head>` output in browser DevTools.

## Code Examples

### Example 1: Complete `:root` Override for Blue Brand

```css
/* Source: https://tailwindcss.com/docs/theme + https://ui.shadcn.com/docs/theming */

:root {
  /* Planifactor brand: monochrome blue palette */
  --radius: 0.75rem;  /* 12px rounded corners */

  /* Core page colors */
  --background: oklch(1 0 0);                       /* pure white */
  --foreground: oklch(0.145 0 0);                    /* near-black text */

  /* Primary: blue-600 based */
  --primary: oklch(0.546 0.245 262.881);             /* blue-600 */
  --primary-foreground: oklch(0.985 0 0);            /* white */

  /* Secondary: subtle blue tint */
  --secondary: oklch(0.97 0.014 254.604);            /* blue-50 */
  --secondary-foreground: oklch(0.379 0.146 265.522); /* blue-900 */

  /* Muted: very subtle */
  --muted: oklch(0.97 0.014 254.604);                /* blue-50 */
  --muted-foreground: oklch(0.556 0 0);              /* neutral gray for readability */

  /* Accent: light blue for hover/active states */
  --accent: oklch(0.932 0.032 255.585);              /* blue-100 */
  --accent-foreground: oklch(0.379 0.146 265.522);   /* blue-900 */

  /* Cards and popovers: white surfaces */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Borders and inputs: light neutral */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);

  /* Focus ring: brand blue */
  --ring: oklch(0.546 0.245 262.881);                /* blue-600 */

  /* Destructive: keep red */
  --destructive: oklch(0.577 0.245 27.325);

  /* Charts: blue scale */
  --chart-1: oklch(0.546 0.245 262.881);  /* blue-600 */
  --chart-2: oklch(0.707 0.165 254.624);  /* blue-400 */
  --chart-3: oklch(0.809 0.105 251.813);  /* blue-300 */
  --chart-4: oklch(0.488 0.243 264.376);  /* blue-700 */
  --chart-5: oklch(0.623 0.214 259.815);  /* blue-500 */
}
```

### Example 2: Brand Color Palette in `@theme`

```css
/* Source: https://tailwindcss.com/docs/customizing-colors */
/* Define full brand palette for direct use: bg-brand-600, text-brand-50, etc. */
@theme {
  --color-brand-50: oklch(0.97 0.014 254.604);
  --color-brand-100: oklch(0.932 0.032 255.585);
  --color-brand-200: oklch(0.882 0.059 254.128);
  --color-brand-300: oklch(0.809 0.105 251.813);
  --color-brand-400: oklch(0.707 0.165 254.624);
  --color-brand-500: oklch(0.623 0.214 259.815);
  --color-brand-600: oklch(0.546 0.245 262.881);
  --color-brand-700: oklch(0.488 0.243 264.376);
  --color-brand-800: oklch(0.424 0.199 265.638);
  --color-brand-900: oklch(0.379 0.146 265.522);
  --color-brand-950: oklch(0.282 0.091 267.935);
}
```

### Example 3: Typography Design Tokens

```css
/* Source: https://tailwindcss.com/docs/font-size */
@theme {
  /* Custom heading scale for marketing site */
  --text-hero: 3.5rem;
  --text-hero--line-height: 1.1;
  --text-hero--font-weight: 800;
  --text-hero--letter-spacing: -0.025em;

  --text-display: 3rem;
  --text-display--line-height: 1.15;
  --text-display--font-weight: 700;
  --text-display--letter-spacing: -0.02em;

  --text-heading: 2.25rem;
  --text-heading--line-height: 1.2;
  --text-heading--font-weight: 700;
  --text-heading--letter-spacing: -0.02em;

  --text-subheading: 1.5rem;
  --text-subheading--line-height: 1.35;
  --text-subheading--font-weight: 600;

  --text-body-lg: 1.25rem;
  --text-body-lg--line-height: 1.6;
  --text-body-lg--font-weight: 400;

  --text-label: 0.875rem;
  --text-label--line-height: 1.5;
  --text-label--font-weight: 500;
  --text-label--letter-spacing: 0.01em;
}
```

Usage: `<h1 class="text-hero">` applies 3.5rem, line-height 1.1, weight 800, tracking -0.025em all at once.

### Example 4: Responsive Typography Pattern

```tsx
{/* Source: Tailwind responsive utilities */}
{/* Mobile-first: small default, larger at breakpoints */}
<h1 className="text-heading md:text-display lg:text-hero">
  Production scheduling, simplified
</h1>
<p className="text-base md:text-body-lg text-muted-foreground">
  Visual Gantt charts and optimization for manufacturers.
</p>
```

### Example 5: Logo Component Structure

```tsx
// Source: React SVG component patterns
// src/components/brand/Logo.tsx
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "white" | "icon";
type LogoSize = "xs" | "sm" | "md" | "lg";

const sizes = {
  xs: { icon: 24, full: { w: 120, h: 24 } },    // Favicon context
  sm: { icon: 28, full: { w: 140, h: 28 } },     // Mobile header
  md: { icon: 36, full: { w: 180, h: 36 } },     // Desktop header
  lg: { icon: 48, full: { w: 240, h: 48 } },     // Footer / hero
} as const;

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

export function Logo({
  variant = "default",
  size = "md",
  className,
}: LogoProps) {
  const dims = sizes[size];
  const isIconOnly = variant === "icon";
  const { w, h } = isIconOnly
    ? { w: dims.icon, h: dims.icon }
    : dims.full;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isIconOnly ? "0 0 48 48" : "0 0 240 48"}
      width={w}
      height={h}
      className={cn("shrink-0", className)}
      aria-label="Planifactor"
      role="img"
    >
      {/* Icon: abstract Gantt bars */}
      <g fill={variant === "white" ? "#fff" : "currentColor"}>
        {/* 3-4 horizontal bars of varying lengths, suggesting a Gantt chart */}
        {/* Thin strokes, light weight, breathing room between bars */}
      </g>
      {!isIconOnly && (
        <text
          x="56" y="32"
          fontFamily="var(--font-inter), Inter, sans-serif"
          fontWeight="600"
          fontSize="22"
          fill={variant === "white" ? "#fff" : "currentColor"}
        >
          Planifactor
        </text>
      )}
    </svg>
  );
}
```

### Example 6: Next.js Favicon Setup

```
src/app/
  icon.svg          # Primary favicon (SVG, auto-detected by Next.js)
  apple-icon.png    # Apple touch icon (180x180 PNG)
```

Next.js automatically generates the `<link>` tags in `<head>`:
```html
<link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
<link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" sizes="180x180" />
```

Delete any existing `favicon.ico` to prevent it from overriding `icon.svg`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| HSL color values in shadcn | OKLCH color values | shadcn v3+ / Tailwind v4 | All color definitions must use `oklch()` format |
| `tailwind.config.ts` for themes | `@theme` / `@theme inline` in CSS | Tailwind v4 | No JS config file; everything in `globals.css` |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Single import replaces three directives |
| `tailwindcss-animate` plugin | `tw-animate-css` package | Tailwind v4 | CSS import instead of JS plugin |
| Separate dark mode variables | Light mode only (for this project) | N/A (project decision) | Can remove `.dark` block from `globals.css` |

**Deprecated/outdated:**
- `tailwind.config.ts` / `tailwind.config.js`: Not used in Tailwind v4. Replaced by `@theme` in CSS.
- HSL color format in shadcn: Replaced by OKLCH in shadcn v3+.
- `@plugin 'tailwindcss-animate'`: Replaced by `@import "tw-animate-css"`.

## Rename Scope

All occurrences of "Prefactor" that need updating to "Planifactor":

### Source Code (must update)
| File | Occurrences | Type |
|------|-------------|------|
| `messages/en.json` | 1 | Metadata title |
| `messages/bg.json` | 1 | Metadata title |

### Project Documentation (should update)
| File | Occurrences | Type |
|------|-------------|------|
| `CLAUDE.md` | ~5 | Project description, feature references |
| `.planning/REQUIREMENTS.md` | ~3 | Requirement descriptions |
| `.planning/PROJECT.md` | ~8 | Project description |
| `.planning/STATE.md` | ~1 | State header |
| `.planning/ROADMAP.md` | ~10 | Phase descriptions, success criteria |
| `.planning/research/*.md` | ~30+ | Research references |

**Strategy:** Update source code files first (translations, CLAUDE.md). Planning docs can be updated as a batch operation.

## Open Questions

1. **Exact logo SVG design**
   - What we know: Abstract Gantt bars, thin strokes, icon + text, works at 16px-200px+
   - What's unclear: The exact SVG path data must be hand-crafted or generated. This is creative work, not a library choice.
   - Recommendation: Create a simple, geometric design with 3-4 horizontal bars of varying length. Use `currentColor` for theming flexibility. Start with a basic version that meets the "good enough for launch" standard from CONTEXT.md.

2. **Brand blue exact hue**
   - What we know: Context says "blue-600 range, bright/vivid." Tailwind blue-600 is `oklch(0.546 0.245 262.881)`.
   - What's unclear: Whether the exact Tailwind blue-600 is the right hue, or whether it should be adjusted slightly.
   - Recommendation: Start with Tailwind v4 default blue-600 as `--primary`. The entire palette is perceptually uniform in OKLCH, so it will look cohesive. Adjusting later requires changing one value in `:root`.

3. **Responsive hero heading size**
   - What we know: "Large & bold hero headings" per CONTEXT.md. Desktop should be big (3.5rem+).
   - What's unclear: Exact mobile size. Too large on 375px causes overflow.
   - Recommendation: Use `text-heading md:text-display lg:text-hero` pattern. On mobile (375px), hero text at ~2.25rem (36px) is large enough to be impactful without overflow.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) - `@theme`, `@theme inline` syntax, all namespace definitions
- [Tailwind CSS v4 Custom Colors](https://tailwindcss.com/docs/customizing-colors) - Color palette definition, OKLCH values for default blue
- [Tailwind CSS v4 Font Size](https://tailwindcss.com/docs/font-size) - Custom text sizes with line-height/weight/spacing
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) - CSS variable structure, OKLCH format, `:root` override pattern
- [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4) - Migration guide, `@theme inline` pattern
- [Next.js Metadata Icons](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons) - favicon/icon.svg/apple-icon conventions

### Secondary (MEDIUM confidence)
- [Tailwind v4 Blue OKLCH Values](https://tailwindcolor.com/blue) - Full blue palette in OKLCH format (cross-verified with Tailwind docs)
- [shadcn Color Naming](https://isaichenko.dev/blog/shadcn-colors-naming/) - Explains primary/foreground pairing convention
- [OKLCH Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) - Why OKLCH is perceptually uniform, ~93% browser support in 2026

### Tertiary (LOW confidence)
- [shadcn Theme Generators](https://tweakcn.com/) - Community tools for generating themes (useful for inspiration, not authoritative)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed, verified from official docs
- Architecture (token system): HIGH - follows established shadcn + Tailwind v4 pattern already in codebase
- Architecture (typography scale): MEDIUM - custom text tokens are documented in Tailwind v4 but specific values are design decisions
- Pitfalls: HIGH - verified against official docs and existing codebase structure
- Logo component pattern: MEDIUM - standard React SVG pattern, but exact SVG design is creative work
- Rename scope: HIGH - verified via grep of actual codebase

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (stable domain; Tailwind v4 and shadcn/ui are mature)
