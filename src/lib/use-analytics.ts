'use client';

import {usePlausible} from 'next-plausible';
import type {PlausibleEvents} from '@/lib/analytics';

export function useAnalytics() {
  return usePlausible<PlausibleEvents>();
}
