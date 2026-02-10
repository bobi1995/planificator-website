# Phase 8 Plan 2: Page-Level Metadata, Plausible Analytics, and Structured Data Summary

**One-liner:** Plausible analytics via withPlausibleProxy + PlausibleProvider, title.template cascading from locale layout, alternates/openGraph on all 12 pages, Organization/SoftwareApplication/Article JSON-LD

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 8 |
| plan | 2 |
| subsystem | seo |
| tags | seo, metadata, plausible, analytics, structured-data, openGraph, alternates, hreflang |
| requires | Phase 1 (i18n routing), Plan 08-01 (SEO foundation utilities) |
| provides | Plausible analytics on every page, title.template cascading, alternates/hreflang on all pages, openGraph metadata, Organization/SoftwareApplication/Article structured data |
| affects | Plan 08-03 (OG images -- pages already have openGraph metadata to merge with), Plan 08-04 (analytics events -- PlausibleProvider already in layout) |
| tech-stack.added | none (next-plausible already installed in 08-01) |
| tech-stack.patterns | withPlausibleProxy config wrapping, PlausibleProvider in locale layout, title.template cascading for DRY page titles, buildAlternates helper for hreflang |
| completed | 2026-02-10 |
| duration | ~5 minutes |

## What Was Done

### Task 1: Wire Plausible Analytics and update locale layout with metadata cascading + structured data
- Updated `next.config.ts` with `withPlausibleProxy()` wrapping for ad-blocker bypass
- Added `PlausibleProvider domain="planifactor.com"` to locale layout as outermost wrapper around NextIntlClientProvider
- Added `generateMetadata` to locale layout with `metadataBase`, `title.template: '%s | Planifactor'`, `description`, `openGraph`, `twitter`, and `alternates`
- Added `OrganizationJsonLd` server component inside `<body>` but outside PlausibleProvider
- Added `ogDescription` key to Metadata namespace in both EN and BG translation files
- Updated BG Metadata title/description from English to Bulgarian translations

### Task 2: Enhance all 12 page files with complete SEO metadata
- **Home page**: `{ absolute: t('title') }` bypasses template, added SoftwareApplicationJsonLd structured data
- **Features, Use Cases index, Pricing, About, Blog index, Contact, ROI Calculator** (7 pages): removed manual `| Planifactor` suffix, added alternates + openGraph with type 'website'
- **Use Cases [slug]** (3 dynamic pages): dynamic alternates per slug, openGraph
- **Blog [slug]**: article-type openGraph with publishedTime/authors/tags, ArticleJsonLd structured data
- **Privacy, Terms**: removed manual suffix, added alternates
- All 12 pages now have `Promise<Metadata>` typed generateMetadata functions

## Key Files

### Modified
- `next.config.ts` -- withPlausibleProxy wrapping
- `src/app/[locale]/layout.tsx` -- PlausibleProvider, generateMetadata, OrganizationJsonLd
- `src/app/[locale]/page.tsx` -- absolute title, SoftwareApplicationJsonLd, alternates, openGraph
- `src/app/[locale]/features/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/use-cases/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/use-cases/[slug]/page.tsx` -- dynamic alternates, openGraph, no manual suffix
- `src/app/[locale]/pricing/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/about/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/blog/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/blog/[slug]/page.tsx` -- article openGraph, ArticleJsonLd, alternates
- `src/app/[locale]/contact/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/roi-calculator/page.tsx` -- alternates, openGraph, no manual suffix
- `src/app/[locale]/privacy/page.tsx` -- alternates, no manual suffix
- `src/app/[locale]/terms/page.tsx` -- alternates, no manual suffix
- `messages/en.json` -- ogDescription in Metadata namespace
- `messages/bg.json` -- Bulgarian Metadata translations + ogDescription

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| PlausibleProvider outside NextIntlClientProvider | Must be higher in tree to inject script tag properly; no dependency on intl context |
| OrganizationJsonLd outside PlausibleProvider | It's a server-rendered `<script>` tag, not visual content -- doesn't need provider context |
| Home page uses `{ absolute: t('title') }` | Bypasses title.template to show full brand title instead of "Home \| Planifactor" |
| Privacy/Terms no openGraph | Stub pages with minimal content; alternates sufficient for SEO |
| Blog [slug] openGraph type 'article' | Proper semantic type for blog posts; includes publishedTime and authors |
| BG Metadata translations updated | Previously had English strings in BG file; now properly localized |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Bulgarian Metadata namespace had English strings**
- **Found during:** Task 1 (translation file update)
- **Issue:** `messages/bg.json` Metadata namespace had English title and description instead of Bulgarian translations
- **Fix:** Updated to proper Bulgarian: "Planifactor - AI производствено планиране" for title, Bulgarian description and ogDescription
- **Files modified:** `messages/bg.json`
- **Commit:** 0d00eee

## Verification Results

All 6 verification checks passed:
1. PASS: `npm run build` completes with zero errors
2. PASS: No page title contains double "| Planifactor | Planifactor" (grep for `| Planifactor` in page files returns zero matches)
3. PASS: Every page has alternates with canonical + hreflang via buildAlternates helper
4. PASS: Plausible script loads via PlausibleProvider in locale layout
5. PASS: Organization JSON-LD on every page (layout), SoftwareApplication on home, Article on blog posts
6. PASS: openGraph metadata on all content pages

## Commits

| Hash | Message |
|------|---------|
| 0d00eee | feat(08-02): wire Plausible Analytics, metadata cascading, and Organization JSON-LD |
| 3d4544e | feat(08-02): add complete SEO metadata to all 12 page files |
