# Phase 1: Foundation & i18n - Research

**Researched:** 2026-02-09
**Domain:** Next.js 16 App Router, next-intl i18n, Tailwind CSS v4, shadcn/ui, Cyrillic font support
**Confidence:** HIGH

## Summary

This research covers every technical decision needed to plan Phase 1: initializing a Next.js 16 App Router project with Tailwind CSS v4, shadcn/ui, next-intl for i18n (English + Bulgarian), and Cyrillic font preloading.

All package versions have been verified via `npm view` on 2026-02-09. Tailwind v4 is fully compatible with shadcn/ui -- no fallback to v3 is needed. Next.js 16 introduces a breaking rename of `middleware.ts` to `proxy.ts` and requires all `params` to be awaited as Promises. next-intl v4.8 already documents the `proxy.ts` convention and works with Next.js 16 out of the box.

**Primary recommendation:** Use `create-next-app@16` with `--tailwind --app --src-dir`, then `npx shadcn@latest init`, then install `next-intl` and configure i18n routing with `[locale]` dynamic segment from the very first commit. Use Inter font with `subsets: ['latin', 'cyrillic']` for zero FOUT.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| **Next.js** | 16.1.6 | Full-stack React framework (App Router) | Latest stable. Turbopack is now default bundler. `proxy.ts` replaces `middleware.ts`. All `params` are async Promises. |
| **React** | 19.2.4 | UI library | Bundled with Next.js 16. Server Components stable. `use()` hook for unwrapping Promises in client components. |
| **TypeScript** | 5.9.3 | Type safety | Latest stable. Required for next-intl type-safe translations and Next.js generated types (`PageProps`, `LayoutProps`). |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS | Latest v4 stable. CSS-first configuration (no `tailwind.config.ts`). All config lives in CSS via `@theme`. |
| **shadcn/ui** | CLI 3.8.4 | Component library (copies source into project) | Fully compatible with Tailwind v4 and React 19. Uses `new-york` style (default deprecated). Unified `radix-ui` package. |
| **next-intl** | 4.8.2 | i18n for App Router | Latest stable. Server component support, type-safe, `proxy.ts` compatible, `useTranslations` + `getTranslations` APIs. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **radix-ui** | (installed by shadcn) | Accessible UI primitives | Automatically installed when adding shadcn components. Single unified package (not separate `@radix-ui/react-*`). |
| **lucide-react** | (installed by shadcn) | Icons | Default icon library for shadcn/ui. Tree-shakeable. |
| **tailwind-merge** | (installed by shadcn) | Merge conflicting Tailwind classes | Used internally by shadcn `cn()` utility. |
| **clsx** | (installed by shadcn) | Conditional class names | Used internally by shadcn `cn()` utility. |
| **tw-animate-css** | 1.4.0 | Animation utilities for Tailwind | Replaces deprecated `tailwindcss-animate`. Used by shadcn components for transitions. |
| **class-variance-authority** | (installed by shadcn) | Component variant management | Used by shadcn Button and other variant-based components. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-intl | Manual `[locale]` + JSON dictionaries | Simpler but no type safety, no locale detection, no navigation helpers, no `proxy.ts` integration. next-intl is the right choice. |
| Tailwind v4 | Tailwind v3.4 | v3 has `tailwind.config.ts` file; v4 uses CSS-first config. shadcn/ui fully supports v4 so there is no reason to use v3. |
| Inter font | Geist (Next.js default) | Geist has Latin + Cyrillic support, but Inter is more established for body text and has wider glyph coverage. Both work. |

**Installation:**

```bash
# 1. Create Next.js 16 project
npx create-next-app@16 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

# 2. Initialize shadcn/ui (will configure Tailwind v4, add cn utility)
npx shadcn@latest init

# 3. Add essential shadcn components for Phase 1
npx shadcn@latest add button

# 4. Install next-intl
npm install next-intl
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 Output)

```
marketing-site/
├── public/
│   └── (static assets)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Locale-scoped layout (html lang, fonts, NextIntlClientProvider)
│   │   │   └── page.tsx           # Landing page placeholder
│   │   ├── layout.tsx             # Root layout (minimal -- just children pass-through)
│   │   ├── favicon.ico
│   │   └── globals.css            # Tailwind v4 CSS with @theme inline
│   ├── components/
│   │   ├── ui/                    # shadcn/ui generated components
│   │   ├── layout/
│   │   │   └── LanguageSwitcher.tsx  # Client Component: locale toggle
│   │   ├── sections/              # Server Components: page sections
│   │   └── interactive/           # Client Components: stateful widgets
│   ├── i18n/
│   │   ├── routing.ts            # defineRouting: locales, defaultLocale
│   │   ├── navigation.ts         # createNavigation: Link, useRouter, usePathname
│   │   └── request.ts            # getRequestConfig: message loading per locale
│   └── lib/
│       └── utils.ts              # cn() helper (created by shadcn init)
├── messages/
│   ├── en.json                   # English translations
│   └── bg.json                   # Bulgarian translations
├── proxy.ts                      # next-intl createMiddleware (locale detection + routing)
├── next.config.ts                # createNextIntlPlugin wrapper
├── components.json               # shadcn/ui configuration
├── tsconfig.json
└── package.json
```

### Pattern 1: next-intl Routing Configuration

**What:** Define routing once, use everywhere.
**When to use:** Always -- this is the foundation of the i18n setup.

```typescript
// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'bg'],
  defaultLocale: 'en'
});
```

### Pattern 2: Proxy File for Locale Detection

**What:** Next.js 16 `proxy.ts` at project root handles locale detection and redirect.
**When to use:** Every request. Replaces the old `middleware.ts`.

```typescript
// proxy.ts (PROJECT ROOT, not src/)
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

**IMPORTANT:** In Next.js 16, the file MUST be named `proxy.ts` (not `middleware.ts`). Both default and named exports are supported. next-intl's `createMiddleware` returns a default export which is compatible.

### Pattern 3: Request Config with Message Loading

**What:** Load locale-specific JSON messages on each request.
**When to use:** Required by next-intl to provide translations to components.

```typescript
// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### Pattern 4: Next.js Config with next-intl Plugin

**What:** Wrap `next.config.ts` with next-intl plugin for server-side i18n support.
**When to use:** Always.

```typescript
// next.config.ts
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### Pattern 5: Locale Layout with Async Params

**What:** Root layout under `[locale]` sets `<html lang>`, provides `NextIntlClientProvider`, and enables static rendering.
**When to use:** Required. This is the locale entry point.

```typescript
// src/app/[locale]/layout.tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {Inter} from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Pattern 6: Navigation Helpers

**What:** Create locale-aware `Link`, `useRouter`, `usePathname`, `redirect` from routing config.
**When to use:** All navigation throughout the app.

```typescript
// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

### Pattern 7: Using Translations in Server Components

**What:** Use `getTranslations` for async server components, `useTranslations` for sync components.

```typescript
// src/app/[locale]/page.tsx (Server Component)
import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';

type Props = {
  params: Promise<{locale: string}>;
};

export default function HomePage({params}: Props) {
  const {locale} = use(params);
  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
```

### Pattern 8: Using Translations in Client Components

**What:** Client components can use `useTranslations` directly because `NextIntlClientProvider` passes messages from the layout.

```typescript
// src/components/layout/LanguageSwitcher.tsx
'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, {locale: newLocale});
  }

  return (
    <div>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={loc === locale}
          className={loc === locale ? 'font-bold' : ''}
        >
          {loc === 'en' ? 'English' : 'Bulgarian'}
        </button>
      ))}
    </div>
  );
}
```

### Pattern 9: Locale-Aware Metadata

**What:** Generate metadata per locale for SEO.

```typescript
// src/app/[locale]/page.tsx (add to the page)
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'HomePage'});

  return {
    title: t('title'),
    description: t('description'),
  };
}
```

### Pattern 10: Font Configuration for Cyrillic

**What:** Inter variable font with Latin + Cyrillic subsets, preloaded, no FOUT.

```typescript
// In layout.tsx
import {Inter} from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',          // Prevents FOIT, allows brief FOUT then swaps
  variable: '--font-inter',  // CSS variable for Tailwind integration
});
```

**Integration with Tailwind v4 CSS:**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

### Anti-Patterns to Avoid

- **NEVER put `"use client"` in layout.tsx or page.tsx.** These are server components. Only leaf interactive components get `"use client"`.
- **NEVER access `params` synchronously.** In Next.js 16, `params` is a `Promise`. Always `await params` in server components or `use(params)` in client components.
- **NEVER use `middleware.ts`.** Next.js 16 renamed it to `proxy.ts`. Using the old name is deprecated.
- **NEVER load the full dictionary in client components.** `NextIntlClientProvider` handles this automatically. Use `useTranslations` -- it only sends needed messages to the client.
- **NEVER skip `setRequestLocale(locale)`.** Required in every layout and page for static rendering to work with next-intl.
- **NEVER skip `generateStaticParams`.** Required in the `[locale]/layout.tsx` to pre-render all locale variants at build time.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale detection + redirect | Custom `Accept-Language` parsing | `next-intl/middleware` (`createMiddleware`) | Handles cookie persistence, Accept-Language negotiation, redirect, rewrite -- all correctly. |
| Locale-aware navigation | Manual `/${locale}/path` string building | `next-intl/navigation` (`createNavigation`) | Provides `Link`, `useRouter`, `usePathname` that automatically handle locale prefixes. |
| Translation loading per request | Custom dynamic imports in every page | `next-intl/server` (`getRequestConfig`) | Centralized message loading with proper caching and scope. |
| Font preloading | Manual `<link rel="preload">` tags | `next/font/google` with `subsets` | Automatic self-hosting, preloading, subset optimization, and CSS variable injection. |
| CSS utility merging | Manual string concatenation | shadcn's `cn()` (uses `clsx` + `tailwind-merge`) | Properly resolves conflicting Tailwind classes. |
| Component variants | Custom conditional class logic | `class-variance-authority` (installed by shadcn) | Type-safe variant definitions with compound variants support. |

**Key insight:** next-intl provides a complete i18n solution specifically designed for Next.js App Router. Building custom locale routing, detection, or message loading is a waste of time and will miss edge cases (cookie persistence, SEO alternate links, static rendering compatibility).

---

## Common Pitfalls

### Pitfall 1: `params` is a Promise (Next.js 16 Breaking Change)

**What goes wrong:** Code accesses `params.locale` synchronously and gets `[object Promise]` or runtime errors.
**Why it happens:** Next.js 16 changed `params` from a synchronous object to a `Promise`. Every tutorial written before 2026 shows the old pattern.
**How to avoid:** Always `await params` in async server components. Use `use(params)` in client components. Set up the correct pattern in the first file and copy from there.
**Warning signs:** Runtime error "Cannot read property 'locale' of [object Promise]". TypeScript errors if using correct Next.js 16 types.

### Pitfall 2: Missing `setRequestLocale` Breaks Static Rendering

**What goes wrong:** Pages render correctly in dev but fail at build time with next-intl errors about missing locale context.
**Why it happens:** next-intl uses a request-scoped store for the locale. In static rendering (at build time), there is no request. `setRequestLocale(locale)` explicitly provides the locale for static contexts.
**How to avoid:** Call `setRequestLocale(locale)` at the top of every `layout.tsx` and `page.tsx` under `[locale]`. It is a no-op in dynamic rendering and essential for static rendering.
**Warning signs:** Build errors mentioning "Unable to find next-intl locale". Pages work in `next dev` but fail in `next build`.

### Pitfall 3: `proxy.ts` vs `middleware.ts` Confusion

**What goes wrong:** Creating `middleware.ts` instead of `proxy.ts`, causing locale detection to silently not work.
**Why it happens:** Next.js 16 renamed the file. All older docs, tutorials, and even some library READMEs still reference `middleware.ts`.
**How to avoid:** Use `proxy.ts` at the project root. next-intl docs already reference `proxy.ts`.
**Warning signs:** Locale detection not working, no redirect from `/` to `/en`, middleware matcher not executing.

### Pitfall 4: Cyrillic Font Subset Not Preloaded

**What goes wrong:** Bulgarian pages show a flash of unstyled text (FOUT) or fallback font because the Cyrillic subset was not included.
**Why it happens:** Default Next.js font config only includes `latin` subset. You must explicitly add `cyrillic`.
**How to avoid:** Use `subsets: ['latin', 'cyrillic']` in the `Inter()` font configuration. Preload BOTH subsets in the root layout (not conditionally per locale).
**Warning signs:** Text flickers on Bulgarian pages. Network tab shows font file requested after page paint. Lighthouse reports CLS from font loading.

### Pitfall 5: Client Component Boundary Creep

**What goes wrong:** Adding `"use client"` to a layout or page, causing the entire subtree to become client-rendered and inflating the JavaScript bundle.
**Why it happens:** A component needs `onClick` or `useState`, so the developer adds `"use client"` to the nearest parent file instead of isolating the interactive piece.
**How to avoid:** Establish the `components/interactive/` and `components/sections/` folder convention from day 1. Sections are server components. Interactive widgets are client components. Pages compose both.
**Warning signs:** `"use client"` in any `layout.tsx` or `page.tsx`. First-load JS over 100KB on a marketing page.

### Pitfall 6: Tailwind v4 CSS Configuration Confusion

**What goes wrong:** Developer tries to create `tailwind.config.ts` or `tailwind.config.js` and wonders why it does not work.
**Why it happens:** Tailwind v4 uses CSS-first configuration. There is no JavaScript config file. All customization happens in CSS via `@theme`.
**How to avoid:** Use the CSS file generated by `create-next-app` and `shadcn init`. Customize via `@theme inline` in `globals.css`. Never create a `tailwind.config.*` file for v4 projects.
**Warning signs:** `tailwind.config.ts` file exists in a v4 project. Custom colors not applying.

### Pitfall 7: shadcn/ui `default` Style No Longer Available

**What goes wrong:** Running `npx shadcn init` and selecting "default" style, which is deprecated.
**Why it happens:** shadcn/ui deprecated the `default` style. All new projects use `new-york`.
**How to avoid:** Use `new-york` when prompted during `npx shadcn@latest init`.
**Warning signs:** Components look different from shadcn documentation examples.

---

## Code Examples

### Complete `messages/en.json` Structure

```json
{
  "Metadata": {
    "title": "Prefactor - Production Scheduling Software",
    "description": "Visual production scheduling with Gantt charts, resource optimization, and real-time planning for manufacturers."
  },
  "Navigation": {
    "features": "Features",
    "useCases": "Use Cases",
    "pricing": "Pricing",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact",
    "requestDemo": "Request Demo"
  },
  "LanguageSwitcher": {
    "en": "English",
    "bg": "Bulgarian"
  },
  "HomePage": {
    "title": "Production Scheduling, Simplified",
    "description": "Visual Gantt charts, resource optimization, and real-time planning for manufacturers.",
    "cta": "Request a Demo",
    "ctaSecondary": "See Features"
  },
  "NotFound": {
    "title": "Page Not Found",
    "description": "The page you are looking for does not exist."
  }
}
```

### Complete `messages/bg.json` Structure

```json
{
  "Metadata": {
    "title": "Prefactor - Production Scheduling Software",
    "description": "Visual production scheduling with Gantt charts."
  },
  "Navigation": {
    "features": "Features",
    "useCases": "Use Cases",
    "pricing": "Pricing",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact",
    "requestDemo": "Request Demo"
  },
  "LanguageSwitcher": {
    "en": "English",
    "bg": "Bulgarian"
  },
  "HomePage": {
    "title": "Production Scheduling, Simplified",
    "description": "Visual Gantt charts, resource optimization, and real-time planning.",
    "cta": "Request a Demo",
    "ctaSecondary": "See Features"
  },
  "NotFound": {
    "title": "Page Not Found",
    "description": "The page you are looking for does not exist."
  }
}
```

**NOTE:** Bulgarian translations above are English placeholders. A native Bulgarian speaker must provide real translations. This is intentional for Phase 1 -- the i18n infrastructure works correctly with placeholder text, and real translations can be swapped in without code changes.

### Complete `components.json` (shadcn/ui Config)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Tailwind v4 CSS Configuration

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

/* shadcn/ui theme variables -- generated by npx shadcn init */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(0 0% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(0 0% 3.9%);
  --primary: hsl(0 0% 9%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(0 0% 96.1%);
  --secondary-foreground: hsl(0 0% 9%);
  --muted: hsl(0 0% 96.1%);
  --muted-foreground: hsl(0 0% 45.1%);
  --accent: hsl(0 0% 96.1%);
  --accent-foreground: hsl(0 0% 9%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(0 0% 89.8%);
  --input: hsl(0 0% 89.8%);
  --ring: hsl(0 0% 3.9%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
  /* ... dark theme variables */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

**NOTE:** The exact CSS variables will be generated by `npx shadcn@latest init`. The above is representative. The key addition is `--font-sans: var(--font-inter)` to integrate the Inter font with Tailwind.

### Complete Initialization Sequence

```bash
# Step 1: Create Next.js 16 project
npx create-next-app@16 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

# Step 2: Initialize shadcn/ui
# When prompted: style=new-york, baseColor=neutral, cssVariables=yes
npx shadcn@latest init

# Step 3: Add Button component (needed for language switcher and CTAs)
npx shadcn@latest add button

# Step 4: Install next-intl
npm install next-intl

# Step 5: Create directory structure
mkdir -p messages src/i18n src/components/layout src/components/sections src/components/interactive

# Step 6: Create message files, i18n config, proxy.ts, update next.config.ts
# (see code examples above for each file's content)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `middleware.ts` | `proxy.ts` | Next.js 16 (2026) | File and function rename. next-intl already documents this. |
| `params` as sync object | `params` as `Promise` | Next.js 15 (deprecated sync), 16 (fully removed) | Must `await params` everywhere. Affects every page, layout, generateMetadata. |
| `tailwind.config.ts` | CSS-first with `@theme` | Tailwind v4 (2025) | No JavaScript config file. All theme customization in CSS. |
| `tailwindcss-animate` | `tw-animate-css` | shadcn/ui 2025 | New animation utility package. Installed by shadcn init automatically. |
| `@radix-ui/react-*` (multiple) | `radix-ui` (single package) | shadcn/ui Feb 2026 | Single unified Radix package. Cleaner `package.json`. |
| `default` style | `new-york` style | shadcn/ui 2025 | Default style deprecated. New projects must use `new-york`. |
| `framer-motion` package | `motion` package | Late 2024 | Rebranded. Import from `motion/react` instead of `framer-motion`. |

**Deprecated/outdated:**
- `middleware.ts` -- renamed to `proxy.ts` in Next.js 16
- `tailwind.config.ts` -- replaced by CSS-first `@theme` in Tailwind v4
- `tailwindcss-animate` -- replaced by `tw-animate-css`
- `React.forwardRef` -- removed in React 19, replaced by `React.ComponentProps` + `data-slot`
- `next lint` command -- removed in Next.js 16, use ESLint directly
- `default` style in shadcn/ui -- deprecated, use `new-york`

---

## Open Questions

1. **`proxy.ts` import path for i18n/routing**
   - What we know: `proxy.ts` sits at project root. With `--src-dir`, source code is in `src/`. The import in `proxy.ts` needs to reach `src/i18n/routing.ts`.
   - What's unclear: Whether the `@/` alias works in `proxy.ts` (it is outside `src/`). May need relative import `./src/i18n/routing`.
   - Recommendation: Try `@/i18n/routing` first. If it fails, fall back to `./src/i18n/routing`. The `tsconfig.json` should map `@/*` to `./src/*` which may resolve correctly from the project root.

2. **Root layout vs locale layout**
   - What we know: Next.js requires a root `app/layout.tsx`. With `[locale]` segment, the locale layout is `app/[locale]/layout.tsx`. Both must exist.
   - What's unclear: Whether the `<html>` and `<body>` tags should be in the root layout or the locale layout.
   - Recommendation: Put `<html>` and `<body>` in `app/[locale]/layout.tsx` so the `lang` attribute can be set dynamically. The root `app/layout.tsx` should just pass through `children` without any HTML wrapper. Verify this works during implementation.

3. **Bulgarian translations for Phase 1**
   - What we know: Phase 1 needs working i18n infrastructure with both locales rendering.
   - What's unclear: Whether real Bulgarian translations are needed for Phase 1 or placeholder English is acceptable.
   - Recommendation: Use English placeholder text in `bg.json` for Phase 1. The infrastructure works the same regardless of content. Real Bulgarian translations are a content concern, not a technical one.

---

## Sources

### Primary (HIGH confidence)
- npm registry -- Verified all package versions via `npm view` on 2026-02-09
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- Breaking changes, proxy.ts, async params
- [Next.js 16 blog post](https://nextjs.org/blog/next-16) -- Turbopack default, cache components
- [Next.js proxy.ts API reference](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) -- Export signatures
- [next-intl App Router setup](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing) -- Complete setup guide
- [next-intl proxy/middleware docs](https://next-intl.dev/docs/routing/middleware) -- Locale detection, proxy.ts compatibility
- [next-intl navigation APIs](https://next-intl.dev/docs/routing/navigation) -- Link, useRouter, usePathname
- [next-intl plugin docs](https://next-intl.dev/docs/usage/plugin) -- createNextIntlPlugin for next.config.ts
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) -- Full v4 compatibility confirmed
- [shadcn/ui components.json](https://ui.shadcn.com/docs/components-json) -- Configuration format
- [shadcn/ui changelog](https://ui.shadcn.com/docs/changelog) -- new-york default, radix-ui unified package
- [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google usage
- [Inter on Google Fonts](https://fonts.google.com/specimen/Inter?subset=cyrillic-ext) -- Cyrillic subset confirmed

### Secondary (MEDIUM confidence)
- [i18nexus Next.js 16 tutorial](https://i18nexus.com/tutorials/nextjs/next-intl) -- Complete working setup walkthrough
- [shadcn/app-tailwind-v4 reference repo](https://github.com/shadcn/app-tailwind-v4) -- Reference implementation

### Tertiary (LOW confidence)
- None -- all claims verified against primary sources.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All versions verified via npm registry. Compatibility confirmed via official docs.
- Architecture: HIGH -- next-intl setup verified against official docs. Proxy.ts pattern verified against Next.js 16 docs.
- Tailwind v4 + shadcn/ui: HIGH -- Official shadcn/ui docs explicitly document v4 support with code examples.
- Cyrillic fonts: HIGH -- Inter Cyrillic subset confirmed on Google Fonts. next/font/google `subsets` parameter documented.
- Pitfalls: HIGH -- All pitfalls verified against official breaking change docs and library documentation.

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (30 days -- stack is stable, no upcoming major releases expected)
