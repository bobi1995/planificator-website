'use client';

import dynamic from 'next/dynamic';

const CalendlyInline = dynamic(
  () => import('./CalendlyInline').then((mod) => mod.CalendlyInline),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border bg-card min-h-[700px] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    ),
  }
);

interface CalendlyInlineLoaderProps {
  url: string;
  locale?: string;
}

export function CalendlyInlineLoader({url, locale}: CalendlyInlineLoaderProps) {
  return <CalendlyInline url={url} locale={locale} />;
}
