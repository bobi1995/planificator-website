# Phase 9 Plan 01: ToFu Blog Content Batch 1 Summary

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 9 |
| plan | 01 |
| subsystem | blog-content |
| tags | mdx, blog, seo, content, tofu, manufacturing, scheduling |
| requires | Phase 6 (blog infrastructure), Phase 8 (SEO metadata) |
| provides | 3 EN + 3 BG educational blog posts targeting long-tail manufacturing scheduling keywords |
| affects | 09-02 (MoFu content), 09-03 (BoFu content), 09-04 (launch checklist) |
| tech-stack.added | None |
| tech-stack.patterns | MDX content with Callout components, internal cross-linking between posts |
| key-files.created | src/content/blog/en/production-scheduling-small-manufacturers.mdx, src/content/blog/en/what-is-finite-capacity-scheduling.mdx, src/content/blog/en/5-signs-you-outgrew-spreadsheet-scheduling.mdx, src/content/blog/bg/production-scheduling-small-manufacturers.mdx, src/content/blog/bg/what-is-finite-capacity-scheduling.mdx, src/content/blog/bg/5-signs-you-outgrew-spreadsheet-scheduling.mdx |
| key-files.modified | None |
| duration | ~10 minutes |
| completed | 2026-02-11 |

## One-liner

3 top-of-funnel educational blog posts in EN + BG (production scheduling for SMBs, finite capacity scheduling, outgrowing spreadsheets) with Callout components, internal cross-links, and CTA links.

## What Was Done

### Task 1: Create 3 EN topical blog posts
- Created `production-scheduling-small-manufacturers.mdx` (1525 words) -- targets small manufacturers considering their first scheduling tool, covers whiteboard-to-software progression, practical 5-step getting started guide
- Created `what-is-finite-capacity-scheduling.mdx` (1736 words) -- educational explainer of finite vs infinite capacity scheduling, practical example with two machines, Planifactor feature walkthrough
- Created `5-signs-you-outgrew-spreadsheet-scheduling.mdx` (1654 words) -- empathetic listicle for Excel users, covers 5 pain points with why-it-happens/what-tools-do-differently structure, honest self-qualification section
- All posts use 2 Callout components each (tip/info/warning variants), include comparison tables, end with contextual CTAs linking to /en/contact, /en/features, /en/roi-calculator
- Internal cross-links to existing posts (production-scheduling-guide, ai-in-manufacturing, planifactor-vs-excel-scheduling)
- Commit: `287ca52`

### Task 2: Create 3 BG topical blog posts
- Created Bulgarian translations of all 3 posts with identical filenames (slugs)
- Naturally adapted content for Bulgarian manufacturing audience (not mechanical translation)
- BG word counts: 1471, 1807, 1628 (all 1,200+)
- Author set to "Ekip Planifactor" on all BG posts
- Tags use BG taxonomy equivalents (планиране, производство, начало, планиране-на-капацитет, таблици)
- All internal links use /bg/ prefix -- zero /en/ references
- Same Callout component usage pattern as EN counterparts
- Commit: `bc1e988`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| 2 Callouts per post (not 3) | Keeps callouts impactful without overuse; each post has one info/tip and one warning/tip for variety |
| Honest self-qualification sections | "When Excel Is Still Fine" and similar sections build trust with B2B audience rather than overselling |
| Staggered dates (Feb 3, 5, 7) | Creates natural publishing cadence appearance for blog index |
| Cross-linking to future posts | Link to planifactor-vs-excel-scheduling uses relative format that will work once that post exists |

## Verification Results

| Check | Result |
|-------|--------|
| 3 EN files exist | PASS |
| 3 BG files exist | PASS |
| Filenames identical across locales | PASS |
| All frontmatter has 6 required fields | PASS |
| EN word counts (1525, 1736, 1654) | PASS (all 1,200-1,800) |
| BG word counts (1471, 1807, 1628) | PASS (all 1,200+) |
| No "Prefactor" in any file | PASS (0 occurrences) |
| No import statements | PASS |
| No /en/ links in BG posts | PASS (0 occurrences) |
| BG author is "Ekip Planifactor" | PASS |
| 2+ Callout components per post | PASS |
| CTA links at end of each post | PASS |
| Dates staggered correctly | PASS (2026-02-03, 02-05, 02-07) |
| npm run build | PASS (clean build, no errors) |

## Deviations from Plan

None -- plan executed exactly as written.

## Next Phase Readiness

The 3 ToFu posts are live and rendering through existing blog infrastructure. Tag filtering works with new tags (getting-started, capacity-planning, spreadsheets in EN; начало, планиране-на-капацитет, таблици in BG). Plan 09-02 (MoFu content) can proceed to add middle-of-funnel posts that complement these awareness-stage articles.
