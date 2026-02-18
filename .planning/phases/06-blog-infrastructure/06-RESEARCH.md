# Phase 6: Blog Infrastructure - Research

**Researched:** 2026-02-10
**Domain:** MDX blog system, content registry, pagination, tags, RSS feed, i18n blog content, typography
**Confidence:** HIGH

## Summary

Phase 6 replaces the "Coming Soon" blog stub page at `/[locale]/blog` with a fully operational MDX blog system. The prior decision (from STATE.md) to reject Contentlayer in favor of `@next/mdx` + `gray-matter` is the foundation. This research validates that approach and provides the specific implementation patterns for Next.js 16.1.6 with the existing next-intl i18n infrastructure.

**Two viable MDX approaches exist** for loading blog content from the filesystem:

1. **`@next/mdx` with dynamic imports** -- MDX files export metadata via `export const metadata = {...}`, loaded with `await import()`. Simpler, officially documented by Next.js.
2. **`next-mdx-remote-client/rsc`** (or `next-mdx-remote/rsc`) + `gray-matter` -- MDX files use YAML frontmatter, parsed by gray-matter, compiled by the remote MDX library. More flexible for content authoring (YAML frontmatter is the standard content authoring pattern).

**Recommendation: Approach 2 (gray-matter + next-mdx-remote-client/rsc)** because:
- YAML frontmatter is the universal standard for blog content. Content authors (including Phase 9) expect `---` frontmatter blocks, not JavaScript exports.
- gray-matter was explicitly chosen in the prior decision: "use @next/mdx + gray-matter."
- `next-mdx-remote-client` is the actively maintained successor to `next-mdx-remote` for React Server Components in App Router. It can be imported from `next-mdx-remote-client/rsc` for async server component rendering.
- No webpack/bundler changes needed -- content is compiled at request/build time, not through the bundler pipeline. This means `next.config.ts` does NOT need the `@next/mdx` plugin for blog content (the plugin is only needed for `.mdx` files used as pages via file-based routing).

**However**, there is also a simpler hybrid approach: use `@next/mdx` for the bundler pipeline (so MDX files can contain React components) but read frontmatter separately with gray-matter from the raw file content. The actual MDX rendering still uses dynamic `import()`. This avoids adding `next-mdx-remote-client` as a dependency entirely.

**Final recommendation: Hybrid approach** -- Use `@next/mdx` plugin in next.config.ts so MDX files get proper bundler treatment, use `gray-matter` to parse frontmatter from raw file content for the content registry (getAllPosts, getPostsByTag), and use `dynamic import()` to render individual posts. This aligns with the prior decision AND the official Next.js MDX guide pattern.

## New Packages Required

| Package | Version | Purpose | Confidence |
|---------|---------|---------|------------|
| `@next/mdx` | latest | Official Next.js MDX plugin -- enables `.mdx` file imports | HIGH |
| `@mdx-js/loader` | latest | Webpack loader for MDX (required by @next/mdx) | HIGH |
| `@mdx-js/react` | latest | React runtime for MDX components | HIGH |
| `@types/mdx` | latest | TypeScript types for MDX | HIGH |
| `gray-matter` | ^4.x | Parse YAML frontmatter from MDX files | HIGH |
| `@tailwindcss/typography` | latest | `prose` classes for beautiful blog post typography | HIGH |
| `feed` | ^5.2.0 | RSS/Atom/JSON feed generation | HIGH |
| `rehype-pretty-code` | latest | Syntax highlighting for code blocks (powered by Shiki) | MEDIUM |
| `shiki` | latest | VS Code-quality syntax highlighter (peer dep of rehype-pretty-code) | MEDIUM |
| `rehype-slug` | latest | Auto-generate heading IDs for anchor links | HIGH |
| `rehype-autolink-headings` | latest | Auto-add anchor links to headings | MEDIUM |
| `remark-gfm` | latest | GitHub Flavored Markdown support (tables, strikethrough, etc.) | HIGH |

**Not needed:**
- `next-mdx-remote` / `next-mdx-remote-client` -- dynamic `import()` is simpler and avoids an extra dependency. The official Next.js MDX guide recommends this approach.
- `contentlayer` / `contentlayer2` / `velite` -- the gray-matter + fs approach is sufficient and battle-tested.

## Architecture

### Content File Structure

Blog posts are organized by locale in a `content/blog/` directory at the project root (outside `src/`). Each locale has its own directory. Posts are MDX files with YAML frontmatter.

```
content/
  blog/
    en/
      production-scheduling-guide.mdx
      gantt-charts-explained.mdx
      ai-in-manufacturing.mdx
    bg/
      production-scheduling-guide.mdx
      gantt-charts-explained.mdx
      ai-in-manufacturing.mdx
```

**Why outside `src/`:** Content is not source code. Keeping it at the project root follows the established convention (Next.js portfolio starter kit, most MDX blog implementations) and makes the content directory easy to find for content authors.

**Why per-locale directories (not per-slug):** Each locale may have different posts (not every EN post needs a BG translation). The slug is the filename stem. A post exists in a locale only if the corresponding `.mdx` file exists.

**Alternative considered: content inside `src/content/`** -- This was shown in the initial ARCHITECTURE.md research. Either location works. The key requirement is that `fs.readdir` and `fs.readFile` can access the files at build time. Since the original architecture research showed `src/content/blog/`, we should follow that convention for consistency.

**Final decision: `src/content/blog/`** -- Consistent with ARCHITECTURE.md.

### Frontmatter Schema

```yaml
---
title: "The Complete Guide to Production Scheduling"
description: "Learn how modern manufacturers use Gantt charts and optimization to reduce planning time by up to 70%."
date: "2026-02-10"
author: "Planifactor Team"
tags: ["scheduling", "manufacturing", "gantt"]
image: "/images/blog/scheduling-guide.jpg"
published: true
---
```

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `title` | string | Yes | Post title, used in `<h1>` and `<title>` |
| `description` | string | Yes | Meta description, shown in post cards and OG tags |
| `date` | string (ISO 8601) | Yes | Publication date, used for sorting |
| `author` | string | Yes | Author name |
| `tags` | string[] | Yes | Category/tag labels for filtering |
| `image` | string | No | OG image path (optional, falls back to site default) |
| `published` | boolean | No | Defaults to `true`; set `false` to hide drafts |

### Content Registry (`src/lib/blog.ts`)

A utility module that reads MDX files from the filesystem, parses frontmatter with gray-matter, and provides query functions.

**Key functions:**

| Function | Signature | Purpose |
|----------|-----------|---------|
| `getAllPosts` | `(locale: string) => Promise<BlogPost[]>` | Returns all published posts for a locale, sorted by date descending |
| `getPostBySlug` | `(locale: string, slug: string) => Promise<BlogPost \| null>` | Returns a single post by slug |
| `getPostsByTag` | `(locale: string, tag: string) => Promise<BlogPost[]>` | Returns posts filtered by tag |
| `getAllTags` | `(locale: string) => Promise<string[]>` | Returns unique tags across all posts |
| `getPostSlugs` | `(locale: string) => Promise<string[]>` | Returns all valid slugs for generateStaticParams |

**Implementation pattern:**

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published?: boolean;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string; // raw MDX content (without frontmatter)
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export const getAllPosts = cache(async (locale: string): Promise<BlogPost[]> => {
  const dir = path.join(CONTENT_DIR, locale);
  const files = await fs.readdir(dir);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf-8');
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ''),
          meta: data as BlogPostMeta,
          content,
        };
      })
  );
  return posts
    .filter((p) => p.meta.published !== false)
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
});
```

**Key pattern: `cache()` from React** -- Wrapping with `cache()` ensures `getAllPosts()` is only called once per page build even if invoked in both `generateMetadata` and the page component. This is the same deduplication pattern recommended by the Next.js docs.

### MDX Rendering Approach

For rendering individual blog posts, use **dynamic `import()`** to load the compiled MDX component:

```typescript
// In the blog post page component
const { default: PostContent, metadata } = await import(
  `@/content/blog/${locale}/${slug}.mdx`
);

return <PostContent />;
```

This requires:
1. The `@next/mdx` plugin in `next.config.ts` so MDX files are processed by the bundler.
2. The `mdx-components.tsx` file in `src/` (required for App Router MDX support).
3. `pageExtensions` updated to include `'mdx'`.

**Important caveat with dynamic imports:** The path template literal MUST resolve to actual files at build time. With `generateStaticParams` returning all valid slugs, Next.js can statically analyze and bundle all MDX files.

**Alternative: next-mdx-remote-client/rsc** -- If dynamic `import()` proves problematic (e.g., bundler issues with the dynamic path), fall back to:

```typescript
import { MDXRemote } from 'next-mdx-remote-client/rsc';

// Read raw content from filesystem, compile at request time
return <MDXRemote source={content} components={mdxComponents} />;
```

This avoids the bundler entirely but means MDX components cannot import other modules.

### next.config.ts Changes

Chain the MDX plugin with the existing next-intl plugin:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [/* remark-gfm */],
    rehypePlugins: [/* rehype-slug, rehype-pretty-code */],
  },
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
```

**Plugin chaining order:** `withNextIntl(withMDX(nextConfig))` -- MDX processes first, then next-intl wraps.

### mdx-components.tsx

Required file at `src/mdx-components.tsx` (since we use `--src-dir`):

```typescript
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(): MDXComponents {
  return {
    // Custom component overrides for blog typography
    h1: ({ children }) => <h1 className="text-display mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-heading mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-subheading mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-body-lg mb-4">{children}</p>,
    // ... more overrides using brand typography scale
  };
}
```

### @tailwindcss/typography Integration

For Tailwind v4 CSS-first config, the typography plugin is added via CSS `@plugin` directive in `globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@plugin "@tailwindcss/typography";
```

Then blog post content is wrapped in `<article className="prose prose-lg max-w-none">`.

**Important for Tailwind v4:** The `@plugin` directive replaces the old `plugins: [require('@tailwindcss/typography')]` from tailwind.config.ts. This is the CSS-first approach consistent with the project's Tailwind v4 setup.

### Route Structure

```
src/app/[locale]/blog/
  page.tsx                    # Blog index (replaces stub)
  [slug]/
    page.tsx                  # Individual blog post
src/app/feed.xml/
  route.ts                    # RSS feed route handler
```

### Blog Index Page (`/[locale]/blog`)

**Features:**
- Lists all published posts for the current locale, sorted by date descending
- Pagination (if > N posts per page)
- Tag filter chips at the top
- Each post card shows: title, description, date, tags, read time estimate

**Pattern:**

```typescript
// src/app/[locale]/blog/page.tsx
import { getAllPosts, getAllTags } from '@/lib/blog';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function BlogIndexPage({ params, searchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  const posts = await getAllPosts(locale);
  const tags = await getAllTags(locale);
  // Optional: filter by tag from searchParams

  return (
    <>
      <BlogHero />
      <TagFilter tags={tags} />
      <PostGrid posts={posts} />
      <Pagination ... />
    </>
  );
}
```

**Tag filtering approach:** Use `searchParams` (e.g., `/blog?tag=scheduling`). This keeps the blog index at a single URL with filter state in the query string. Server component reads `searchParams` to filter posts. No client state needed.

**Pagination approach:** For a marketing blog starting with 5-10 posts (Phase 9), simple client-side "Show More" or static pagination is sufficient. If using static pagination with `/blog/page/[page]`, add a nested dynamic route. For initial launch, a single page listing all posts is acceptable since Phase 9 targets only 5-10 posts.

### Individual Blog Post Page (`/[locale]/blog/[slug]`)

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Return slugs for all locales
  const locales = ['en', 'bg'];
  const params = [];
  for (const locale of locales) {
    const slugs = await getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Planifactor`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      // images: post.meta.image ? [post.meta.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  // Dynamic import to render the MDX
  const { default: PostContent } = await import(
    `@/content/blog/${locale}/${slug}.mdx`
  );

  return (
    <article className="prose prose-lg max-w-3xl mx-auto py-16 px-4">
      <header>
        <h1>{post.meta.title}</h1>
        <time>{post.meta.date}</time>
        <div className="flex gap-2">{post.meta.tags.map(...)}</div>
      </header>
      <PostContent />
    </article>
  );
}

export const dynamicParams = false;
```

**Note on `generateStaticParams`:** The parent `[locale]` segment already handles locale enumeration. The child `[slug]` only needs to return `{ slug }` values. However, different locales may have different posts, so we need to enumerate per-locale slugs. The pattern from use-cases (Phase 5) handles this: the parent provides `locale`, the child provides `slug`.

### RSS Feed

Create an RSS feed at `/feed.xml` using a Route Handler:

```typescript
// src/app/feed.xml/route.ts
import { Feed } from 'feed';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const feed = new Feed({
    title: 'Planifactor Blog',
    description: 'Production scheduling insights for manufacturers',
    id: 'https://planifactor.com',
    link: 'https://planifactor.com/en/blog',
    language: 'en',
    copyright: `2026 Planifactor`,
  });

  const posts = await getAllPosts('en');

  for (const post of posts) {
    feed.addItem({
      title: post.meta.title,
      id: `https://planifactor.com/en/blog/${post.slug}`,
      link: `https://planifactor.com/en/blog/${post.slug}`,
      description: post.meta.description,
      date: new Date(post.meta.date),
      author: [{ name: post.meta.author }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
```

**Locale consideration for RSS:** Generate a single EN feed at `/feed.xml`. If BG feed is needed, add `/bg/feed.xml/route.ts` or use a query parameter. For MVP, EN-only RSS is sufficient.

### Translation Namespaces

New translation namespace needed: `BlogPage`

| Key | EN | BG |
|-----|----|----|
| `metaTitle` | "Blog" | "Блог" |
| `metaDescription` | "Insights on production scheduling..." | "..." |
| `heroTitle` | "Blog & Resources" | "Блог и ресурси" |
| `heroSubtitle` | "Insights on production scheduling..." | "..." |
| `allPosts` | "All Posts" | "Всички публикации" |
| `filterByTag` | "Filter by tag" | "Филтрирай по таг" |
| `readMore` | "Read more" | "Прочети повече" |
| `minRead` | "min read" | "мин четене" |
| `noPosts` | "No posts found" | "Няма намерени публикации" |
| `backToBlog` | "Back to Blog" | "Обратно към блога" |
| `publishedOn` | "Published on" | "Публикувано на" |
| `taggedWith` | "Tagged with" | "Тагове" |

**Estimated keys:** ~15-20 for BlogPage namespace. Post content itself is in MDX files, not translation JSON.

## Component Architecture

### New Components

| Component | Type | Location | Purpose |
|-----------|------|----------|---------|
| `BlogHero` | Server | `sections/blog/BlogHero.tsx` | Blog page hero (title, subtitle) |
| `PostCard` | Server | `sections/blog/PostCard.tsx` | Blog post card for index grid |
| `TagFilter` | Client | `sections/blog/TagFilter.tsx` | Tag chip filter (updates URL searchParams) |
| `PostHeader` | Server | `sections/blog/PostHeader.tsx` | Post page header (title, date, author, tags) |
| `Callout` | Server | `components/mdx/Callout.tsx` | Custom MDX callout/tip/warning box |

### Existing Components Reused

| Component | Where |
|-----------|-------|
| `CTABanner` | Bottom of blog index page |
| `Badge` | Tag chips on posts and filter |
| `Card` | Post card container |
| `Separator` | Between post header and content |

### Server vs Client Split

| Component | Type | Why |
|-----------|------|-----|
| BlogHero | Server | Pure translation content |
| PostCard | Server | Static rendered card |
| PostHeader | Server | Static post metadata display |
| TagFilter | **Client** | Needs URL navigation for tag filtering |
| Callout | Server | Pure visual component in MDX |
| Blog index page | Server | Reads filesystem, renders posts |
| Blog post page | Server | Dynamic import + render |

**Only TagFilter needs `'use client'`** -- it uses `useRouter`/`useSearchParams` from next/navigation to update the URL query parameter when a tag is clicked.

## i18n Integration

### Pattern: Locale-Specific Content Files

Blog posts are MDX files, NOT translation JSON keys. Each locale has its own set of MDX files in `src/content/blog/{locale}/`. This means:

- EN and BG can have completely different posts (not just translations)
- Some posts may exist only in one language
- The slug is the filename -- same slug in both locales means it is a translation pair
- UI chrome (button labels, headings, empty states) comes from the `BlogPage` translation namespace
- Post content comes from the MDX file itself

### Locale Routing

The existing `[locale]` segment handles locale routing automatically. Blog routes:
- `/en/blog` -- EN blog index
- `/en/blog/production-scheduling-guide` -- EN blog post
- `/bg/blog` -- BG blog index
- `/bg/blog/production-scheduling-guide` -- BG blog post

### Date Formatting

Use `next-intl`'s `useFormatter` or `format.dateTime()` for locale-aware date formatting on blog post dates.

## Typography & Styling

### Blog Post Typography

Use `@tailwindcss/typography` for the `prose` class. Customize to match brand:

```css
/* In globals.css or a blog-specific layout */
.prose {
  --tw-prose-body: var(--foreground);
  --tw-prose-headings: var(--foreground);
  --tw-prose-links: var(--color-brand-600);
  --tw-prose-bold: var(--foreground);
  --tw-prose-code: var(--color-brand-800);
  --tw-prose-pre-bg: var(--color-brand-950);
}
```

### Code Block Styling

`rehype-pretty-code` generates HTML with data attributes for styling. Add CSS for:
- Code block background color (brand-950 for dark code blocks)
- Line number styling
- Line highlighting
- Code title bar

Since the project is light-mode only, code blocks should use a dark theme for contrast (standard pattern).

## Pitfalls Specific to This Phase

### Pitfall 1: Dynamic Import Path Must Be Statically Analyzable

**What goes wrong:** `await import(\`@/content/blog/${locale}/${slug}.mdx\`)` fails at build time because the bundler cannot resolve the dynamic path.

**Prevention:** Ensure `generateStaticParams` returns all valid combinations so Next.js can pre-build all pages. Set `dynamicParams = false` to prevent runtime resolution. If issues persist, consider using `next-mdx-remote-client/rsc` as the fallback approach.

### Pitfall 2: mdx-components.tsx Location

**What goes wrong:** The `mdx-components.tsx` file is placed in the wrong directory and MDX rendering silently fails.

**Prevention:** Since this project uses `--src-dir`, the file goes in `src/mdx-components.tsx`. This is a required file for `@next/mdx` with App Router. Without it, MDX files will not render.

### Pitfall 3: Tailwind v4 Typography Plugin Import

**What goes wrong:** Trying to add `@tailwindcss/typography` via a `tailwind.config.ts` plugins array (which does not exist in this project).

**Prevention:** Use the CSS-first `@plugin "@tailwindcss/typography"` directive in `globals.css`. This is the Tailwind v4 way.

### Pitfall 4: @next/mdx Plugin Chaining with next-intl

**What goes wrong:** Incorrect plugin chaining in `next.config.ts` causes either MDX or i18n to break.

**Prevention:** Order matters. Apply `withMDX` first (inner), then `withNextIntl` (outer): `withNextIntl(withMDX(nextConfig))`. Both plugins modify the Next.js config object and return it. The inner plugin runs first.

### Pitfall 5: Content Directory Not Found at Build Time

**What goes wrong:** `fs.readdir('src/content/blog/en')` fails because the working directory is different at build time vs. dev time, or the path is relative.

**Prevention:** Always use `path.join(process.cwd(), 'src', 'content', 'blog')` for absolute paths. `process.cwd()` returns the project root in both dev and build.

### Pitfall 6: RSS Route Conflicts with i18n Middleware

**What goes wrong:** The next-intl middleware tries to redirect `/feed.xml` to `/en/feed.xml`.

**Prevention:** The existing proxy.ts matcher pattern already excludes paths with file extensions: `'/((?!api|trpc|_next|_vercel|.*\\..*).*)'`. The `.*\\..*` portion matches `feed.xml`, so it will NOT be processed by the i18n middleware. Verify this works.

### Pitfall 7: Empty Blog Index Before Phase 9

**What goes wrong:** Phase 6 builds the blog infrastructure but Phase 9 creates the actual content. The blog index will be empty or have only 1-2 seed posts.

**Prevention:** Create 1-2 seed blog posts as part of Phase 6 to validate the entire pipeline works end-to-end. These can be short placeholder posts. The "real" content comes in Phase 9.

### Pitfall 8: gray-matter + Dynamic Import Mismatch

**What goes wrong:** The content registry reads frontmatter with gray-matter (which strips frontmatter from content), but the dynamic `import()` reads the full MDX file (including frontmatter). If the MDX file uses `export const metadata = {...}` syntax, gray-matter cannot parse it. If it uses YAML frontmatter `---`, `@next/mdx` may not handle it correctly.

**Prevention:** Use `remark-frontmatter` plugin with `@next/mdx` so the bundler understands and strips YAML frontmatter. Without this plugin, the `---` frontmatter block causes a parse error. Install `remark-frontmatter` and add it to the remarkPlugins array in `next.config.ts`.

**Alternative:** If `remark-frontmatter` causes issues, use the `export const metadata = {...}` pattern in MDX files (JavaScript exports instead of YAML). gray-matter is not needed in this case -- metadata is extracted via dynamic `import()`.

**This is a critical decision point.** The two approaches are:

| Approach | Frontmatter | Parsing | MDX Rendering | Complexity |
|----------|------------|---------|---------------|------------|
| **A: YAML frontmatter** | `---` YAML block | gray-matter | Needs `remark-frontmatter` plugin | Medium |
| **B: JS exports** | `export const metadata = {...}` | Dynamic import | Native @next/mdx support | Low |

**Recommendation: Approach B (JS exports)** -- It is natively supported by `@next/mdx`, requires no extra plugins for frontmatter parsing, and the metadata is type-safe (it is JavaScript, not parsed YAML). gray-matter is still useful as a fallback or for initial content migration, but the primary pattern should use JS exports.

**Revised package list:** gray-matter becomes optional (nice to have for tooling/migration but not required for the core pipeline). `remark-frontmatter` is NOT needed if using JS exports.

## Revised Recommendation: JS Export Metadata Pattern

After deeper analysis, the recommended approach is:

### MDX File Format

```mdx
export const metadata = {
  title: "The Complete Guide to Production Scheduling",
  description: "Learn how modern manufacturers use Gantt charts...",
  date: "2026-02-10",
  author: "Planifactor Team",
  tags: ["scheduling", "manufacturing", "gantt"],
  image: "/images/blog/scheduling-guide.jpg",
};

# The Complete Guide to Production Scheduling

Production scheduling is the backbone of efficient manufacturing...
```

### Content Registry (Revised)

```typescript
// src/lib/blog.ts
import { cache } from 'react';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
}

// Manually maintain a registry of post slugs per locale
// OR use fs.readdir to discover them dynamically

export const getAllPosts = cache(async (locale: string): Promise<BlogPost[]> => {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`@/content/blog/${locale}/${slug}.mdx`);
      return { slug, meta: metadata as BlogPostMeta };
    })
  );
  return posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
});
```

**Getting slugs:** Use `fs.readdir` to list `.mdx` files in the locale directory. This works at build time (server-only code).

### Advantages of This Approach

1. No gray-matter dependency needed for the core pipeline
2. No remark-frontmatter plugin needed
3. Metadata is type-safe JavaScript (not parsed YAML)
4. Dynamic `import()` returns both the component AND the metadata
5. Fully supported by official Next.js MDX documentation
6. `@next/mdx` handles all compilation through the bundler

### Disadvantages

1. Content authors must write JavaScript exports (slightly less familiar than YAML frontmatter)
2. Cannot use gray-matter-based tooling without adaptation
3. Metadata must be a valid JavaScript expression (no comments, no trailing commas in some configs)

## Sizing Estimate

| Work Item | Complexity | Effort |
|-----------|-----------|--------|
| npm installs + next.config.ts changes | Low | Small |
| mdx-components.tsx + typography setup | Low | Small |
| Content registry (`src/lib/blog.ts`) | Medium | Medium |
| Blog index page + components | Medium | Medium |
| Blog post page + layout | Medium | Medium |
| Tag filtering (client component) | Low | Small |
| RSS feed route handler | Low | Small |
| Seed blog posts (1-2 per locale) | Low | Small |
| Translation keys (BlogPage namespace) | Low | Small |
| @tailwindcss/typography customization | Low | Small |

**Total new components:** ~5 (BlogHero, PostCard, TagFilter, PostHeader, Callout)
**Total new translation keys:** ~15-20 per locale
**Recommended plan count:** 2-3 plans

### Suggested Plan Split

1. **Plan 06-01: MDX Infrastructure Foundation** -- npm installs, next.config.ts update, mdx-components.tsx, @tailwindcss/typography, content directory structure, `src/lib/blog.ts` content registry, seed posts (1-2 per locale)
2. **Plan 06-02: Blog Pages & UI** -- Blog index page (replace stub), PostCard component, BlogHero, tag filtering, blog post page with [slug] routing, PostHeader, generateStaticParams, generateMetadata, translations
3. **Plan 06-03: RSS Feed & Polish** -- RSS feed route handler, Callout MDX component, code block styling, final typography tuning

**Alternative (2 plans):**
1. **Plan 06-01:** All MDX infrastructure + content registry + blog index page + tag filtering
2. **Plan 06-02:** Blog post page + RSS feed + MDX components + polish

## Open Questions

1. **Should gray-matter be included as a dependency?** It is not strictly needed with the JS export pattern but is useful for tooling and is listed in the prior decision. **Recommendation:** Include it. It costs nothing to have available and provides a migration path if YAML frontmatter is preferred later.

2. **How many seed blog posts?** Phase 9 will create 5-10 real posts. Phase 6 needs enough to validate the pipeline. **Recommendation:** 2 posts per locale (4 total). Topics: "What is Production Scheduling?" and "How AI Optimizes Manufacturing."

3. **Should tag filtering use searchParams or a separate route?** **Recommendation:** searchParams (`/blog?tag=scheduling`). Simpler, no additional routes needed, server component can read searchParams directly.

4. **Should pagination be implemented now or deferred to Phase 9?** **Recommendation:** Build the pagination infrastructure now (the component and logic) but with a high page size (e.g., 20). With 2 seed posts and 5-10 eventual posts, pagination will rarely trigger but the system will be ready.

5. **Code syntax highlighting: Is it needed for Phase 6?** Blog posts about production scheduling may not have code blocks. **Recommendation:** Install rehype-pretty-code but do not invest time in custom styling. Default styling is sufficient. Phase 9 content will determine if more customization is needed.

## Sources

### Primary (HIGH confidence)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) -- Official guide for @next/mdx with App Router
- [Next.js mdx-components.tsx API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components) -- Required file location and signature
- [Next.js Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) -- Official Vercel blog template pattern
- Existing codebase analysis (all patterns verified by reading actual source files)
- [feed npm package](https://www.npmjs.com/package/feed) -- v5.2.0, RSS/Atom/JSON feed generation
- [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) -- Prose classes, Tailwind v4 `@plugin` support

### Secondary (MEDIUM confidence)
- [Building a blog with Next.js App Router and MDX](https://www.alexchantastic.com/building-a-blog-with-next-and-mdx) -- Dynamic import pattern, pagination, categories
- [Building a blog with Next.js 15 and React Server Components](https://maxleiter.com/blog/build-a-blog-with-nextjs-13) -- gray-matter + cache() pattern
- [How to Add RSS Feed in Next.js App Router](https://spacejelly.dev/posts/how-to-add-a-sitemap-rss-feed-in-next-js-app-router) -- Route handler RSS pattern
- [rehype-pretty-code](https://rehype-pretty.pages.dev/) -- Syntax highlighting setup
- [next-mdx-remote-client](https://github.com/ipikuka/next-mdx-remote-client) -- Alternative RSC MDX rendering (evaluated, not recommended)
- [Deeper Dive: Vercel Portfolio Starter Kit](https://www.renjith.com/blog/02-deeper-dive-vercel-portfolio-starter-kit) -- getBlogPosts utility analysis

### Tertiary (LOW confidence)
- Bulgarian blog content quality: Will need native speaker review (same open TODO as previous phases)
- rehype-pretty-code theme compatibility with light-mode-only setup: Untested, may need custom CSS

## Metadata

**Confidence breakdown:**
- MDX infrastructure setup (next.config, mdx-components, plugin chaining): HIGH -- verified against official docs
- Content registry pattern (fs.readdir + dynamic import): HIGH -- established pattern, used by Vercel's own starter kit
- @tailwindcss/typography with Tailwind v4: HIGH -- documented `@plugin` directive
- RSS feed via Route Handler: HIGH -- standard Next.js App Router pattern
- Tag filtering with searchParams: HIGH -- native App Router feature
- Pagination: MEDIUM -- approach is straightforward but implementation details depend on post count
- Dynamic import path resolution for MDX: MEDIUM -- works in examples but may have edge cases with bundler analysis in Next.js 16
- next-intl integration with MDX content: HIGH -- MDX content is independent of next-intl; only UI chrome uses translations

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (no external dependency changes expected)
