# Phase 3: Layout Shell & Landing Page - Research

**Researched:** 2026-02-09
**Domain:** Next.js App Router layout shell, landing page sections, responsive navigation, shadcn/ui components
**Confidence:** HIGH

## Summary

Phase 3 builds the site-wide navigation shell (sticky header + footer) and the full landing page with Hero, Feature Highlights, Social Proof, CTA Banner sections. The existing codebase already has a functional locale layout at `src/app/[locale]/layout.tsx` with a temporary header containing the LanguageSwitcher. This layout will be restructured to include the proper Header and Footer components.

The standard approach is: keep the locale layout as a server component, extract Header as a client component (it needs state for mobile menu toggle), compose landing page sections as server components in the home page, and use shadcn/ui Sheet component for the mobile slide-in drawer. Navigation uses next-intl's `Link` component (already set up at `src/i18n/navigation.ts`) which auto-handles locale prefixes.

**Primary recommendation:** Build the Header as a `'use client'` component (due to mobile menu state and scroll detection), the Footer as a server component, and each landing page section as a server component. Use shadcn/ui Sheet (side="right") for the mobile drawer. Create a static SVG React component for the Gantt mockup in the hero section.

## Standard Stack

### Core (already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, layouts, server components | Framework (decided Phase 1) |
| next-intl | ^4.8.2 | i18n, `Link` component, `useTranslations`, `getTranslations` | i18n solution (decided Phase 1) |
| Tailwind CSS | ^4 | Styling via CSS-first config | Styling (decided Phase 1) |
| shadcn/ui | 3.8.4 (CLI) | Button, Sheet, Avatar components | UI components (decided Phase 1) |
| lucide-react | ^0.563.0 | Icons for feature cards, nav hamburger, social | Icon library (already installed) |
| radix-ui | ^1.4.3 | Unified Radix primitives (Sheet is built on Dialog) | Underlying primitives (already installed) |

### New shadcn/ui Components to Add

| Component | Install Command | Purpose |
|-----------|----------------|---------|
| Sheet | `npx shadcn@latest add sheet` | Mobile navigation slide-in drawer |
| Avatar | `npx shadcn@latest add avatar` | Testimonial photo placeholders |

### Not Needed

| Library | Why Not |
|---------|---------|
| NavigationMenu (shadcn) | Overkill for simple nav links; NavigationMenu is designed for dropdown mega-menus. Simple `<nav>` with `Link` components is cleaner for 6 flat links |
| Framer Motion | Not needed yet (Phase 4 adds animations). Static content only in Phase 3 |
| Any Gantt chart library | The hero Gantt is a static SVG illustration, not an interactive chart |

## Architecture Patterns

### Recommended Project Structure

```
src/
  components/
    layout/
      Header.tsx          # 'use client' - sticky header with mobile menu state
      Footer.tsx           # Server component - static content
      MobileNav.tsx        # 'use client' - Sheet-based mobile drawer (can be part of Header)
      LanguageSwitcher.tsx # 'use client' - already exists
    brand/
      Logo.tsx             # Already exists
    sections/
      Hero.tsx             # Server component - hero section
      FeatureHighlights.tsx # Server component - feature cards grid
      SocialProof.tsx      # Server component - logos + testimonials
      CTABanner.tsx        # Server component - secondary CTA
    ui/
      button.tsx           # Already exists
      sheet.tsx            # Add via shadcn CLI
      avatar.tsx           # Add via shadcn CLI
  app/
    [locale]/
      layout.tsx           # Server component - wraps children with Header + Footer
      page.tsx             # Server component - composes section components
```

### Pattern 1: Layout Shell in Locale Layout

**What:** The `[locale]/layout.tsx` remains a server component. It renders the Header and Footer around `{children}`. The Header is a client component imported into the server layout.

**When to use:** Always -- this is the Next.js App Router standard for shared navigation.

**Example:**
```typescript
// src/app/[locale]/layout.tsx (server component)
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  // ... locale validation, setRequestLocale ...

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Key insight:** Even though the layout is a server component, it can render `<Header />` which is a client component. The `NextIntlClientProvider` wraps everything so client components can use `useTranslations`.

### Pattern 2: Client Component Header with Server Layout

**What:** The Header needs `'use client'` because it manages: (1) mobile menu open/close state, (2) potentially scroll detection for styling changes. Keep the client boundary at the Header level, not higher.

**When to use:** When a layout element needs interactivity (state, event handlers).

**Example:**
```typescript
// src/components/layout/Header.tsx
'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Logo} from '@/components/brand/Logo';
import {Button} from '@/components/ui/button';
import {LanguageSwitcher} from '@/components/layout/LanguageSwitcher';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('Navigation');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium">{t('features')}</Link>
          {/* ... other links ... */}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/contact">{t('requestDemo')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            {/* Mobile nav links + language switcher + CTA */}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

### Pattern 3: Landing Page Section Composition

**What:** The home page composes independent section components. Each section is a server component that receives translations via `getTranslations`.

**When to use:** For any landing page with distinct sections.

**Example:**
```typescript
// src/app/[locale]/page.tsx (server component)
import {setRequestLocale} from 'next-intl/server';
import {Hero} from '@/components/sections/Hero';
import {FeatureHighlights} from '@/components/sections/FeatureHighlights';
import {SocialProof} from '@/components/sections/SocialProof';
import {CTABanner} from '@/components/sections/CTABanner';

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureHighlights />
      <SocialProof />
      <CTABanner />
    </>
  );
}
```

Each section component calls `getTranslations` internally:
```typescript
// src/components/sections/Hero.tsx (server component)
import {getTranslations} from 'next-intl/server';

export async function Hero() {
  const t = await getTranslations('Hero');
  return (
    <section className="min-h-screen flex items-center ...">
      <h1 className="text-hero">{t('headline')}</h1>
      {/* ... */}
    </section>
  );
}
```

### Pattern 4: Static SVG Gantt Mockup

**What:** Build the hero Gantt illustration as an inline SVG React component (not an image file). This matches the existing Logo pattern and will be easy to replace with the animated Framer Motion version in Phase 4.

**When to use:** For illustrative/decorative product screenshots that need to look polished at all breakpoints.

**Why SVG component, not an image:**
- Scales perfectly at all screen sizes (no pixelation)
- Uses brand colors from CSS variables (stays in sync with design system)
- Tiny file size compared to PNG/screenshot
- Easy to animate later (Phase 4 can target individual rect elements)
- Follows the precedent set by Logo.tsx

**Example structure:**
```typescript
// src/components/sections/GanttMockup.tsx
export function GanttMockup({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 800 400" className={className} role="img" aria-label="...">
      {/* Timeline header with day labels */}
      {/* Resource rows with colored task bars */}
      {/* Uses brand color scale: brand-400, brand-500, brand-600, brand-700 */}
    </svg>
  );
}
```

### Pattern 5: Data-Driven Placeholder Content

**What:** Store testimonial and feature highlight data in the translation files (messages/en.json, messages/bg.json) using next-intl's structured messages, not hardcoded in components. This makes swapping placeholder content for real content a JSON edit, not a code change.

**When to use:** For any content that will be replaced later (testimonials, company logos, feature descriptions).

**Example translation structure:**
```json
{
  "SocialProof": {
    "trustedBy": "Trusted by leading manufacturers",
    "testimonials": {
      "0": {
        "quote": "Planifactor reduced our scheduling time by 60%.",
        "name": "Stefan Petrov",
        "title": "Production Manager",
        "company": "TechMetal Industries"
      },
      "1": { ... },
      "2": { ... }
    }
  }
}
```

Access with: `t('testimonials.0.quote')` or iterate with `t.raw('testimonials')`.

### Anti-Patterns to Avoid

- **Making the entire locale layout a client component:** Adding `'use client'` to `[locale]/layout.tsx` would disable server-side rendering for all pages. Keep it as a server component; only the Header needs to be a client component.
- **Using NavigationMenu for flat links:** shadcn/ui's NavigationMenu is designed for dropdown/mega-menu patterns. For 6 flat navigation links, plain `<nav>` with styled `Link` components is simpler and more accessible.
- **Putting section content directly in page.tsx:** Extract each section into its own component file for maintainability. A 500-line page.tsx is harder to work with than 5 focused components.
- **Using `useTranslations` in server components:** Server components must use `getTranslations` (async). `useTranslations` is a hook and only works in client components.
- **Fixed positioning without body offset:** Using `fixed top-0` requires adding matching `pt-16` (or equivalent) to the body/main. Use `sticky top-0` instead which naturally stays in the document flow -- BUT note that `sticky` requires the parent to have sufficient height, which it does since the `<body>` wraps all content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile navigation drawer | Custom slide-in panel with CSS transitions | shadcn/ui Sheet (side="right") | Handles focus trapping, aria attributes, backdrop overlay, escape key, animations, portal rendering |
| Avatar with fallback | Custom `<div>` with initials | shadcn/ui Avatar + AvatarFallback | Handles image loading states, fallback display, proper sizing |
| Locale-aware navigation links | Manual `/${locale}/path` construction | next-intl `Link` from `@/i18n/navigation` | Auto-handles locale prefix, cookie management, route resolution |
| Accessible hamburger button label | Manual aria-label management | `<span className="sr-only">` (Tailwind built-in) | Standard pattern, no extra dependency |
| Responsive grid breakpoints | Custom media queries | Tailwind responsive classes (`md:grid-cols-3`) | Already available, consistent with existing patterns |

**Key insight:** The existing project has `radix-ui` (unified package) and `lucide-react` already installed. The Sheet component from shadcn/ui is built on Radix Dialog primitives. When installed via CLI, it will import from `"radix-ui"` (unified), matching the existing Button component pattern.

## Common Pitfalls

### Pitfall 1: Sticky Header Covering Content

**What goes wrong:** Content at the top of the page is hidden behind the fixed/sticky header.
**Why it happens:** `sticky top-0` keeps the element in document flow but it overlays content when scrolled.
**How to avoid:** The header is part of the natural document flow with `sticky`. The `<main>` element comes after `<header>` in the DOM, so content starts below it. For anchor links (scroll-to sections), add `scroll-margin-top: 4rem` to section elements.
**Warning signs:** First content on any page appears cut off at the top.

### Pitfall 2: NextIntlClientProvider Scope

**What goes wrong:** Client components outside the `NextIntlClientProvider` cannot use `useTranslations`.
**Why it happens:** The provider must wrap all client components that need translations.
**How to avoid:** The current layout already wraps everything in `NextIntlClientProvider`. Keep Header and Footer inside this wrapper. The layout structure is `<body> > NextIntlClientProvider > Header + main + Footer`.
**Warning signs:** "useTranslations is not available" error at runtime.

### Pitfall 3: Hero Section 100vh on Mobile

**What goes wrong:** `100vh` on mobile browsers does not account for the browser's address bar, causing content to be cut off or requiring scroll.
**Why it happens:** Mobile browsers dynamically hide/show the URL bar, making viewport height ambiguous.
**How to avoid:** Use `min-h-dvh` (dynamic viewport height) in Tailwind CSS v4 instead of `min-h-screen`. This uses the `dvh` CSS unit which accounts for browser chrome. Fallback: `min-h-[100dvh]` if the utility is not available.
**Warning signs:** Hero content cut off on iOS Safari or Android Chrome.

### Pitfall 4: Link Component href for Stub Pages

**What goes wrong:** Navigation links to pages that don't exist yet (Features, Pricing, etc.) cause 404 errors.
**Why it happens:** Phase 3 only builds the landing page; other pages come in later phases.
**How to avoid:** Create minimal stub pages for each nav route (`/features`, `/use-cases`, `/pricing`, `/about`, `/blog`, `/contact`, `/privacy`, `/terms`). Each stub page just renders a heading with the page name. This also validates the routing setup.
**Warning signs:** Clicking any nav link results in a 404 page.

### Pitfall 5: Sheet Component Missing SheetTitle for Accessibility

**What goes wrong:** Console warning: "Missing `SheetTitle`" or accessibility violations.
**Why it happens:** shadcn/ui Sheet is built on Radix Dialog which requires a title for screen readers.
**How to avoid:** Always include `<SheetTitle>` inside `<SheetHeader>` within `<SheetContent>`. For the mobile nav, use something like `<SheetTitle>Navigation</SheetTitle>` (can be visually hidden with `sr-only` if needed).
**Warning signs:** Browser console warnings about missing Dialog title.

### Pitfall 6: Translation Keys Must Match Between EN and BG

**What goes wrong:** Missing translation keys cause runtime errors or fallback to the key string.
**Why it happens:** Adding new sections (Hero, Features, SocialProof, CTABanner, Footer) requires adding all keys to both `en.json` and `bg.json`.
**How to avoid:** Add all translation keys to both files simultaneously. Use the same JSON structure in both files.
**Warning signs:** Raw key strings appearing in the UI (e.g., "Hero.headline" instead of actual text).

## Code Examples

### Sticky Header with Backdrop Blur

```typescript
// Tailwind classes for sticky header
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div className="container mx-auto flex h-16 items-center justify-between px-4">
    {/* ... */}
  </div>
</header>
```

The `bg-background/95 backdrop-blur` creates a frosted glass effect. The `supports-[backdrop-filter]` ensures graceful degradation.

### Mobile Sheet Navigation

```typescript
// shadcn/ui Sheet for mobile nav drawer
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';

<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
  <SheetTrigger asChild className="md:hidden">
    <Button variant="ghost" size="icon">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="w-[300px] sm:w-[350px]">
    <SheetHeader>
      <SheetTitle className="sr-only">Navigation</SheetTitle>
    </SheetHeader>
    <nav className="flex flex-col gap-4 mt-8">
      <Link href="/features" onClick={() => setMobileOpen(false)} className="text-lg font-medium">
        {t('features')}
      </Link>
      {/* ... more links ... */}
    </nav>
    <div className="mt-8">
      <LanguageSwitcher />
    </div>
    <div className="mt-4">
      <Button asChild className="w-full">
        <Link href="/contact">{t('requestDemo')}</Link>
      </Button>
    </div>
  </SheetContent>
</Sheet>
```

**Key detail:** Close the sheet when a link is clicked by calling `setMobileOpen(false)` in the `onClick` handler.

### next-intl Link with Button

```typescript
// Using shadcn Button with next-intl Link via asChild
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';

<Button asChild>
  <Link href="/contact">{t('requestDemo')}</Link>
</Button>

<Button variant="outline" asChild>
  <Link href="/features">{t('seeFeatures')}</Link>
</Button>
```

The `asChild` prop passes Button's styles to the Link component without nesting a `<button>` inside an `<a>`.

### Feature Highlights Grid

```typescript
// Responsive grid: 1 col mobile, 2 tablet, 3 desktop
<section className="py-20 px-4">
  <div className="container mx-auto">
    <h2 className="text-heading md:text-display text-center mb-12">{t('title')}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Link key={feature.key} href="/features" className="group">
          <div className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent">
            <feature.icon className="h-10 w-10 text-brand-600 mb-4" />
            <h3 className="text-subheading mb-2">{t(`${feature.key}.title`)}</h3>
            <p className="text-muted-foreground">{t(`${feature.key}.description`)}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
```

### Testimonial Card with Avatar

```typescript
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

function TestimonialCard({quote, name, title, company, initials}: TestimonialProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <blockquote className="text-body-lg text-foreground mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-brand-100 text-brand-700">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-muted-foreground text-sm">{title}, {company}</p>
        </div>
      </div>
    </div>
  );
}
```

### CTA Banner Section

```typescript
<section className="bg-brand-600 py-16 px-4">
  <div className="container mx-auto text-center">
    <h2 className="text-heading md:text-display text-white mb-4">
      {t('heading')}
    </h2>
    <p className="text-brand-100 text-body-lg mb-8 max-w-2xl mx-auto">
      {t('description')}
    </p>
    <Button size="lg" variant="secondary" asChild>
      <Link href="/contact">{t('cta')}</Link>
    </Button>
  </div>
</section>
```

Uses `bg-brand-600` (the primary brand color) with white text. The CTA button uses `variant="secondary"` for contrast against the dark background.

### Footer Multi-Column Layout

```typescript
<footer className="border-t bg-muted/40 py-12 px-4">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Column 1: Logo + tagline */}
    <div>
      <Logo size="sm" />
      <p className="mt-4 text-sm text-muted-foreground">{t('tagline')}</p>
    </div>
    {/* Column 2: Product links */}
    <div>
      <h3 className="font-semibold text-sm mb-3">{t('product')}</h3>
      <ul className="space-y-2">
        <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">{t('features')}</Link></li>
        {/* ... */}
      </ul>
    </div>
    {/* Column 3: Company links */}
    {/* Column 4: Contact + social */}
  </div>
  <div className="container mx-auto mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
    <p className="text-sm text-muted-foreground">{t('copyright')}</p>
    <LanguageSwitcher />
  </div>
</footer>
```

### Lucide Icons for Feature Highlights

Recommended icons for manufacturing scheduling features:

| Feature | Icon Import | Rationale |
|---------|-------------|-----------|
| AI Scheduling | `Brain` | AI/intelligence concept |
| Gantt Visualization | `GanttChart` or `BarChart3` | Chart/timeline visualization |
| Resource Management | `Users` or `Factory` | People/facilities management |
| Optimization | `Zap` or `Target` | Speed/precision concept |
| Real-time Planning | `Clock` or `Timer` | Time-sensitive operations |

All from `lucide-react`, already installed at ^0.563.0.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `min-h-screen` for full viewport | `min-h-dvh` (dynamic viewport height) | CSS `dvh` unit, wide support 2023+ | Fixes mobile browser address bar issue |
| Individual `@radix-ui/react-*` packages | Unified `radix-ui` package | February 2026 (shadcn changelog) | Cleaner imports; this project already uses unified package |
| `position: fixed` + body padding | `position: sticky` | Widely supported | No need to calculate header height for body offset |
| Custom CSS slide-in panels | shadcn/ui Sheet (Radix Dialog) | shadcn/ui maturity 2024+ | Focus trapping, accessibility, animations built-in |
| Image-based product screenshots | SVG React components | Industry trend | Scalable, themeable, animatable, tiny bundle |

**Deprecated/outdated:**
- `@radix-ui/react-dialog` individual package: Use unified `radix-ui` instead (this project already does)
- `min-h-screen` (100vh) for hero: Use `min-h-dvh` for correct mobile behavior

## Open Questions

1. **Container class in Tailwind v4**
   - What we know: Tailwind v4 changed how `container` works. In v3, `container` was a utility class with configurable defaults. In v4, it may need explicit configuration in the CSS-first config.
   - What's unclear: Whether `container` works out of the box with the current `globals.css` setup or needs `@theme inline` additions for `max-width` and `padding`.
   - Recommendation: Test `container mx-auto` during implementation. If it doesn't apply expected max-width and centering, add container configuration to `@theme inline` block. Alternatively, use manual `max-w-7xl mx-auto px-4` as a reliable fallback.

2. **dvh unit support in Tailwind v4**
   - What we know: The `dvh` CSS unit is supported in all modern browsers. Tailwind v4 should support `min-h-dvh` as a utility.
   - What's unclear: Whether Tailwind v4 generates `min-h-dvh` or if we need `min-h-[100dvh]` with arbitrary value syntax.
   - Recommendation: Try `min-h-dvh` first; fall back to `min-h-[100dvh]` if not available.

3. **Sheet component z-index vs sticky header z-index**
   - What we know: The sticky header uses `z-50`. The Sheet component renders via a portal to the end of `<body>`.
   - What's unclear: Whether the Sheet overlay and content automatically have a higher z-index than `z-50`.
   - Recommendation: Radix Dialog (which Sheet is built on) renders in a portal and typically uses very high z-indexes. This should work out of the box, but verify during implementation.

## Sources

### Primary (HIGH confidence)
- shadcn/ui Sheet docs: https://ui.shadcn.com/docs/components/radix/sheet - Installation, API, side prop
- shadcn/ui Avatar docs: https://ui.shadcn.com/docs/components/radix/avatar - Installation, AvatarFallback pattern
- next-intl Navigation docs: https://next-intl.dev/docs/routing/navigation - Link, useRouter, usePathname API
- Next.js Server/Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components - Boundary patterns
- Next.js Layouts and Pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages - Layout shell pattern
- shadcn/ui Unified Radix changelog: https://ui.shadcn.com/docs/changelog/2026-02-radix-ui - Import patterns
- Lucide Icons: https://lucide.dev/icons - Icon availability

### Secondary (MEDIUM confidence)
- Tailwind sticky header patterns: Multiple sources (tw-elements.com, dev.to, geeksforgeeks) - Confirmed `sticky top-0 z-50` as standard pattern
- Launch UI testimonials: https://www.launchuicomponents.com/docs/sections/testimonials - Testimonial section structure patterns
- Tailwind `sr-only`: https://tailwindcss.com/docs/screen-readers - Accessible hidden text utility

### Tertiary (LOW confidence)
- `dvh` unit in Tailwind v4: Based on training data; needs verification during implementation
- `container` class behavior in Tailwind v4: Based on training data; needs verification during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified in Phase 1/2
- Architecture patterns: HIGH - Based on official Next.js and next-intl documentation
- Component usage (Sheet, Avatar): HIGH - Based on official shadcn/ui docs
- Layout shell pattern: HIGH - Standard Next.js App Router pattern, well-documented
- SVG Gantt mockup approach: MEDIUM - Logical extension of existing Logo pattern, but implementation details are custom
- Tailwind v4 specifics (container, dvh): LOW - Need verification during implementation
- Pitfalls: HIGH - Based on documented issues and common patterns

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (stable tech stack, no fast-moving dependencies)
