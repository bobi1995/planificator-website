# Phase 3 Context — Layout Shell & Landing Page

**Phase goal:** Visitors land on a professional, conversion-oriented homepage with clear value proposition, feature highlights, social proof, and a demo request CTA — wrapped in a site-wide navigation shell.

**Requirements:** LAND-01, LAND-03, LAND-04, LAND-05

---

## 1. Navigation & Header

### Decisions

- **Sticky header** — stays fixed at top on scroll. Standard B2B SaaS pattern, keeps CTA always accessible.
- **"Request Demo" CTA in header** — primary-colored button, always visible in the header bar. Visitors can convert from any scroll position.
- **All 6 nav links from day one** — Features, Use Cases, Pricing, About, Blog, Contact. Pages not yet built link to placeholder/stub pages.
- **Mobile hamburger → slide-in drawer** — drawer slides in from the right on mobile. Contains all nav links + language switcher + CTA button.
- **Language switcher** stays in header (existing component from Phase 1, currently in a temporary position — integrate it into the proper header nav).

### Constraints

- Header must include the Planifactor Logo component (already exists at `src/components/brand/Logo.tsx`).
- Navigation links must be translated (EN/BG). The `Navigation` namespace already exists in `messages/en.json`.
- Sticky header must not cover content — use appropriate padding/margin on body content.

---

## 2. Hero Section

### Decisions

- **Headline angle: AI intelligence** — lead with the AI differentiator, not simplicity or speed. Example direction: "AI Finds Your Optimal Schedule" (exact copy TBD by implementer, both EN and BG).
- **Subtext: audience-focused** — speak to the visitor's identity and pain, not product features. Example direction: "For manufacturers who need to ship on time, every time" (exact copy TBD).
- **Full viewport height (100vh)** — hero fills the entire screen on load. Dramatic first impression. Scroll indicator optional.
- **Static Gantt mockup image** as hero visual — a designed/illustrated screenshot of a Gantt chart that communicates the product visually. Phase 4 will replace this with the animated Framer Motion version.
- **Two CTA buttons** — "Request a Demo" (primary) and "See Features" (outline/secondary). Already established in current page.

### Constraints

- The static Gantt mockup should be a placeholder illustration/image, not a screenshot of the actual product. It needs to look polished at all breakpoints.
- On mobile, the hero visual should stack below the text content, not squeeze side-by-side.
- Copy must exist in both `en.json` and `bg.json` message files.

---

## 3. Social Proof & Trust Signals

### Decisions

- **All placeholder content** — no real customers yet. Use fictional but realistic-sounding manufacturing company names and roles. Content will be swapped with real data later.
- **Full styled section** — treat it like real content. Proper layout, proper styling. Don't minimize it just because it's placeholder.
- **Logo grid** — a row of 5-6 placeholder company logos (can be styled text or simple geometric logos). "Trusted by" or "Used by" label above.
- **3 testimonial cards** — each card shows: quote text, person's name, job title, company name, photo placeholder (avatar/initials). Three cards in a row on desktop, stacking on mobile.

### Constraints

- Placeholder testimonials should sound realistic for manufacturing decision-makers (production managers, operations directors).
- Section should be easy to update — swap placeholder content for real content without layout changes.
- All text in both EN and BG.

---

## 4. Feature Highlights Section

### Decisions (from LAND-03 requirement)

- **3-5 key capabilities** with icons and brief descriptions.
- Links to the features page (stub/placeholder until Phase 5).
- Capabilities to highlight: AI scheduling, resource management, Gantt visualization, optimization, real-time planning (exact selection by implementer based on product context).

### Constraints

- Icons should be from a consistent icon set (Lucide, which ships with shadcn/ui).
- Each feature card should have: icon, title, 1-2 sentence description.
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile.

---

## 5. CTA Banner Section

### Decisions (from LAND-05 requirement)

- **Secondary conversion point** at the bottom of the landing page, above the footer.
- "Ready to optimize your production?" style heading with "Request a Demo" button.
- Visually distinct from the rest of the page — uses brand primary color as background with white text.

### Constraints

- Must be a separate, full-width section — not part of the footer.
- CTA links to the same destination as the header CTA (contact/demo page, which will be a stub until Phase 7).

---

## 6. Footer

### Decisions

- **Multi-column layout** — 3-4 columns on desktop:
  - **Column 1:** Planifactor logo + tagline
  - **Column 2:** Product links (Features, Use Cases, Pricing)
  - **Column 3:** Company links (About, Blog, Contact)
  - **Column 4:** Contact info + social
- **Contact info:** Email address + phone number (values TBD — use placeholder if not provided).
- **Social links:** LinkedIn only.
- **Legal links:** Privacy Policy and Terms of Service — link to stub pages (just a title + "Coming soon" placeholder).
- **Language switcher** also in footer (secondary placement).

### Constraints

- Footer renders on every page (part of the layout shell in `[locale]/layout.tsx`).
- All footer text translated in both EN and BG.
- On mobile, columns stack vertically.
- Copyright line at the bottom: "© 2026 Planifactor. All rights reserved."

---

## 7. Page Structure (Landing Page Sections Order)

Top to bottom:
1. **Sticky Header** (nav + CTA + language switcher)
2. **Hero** (headline + subtext + CTAs + static Gantt mockup) — 100vh
3. **Feature Highlights** (3-5 capability cards with icons)
4. **Social Proof** (logo grid + 3 testimonial cards)
5. **CTA Banner** (secondary conversion section, brand-colored)
6. **Footer** (multi-column with links, contact, legal)

---

## Deferred Ideas

None captured — all discussion stayed within phase scope.

---

## Next Steps

Phase 3 is ready for `/gsd:plan-phase 3` (research → plan → execute).

---
*Created: 2026-02-09 after discuss-phase session*
