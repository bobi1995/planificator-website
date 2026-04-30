export type AnalyticsEvents = {
  'Demo Request Click': {location: string};
  'ROI Calculator Used': {estimatedSavings: number};
  'CTA Click': {variant: string; page: string};
  'Blog Post Read': {slug: string};
};
