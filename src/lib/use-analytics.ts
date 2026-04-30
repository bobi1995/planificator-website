'use client';

import {track} from '@vercel/analytics';
import type {AnalyticsEvents} from '@/lib/analytics';

export function useAnalytics() {
  return <K extends keyof AnalyticsEvents>(
    event: K,
    options?: {props?: AnalyticsEvents[K]}
  ) => {
    track(event as string, options?.props as Record<string, string | number | boolean | null>);
  };
}
