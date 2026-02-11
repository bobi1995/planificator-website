# Phase 9 Plan 02: MoFu Blog Content Batch 2 Summary

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 9 |
| plan | 02 |
| subsystem | blog-content |
| tags | mdx, blog, seo, content, mofu, gantt, changeover, ai-scheduling |
| requires | Phase 6 (blog infrastructure), Phase 8 (SEO metadata), 09-01 (ToFu content for cross-linking) |
| provides | 3 EN + 3 BG middle-of-funnel blog posts targeting solution-aware manufacturing scheduling keywords |
| affects | 09-03 (BoFu content), 09-04 (launch checklist) |
| tech-stack.added | None |
| tech-stack.patterns | MDX content with Callout components, comparison tables, internal cross-linking between posts |
| key-files.created | src/content/blog/en/gantt-charts-production-planning.mdx, src/content/blog/en/reduce-changeover-time-production.mdx, src/content/blog/en/ai-scheduling-vs-manual-planning.mdx, src/content/blog/bg/gantt-charts-production-planning.mdx, src/content/blog/bg/reduce-changeover-time-production.mdx, src/content/blog/bg/ai-scheduling-vs-manual-planning.mdx |
| key-files.modified | None |
| duration | ~11 minutes |
| completed | 2026-02-11 |

## One-liner

3 middle-of-funnel blog posts in EN + BG (Gantt chart essentials, changeover time reduction strategies, AI vs manual scheduling comparison) with Callout components, data tables, internal cross-links, and CTA links to features/contact/roi-calculator.

## What Was Done

### Task 1: Create 3 EN blog posts (MoFu + changeover batch)
- Created `gantt-charts-production-planning.mdx` (1,654 words) -- covers Gantt chart history (Henry Gantt, 1910s), manufacturing benefits (bottleneck ID, capacity visibility, conflict detection), static vs interactive comparison, key features checklist, Planifactor's animated chaos-to-order visualization
- Created `reduce-changeover-time-production.mdx` (1,776 words) -- defines changeover time with activity breakdown, quantifies impact with calculation table (10,000 hrs/yr example), covers SMED + scheduling connection, three strategies (campaign, attribute-based, due-date balancing), AI optimization section, measurement metrics
- Created `ai-scheduling-vs-manual-planning.mdx` (1,758 words) -- balanced comparison of manual vs AI approaches, four limitations of manual planning (combinatorial wall, bias, slow disruption response, knowledge concentration), clear definition of what AI scheduling actually does, 9-dimension comparison table, hybrid approach workflow, "when to consider" signals
- All posts use 2 Callout components each (info + tip or info + warning variants)
- Comparison tables in changeover post (impact calculation) and AI vs manual post (9-dimension comparison)
- Internal cross-links to production-scheduling-guide, ai-in-manufacturing, what-is-finite-capacity-scheduling
- CTA links to /en/features, /en/contact, /en/roi-calculator
- Commit: `e581c91`

### Task 2: Create 3 BG blog posts (MoFu + changeover batch)
- Created Bulgarian translations of all 3 posts with identical filenames (slugs)
- Naturally adapted content for Bulgarian manufacturing audience
- BG word counts: 1,612 / 1,801 / 1,735 (all 1,200+)
- Author set to "Ekip Planifactor" on all BG posts
- Tags use BG taxonomy equivalents (гант, планиране, производство, оптимизация, ai)
- All internal links use /bg/ prefix -- zero /en/ references
- Same Callout component usage and table structure as EN counterparts
- Commit: `90e8e4d`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| 2 Callouts per post (not 3) | Keeps callouts impactful; each post has info + tip or info + warning for variety |
| Detailed calculation table in changeover post | Manufacturing engineers appreciate concrete numbers; the 10,000 hrs/yr example makes the problem tangible |
| 9-dimension comparison table in AI vs manual post | Balanced presentation that does not oversell AI; includes "setup effort" and "cost" dimensions that favor manual planning |
| Link to what-is-finite-capacity-scheduling (future post exists from 09-01) | Cross-linking within blog content network; post already created by 09-01 plan |
| Staggered dates (Feb 8, 9, 10) | Continues natural publishing cadence from 09-01 batch (Feb 3, 5, 7) |

## Verification Results

| Check | Result |
|-------|--------|
| 3 EN files exist | PASS |
| 3 BG files exist | PASS |
| Filenames identical across locales | PASS |
| All frontmatter has 6 required fields | PASS |
| EN word counts (1,654 / 1,776 / 1,758) | PASS (all 1,200-1,800) |
| BG word counts (1,612 / 1,801 / 1,735) | PASS (all 1,200+) |
| No "Prefactor" in any file | PASS (0 occurrences) |
| No import statements | PASS |
| No /en/ links in BG posts | PASS (0 occurrences) |
| BG author is "Ekip Planifactor" | PASS |
| 2+ Callout components per post | PASS (2 each) |
| CTA links at end of each post | PASS |
| Dates staggered correctly | PASS (2026-02-08, 02-09, 02-10) |
| npm run build | PASS (clean build, no errors) |

## Deviations from Plan

None -- plan executed exactly as written.

## Next Phase Readiness

The 3 MoFu posts are live and rendering through existing blog infrastructure. Blog index now shows 10 posts per locale (2 seed + 3 from 09-01 + 2 from prior plan + 3 from 09-02). Tag filtering works with new and existing tags (gantt, optimization, ai in EN; гант, оптимизация, ai in BG). Plan 09-03 (BoFu content) can proceed to add bottom-of-funnel posts that complete the content funnel from awareness through consideration to decision.
