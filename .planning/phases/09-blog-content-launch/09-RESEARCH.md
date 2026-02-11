# Phase 9: Blog Content & Launch Polish - Research

**Researched:** 2026-02-11
**Domain:** SEO blog content strategy, competitor comparison pages, content structure, bilingual MDX content for B2B manufacturing SaaS
**Confidence:** HIGH

## Summary

Phase 9 is a pure content creation phase. All infrastructure is already built and verified: MDX rendering (next-mdx-remote-client/rsc), blog registry (getAllPosts, getPostsByTag, etc.), tag filtering, pagination, OG image generation, sitemap with blog entries, ArticleJsonLd structured data, and the Callout MDX component. The task is to write 8 new blog posts (6 topical + 2 comparison) in both EN and BG, using the existing YAML frontmatter format and content directory structure.

The existing 2 seed posts (production-scheduling-guide, ai-in-manufacturing) are approximately 400 words each -- too short for serious SEO. The new posts should target 1,200-2,000 words for topical articles and 1,500-2,500 words for comparison pages, which is the B2B SaaS SEO standard for ranking on informational and commercial-intent keywords.

**Key constraint:** Comparison pages are regular blog posts with the "comparison" tag, NOT separate page routes. The blog infrastructure already supports tag filtering, so `/blog?tag=comparison` will surface all comparison content. No new routes or components are needed.

**Primary recommendation:** Create 8 new posts (6 topical + 2 comparison) across both locales, targeting long-tail manufacturing scheduling keywords. Each post must include proper frontmatter, use the Callout component for key takeaways, and end with a CTA linking to /contact or /features. Parallelize by having independent posts written simultaneously -- there are zero code dependencies between MDX files.

## Blog Post Topics and Titles

### Recommended Post List (8 new posts)

Posts are organized by content funnel stage. All posts are in both EN and BG.

#### Top-of-Funnel (Educational / Awareness) -- 4 posts

| # | Slug | EN Title | Primary Keyword Target | Tags |
|---|------|----------|----------------------|------|
| 1 | `5-signs-you-outgrew-spreadsheet-scheduling` | "5 Signs You Have Outgrown Spreadsheet Scheduling" | "spreadsheet scheduling problems manufacturing" | scheduling, manufacturing, spreadsheets |
| 2 | `what-is-finite-capacity-scheduling` | "What Is Finite Capacity Scheduling? A Manufacturer's Guide" | "finite capacity scheduling" | scheduling, manufacturing, capacity-planning |
| 3 | `reduce-changeover-time-production` | "How to Reduce Changeover Time in Production Scheduling" | "reduce changeover time manufacturing" | optimization, manufacturing, scheduling |
| 4 | `production-scheduling-small-manufacturers` | "Production Scheduling for Small Manufacturers: Getting Started" | "production scheduling small manufacturer" | scheduling, manufacturing, getting-started |

#### Middle-of-Funnel (Solution-Aware) -- 2 posts

| # | Slug | EN Title | Primary Keyword Target | Tags |
|---|------|----------|----------------------|------|
| 5 | `gantt-charts-production-planning` | "Why Gantt Charts Are Essential for Production Planning" | "gantt chart production planning" | gantt, scheduling, manufacturing |
| 6 | `ai-scheduling-vs-manual-planning` | "AI Scheduling vs Manual Planning: What Manufacturers Need to Know" | "ai scheduling vs manual planning manufacturing" | ai, optimization, scheduling |

#### Bottom-of-Funnel (Comparison / Commercial Intent) -- 2 posts

| # | Slug | EN Title | Primary Keyword Target | Tags |
|---|------|----------|----------------------|------|
| 7 | `planifactor-vs-excel-scheduling` | "Planifactor vs Excel for Production Scheduling" | "production scheduling software vs excel" | comparison, scheduling, spreadsheets |
| 8 | `planifactor-vs-legacy-aps` | "Planifactor vs Legacy APS Systems: A Modern Alternative" | "modern aps software alternative preactor planettogether" | comparison, scheduling, aps |

### Why These Topics

1. **"5 Signs You Have Outgrown Spreadsheet Scheduling"** -- 80% of manufacturers still use Excel for scheduling (Fabrico research). This is the most relatable entry point. Captures search intent: "when to switch from Excel scheduling."

2. **"What Is Finite Capacity Scheduling?"** -- Core industry concept that production planners search for. Positions Planifactor as an authority. Educational content with high search volume in manufacturing vertical.

3. **"How to Reduce Changeover Time"** -- Direct pain point. Changeover reduction is one of Planifactor's key optimization features. Captures "reduce changeover time" searches.

4. **"Production Scheduling for Small Manufacturers"** -- Targets the Starter tier audience. Long-tail keyword with lower competition. Addresses the "where do I start?" question.

5. **"Why Gantt Charts Are Essential for Production Planning"** -- Directly showcases Planifactor's core visualization feature. PlanetTogether and Netronic already rank for similar content -- this puts Planifactor in the conversation.

6. **"AI Scheduling vs Manual Planning"** -- Bridges the existing seed post (ai-in-manufacturing) to a more commercial angle. Targets people already aware that AI scheduling exists.

7. **"Planifactor vs Excel"** -- The highest-intent comparison. Every manufacturer considering scheduling software searches for this. Plataine, Netronic, and others already publish similar content.

8. **"Planifactor vs Legacy APS"** -- Targets searches like "Preactor alternatives" and "PlanetTogether alternative." Positions Planifactor as the modern, accessible option compared to heavyweight APS systems (Opcenter/Preactor, PlanetTogether, Asprova).

### Posts NOT Recommended (and why)

- **"Top 10 Production Scheduling Software"** -- Listicles are saturated (ProjectManager, Fabrico, Capterra all rank). Low differentiation.
- **"Industry 4.0 Overview"** -- Too broad, not actionable, low conversion potential for Planifactor specifically.
- **"Supply Chain Optimization"** -- Outside Planifactor's core product scope. Stay focused on shop-floor scheduling.

## Competitor Comparison Targets

### Comparison Page 1: Planifactor vs Excel

**Why Excel:** The most universal "competitor." Every manufacturer knows Excel. This page captures the broadest audience of people considering their first scheduling tool.

**Content structure:**
1. Opening -- acknowledge Excel is fine for simple operations
2. Where Excel breaks down (5-10 resources, multi-shift, changeovers)
3. Side-by-side comparison table (feature matrix)
4. Real scenarios where Planifactor solves what Excel cannot
5. When to stay with Excel (self-qualifying honesty)
6. Migration path -- "how to move from Excel to Planifactor"
7. CTA -- Request a demo

**Key differentiators to highlight:**
- Visual Gantt timeline vs static cells
- Real-time conflict detection vs manual checking
- AI optimization vs human guesswork
- Multi-resource capacity planning vs single-sheet formulas
- Shift/break awareness vs manual calendar management

### Comparison Page 2: Planifactor vs Legacy APS Systems

**Why Legacy APS (not a single competitor):** Naming specific competitors like "Preactor" or "PlanetTogether" in URLs and titles risks:
- Legal trademark issues
- Attracting unqualified traffic looking for those specific products
- Needing to maintain accuracy as those products change

**Better framing:** "Legacy APS Systems" as a category -- covers Siemens Opcenter (Preactor), PlanetTogether, Asprova, and other traditional APS tools. Mention them by name in the body text for SEO capture, but position as a category comparison.

**Content structure:**
1. Opening -- what are legacy APS systems and who uses them
2. Common frustrations (complex implementation, expensive consultants, months-long deployment)
3. How modern cloud-native scheduling differs
4. Comparison table: Legacy APS vs Planifactor across key dimensions
5. When legacy APS makes sense (very large enterprises, deep ERP integration)
6. When Planifactor is the better fit (SMB, faster deployment, modern UX)
7. CTA -- See it in action

**Key differentiators to highlight:**
- Cloud-native vs on-premise installation
- Modern UI vs dated interfaces
- Minutes to set up vs months of implementation
- Transparent pricing vs consultant-dependent costs
- AI-first vs bolt-on optimization

## Content Structure Recommendations

### Target Length

| Content Type | Word Count (EN) | Estimated Reading Time |
|-------------|----------------|----------------------|
| Topical blog post | 1,200-1,800 words | 6-9 min |
| Comparison blog post | 1,800-2,500 words | 9-12 min |

**Rationale:** B2B SaaS SEO research consistently shows that 1,500+ word posts rank better for informational queries. However, manufacturing decision-makers value conciseness -- they are time-poor plant managers, not content browsers. Target the sweet spot: thorough but scannable.

### Standard Post Structure

Every blog post should follow this skeleton:

```markdown
---
title: "[Post Title]"
description: "[150-160 char meta description with primary keyword]"
date: "2026-02-[DD]"
author: "Planifactor Team"
tags: ["tag1", "tag2", "tag3"]
published: true
---

# [Post Title -- same as frontmatter title]

[Opening paragraph -- hook + problem statement, 2-3 sentences]

## [Section 1: Problem/Context]

[2-4 paragraphs establishing the problem]

<Callout type="info">
[Key statistic or insight the reader should remember]
</Callout>

## [Section 2: Core Content]

[Main educational/comparison content]

### [Subsection if needed]

[Details, examples, data]

## [Section 3: Solution / How Planifactor Helps]

[Connect the topic back to the product -- not a hard sell, but a natural mention]

<Callout type="tip">
[Actionable takeaway for the reader]
</Callout>

## [Section 4: Summary or Next Steps]

[Wrap up with key points]

[CTA paragraph with link to /contact or /features]
```

### Comparison Post Structure

Comparison posts follow a more specific structure:

```markdown
# Planifactor vs [Competitor/Category] for Production Scheduling

[Opening: frame the comparison honestly]

## Quick Comparison

| Feature | Planifactor | [Competitor] |
|---------|------------|--------------|
| ... | ... | ... |

## [Differentiator 1]

[Detailed explanation with context]

## [Differentiator 2-4]

...

## When [Competitor] Might Be the Better Choice

[Honest self-qualification -- builds trust]

## When to Choose Planifactor

[Core value proposition]

## Getting Started

[CTA with demo link]
```

### CTA Patterns

Every post should end with a contextual CTA. Use existing internal links:

- **Educational posts:** "See how Planifactor handles [topic] -- [explore our features](/en/features) or [request a demo](/en/contact)."
- **Comparison posts:** "Ready to see the difference? [Request a personalized demo](/en/contact) and we will show you how Planifactor handles your specific scheduling challenges."
- **How-to posts:** "Try our [ROI calculator](/en/roi-calculator) to estimate how much time you could save."

**Important:** Use locale-relative links like `/en/contact` or `/bg/contact` -- not hardcoded locale. The existing seed posts already use this pattern (e.g., `[Request a demo](/en/contact)`).

### Callout Usage Guidelines

The existing Callout component supports three types:
- `<Callout type="info">` -- Key statistics, industry data, definitions
- `<Callout type="tip">` -- Actionable advice, best practices
- `<Callout type="warning">` -- Common mistakes, pitfalls to avoid

**Recommended usage:** 2-3 callouts per post, no more. Use info for data points, tip for takeaways, warning sparingly (only in problem-focused posts).

## Tag Taxonomy

### Recommended Tags

Tags should be consistent across all posts and both languages. EN tags are used in frontmatter; BG posts use localized BG tags.

**EN Tags:**

| Tag | Description | Used By |
|-----|-------------|---------|
| `scheduling` | Core topic -- production scheduling concepts | Most posts |
| `manufacturing` | General manufacturing context | Most posts |
| `gantt` | Gantt chart visualization | Gantt-focused posts |
| `ai` | AI/ML optimization content | AI-focused posts |
| `optimization` | Schedule optimization, changeover reduction | Optimization posts |
| `comparison` | Competitor comparison content | Comparison posts only |
| `spreadsheets` | Excel/spreadsheet related | Excel comparison, outgrown-spreadsheets |
| `capacity-planning` | Finite capacity, resource planning | Capacity-focused posts |
| `getting-started` | Beginner-friendly, intro content | Onboarding-focused posts |
| `aps` | Advanced Planning & Scheduling systems | APS comparison post |

**BG Tags (localized equivalents):**

| EN Tag | BG Tag |
|--------|--------|
| scheduling | планиране |
| manufacturing | производство |
| gantt | гант |
| ai | ai |
| optimization | оптимизация |
| comparison | сравнение |
| spreadsheets | таблици |
| capacity-planning | планиране-на-капацитет |
| getting-started | начало |
| aps | aps |

**Note on existing seed post tags:**
- EN: `["scheduling", "manufacturing", "gantt"]` and `["ai", "manufacturing", "optimization"]`
- BG: `["планиране", "производство", "гант"]` and `["ai", "производство", "оптимизация"]`

The new tag taxonomy is backward-compatible with existing tags. No changes to seed posts needed.

## Content Creation Order and Parallelization Strategy

### Zero Code Dependencies

Every blog post is an independent `.mdx` file in `src/content/blog/{locale}/`. There are:
- No shared imports between posts
- No code changes needed (blog infrastructure is complete)
- No component changes needed
- No translation JSON changes needed (blog UI translations already exist)

This means **all posts can be created in parallel**.

### Recommended Plan Structure

**Plan 09-01: Topical Blog Posts (6 posts x 2 locales = 12 files)**

Create the 6 topical blog posts in both EN and BG. These are independent and can be written as a batch.

Files created:
- `src/content/blog/en/5-signs-you-outgrew-spreadsheet-scheduling.mdx`
- `src/content/blog/bg/5-signs-you-outgrew-spreadsheet-scheduling.mdx`
- `src/content/blog/en/what-is-finite-capacity-scheduling.mdx`
- `src/content/blog/bg/what-is-finite-capacity-scheduling.mdx`
- `src/content/blog/en/reduce-changeover-time-production.mdx`
- `src/content/blog/bg/reduce-changeover-time-production.mdx`
- `src/content/blog/en/production-scheduling-small-manufacturers.mdx`
- `src/content/blog/bg/production-scheduling-small-manufacturers.mdx`
- `src/content/blog/en/gantt-charts-production-planning.mdx`
- `src/content/blog/bg/gantt-charts-production-planning.mdx`
- `src/content/blog/en/ai-scheduling-vs-manual-planning.mdx`
- `src/content/blog/bg/ai-scheduling-vs-manual-planning.mdx`

**Plan 09-02: Comparison Blog Posts (2 posts x 2 locales = 4 files)**

Create the 2 comparison posts in both EN and BG. These are slightly different in structure (comparison tables, self-qualification sections) so they benefit from being a separate plan.

Files created:
- `src/content/blog/en/planifactor-vs-excel-scheduling.mdx`
- `src/content/blog/bg/planifactor-vs-excel-scheduling.mdx`
- `src/content/blog/en/planifactor-vs-legacy-aps.mdx`
- `src/content/blog/bg/planifactor-vs-legacy-aps.mdx`

### Parallelization Within Plans

Each plan can be executed by a single executor that writes all files sequentially (no conflicts -- every file is new). Alternatively, plans can be split further for parallel execution. However, since these are pure content files with no code dependencies, a single executor per plan is efficient.

**Plan 09-01 and 09-02 CAN run in parallel** -- they touch completely different files.

### Date Sequencing

To create a natural publication timeline, stagger dates across the posts:

| Post | Suggested Date |
|------|---------------|
| production-scheduling-guide (existing) | 2026-02-01 |
| ai-in-manufacturing (existing) | 2026-01-15 |
| production-scheduling-small-manufacturers | 2026-02-03 |
| what-is-finite-capacity-scheduling | 2026-02-05 |
| 5-signs-you-outgrew-spreadsheet-scheduling | 2026-02-07 |
| gantt-charts-production-planning | 2026-02-08 |
| reduce-changeover-time-production | 2026-02-09 |
| ai-scheduling-vs-manual-planning | 2026-02-10 |
| planifactor-vs-excel-scheduling | 2026-02-11 |
| planifactor-vs-legacy-aps | 2026-02-11 |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Blog page routes | New page routes for comparison pages | Existing blog infrastructure with `comparison` tag | Blog system already supports tag filtering; comparison posts are just blog posts |
| OG images for new posts | Custom OG image generation | Existing `opengraph-image.tsx` at `blog/[slug]/` | Already reads title/description from frontmatter automatically |
| Sitemap entries for new posts | Manual sitemap updates | Existing `sitemap.ts` | Already iterates `getAllPosts('en')` -- new posts are included automatically |
| RSS feed updates | Manual RSS changes | Existing `feed.xml/route.ts` | Already iterates all posts -- new posts are included automatically |
| Structured data | New JSON-LD components | Existing `ArticleJsonLd` on blog post page | Already reads from post metadata automatically |
| Tag filtering for comparison | Custom comparison page | `?tag=comparison` URL | Tag filtering already works via searchParams |

**Key insight:** This phase creates zero new code. Every file is a `.mdx` content file. The blog infrastructure from Phase 6 and SEO infrastructure from Phase 8 handle everything automatically.

## Common Pitfalls

### Pitfall 1: Inconsistent Frontmatter Format
**What goes wrong:** Missing required fields (title, description, date, author, tags) cause build errors or missing metadata.
**Why it happens:** Content files are not validated at write time -- errors only surface at build.
**How to avoid:** Every post MUST include all 6 frontmatter fields. Use the exact format from existing seed posts. Set `published: true` explicitly.
**Warning signs:** Build errors mentioning undefined properties in blog registry functions.

### Pitfall 2: BG Tags Not Matching EN Tags Semantically
**What goes wrong:** If BG posts use different tag strings than expected, tag filtering shows different results across locales.
**Why it happens:** Tags are locale-specific strings, not IDs. EN uses "scheduling", BG uses "планиране". They are independent.
**How to avoid:** Follow the tag taxonomy table exactly. Each EN tag has a fixed BG equivalent. Use the same number of tags per post across locales.
**Warning signs:** Different tag lists showing on EN vs BG blog index.

### Pitfall 3: Hardcoded Locale in Internal Links
**What goes wrong:** A BG post contains a link to `/en/contact` instead of `/bg/contact`.
**Why it happens:** Content is often written for EN first and translated, but internal links are not updated.
**How to avoid:** EN posts use `/en/...` links; BG posts use `/bg/...` links. Review all internal links in BG translations.
**Warning signs:** BG readers clicking a CTA and landing on an EN page.

### Pitfall 4: Slug Mismatch Between Locales
**What goes wrong:** EN file is `planifactor-vs-excel-scheduling.mdx` but BG file is `planifactor-vs-excel.mdx` -- different slug means sitemap hreflang alternates point to 404.
**Why it happens:** Slugs are derived from filenames. If filenames differ, they are treated as different posts.
**How to avoid:** Use IDENTICAL filenames (slugs) across `en/` and `bg/` directories. The slug is always English, even for BG posts.
**Warning signs:** Sitemap contains hreflang alternates pointing to nonexistent BG pages.

### Pitfall 5: Posts Too Short for SEO Value
**What goes wrong:** Posts under 800 words rarely rank for competitive B2B keywords.
**Why it happens:** Rushing content creation or treating blog posts as marketing copy rather than educational content.
**How to avoid:** Minimum 1,200 words for topical posts, 1,800 words for comparison posts. Include tables, callouts, and subsections to provide substantive depth.
**Warning signs:** Posts with reading time under 5 minutes.

### Pitfall 6: Missing Product Mentions
**What goes wrong:** Educational posts read like generic Wikipedia articles with no connection to Planifactor.
**Why it happens:** Over-correcting to avoid being "too salesy."
**How to avoid:** Every post should naturally mention Planifactor 2-4 times. Include at least one CTA at the end. The comparison posts obviously mention Planifactor throughout. Educational posts should reference Planifactor's specific feature that addresses the topic.
**Warning signs:** A reader finishes the post without knowing what Planifactor is.

### Pitfall 7: Brand Name Inconsistency
**What goes wrong:** Content uses "Prefactor" (old name) instead of "Planifactor."
**Why it happens:** Historical references or auto-complete in the editor.
**How to avoid:** Always use "Planifactor" (capital P). The comparison post slug uses "planifactor" (lowercase). The phase context explicitly states: "Brand name is now Planifactor (not Prefactor)."
**Warning signs:** Grep for "Prefactor" in all new content files.

## Architecture Patterns

### Pattern: Bilingual Content Pair
Every blog post consists of two files with identical slugs:
```
src/content/blog/en/{slug}.mdx   # English version
src/content/blog/bg/{slug}.mdx   # Bulgarian version
```

The BG version is NOT a machine translation of EN -- it should be naturally written Bulgarian content covering the same topic. However, it must have:
- Same slug (filename)
- Same tags (BG equivalents)
- Same author ("Planifactor Team" / "Ekip Planifactor")
- Same date
- Same `published: true`

### Pattern: Comparison Post as Regular Blog Post
```yaml
---
title: "Planifactor vs Excel for Production Scheduling"
description: "..."
date: "2026-02-11"
author: "Planifactor Team"
tags: ["comparison", "scheduling", "spreadsheets"]
published: true
---
```

The `comparison` tag is the only differentiator. The blog index at `/blog?tag=comparison` will filter to show only comparison content. No special routing or components needed.

### Anti-Patterns to Avoid
- **Creating separate `/compare/` routes:** The blog infrastructure handles this. Do not create `src/app/[locale]/compare/` or similar.
- **Adding new MDX components:** The existing Callout, h1/h2/h3, and prose styling are sufficient. Do not add new components in Phase 9.
- **Modifying blog.ts or page components:** Phase 9 is content-only. No code changes to the blog system.
- **Using images in MDX posts:** The current infrastructure does not serve blog-specific images (no `/public/images/blog/` directory). Posts should rely on text, tables, and Callout components. The `image` frontmatter field is optional and not used by seed posts.

## Code Examples

### Complete Frontmatter Example (EN)
```yaml
---
title: "5 Signs You Have Outgrown Spreadsheet Scheduling"
description: "Still using Excel for production scheduling? Here are five signs it is time to upgrade to dedicated scheduling software."
date: "2026-02-07"
author: "Planifactor Team"
tags: ["scheduling", "manufacturing", "spreadsheets"]
published: true
---
```

### Complete Frontmatter Example (BG)
```yaml
---
title: "5 признака, че сте надраснали планирането с таблици"
description: "Все още използвате Excel за производствено планиране? Ето пет признака, че е време за надграждане към специализиран софтуер за планиране."
date: "2026-02-07"
author: "Екип Planifactor"
tags: ["планиране", "производство", "таблици"]
published: true
---
```

### Comparison Table in MDX
```markdown
| Feature | Planifactor | Excel |
|---------|------------|-------|
| Visual Gantt timeline | Yes -- interactive drag-and-drop | No -- manual cell coloring |
| Conflict detection | Automatic, real-time | Manual checking |
| AI optimization | Built-in optimizer | Not available |
| Multi-shift awareness | Native shift management | Manual calendar overlays |
| Capacity planning | Automatic resource balancing | Formula-based (fragile) |
| Collaboration | Multi-user, cloud-based | Single file, version conflicts |
```

### CTA Pattern at End of Post
```markdown
## Getting Started

Ready to move beyond [spreadsheets / manual planning / legacy systems]?
Planifactor helps manufacturers of any size optimize their production scheduling
with AI-powered tools and visual Gantt charts.

[Request a demo](/en/contact) to see how it works with your data,
or [explore our features](/en/features) to learn more.
```

### Using Callout in Content
```markdown
<Callout type="info">
According to industry research, 80% of small and mid-size manufacturers still
rely on spreadsheets for production scheduling. The most common triggers for
switching are missed delivery deadlines and inability to handle multi-resource
constraints.
</Callout>
```

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Short 300-500 word blog posts | 1,200-2,500 word in-depth content | Google prioritizes comprehensive content for B2B queries |
| Separate comparison landing pages | Comparison blog posts with tag filtering | Simpler architecture, same SEO benefit, blog aggregation |
| Generic "vs" pages without self-qualification | Honest "when to choose the competitor" sections | Higher trust, better conversion -- the SaaS comparison page standard for 2026 |
| EN-only content | Bilingual EN+BG content with hreflang | EU market coverage, Bulgarian market differentiation |
| Keyword-stuffed meta descriptions | Natural 150-160 char descriptions with primary keyword | Google may rewrite stuffed descriptions; natural ones persist |

## Launch Polish Items (Beyond Blog Content)

Phase 9 is primarily blog content, but the following "launch polish" items should be verified:

1. **Verify all 10 posts appear in sitemap** -- After adding content, build and check `/sitemap.xml` includes all new blog post URLs with hreflang alternates.
2. **Verify RSS feed includes new posts** -- Check `/feed.xml` lists all EN posts.
3. **Verify OG images generate** -- Each new post should have an auto-generated OG image from the existing `opengraph-image.tsx`.
4. **Verify tag filtering** -- Confirm `/blog?tag=comparison` shows only the 2 comparison posts, and other tags filter correctly.
5. **Verify pagination** -- With 10 total posts (2 existing + 8 new) and 9 posts per page, pagination should show 2 pages.
6. **Cross-link audit** -- Ensure new posts link to each other and to existing seed posts where relevant. Internal linking improves SEO.

These verifications are done via `npm run build` -- no new code needed.

## Open Questions

1. **Bulgarian content quality**
   - What we know: The existing BG seed posts are grammatically correct and natural-sounding.
   - What's unclear: Whether AI-generated BG content will meet native speaker quality standards for 1,500+ word articles.
   - Recommendation: Write BG content as best-effort. Flag for native speaker review post-launch. The content structure (headings, tables, callouts) will be correct regardless of linguistic nuance.

2. **Internal linking strategy**
   - What we know: Seed posts link to `/contact` and `/features`. New posts should cross-link to each other.
   - What's unclear: Exactly which posts should link to which.
   - Recommendation: Each post should link to 1-2 other blog posts where relevant, plus the CTA links. The comparison posts should link to the related educational post (e.g., "vs Excel" links to "5 Signs You Outgrew Spreadsheets"). Plan should specify internal links per post.

3. **Future image support**
   - What we know: The `image` frontmatter field exists but is not used. No `public/images/blog/` directory exists.
   - What's unclear: Whether hero images for blog posts would improve SEO/engagement.
   - Recommendation: Defer to a future phase. Text-only posts are fine for launch. The OG images are auto-generated from titles.

## Sources

### Primary (HIGH confidence)
- Existing codebase inspection: `src/lib/blog.ts`, `src/content/blog/`, `src/app/[locale]/blog/`, `src/components/mdx/`, `src/app/sitemap.ts`
- Phase 6 Research (`06-RESEARCH.md`) -- Blog infrastructure decisions and patterns
- Phase 8 Research (`08-RESEARCH.md`) -- SEO infrastructure, OG images, sitemap, structured data

### Secondary (MEDIUM confidence)
- [B2B SaaS Comparison Pages Guide 2026](https://backstageseo.com/blog/b2b-comparison-pages/) -- Comparison page structure, H1 patterns, self-qualification sections
- [B2B Comparison Page Framework](https://www.getpassionfruit.com/blog/b2b-comparison-pages-and-alternatives-seo-framework-examples) -- URL structure, CTA placement, ROI data
- [Spreadsheets vs Advanced Scheduling](https://www.plataine.com/blog/spreadsheets-vs-advanced-planning-and-scheduling-software/) -- Competitor comparison content example
- [Excel vs Visual Scheduling](https://blog.netronic.com/excel-versus-visual-scheduling-for-business-central-manufacturing) -- Netronic comparison page example
- [Best Production Scheduling Software](https://www.fabrico.io/blog/best-production-scheduling-software/) -- 80% Excel statistic, competitor landscape
- [PlanetTogether Alternatives](https://sourceforge.net/software/product/PlanetTogether/alternatives) -- Competitor landscape
- [Opcenter APS Alternatives](https://www.capterra.com/p/36915/SIMATIC-IT-Preactor-APS/) -- Legacy APS competitor data
- [Content Ideas for Manufacturing](https://www.streamcreative.com/blog/50-content-ideas-examples-for-your-manufacturing-marketing-campaigns) -- Blog topic inspiration

### Tertiary (LOW confidence)
- Keyword search volume estimates -- Without access to Ahrefs/Semrush, specific volume data is not available. Topic selection is based on competitor content analysis and industry knowledge.
- BG search behavior -- No data on Bulgarian-language manufacturing scheduling searches. Content targets are based on EN keyword research.

## Metadata

**Confidence breakdown:**
- Blog post topics: HIGH -- Based on competitor content analysis, product feature alignment, and B2B SaaS SEO best practices
- Content structure: HIGH -- Follows established patterns from existing seed posts and industry comparison pages
- Tag taxonomy: HIGH -- Backward-compatible with existing tags, covers all planned content
- Comparison page approach: HIGH -- Confirmed by phase context that comparison pages are blog posts with "comparison" tag
- Parallelization strategy: HIGH -- MDX files have zero code dependencies
- Word count recommendations: MEDIUM -- Based on B2B SaaS content marketing research; no A/B testing data
- BG content quality: LOW -- AI-generated Bulgarian for 1,500+ word articles may need native review

**Research date:** 2026-02-11
**Valid until:** 2026-03-11 (content strategy, no external dependencies)
