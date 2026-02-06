# Technology Stack

**Project:** Prefactor Marketing Site
**Domain:** B2B SaaS marketing website for production scheduling platform
**Researched:** 2026-02-06
**Overall Confidence:** MEDIUM (web verification tools unavailable; versions based on training data through May 2025 + ecosystem trajectory; verify exact versions with `npm view <pkg> version` before installation)

---

## Important Note on Versions

WebSearch, WebFetch, and npm CLI were all unavailable during this research session. All version numbers below are based on training data through May 2025 and extrapolated ecosystem trajectory. **Before running `npm install`, verify current stable versions** with:

```bash
npm view next version
npm view tailwindcss version
npm view next-intl version
npm view framer-motion version
npm view resend version
npm view @plausible/tracker version
```

---

## Recommended Stack

### Core Framework

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Next.js** (App Router) | ^15.x | Full-stack framework, SSR/SSG | Pre-decided. App Router is stable and mature as of Next.js 14+. SSG for marketing pages is ideal for SEO. ISR for blog content. App Router gives server components by default = smaller client bundles. | HIGH |
| **React** | ^19.x | UI library (bundled with Next.js 15) | Comes with Next.js. React 19 introduced server components as stable, `use()` hook, and improved Suspense. | HIGH |
| **TypeScript** | ^5.x | Type safety | Non-negotiable for any modern project. Catches bugs at build time, improves DX with IDE support. | HIGH |

**Why Next.js App Router (not Pages Router):**
- App Router is the current default and recommended approach
- Server Components reduce client-side JavaScript (better for SEO + Core Web Vitals)
- Nested layouts are perfect for marketing sites (shared nav/footer, per-section layouts)
- Metadata API makes SEO management declarative and composable
- Static generation with `generateStaticParams` is cleaner than `getStaticPaths`
- Pages Router is maintenance mode only; all new Next.js features target App Router

### Styling

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Tailwind CSS** | ^4.x or ^3.x (verify current major) | Utility-first CSS | Pre-decided. Team knows it from the product. Tailwind v4 was released in early 2025 with significant performance improvements and CSS-first configuration. If v4 has any compatibility issues with shadcn/ui, fall back to v3.4.x. | MEDIUM |
| **tailwind-merge** | ^2.x | Class merging | Resolves conflicting Tailwind classes in component composition. Required by shadcn/ui patterns. | HIGH |
| **clsx** or **class-variance-authority (cva)** | latest | Conditional classes | CVA for component variants (buttons, cards); clsx for simple conditionals. shadcn/ui uses both. | HIGH |
| **tailwindcss-animate** | ^1.x | Animation utilities | Adds animation utility classes used by shadcn/ui components. | HIGH |

**Tailwind v4 vs v3 Decision:**
- Tailwind v4 was announced/released around January 2025 with a new engine, CSS-first config, and improved performance
- shadcn/ui compatibility with v4 needs verification at install time
- **Recommendation:** Start with whatever version `npx shadcn@latest init` installs. It will configure the correct Tailwind version automatically.
- If issues arise, Tailwind v3.4.x is battle-tested and fully compatible

### UI Components

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **shadcn/ui** | latest (CLI-based, not versioned as npm pkg) | Component library | Pre-decided. Team uses Radix in the product. shadcn/ui is not an npm package -- it copies components into your codebase. This means full customization control. Includes: Button, Card, Dialog, Sheet, Navigation Menu, Accordion, Tabs, Form, Input, etc. | HIGH |
| **Radix UI primitives** | (installed per-component by shadcn) | Accessible primitives | Underlying primitives for shadcn. Installed automatically. Accessible by default (ARIA, keyboard nav). | HIGH |
| **lucide-react** | latest | Icons | Default icon set for shadcn/ui. Consistent, comprehensive, tree-shakeable. | HIGH |

**Why shadcn/ui over alternatives:**
- vs. **Chakra UI**: shadcn gives you the source code, not a dependency. No version lock-in.
- vs. **MUI**: MUI is heavy, opinionated on styling (emotion/styled-components), fights Tailwind.
- vs. **Headless UI**: Radix (underlying shadcn) has broader component coverage and better accessibility.
- vs. **DaisyUI**: DaisyUI is Tailwind-based but less flexible, fewer primitives, weaker accessibility story.

### Internationalization (i18n)

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **next-intl** | ^3.x or ^4.x | i18n for Next.js App Router | Best-in-class i18n for App Router. URL-based locale switching (`/en/...`, `/bg/...`), server component support, ICU message format, type-safe translations. | HIGH |

**Why next-intl (not alternatives):**
- vs. **next-i18next**: Designed for Pages Router. App Router support is bolted on and awkward. next-intl was built for App Router from the ground up.
- vs. **i18next + react-i18next**: Generic solution, not Next.js-aware. Doesn't integrate with App Router middleware, doesn't support server components natively.
- vs. **Paraglide.js (inlang)**: Interesting compile-time approach but smaller ecosystem, less community support, more risk.
- vs. **next built-in i18n**: Next.js removed built-in i18n routing in App Router. You need a library.

**i18n Architecture:**
```
/messages/
  en.json
  bg.json
/src/
  middleware.ts          -- locale detection + redirect
  i18n/
    request.ts           -- next-intl config
  app/
    [locale]/
      layout.tsx         -- locale-scoped layout
      page.tsx           -- home
      features/page.tsx  -- features
      ...
```

**Key features needed:**
- URL-based locale: `/en/features` vs `/bg/features`
- Default locale without prefix (optional): `/features` = English
- SEO: `hreflang` tags, locale-specific metadata
- Static generation per locale with `generateStaticParams`

### Blog / Content

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **MDX** (via `@next/mdx` or `next-mdx-remote`) | latest | Blog content authoring | Pre-decided. Write blog posts in Markdown with embedded React components (charts, CTAs, interactive demos). | HIGH |
| **next-mdx-remote** | ^5.x | Remote/file MDX rendering | Preferred over `@next/mdx` for blog content because it supports loading MDX from the filesystem at build time without webpack config. Better for content that lives in `/content/blog/` directory. | MEDIUM |
| **gray-matter** | ^4.x | Frontmatter parsing | Parse YAML frontmatter from MDX files (title, date, author, description, tags). | HIGH |
| **rehype-pretty-code** or **shiki** | latest | Code syntax highlighting | If blog includes technical content. shiki provides VS Code-quality highlighting at build time. | MEDIUM |
| **rehype-slug** + **rehype-autolink-headings** | latest | Heading anchors | Auto-generate heading IDs and anchor links for blog posts. Good for SEO and UX. | HIGH |

**Why NOT Contentlayer:**
- Contentlayer was mentioned in CLAUDE.md as an option, but the project was **abandoned/unmaintained** as of mid-2024. The original maintainer stopped working on it and the repo went stale.
- **Do not use Contentlayer.** Use `next-mdx-remote` + `gray-matter` instead. It requires slightly more manual setup but is actively maintained and reliable.
- Alternative: **Velite** or **Contentlayer2** (community fork) exist but are less proven.

**Blog Architecture:**
```
/content/
  blog/
    en/
      production-scheduling-guide.mdx
      gantt-chart-best-practices.mdx
    bg/
      ръководство-за-планиране.mdx
/src/
  lib/
    blog.ts              -- getBlogPosts(), getBlogPost(slug)
  app/
    [locale]/
      blog/
        page.tsx          -- blog listing
        [slug]/
          page.tsx        -- individual post
```

### Email / Forms

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Resend** | ^4.x (verify) | Transactional email API | Pre-decided. Developer-friendly API, generous free tier (100 emails/day free, 3000/month). Perfect for demo request notifications and auto-responses. | HIGH |
| **React Email** | latest | Email templates | Build email templates with React components. Renders to HTML email that works across clients. Works seamlessly with Resend. | HIGH |
| **react-hook-form** | ^7.x | Form state management | Best React form library. Minimal re-renders, built-in validation, works with shadcn/ui form components. | HIGH |
| **zod** | ^3.x | Schema validation | Type-safe validation for form data. Used on both client (form validation) and server (API route validation). shadcn/ui forms use zod by convention. | HIGH |

**Form Architecture:**
```
Client: react-hook-form + zod schema + shadcn/ui Form components
  --> Server Action or API Route
    --> Validate with zod
    --> Send notification email via Resend (to team)
    --> Send confirmation email via Resend (to requester)
    --> Return success/error
```

**Why NOT alternatives:**
- vs. **Formik**: Heavier, more re-renders, less idiomatic with modern React. react-hook-form won.
- vs. **SendGrid/Mailgun**: More complex setup, enterprise-oriented pricing. Resend is simpler and cheaper at this scale.
- vs. **Nodemailer**: Self-managed SMTP is fragile. Resend abstracts this away.

### Analytics

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Plausible Analytics** | Cloud or self-hosted | Privacy-friendly analytics | **Recommended over PostHog for a marketing site.** Lightweight (< 1KB script), no cookies, GDPR-compliant without consent banners, simple dashboard for marketing metrics (visitors, sources, pages, goals). | HIGH |

**Why Plausible (not PostHog):**
- PostHog is a full product analytics suite (session replay, feature flags, A/B testing, funnels). It is **overkill for a marketing site.** PostHog's script is ~90KB+ and impacts Core Web Vitals.
- Plausible is purpose-built for website analytics: pageviews, referral sources, UTM tracking, goal conversions. That is exactly what a marketing site needs.
- Plausible requires no cookie consent banner (EU/GDPR compliance) because it does not use cookies or track personal data. This is important for a Bulgaria/EU-targeting site.
- **Cost:** Plausible Cloud is ~$9/month for up to 10K monthly pageviews. Self-hosted is free.

**When to add PostHog later:**
- When the product itself needs analytics (session replay, feature flags)
- When you need A/B testing on marketing pages (this is a later optimization, not MVP)
- PostHog can complement Plausible; they are not mutually exclusive

**Plausible Integration:**
```typescript
// next.config.ts - proxy Plausible script to avoid ad blockers
// OR use @plausible/tracker npm package for custom events
// OR simply add script tag in layout.tsx
```

### Animations

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Framer Motion** (now rebranded as **Motion**) | ^11.x or ^12.x (verify) | Animations and transitions | Pre-decided. Note: Framer Motion was rebranded to just "Motion" with the npm package `motion` (not `framer-motion`). The `framer-motion` package may still work but check which is current. | MEDIUM |

**Important Version Note:**
- Around late 2024/early 2025, Framer Motion was rebranded to "Motion" and the npm package changed from `framer-motion` to `motion`
- The API is largely the same but the import path changed
- **Verify at install time:** check if `motion` or `framer-motion` is the current recommended package
- Import would be: `import { motion } from "motion/react"` (new) vs `import { motion } from "framer-motion"` (old)

**Usage for Marketing Site:**
- Scroll-triggered animations (sections animate in on scroll) via `whileInView`
- Page transitions between routes
- Interactive Gantt chart preview animation on hero
- Number counting animations for stats/ROI calculator
- Staggered list animations for feature cards

### Hosting

| Technology | Tier | Purpose | Why | Confidence |
|------------|------|---------|-----|------------|
| **Vercel** | Hobby (free) -> Pro ($20/mo) | Hosting + CDN | **Recommended over Cloudflare Pages.** Vercel is the creator of Next.js. Zero-config deployment, automatic preview deployments on PRs, built-in analytics, image optimization, edge middleware. Best DX for Next.js projects by far. | HIGH |

**Why Vercel (not Cloudflare Pages):**
- Cloudflare Pages works with Next.js via `@cloudflare/next-on-pages` adapter, but it is a second-class citizen. Many Next.js features require workarounds or are unsupported (certain ISR patterns, image optimization, middleware edge cases).
- Vercel supports 100% of Next.js features by definition. No adapter needed.
- For a marketing site with moderate traffic, Vercel's free tier or Pro tier ($20/month) is more than sufficient.
- Cloudflare Pages makes sense if: you are running at massive scale (millions of requests) and need Cloudflare's pricing model, or if you are already deep in the Cloudflare ecosystem (Workers, R2, D1). Neither applies here.

**Vercel Environment Strategy:**
- Production: `main` branch -> `prefactor.com`
- Preview: PRs -> `*.vercel.app` auto-URLs
- Environment variables for Resend API key, Plausible domain, etc.

### SEO

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **Next.js Metadata API** | (built into Next.js) | SEO meta tags | App Router's `generateMetadata()` + `metadata` exports handle title, description, Open Graph, Twitter cards, robots, sitemap, etc. No additional library needed. | HIGH |
| **next-sitemap** | ^4.x | Sitemap generation | Generates `sitemap.xml` and `robots.txt` at build time. Supports i18n sitemaps with `hreflang`. Critical for SEO. | HIGH |
| **Schema.org structured data** | (manual JSON-LD) | Rich search results | Add `Organization`, `SoftwareApplication`, `FAQPage`, `BlogPosting` structured data. No library needed -- just render `<script type="application/ld+json">` in layouts. | HIGH |

### Development Tools

| Technology | Version (verify) | Purpose | Why | Confidence |
|------------|-------------------|---------|-----|------------|
| **ESLint** | ^9.x (flat config) | Linting | Installed by default with `create-next-app`. Use flat config format (eslint.config.js). | HIGH |
| **Prettier** | ^3.x | Code formatting | Consistent formatting. Use `prettier-plugin-tailwindcss` to auto-sort Tailwind classes. | HIGH |
| **prettier-plugin-tailwindcss** | latest | Tailwind class sorting | Automatically sorts Tailwind utility classes in a consistent order. | HIGH |

---

## Alternatives Considered (and Rejected)

| Category | Recommended | Alternative | Why Rejected |
|----------|-------------|-------------|-------------|
| Framework | Next.js App Router | Astro | Astro is excellent for pure static sites but weaker for interactive components (Gantt demo, ROI calculator). Next.js handles both static and interactive naturally. |
| Framework | Next.js App Router | Remix | Remix is strong for data-heavy apps but offers less value for a marketing site. Next.js has better SSG story and the team already uses React. |
| Framework | Next.js App Router | Gatsby | Gatsby is effectively dead/abandoned. Do not use. |
| Styling | Tailwind CSS | CSS Modules | Team already knows Tailwind. CSS Modules are fine but slower to develop with. |
| Styling | Tailwind CSS | styled-components | Runtime CSS-in-JS is incompatible with React Server Components. Dead path. |
| Components | shadcn/ui | Chakra UI | Chakra is a dependency, not source code. Less customizable, adds bundle weight. |
| Components | shadcn/ui | Material UI (MUI) | Heavy, fights Tailwind, enterprise-Java aesthetic doesn't match modern B2B SaaS. |
| i18n | next-intl | next-i18next | Built for Pages Router. Awkward with App Router. |
| i18n | next-intl | Raw `Intl` API | Too low-level. Would need to rebuild routing, message loading, formatting. |
| Blog | next-mdx-remote | Contentlayer | Abandoned/unmaintained since mid-2024. Do not use. |
| Blog | MDX files | Headless CMS (Sanity/Strapi) | Overkill for a marketing blog with 1-2 authors. MDX is simpler, version-controlled, and free. Consider CMS only if content team grows beyond 3+ non-technical writers. |
| Email | Resend | SendGrid | More complex, enterprise pricing. Resend is simpler and sufficient. |
| Email | Resend | AWS SES | Requires AWS account, more configuration. Not worth it for < 1000 emails/month. |
| Analytics | Plausible | Google Analytics | Requires cookie consent banner in EU. Heavier script. Privacy concerns for EU market. |
| Analytics | Plausible | PostHog | Overkill for marketing site. Heavy script (~90KB). Save for product analytics. |
| Animations | Motion (Framer Motion) | GSAP | GSAP licensing is complex for commercial use. Framer Motion API is more React-idiomatic. |
| Animations | Motion (Framer Motion) | CSS animations only | Insufficient for interactive Gantt demo and complex scroll-triggered animations. |
| Hosting | Vercel | Cloudflare Pages | Second-class Next.js support. Requires adapter. Missing features. |
| Hosting | Vercel | AWS Amplify | More complex setup, slower deployments, worse DX for Next.js. |
| Hosting | Vercel | Self-hosted (VPS) | Unnecessary complexity for a marketing site. No benefit over Vercel. |

---

## Full Installation Command

**Verify versions are current before running.** These are best estimates as of research date.

```bash
# Initialize Next.js project with TypeScript, Tailwind, ESLint, App Router
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Initialize shadcn/ui (will configure Tailwind, add base components)
npx shadcn@latest init

# Add shadcn/ui components as needed
npx shadcn@latest add button card dialog sheet navigation-menu accordion tabs form input textarea select badge separator

# i18n
npm install next-intl

# Blog / MDX
npm install next-mdx-remote gray-matter rehype-slug rehype-autolink-headings

# Email
npm install resend react-email @react-email/components

# Forms (some installed by shadcn already)
npm install react-hook-form zod @hookform/resolvers

# Animations -- verify package name (motion vs framer-motion)
npm install motion
# OR: npm install framer-motion

# SEO
npm install next-sitemap

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Project Structure Recommendation

```
C:\mypc\programming\Prefactor\marketing-site\
  src/
    app/
      [locale]/
        layout.tsx              # Locale-scoped layout (nav, footer, font)
        page.tsx                # Landing / Hero page
        features/
          page.tsx              # Features page
        use-cases/
          page.tsx              # Use cases / Industries
        pricing/
          page.tsx              # Pricing page
        about/
          page.tsx              # About page
        blog/
          page.tsx              # Blog listing
          [slug]/
            page.tsx            # Blog post
        contact/
          page.tsx              # Contact / Demo request form
        not-found.tsx           # 404 page
      layout.tsx                # Root layout (html, body, providers)
      robots.ts                 # robots.txt generation
      sitemap.ts                # sitemap.xml generation
    components/
      ui/                       # shadcn/ui components (auto-generated)
      layout/
        header.tsx              # Site header/nav
        footer.tsx              # Site footer
        locale-switcher.tsx     # Language toggle (EN/BG)
      landing/
        hero.tsx                # Hero section with animated Gantt
        features-preview.tsx    # Feature cards
        roi-calculator.tsx      # ROI calculator widget
        testimonials.tsx        # Social proof
        cta-section.tsx         # Call-to-action section
      blog/
        blog-card.tsx           # Blog post card
        mdx-components.tsx      # Custom MDX component mapping
      forms/
        demo-request-form.tsx   # Demo request form
        contact-form.tsx        # Contact form
      animations/
        gantt-preview.tsx       # Animated Gantt chart demo
        scroll-reveal.tsx       # Reusable scroll-triggered wrapper
    lib/
      utils.ts                  # cn() helper, other utilities
      blog.ts                   # Blog content loading utilities
    i18n/
      request.ts                # next-intl configuration
      routing.ts                # Locale routing config
    emails/
      demo-request.tsx          # React Email template: new demo request
      demo-confirmation.tsx     # React Email template: confirmation to requester
    middleware.ts               # next-intl locale middleware
  content/
    blog/
      en/
        *.mdx                   # English blog posts
      bg/
        *.mdx                   # Bulgarian blog posts
  messages/
    en.json                     # English translations
    bg.json                     # Bulgarian translations
  public/
    images/
    fonts/
  next.config.ts
  tailwind.config.ts            # (if Tailwind v3) or CSS-first (v4)
  tsconfig.json
  next-sitemap.config.js
```

---

## Environment Variables

```env
# .env.local (not committed)
RESEND_API_KEY=re_xxxxxxxxxxxx
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=prefactor.com
NEXT_PUBLIC_SITE_URL=https://prefactor.com

# Optional
NEXT_PUBLIC_POSTHOG_KEY=            # If PostHog added later
NEXT_PUBLIC_POSTHOG_HOST=           # If PostHog added later
```

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Next.js App Router | HIGH | Mature, well-documented, team pre-decided |
| Tailwind CSS | MEDIUM | v4 was releasing around my training cutoff. Verify v3 vs v4 compatibility with shadcn/ui |
| shadcn/ui | HIGH | CLI-based, installs correct dependencies. Well-established pattern. |
| next-intl | HIGH | Dominant i18n solution for App Router as of 2025. Verify current major version. |
| MDX approach | HIGH | Pattern is well-established. Contentlayer rejection is well-documented. |
| Resend + React Email | HIGH | Simple, well-documented, generous free tier |
| Plausible over PostHog | HIGH | Clear fit for marketing site. PostHog is overkill here. |
| Framer Motion / Motion rebrand | MEDIUM | Package rename was in progress during training. Verify `motion` vs `framer-motion` package name. |
| Vercel hosting | HIGH | Best platform for Next.js, clear winner for this use case |
| Exact version numbers | LOW | Could not verify via npm. All versions should be verified at install time. |

---

## Sources

- Next.js documentation (nextjs.org/docs) -- App Router, Metadata API, Internationalization
- Tailwind CSS documentation (tailwindcss.com)
- shadcn/ui documentation (ui.shadcn.com)
- next-intl documentation (next-intl-docs.vercel.app)
- Resend documentation (resend.com/docs)
- Plausible documentation (plausible.io/docs)
- Framer Motion / Motion documentation (motion.dev)
- Contentlayer GitHub issues (project abandonment context)

**Note:** All sources are based on training data through May 2025. URLs and content should be verified for currency.
