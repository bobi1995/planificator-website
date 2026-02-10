# Phase 8: SEO & Performance - Research

**Researched:** 2026-02-10
**Domain:** SEO infrastructure, metadata, analytics, Core Web Vitals, OG images
**Confidence:** HIGH

## Summary

Phase 8 covers four primary areas: (1) SEO infrastructure (sitemap, robots.txt, metadata cascading, structured data), (2) Plausible Analytics integration, (3) performance optimization for Core Web Vitals, and (4) Open Graph image generation. The Next.js 16 App Router provides built-in file conventions for sitemap, robots, and OG images that eliminate the need for third-party libraries. Plausible Analytics integrates via the `next-plausible` package (v3.12.5), which is cookieless by design and requires no consent banner. JSON-LD structured data uses the recommended `<script>` tag pattern with `dangerouslySetInnerHTML`.

The existing codebase already has `generateMetadata` on all 12 page files, but they only set `title` and `description` -- missing `alternates`, `openGraph`, `twitter`, and structured data. The locale layout has no `metadataBase` set. No `sitemap.ts`, `robots.ts`, or `opengraph-image.tsx` files exist yet. The `getPathname` function from `next-intl/navigation` is already exported and available for building locale-aware URLs.

**Primary recommendation:** Use Next.js built-in file conventions (sitemap.ts, robots.ts, opengraph-image.tsx) rather than third-party libraries. Set `metadataBase` in the locale layout and use `title.template` for consistent title formatting. Add Plausible via `next-plausible` with proxy for ad-blocker bypass.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` (built-in) | 16.1.6 | sitemap.ts, robots.ts, opengraph-image.tsx, generateMetadata, ImageResponse | Native file conventions, zero dependencies, type-safe MetadataRoute types |
| `next-plausible` | ^3.12.5 | Plausible Analytics integration | Official recommended integration by Plausible, provides PlausibleProvider + usePlausible hook + withPlausibleProxy |
| `schema-dts` | ^1.1.5 | TypeScript types for JSON-LD structured data | Google-maintained, provides WithContext<T> type for type-safe Schema.org JSON-LD |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/og` (built-in) | 16.1.6 | ImageResponse constructor for OG images | Generating dynamic OG images with JSX/CSS |
| `@next/bundle-analyzer` | ^16.1.6 | Webpack bundle visualization | Performance debugging if Lighthouse scores are low |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Built-in sitemap.ts | next-sitemap | next-sitemap is unnecessary -- App Router built-in is simpler, zero-config |
| Built-in opengraph-image.tsx | @vercel/og directly | next/og wraps @vercel/og already; direct use adds complexity |
| next-plausible | Manual script tag | Lose proxy support, custom events hook, and TypeScript types |
| schema-dts | Manual typing | Lose compile-time validation of Schema.org structures |

**Installation:**
```bash
npm install next-plausible schema-dts
```

## Architecture Patterns

### Recommended File Structure
```
src/app/
  sitemap.ts                    # Dynamic sitemap with hreflang alternates
  robots.ts                     # Dynamic robots.txt pointing to sitemap
  [locale]/
    layout.tsx                  # metadataBase + title.template + PlausibleProvider + JSON-LD Organization
    page.tsx                    # Enhanced generateMetadata + JSON-LD SoftwareApplication
    opengraph-image.tsx         # Default OG image for locale root
    features/
      page.tsx                  # Enhanced metadata
      opengraph-image.tsx       # Features-specific OG image
    blog/
      [slug]/
        page.tsx                # Enhanced metadata with article type
        opengraph-image.tsx     # Blog post-specific OG image with title
    use-cases/
      [slug]/
        page.tsx                # Enhanced metadata
        opengraph-image.tsx     # Use-case specific OG image
    pricing/
      page.tsx                  # Enhanced metadata
    about/
      page.tsx                  # Enhanced metadata
    contact/
      page.tsx                  # Enhanced metadata
    roi-calculator/
      page.tsx                  # Enhanced metadata
    privacy/
      page.tsx                  # Enhanced metadata + robots noindex consideration
    terms/
      page.tsx                  # Enhanced metadata + robots noindex consideration
src/lib/
  metadata.ts                   # Shared metadata helpers (getBaseUrl, buildAlternates)
  structured-data.ts            # JSON-LD builder functions (Organization, SoftwareApplication, Article)
next.config.ts                  # Add withPlausibleProxy wrapping
```

### Pattern 1: Metadata Cascading with title.template
**What:** Set `metadataBase` and `title.template` in the locale layout so child pages only need to set their own title string.
**When to use:** Always -- this is the foundation pattern.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';

const SITE_URL = 'https://planifactor.com';

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),          // fallback: "Planifactor - AI production scheduling"
      template: '%s | Planifactor',  // child pages: "Features | Planifactor"
    },
    description: t('description'),
    openGraph: {
      siteName: 'Planifactor',
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        bg: `${SITE_URL}/bg`,
      },
    },
  };
}
```

### Pattern 2: Locale-Aware Sitemap with Alternates
**What:** Single sitemap.ts at app root that enumerates all pages with hreflang alternates for both locales.
**When to use:** Always -- sitemap must be outside [locale] segment.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = 'https://planifactor.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/features', '/use-cases', '/pricing', '/about',
    '/blog', '/contact', '/roi-calculator', '/privacy', '/terms',
    '/use-cases/discrete-manufacturing', '/use-cases/job-shops',
    '/use-cases/production-planning',
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}/en${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
      ),
    },
  }));

  // Blog posts
  const enPosts = await getAllPosts('en');
  const blogEntries = enPosts.map((post) => ({
    url: `${SITE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.meta.date),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}/blog/${post.slug}`])
      ),
    },
  }));

  return [...staticEntries, ...blogEntries];
}
```

### Pattern 3: Dynamic OG Image with Brand Design
**What:** Use ImageResponse from next/og to generate branded OG images per route segment.
**When to use:** For pages that need unique social sharing images.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
// src/app/[locale]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Planifactor';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          color: 'white',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, marginBottom: 16 }}>
          Planifactor
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, opacity: 0.9, textAlign: 'center', maxWidth: 800, padding: '0 40px' }}>
          {t('description')}
        </div>
      </div>
    ),
    { ...size }
  );
}
```

### Pattern 4: JSON-LD Structured Data
**What:** Embed Schema.org JSON-LD via script tags in server components.
**When to use:** Organization schema in layout, Product/SoftwareApplication on landing, Article on blog posts.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
import { Organization, WithContext } from 'schema-dts';

const SITE_URL = 'https://planifactor.com';

export function OrganizationJsonLd() {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Planifactor',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: 'AI-powered production scheduling platform',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}
```

### Pattern 5: Plausible with Proxy (Ad-Blocker Bypass)
**What:** Wrap next.config.ts with withPlausibleProxy and add PlausibleProvider in locale layout.
**When to use:** Always -- proxy prevents ad-blockers from blocking analytics.
**Example:**
```typescript
// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withPlausibleProxy } from 'next-plausible';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withPlausibleProxy()(withNextIntl(nextConfig));
```

```typescript
// src/app/[locale]/layout.tsx (add inside <body>)
import PlausibleProvider from 'next-plausible';

// Inside the JSX:
<PlausibleProvider domain="planifactor.com">
  <NextIntlClientProvider>
    {/* ... existing content ... */}
  </NextIntlClientProvider>
</PlausibleProvider>
```

### Pattern 6: Custom Event Tracking
**What:** Track conversion events (demo button clicks) using usePlausible hook.
**When to use:** On CTA buttons and key conversion points.
**Example:**
```typescript
'use client';
import { usePlausible } from 'next-plausible';

export function DemoButton() {
  const plausible = usePlausible();

  return (
    <button onClick={() => plausible('Demo Request Click')}>
      Request Demo
    </button>
  );
}
```

### Anti-Patterns to Avoid
- **Setting metadataBase in root layout.tsx:** The root layout is pass-through only (returns children). Set metadataBase in the `[locale]/layout.tsx` instead.
- **Hardcoding "| Planifactor" in every page:** Use `title.template: '%s | Planifactor'` in the locale layout. Pages just set their title string.
- **Putting sitemap.ts inside [locale]:** Sitemap must be at the app root (`src/app/sitemap.ts`), not inside `[locale]`. Search engines expect `/sitemap.xml` at the domain root.
- **Using relative URLs in alternates:** Always use absolute URLs with `metadataBase` or full URL strings. Relative hreflang URLs are invalid.
- **Duplicating OG image code:** Create a shared utility function for the OG image design, then import in each route's `opengraph-image.tsx`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom XML builder | `src/app/sitemap.ts` with MetadataRoute.Sitemap type | Built-in handles XML serialization, caching, correct content-type |
| robots.txt | Static file or custom route | `src/app/robots.ts` with MetadataRoute.Robots type | Built-in handles serialization, references sitemap URL |
| OG image generation | Canvas/puppeteer screenshots | `opengraph-image.tsx` with ImageResponse from next/og | Built-in, cached at build time, uses satori for JSX-to-PNG |
| Metadata tags | Manual `<meta>` tags in `<head>` | generateMetadata / static metadata export | Next.js handles deduplication, merging, streaming |
| Analytics script injection | Manual `<script>` in layout | next-plausible PlausibleProvider | Handles proxy, custom events, ad-blocker bypass |
| Hreflang alternates | Manual link tags | `alternates.languages` in generateMetadata | Next.js generates correct `<link rel="alternate" hreflang="...">` tags |
| Title templating | String concatenation per page | `title.template: '%s \| Planifactor'` | Consistent, DRY, cascading from layout |

**Key insight:** Next.js 16 has mature built-in SEO primitives. The sitemap, robots, OG image, and metadata APIs are all type-safe, cached by default, and require zero additional dependencies beyond what ships with Next.js.

## Common Pitfalls

### Pitfall 1: Sitemap Placement
**What goes wrong:** Putting `sitemap.ts` inside `src/app/[locale]/` generates `/en/sitemap.xml` and `/bg/sitemap.xml` instead of the expected `/sitemap.xml`.
**Why it happens:** The file convention maps directly to URL paths.
**How to avoid:** Always place `sitemap.ts` at `src/app/sitemap.ts` (app root). It generates content for ALL locales.
**Warning signs:** Google Search Console reports missing sitemap at the expected URL.

### Pitfall 2: Missing metadataBase
**What goes wrong:** OG images and alternates use relative URLs, which are invalid for social media crawlers.
**Why it happens:** Without `metadataBase`, Next.js cannot compose absolute URLs from relative paths.
**How to avoid:** Set `metadataBase: new URL('https://planifactor.com')` in the locale layout's generateMetadata.
**Warning signs:** Build warnings about missing metadataBase; OG debugger tools show broken images.

### Pitfall 3: OpenGraph Metadata Overwrite vs Inherit
**What goes wrong:** A child page sets `openGraph: { title: '...' }` which completely replaces the parent's openGraph (including siteName, locale, etc.).
**Why it happens:** Next.js metadata merging is shallow -- nested objects are replaced, not deep-merged.
**How to avoid:** Either spread shared openGraph fields, or use a shared metadata helper that always includes base OG fields.
**Warning signs:** Social previews missing site name or showing wrong locale.

### Pitfall 4: ImageResponse CSS Limitations
**What goes wrong:** Using CSS grid, advanced positioning, or non-flexbox layouts in OG images causes rendering failures.
**Why it happens:** ImageResponse uses satori under the hood, which only supports flexbox and a subset of CSS.
**How to avoid:** Stick to `display: 'flex'`, `flexDirection`, `alignItems`, `justifyContent`. No CSS grid, no `position: absolute` on nested elements, no gradients on text.
**Warning signs:** OG image returns 500 error or renders blank.

### Pitfall 5: withPlausibleProxy + withNextIntl Config Chaining
**What goes wrong:** Incorrect wrapping order or syntax causes one plugin's config to be lost.
**Why it happens:** Both are higher-order functions that wrap the Next.js config, but they have different calling conventions.
**How to avoid:** `withPlausibleProxy()` takes zero args and returns a wrapper function. `withNextIntl` is already the wrapper. Chain as: `withPlausibleProxy()(withNextIntl(nextConfig))`.
**Warning signs:** Either i18n routing breaks or analytics script is not injected.

### Pitfall 6: OG Image Params Must Be Awaited (Next.js 16)
**What goes wrong:** Accessing `params.locale` directly instead of awaiting `params` causes runtime errors.
**Why it happens:** Next.js 16 changed all route params to be Promises.
**How to avoid:** Always use `const { locale } = await params;` in opengraph-image.tsx default export.
**Warning signs:** Build error or runtime crash in OG image route.

### Pitfall 7: Plausible Provider Placement
**What goes wrong:** PlausibleProvider placed inside NextIntlClientProvider means it cannot access the document `<head>` properly.
**Why it happens:** PlausibleProvider needs to be high in the tree to inject the script tag.
**How to avoid:** Place PlausibleProvider as a wrapper around NextIntlClientProvider in the locale layout, inside `<body>`.
**Warning signs:** Analytics script not appearing in page source.

### Pitfall 8: JSON-LD XSS Vulnerability
**What goes wrong:** Using `JSON.stringify` directly in `dangerouslySetInnerHTML` allows script injection via malicious content.
**Why it happens:** JSON-LD content could contain `</script>` which breaks out of the script tag.
**How to avoid:** Always sanitize with `.replace(/</g, '\\u003c')` as recommended in Next.js docs.
**Warning signs:** No visible symptoms until exploited.

## Code Examples

### Complete robots.ts
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// src/app/robots.ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://planifactor.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

### Enhanced Page Metadata (child page pattern)
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// Example: src/app/[locale]/features/page.tsx
import type { Metadata } from 'next';

const SITE_URL = 'https://planifactor.com';

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FeaturesPage'});

  return {
    title: t('metaTitle'),  // template turns this into "Features | Planifactor"
    description: t('metaDescription'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/features`,
      languages: {
        en: `${SITE_URL}/en/features`,
        bg: `${SITE_URL}/bg/features`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/features`,
      type: 'website',
    },
  };
}
```

### Blog Post Metadata with Article Schema
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/[locale]/blog/[slug]/page.tsx (enhanced generateMetadata)
import type { Metadata } from 'next';
import { Article, WithContext } from 'schema-dts';

const SITE_URL = 'https://planifactor.com';

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        bg: `${SITE_URL}/bg/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
    },
  };
}
```

### Shared OG Image Template
```typescript
// src/lib/og-image.tsx (shared utility)
// Used by all opengraph-image.tsx files for consistent brand design
export function createOgImageElement({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '60px 80px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
        color: 'white',
        fontFamily: 'Inter',
      }}
    >
      {/* Top-left: Planifactor logo text */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 80,
          fontSize: 28,
          fontWeight: 600,
          opacity: 0.8,
          display: 'flex',
        }}
      >
        Planifactor
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, marginBottom: subtitle ? 16 : 0 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 28, fontWeight: 400, opacity: 0.85 }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Plausible Custom Events with TypeScript
```typescript
// Source: https://github.com/4lejandrito/next-plausible
// src/lib/analytics.ts
// Define all custom events in one place for type safety
export type PlausibleEvents = {
  'Demo Request Click': { location: string };
  'ROI Calculator Used': { estimatedSavings: number };
  'CTA Click': { variant: string; page: string };
  'Blog Post Read': { slug: string };
};
```

```typescript
// Usage in a client component:
'use client';
import { usePlausible } from 'next-plausible';
import type { PlausibleEvents } from '@/lib/analytics';

export function TrackableCTA({ variant, page }: { variant: string; page: string }) {
  const plausible = usePlausible<PlausibleEvents>();
  return (
    <button onClick={() => plausible('CTA Click', { props: { variant, page } })}>
      Request Demo
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-sitemap package | Built-in sitemap.ts file convention | Next.js 13.3 | No dependency needed, type-safe, auto-cached |
| next-seo package | Built-in generateMetadata | Next.js 13.2 | No dependency needed, metadata cascading built-in |
| @vercel/og direct import | `next/og` re-export of ImageResponse | Next.js 13.3+ | Simpler import, no separate install |
| Sync params in route handlers | Async params (Promise) | Next.js 16.0 | Must `await params` in sitemap, OG image, metadata |
| title concatenation per page | title.template in layout | Next.js 13.2 | DRY, consistent branding |
| Manual `<script>` for Plausible | next-plausible with PlausibleProvider | next-plausible 3.x | Proxy support, hooks, TypeScript |
| FID (First Input Delay) | INP (Interaction to Next Paint) | March 2024 | Google replaced FID with INP in Core Web Vitals |
| @next/bundle-analyzer (webpack) | `next analyze` (experimental, Turbopack) | Next.js 16.1 | New built-in analyzer for Turbopack builds |

**Deprecated/outdated:**
- `viewport` and `colorScheme` in metadata object: Use `generateViewport` instead (deprecated since Next.js 14)
- `themeColor` in metadata: Use `generateViewport` instead
- FID metric: Google replaced with INP (Interaction to Next Paint) in March 2024
- `framer-motion` import path: Project already uses `motion/react` (correct for v12.x)

## Performance-Specific Findings

### Core Web Vitals Targets
| Metric | Target | What Affects It |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Images, fonts, server response time, render-blocking CSS |
| INP (Interaction to Next Paint) | < 200ms | JavaScript execution, event handlers, hydration |
| CLS (Cumulative Layout Shift) | < 0.1 | Images without dimensions, dynamically injected content, fonts |

### Performance Optimizations Already in Place
- `next/font/google` with `display: 'swap'` and `variable` -- prevents font-related CLS
- `LazyMotion + domAnimation` -- smaller motion bundle (already implemented in Phase 4)
- Server components by default -- minimal client JS
- Static generation via `generateStaticParams` on blog and use-case pages

### Additional Optimizations for This Phase
1. **Image optimization:** Audit for any `<img>` tags that should use `next/image`. Currently the site is mostly SVG/CSS -- low risk.
2. **Font preloading:** Inter is loaded via `next/font` which already handles preloading.
3. **Script deferral:** Plausible script is async/deferred by default via next-plausible.
4. **Metadata streaming:** Next.js 16 streams metadata by default for non-bot requests, improving TTFB. No action needed.
5. **CLS prevention:** Ensure all dynamic content (Calendly widget, cookie consent banner) has reserved space via `min-height`.

### Lighthouse Audit Strategy
Run Lighthouse in production build mode (`npm run build && npm start`) against:
1. Landing page (`/en`) -- primary target for 90+ scores
2. Blog post page -- tests MDX rendering + OG image
3. Features page -- tests many components

## Open Questions

1. **Plausible hosting model**
   - What we know: Plausible offers cloud-hosted (plausible.io) and self-hosted options. next-plausible supports both via `selfHosted` prop.
   - What's unclear: Whether the team plans to use Plausible Cloud or self-hosted. This affects the `domain` prop and whether `customDomain` is needed.
   - Recommendation: Default to Plausible Cloud (plausible.io). Set `domain="planifactor.com"` in PlausibleProvider. Can be changed later.

2. **OG image font loading**
   - What we know: ImageResponse supports custom fonts via `readFile` from the filesystem. The project uses Inter via next/font.
   - What's unclear: Whether the Inter font .ttf file needs to be bundled in the repo for OG image generation, or if satori has a built-in fallback.
   - Recommendation: Include an Inter font file in a `public/fonts/` or `assets/` directory for OG image use. This is the pattern shown in Next.js official docs. If Inter is not bundled, satori will use its default sans-serif which may not match the brand.

3. **SITE_URL for development vs production**
   - What we know: The site URL is `https://planifactor.com` for production. During development, it will be `http://localhost:3000`.
   - What's unclear: Whether to use `NEXT_PUBLIC_SITE_URL` env variable or hardcode.
   - Recommendation: Create a `src/lib/constants.ts` with `SITE_URL` that reads from `process.env.NEXT_PUBLIC_SITE_URL || 'https://planifactor.com'`. This keeps metadata correct in all environments.

4. **Ad-blocker proxy effectiveness**
   - What we know: next-plausible's withPlausibleProxy creates Next.js rewrites that proxy the Plausible script and API calls through the app's domain, bypassing most ad-blockers.
   - What's unclear: Plausible removed their old proxy docs and now points to a "general proxying guide." The withPlausibleProxy may have changed behavior.
   - Recommendation: Use withPlausibleProxy with default settings. Test with uBlock Origin to verify it works. LOW confidence on proxy docs being current.

## Sources

### Primary (HIGH confidence)
- [Next.js 16.1.6 sitemap.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Complete API, alternates, localization, MetadataRoute.Sitemap type
- [Next.js 16.1.6 robots.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - Complete API, MetadataRoute.Robots type
- [Next.js 16.1.6 opengraph-image.tsx docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) - ImageResponse, params as Promise, config exports
- [Next.js 16.1.6 generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - Full metadata fields, alternates, openGraph, twitter, merging behavior
- [Next.js 16.1.6 JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) - dangerouslySetInnerHTML pattern, XSS sanitization, schema-dts recommendation
- [Next.js 16.1.6 metadata overview](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) - Cascading, streaming, file conventions
- [next-intl metadata/sitemap docs](https://next-intl.dev/docs/environments/actions-metadata-route-handlers) - getTranslations in generateMetadata, sitemap with getPathname

### Secondary (MEDIUM confidence)
- [next-plausible GitHub](https://github.com/4lejandrito/next-plausible) - v3.12.5, PlausibleProvider, usePlausible, withPlausibleProxy
- [Plausible data policy](https://plausible.io/data-policy) - Cookieless, GDPR-compliant without consent
- [schema-dts npm](https://www.npmjs.com/package/schema-dts) - v1.1.5, WithContext<T> type

### Tertiary (LOW confidence)
- [next-plausible withPlausibleProxy + ESM compatibility](https://www.npmjs.com/package/next-plausible) - Chaining with withNextIntl not explicitly documented; pattern inferred from both libraries' docs
- [Plausible proxy guide](https://plausible.io/docs/proxy/guides/nextjs) - Old proxy instructions removed; general proxy guide referenced instead

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All based on Next.js built-in APIs (verified via official docs v16.1.6)
- Architecture: HIGH - Patterns directly from Next.js and next-intl official documentation
- Sitemap/Robots/Metadata: HIGH - Official file conventions with complete type definitions
- OG Images: HIGH - ImageResponse API well-documented with params-as-Promise for v16
- Plausible integration: MEDIUM - next-plausible works but proxy docs are outdated; withPlausibleProxy chaining with withNextIntl is inferred
- JSON-LD structured data: HIGH - Official Next.js guide with schema-dts recommendation
- Performance optimization: MEDIUM - CWV targets well-known, but actual scores depend on runtime measurement
- Pitfalls: HIGH - All documented in official sources or verified via codebase inspection

**Research date:** 2026-02-10
**Valid until:** 2026-03-12 (30 days -- stable APIs, Next.js 16.1.x)
