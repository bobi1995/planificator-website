# Phase 7: Interactive Features & Forms - Research

**Researched:** 2026-02-10
**Domain:** ROI calculator, Calendly/Cal.com demo booking, GDPR cookie consent, i18n integration for interactive features
**Confidence:** HIGH

## Summary

Phase 7 converts visitor interest into leads through three interactive features: (1) an ROI calculator that lets manufacturing decision-makers self-qualify by estimating time/cost savings, (2) instant demo booking via Calendly or Cal.com embed on the contact page and as a modal from CTA buttons site-wide, and (3) a GDPR-compliant cookie consent banner. All three must work in both EN and BG locales.

**Key insight for this phase:** The project uses Plausible Analytics (decided in Phase 8 planning -- STATE.md). Plausible is cookieless and GDPR-compliant without consent. This means the cookie consent banner (INTER-03) is primarily needed as forward-looking infrastructure -- for when third-party tools (Calendly embed, future marketing pixels, etc.) introduce cookies. The banner should exist but will have minimal initial impact since Plausible does not require consent. The Calendly/Cal.com embed does set cookies, so consent is needed specifically for that.

**Primary technical challenge:** All three features are client-side interactive components that need `'use client'` directives. The challenge is integrating them cleanly into the existing server-component architecture without client boundary creep, while also maintaining bilingual support through next-intl's `useTranslations` (client) and `getTranslations` (server).

## Requirement Analysis

### INTER-01: ROI Calculator

**What it is:** An interactive tool where visitors input 3-5 production metrics and see estimated time/cost savings from using Planifactor.

**Inputs (recommended 4):**
1. **Orders per week** (number input, range 10-500+) -- core scaling factor
2. **Current scheduling time per week** (hours, range 1-40) -- baseline to show improvement against
3. **Number of production resources** (machines/workers, range 1-100+) -- complexity factor
4. **Current scheduling method** (dropdown: Excel/spreadsheet, Whiteboard/paper, Other software, No formal method) -- determines improvement multiplier

**Outputs:**
- **Hours saved per week** (range, e.g., "8-12 hours")
- **Hours saved per year** (annualized)
- **Estimated cost savings per year** (based on average planner hourly rate)
- **Scheduling improvement factor** (e.g., "4x faster")

**Calculation methodology (conservative):**

```
Base efficiency gain:
- Excel/spreadsheet: 60-75% reduction in scheduling time
- Whiteboard/paper: 70-85% reduction
- Other software: 40-55% reduction
- No formal method: 75-90% reduction

Complexity modifier (based on resources):
- 1-10 resources: 0.85x (simpler environments, less room for optimization)
- 11-50 resources: 1.0x (baseline)
- 51-100+: 1.1x (more complexity = more optimization opportunity)

Volume modifier (based on orders/week):
- 10-50: 0.9x
- 51-150: 1.0x
- 151-300: 1.05x
- 300+: 1.1x

Hours saved per week = currentHours * efficiencyGainMidpoint * complexityModifier * volumeModifier
Annual hours = weeklyHours * 50 (working weeks)
Cost savings = annualHours * hourlyRate (default: EUR 35/hr for production planner)
```

**Key design principles (from Pitfall 9 in PITFALLS.md):**
- Show RANGES, not exact numbers ("8-12 hours" not "10.3 hours")
- Use conservative midpoint estimates (e.g., if range is 60-75%, use 65% as midpoint for calculation)
- Show methodology: expandable "How we calculated this" section
- Soft CTA at the end: "Want to validate these with your real data? Book a demo."
- No email gate required to see results (anti-feature per FEATURES.md research)
- Test with extreme inputs to ensure no absurd outputs

### INTER-02: Instant Demo Booking

**What it is:** Calendly or Cal.com scheduling widget embedded on the contact page (inline) and available as a popup modal from CTA buttons across the site.

**Two integration points:**
1. **Contact page** -- Replace the current stub with a full booking page featuring an inline Calendly/Cal.com widget
2. **CTA modal** -- When users click "Request Demo" buttons (Header, Hero, CTABanner, Pricing), open a popup modal with the scheduling widget instead of navigating to /contact

**Decision: Calendly vs Cal.com**

| Factor | Calendly | Cal.com |
|--------|----------|---------|
| React package | `react-calendly` v4.4.0 | `@calcom/embed-react` v1.5.3 |
| Popularity | 77+ npm dependents, well-documented | 14 npm dependents, newer |
| Open source | No (proprietary) | Yes (MIT license) |
| Free tier | Yes (1 event type) | Yes (generous free tier) |
| Self-hosting | No | Yes |
| React 19 compat | Unknown (needs testing) | Unknown (needs testing) |
| Widget types | InlineWidget, PopupModal, PopupButton, PopupWidget | Cal inline, Cal modal, Cal floating |
| Event listeners | useCalendlyEventListener hook | postMessage events |

**Recommendation: Calendly** (via `react-calendly`), with the following reasoning:
- More mature React ecosystem with proven patterns
- PopupModal component is exactly what we need for CTA buttons
- InlineWidget for the contact page embed
- Better documentation and more examples available
- If React 19 compatibility issues arise, fall back to raw iframe/script embed (no package needed)

**Alternative fallback: Raw iframe embed** -- If `react-calendly` has React 19 or Next.js 16 incompatibilities, Calendly can be embedded as a plain iframe or via the Calendly widget.js script loaded with `next/script`. This requires no npm package and works everywhere.

**Contact page architecture:**
- Replace current stub content with:
  - Page hero section (heading + subtext)
  - Inline Calendly widget (primary content)
  - Contact information sidebar (email, phone, LinkedIn from Footer namespace)
  - FAQ or "What to expect" section

### INTER-03: Cookie Consent Banner

**What it is:** A non-intrusive banner that appears on first visit for EU visitors, explains cookie usage, and allows accept/decline with remembered preference.

**Context with Plausible Analytics:**
- Plausible Analytics is cookieless -- it does NOT require consent
- The Calendly embed DOES set cookies (calendly_session, etc.)
- The cookie banner is primarily needed for the Calendly embed and any future third-party integrations
- The banner should be lightweight and not block page content

**Implementation approach: Build in-house (no library)**

Rationale for DIY over `react-cookie-consent`:
- The requirement is minimal: show banner, accept/decline, remember choice in localStorage
- Adding a library for ~50 lines of custom code adds unnecessary dependency
- Full control over styling (Tailwind + brand design tokens)
- Full control over i18n integration (next-intl translations)
- No risk of library incompatibility with React 19 or Next.js 16

**Architecture:**
```
CookieConsent.tsx ('use client')
  - Reads consent state from localStorage on mount
  - Shows banner if no consent recorded
  - Offers "Accept" and "Decline" buttons
  - Stores preference in localStorage (key: 'cookie-consent', values: 'accepted' | 'declined')
  - Conditionally loads Calendly scripts based on consent
  - Provides a React context or export for other components to check consent status
```

**GDPR compliance requirements:**
1. Consent must be informed (explain what cookies are used for)
2. Consent must be freely given (site works without accepting)
3. Consent must be granular (can accept/decline)
4. Consent must be revocable (can change decision later)
5. Banner must not block content (fixed position, dismissible)
6. Preference must persist (localStorage)

**Key design decision: Non-intrusive positioning.** The banner should be a fixed bottom bar (not a full-screen overlay or modal). Manufacturing decision-makers visiting the site should be able to read content immediately. The banner is a soft notification, not a gate.

## New Packages Required

| Package | Version | Purpose | Confidence | Alternative |
|---------|---------|---------|------------|-------------|
| `react-calendly` | ^4.4.0 | Calendly InlineWidget + PopupModal components | MEDIUM (React 19 compat unverified) | Raw iframe/script embed |

**Not needed:**
- `react-cookie-consent` -- Building in-house for full control over styling, i18n, and bundle size
- `@calcom/embed-react` -- Choosing Calendly over Cal.com (more mature React ecosystem)
- `js-cookie` -- Using localStorage, not cookies, for consent state
- Any cookie consent SaaS (Termly, CookieYes) -- Overkill for the current scope

**Total new packages: 1** (react-calendly)

**Risk mitigation:** If `react-calendly` is incompatible with React 19.2.3 or Next.js 16.1.6, fall back to:
```typescript
// Raw Calendly embed via next/script
import Script from 'next/script';

<Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
<div className="calendly-inline-widget" data-url="https://calendly.com/planifactor/demo" style={{minWidth: '320px', height: '700px'}} />
```

## Architecture

### Component Architecture

```
src/
  components/
    interactive/
      ROICalculator.tsx              # 'use client' -- main calculator component
      ROIResultsCard.tsx             # Server or client -- results display
      ROIMethodology.tsx             # Server component -- "How we calculated this"
      CalendlyInline.tsx             # 'use client' -- inline widget for contact page
      CalendlyModal.tsx              # 'use client' -- popup modal triggered by CTA
      CookieConsent.tsx              # 'use client' -- consent banner
    sections/
      contact/
        ContactHero.tsx              # Server component -- page hero
        ContactInfo.tsx              # Server component -- email/phone/address
  lib/
    roi-calculator.ts                # Pure function: inputs -> outputs (no React)
    cookie-consent.ts                # Consent state utilities (localStorage read/write)
  app/
    [locale]/
      contact/
        page.tsx                     # Replace stub -- compose CalendlyInline + ContactInfo
      roi-calculator/
        page.tsx                     # New page for the ROI calculator
```

### Server vs Client Split

| Component | Type | Why |
|-----------|------|-----|
| ROICalculator | **Client** | Form state, live calculation, input handling |
| ROIResultsCard | Client (child of calculator) | Displays results from calculator state |
| ROIMethodology | Server | Static content, translations only |
| CalendlyInline | **Client** | Third-party widget, DOM manipulation |
| CalendlyModal | **Client** | Modal state, third-party widget |
| CookieConsent | **Client** | localStorage access, show/hide state |
| ContactHero | Server | Pure translated content |
| ContactInfo | Server | Pure translated content |
| Contact page.tsx | Server | Composition root |
| ROI Calculator page.tsx | Server | Composition root |

**Client component count: 4** (ROICalculator, CalendlyInline, CalendlyModal, CookieConsent)

### ROI Calculator Placement

**Two options considered:**

**Option A: Standalone page at `/[locale]/roi-calculator`**
- Pros: Own URL for SEO ("manufacturing ROI calculator"), own metadata, clean separation
- Cons: One more page to maintain, visitors must navigate away from current page

**Option B: Embedded section on the landing page or features page**
- Pros: Part of the natural scroll flow, no navigation required
- Cons: Adds significant weight to existing pages, complex client component in a mostly server page

**Recommendation: Option A (standalone page)** because:
- The calculator is complex enough to warrant its own page
- Dedicated URL for SEO targeting ("production scheduling ROI calculator")
- Can be linked from any CTA without context confusion
- Keeps existing pages clean (server components)
- The features page and landing page can link to it with a teaser/CTA

**Navigation integration:** Add the ROI calculator to the landing page as a new section (teaser with a few inputs visible, "See full calculator" link) OR as a CTA within the features page. It does NOT need to be in the main nav -- it is a conversion tool, not a content page.

### Calendly Modal Integration (CTA Buttons)

The current CTA buttons across the site all link to `/contact`:
- Header: `<Link href="/contact">{t('requestDemo')}</Link>`
- Hero: `<Link href="/contact">{t('cta')}</Link>`
- CTABanner: `<Link href="/contact">{t('cta')}</Link>`
- PricingTierCard: `<Link href="/contact">{cta}</Link>`

**Two approaches for modal integration:**

**Approach A: Replace Link with CalendlyModal trigger**
- Change CTA buttons from `<Link href="/contact">` to `<button onClick={openModal}>`
- Requires making parent components client components (Header is already, but CTABanner, Hero, PricingTierCard are server components)
- Would require client wrapper components or client boundary escalation

**Approach B: Keep Link to /contact, add modal as enhancement**
- Keep all CTA buttons linking to `/contact` page
- Add a CalendlyModal that can be triggered via a separate "Book Now" floating button or via a hash URL (`/contact#book`)
- Contact page has the inline widget as primary interaction

**Recommendation: Approach B (keep links, inline widget on contact page)** because:
- Does not require converting any server components to client components
- Contact page becomes a rich booking experience with inline Calendly
- No client boundary creep in CTABanner, Hero, PricingTierCard
- The floating "Book Now" button can be added later as an enhancement
- Works even if JavaScript fails (links still navigate to contact page)

**Enhancement option:** A CalendlyModal can be added to the Header component (which is already a client component) as a secondary trigger. The Header's "Request Demo" button could open a modal instead of navigating. This is the ONE place where a modal makes sense without architectural compromise, since Header is already `'use client'`.

### Cookie Consent and Calendly Loading

The cookie consent banner controls whether the Calendly widget loads:

```typescript
// lib/cookie-consent.ts
export function getConsentStatus(): 'accepted' | 'declined' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';
  const stored = localStorage.getItem('cookie-consent');
  if (stored === 'accepted') return 'accepted';
  if (stored === 'declined') return 'declined';
  return 'unknown';
}
```

```typescript
// CalendlyInline.tsx
'use client';
import { getConsentStatus } from '@/lib/cookie-consent';

export function CalendlyInline({ url }: { url: string }) {
  const consent = getConsentStatus();

  if (consent !== 'accepted') {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p>Please accept cookies to use the booking widget.</p>
        <p>Alternatively, email us at hello@planifactor.com</p>
      </div>
    );
  }

  return <InlineWidget url={url} />;
}
```

This pattern ensures:
1. Calendly only loads after explicit consent
2. Users who decline cookies can still reach the team via email/phone
3. The contact page remains functional without cookies

### Cookie Consent in Layout

The CookieConsent component should be placed in the locale layout (`src/app/[locale]/layout.tsx`) so it appears on every page:

```typescript
// src/app/[locale]/layout.tsx
import {CookieConsent} from '@/components/interactive/CookieConsent';

export default async function LocaleLayout({children, params}: Props) {
  // ... existing code ...
  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Translation Requirements

### New Namespaces

**ROICalculator namespace (~35 keys per locale):**

| Key | EN Example | Purpose |
|-----|------------|---------|
| `metaTitle` | "ROI Calculator" | Page title |
| `metaDescription` | "Calculate how much time..." | Meta description |
| `hero.title` | "How Much Time Could You Save?" | Page heading |
| `hero.subtitle` | "Enter your production details..." | Page subtext |
| `inputs.ordersPerWeek` | "Orders per Week" | Input label |
| `inputs.ordersPerWeekHelp` | "Average number of production orders..." | Help text |
| `inputs.schedulingHours` | "Current Scheduling Time (hours/week)" | Input label |
| `inputs.resources` | "Number of Resources" | Input label |
| `inputs.currentMethod` | "Current Scheduling Method" | Input label |
| `inputs.methods.excel` | "Excel / Spreadsheet" | Dropdown option |
| `inputs.methods.whiteboard` | "Whiteboard / Paper" | Dropdown option |
| `inputs.methods.software` | "Other Software" | Dropdown option |
| `inputs.methods.none` | "No Formal Method" | Dropdown option |
| `results.title` | "Your Estimated Savings" | Results heading |
| `results.hoursSavedWeek` | "Hours Saved Per Week" | Result label |
| `results.hoursSavedYear` | "Hours Saved Per Year" | Result label |
| `results.costSavingsYear` | "Estimated Annual Cost Savings" | Result label |
| `results.speedImprovement` | "Scheduling Speed Improvement" | Result label |
| `results.fasterSuffix` | "faster" | e.g., "4x faster" |
| `results.perWeek` | "per week" | Unit label |
| `results.perYear` | "per year" | Unit label |
| `methodology.title` | "How We Calculated This" | Expandable section |
| `methodology.description` | "Our estimates are based on..." | Methodology text |
| `methodology.conservative` | "We use conservative estimates..." | Trust note |
| `cta.title` | "Want to Validate These Numbers?" | Bottom CTA heading |
| `cta.description` | "Book a free demo and we'll run..." | CTA subtext |
| `cta.button` | "Book a Demo" | CTA button text |
| `calculate` | "Calculate Savings" | Button text |
| `reset` | "Reset" | Button text |

**ContactPage namespace (~20 keys per locale):**

| Key | EN Example | Purpose |
|-----|------------|---------|
| `metaTitle` | "Contact Us" | Page title |
| `metaDescription` | "Book a demo of Planifactor..." | Meta description |
| `hero.title` | "Let's Talk Production Scheduling" | Page heading |
| `hero.subtitle` | "Book a free demo or get in touch..." | Subtext |
| `booking.title` | "Book a Demo" | Booking section heading |
| `booking.description` | "Choose a time that works for you..." | Booking subtext |
| `booking.consentRequired` | "Please accept cookies to use the booking widget." | Shown when cookies declined |
| `booking.alternativeContact` | "You can also reach us directly:" | Fallback text |
| `info.title` | "Other Ways to Reach Us" | Contact info heading |
| `info.emailLabel` | "Email" | Label |
| `info.phoneLabel` | "Phone" | Label |
| `info.linkedinLabel` | "LinkedIn" | Label |
| `info.officeHours` | "Office Hours" | Label |
| `info.officeHoursValue` | "Mon-Fri, 9:00-18:00 EET" | Value |
| `info.responseTime` | "We typically respond within 24 hours." | Note |

**CookieConsent namespace (~10 keys per locale):**

| Key | EN Example | Purpose |
|-----|------------|---------|
| `message` | "We use cookies for the booking widget..." | Banner message |
| `learnMore` | "Learn more" | Link to privacy page |
| `accept` | "Accept" | Accept button |
| `decline` | "Decline" | Decline button |
| `settings` | "Cookie Settings" | Settings link (for revocation) |

**Total new translation keys:** ~65 per locale (~130 total across EN + BG)

### Existing Namespace Updates

The `Navigation` namespace may need a new key if adding ROI Calculator to the nav:
- `roiCalculator` -> "ROI Calculator" (EN) / "ROI Калкулатор" (BG)

However, the recommendation is NOT to add it to the main nav. Instead, link to it from within pages.

## Route Structure

### New Routes

```
src/app/[locale]/
  contact/
    page.tsx                  # Replace stub with Calendly embed + contact info
  roi-calculator/
    page.tsx                  # New page for the ROI calculator
```

### Modified Routes

- `src/app/[locale]/layout.tsx` -- Add CookieConsent component
- `src/app/[locale]/page.tsx` -- Optionally add ROI calculator teaser section

### No New API Routes

All features are client-side. The ROI calculator computes locally (no server-side calculation needed). Calendly handles booking externally. Cookie consent uses localStorage.

## Integration Points

### CTA Buttons Inventory (5 locations)

| Location | Component | Current Behavior | Phase 7 Change |
|----------|-----------|------------------|-----------------|
| Header desktop | `Header.tsx` (client) | `<Link href="/contact">` | **Option: Change to CalendlyModal trigger** |
| Header mobile | `Header.tsx` (client) | `<Link href="/contact">` | **Option: Change to CalendlyModal trigger** |
| Hero section | `Hero.tsx` (server) | `<Link href="/contact">` | Keep as link to contact page |
| CTA Banner | `CTABanner.tsx` (server) | `<Link href="/contact">` | Keep as link to contact page |
| Pricing tier cards | `PricingTierCard.tsx` (server) | `<Link href="/contact">` | Keep as link to contact page |

**Recommended changes:** Keep all CTA buttons linking to `/contact`. Optionally upgrade the Header CTA to open a CalendlyModal (Header is already a client component). This minimizes architectural changes while improving the booking experience.

### Landing Page ROI Teaser (Optional)

Add a new section between SocialProof and CTABanner on the landing page:

```
Hero > ComparisonSection > FeatureHighlights > SocialProof > [ROITeaser] > CTABanner
```

The ROITeaser would be a server component with a heading, brief description, and a "Try the Calculator" CTA button linking to `/roi-calculator`.

## Pitfalls Specific to This Phase

### Pitfall 1: react-calendly Incompatible with React 19

**What goes wrong:** `react-calendly` v4.4.0 was last published ~9 months ago. It may not be compatible with React 19.2.3 (released more recently). Peer dependency warnings or runtime errors during SSR.

**Prevention:** Test `react-calendly` installation immediately. If peer dependency issues arise:
1. Try `npm install react-calendly --legacy-peer-deps`
2. If runtime errors occur, fall back to raw iframe/script embed (documented above)
3. The raw embed approach has zero dependency risk

**Detection:** `npm install` warnings about peer dependencies, or runtime errors on the contact page.

### Pitfall 2: ROI Calculator Produces Absurd Numbers

**What goes wrong:** Edge case inputs (e.g., 500 orders/week with 40 hours scheduling time) produce savings of "35-39 hours/week" which exceeds the input, or cost savings of EUR 100,000+ that feel unrealistic.

**Prevention:**
1. Cap weekly hours saved at 80% of input hours (never claim 100% elimination)
2. Cap improvement factor at 10x (no "50x faster" claims)
3. Show ranges with conservative midpoints
4. Test with extreme inputs: (10 orders, 1 hour) and (500 orders, 40 hours)
5. Include a disclaimer: "Actual results vary based on your specific environment"

**Detection:** Calculator output exceeding input values, or negative numbers.

### Pitfall 3: Cookie Consent Flickers on Page Load

**What goes wrong:** The cookie consent banner appears for a split second on every page load (even for users who already accepted/declined) because localStorage is not available during SSR.

**Prevention:**
1. Initialize banner visibility as `false` (hidden by default)
2. Read localStorage in a `useEffect` on mount
3. Only show the banner if consent is `'unknown'`
4. Use CSS `opacity` transition for smooth appearance (not conditional rendering that causes layout shift)
5. Add `min-height` to the banner area to prevent CLS when it appears

**Detection:** Banner flashing on page load for returning visitors. CLS shift when banner appears.

### Pitfall 4: Calendly Widget Not Respecting Locale

**What goes wrong:** The Calendly widget always shows in English even when the site is in Bulgarian.

**Prevention:**
1. Calendly supports locale via URL parameter: `https://calendly.com/planifactor/demo?locale=bg`
2. Pass the current locale from next-intl to the Calendly widget URL
3. Note: Calendly's Bulgarian support may be limited -- verify available locales
4. If Calendly does not support Bulgarian, keep the widget in English with Bulgarian surrounding text

**Detection:** Widget language not matching site language.

### Pitfall 5: Contact Page Calendly Widget Height Issues

**What goes wrong:** The Calendly inline widget has a fixed height that either cuts off content or leaves excessive whitespace. Different calendar states (date selection, time selection, confirmation) have different heights.

**Prevention:**
1. Use `react-calendly`'s `onPageHeightResize` callback to dynamically adjust container height
2. Set a minimum height (700px) with `overflow: hidden` on the container
3. If using raw iframe, set `height: 100%` on the iframe and a minimum container height

**Detection:** Scrollbar inside the widget, or large empty space below it.

### Pitfall 6: Client Component Boundary Creep

**What goes wrong:** The ROI calculator or Calendly modal requires making parent server components into client components.

**Prevention:**
1. ROI calculator lives on its own page -- no parent component changes needed
2. Calendly inline lives on the contact page -- passed as a child component, no boundary issue
3. CalendlyModal in Header -- Header is already `'use client'`, no additional boundary needed
4. CookieConsent in layout -- a leaf component, does not affect parent rendering

**Detection:** Any server component gaining `'use client'` during this phase.

## Existing shadcn/ui Components (Reusable)

| Component | Where in Phase 7 |
|-----------|-----------------|
| Button | Calculator submit, CTA buttons, cookie consent buttons |
| Card | Results card, methodology card, contact info card |
| Badge | Optional: result highlights |
| Separator | Between sections on contact page |
| Accordion | "How we calculated this" expandable section |

### New shadcn/ui Components Needed

| Component | Install Command | Purpose |
|-----------|----------------|---------|
| Dialog | `npx shadcn@latest add dialog` | CalendlyModal wrapper (if implementing Header modal) |
| Label | `npx shadcn@latest add label` | ROI calculator form labels |
| Input | `npx shadcn@latest add input` | ROI calculator number inputs |
| Select | `npx shadcn@latest add select` | ROI calculator dropdown (scheduling method) |
| Slider | `npx shadcn@latest add slider` | Optional: ROI calculator range inputs (alternative to number inputs) |

**Minimum new shadcn components: 3** (Label, Input, Select)
**Optional: 2** (Dialog for modal, Slider for range inputs)

## Sizing Estimate

| Work Item | Complexity | Effort | Dependencies |
|-----------|-----------|--------|--------------|
| Install shadcn components (Label, Input, Select, Dialog) | Low | Small | None |
| ROI calculation logic (`src/lib/roi-calculator.ts`) | Medium | Small | None |
| ROI Calculator page + component | Medium | Medium | shadcn inputs, translations |
| Contact page replacement (Calendly inline + info) | Medium | Medium | react-calendly or iframe |
| Cookie consent component | Low | Small | Translations |
| Cookie consent + Calendly integration | Low | Small | Cookie consent component |
| CalendlyModal in Header (optional) | Low | Small | Dialog component |
| Translation keys (EN + BG, ~65 keys each) | Medium | Medium | Content authoring |
| ROI teaser section for landing page (optional) | Low | Small | ROI page exists |

**Total new components:** ~7-9 (ROICalculator, ROIResultsCard, ROIMethodology, CalendlyInline, CalendlyModal, CookieConsent, ContactHero, ContactInfo)
**Total new translation keys:** ~65 per locale
**Total new pages:** 1 (roi-calculator) + 1 replacement (contact)
**Recommended plan count:** 2-3 plans

### Suggested Plan Split

**Plan 07-01: ROI Calculator**
- Install shadcn components (Label, Input, Select)
- Create `src/lib/roi-calculator.ts` with pure calculation logic
- Create ROICalculator client component
- Create ROI calculator page at `/[locale]/roi-calculator`
- Add ROICalculator and ContactPage translation namespaces (EN + BG)
- Wire page with generateMetadata, setRequestLocale

**Plan 07-02: Contact Page + Calendly Embed**
- Install `react-calendly` (or implement raw iframe fallback)
- Install shadcn Dialog component
- Replace contact page stub with full booking page
- Create CalendlyInline component
- Create ContactHero and ContactInfo server components
- Optionally create CalendlyModal for Header CTA
- Complete ContactPage translations

**Plan 07-03: Cookie Consent + Integration**
- Create CookieConsent client component
- Create `src/lib/cookie-consent.ts` utilities
- Add CookieConsent to locale layout
- Add CookieConsent translations (EN + BG)
- Wire cookie consent to Calendly loading (conditional embed)
- Optional: Add ROI teaser section to landing page

**Alternative (2 plans):**
- **Plan 07-01:** ROI Calculator + Cookie Consent (both are self-contained client components)
- **Plan 07-02:** Contact page + Calendly embed + integration + any landing page teasers

## Open Questions

1. **Calendly account URL:** What is the actual Calendly booking URL for Planifactor? This needs to be provided before the embed can work. Use a placeholder URL during development (e.g., `https://calendly.com/planifactor/demo`).

2. **ROI calculator hourly rate:** The default EUR 35/hr is an estimate for a production planner in Bulgaria/EU. Should this be configurable by the user? **Recommendation:** Make it a hidden default with an optional "Advanced" toggle to customize the rate. Keeps the main flow simple.

3. **Should the ROI calculator results be gated (email required)?** **Recommendation:** No. Per FEATURES.md anti-patterns, gating content creates friction. Show results freely, then offer "Get a detailed report" as an optional email capture. This can be added in v2.

4. **CalendlyModal in Header -- yes or no?** **Recommendation:** Yes, but only as an enhancement in Plan 07-02 if time permits. The primary booking flow via the contact page is more important. The Header modal is a nice-to-have that reduces friction for visitors who have already decided.

5. **Should the cookie consent banner detect EU visitors?** **Recommendation:** No geo-detection for v1. Show the banner to all visitors. Geo-detection adds complexity (IP lookup, Cloudflare headers) and GDPR applies to any EU citizen regardless of their current location. Showing the banner to everyone is simpler and more compliant.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis (all patterns verified by reading actual source files)
- [PITFALLS.md - Pitfall 9: ROI Calculator](../../research/PITFALLS.md) -- conservative estimation guidance
- [FEATURES.md - ROI Calculator](../../research/FEATURES.md) -- competitive differentiation analysis
- [STATE.md](../../STATE.md) -- Plausible Analytics decision (cookieless = no consent needed for analytics)
- [react-calendly npm](https://www.npmjs.com/package/react-calendly) -- v4.4.0, React Calendly integration
- [@calcom/embed-react npm](https://www.npmjs.com/package/@calcom/embed-react) -- v1.5.3, Cal.com React embed
- [Plausible Data Policy](https://plausible.io/data-policy) -- Cookieless, no consent required
- [react-cookie-consent npm](https://www.npmjs.com/package/react-cookie-consent) -- v10.0.1 (evaluated, not recommended)
- [shadcn/ui Dialog](https://ui.shadcn.com/docs/components/radix/dialog) -- Radix-based modal component

### Secondary (MEDIUM confidence)
- [13 B2B ROI Calculator Examples](https://www.dock.us/revenue-archives/roi-calculators) -- B2B ROI calculator design patterns
- [9 Calculators Every SaaS Company Should Consider](https://outgrow.co/blog/interactive-calculators-saas-companies) -- SaaS calculator best practices
- [Next.js Cookie Consent Banner (No Libraries)](https://www.buildwithmatija.com/blog/build-cookie-consent-banner-nextjs-15-server-client) -- DIY consent banner for Next.js 15+
- [Calendly Help: Embed in React](https://help.calendly.com/hc/en-us/articles/31644195810199-How-to-embed-Calendly-in-a-React-app) -- Official Calendly React guide
- [Plausible: Cookie Consent Banners](https://plausible.io/blog/cookie-consent-banners) -- When you do/don't need consent banners
- [GitHub: Plausible "No cookie banners" discussion](https://github.com/plausible/analytics/discussions/1963) -- Nuanced GDPR discussion

### Tertiary (LOW confidence)
- ROI calculator specific savings percentages (60-85% scheduling time reduction) -- based on the product's comparison section data (62% to 90% resource utilization, 4 hours to 15 min scheduling time) rather than independently validated customer data. These should be reviewed against actual customer outcomes when available.
- react-calendly React 19 compatibility -- not independently verified. May require `--legacy-peer-deps` or fallback approach.

## Metadata

**Confidence breakdown:**
- ROI Calculator architecture (client component, pure calculation logic): HIGH -- standard React pattern
- ROI Calculator methodology (conservative estimates, ranges): MEDIUM -- numbers need validation with real customer data
- Calendly embed (react-calendly InlineWidget/PopupModal): MEDIUM -- React 19 compatibility unverified
- Calendly raw iframe fallback: HIGH -- framework-independent, always works
- Cookie consent DIY approach: HIGH -- standard localStorage + React pattern, well-documented
- Cookie consent GDPR compliance: HIGH -- requirements are well-established
- Plausible not needing consent: HIGH -- documented by Plausible, confirmed by community
- Contact page replacement architecture: HIGH -- established patterns from existing pages
- Translation volume (~65 keys/locale): MEDIUM -- may vary based on content depth
- shadcn component availability (Dialog, Label, Input, Select): HIGH -- well-documented, actively maintained

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (react-calendly version should be re-checked at implementation time)
