# Phase 7 Plan 1: ROI Calculator Summary

**One-liner:** Conservative ROI calculator with 4-input form, range-based results, and transparent methodology at /roi-calculator

## Frontmatter

| Key | Value |
|-----|-------|
| phase | 7 |
| plan | 1 |
| subsystem | interactive |
| tags | roi, calculator, client-component, shadcn, i18n |
| requires | Phase 1 (i18n), Phase 2 (design tokens), Phase 3 (layout shell) |
| provides | ROI calculator page, pure calculation utility, 3 new shadcn components |
| affects | Phase 8 (SEO metadata already in place) |
| tech-stack.added | @radix-ui/react-label, @radix-ui/react-select (via shadcn) |
| tech-stack.patterns | Pure calculation utility separated from React component |
| completed | 2026-02-10 |
| duration | ~8 minutes |

## What Was Done

### Task 1: Install shadcn components and create ROI calculation logic
- Installed 3 shadcn/ui components: Label, Input, Select
- Created pure calculation utility at `src/lib/roi-calculator.ts`
- Utility exports: `calculateROI`, `ROIInputs`, `ROIResults`, `SchedulingMethod`
- Efficiency gains by scheduling method (excel: 60-75%, whiteboard: 70-85%, software: 40-55%, none: 75-90%)
- Complexity modifier (resources: <=10 -> 0.85, <=50 -> 1.0, 51+ -> 1.1)
- Volume modifier (orders: <=50 -> 0.9, <=150 -> 1.0, <=300 -> 1.05, 300+ -> 1.1)
- 80% cap on weekly hours saved; 10x cap on speed improvement
- Sanity-tested with minimal and maximal inputs -- caps verified working

### Task 2: Create ROICalculator component, page, and translations
- Added `ROICalculator` namespace to both `messages/en.json` and `messages/bg.json` (~35 keys each)
- Created `ROICalculator` client component at `src/components/interactive/ROICalculator.tsx`
- Created page at `src/app/[locale]/roi-calculator/page.tsx` with server-side hero
- 4-input form: orders/week, scheduling hours/week, number of resources, current method (Select dropdown)
- Results displayed as 4-card responsive grid with Lucide icons (Clock, TrendingUp, DollarSign, Zap)
- Methodology in collapsible Accordion with conservative framing
- Soft CTA links to /contact for demo booking
- Full build passes with zero errors -- 36 static pages generated

## Key Files

### Created
- `src/components/ui/label.tsx` -- shadcn Label component
- `src/components/ui/input.tsx` -- shadcn Input component
- `src/components/ui/select.tsx` -- shadcn Select component
- `src/lib/roi-calculator.ts` -- pure ROI calculation utility
- `src/components/interactive/ROICalculator.tsx` -- client component with form + results display
- `src/app/[locale]/roi-calculator/page.tsx` -- server page composing hero + calculator + CTA

### Modified
- `messages/en.json` -- added ROICalculator namespace (~35 keys)
- `messages/bg.json` -- added ROICalculator namespace (~35 keys, Bulgarian translations)

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Pure utility separated from React | Enables easy testing, reuse, and keeps component focused on UI |
| `as SchedulingMethod` cast in handleCalculate | TypeScript cannot narrow through boolean variable; safe because isValid already validates |
| Range-based results (not single numbers) | Conservative approach builds trust with B2B decision-makers |
| 80% cap on weekly savings | Never claim total elimination of scheduling time |
| EUR 35/hour default rate | Average production planner rate in EU market |
| Methodology accordion (collapsed) | Transparency without clutter; interested users can expand |
| Soft CTA (not email-gated) | Links to /contact page; no aggressive lead capture |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript strict comparison error**
- **Found during:** Task 2 (build verification)
- **Issue:** `currentMethod === ''` comparison after `isValid` check caused TS error -- types `SchedulingMethod` and `""` have no overlap because TS doesn't track narrowing through boolean variables
- **Fix:** Replaced redundant guard with `as SchedulingMethod` cast, which is safe since `isValid` already validates `currentMethod !== ''`
- **Files modified:** `src/components/interactive/ROICalculator.tsx`
- **Commit:** 78c249a

## Verification Results

All 6 verification checks passed:
1. PASS: shadcn components (label, input, select)
2. PASS: all roi-calculator exports found
3. PASS: ROICalculator is client component
4. PASS: ROI calculator page exists
5. PASS: translation namespaces complete (EN + BG)
6. PASS: `npm run build` completed with zero errors (36 static pages)

## Commits

| Hash | Message |
|------|---------|
| 8e1cae0 | feat(07-01): install shadcn components and create ROI calculation utility |
| 78c249a | feat(07-01): create ROI calculator component, page, and translations |
