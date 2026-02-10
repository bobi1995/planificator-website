# Phase 7 Plan 3: Cookie Consent & Integration Summary

**One-liner:** GDPR-compliant cookie consent banner with localStorage persistence, wired to Calendly embed via custom events for real-time consent reactivity.

## Execution Details

| Field | Value |
|-------|-------|
| Plan | 07-03 |
| Phase | 7 -- Interactive Features & Forms |
| Status | COMPLETE |
| Duration | ~3 minutes |
| Completed | 2026-02-10 |

## What Was Built

### Cookie Consent Utility (`src/lib/cookie-consent.ts`)
- Three functions: `getConsentStatus`, `setConsentStatus`, `clearConsentStatus`
- Type-safe `ConsentStatus` union: `'accepted' | 'declined' | 'unknown'`
- localStorage-based persistence, SSR-safe (returns `'unknown'` when `window` is undefined)
- `clearConsentStatus` enables GDPR-mandated revocation

### CookieConsent Banner Component (`src/components/interactive/CookieConsent.tsx`)
- Client component, fixed bottom bar with backdrop blur (matches Header styling)
- Starts hidden (`visible = false`), checks localStorage in `useEffect` to prevent SSR flicker
- Accept/Decline buttons save choice to localStorage and dispatch `consent-changed` CustomEvent
- "Learn more" links to `/privacy` page via next-intl `Link`
- Responsive: stacks vertically on mobile, horizontal on `sm:` and above
- `role="alert"` and `aria-live="polite"` for screen reader accessibility

### CalendlyInline Consent Integration (`src/components/interactive/CalendlyInline.tsx`)
- Replaced `consentGiven` prop with internal consent state via `useState` + `useEffect`
- Reads initial consent from `getConsentStatus()` on mount
- Listens for `consent-changed` custom event for real-time reactivity (no page reload needed)
- Shows email fallback (`hello@planifactor.com`) when consent is `'unknown'` or `'declined'`
- Widget renders only when `consent === 'accepted'`

### Layout Integration (`src/app/[locale]/layout.tsx`)
- `<CookieConsent />` added as last child inside `NextIntlClientProvider`, after `<Footer />`
- Leaf client component -- no parent server components converted to client

### Translation Keys (4 per locale)
- `CookieConsent.message` -- explains what cookies are used for (Calendly only, Plausible is cookieless)
- `CookieConsent.learnMore` -- privacy policy link text
- `CookieConsent.accept` / `CookieConsent.decline` -- button labels

## Commits

| Hash | Message |
|------|---------|
| `aa42983` | feat(07-03): create cookie consent utility and CookieConsent banner component |
| `812984b` | feat(07-03): wire cookie consent to Calendly and add CookieConsent to layout |

## Files Created
- `src/lib/cookie-consent.ts`
- `src/components/interactive/CookieConsent.tsx`

## Files Modified
- `src/components/interactive/CalendlyInline.tsx` (replaced consentGiven prop with internal state)
- `src/app/[locale]/layout.tsx` (added CookieConsent import and component)
- `messages/en.json` (added CookieConsent namespace)
- `messages/bg.json` (added CookieConsent namespace)

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| CustomEvent for cross-component consent | Avoids prop drilling or context; CalendlyInline reacts in real-time without page reload |
| localStorage over cookies for consent state | Consent status itself does not need to be sent to server; localStorage is simpler |
| Consent defaults to 'unknown' (widget hidden) | GDPR requires explicit opt-in; safe default shows email fallback |

## Verification Results

All 8 verification checks passed:
1. Cookie consent utility exists
2. All exports found (getConsentStatus, setConsentStatus, clearConsentStatus, ConsentStatus)
3. CookieConsent is a client component
4. CookieConsent is in the layout
5. CalendlyInline uses consent state internally
6. CalendlyInline listens for consent-changed events
7. consentGiven prop removed from CalendlyInline
8. CookieConsent namespaces complete in both locales

`npm run build` passes with 0 errors (34 static pages generated).

## Phase 7 Completion Status

With 07-03 complete, all 3 plans in Phase 7 are done:
- 07-01: ROI Calculator (COMPLETE)
- 07-02: Contact Page & Calendly Embed (COMPLETE)
- 07-03: Cookie Consent & Integration (COMPLETE)

Phase 7 is ready for verification.
