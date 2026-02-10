# Phase 7 Plan 02: Contact Page & Calendly Embed Summary

**One-liner:** Full contact page with inline Calendly scheduling widget (react-calendly), contact info sidebar with email/phone/LinkedIn/hours, bilingual translations, and cookie consent readiness

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 7 |
| plan | 02 |
| subsystem | contact |
| tags | contact, calendly, scheduling, forms, i18n, conversion |
| depends_on | (none) |
| completed | 2026-02-10 |
| duration | ~3 minutes |

## What Was Done

### Task 1: Install react-calendly and create CalendlyInline component
- Installed `react-calendly@4.4.0` -- no peer dependency issues with React 19
- Created `CalendlyInline` client component at `src/components/interactive/CalendlyInline.tsx`
  - Wraps `InlineWidget` from react-calendly with `url`, `locale`, and `consentGiven` props
  - `consentGiven` defaults to `true` (cookie consent integration deferred to Plan 07-03)
  - When consent denied, shows placeholder with email fallback
  - Locale appended as `?locale=xx` parameter for Calendly's built-in i18n
  - `min-h-[700px]` prevents layout shift during widget load

### Task 2: Contact page sections, translations, and page replacement
- Added `ContactPage` namespace to both `messages/en.json` and `messages/bg.json` (~20 keys each)
  - Sections: hero, booking, info, expect
  - All BG translations are native Bulgarian, not English copies
- Created `ContactHero` async server component with established hero pattern (`text-display md:text-hero`, `bg-muted/30`)
- Created `ContactInfo` async server component with two Card sections:
  - Contact details (email, phone, LinkedIn, office hours) with Lucide icons
  - "What to Expect" steps (3 items with CheckCircle icons)
- Replaced contact page stub with full booking experience:
  - 2/3 + 1/3 grid layout (Calendly widget left, contact info sidebar right, stacked on mobile)
  - `generateMetadata` with localized title and description
  - Placeholder `CALENDLY_URL` constant for easy replacement when account is configured

## Commits

| Hash | Message |
|------|---------|
| ba93f77 | feat(07-02): install react-calendly and create CalendlyInline component |
| 3a23d03 | feat(07-02): create contact page with Calendly embed and contact info |

## Verification Results

| Check | Result |
|-------|--------|
| react-calendly installed (4.4.0) | PASS |
| CalendlyInline is client component | PASS |
| ContactHero component exists | PASS |
| ContactInfo component exists | PASS |
| Contact page is not stub | PASS |
| CalendlyInline used on contact page | PASS |
| ContactPage namespace in EN (with booking, info, expect) | PASS |
| ContactPage namespace in BG (with booking, info, expect) | PASS |
| Full build (32 pages, 0 errors) | PASS |

## Files

### Created
- `src/components/interactive/CalendlyInline.tsx`
- `src/components/sections/contact/ContactHero.tsx`
- `src/components/sections/contact/ContactInfo.tsx`

### Modified
- `package.json` -- added react-calendly dependency
- `package-lock.json` -- updated lockfile
- `messages/en.json` -- added ContactPage namespace (~20 keys)
- `messages/bg.json` -- added ContactPage namespace (~20 keys)
- `src/app/[locale]/contact/page.tsx` -- replaced stub with full contact page

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| react-calendly used directly (no iframe fallback needed) | v4.4.0 works with React 19 without issues -- no peer dep conflicts or SSR errors |
| consentGiven defaults to true | Cookie consent integration deferred to Plan 07-03; widget always renders for now |
| Placeholder CALENDLY_URL constant | Real URL to be configured when Calendly account is set up |
| No CTABanner on contact page | Contact page IS the conversion point -- adding another CTA would be redundant |

## Deviations from Plan

None -- plan executed exactly as written.

## Tech Stack

### Added
- `react-calendly@4.4.0` -- inline Calendly scheduling widget

### Patterns Established
- Calendly inline embed pattern with locale pass-through and consent gating
- Contact page as conversion terminal (no CTABanner)
- Server/client composition: server page composes async server sections + client widget

## Next Phase Readiness

Plan 07-02 complete. Contact page is fully operational:
- Calendly scheduling widget renders inline with 700px height
- Contact info sidebar shows email, phone, LinkedIn, office hours
- "What to Expect" section sets visitor expectations for the demo
- All text translated in both EN and BG
- Cookie consent integration point ready via `consentGiven` prop
