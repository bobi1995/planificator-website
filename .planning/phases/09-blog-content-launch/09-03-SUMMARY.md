# Phase 9 Plan 03: BoFu Comparison Blog Posts Summary

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 9 |
| plan | 03 |
| subsystem | blog-content |
| tags | mdx, blog, seo, content, bofu, comparison, manufacturing, scheduling |
| requires | Phase 6 (blog infrastructure), Phase 8 (SEO metadata), 09-01 (cross-linked posts) |
| provides | 2 EN + 2 BG bottom-of-funnel comparison blog posts with "comparison"/"сравнение" tag filtering |
| affects | 09-04 (launch checklist) |
| tech-stack.added | None |
| tech-stack.patterns | Long-form comparison posts with markdown tables, self-qualification sections, 3 Callout components per post |
| key-files.created | src/content/blog/en/planifactor-vs-excel-scheduling.mdx, src/content/blog/en/planifactor-vs-legacy-aps.mdx, src/content/blog/bg/planifactor-vs-excel-scheduling.mdx, src/content/blog/bg/planifactor-vs-legacy-aps.mdx |
| key-files.modified | None |
| duration | ~10 minutes |
| completed | 2026-02-11 |

## One-liner

2 bottom-of-funnel comparison posts in EN + BG (Planifactor vs Excel and Planifactor vs Legacy APS) with 10-row comparison tables, honest self-qualification sections, and "comparison" tag for blog filtering.

## What Was Done

### Task 1: Create 2 EN comparison blog posts (BoFu)
- Created `planifactor-vs-excel-scheduling.mdx` (1,923 words) -- honest comparison of Excel vs Planifactor for production scheduling, acknowledges Excel works for simple operations, 10-row comparison table, "Where Excel Works Well" and "When to Stay with Excel" self-qualification sections, optimization gap explanation, practical migration path
- Created `planifactor-vs-legacy-aps.mdx` (2,199 words) -- category comparison against legacy APS systems (Preactor, PlanetTogether, Asprova), 10-row comparison table, implementation timeline comparison (months vs days), "When Legacy APS Makes Sense" self-qualification, AI-first vs bolt-on optimization distinction
- Both posts include 3 Callout components (info, tip, warning), CTA to /en/contact, cross-links to related posts and /en/features

### Task 2: Create 2 BG comparison blog posts (BoFu)
- Created BG `planifactor-vs-excel-scheduling.mdx` (1,954 words) -- full Bulgarian translation with "сравнение" tag, comparison table with BG headers, all links using /bg/ prefix
- Created BG `planifactor-vs-legacy-aps.mdx` (2,291 words) -- full Bulgarian translation, proper nouns (Preactor, PlanetTogether, Asprova) preserved, all /bg/ links
- Both BG posts use "Екип Planifactor" author, identical slugs to EN counterparts, dates match EN

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Honest self-qualification in both posts | Saying "when to stay with Excel" and "when legacy APS makes sense" builds trust with B2B decision-makers evaluating options |
| 10-row comparison tables as visual centerpiece | Large tables provide scannable at-a-glance comparison that readers can screenshot/share |
| Category comparison for APS (not single-competitor attack) | Frames as "legacy APS vs modern" rather than attacking specific vendors -- more professional positioning |
| Cross-links to posts from other plans (09-01, 09-02) | Creates content web even though some target posts may not exist yet -- links will resolve when all plans complete |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- All 4 files exist in correct directories (2 EN, 2 BG)
- Filenames identical across en/ and bg/ directories
- `npm run build` passes with all 4 new posts rendered as SSG routes
- Zero "Prefactor" occurrences in any new file
- Both posts dated 2026-02-11
- "comparison" tag present in EN posts, "сравнение" tag present in BG posts
- Word counts: EN 1,923 + 2,199; BG 1,954 + 2,291 (all above 1,800 minimum)
- 3 Callout components per post (info, tip, warning)
- Self-qualification sections present in all 4 posts
- CTA links to /en/contact (EN) and /bg/contact (BG) confirmed
- No import statements in any file

## Commits

| Hash | Message |
|------|---------|
| 54c7ec4 | feat(09-03): create 2 EN comparison blog posts (BoFu) |
| 0abd4f0 | feat(09-03): create 2 BG comparison blog posts (BoFu) |
