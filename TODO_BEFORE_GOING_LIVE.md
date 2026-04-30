# TODO Before Going Live

## 🔴 Resend Email Setup (Contact Form Fallback)

**Status**: Domain added to Resend but DNS verification not started.

**Symptom**: Submitting the fallback contact form (visible only when cookies are declined on `/contact`) silently fails. Resend API returns:
```
403 validation_error — "The planificator.bg domain is not verified."
```

The Calendly booking path is unaffected — most users will book demos through Calendly, not the form.

### Steps to complete

1. **Open Resend domain page**: https://resend.com/domains → click `planificator.bg`
2. **Copy the 4 DNS records Resend shows** (DKIM, MX for SPF, TXT for SPF, optional DMARC)
3. **Add records at your domain registrar** for `planificator.bg`. Records go on subdomains (`resend._domainkey`, `send`, `_dmarc`) and will NOT affect the existing website or email.
4. **Click "Verify DNS Records"** in Resend — usually verifies within minutes, up to 48h.
5. **Test**: incognito → `/contact` → decline cookies → submit form → check `hello@planificator.bg` and `borislav.stefanov.1995@gmail.com`.

### Already in place
- `RESEND_API_KEY` is set in Vercel production env vars ✅ (confirmed by the 403 response — request reached Resend)
- Server action: `src/app/actions/contact.ts` ✅
- From address: `noreply@planificator.bg` (will work once domain is verified)
- Failure logging: `console.error` writes to Vercel function logs so future failures are visible

---

## 🟡 Content / SEO items still open

- [ ] **LinkedIn company page** — verify `linkedin.com/company/planificator` exists; if not, create it or remove references in `Footer.tsx:114` and `structured-data.tsx:30`

## 🟢 Nice-to-have

- [ ] **GDPR transparency** — optional note in privacy policy that Vercel Analytics processes data in the US under SCCs (Vercel Analytics is cookieless and collects no PII, so this is transparency, not a compliance gap)
- [ ] **npm audit fix** — 17 transitive vulnerabilities, all with patches available; run `npm audit fix` for non-breaking updates
- [ ] **Domain canonicalization** — confirm `www.planificator.bg` ↔ `planificator.bg` redirect is set in Vercel → Settings → Domains so SEO signals don't split

---

## ✅ Resolved

- Analytics provider swap (Plausible → Vercel Analytics) — committed `b15efdd`
- Cookie consent button bug (SSR/hydration mismatch in `CookieConsent.tsx` and `CalendlyInline.tsx`) — committed `b15efdd`
- Privacy + cookie banner copy updated to name Vercel Analytics in both locales — committed `b15efdd`
- Internal docs (CLAUDE.md, PROJECT.md) updated to reflect analytics decision — committed `b15efdd`
- Sitemap now emits explicit entries for both `/en` and `/bg` URLs — committed `20cf224`
- Contact action surfaces Resend errors in Vercel function logs — committed `20cf224`
- Use case "Results You Can Expect" softened to "Industry Benchmarks" with research disclaimer subtitle (both locales)
- Newsletter signup component and `Newsletter` translations removed (was a no-op dead form, never rendered)
- Stale TODO claims cleaned up:
  - `bom_and_invetory` typo file → does not exist in repo
  - Orphan `public/images/features/schedule_bg.png` → does not exist in repo
  - "Use case unique images" → use case pages use icons only, no images shared
  - "Add Organization JSON-LD `contactPoint`/`sameAs`" → already present in `structured-data.tsx`
  - "OG image in root metadata" → bare domain redirects to locale, locale layout has OG; not actually missing
  - "Add ROI Calculator to navigation" → already in `Header.tsx:19`
- Testimonials on use case pages → leaving as-is (commented out, not visible; fictional names exist in translation JSON but ship hidden)
