# Phase 5 Plan 03: Pricing Page Summary

**One-liner:** Pricing page with 3 tier cards (Starter/Professional/Enterprise), 20-feature comparison table using t.raw() for booleans, FAQ accordion, and "Contact for Pricing" CTAs

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 05 |
| plan | 03 |
| subsystem | content-pages |
| tags | pricing, tiers, comparison-table, faq, accordion, shadcn, i18n, server-components |
| requires | Phase 3 (layout shell, CTABanner), Phase 2 (design tokens, brand colors), 05-01 (shadcn components) |
| provides | Pricing page, PricingHero, PricingTierCard, PricingComparisonTable, PricingFAQ components |
| affects | Phase 7 (ROI calculator may link from pricing), 05-04 (Contact page receives pricing CTAs) |
| tech-stack.added | None (reuses existing shadcn accordion, table, badge) |
| tech-stack.patterns | Tier card composition (page builds data from translations, passes as props), t.raw() for mixed boolean/string comparison data |
| duration | ~4 minutes |
| completed | 2026-02-10 |

## Key Files

| File | Status | Purpose |
|------|--------|---------|
| `messages/en.json` | Modified | Added PricingPage namespace (~110 keys) |
| `messages/bg.json` | Modified | Added PricingPage namespace (~110 keys, Bulgarian) |
| `src/components/sections/pricing/PricingHero.tsx` | Created | Async server component for hero section |
| `src/components/sections/pricing/PricingTierCard.tsx` | Created | Server component for individual tier card with badge |
| `src/components/sections/pricing/PricingComparisonTable.tsx` | Created | Async server component with shadcn Table, t.raw() |
| `src/components/sections/pricing/PricingFAQ.tsx` | Created | Client component with shadcn Accordion |
| `src/app/[locale]/pricing/page.tsx` | Replaced | Composition root replacing "Coming Soon" stub |

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| t.raw() for comparison booleans | next-intl 4.8.2 supports t.raw() to retrieve raw JSON values (true/false/string) without string coercion |
| PricingFAQ as client component | Accordion requires client-side state for open/close; receives pre-translated props from server page |
| PricingTierCard as server component | No interactivity needed; receives all data as props from parent page |
| Badge with absolute positioning | Floats "Most Popular" badge above card border using -top-3 + -translate-x-1/2 |
| No prices displayed | Per STATE.md decision: enterprise/consultative sales model, all CTAs link to /contact |

## Task Execution

### Task 1: Add PricingPage translations
- **Commit:** `ede5f64`
- Added PricingPage namespace to both en.json and bg.json
- ~110 translation keys per locale
- Includes: hero, 3 tiers with features, 4-category comparison table (20 features), 6 FAQ items
- JSON validity verified for both files

### Task 2: Create pricing components and replace page stub
- **Commit:** `f1bcf1a`
- Created 4 new components in src/components/sections/pricing/
- Replaced Coming Soon stub with full pricing page
- Professional tier highlighted with border-brand-600, shadow-lg, and "Most Popular" Badge
- Comparison table uses overflow-x-auto for mobile scroll
- Build verified with zero errors; both EN and BG locales generate correctly

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- [x] Both locale files parse without errors
- [x] PricingPage namespace exists in both files with hero, tiers (3), comparison (4 categories x 5 features), faq (6 items)
- [x] `npm run build` succeeds with zero errors
- [x] /en/pricing and /bg/pricing pages generated as static HTML
- [x] 3 tier cards: Starter, Professional (highlighted + badge), Enterprise
- [x] No price numbers; all CTAs link to /contact
- [x] Comparison table with checkmarks, X marks, and string values across 4 categories
- [x] FAQ accordion uses shadcn Accordion (client component)
- [x] generateMetadata returns localized title and description
- [x] CTABanner at bottom of page

## Next Phase Readiness

No blockers. The pricing page is complete and all CTAs correctly route to /contact (which will be built by 05-04). The comparison table data pattern using t.raw() could be reused if other pages need mixed boolean/string translation values.
