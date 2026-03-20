'use client';

import {useTranslations} from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('Accessibility');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-md focus:outline-none"
    >
      {t('skipToContent')}
    </a>
  );
}
