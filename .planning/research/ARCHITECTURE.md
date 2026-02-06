# Architecture Patterns

**Domain:** B2B SaaS Marketing Website (Next.js App Router)
**Researched:** 2026-02-06
**Overall Confidence:** HIGH (primary source: official Next.js documentation)

---

## Recommended Architecture

A statically generated, locale-segmented Next.js App Router application with MDX-driven content, interactive client islands, and server-side form handling. Every page is pre-rendered at build time for maximum SEO performance. Client-side JavaScript is limited to interactive islands (Gantt mockup, ROI calculator, mobile nav, analytics).

### Architecture Diagram

```
                         +---------------------------+
                         |        Vercel CDN          |
                         |   (Static Assets + Edge)   |
                         +---------------------------+
                                     |
                         +-----------v-----------+
                         |    proxy.ts (Edge)     |
                         |  - Locale detection    |
                         |  - /  -->  /en redirect|
                         |  - /bg --> serve /bg   |
                         +----------+------------+
                                    |
               +--------------------+--------------------+
               |                                         |
    +----------v----------+                   +----------v----------+
    |   Static Pages      |                   |   API Route         |
    |   (SSG at build)    |                   |   Handlers          |
    |                     |                   |                     |
    |  /en/               |                   |  /api/contact       |
    |  /en/features       |                   |  /api/demo-request  |
    |  /en/pricing        |                   |  /api/newsletter    |
    |  /en/about          |                   |                     |
    |  /en/blog/[slug]    |                   |  (Resend email +    |
    |  /en/use-cases/[id] |                   |   validation)       |
    |  /bg/...            |                   |                     |
    +---------------------+                   +---------------------+
               |
    +----------v----------+
    |   Client Islands     |
    |   ("use client")     |
    |                      |
    |  - GanttMockup       |
    |  - ROICalculator     |
    |  - MobileNav         |
    |  - LanguageSwitcher  |
    |  - ContactForm       |
    |  - AnalyticsProvider |
    +----------------------+
```

### Core Architectural Principles

1. **Server-first rendering.** All pages are Server Components by default. Only interactive widgets get `"use client"`.
2. **Static generation everywhere.** `generateStaticParams` pre-builds all locale + slug combinations. Zero server compute at request time.
3. **Locale as route segment.** The `[locale]` dynamic segment is the first path segment, handled by middleware redirect for bare `/` requests.
4. **Content as code.** Blog posts and use-case content live as MDX files in the repository. No CMS backend required.
5. **Islands architecture.** Interactive components (Gantt, ROI calculator) are self-contained client islands embedded in server-rendered pages.

---

## Project Folder Structure

```
marketing-site/
|
|-- .planning/                    # Project planning (not deployed)
|   |-- research/
|   |-- roadmap/
|
|-- public/                       # Static assets (served at /)
|   |-- images/
|   |   |-- hero/
|   |   |-- features/
|   |   |-- team/
|   |   +-- og/                   # Fallback OG images
|   |-- fonts/                    # Self-hosted fonts (if any)
|   +-- favicons/
|
|-- src/
|   |
|   |-- app/
|   |   |-- [locale]/             # i18n route segment
|   |   |   |-- layout.tsx        # Root layout (html lang, fonts, providers)
|   |   |   |-- page.tsx          # Landing / Hero page
|   |   |   |-- not-found.tsx     # Localized 404
|   |   |   |
|   |   |   |-- features/
|   |   |   |   +-- page.tsx
|   |   |   |
|   |   |   |-- use-cases/
|   |   |   |   |-- page.tsx              # Use cases index
|   |   |   |   +-- [slug]/
|   |   |   |       +-- page.tsx          # Individual use case
|   |   |   |
|   |   |   |-- pricing/
|   |   |   |   +-- page.tsx
|   |   |   |
|   |   |   |-- about/
|   |   |   |   +-- page.tsx
|   |   |   |
|   |   |   |-- blog/
|   |   |   |   |-- page.tsx              # Blog index with post list
|   |   |   |   +-- [slug]/
|   |   |   |       |-- page.tsx          # Blog post (loads MDX)
|   |   |   |       +-- opengraph-image.tsx  # Dynamic OG per post
|   |   |   |
|   |   |   +-- contact/
|   |   |       +-- page.tsx
|   |   |
|   |   |-- api/
|   |   |   |-- contact/
|   |   |   |   +-- route.ts      # POST: contact form --> Resend
|   |   |   |-- demo-request/
|   |   |   |   +-- route.ts      # POST: demo request --> Resend
|   |   |   +-- newsletter/
|   |   |       +-- route.ts      # POST: newsletter signup
|   |   |
|   |   |-- opengraph-image.tsx   # Default site-wide OG image
|   |   |-- favicon.ico
|   |   |-- sitemap.ts            # Dynamic sitemap generator
|   |   +-- robots.ts             # Dynamic robots.txt
|   |
|   |-- components/
|   |   |-- layout/               # Structural components
|   |   |   |-- Header.tsx        # Server Component: nav structure
|   |   |   |-- Footer.tsx        # Server Component: links, copyright
|   |   |   |-- MobileNav.tsx     # Client Component: hamburger menu
|   |   |   +-- LanguageSwitcher.tsx  # Client Component: locale toggle
|   |   |
|   |   |-- sections/             # Page section components (Server)
|   |   |   |-- Hero.tsx
|   |   |   |-- FeatureGrid.tsx
|   |   |   |-- Testimonials.tsx
|   |   |   |-- CTABanner.tsx
|   |   |   |-- PricingTable.tsx
|   |   |   |-- TeamGrid.tsx
|   |   |   +-- BlogPostCard.tsx
|   |   |
|   |   |-- interactive/          # Client islands ("use client")
|   |   |   |-- GanttMockup.tsx          # Animated Gantt chart demo
|   |   |   |-- ROICalculator.tsx        # Interactive calculator
|   |   |   |-- BeforeAfterSlider.tsx    # Comparison slider
|   |   |   |-- ContactForm.tsx          # Form with validation
|   |   |   |-- DemoRequestForm.tsx      # Demo booking form
|   |   |   +-- NewsletterSignup.tsx     # Email capture
|   |   |
|   |   |-- ui/                   # shadcn/ui components (generated)
|   |   |   |-- button.tsx
|   |   |   |-- card.tsx
|   |   |   |-- input.tsx
|   |   |   |-- dialog.tsx
|   |   |   |-- tabs.tsx
|   |   |   +-- ...
|   |   |
|   |   |-- mdx/                  # MDX-specific components
|   |   |   |-- Callout.tsx
|   |   |   |-- CodeBlock.tsx
|   |   |   +-- ImageCaption.tsx
|   |   |
|   |   +-- motion/               # Animation wrapper components
|   |       |-- FadeIn.tsx
|   |       |-- SlideUp.tsx
|   |       |-- StaggerChildren.tsx
|   |       +-- ScrollReveal.tsx
|   |
|   |-- content/
|   |   |-- blog/
|   |   |   |-- en/
|   |   |   |   |-- production-scheduling-guide.mdx
|   |   |   |   +-- gantt-charts-explained.mdx
|   |   |   +-- bg/
|   |   |       |-- production-scheduling-guide.mdx
|   |   |       +-- gantt-charts-explained.mdx
|   |   +-- use-cases/
|   |       |-- en/
|   |       |   |-- manufacturing.mdx
|   |       |   +-- job-shops.mdx
|   |       +-- bg/
|   |           |-- manufacturing.mdx
|   |           +-- job-shops.mdx
|   |
|   |-- i18n/
|   |   |-- config.ts             # Locale definitions, default locale
|   |   |-- dictionaries.ts       # Dictionary loader (server-only)
|   |   +-- dictionaries/
|   |       |-- en.json            # English translations
|   |       +-- bg.json            # Bulgarian translations
|   |
|   |-- lib/
|   |   |-- mdx.ts                # MDX loading + parsing utilities
|   |   |-- metadata.ts           # Shared metadata generation helpers
|   |   |-- email.ts              # Resend email sending utilities
|   |   |-- validation.ts         # Zod schemas for form validation
|   |   +-- utils.ts              # General utilities (cn helper, etc.)
|   |
|   |-- styles/
|   |   |-- globals.css           # Tailwind directives + CSS custom properties
|   |   +-- design-tokens.css     # Brand colors, typography, spacing tokens
|   |
|   +-- types/
|       |-- i18n.ts               # Locale types, dictionary shape
|       |-- blog.ts               # Blog post frontmatter types
|       +-- forms.ts              # Form data types
|
|-- mdx-components.tsx            # Required: MDX component overrides (root level)
|-- proxy.ts                      # i18n locale detection + redirect (root level)
|-- next.config.mjs               # Next.js + MDX plugin configuration
|-- tailwind.config.ts            # Tailwind + design system tokens
|-- tsconfig.json
|-- package.json
+-- components.json               # shadcn/ui configuration
```

### Folder Rationale

| Folder | Why This Structure |
|--------|-------------------|
| `src/app/[locale]/` | Next.js convention for i18n URL segments. Every page automatically receives locale as a param. |
| `src/app/api/` | API routes sit outside `[locale]` because they are language-agnostic endpoints. |
| `src/components/layout/` | Structural components shared across all pages (Header, Footer). Separate from page sections. |
| `src/components/sections/` | Reusable page sections (Hero, FeatureGrid). Server Components by default, composable. |
| `src/components/interactive/` | All `"use client"` islands in one place. Clear boundary: if it needs state or events, it lives here. |
| `src/components/ui/` | shadcn/ui generated components. Never manually edit -- use the CLI. |
| `src/content/` | MDX content files organized by type and locale. Decoupled from route structure. |
| `src/i18n/` | All internationalization logic isolated. Dictionary loader uses `server-only` package. |
| `src/lib/` | Shared utilities. No React components, just pure functions and API helpers. |

---

## Component Boundaries

### Rendering Boundary Map

```
SERVER COMPONENTS (default -- no directive needed)
|
|-- app/[locale]/layout.tsx        Fetches dictionary, sets <html lang>
|-- app/[locale]/page.tsx          Composes section components
|-- components/layout/Header.tsx   Renders nav links from dictionary
|-- components/layout/Footer.tsx   Renders footer from dictionary
|-- components/sections/*.tsx      All page sections (Hero, Features, etc.)
|-- content rendering (MDX)        Blog posts rendered server-side
|
CLIENT COMPONENTS ("use client" directive)
|
|-- components/layout/MobileNav.tsx        useState for open/close
|-- components/layout/LanguageSwitcher.tsx  onClick to switch locale
|-- components/interactive/GanttMockup.tsx  Framer Motion animations
|-- components/interactive/ROICalculator.tsx useState for inputs/outputs
|-- components/interactive/ContactForm.tsx  useState, onSubmit, validation
|-- components/interactive/BeforeAfterSlider.tsx  drag/mouse events
|-- components/interactive/NewsletterSignup.tsx   form state
|-- components/motion/*.tsx                 Framer Motion wrappers
```

### Component Communication Patterns

**Pattern 1: Server fetches, Client receives (props down)**

```
[Server] layout.tsx
  |-- fetches dictionary via getDictionary(locale)
  |-- passes translated strings as props
  |
  +-- [Client] MobileNav navItems={dict.nav.items}
  +-- [Client] LanguageSwitcher currentLocale={locale}
```

**Pattern 2: Client islands are self-contained**

```
[Server] page.tsx (landing page)
  |-- renders Hero section (server)
  |-- renders static content (server)
  |
  +-- [Client] <GanttMockup />
  |     |-- owns its own animation state
  |     |-- receives only static config props
  |     +-- no server communication needed
  |
  +-- [Client] <ROICalculator translations={dict.roi} />
        |-- owns input/output state
        |-- pure client-side calculation
        +-- no API calls needed
```

**Pattern 3: Forms submit to API routes**

```
[Client] ContactForm
  |-- local state for form fields (useState)
  |-- client-side validation (zod)
  |-- onSubmit --> fetch('/api/contact', { method: 'POST', body })
  |
  +-- [Server] /api/contact/route.ts
        |-- server-side validation (zod, same schema)
        |-- Resend API call (email delivery)
        +-- returns { success: true/false, errors?: [...] }
```

**Why API routes instead of Server Actions for forms:** Server Actions are excellent for data mutations in full-stack apps. For a marketing site where the only server interaction is "send an email," Route Handlers are simpler, more explicit, and easier to rate-limit. They also allow the form component to remain a pure client island with no server coupling beyond a fetch call.

---

## Data Flow

### 1. Build-Time Data Flow (Primary)

```
MDX files (src/content/)
  |-- parsed at build time by @next/mdx
  |-- frontmatter extracted (title, date, description, author)
  |-- generateStaticParams() enumerates all [locale] x [slug] combos
  |-- each combination pre-rendered to static HTML
  |
  +-- Output: Static HTML + JSON for every page + locale
```

### 2. Request-Time Data Flow (Middleware Only)

```
Browser requests /
  |
  +-- proxy.ts intercepts
      |-- reads Accept-Language header
      |-- matches against ['en', 'bg']
      |-- redirects to /en (or /bg)
      |
      +-- Subsequent requests to /en/* served from static cache
```

### 3. Runtime Data Flow (Client Islands Only)

```
User interacts with ROI Calculator
  |-- onChange updates local state
  |-- calculation runs client-side (pure function)
  |-- result displayed immediately
  |-- no server round-trip

User submits Contact Form
  |-- client-side validation (zod schema)
  |-- if valid: POST /api/contact with JSON body
  |-- server validates again (same zod schema)
  |-- server calls Resend API
  |-- server returns success/error
  |-- client shows toast notification
```

### 4. Content Authoring Flow

```
Developer writes blog post
  |-- creates src/content/blog/en/new-post.mdx
  |-- creates src/content/blog/bg/new-post.mdx (translated)
  |-- commits + pushes
  |-- Vercel rebuilds (all static pages regenerated)
  |-- new blog post live on CDN in ~60 seconds
```

---

## i18n Architecture

### Approach: Built-in Next.js i18n (No Extra Library)

**Recommendation:** Use Next.js built-in `[locale]` route segment pattern with JSON dictionaries rather than `next-intl`. The built-in approach is sufficient for a marketing site with 2 locales and avoids adding a dependency.

**Confidence:** HIGH -- this is the pattern documented in official Next.js docs.

### Locale Configuration

```typescript
// src/i18n/config.ts
export const locales = ['en', 'bg'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
```

### Middleware (Locale Detection + Redirect)

```typescript
// proxy.ts (project root)
import { NextResponse, type NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from '@/i18n/config'

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') ?? '' }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip if path already has locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (hasLocale) return

  // Skip API routes and static assets
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) return

  // Redirect to detected locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
}
```

### Dictionary Loading (Server-Only)

```typescript
// src/i18n/dictionaries.ts
import 'server-only'
import type { Locale } from './config'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  bg: () => import('./dictionaries/bg.json').then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
```

### Dictionary Structure

```json
// src/i18n/dictionaries/en.json
{
  "nav": {
    "features": "Features",
    "useCases": "Use Cases",
    "pricing": "Pricing",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact",
    "requestDemo": "Request Demo"
  },
  "hero": {
    "headline": "Production Scheduling, Simplified",
    "subheadline": "Visual Gantt charts, resource optimization, and real-time planning for manufacturers.",
    "cta": "Request a Demo",
    "ctaSecondary": "See Features"
  },
  "roi": {
    "title": "Calculate Your Savings",
    "inputLabel": "Number of production orders per week",
    "result": "You could save {hours} hours per week"
  },
  "footer": {
    "copyright": "2026 Prefactor. All rights reserved."
  }
}
```

### Usage in Pages

```typescript
// src/app/[locale]/page.tsx
import { getDictionary } from '@/i18n/dictionaries'
import { hasLocale } from '@/i18n/config'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { GanttMockup } from '@/components/interactive/GanttMockup'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <main>
      <Hero
        headline={dict.hero.headline}
        subheadline={dict.hero.subheadline}
        ctaText={dict.hero.cta}
        ctaSecondaryText={dict.hero.ctaSecondary}
      />
      <GanttMockup />
      {/* ... more sections */}
    </main>
  )
}
```

### Static Generation for All Locales

```typescript
// src/app/[locale]/layout.tsx
import { locales } from '@/i18n/config'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
```

---

## MDX Blog Architecture

### Content Organization

```
src/content/blog/
  en/
    production-scheduling-guide.mdx
    gantt-charts-explained.mdx
    shift-planning-best-practices.mdx
  bg/
    production-scheduling-guide.mdx
    gantt-charts-explained.mdx
    shift-planning-best-practices.mdx
```

Each MDX file exports metadata and content:

```mdx
// src/content/blog/en/production-scheduling-guide.mdx
export const metadata = {
  title: 'The Complete Guide to Production Scheduling',
  description: 'Learn how modern manufacturers use Gantt charts and optimization...',
  date: '2026-01-15',
  author: 'Prefactor Team',
  tags: ['scheduling', 'manufacturing', 'gantt'],
  image: '/images/blog/scheduling-guide-og.jpg',
}

# The Complete Guide to Production Scheduling

Production scheduling is the backbone of efficient manufacturing...

<Callout type="tip">
  Modern scheduling software can reduce planning time by up to 70%.
</Callout>
```

### MDX Loading Utility

```typescript
// src/lib/mdx.ts
import type { Locale } from '@/i18n/config'

export interface BlogPost {
  slug: string
  metadata: {
    title: string
    description: string
    date: string
    author: string
    tags: string[]
    image?: string
  }
}

export async function getBlogPost(locale: Locale, slug: string) {
  const { default: Content, metadata } = await import(
    `@/content/blog/${locale}/${slug}.mdx`
  )
  return { Content, metadata, slug }
}

export async function getAllBlogPosts(locale: Locale): Promise<BlogPost[]> {
  // Use a manifest or dynamic glob pattern
  // For build-time: maintain a posts manifest
  const slugs = await getBlogSlugs(locale)
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`@/content/blog/${locale}/${slug}.mdx`)
      return { slug, metadata }
    })
  )
  return posts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  )
}
```

### Blog Route with Static Generation

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
import { locales } from '@/i18n/config'
import { getBlogPost, getBlogSlugs } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const params = []
  for (const locale of locales) {
    const slugs = await getBlogSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const { metadata } = await getBlogPost(locale as any, slug)
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [metadata.image] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const { Content } = await getBlogPost(locale as any, slug)
  return (
    <article className="prose prose-lg mx-auto">
      <Content />
    </article>
  )
}

export const dynamicParams = false  // 404 for non-existent slugs
```

---

## Interactive Components Architecture

### Client Island Pattern

Each interactive component is fully self-contained. It receives configuration and translations as props but owns all internal state.

#### GanttMockup Component

```typescript
// src/components/interactive/GanttMockup.tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface GanttMockupProps {
  // Static config only -- no server state
  className?: string
}

export function GanttMockup({ className }: GanttMockupProps) {
  const [activeResource, setActiveResource] = useState<number | null>(null)

  // Hardcoded demo data -- this is a mockup, not real data
  const resources = [
    { name: 'CNC Machine A', orders: [...] },
    { name: 'Assembly Line 1', orders: [...] },
    { name: 'Paint Booth', orders: [...] },
  ]

  return (
    <div className={className}>
      {resources.map((resource, i) => (
        <motion.div
          key={resource.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          onHoverStart={() => setActiveResource(i)}
        >
          {/* Gantt bars with staggered animation */}
        </motion.div>
      ))}
    </div>
  )
}
```

#### ROI Calculator

```typescript
// src/components/interactive/ROICalculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface ROICalculatorProps {
  translations: {
    title: string
    inputLabel: string
    result: string
  }
}

export function ROICalculator({ translations }: ROICalculatorProps) {
  const [ordersPerWeek, setOrdersPerWeek] = useState(50)

  const hoursSaved = useMemo(() => {
    // Simple calculation: ~3 minutes saved per order with automated scheduling
    return Math.round((ordersPerWeek * 3) / 60)
  }, [ordersPerWeek])

  return (
    <Card>
      <h3>{translations.title}</h3>
      <Input
        type="number"
        value={ordersPerWeek}
        onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
        label={translations.inputLabel}
      />
      <p>{translations.result.replace('{hours}', String(hoursSaved))}</p>
    </Card>
  )
}
```

### Animation Architecture

**Recommendation:** Create thin wrapper components around Framer Motion primitives. This keeps animation logic reusable and separates motion concerns from content structure.

```typescript
// src/components/motion/FadeIn.tsx
'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const directionOffsets = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
}

export function FadeIn({ children, delay = 0, direction = 'up', className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

Usage in a Server Component page (the FadeIn wrapper is the client boundary):

```tsx
// In a page.tsx (Server Component)
import { FadeIn } from '@/components/motion/FadeIn'
import { FeatureGrid } from '@/components/sections/FeatureGrid'

export default async function FeaturesPage({ params }) {
  const dict = await getDictionary(locale)
  return (
    <FadeIn>
      <FeatureGrid features={dict.features.items} />
    </FadeIn>
  )
}
```

---

## Form Handling Architecture

### Dual Validation Pattern

Use the same Zod schema on both client and server to ensure consistent validation.

```typescript
// src/lib/validation.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1, 'Company is required'),
  role: z.string().optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '200+']),
  message: z.string().optional(),
})

export type DemoRequestData = z.infer<typeof demoRequestSchema>
```

### API Route Handler

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await sendContactEmail(result.data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { _form: ['Something went wrong'] } },
      { status: 500 }
    )
  }
}
```

### Email Sending Utility

```typescript
// src/lib/email.ts
import { Resend } from 'resend'
import type { ContactFormData } from './validation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: ContactFormData) {
  await resend.emails.send({
    from: 'Prefactor Website <noreply@prefactor.com>',
    to: ['sales@prefactor.com'],
    subject: `Contact form: ${data.name} from ${data.company ?? 'N/A'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company ?? 'Not provided'}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  })
}
```

**Future improvement:** Replace the inline HTML with React Email templates for maintainable, type-safe email rendering.

---

## SEO Architecture

### Metadata Strategy

```
Metadata cascades from layout to page:

app/[locale]/layout.tsx
  |-- Sets: site title template, default description, default OG image
  |-- Template: "%s | Prefactor"

app/[locale]/page.tsx
  |-- Sets: "Production Scheduling Software" (becomes "Production Scheduling Software | Prefactor")

app/[locale]/blog/[slug]/page.tsx
  |-- generateMetadata: dynamic title/description from MDX frontmatter
  |-- opengraph-image.tsx: dynamic OG image per blog post
```

### Root Layout Metadata

```typescript
// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://prefactor.com'),
  title: {
    template: '%s | Prefactor',
    default: 'Prefactor - Production Scheduling Software',
  },
  description: 'Visual production scheduling with Gantt charts, resource optimization, and real-time planning for manufacturers.',
  openGraph: {
    type: 'website',
    siteName: 'Prefactor',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      bg: '/bg',
    },
  },
}
```

### Dynamic Sitemap

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
import { getBlogSlugs } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://prefactor.com'
  const staticPages = ['', '/features', '/pricing', '/about', '/contact', '/use-cases']

  const entries: MetadataRoute.Sitemap = []

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    }
  }

  // Blog posts for each locale
  for (const locale of locales) {
    const slugs = await getBlogSlugs(locale)
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries
}
```

### Robots.txt

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://prefactor.com/sitemap.xml',
  }
}
```

---

## Build and Deploy Pipeline

### Build Process

```
Developer pushes to main branch
  |
  +-- Vercel detects push
      |
      +-- npm install
      +-- next build
          |
          |-- proxy.ts compiled (Edge Runtime)
          |-- generateStaticParams enumerates:
          |     [en, bg] x [all pages] x [all blog slugs]
          |-- Each combination pre-rendered to HTML
          |-- MDX files compiled to React components
          |-- Client components bundled separately
          |-- OG images generated (opengraph-image.tsx)
          |-- sitemap.xml generated
          |-- robots.txt generated
          |
          +-- Output: static HTML + JS chunks + images
      |
      +-- Deploy to Vercel Edge Network (global CDN)
      +-- Automatic preview deployments for PRs
```

### Environment Variables

```
# .env.local (development)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Vercel Environment Variables (production)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://prefactor.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=prefactor.com
```

Note: `NEXT_PUBLIC_` prefix makes variables available in client bundles. Only use for non-sensitive values.

### Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Static generation, image optimization, font preloading |
| FID | < 100ms | Minimal client JS, code splitting per route |
| CLS | < 0.1 | Reserved image dimensions, font-display: swap |
| Bundle size | < 100KB first load JS | Server Components by default, tree shaking |

---

## Patterns to Follow

### Pattern 1: Props-Down Translation

**What:** Server Components fetch the dictionary and pass translated strings as props to child components. No translation function in client code.

**When:** Always. This keeps translation data out of the client bundle.

**Example:**

```tsx
// Server: passes translated strings
const dict = await getDictionary(locale)
<Hero headline={dict.hero.headline} ctaText={dict.hero.cta} />

// Client island: receives only the strings it needs
<ROICalculator translations={dict.roi} />
```

### Pattern 2: Composition Over Configuration

**What:** Build pages by composing section components rather than configuring a page builder.

**When:** All marketing pages.

**Example:**

```tsx
// src/app/[locale]/page.tsx
export default async function Home({ params }) {
  const dict = await getDictionary(locale)
  return (
    <main>
      <Hero {...dict.hero} />
      <GanttMockup />
      <FeatureHighlights features={dict.features.highlights} />
      <ROICalculator translations={dict.roi} />
      <Testimonials items={dict.testimonials} />
      <CTABanner {...dict.cta} />
    </main>
  )
}
```

### Pattern 3: Co-located Metadata

**What:** Export metadata (or generateMetadata) from the same file as the page component. Never define metadata in a separate file.

**When:** Every page.tsx.

### Pattern 4: Shared Zod Schemas

**What:** Define validation schemas in `src/lib/validation.ts` and import in both client form components and API route handlers.

**When:** Every form.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Translating in Client Components

**What:** Importing the full dictionary or a translation function in `"use client"` components.

**Why bad:** Entire dictionary JSON ends up in the client bundle. For 2 locales this doubles the bloat. Translation is a server concern.

**Instead:** Pass only needed translated strings as props from Server Component parents.

### Anti-Pattern 2: Making Everything a Client Component

**What:** Adding `"use client"` to section components that only render HTML.

**Why bad:** Dramatically increases JavaScript bundle. Server Components send zero JS. A marketing site should be mostly static HTML.

**Instead:** Only add `"use client"` when the component needs: useState, useEffect, onClick, onChange, Framer Motion, or browser APIs. If a section just renders props to HTML, it is a Server Component.

### Anti-Pattern 3: Nested Layouts for Simple Pages

**What:** Creating layout.tsx files for every route segment (features/layout.tsx, pricing/layout.tsx, etc.).

**Why bad:** Adds complexity without benefit when all marketing pages share the same header/footer layout.

**Instead:** Use a single `[locale]/layout.tsx` with Header + Footer. Individual pages just render their `<main>` content.

### Anti-Pattern 4: Dynamic Rendering for Static Content

**What:** Using `cookies()`, `headers()`, or uncached `fetch()` in marketing pages, forcing dynamic server rendering.

**Why bad:** Every request hits the server instead of being served from CDN. Terrible for performance and unnecessary for a marketing site.

**Instead:** Keep all marketing pages fully static. Only API route handlers should be dynamic.

### Anti-Pattern 5: Fetching Blog Content from an API at Build Time

**What:** Building a separate API to serve MDX content that the build process then fetches.

**Why bad:** Unnecessary complexity. MDX files in the repo ARE the source of truth. Dynamic import at build time is simpler and faster.

**Instead:** Use `import()` to load MDX files directly from the filesystem during build.

---

## Scalability Considerations

| Concern | Current (2 locales, ~10 pages) | Growth (5 locales, ~50 blog posts) | Large Scale (10 locales, 200+ posts) |
|---------|-------------------------------|-------------------------------------|--------------------------------------|
| Build time | < 30s (trivial) | ~2-3 min (fine) | ~5-10 min (consider ISR for blog) |
| Bundle size | < 80KB first load | Same (static pages are independent) | Same (pages are independent) |
| i18n maintenance | 2 JSON files, manual | Consider Crowdin or similar | Definitely need translation management platform |
| Content authoring | MDX in repo (developer workflow) | Still viable with good PR process | Consider headless CMS (Sanity, Contentful) |
| Deployment | Instant (Vercel) | Instant (Vercel) | May need build cache optimization |

### Migration Triggers

- **> 5 locales:** Migrate from JSON dictionaries to a translation management platform (Crowdin, Lokalise) that exports JSON.
- **> 100 blog posts:** Consider ISR (Incremental Static Regeneration) instead of full static generation to keep build times under 5 minutes.
- **Non-developer content authors:** Migrate from MDX-in-repo to a headless CMS (Sanity or Contentful) with preview mode.
- **A/B testing needs:** Add PostHog feature flags or Vercel Edge Config for dynamic content experiments.

---

## Suggested Build Order (Dependencies)

The following order respects component dependencies -- each phase builds on the previous.

```
Phase 1: Foundation
  |-- next.config.mjs (MDX plugin, page extensions)
  |-- tailwind.config.ts (design tokens, custom colors)
  |-- src/styles/globals.css (Tailwind directives, CSS variables)
  |-- src/i18n/ (config, dictionaries, dictionary loader)
  |-- proxy.ts (locale detection middleware)
  |-- src/app/[locale]/layout.tsx (root layout, HTML shell)
  |-- shadcn/ui init + base components (Button, Card, Input)
  |
  Dependencies: None. This is the foundation everything else needs.

Phase 2: Layout Shell
  |-- src/components/layout/Header.tsx
  |-- src/components/layout/Footer.tsx
  |-- src/components/layout/MobileNav.tsx (client)
  |-- src/components/layout/LanguageSwitcher.tsx (client)
  |
  Dependencies: Phase 1 (needs i18n, design tokens, shadcn/ui)

Phase 3: Landing Page
  |-- src/components/sections/Hero.tsx
  |-- src/components/motion/FadeIn.tsx (+ other animation wrappers)
  |-- src/components/interactive/GanttMockup.tsx (client)
  |-- src/components/sections/FeatureHighlights.tsx
  |-- src/components/sections/CTABanner.tsx
  |-- src/app/[locale]/page.tsx (composes above)
  |
  Dependencies: Phase 2 (needs layout shell wrapping the page)

Phase 4: Content Pages
  |-- src/app/[locale]/features/page.tsx
  |-- src/app/[locale]/pricing/page.tsx
  |-- src/app/[locale]/about/page.tsx
  |-- src/app/[locale]/use-cases/ (index + [slug])
  |-- src/components/sections/ (FeatureGrid, PricingTable, TeamGrid)
  |-- src/components/interactive/ROICalculator.tsx (client)
  |-- src/components/interactive/BeforeAfterSlider.tsx (client)
  |
  Dependencies: Phase 3 (shared section components, animation wrappers)

Phase 5: Blog System
  |-- mdx-components.tsx (root level)
  |-- src/lib/mdx.ts (content loading utilities)
  |-- src/components/mdx/ (Callout, CodeBlock, etc.)
  |-- src/content/blog/en/ (initial blog posts)
  |-- src/content/blog/bg/ (translated posts)
  |-- src/app/[locale]/blog/page.tsx (index)
  |-- src/app/[locale]/blog/[slug]/page.tsx (post page)
  |-- src/app/[locale]/blog/[slug]/opengraph-image.tsx
  |
  Dependencies: Phase 1 (MDX config), Phase 2 (layout)

Phase 6: Forms and Contact
  |-- src/lib/validation.ts (Zod schemas)
  |-- src/lib/email.ts (Resend integration)
  |-- src/components/interactive/ContactForm.tsx (client)
  |-- src/components/interactive/DemoRequestForm.tsx (client)
  |-- src/app/api/contact/route.ts
  |-- src/app/api/demo-request/route.ts
  |-- src/app/[locale]/contact/page.tsx
  |
  Dependencies: Phase 1 (foundation), RESEND_API_KEY env var

Phase 7: SEO and Analytics
  |-- src/app/sitemap.ts
  |-- src/app/robots.ts
  |-- src/app/opengraph-image.tsx (site-wide default)
  |-- Metadata refinement across all pages
  |-- Analytics integration (Plausible script or PostHog)
  |-- Performance optimization (image sizing, font loading)
  |
  Dependencies: All previous phases (needs all pages to exist for sitemap)
```

### Parallelization Opportunities

- **Phases 4 and 5** can run in parallel (content pages and blog system are independent after Phase 2).
- **Phase 6** can start after Phase 1 (forms do not depend on marketing pages).
- **Phase 7** should run last because it needs all routes to exist.

---

## Sources

| Source | Confidence | What It Informed |
|--------|------------|-----------------|
| [Next.js: Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization) | HIGH | i18n routing pattern, middleware, dictionary loading |
| [Next.js: MDX](https://nextjs.org/docs/app/building-your-application/configuring/mdx) | HIGH | MDX setup, @next/mdx config, component overrides |
| [Next.js: Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) | HIGH | Folder conventions, special files, route organization |
| [Next.js: Proxy/Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) | HIGH | Locale redirect middleware, matcher config |
| [Next.js: Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | HIGH | SEO metadata, OG images, generateMetadata |
| [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) | HIGH | Static generation for dynamic routes |
| [Next.js: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | HIGH | API routes for form handling |
| [Next.js: Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) | HIGH | Form patterns (evaluated, Route Handlers chosen instead) |
| [Next.js: Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) | HIGH | Client/Server boundary patterns |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Folder structure | HIGH | Based on official Next.js conventions documented above |
| i18n routing | HIGH | Official Next.js pattern with `[locale]` segment + middleware |
| MDX blog | HIGH | Official @next/mdx integration documented by Next.js |
| Client/Server boundaries | HIGH | Official React Server Components architecture |
| Form handling | HIGH | Route Handlers pattern from official docs |
| Animation architecture | MEDIUM | Framer Motion wrapper pattern is well-established but official docs could not be fetched for latest API verification |
| Build order | HIGH | Based on actual component dependency analysis |
| Scalability thresholds | MEDIUM | Based on general Next.js knowledge; specific build time numbers are estimates |

### Note on Next.js Version

The official docs now reference `proxy.ts` instead of the older `middleware.ts` convention, and `params` is now a Promise that must be awaited. This ARCHITECTURE.md reflects the current (2026) Next.js conventions. If using an older version of Next.js, the middleware file name and params handling will differ.
