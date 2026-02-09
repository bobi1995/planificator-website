---
phase: 01-foundation-i18n
plan: 02
title: "i18n Infrastructure & Locale Routing"
subsystem: "i18n-routing"
tags: [next-intl, i18n, locale-routing, proxy, inter-font, cyrillic]

dependency-graph:
  requires:
    - "01-01 (Next.js project, next-intl installed, directory structure)"
  provides:
    - "Working i18n locale routing (en, bg)"
    - "Proxy middleware for locale detection and redirect"
    - "Message dictionaries for English and Bulgarian"
    - "Locale-scoped layout with dynamic <html lang>"
    - "Inter font with Cyrillic subset preloading"
    - "Locale-aware navigation helpers (Link, useRouter, usePathname)"
    - "generateStaticParams for build-time locale prerendering"
  affects:
    - "01-03 (language switcher - uses navigation helpers)"
    - "All subsequent pages (must be under [locale] segment)"
    - "All components using translations (useTranslations pattern)"

tech-stack:
  added: []
  patterns:
    - "next-intl proxy middleware at src/proxy.ts (not root)"
    - "createNextIntlPlugin wrapping next.config.ts"
    - "Async server components with getTranslations (not useTranslations)"
    - "setRequestLocale for static rendering compatibility"
    - "generateStaticParams in [locale]/layout.tsx for SSG"
    - "Inter font with latin+cyrillic subsets via next/font/google"
    - "Root layout as pass-through, locale layout handles html/body"

key-files:
  created:
    - "src/i18n/routing.ts"
    - "src/i18n/navigation.ts"
    - "src/i18n/request.ts"
    - "messages/en.json"
    - "messages/bg.json"
    - "src/proxy.ts"
    - "src/app/[locale]/layout.tsx"
    - "src/app/[locale]/page.tsx"
  modified:
    - "next.config.ts"
    - "src/app/layout.tsx"
  deleted:
    - "src/app/page.tsx"

decisions:
  - id: "proxy-in-src"
    decision: "Place proxy.ts in src/ directory, not project root"
    rationale: "Next.js 16 with --src-dir watches src/ for proxy.ts, not project root. Root proxy.ts was silently ignored."
  - id: "getTranslations-over-useTranslations"
    decision: "Use getTranslations (async) instead of useTranslations in async server components"
    rationale: "next-intl v4 prohibits useTranslations in async components. getTranslations is the async-compatible API."
  - id: "expanded-proxy-matcher"
    decision: "Use expanded matcher array with explicit '/' and locale patterns"
    rationale: "Explicit '/' ensures root redirect works reliably across environments"

metrics:
  duration: "~12 minutes"
  completed: "2026-02-09"
  tasks: "3/3"
  commits: 3
---

# Phase 01 Plan 02: i18n Infrastructure & Locale Routing Summary

**One-liner:** Complete next-intl i18n routing with en/bg locales, proxy middleware at src/proxy.ts, Inter font with Cyrillic subsets, and static prerendering of both locale variants.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create i18n configuration files and message dictionaries | 5391f63 | src/i18n/routing.ts, src/i18n/navigation.ts, src/i18n/request.ts, messages/en.json, messages/bg.json |
| 2 | Create proxy.ts and update next.config.ts for next-intl | a3ea29a | proxy.ts (later moved), next.config.ts |
| 3 | Create locale layout and home page with translations | 2be9aa3 | src/proxy.ts, src/app/[locale]/layout.tsx, src/app/[locale]/page.tsx, src/app/layout.tsx |

## What Was Built

### Task 1: i18n Configuration Files
- Created `src/i18n/routing.ts` with `defineRouting` for en/bg locales (en as default)
- Created `src/i18n/navigation.ts` with `createNavigation` exporting locale-aware Link, redirect, usePathname, useRouter, getPathname
- Created `src/i18n/request.ts` with `getRequestConfig` for per-request locale and message loading
- Created `messages/en.json` with full English translations (Metadata, Navigation, LanguageSwitcher, HomePage, NotFound)
- Created `messages/bg.json` with matching structure (English placeholder text)

### Task 2: Proxy Middleware and Next.js Config
- Created proxy.ts with `createMiddleware(routing)` for locale detection
- Updated `next.config.ts` to wrap config with `createNextIntlPlugin()`
- Matcher pattern excludes api, _next, static file routes

### Task 3: Locale Layout and Home Page
- Stripped root `src/app/layout.tsx` to minimal pass-through (no html/body tags)
- Created `src/app/[locale]/layout.tsx` with:
  - `<html lang={locale}>` for dynamic locale attribute
  - Inter font with `subsets: ['latin', 'cyrillic']` and `display: 'swap'`
  - `NextIntlClientProvider` for client-side translations
  - `generateStaticParams` returning both locales for build-time prerendering
  - `setRequestLocale(locale)` for static rendering compatibility
- Created `src/app/[locale]/page.tsx` with:
  - `getTranslations` for async server component translation
  - `generateMetadata` with locale-aware title and description
  - Minimal hero section with heading, description, and two CTA buttons
- Deleted old `src/app/page.tsx` to avoid routing conflicts

## Verification Results

- [x] `src/proxy.ts` exists (NOT at root, NOT `middleware.ts`)
- [x] No `middleware.ts` file exists anywhere
- [x] `next.config.ts` uses `createNextIntlPlugin`
- [x] `src/i18n/routing.ts` defines `['en', 'bg']` locales with `'en'` as default
- [x] `src/i18n/navigation.ts` exports Link, useRouter, usePathname
- [x] `src/i18n/request.ts` loads messages from `messages/{locale}.json`
- [x] `messages/en.json` and `messages/bg.json` exist with matching key structures
- [x] `src/app/layout.tsx` is a pass-through (no `<html>` or `<body>` tags)
- [x] `src/app/[locale]/layout.tsx` has `<html lang={locale}>`, Inter font, `NextIntlClientProvider`, `generateStaticParams`, `setRequestLocale`
- [x] `src/app/[locale]/page.tsx` uses `getTranslations`, `setRequestLocale`, `generateMetadata`
- [x] No `src/app/page.tsx` exists
- [x] `http://localhost:3097/` redirects to `/en` (307)
- [x] `http://localhost:3097/en` renders with `<html lang="en">`
- [x] `http://localhost:3097/bg` renders with `<html lang="bg">`
- [x] `npm run build` completes with zero errors (both locales prerendered as SSG)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Moved proxy.ts from project root to src/proxy.ts**
- **Found during:** Task 2 verification
- **Issue:** Next.js 16 with `--src-dir` only watches `src/` for proxy.ts files. The file watcher's `getPossibleMiddlewareFilenames` function resolves to `path.join(appDir, '..')` which equals `src/`, not the project root. Root proxy.ts was silently ignored, causing the root `/` to return 404 instead of redirecting to `/en`.
- **Fix:** Moved proxy.ts to `src/proxy.ts` and updated import path from `./src/i18n/routing` to `./i18n/routing`.
- **Files modified:** proxy.ts (renamed to src/proxy.ts)
- **Commit:** 2be9aa3

**2. [Rule 1 - Bug] Changed useTranslations to getTranslations in async server component**
- **Found during:** Task 3 verification
- **Issue:** `useTranslations` throws "not callable within an async component" error in next-intl v4. The plan specified `useTranslations` but the page component is `async`.
- **Fix:** Replaced `useTranslations('HomePage')` with `await getTranslations({locale, namespace: 'HomePage'})` in page.tsx.
- **Files modified:** src/app/[locale]/page.tsx
- **Commit:** 2be9aa3

## Decisions Made

1. **Proxy.ts location**: Placed in `src/` directory instead of project root. Next.js 16 with `--src-dir` flag requires convention files (proxy.ts, instrumentation.ts) to be under the `src/` directory for the dev server file watcher to detect them.

2. **getTranslations in async components**: Used `getTranslations` (async, from `next-intl/server`) instead of `useTranslations` (hook) in async server components. `useTranslations` is reserved for synchronous server components and client components.

3. **Expanded proxy matcher**: Used array format `['/', '/(en|bg)/:path*', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'  ]` instead of single regex, ensuring explicit root path matching.

## Next Phase Readiness

The project is fully ready for Plan 03 (Language Switcher component):
- Navigation helpers (`Link`, `usePathname`, `useRouter`) are exported from `src/i18n/navigation.ts`
- Routing config with locale list is importable from `src/i18n/routing.ts`
- Both locale paths render correctly (`/en`, `/bg`)
- Message dictionaries include `LanguageSwitcher` namespace with locale display names
- `NextIntlClientProvider` wraps all content for client-side translation access
