# Domain Pitfalls

**Domain:** B2B SaaS Marketing Website (Next.js App Router, i18n, MDX, Framer Motion)
**Project:** Prefactor Marketing Site
**Researched:** 2026-02-06
**Overall Confidence:** HIGH (based on official Next.js documentation + established B2B marketing patterns)

---

## Critical Pitfalls

Mistakes that cause rewrites, launch delays, or fundamental SEO/conversion failures.

---

### Pitfall 1: i18n Architecture Wrong from the Start

**What goes wrong:** Teams bolt i18n on after building pages in a single language. The App Router has no built-in i18n solution (confirmed via official Next.js docs) -- it only provides the `app/[lang]/` routing pattern. Retrofitting i18n into an existing page tree means rewriting every layout, every page, every metadata call, and every content string.

**Why it happens:** i18n "feels" like a feature you can add later. In Next.js Pages Router, you could -- there was a built-in `i18n` config. App Router removed this. Now i18n is an architectural decision that touches every file.

**Consequences:**
- Complete restructuring of `app/` directory under `app/[lang]/`
- Every `generateMetadata` call must become locale-aware
- Every static content string must be extracted into dictionaries
- `generateStaticParams` must emit all locale variants
- hreflang alternate links must be added for every page
- Sitemap must include all locale URLs
- Entire component tree contaminated with locale prop threading

**Prevention:**
1. Start with `app/[lang]/` from the very first file. No exceptions.
2. Choose a library (next-intl is the most mature for App Router) before writing any page.
3. Create the dictionary loading pattern (`getDictionary(locale)`) in the first commit.
4. Use `server-only` directive on dictionary imports to prevent client bundle bloat.
5. Set up `generateStaticParams` returning `[{ lang: 'en' }, { lang: 'bg' }]` at the `[lang]/layout.tsx` level immediately.

**Detection (warning signs):**
- Any `page.tsx` that hardcodes English strings
- Any layout without `lang` param threading
- Missing `<html lang={lang}>` in root layout

**Phase mapping:** Must be addressed in Phase 1 (Foundation). Cannot be deferred.

**Confidence:** HIGH -- verified against official Next.js App Router i18n documentation.

---

### Pitfall 2: Contentlayer is Dead -- MDX Pipeline Choice Matters

**What goes wrong:** Teams choose Contentlayer for MDX blog content because it appears everywhere in tutorials, then discover the project is abandoned/unmaintained (last meaningful update was 2023, repository archived). Build breaks on newer Node versions, no App Router support improvements, no bug fixes.

**Why it happens:** CLAUDE.md lists "MDX or Contentlayer" as options. Contentlayer had excellent DX with type-safe content schemas. Many blog posts and tutorials still recommend it. But the maintainer stopped working on it and the project stalled.

**Consequences:**
- Dependency on an unmaintained package that may break with Next.js updates
- Migration pain later when forced to switch
- Missing features for App Router patterns

**Prevention:**
1. Use `@next/mdx` (official Next.js MDX integration) as the base -- it is actively maintained.
2. For content collections with frontmatter and type safety, consider `velite`, `contentlayer2` (community fork), or hand-roll a thin content layer using `gray-matter` + `next-mdx-remote`.
3. If using `@next/mdx` directly, note that frontmatter is NOT supported by default -- use `export const metadata = {}` pattern or add `remark-frontmatter` + `remark-mdx-frontmatter` plugins.
4. The `mdx-components.tsx` file is REQUIRED for App Router -- forgetting it breaks the entire MDX pipeline silently.

**Detection:**
- `contentlayer` in `package.json`
- Build warnings about deprecated APIs
- TypeScript errors after Next.js version bumps

**Phase mapping:** Must be decided in Phase 1 (Foundation) when setting up the blog infrastructure. The content pipeline pattern is hard to change later because every blog post depends on it.

**Confidence:** HIGH -- verified against official Next.js MDX documentation. Contentlayer status is well-documented community knowledge.

---

### Pitfall 3: Client Component Boundary Creep Destroys Performance

**What goes wrong:** A single `"use client"` at the wrong level cascades and forces entire page trees into client-side rendering. For a B2B marketing site where SEO depends on server-rendered HTML and fast LCP, this is catastrophic.

**Why it happens:** The Prefactor site needs interactive elements (animated Gantt mockup, ROI calculator, language switcher, mobile navigation). Developers place `"use client"` too high in the component tree -- on a layout or page wrapper -- because one child needs interactivity. Every component below that boundary becomes a Client Component, shipping unnecessary JavaScript and losing server rendering benefits.

**Consequences:**
- Inflated JavaScript bundle (bad for Core Web Vitals LCP and INP)
- Loss of server-side rendering for SEO-critical content
- Slower initial page load for the manufacturing decision-makers on potentially slow connections
- Hydration mismatches causing flicker

**Prevention (from official Next.js composition patterns):**
1. Default to Server Components. Only add `"use client"` on the smallest possible leaf components.
2. Use the "slot pattern" -- pass Server Components as `children` to Client Components:
   ```tsx
   // Client wrapper for interactivity
   'use client'
   function AnimationWrapper({ children }) { /* motion logic */ }

   // Server Component page
   export default function Page() {
     return <AnimationWrapper><ServerRenderedContent /></AnimationWrapper>
   }
   ```
3. Create a strict rule: `"use client"` only in files under `components/client/` or with a `-client.tsx` suffix.
4. Audit with `next build` output -- check the client bundle size for each route.
5. Wrap third-party client-only libraries (Framer Motion components, chart libraries) in thin client boundary files.

**Detection:**
- `"use client"` in any `layout.tsx` or `page.tsx` file
- JavaScript bundle size over 100KB for marketing pages
- `next build` showing large first-load JS for static pages

**Phase mapping:** Establish the pattern in Phase 1 (Foundation). Enforce it via code review throughout all phases.

**Confidence:** HIGH -- verified against official Next.js Server/Client Component composition documentation.

---

### Pitfall 4: SEO Metadata Neglected Until "Later"

**What goes wrong:** Teams build beautiful pages but skip or hardcode metadata, missing Open Graph images, hreflang tags, structured data, sitemap, and robots.txt. For a B2B site where organic search is the primary acquisition channel, this means months of lost indexing opportunity.

**Why it happens:** Metadata feels like "polish" rather than "architecture." But in Next.js App Router, metadata generation is deeply integrated with the routing system -- it needs to be set up alongside pages, not after.

**Consequences:**
- Google indexes pages without proper titles/descriptions
- Social sharing shows broken previews (no OG images)
- Bulgarian content competes with English content instead of being properly segmented via hreflang
- Missing structured data (Organization, Product, FAQ schemas) means no rich snippets
- Duplicate content penalties if locale variants are not properly linked

**Prevention (from official Next.js metadata documentation):**
1. Create a metadata utility from day one that generates locale-aware metadata:
   ```tsx
   export async function generateMetadata({ params }) {
     const { lang } = await params
     const dict = await getDictionary(lang)
     return {
       title: dict.page.title,
       description: dict.page.description,
       alternates: {
         canonical: `/${lang}/page`,
         languages: { 'en': '/en/page', 'bg': '/bg/page' },
       },
     }
   }
   ```
2. Set up `opengraph-image.tsx` files using `ImageResponse` for dynamic OG images per page.
3. Create `app/sitemap.ts` that generates URLs for all pages in all locales.
4. Create `app/robots.ts` with proper rules.
5. Use React `cache()` to deduplicate data fetches between `generateMetadata` and page rendering.
6. Add structured data (JSON-LD) for Organization, Product, and FAQ schemas.

**Detection:**
- Any page without a `generateMetadata` export or static `metadata` export
- Missing `alternates.languages` in metadata
- No `sitemap.ts` or `robots.ts` in the app root
- Social share previews showing default/broken images

**Phase mapping:** Metadata infrastructure in Phase 1 (Foundation). Page-specific metadata as each page is built. OG images and structured data can be Phase 2 but should not be deferred beyond launch.

**Confidence:** HIGH -- verified against official Next.js metadata documentation.

---

### Pitfall 5: Brand Identity Paralysis

**What goes wrong:** Creating a brand from scratch (logo, colors, typography, design system) becomes an infinite loop of iteration that blocks all other work. The team cannot build pages because "we haven't finalized the brand yet."

**Why it happens:** The project explicitly states brand identity is being created from scratch. There is no existing logo, color palette, or typography. Design decisions are subjective and hard to "finish." The aesthetic goal (Linear/Notion for manufacturing) is aspirational but vague enough to support endless exploration.

**Consequences:**
- Multi-week delay before any page can be built
- Design system churn as brand decisions change
- Inconsistency if pages are built with "placeholder" design that never gets replaced
- Team frustration and loss of momentum

**Prevention:**
1. Time-box brand creation to one focused sprint (1-2 weeks maximum).
2. Make irreversible decisions first: pick 1 primary color, 1 font pair, and a logo concept. Everything else is adjustable.
3. Use Tailwind's theming system with CSS custom properties so brand values are centralized and changeable:
   ```css
   :root {
     --color-primary: #2563eb;
     --color-primary-foreground: #ffffff;
   }
   ```
4. shadcn/ui already provides a design system skeleton -- use its theme customization rather than building from scratch.
5. Start with shadcn/ui default theme, customize colors, ship. Refine later.
6. Separate "good enough to ship" from "perfect brand" -- the first version of the site is not the last.

**Detection:**
- More than 2 weeks spent on brand exploration with no pages built
- Figma files with 10+ color palette variations and no decision
- Developers waiting on design to start coding

**Phase mapping:** Brand foundations (colors, typography, logo) in Phase 1. Refinement ongoing. Do NOT gate page development on brand perfection.

**Confidence:** HIGH -- this is a universal pattern in greenfield marketing projects, especially with the "modern aesthetic" aspiration documented in PROJECT.md.

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or degraded user experience.

---

### Pitfall 6: Framer Motion Animations Tank Core Web Vitals

**What goes wrong:** The animated Gantt chart mockup and scroll animations on the landing page cause poor Largest Contentful Paint (LCP), excessive layout shifts (CLS), and jank on mobile devices. Manufacturing decision-makers on older hardware see a stuttering mess.

**Why it happens:** Framer Motion is a client-side library. Animating the hero section means the LCP element is either delayed (waiting for JS to load and animate it in) or triggers layout shifts as elements animate into position. Complex SVG Gantt animations with many moving parts can drop frames, especially on mid-range devices.

**Prevention:**
1. Never animate the LCP element (the main hero heading/image). It must be visible immediately via server rendering.
2. Use `transform` and `opacity` for all Framer Motion animations -- these are GPU-composited and do not cause layout shifts or reflows.
3. Set explicit `width`/`height` or `aspect-ratio` on all animated containers BEFORE animation starts to prevent CLS.
4. Lazy-load the Gantt animation: render a static preview image server-side, then hydrate with animation only after the page is interactive.
5. Use `useReducedMotion()` from Framer Motion to respect accessibility preferences and provide a static fallback.
6. Wrap Framer Motion components in their own `"use client"` boundary files -- do not let the animation library infect server components.
7. Test on throttled CPU (Chrome DevTools 4x slowdown) targeting mid-range Android devices.
8. Consider using CSS animations for simple effects (fade-in, slide-in) and reserving Framer Motion only for the complex Gantt mockup.

**Detection:**
- LCP > 2.5s on mobile (use Lighthouse or PageSpeed Insights)
- CLS > 0.1 (elements jumping during animation)
- Framer Motion bundle adding 30KB+ to first-load JS on every page (it should only load on pages that use it)
- Hero section blank/invisible until JavaScript loads

**Phase mapping:** Implement the animation architecture (lazy-loading pattern, client boundary isolation) when building the landing page. Performance audit before launch.

**Confidence:** HIGH -- Framer Motion performance characteristics are well-documented; CWV impact on marketing sites is empirically established.

---

### Pitfall 7: Next.js App Router Layout Stale Data Trap

**What goes wrong:** The language switcher or navigation highlights break because layouts in App Router do not re-render on navigation. Developers put locale-dependent content or pathname-dependent styling in layouts, then discover it goes stale.

**Why it happens:** This is a documented App Router behavior (confirmed in official docs): layouts are cached during client-side navigation. They do NOT receive `searchParams`, and their `params` may not update as expected. This catches teams building i18n layouts because they expect the layout to re-render when switching `/en/...` to `/bg/...`.

**Consequences:**
- Language switcher shows wrong active language
- Navigation highlights stuck on previous page
- Content in shared header/footer stays in previous language after locale switch
- Subtle bugs that only appear during client-side navigation, not on full page load

**Prevention (from official Next.js layout documentation):**
1. Use `usePathname()` and `useSelectedLayoutSegment()` (Client Component hooks) for any layout content that depends on the current route.
2. For locale-specific layout content, fetch translations in the layout using the `lang` param (which IS available in layouts) but be aware it does update on navigation between `/en/...` and `/bg/...` because `[lang]` is a dynamic segment.
3. Test the language switcher by navigating (not full-page reload) between locales.
4. For navigation active states, always use client-side hooks, not layout params.
5. Never use `searchParams` in layouts -- it will be stale.

**Detection:**
- Language switcher works on page load but breaks on client-side navigation
- Navigation active state stuck on the first page visited
- Console warnings about stale data in layouts

**Phase mapping:** Must be handled correctly when building the layout/navigation in Phase 1. This is not a bug you can fix later -- it requires the right architecture from the start.

**Confidence:** HIGH -- verified against official Next.js layout documentation including the params/searchParams caveats.

---

### Pitfall 8: `params` as Promise Breaking Change (Next.js 15+)

**What goes wrong:** Code that accesses `params.lang` synchronously breaks at runtime in Next.js 15+ because `params` is now a `Promise`. This affects EVERY page, layout, and `generateMetadata` function in an i18n site.

**Why it happens:** Next.js 15 changed `params` from a synchronous object to a Promise. This was a breaking change documented in the official layout/page API reference. If you follow pre-v15 tutorials (which are the majority online), every example will show `({ params: { lang } })` destructuring -- which no longer works.

**Consequences:**
- Runtime errors on every page: "Cannot read property 'lang' of [object Promise]"
- Extremely confusing because TypeScript types may not catch it if using older type definitions
- Affects `generateMetadata`, `generateStaticParams`, layouts, and pages

**Prevention:**
1. Always await params in Server Components:
   ```tsx
   export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
     const { lang } = await params
   }
   ```
2. In Client Components, use `React.use()`:
   ```tsx
   'use client'
   import { use } from 'react'
   export default function Page({ params }: { params: Promise<{ lang: string }> }) {
     const { lang } = use(params)
   }
   ```
3. Set up a lint rule or code review checklist item for this pattern.
4. Use the latest Next.js TypeScript types which correctly type params as `Promise`.

**Detection:**
- Runtime errors about "Cannot read property of Promise"
- Any `params.lang` access without `await`
- TypeScript errors if using correct Next.js 15+ types

**Phase mapping:** This is a day-1 pattern. Set up the correct params handling in the very first page/layout template so it propagates by copy-paste.

**Confidence:** HIGH -- verified against official Next.js v15 layout documentation.

---

### Pitfall 9: ROI Calculator That Nobody Trusts

**What goes wrong:** The ROI calculator produces numbers that manufacturing decision-makers immediately dismiss as unrealistic, making the entire site feel like marketing fluff. Or worse, the calculator is so simplistic that it produces the same number regardless of inputs.

**Why it happens:** ROI calculators on B2B sites typically suffer from one of three problems:
1. **Inflated outputs** -- always shows massive savings to encourage conversion, but experienced buyers see through this instantly.
2. **Overly simplistic model** -- "How many machines? OK you save $X" with no visible methodology.
3. **Too complex** -- asks for 15 inputs before showing anything, causing abandonment.

**Consequences:**
- Damages brand credibility with the exact audience you need to impress (operations directors who do math for a living)
- Calculator page has high bounce rate
- Leads generated through the calculator are low-quality because they don't trust the numbers

**Prevention:**
1. Start with 3-5 inputs maximum: number of machines, average orders per day, current scheduling method (manual/Excel/other), current time spent scheduling.
2. Show the methodology transparently: "We estimate X hours saved based on [published research / our customer data]."
3. Use conservative estimates -- underestimate savings. A manufacturing operations director who sees a conservative but believable number is more likely to request a demo than one who sees a suspiciously high number.
4. Show ranges, not exact numbers: "15-25 hours/week saved" not "23.7 hours/week saved."
5. End the calculator with a soft CTA: "Want to validate these numbers with your actual data? Book a demo."
6. Consider adding a "How we calculated this" expandable section.

**Detection:**
- Calculator outputs the same impressive number for wildly different inputs
- No methodology explanation visible
- More than 5 required inputs before any output
- Savings percentages over 50% (triggers skepticism)

**Phase mapping:** Design the calculation model during the ROI calculator implementation phase. Validate the model with real customer data before launch.

**Confidence:** MEDIUM -- based on established B2B marketing patterns rather than verified documentation. The specific numbers and thresholds should be validated with actual Prefactor customer data.

---

### Pitfall 10: Bulgarian Content as Afterthought Translation

**What goes wrong:** English content is written first, then translated to Bulgarian as a literal translation that sounds unnatural, misses cultural context, and uses technical terms that Bulgarian manufacturing professionals do not actually use.

**Why it happens:** The team likely thinks in English first (the technical/product language). Bulgarian content gets treated as a mechanical translation step rather than a localization step.

**Consequences:**
- Bulgarian-speaking prospects (the primary local market) feel the product is "not really for them"
- Technical terminology mismatch -- Bulgarian manufacturing uses specific jargon that may not be direct translations of English terms
- SEO failure in Bulgarian -- search terms that Bulgarian manufacturers actually use may differ from translated English keywords
- Loss of the local competitive advantage (competing against international tools that also have poor Bulgarian localization)

**Prevention:**
1. Write Bulgarian content with input from someone who knows the Bulgarian manufacturing industry -- not just a translator.
2. Research Bulgarian search terms independently: what do Bulgarian production managers actually Google when looking for scheduling software?
3. Use separate SEO keyword research per locale -- do not assume Bulgarian keywords are translations of English keywords.
4. For technical terms (Gantt chart, changeover, BOM), verify the terms Bulgarian manufacturers actually use in practice (some may prefer the English terms, others may have established Bulgarian equivalents).
5. Consider having separate content strategies per locale: the English blog targets EU-wide SEO, the Bulgarian blog targets local search terms.

**Detection:**
- Bulgarian content reads like machine translation
- Same blog topics in both languages with direct translations (instead of locale-appropriate topics)
- Bulgarian SEO traffic significantly underperforms English despite Bulgaria being the primary market
- No Bulgarian-specific keyword research document

**Phase mapping:** Address when creating the content/i18n strategy. Dictionary files should be authored by a native speaker familiar with the domain, not translated.

**Confidence:** MEDIUM -- based on B2B localization patterns and the specific BG+EN requirement in PROJECT.md. Specific Bulgarian manufacturing terminology requires domain expert validation.

---

### Pitfall 11: MDX Blog Without Content Infrastructure

**What goes wrong:** Blog posts are created but lack a content system for listing, filtering, pagination, related posts, and SEO metadata. Each new post requires manual updates to index pages, sitemap entries, and navigation.

**Why it happens:** `@next/mdx` handles rendering individual MDX files beautifully but provides zero infrastructure for content collections. There is no built-in way to list all blog posts, sort by date, filter by tag, or generate an RSS feed. Teams discover this after writing 5+ posts and realizing the blog index page is a hardcoded list.

**Consequences:**
- Every new blog post requires code changes (updating the index)
- No tag/category filtering
- No pagination
- No RSS feed (important for B2B audiences)
- Blog feels like a demo, not a real content platform

**Prevention:**
1. Build a content registry from day one -- even if it is just a `posts.ts` file that exports metadata for all posts:
   ```tsx
   export const posts = [
     { slug: 'intro', title: '...', date: '2026-02-06', tags: ['scheduling'], lang: 'en' },
   ]
   ```
2. Create utilities for: `getAllPosts(lang)`, `getPostsByTag(tag, lang)`, `getRecentPosts(count, lang)`.
3. Generate the sitemap from the posts registry.
4. Set up RSS feed generation (`app/feed.xml/route.ts`).
5. If using `@next/mdx` with dynamic imports, create a `generateStaticParams` that reads from the posts registry.
6. Consider `velite` or `fumadocs-mdx` for typed content collections if the hand-rolled approach feels too manual.

**Detection:**
- Blog index page has hardcoded post links
- No way to filter posts by tag or category
- Adding a new post requires changing more than 1-2 files
- No RSS feed

**Phase mapping:** Build content infrastructure when implementing the blog (likely Phase 2 or 3). Do NOT start writing blog posts without this infrastructure.

**Confidence:** HIGH -- verified against official Next.js MDX documentation which explicitly does NOT provide collection management.

---

## Minor Pitfalls

Mistakes that cause annoyance or minor technical debt but are fixable.

---

### Pitfall 12: Font Loading Flash on Locale Switch

**What goes wrong:** Custom fonts flash or cause layout shift when navigating between pages or switching locales. The Bulgarian locale may need Cyrillic font subsets that are not preloaded.

**Why it happens:** Next.js `next/font` handles font optimization well for Latin characters but teams forget that Bulgarian (Cyrillic script) needs additional font subsets loaded. If the Cyrillic subset is not preloaded, switching to Bulgarian shows a FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text).

**Prevention:**
1. Use `next/font/google` or `next/font/local` with explicit `subsets: ['latin', 'cyrillic']`.
2. Verify the chosen font family actually supports Cyrillic (not all do -- especially display/heading fonts).
3. Preload both subsets in the root layout, not conditionally per locale.
4. Test by loading the Bulgarian version directly -- does the font render immediately or flash?

**Detection:**
- Text flickers or changes font on Bulgarian pages
- Lighthouse reports font-related CLS
- Font file requests visible in Network tab on locale switch

**Phase mapping:** Handle when setting up typography in the design system (Phase 1).

**Confidence:** HIGH -- Cyrillic subset requirement is a known i18n pattern for Bulgarian.

---

### Pitfall 13: Demo Request Form Without Proper Validation and Error States

**What goes wrong:** The demo request form (the primary conversion point) has poor validation, unclear error messages, or fails silently when the email service (Resend) has issues. Prospects fill out the form, see nothing happen, and leave.

**Why it happens:** Forms feel simple but have many edge cases: validation, error handling, loading states, success confirmation, email delivery failures, rate limiting, spam protection. Teams build the happy path and ship.

**Prevention:**
1. Use React Hook Form + Zod for type-safe validation (shadcn/ui already pairs well with this).
2. Implement a proper Server Action for form submission with error handling.
3. Show loading state during submission.
4. Show clear success state with expected next steps ("We'll contact you within 24 hours").
5. Implement error fallback: if Resend fails, log the submission to a fallback (database, file, or admin notification).
6. Add honeypot field for spam protection (better than CAPTCHA for B2B UX).
7. Implement rate limiting on the API route.

**Detection:**
- Form submission with no loading indicator
- No success/error message after submission
- No spam protection
- No fallback if Resend API is down

**Phase mapping:** Handle when implementing the contact/demo form. Do not consider it done until error states are implemented.

**Confidence:** HIGH -- standard web form patterns, applicable to this specific Resend + React Email stack.

---

### Pitfall 14: Over-Engineering the Gantt Animation

**What goes wrong:** The animated Gantt chart mockup becomes a mini-application -- with real data binding, interactive tooltips, drag behavior -- approaching the complexity of the actual product. Weeks are spent on a marketing animation.

**Why it happens:** The team builds the real product (which has an actual Gantt chart). The temptation to "make the marketing version realistic" is strong. Scope creep turns a 2-day animation into a 2-week interactive component.

**Prevention:**
1. Define the Gantt mockup as a FIXED animation with predetermined data. Not interactive. Not data-driven.
2. Use a pre-designed SVG or canvas animation with Framer Motion controlling opacity/position of pre-defined bars.
3. Set a hard time-box: 3 days maximum for the Gantt animation. If it is not done in 3 days, ship a static image with a subtle CSS animation.
4. The goal is to SHOW what the product does, not to BE the product. A 10-second looping animation of bars being rearranged by the "optimizer" is sufficient.
5. Consider a before/after static comparison as a simpler alternative that may be equally effective.

**Detection:**
- Gantt component has props for data, configuration, or interaction handlers
- More than 200 lines of animation code
- Component accepts dynamic data instead of hardcoded mockup data
- Anyone says "what if we let users drag the bars"

**Phase mapping:** Landing page phase. Set the scope constraint BEFORE starting implementation.

**Confidence:** HIGH -- scope creep on hero animations is a near-universal pattern in B2B SaaS marketing sites, and this project has the specific risk factor of having a real Gantt implementation to draw from.

---

### Pitfall 15: Ignoring Mobile for a "Desktop Audience"

**What goes wrong:** The team assumes manufacturing decision-makers only use desktop, so mobile experience is deprioritized. In reality, initial discovery often happens on mobile (LinkedIn, email links, conference browsing), and Google uses mobile-first indexing.

**Why it happens:** The B2B manufacturing audience does primarily use the product on desktop. But product usage and marketing site discovery are different. Google's mobile-first indexing means the mobile version of the site is what gets ranked.

**Consequences:**
- Poor mobile experience hurts SEO rankings (Google mobile-first indexing)
- Prospects who discover Prefactor via LinkedIn on their phone see a broken layout
- Interactive elements (ROI calculator, Gantt animation) do not work on mobile
- Touch targets too small for form inputs

**Prevention:**
1. Design mobile-first, enhance for desktop (standard Tailwind approach).
2. The Gantt animation should have a mobile-specific version (simplified or static).
3. ROI calculator must work on mobile -- test form inputs with touch.
4. Test all pages at 375px width throughout development, not just before launch.
5. Ensure CTA buttons are thumb-reachable and minimum 44x44px touch targets.

**Detection:**
- Pages only tested at desktop widths
- Horizontal scrolling on mobile
- Gantt animation overflows or is illegible on small screens
- Form inputs too small to tap accurately

**Phase mapping:** Mobile responsiveness must be part of every phase, not a final "polish" step.

**Confidence:** HIGH -- Google mobile-first indexing is well-documented; LinkedIn as a B2B discovery channel is established.

---

### Pitfall 16: Presenting Future Features as Current Without a Safety Net

**What goes wrong:** PROJECT.md explicitly says "Present future features as existing capabilities." If the site goes live claiming features like "Full BOM management," "Inventory tracking," and "Shop floor tracking" as available, and a prospect requests a demo expecting those features, the sales conversation starts with a credibility gap.

**Why it happens:** This is a deliberate marketing decision (documented in project key decisions). The risk is not the decision itself but the lack of guardrails.

**Prevention:**
1. Use forward-looking language that is truthful but aspirational: "Comprehensive BOM management" (not "includes BOM management" if it does not yet).
2. On the features page, distinguish between "Core Platform" (what exists) and "Platform Capabilities" (the full vision) without making the distinction obvious to casual readers.
3. Ensure the demo request flow captures which features the prospect is most interested in -- so the sales team knows what to expect.
4. Have the demo script ready to address "we're actively building X and it will be available by [date]" for features that are coming soon.
5. Do NOT put fake screenshots or mockups of features that do not exist -- that crosses a line.

**Detection:**
- Feature descriptions that imply hands-on usage of unbuilt features
- Screenshots or videos of nonexistent features
- No mechanism to track which features prospects are interested in
- Sales team surprised by prospect expectations

**Phase mapping:** Content strategy phase. Write feature descriptions carefully. Add feature interest tracking to the demo request form.

**Confidence:** MEDIUM -- this is a business/ethical judgment call specific to this project. The risk assessment is based on B2B sales patterns.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation | Severity |
|-------------|---------------|------------|----------|
| Foundation / Setup | i18n not baked into routing from day 1 (#1) | Start with `app/[lang]/` structure immediately | Critical |
| Foundation / Setup | Wrong params pattern (#8) | Use async params from first file | Critical |
| Foundation / Setup | Contentlayer dependency (#2) | Use @next/mdx + custom content layer | Critical |
| Design System | Brand paralysis (#5) | Time-box to 1-2 weeks, use shadcn/ui defaults | Critical |
| Design System | No Cyrillic font support (#12) | Verify font + load both subsets | Minor |
| Landing Page | Gantt animation scope creep (#14) | Hard 3-day time-box, fixed animation | Moderate |
| Landing Page | Animation tanks LCP (#6) | Lazy-load animation, static fallback | Moderate |
| Landing Page | Mobile ignored (#15) | Mobile-first from the start | Moderate |
| Blog | No content infrastructure (#11) | Build registry before writing posts | Moderate |
| Blog | MDX frontmatter surprise (#2) | Use exports or add plugins | Moderate |
| SEO | Metadata neglected (#4) | Metadata utility from day 1 | Critical |
| SEO | Bulgarian SEO as afterthought (#10) | Independent keyword research per locale | Moderate |
| ROI Calculator | Unbelievable numbers (#9) | Conservative estimates, show methodology | Moderate |
| Contact Form | Silent failures (#13) | Error states, fallback, spam protection | Moderate |
| Content | Future features misrepresented (#16) | Careful language, feature interest tracking | Moderate |
| All Phases | Client boundary creep (#3) | Strict "use client" placement rules | Critical |
| Layout/Nav | Stale layout data (#7) | Use client hooks for dynamic layout content | Moderate |

---

## Sources

- Next.js App Router i18n Documentation: https://nextjs.org/docs/app/building-your-application/routing/internationalization [HIGH confidence]
- Next.js Metadata API Documentation: https://nextjs.org/docs/app/building-your-application/optimizing/metadata [HIGH confidence]
- Next.js MDX Documentation: https://nextjs.org/docs/app/building-your-application/configuring/mdx [HIGH confidence]
- Next.js Server/Client Component Composition Patterns: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns [HIGH confidence]
- Next.js Layout API Reference: https://nextjs.org/docs/app/api-reference/file-conventions/layout [HIGH confidence]
- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images [HIGH confidence]
- B2B marketing patterns and ROI calculator best practices: training data [MEDIUM confidence -- based on established patterns but not verified against a specific 2026 source]
- Contentlayer project status: community knowledge [MEDIUM confidence -- widely reported but not independently verified in this research session]
