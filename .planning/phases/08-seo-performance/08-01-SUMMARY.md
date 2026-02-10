# Phase 8 Plan 1: SEO Foundation Utilities, Sitemap, and Robots.txt Summary

**One-liner:** Shared SEO modules (constants, metadata helpers, structured data, OG template, analytics types) plus dynamic sitemap.xml and robots.txt

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 8 |
| plan | 1 |
| subsystem | seo |
| tags | seo, sitemap, robots, structured-data, og-image, plausible, metadata |
| requires | Phase 1 (i18n routing), Phase 6 (blog infrastructure for sitemap blog entries) |
| provides | SITE_URL constant, buildAlternates helper, JSON-LD components, OG image template, PlausibleEvents type, /sitemap.xml, /robots.txt |
| affects | Plans 08-02 (page metadata), 08-03 (OG images), 08-04 (analytics integration) |
| tech-stack.added | next-plausible, schema-dts |
| tech-stack.patterns | Shared constants module, XSS-safe JSON-LD rendering via dangerouslySetInnerHTML with escaped output |
| completed | 2026-02-10 |
| duration | ~4 minutes |

## What Was Done

### Task 1: Install packages and create shared utility modules
- Installed 2 packages: `next-plausible` (analytics integration) and `schema-dts` (typed structured data)
- Created `src/lib/constants.ts` with SITE_URL (env-aware with fallback) and SITE_NAME
- Created `src/lib/metadata.ts` with `buildAlternates()` helper for locale-aware canonical/alternate URLs
- Created `src/lib/structured-data.tsx` with 3 JSON-LD server components (Organization, SoftwareApplication, Article) -- all XSS-safe
- Created `src/lib/og-image.tsx` with `createOgImageElement()` satori-compatible JSX template (1200x630, brand gradient)
- Created `src/lib/analytics.ts` with `PlausibleEvents` type mapping for 4 custom events
- Note: structured-data uses JSX so file extension is `.tsx` (not `.ts` as originally planned)

### Task 2: Create dynamic sitemap and robots.txt
- Created `src/app/sitemap.ts` with 13 static page entries + dynamic blog post entries
- Each entry has `xhtml:link` alternates for both `en` and `bg` locales
- Blog posts use their published date as `lastModified`
- Created `src/app/robots.ts` allowing all crawlers with sitemap reference
- Verified both endpoints serve correct content via production build + curl

## Key Files

### Created
- `src/lib/constants.ts` -- SITE_URL and SITE_NAME shared constants
- `src/lib/metadata.ts` -- buildAlternates() for generateMetadata
- `src/lib/structured-data.tsx` -- OrganizationJsonLd, SoftwareApplicationJsonLd, ArticleJsonLd
- `src/lib/og-image.tsx` -- createOgImageElement() satori JSX template, OG_SIZE, OG_CONTENT_TYPE
- `src/lib/analytics.ts` -- PlausibleEvents type definition
- `src/app/sitemap.ts` -- Dynamic sitemap with 15 entries (13 static + 2 blog)
- `src/app/robots.ts` -- robots.txt with allow-all + sitemap reference

### Modified
- `package.json` -- added next-plausible, schema-dts dependencies

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| structured-data.tsx (not .ts) | File uses JSX for `<script>` tags; TypeScript requires .tsx extension |
| XSS prevention via `\\u003c` replacement | JSON.stringify output in `<script>` tags must escape `<` to prevent injection |
| EN canonical URLs in sitemap | English is default locale; alternates provide bg URLs |
| safeJsonLd helper function | DRY pattern used by all 3 JSON-LD components for consistent XSS escaping |
| `createOgImageElement` returns JSX (not component) | Matches satori/ImageResponse API which expects JSX elements, not component instances |
| Types-only analytics file | Runtime analytics integration deferred to Plan 08-04; types ready for consumption now |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Renamed structured-data.ts to structured-data.tsx**
- **Found during:** Task 1 (type-check verification)
- **Issue:** `src/lib/structured-data.ts` contains JSX syntax (`<script>` elements) which requires `.tsx` extension
- **Fix:** Renamed file to `structured-data.tsx`
- **Files modified:** `src/lib/structured-data.tsx`
- **Commit:** 240dc66

## Notes for Future Plans

- `src/app/feed.xml/route.ts` still has a hardcoded `SITE_URL` -- could be refactored to import from `src/lib/constants.ts` in a future cleanup
- Sitemap currently includes all static pages; if more pages are added, update the `STATIC_PAGES` array in `src/app/sitemap.ts`

## Verification Results

All 5 verification checks passed:
1. PASS: `npm run build` completes with zero errors (36 static pages)
2. PASS: `npx tsc --noEmit` passes with zero type errors
3. PASS: `/sitemap.xml` returns valid XML with 15 entries, each with en/bg hreflang alternates
4. PASS: `/robots.txt` returns `User-Agent: *`, `Allow: /`, `Sitemap: https://planifactor.com/sitemap.xml`
5. PASS: All 10 shared utility exports verified (SITE_URL, SITE_NAME, buildAlternates, OrganizationJsonLd, SoftwareApplicationJsonLd, ArticleJsonLd, createOgImageElement, OG_SIZE, OG_CONTENT_TYPE, PlausibleEvents)

## Commits

| Hash | Message |
|------|---------|
| 240dc66 | feat(08-01): add shared SEO utility modules and install packages |
| b0453d7 | feat(08-01): add dynamic sitemap.xml and robots.txt |
