# TODO Before Going Live

## Resend Email Setup (Contact Form)

**Status**: Pending domain verification

The contact form (`/contact` fallback when cookies declined) uses Resend to send emails to:
- hello@planificator.bg
- borislav.stefanov.1995@gmail.com

### Steps to complete:

1. **Add DNS records in your domain provider (planificator.bg)**:
   - TXT `resend._domainkey` — DKIM verification (required)
   - MX `send` — SPF sending subdomain (required)
   - TXT `send` — SPF record (required)
   - TXT `_dmarc` — DMARC policy (optional but recommended)

   These records go on subdomains and will NOT affect your existing website or email.

2. **Click "I've added the records" in Resend dashboard** and wait for verification (usually minutes, up to 48h).

3. **Add `RESEND_API_KEY` to production environment**:
   - Vercel: Settings → Environment Variables → add `RESEND_API_KEY`
   - Or Cloudflare Pages: Settings → Environment Variables
   - Local `.env.local` is already configured.

4. **Test the form** by declining cookies on `/contact` and submitting a message.

### Current state:
- Server action: `src/app/actions/contact.ts` ✅
- From address: `noreply@planificator.bg` (requires verified domain)
- Fallback: form shows error message gracefully if Resend is not configured

---

## Other items to address before launch

- [ ] Verify LinkedIn company page exists at https://linkedin.com/company/planificator
- [ ] Replace fake use case statistics with real data or soften claims (use case pages)
- [ ] Add unique images per use case (currently all share gantt-pic.png)
- [ ] Fix filename typo: `bom_and_invetory` → `bom_and_inventory`
- [ ] Delete orphan file: `public/images/features/schedule_bg.png`
- [ ] Uncomment testimonials on use case pages when real testimonials available
- [ ] Re-enable newsletter signup when connected to email service
- [ ] Add Organization JSON-LD contactPoint and sameAs fields
- [ ] Add OG image to root layout metadata
- [ ] Consider adding ROI Calculator to main navigation
