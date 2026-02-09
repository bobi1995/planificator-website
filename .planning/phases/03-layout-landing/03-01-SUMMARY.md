# Phase 3 Plan 01: Foundation -- shadcn Components, Translations & Stub Pages Summary

**One-liner:** Installed Sheet/Avatar components, added all Phase 3 translations (Hero, Features, SocialProof, CTABanner, Footer, StubPage), migrated HomePage to Hero namespace, and created 8 stub route pages for both locales.

---

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 03-layout-landing |
| plan | 01 |
| subsystem | foundation |
| tags | shadcn, translations, routing, i18n, stub-pages |
| requires | Phase 1 (i18n), Phase 2 (brand identity) |
| provides | UI components (Sheet, Avatar), translation content for all Phase 3 sections, stub pages for all navigation routes |
| affects | 03-02 (Header/Footer), 03-03 (Hero), 03-04 (Features/SocialProof/CTA) |
| tech-stack.added | Sheet (radix-ui Dialog-based), Avatar (radix-ui) |
| tech-stack.patterns | Stub page pattern with setRequestLocale + generateMetadata |
| duration | ~4 minutes |
| completed | 2026-02-09 |

---

## Key Files

### Created
- `src/components/ui/sheet.tsx` -- Sheet component (mobile nav drawer, Radix Dialog-based)
- `src/components/ui/avatar.tsx` -- Avatar component (testimonial photos, Radix Avatar-based)
- `src/app/[locale]/features/page.tsx` -- Features stub page
- `src/app/[locale]/use-cases/page.tsx` -- Use Cases stub page
- `src/app/[locale]/pricing/page.tsx` -- Pricing stub page
- `src/app/[locale]/about/page.tsx` -- About stub page
- `src/app/[locale]/blog/page.tsx` -- Blog stub page
- `src/app/[locale]/contact/page.tsx` -- Contact stub page
- `src/app/[locale]/privacy/page.tsx` -- Privacy Policy stub page
- `src/app/[locale]/terms/page.tsx` -- Terms of Service stub page

### Modified
- `messages/en.json` -- Added Hero, Features, SocialProof, CTABanner, Footer, StubPage namespaces; added Navigation.home; removed HomePage
- `messages/bg.json` -- Same namespace additions/removals as en.json with Bulgarian translations
- `src/app/[locale]/page.tsx` -- Migrated from HomePage to Hero namespace (headline/subtext keys)

---

## Task Results

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Install shadcn Sheet and Avatar components | `206ac0f` | Complete |
| 2 | Add all Phase 3 translation content | `c4604c4` | Complete |
| 3 | Create stub pages for all navigation routes | `cc3c9d3` | Complete |

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Migrated home page from HomePage to Hero namespace inline | Removing HomePage namespace without updating the page that references it would break the build (Rule 3 - blocking issue) |
| Privacy/Terms pages use Footer namespace for titles | These page names exist in the Footer namespace, not Navigation, matching the plan's instruction |
| Kept company names untranslated in BG | Proper nouns / brand names stay in English per plan specification |

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated home page to use Hero namespace**

- **Found during:** Task 2
- **Issue:** Plan instructs removing `HomePage` namespace from translation files, but the existing `src/app/[locale]/page.tsx` references `HomePage` namespace with `title` and `description` keys. Build would fail after removing the namespace.
- **Fix:** Updated home page to use `Hero` namespace with the new key names (`headline` instead of `title`, `subtext` instead of `description`). The `cta` and `ctaSecondary` keys remain unchanged.
- **Files modified:** `src/app/[locale]/page.tsx`
- **Commit:** `c4604c4` (included in Task 2 commit)

---

## Verification Results

- `npm run build` passes with 0 errors
- 21 static pages generated (home + 8 stubs x 2 locales + not-found + icon.svg)
- Both JSON files valid and contain all 10 required namespaces
- `HomePage` namespace successfully removed from both locale files
- Sheet and Avatar components import from unified `radix-ui` package (matching existing Button pattern)
- All 16 stub page routes render for both `/en/` and `/bg/` prefixes

---

## Next Phase Readiness

**Blockers:** None

**Ready for:**
- 03-02: Header and Footer layout components (Sheet component available, Footer translations ready, all navigation routes exist)
- 03-03: Hero section (Hero translations ready, home page already using Hero namespace)
- 03-04: Features, SocialProof, CTABanner sections (all translations ready, Avatar component available)
