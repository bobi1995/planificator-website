/**
 * Custom Plausible event type definitions.
 *
 * These map event names to their property types for type-safe analytics tracking.
 * Used with next-plausible's usePlausible() hook.
 */
export type PlausibleEvents = {
  'Demo Request Click': {location: string};
  'ROI Calculator Used': {estimatedSavings: number};
  'CTA Click': {variant: string; page: string};
  'Blog Post Read': {slug: string};
};
