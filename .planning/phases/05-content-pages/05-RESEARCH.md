# Phase 5: Content Pages - Research

**Researched:** 2026-02-09
**Domain:** Features page, Use Cases pages, About page, Pricing page -- B2B SaaS content page patterns, translation strategy, component architecture
**Confidence:** HIGH

## Summary

Phase 5 replaces the four "Coming Soon" stub pages (features, use-cases, pricing, about) with fully built-out content pages. The use-cases route also needs 2-3 sub-routes for industry-specific pages. All pages are async server components using `getTranslations` from `next-intl/server`, following the established pattern from landing page sections. Each page needs its own translation namespace(s) in both `en.json` and `bg.json`.

The primary technical work is: (1) writing extensive bilingual translation content for 4+ pages across 6 feature domains, 3 use cases, team/mission, and pricing tiers; (2) building reusable section components (feature domain cards, pricing tier cards, team member cards, use-case hero sections); (3) adding new shadcn/ui components (Tabs, Accordion, Card, Table, Badge, Separator) for structured content presentation; (4) creating sub-routes under `/use-cases/[slug]` for individual industry pages.

No new npm packages are needed. All existing patterns (async server components, `getTranslations`, `Link` from `@/i18n/navigation`, brand color scale, typography scale, `Button` variants) carry forward unchanged. The content volume is the biggest challenge -- each page needs substantial marketing copy in both English and Bulgarian.

**Primary recommendation:** Organize work by page: Features first (most complex, most content), then Use Cases (requires new sub-routing), then Pricing (needs comparison table), then About (simplest). Each page follows the established section-component pattern: page.tsx is a composition root importing section components.

## Standard Stack

### Core (already installed -- no changes)

| Library | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.1.6 | App Router, server components, dynamic routes |
| next-intl | ^4.8.2 | `getTranslations`, `Link`, locale routing |
| Tailwind CSS | ^4 | CSS-first config, brand tokens, typography scale |
| shadcn/ui | 3.8.4 (CLI) | UI components |
| lucide-react | ^0.563.0 | Icons for feature cards, use case visuals |
| motion | ^12.34.0 | Entrance animations (whileInView on scroll) |

### New shadcn/ui Components to Add

| Component | Install Command | Purpose |
|-----------|----------------|---------|
| Tabs | `npx shadcn@latest add tabs` | Features page domain switching (scheduling, resources, optimization...) |
| Accordion | `npx shadcn@latest add accordion` | FAQ sections on pricing/features; collapsible feature detail |
| Card | `npx shadcn@latest add card` | Pricing tier cards, team member cards, use case cards |
| Badge | `npx shadcn@latest add badge` | "Popular", "Enterprise", "Coming Soon" tier labels |
| Separator | `npx shadcn@latest add separator` | Visual dividers between content sections |
| Table | `npx shadcn@latest add table` | Pricing feature comparison matrix |

### Not Needed

| Library | Why Not |
|---------|---------|
| MDX / content layer | Content pages use translation JSON, not MDX. Blog (Phase 6) will use MDX |
| react-icons | lucide-react already installed and covers all needed icons |
| Any pricing library | Static tiers with "Contact" CTA; no billing integration |
| Any carousel/slider | Anti-pattern per FEATURES.md research; static grids preferred |

## Architecture Patterns

### Recommended Project Structure

```
src/
  app/
    [locale]/
      features/
        page.tsx                    # Features page (replace stub)
      use-cases/
        page.tsx                    # Use Cases index (overview + links to sub-pages)
        [slug]/
          page.tsx                  # Individual use case (discrete-manufacturing, job-shops, production-planning)
      pricing/
        page.tsx                    # Pricing page (replace stub)
      about/
        page.tsx                    # About page (replace stub)
  components/
    sections/
      features/
        FeatureHero.tsx             # Features page hero section
        FeatureDomainSection.tsx    # Reusable domain section (scheduling, resources, etc.)
        FeatureDomainCard.tsx       # Individual feature card within a domain
      use-cases/
        UseCaseHero.tsx             # Use case page hero with industry-specific visual
        UseCaseBenefits.tsx         # Benefits grid for a use case
        UseCaseTestimonial.tsx      # Industry-specific testimonial
      pricing/
        PricingHero.tsx             # Pricing page hero
        PricingTierCard.tsx         # Individual tier card
        PricingComparisonTable.tsx  # Feature comparison matrix
      about/
        AboutHero.tsx               # About page hero
        TeamSection.tsx             # Team member grid
        CompanyStory.tsx            # Company story/timeline
        MissionValues.tsx           # Mission + values section
```

### Pattern 1: Page as Composition Root (Established Pattern)

**What:** Each page.tsx imports and composes section components. The page itself does minimal work beyond `setRequestLocale` and `generateMetadata`.

**Established in:** Phase 3 landing page (`src/app/[locale]/page.tsx`)

**Example (Features page):**
```typescript
// src/app/[locale]/features/page.tsx
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {FeatureHero} from '@/components/sections/features/FeatureHero';
import {FeatureDomainSection} from '@/components/sections/features/FeatureDomainSection';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FeaturesPage'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
  };
}

export default async function FeaturesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <FeatureHero />
      <FeatureDomainSection domain="scheduling" />
      <FeatureDomainSection domain="resources" />
      <FeatureDomainSection domain="optimization" />
      <FeatureDomainSection domain="bom" />
      <FeatureDomainSection domain="inventory" />
      <FeatureDomainSection domain="shopFloor" />
      <CTABanner />
    </>
  );
}
```

### Pattern 2: Dynamic Sub-Routes for Use Cases

**What:** The `/use-cases` route has an index page listing all use cases, plus `/use-cases/[slug]` for individual pages. Use `generateStaticParams` to pre-render all slugs.

**Example:**
```typescript
// src/app/[locale]/use-cases/[slug]/page.tsx
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';

const VALID_SLUGS = ['discrete-manufacturing', 'job-shops', 'production-planning'] as const;
type UseCaseSlug = typeof VALID_SLUGS[number];

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props) {
  const {locale, slug} = await params;
  if (!VALID_SLUGS.includes(slug as UseCaseSlug)) return {};
  const t = await getTranslations({locale, namespace: `UseCases.${slug}`});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
  };
}

export default async function UseCasePage({params}: Props) {
  const {locale, slug} = await params;
  if (!VALID_SLUGS.includes(slug as UseCaseSlug)) notFound();
  setRequestLocale(locale);

  // ... render use case content
}
```

### Pattern 3: Parameterized Section Components

**What:** A single reusable section component that accepts a domain/key prop and fetches the corresponding translations. Avoids duplicating near-identical components.

**Example:**
```typescript
// src/components/sections/features/FeatureDomainSection.tsx
import {getTranslations} from 'next-intl/server';
import {featureDomainIcons} from './feature-icons';

interface Props {
  domain: string;
}

export async function FeatureDomainSection({domain}: Props) {
  const t = await getTranslations(`FeaturesPage.domains.${domain}`);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-heading md:text-display mb-4">{t('title')}</h2>
        <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl">
          {t('description')}
        </p>
        {/* Feature cards grid */}
      </div>
    </section>
  );
}
```

### Pattern 4: Reusing CTABanner Across Pages

**What:** The existing `CTABanner` component is a generic "Request a Demo" section. It can be reused at the bottom of every content page without modification, since it uses its own translation namespace.

**Already built:** `src/components/sections/CTABanner.tsx`

### Pattern 5: Pricing Tier Cards with "Contact for Pricing"

**What:** Enterprise/consultative pricing with no public prices. Each tier shows included features and a "Contact for Pricing" CTA button. The comparison table at the bottom shows feature availability across tiers with checkmarks/crosses.

**Design pattern (from research):**
- 3 tiers: Starter/Essentials, Professional/Growth, Enterprise
- Highlight middle tier as "Most Popular" with Badge
- All CTAs link to `/contact` -- no self-serve purchase
- Feature comparison table below tier cards
- Enterprise tier may have slightly different CTA text ("Let's Talk" or "Contact Sales")

### Anti-Patterns to Avoid

- **200-row feature comparison table:** Keep to 15-20 key differentiating features max. Link to a detailed spec sheet for those who want exhaustive lists.
- **Stock photos of factories/hard hats:** Use icons (Lucide), illustrations, or product screenshots instead. The FEATURES.md research flagged this explicitly.
- **Jargon-heavy copy:** Write for production managers, not software engineers. Plain language first, technical depth in expandable sections.
- **Carousel for testimonials:** Static grid, not paginated slider. Already established in SocialProof component.
- **Gating all content behind forms:** All content pages are public/ungated. Only the ROI calculator (Phase 7) gates results.
- **Making everything a client component:** Content pages are pure server components. Only interactive elements (tabs, accordions) need `"use client"`. Prefer server rendering for SEO.

## Content Structure by Page

### CONT-01: Features Page

**Organization:** Six feature domains, each as a distinct section with alternating visual direction (left/right or full-width).

| Domain | Key Features | Status |
|--------|-------------|--------|
| **Scheduling** | Gantt chart visualization, drag-and-drop scheduling, real-time conflict detection, multi-resource view | Current |
| **Resource Management** | Machine/worker/station tracking, capacity planning, resource groups, availability calendars | Current |
| **Optimization** | AI scheduling engine, configurable objectives (minimize late orders, reduce changeover, balance workload), constraint handling | Current |
| **Shift & Calendar** | Shift templates, break management, changeover time matrices, attribute-based setup times, holiday calendars | Current |
| **BOM & Inventory** | Bill of materials, multi-level BOM, inventory tracking, stock management, purchase order suggestions | Future (present as existing) |
| **Shop Floor Tracking** | Real-time production status, order progress tracking, operator feedback, quality checks | Future (present as existing) |

**Section layout per domain:**
1. Domain title + icon + 1-2 sentence overview
2. Grid of 3-4 feature cards with icon, title, description
3. Optional: screenshot/illustration placeholder (can be a styled SVG or brand-colored card)

**Translation namespace:** `FeaturesPage` with nested `domains.scheduling`, `domains.resources`, etc.

**Estimated translation keys:** ~80-100 keys (6 domains x ~4 features each x title+description, plus page-level hero, meta, headings)

### CONT-02: Use Cases / Industries Pages

**Structure:** Index page + 3 individual pages.

| Use Case | Slug | Target Audience | Key Pain Points |
|----------|------|-----------------|-----------------|
| **Discrete Manufacturing** | `discrete-manufacturing` | Operations directors at SME factories | Manual scheduling chaos, Excel limitations, no visibility across machines |
| **Job Shops** | `job-shops` | Production managers at job shops/make-to-order | High-mix low-volume, every order different, constant reprioritization |
| **Production Planning** | `production-planning` | Production planners, scheduling analysts | Time-consuming manual planning, no "what-if" scenarios, reactive not proactive |

**Page structure per use case:**
1. Hero with industry-specific headline and subtext
2. Pain points section (3-4 challenges this audience faces)
3. How Planifactor solves it (3-4 solutions mapped to pain points)
4. Key benefits/metrics (quantified where possible)
5. Industry-specific testimonial (placeholder)
6. CTA Banner (reuse existing component)

**Index page structure:**
1. Overview headline
2. 3 use case cards linking to individual pages
3. CTABanner

**Translation namespaces:** `UseCasesIndex` + `UseCases.discrete-manufacturing`, `UseCases.job-shops`, `UseCases.production-planning`

**Estimated translation keys:** ~100-120 keys (index page ~10 + 3 pages x ~35 keys each)

### CONT-03: About Page

**Structure:** Single page with multiple sections.

**Sections:**
1. **Hero** -- Company mission statement headline + brief story
2. **Company Story** -- Origin narrative (why we built Planifactor, the problem we saw in manufacturing)
3. **Mission & Values** -- 3-4 core values with icons
4. **Team Section** -- Grid of team member cards (photo placeholder with Avatar, name, role, brief bio)
5. **CTABanner** (reuse)

**Note:** Team member data is placeholder. Real photos and bios will replace later. Use Avatar component (already installed) with initials fallback.

**Translation namespace:** `AboutPage`

**Estimated translation keys:** ~50-60 keys (hero ~5, story ~5, values ~20, team ~25, meta ~3)

### CONT-04: Pricing Page

**Structure:** Tier cards + comparison table + FAQ.

**Pricing Tiers (per STATE.md: no public pricing, "Contact for pricing"):**

| Tier | Name | Target | Key Differentiators |
|------|------|--------|-------------------|
| **Starter** | Essentials / Starter | Small manufacturers, 1-2 resources | Basic Gantt, order management, single shift |
| **Professional** | Professional / Growth | Growing manufacturers | Full optimization, multi-resource, shifts, BOM |
| **Enterprise** | Enterprise | Large operations, custom needs | Unlimited resources, API, dedicated support, custom integrations |

**Page sections:**
1. Hero headline + subtext
2. 3 tier cards in a row (highlight middle as "Most Popular")
3. Feature comparison table (15-20 rows, 3 columns for tiers)
4. FAQ accordion (5-8 common questions)
5. CTABanner

**All tier CTAs link to `/contact`.** No price numbers displayed anywhere.

**Translation namespace:** `PricingPage`

**Estimated translation keys:** ~100-120 keys (hero ~5, 3 tiers x ~10, comparison table ~60 feature rows x label, FAQ ~20, meta ~3)

## Translation Strategy

### Namespace Organization

New namespaces needed for Phase 5 (added to both `en.json` and `bg.json`):

| Namespace | Purpose | Approx. Keys |
|-----------|---------|-------------|
| `FeaturesPage` | Features page content | 80-100 |
| `UseCasesIndex` | Use cases index page | 10-15 |
| `UseCases` | Individual use case pages (nested by slug) | 100-120 |
| `PricingPage` | Pricing page content | 100-120 |
| `AboutPage` | About page content | 50-60 |

**Total new translation keys:** ~350-420 per locale (~700-840 total across EN + BG)

### Content Authoring Considerations

- **English first:** Write all content in English, then translate to Bulgarian
- **Consistent terminology:** Use the same terms across pages (e.g., "scheduling" not sometimes "planning" sometimes "scheduling")
- **SEO-friendly headings:** Include target keywords in H1/H2 tags ("Production Scheduling Software", "AI Manufacturing Optimization")
- **Bulgarian quality:** Machine translation for initial pass is acceptable but should be reviewed by a native speaker (noted as open TODO in STATE.md)

### Handling Large Translation Files

The `en.json` and `bg.json` files will grow significantly (~400+ new keys). The current structure with flat namespace keys works well. next-intl loads the entire messages file per request, but with SSG/ISR this is only at build time, not per-request.

**Alternative:** If file size becomes unwieldy, next-intl supports splitting messages per namespace via `getMessages` with specific namespace imports. However, with ~500 total keys the single-file approach remains manageable.

## Component Decisions

### Server vs Client Components

| Component | Type | Why |
|-----------|------|-----|
| Feature page sections | Server | Pure translation content, no interactivity |
| Feature domain tabs (if used) | Client | Tab switching requires state |
| Use case pages | Server | Static translated content |
| Pricing tier cards | Server | Static content with links |
| Pricing comparison table | Server | Static table, no interactivity |
| Pricing FAQ accordion | Client | Accordion toggle requires state |
| About team grid | Server | Static content |
| All page.tsx files | Server | Established pattern |

**Key insight:** Most content page components are pure server components. Only interactive UI elements (tabs, accordions) need the `"use client"` directive. This maximizes SEO and minimizes client bundle size.

### Entrance Animations (Optional)

From Phase 4, the project uses `motion` with `LazyMotion + domAnimation`. For content pages, subtle entrance animations (`whileInView` with `opacity` + `y` translation) can be added to section components. However, this is optional polish -- the content itself is the priority.

If used, follow the established pattern:
```typescript
'use client';
import {LazyMotion, domAnimation, m} from 'motion/react';

// Wrap section content in m.div with whileInView
```

**Recommendation:** Skip entrance animations for Phase 5. Add them in a polish pass or Phase 8 (performance). Content-first.

### Icon Strategy

Lucide icons (already installed at ^0.563.0) cover all needed icons for feature domains:

| Domain | Suggested Icons |
|--------|----------------|
| Scheduling | `GanttChart`, `CalendarDays`, `Clock`, `Timer` |
| Resources | `Users`, `Wrench`, `Factory`, `HardDrive` |
| Optimization | `Brain`, `Zap`, `Target`, `TrendingUp` |
| Shifts/Calendar | `Calendar`, `Clock`, `Coffee`, `RotateCcw` |
| BOM/Inventory | `Layers`, `Package`, `ClipboardList`, `Boxes` |
| Shop Floor | `Activity`, `MonitorCheck`, `ScanLine`, `CheckCircle` |
| Use Case: Manufacturing | `Factory`, `Cog`, `Cpu` |
| Use Case: Job Shops | `Scissors`, `Puzzle`, `ListOrdered` |
| Use Case: Planning | `CalendarRange`, `LineChart`, `Target` |
| Pricing tiers | `Rocket`, `Star`, `Crown` or `Building` |
| About values | `Heart`, `Shield`, `Lightbulb`, `Globe` |

## Navigation Integration

### Current Header NavLinks (no changes needed)

```typescript
const navLinks = [
  {href: '/features', key: 'features'},
  {href: '/use-cases', key: 'useCases'},
  {href: '/pricing', key: 'pricing'},
  {href: '/about', key: 'about'},
  {href: '/blog', key: 'blog'},
  {href: '/contact', key: 'contact'},
] as const;
```

All four content pages are already in the header navigation. The `/use-cases` link goes to the index page. Individual use case pages are reached from the index page cards, not from the header nav.

### Footer Links (no changes needed)

```typescript
const productLinks = [
  {href: '/features', key: 'features'},
  {href: '/use-cases', key: 'useCases'},
  {href: '/pricing', key: 'pricing'},
] as const;

const companyLinks = [
  {href: '/about', key: 'about'},
  {href: '/blog', key: 'blog'},
  {href: '/contact', key: 'contact'},
] as const;
```

No navigation changes are needed. All routes already exist.

## Responsive Design Approach

### Breakpoint Strategy (Established)

| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| Mobile | < 768px (`md`) | Single column, stacked sections, full-width cards |
| Tablet | 768px - 1024px | 2-column grids, side-by-side where appropriate |
| Desktop | > 1024px (`lg`) | Full layout, 3-column grids, alternating section directions |

### Per-Page Responsive Notes

- **Features:** Feature domain cards in 1-col (mobile) / 2-col (tablet) / 3-col (desktop) grid
- **Use Cases index:** Use case cards in 1-col (mobile) / 3-col (desktop) grid
- **Use Cases detail:** Content flows single-column with full-width sections at all sizes
- **Pricing:** Tier cards in 1-col (mobile) / 3-col (desktop); comparison table horizontal-scrollable on mobile
- **About:** Team member cards in 1-col (mobile) / 2-col (tablet) / 3-4-col (desktop) grid

## Common Pitfalls

### Pitfall 1: Translation Key Explosion

**What goes wrong:** Hundreds of translation keys become unmanageable, leading to typos, mismatches between EN and BG, or missing keys.
**How to avoid:** Systematic namespace naming (`FeaturesPage.domains.scheduling.features.0.title`). Use numbered arrays for feature lists (same pattern as existing `SocialProof.testimonials.0.quote`). Always add keys to both locale files simultaneously. Run a build to catch missing key warnings.

### Pitfall 2: Use Case Sub-Routes Not Generating Static Params

**What goes wrong:** Individual use case pages return 404 because `generateStaticParams` is missing or misconfigured.
**How to avoid:** Add `generateStaticParams` returning all valid slugs. The function needs to return `{slug: string}[]`. For localized routes in next-intl with App Router, the locale is handled by the parent `[locale]` segment -- only the `slug` param is needed in the child `generateStaticParams`.

### Pitfall 3: Pricing Table Overflow on Mobile

**What goes wrong:** A 3-column feature comparison table overflows the mobile viewport, breaking the layout.
**How to avoid:** Wrap the table in a horizontal scroll container (`overflow-x-auto`). Or, on mobile, collapse the table into an accordion format where each tier expands to show its features. The simplest approach is `overflow-x-auto` on the table container.

### Pitfall 4: Inconsistent Section Spacing

**What goes wrong:** Content pages look uneven because each section uses different padding/margins.
**How to avoid:** Standardize section padding. All existing sections use `py-20 px-4` (or `py-16 px-4`) with `max-w-7xl mx-auto`. Apply the same pattern to all new sections. Create a semantic class or wrapper if desired, but the existing Tailwind utility pattern is consistent enough.

### Pitfall 5: Bulgarian Content Quality

**What goes wrong:** Machine-translated Bulgarian reads awkwardly and undermines credibility with the primary market.
**How to avoid:** Write initial content in English, translate to Bulgarian using AI assistance, but flag all Bulgarian content for native speaker review (already noted as open TODO in STATE.md). Focus on getting the structure right; content polish can happen iteratively.

### Pitfall 6: Missing Metadata on Content Pages

**What goes wrong:** Content pages lack proper `<title>` and `<meta description>`, hurting SEO.
**How to avoid:** Every page.tsx must export `generateMetadata`. Use the established pattern from stub pages (`${t('metaTitle')} | Planifactor`). Add `metaTitle` and `metaDescription` keys to each new namespace.

### Pitfall 7: Presenting Future Features Without Asterisks

**What goes wrong:** Presenting BOM, Inventory, and Shop Floor as existing features could mislead customers who immediately try to use them.
**How to avoid:** Per STATE.md decision "Present future features as existing" -- the website shows the full platform vision. No asterisks or "coming soon" labels on these features. The product roadmap is internal. If needed, a subtle "Contact us for availability" can be added per feature, but the stated decision is to present everything as existing.

## Sizing Estimate

| Page | Complexity | Translation Keys | New Components | Effort |
|------|-----------|-----------------|----------------|--------|
| Features | High | ~90 | FeatureHero, FeatureDomainSection, FeatureDomainCard | Large (6 domains, most content) |
| Use Cases (index + 3) | Medium-High | ~120 | UseCaseHero, UseCaseBenefits, UseCaseCard, sub-routing | Large (4 pages total) |
| Pricing | Medium | ~110 | PricingHero, PricingTierCard, PricingComparisonTable, FAQ | Medium-Large |
| About | Low-Medium | ~55 | AboutHero, TeamSection, CompanyStory, MissionValues | Medium |

**Total new components:** ~12-14
**Total new translation keys:** ~375 per locale
**Recommended plan count:** 3-4 plans

### Suggested Plan Split

1. **Plan 05-01:** shadcn components + Features page (biggest, most foundational)
2. **Plan 05-02:** Use Cases pages (index + 3 sub-pages, new routing pattern)
3. **Plan 05-03:** Pricing page (comparison table, tier cards, FAQ)
4. **Plan 05-04:** About page (team, story, mission)

Alternative (3 plans):
1. **Plan 05-01:** shadcn components + Features page
2. **Plan 05-02:** Use Cases (index + 3 sub-pages) + About page
3. **Plan 05-03:** Pricing page

## Open Questions

1. **Features page interaction model:** Should feature domains be displayed as a single scrollable page (all 6 domains visible), or organized with Tabs where you click to switch domains? Scrollable is simpler, better for SEO (all content rendered server-side), and follows the pattern of the landing page. Tabs require client interactivity but create a cleaner navigation within the page.
   - **Recommendation:** Scrollable page with all domains visible. Better for SEO (all content in the DOM), simpler to implement (pure server components), and more scannable. Add a sticky in-page navigation (anchor links) if the page feels too long. Tabs hide content from crawlers unless rendered server-side.

2. **Use case sub-route structure:** Should individual use cases be at `/use-cases/discrete-manufacturing` or should the index page contain all content in sections?
   - **Recommendation:** Separate sub-routes. Better for SEO (each use case gets its own URL, title, meta description targeting industry-specific keywords like "production scheduling for job shops"). The index page is a lightweight overview linking to detail pages.

3. **Pricing tier naming:** What should the three tiers be called?
   - **Recommendation:** "Starter", "Professional" (highlighted as Most Popular), "Enterprise". These are standard, recognizable, and map to natural growth stages. The executor can refine the names during implementation.

4. **Team member data:** How many team members should be shown, and should they be real or placeholder?
   - **Recommendation:** Start with 3-5 placeholder team members using Avatar initials (established pattern from SocialProof). Real photos and bios can replace these later. Include CEO/Founder, CTO, and 1-2 key roles.

5. **Should content pages reuse the existing `CTABanner` at the bottom, or have page-specific CTAs?**
   - **Recommendation:** Reuse `CTABanner` on all pages. It is already generic ("Ready to Optimize Your Production?") and links to `/contact`. Consistency is more important than per-page customization at this stage.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis (all patterns verified by reading actual source files)
- [Phase 3 Research](../03-layout-landing/03-RESEARCH.md) -- layout shell patterns carry forward
- [Phase 4 Research](../04-animated-gantt-visuals/04-RESEARCH.md) -- motion patterns for optional animations
- [FEATURES.md](../../research/FEATURES.md) -- competitor analysis, anti-patterns, table stakes
- [STATE.md](../../STATE.md) -- key decisions (no public pricing, present future features as existing)
- [PROJECT.md](../../PROJECT.md) -- product feature inventory, target audience, brand positioning

### Secondary (MEDIUM confidence)
- [B2B SaaS Product Pages Formula](https://www.poweredbysearch.com/blog/how-to-design-b2b-saas-product-pages-with-examples/) -- features page structure patterns
- [Best SaaS Product/Features Pages](https://www.poweredbysearch.com/learn/best-saas-product-features-pages/) -- 16 examples of effective features pages
- [SaaS Pricing Page Design](https://www.webstacks.com/blog/saas-pricing-page-design) -- 20 pricing page examples, tier psychology
- [SaaS Pricing Page Psychology](https://www.orbix.studio/blogs/saas-pricing-page-psychology-convert) -- anchoring effect, tier design
- [B2B About Us Page Examples](https://www.brafton.com/blog/graphics/12-b2b-about-us-page-examples-to-spark-ideas-for-your-own/) -- team sections, company story patterns
- [SaaS About Us Pages](https://www.growthmentor.com/blog/about-us-page-examples/) -- 22 examples with design analysis
- [Manufacturing Landing Pages](https://evenbound.com/blog/landing-pages-b2b-manufacturing-website-needs) -- industry-specific content strategy
- [B2B Website Design Best Practices 2025](https://www.trajectorywebdesign.com/blog/b2b-website-design-best-practices) -- comprehensive design guide
- [shadcn/ui Components](https://ui.shadcn.com/docs/components) -- Tabs, Accordion, Card, Table, Badge, Separator

### Tertiary (LOW confidence)
- Bulgarian translation quality assessment: No native speaker available for validation during research. Flagged as open TODO.
- Team member placeholder data: Will need real data eventually; placeholders are acceptable for initial build.

## Metadata

**Confidence breakdown:**
- Architecture patterns (page composition, server components, translations): HIGH -- established patterns from Phases 3-4
- Component choices (shadcn Tabs, Accordion, Card, Table): HIGH -- well-documented, widely used
- Content structure per page: HIGH -- based on competitor analysis and B2B SaaS best practices
- Translation volume estimate (~375 keys/locale): MEDIUM -- may be higher or lower depending on content depth
- Use case sub-routing pattern: HIGH -- standard Next.js App Router dynamic routes
- Pricing tier structure: MEDIUM -- naming and feature allocation may change based on business input
- SEO impact of content pages: HIGH -- content pages are critical for organic discovery

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (no external dependency changes expected)
