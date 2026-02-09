---
phase: 01-foundation-i18n
plan: 01
title: "Project Initialization & Toolchain"
subsystem: "build-toolchain"
tags: [nextjs, tailwind-v4, shadcn-ui, next-intl, typescript]

dependency-graph:
  requires: []
  provides:
    - "Running Next.js 16 project with Tailwind v4"
    - "shadcn/ui component system with new-york style"
    - "next-intl installed for i18n"
    - "Component directory conventions"
  affects:
    - "01-02 (i18n routing)"
    - "01-03 (language switcher)"
    - "All subsequent phases"

tech-stack:
  added:
    - "next@16.1.6"
    - "react@19.2.3"
    - "react-dom@19.2.3"
    - "next-intl@^4.8.2"
    - "tailwindcss@^4"
    - "@tailwindcss/postcss@^4"
    - "class-variance-authority@^0.7.1"
    - "clsx@^2.1.1"
    - "tailwind-merge@^3.4.0"
    - "radix-ui@^1.4.3"
    - "lucide-react@^0.563.0"
    - "tw-animate-css@^1.4.0"
    - "shadcn@^3.8.4"
    - "eslint@^9"
    - "eslint-config-next@16.1.6"
    - "typescript@^5"
  patterns:
    - "CSS-first Tailwind v4 configuration (no tailwind.config.ts)"
    - "shadcn/ui new-york style with neutral base color"
    - "App Router with src/ directory layout"
    - "@/* import alias for src/*"

key-files:
  created:
    - "package.json"
    - "tsconfig.json"
    - "next.config.ts"
    - "components.json"
    - "postcss.config.mjs"
    - "eslint.config.mjs"
    - ".gitignore"
    - "src/app/layout.tsx"
    - "src/app/page.tsx"
    - "src/app/globals.css"
    - "src/components/ui/button.tsx"
    - "src/lib/utils.ts"
    - "src/components/layout/.gitkeep"
    - "src/components/sections/.gitkeep"
    - "src/components/interactive/.gitkeep"
    - "src/i18n/.gitkeep"
    - "messages/.gitkeep"
  modified: []

decisions:
  - id: "tailwind-v4-css-first"
    decision: "Use Tailwind v4 CSS-first config, no tailwind.config.ts"
    rationale: "Tailwind v4 default; simpler, fewer files"
  - id: "shadcn-new-york"
    decision: "Use shadcn/ui new-york style"
    rationale: "Default style (old default deprecated in shadcn 3.x)"
  - id: "font-inter-deferred"
    decision: "Replaced Geist font references with Inter fallback, actual Inter font to be configured in Plan 02"
    rationale: "Plan 02 handles full i18n layout including font setup"

metrics:
  duration: "~9 minutes"
  completed: "2026-02-09"
  tasks: "2/2"
  commits: 2
---

# Phase 01 Plan 01: Project Initialization & Toolchain Summary

**One-liner:** Next.js 16.1.6 project with Tailwind v4 CSS-first config, shadcn/ui new-york style, and next-intl 4.8.2 installed.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create Next.js 16 project and install all dependencies | b8f14c3 | package.json, tsconfig.json, components.json, src/components/ui/button.tsx |
| 2 | Establish component directory structure and clean up scaffolded files | 61b479e | src/app/page.tsx, src/app/layout.tsx, src/app/globals.css, directory .gitkeep files |

## What Was Built

### Task 1: Full Project Scaffolding
- Scaffolded Next.js 16.1.6 with App Router, TypeScript, Turbopack, ESLint, and Tailwind CSS
- Initialized shadcn/ui with `new-york` style and `neutral` base color
- Added shadcn Button component as first UI component
- Installed next-intl 4.8.2 for internationalization support
- Verified: `npm run build` passes with zero errors

### Task 2: Directory Conventions and Cleanup
- Created component directory hierarchy:
  - `src/components/ui/` -- shadcn/ui generated components
  - `src/components/layout/` -- Layout components (Header, Footer, LanguageSwitcher)
  - `src/components/sections/` -- Server Components for page sections
  - `src/components/interactive/` -- Client Components with "use client"
  - `src/i18n/` -- next-intl configuration
  - `messages/` -- Translation JSON files
- Cleaned up scaffolded page to Prefactor placeholder
- Removed Geist font imports, updated font-sans CSS variable to Inter fallback
- Updated metadata to "Prefactor - Production Scheduling Software"

## Verification Results

- [x] `npm run dev` starts without errors on localhost:3000
- [x] `npm run build` completes with zero errors
- [x] `package.json` contains: next (16.1.6), react (19.2.3), next-intl (^4.8.2), tailwindcss (^4)
- [x] `components.json` exists with `style: "new-york"`
- [x] `src/components/ui/button.tsx` exists (shadcn Button, 64 lines)
- [x] `src/lib/utils.ts` exists with `cn()` function using clsx
- [x] All directories exist: layout/, sections/, interactive/, i18n/, messages/
- [x] No `middleware.ts` file exists
- [x] No `tailwind.config.ts` or `tailwind.config.js` exists
- [x] `src/app/globals.css` uses `@import "tailwindcss"` (Tailwind v4 CSS-first)

## Deviations from Plan

None -- plan executed exactly as written.

**Notes:**
- `create-next-app` required temporarily moving existing planning files out of the directory (conflicts with non-empty directory). Files were restored after scaffolding.
- The `--style` flag was removed from shadcn CLI v3.8.4 (new-york is now the only/default style). Used `--defaults` flag instead.
- React version is 19.2.3 (not 19.2.4 as in research) -- this is the latest available version via create-next-app@16.

## Decisions Made

1. **Tailwind v4 CSS-first**: No `tailwind.config.ts` created. All theme configuration lives in `globals.css` via `@theme inline` block.
2. **shadcn new-york style**: Confirmed as default in shadcn 3.8.4 (`--style` flag removed; new-york is the only style).
3. **Font deferred**: Replaced Geist font references with `var(--font-inter)` fallback chain. Actual Inter font loading will be configured in Plan 02 when layout is restructured for i18n.

## Next Phase Readiness

The project is fully ready for Plan 02 (i18n routing with next-intl):
- next-intl is installed
- `src/i18n/` directory exists for configuration files
- `messages/` directory exists for translation JSONs
- Layout is minimal and ready to be wrapped with i18n providers
- No middleware.ts exists (Next.js 16 uses proxy.ts, to be created in Plan 02)
