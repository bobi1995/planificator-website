# Phase 3 Plan 03: Hero Section & Static Gantt Mockup Summary

**One-liner:** Full-viewport Hero section with AI headline, two CTA buttons, and a polished static SVG Gantt chart mockup using brand color CSS variables across 6 resource rows.

---

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 03-layout-landing |
| plan | 03 |
| subsystem | landing-page |
| tags | hero, gantt, svg, server-component, cta, i18n |
| requires | 03-01 (translations, Button component) |
| provides | Hero section component, GanttMockup SVG component, landing page visual |
| affects | 03-04 (remaining landing page sections), Phase 4 (animated Gantt replacement) |
| tech-stack.added | None |
| tech-stack.patterns | Inline SVG with CSS variable colors, async server component sections |
| duration | ~3 minutes |
| completed | 2026-02-09 |

---

## Key Files

### Created
- `src/components/sections/GanttMockup.tsx` -- Pure presentational SVG Gantt chart illustration (800x400 viewBox, 6 resource rows, 11 task bars, brand colors via CSS variables)
- `src/components/sections/Hero.tsx` -- Async server component with full-viewport layout, headline, subtext, two CTA buttons, and GanttMockup in elevated card wrapper

### Modified
- `src/app/[locale]/page.tsx` -- Replaced inline Hero content with `<Hero />` component import; removed unused Logo and Button imports

---

## Task Results

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Create static SVG Gantt chart mockup component | `38c4ec8` | Complete |
| 2 | Create Hero section component | `edb8b15` | Complete |

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| SVG Gantt uses computed layout from constants (labelWidth, dayWidth, etc.) | Makes bar positions maintainable and mathematically consistent rather than magic numbers |
| Added "now" indicator dashed line at Wednesday noon | Adds visual realism -- real Gantt charts show current time position |
| Home page updated to render Hero component instead of inline content | Hero section is now a self-contained server component; page.tsx becomes a composition root |

---

## Deviations from Plan

None -- plan executed exactly as written.

---

## Verification Results

- `npm run build` passes with 0 errors, 21 static pages generated
- `GanttMockup.tsx` exports `GanttMockup` component
- SVG uses only CSS variables for colors (zero hardcoded hex values)
- SVG has `role="img"` and `aria-hidden="true"` attributes
- SVG is responsive: `viewBox="0 0 800 400"` with `w-full h-auto` class, no fixed dimensions
- `Hero.tsx` exports async `Hero` function using `getTranslations` (not `useTranslations`)
- Hero section uses `min-h-dvh` for full dynamic viewport height
- Two-column layout: `grid-cols-1 lg:grid-cols-2` (stacked mobile, side-by-side desktop)
- CTA buttons use `Button asChild` with next-intl `Link` to `/contact` and `/features`
- GanttMockup wrapped in `rounded-xl border bg-card shadow-lg overflow-hidden` card
- All text from `Hero` translation namespace (headline, subtext, cta, ctaSecondary)

---

## Next Phase Readiness

**Blockers:** None

**Ready for:**
- 03-04: Features, SocialProof, CTABanner sections (Hero provides the top section, remaining sections compose below it)
- Phase 4: Animated Gantt (GanttMockup component is a clean replacement target -- swap SVG for Framer Motion version)
