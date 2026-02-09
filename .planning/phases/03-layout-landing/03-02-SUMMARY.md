# Phase 3 Plan 02: Layout Shell -- Header, Footer & Locale Layout Summary

**One-liner:** Sticky Header with desktop nav, mobile Sheet drawer, language switcher and CTA; 4-column async Footer with brand, product/company links, contact info and copyright; locale layout updated to wrap all pages in Header + main + Footer shell.

---

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 03-layout-landing |
| plan | 02 |
| subsystem | layout |
| tags | header, footer, navigation, mobile-menu, sheet, layout-shell, i18n |
| requires | Phase 1 (i18n, routing), Phase 2 (Logo, brand), 03-01 (Sheet component, translations, stub pages) |
| provides | Site-wide Header and Footer components, complete layout shell wrapping all pages |
| affects | 03-03 (Hero renders inside layout), 03-04 (Features/SocialProof/CTA render inside layout), all future pages |
| tech-stack.added | None (uses existing Sheet, Button, Logo, LanguageSwitcher) |
| tech-stack.patterns | Client component Header with useTranslations, async server Footer with getTranslations, server-renders-client pattern for LanguageSwitcher in Footer |
| duration | ~3 minutes |
| completed | 2026-02-09 |

---

## Key Files

### Created
- `src/components/layout/Header.tsx` -- Client component: sticky header with backdrop blur, logo, 6 desktop nav links, language switcher, "Request Demo" CTA, mobile Sheet drawer with hamburger trigger
- `src/components/layout/Footer.tsx` -- Async server component: 4-column grid (brand+tagline, product links, company links, contact info), bottom bar with copyright and secondary language switcher

### Modified
- `src/app/[locale]/layout.tsx` -- Replaced temporary inline header with Header + main + Footer composition; removed LanguageSwitcher direct import

---

## Task Results

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Create Header client component with desktop nav and mobile Sheet drawer | `76bb124` | Complete |
| 2 | Create Footer server component and update locale layout | `1f392a5` | Complete |

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| navLinks array extracted as const | DRY pattern: same link data used for desktop and mobile navigation in Header |
| Separate productLinks/companyLinks/legalLinks arrays in Footer | Clean separation of link groups, each with its own heading and styling section |
| SheetTitle with sr-only class | Radix Dialog requires an accessible title; sr-only hides it visually while keeping it for screen readers |

---

## Deviations from Plan

None -- plan executed exactly as written.

---

## Verification Results

- `npm run build` passes with 0 errors, 21 static pages generated
- Header.tsx is `'use client'` with sticky positioning and backdrop blur
- Desktop nav links hidden on mobile (`hidden md:flex`), mobile trigger hidden on desktop (`md:hidden`)
- Footer exports async server component using `getTranslations('Footer')`
- Locale layout renders `<Header />` + `<main>{children}</main>` + `<Footer />`
- No temporary header remains in locale layout
- LanguageSwitcher appears in both Header (desktop right side) and Footer (bottom bar)
- All 6 nav links in Header and all links in Footer point to existing stub pages

---

## Next Phase Readiness

**Blockers:** None

**Ready for:**
- 03-03: Hero section (layout shell in place, Hero translations ready, home page wrapped in Header + Footer)
- 03-04: Features, SocialProof, CTABanner landing page sections (all render inside layout shell)
