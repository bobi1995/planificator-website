# Phase 6 Plan 01: MDX Infrastructure Foundation Summary

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 6 |
| plan | 01 |
| subsystem | blog |
| tags | mdx, typography, content-registry, gray-matter, tailwind-typography |
| requires | Phase 1 (i18n), Phase 2 (design tokens) |
| provides | Blog content registry, MDX component map, prose styling, seed posts |
| affects | 06-02 (blog routes), 06-03 (RSS feed), Phase 9 (blog content) |
| tech-stack.added | next-mdx-remote-client@2.1.7, gray-matter@4.0.3, @tailwindcss/typography@0.5.19, feed@5.2.0, remark-gfm@4.0.1, rehype-slug@6.0.0, rehype-pretty-code@0.14.1, shiki@3.22.0 |
| tech-stack.patterns | File-based content registry with React cache(), gray-matter frontmatter parsing, @plugin CSS-first typography config |
| key-files.created | src/lib/blog.ts, src/components/mdx/mdx-components.tsx, src/components/mdx/Callout.tsx, src/content/blog/en/production-scheduling-guide.mdx, src/content/blog/en/ai-in-manufacturing.mdx, src/content/blog/bg/production-scheduling-guide.mdx, src/content/blog/bg/ai-in-manufacturing.mdx |
| key-files.modified | package.json, package-lock.json, src/app/globals.css |
| duration | ~4 minutes |
| completed | 2026-02-10 |

## One-liner

File-based MDX blog infrastructure with gray-matter frontmatter parsing, Tailwind typography prose styling, Callout component, and 4 seed posts (2 EN, 2 BG).

## What Was Done

### Task 1: Install packages and configure Tailwind typography
- Installed 8 npm packages for blog infrastructure (next-mdx-remote-client, gray-matter, @tailwindcss/typography, feed, remark-gfm, rehype-slug, rehype-pretty-code, shiki)
- Added `@plugin "@tailwindcss/typography"` directive to globals.css (Tailwind v4 CSS-first approach)
- Added brand-consistent prose customizations: link color (brand-600), bullet color (brand-600), code block styling (brand-950 bg), quote border (brand-600)
- Created content directories: `src/content/blog/en/` and `src/content/blog/bg/`
- Commit: `1389fb7`

### Task 2: Create content registry, MDX components, and seed posts
- Created content registry (`src/lib/blog.ts`) with 6 exports: `getAllPosts`, `getPostBySlug`, `getPostsByTag`, `getAllTags`, `getPostSlugs`, `getReadingTime`
- All query functions wrapped with React `cache()` for request-level deduplication
- Created MDX component map (`src/components/mdx/mdx-components.tsx`) with brand typography heading overrides (h1/h2/h3) and `scroll-mt-20` for sticky header offset
- Created Callout component (`src/components/mdx/Callout.tsx`) with 3 variants: info (brand blue), warning (yellow), tip (green)
- Seeded 4 blog posts (2 per locale) with full frontmatter (title, description, date, author, tags, published) and Callout component usage
- Commit: `4d54774`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| next-mdx-remote-client over @next/mdx | Avoids bundler pipeline entirely -- no next.config.ts changes, no pageExtensions, RSC-compatible via /rsc import |
| React cache() on all query functions | Request-level deduplication -- same function called in generateMetadata and page component only reads disk once |
| Prose customizations as plain CSS | Tailwind v4 @plugin provides the prose classes; brand colors applied via CSS custom properties matching existing design tokens |
| not-prose on Callout component | Callout has its own styling that would conflict with prose typography defaults |

## Verification Results

| Check | Result |
|-------|--------|
| 8 packages installed | PASS |
| Typography plugin configured | PASS |
| Prose customizations exist | PASS |
| 6 blog.ts exports found | PASS |
| mdxComponents export exists | PASS |
| Callout 3 variants exist | PASS |
| 4 seed posts exist | PASS |
| Seed posts have valid frontmatter | PASS |
| Full production build | PASS (27 static pages, 0 errors) |

## Deviations from Plan

None -- plan executed exactly as written.

## Next Phase Readiness

The MDX infrastructure is ready for Plan 06-02 (blog routes) to build the `[slug]` detail page and blog index that use `getAllPosts`, `getPostBySlug`, and `next-mdx-remote-client/rsc` to render the seed posts. The prose styling will be visible once content is rendered inside a `<article className="prose">` wrapper.
