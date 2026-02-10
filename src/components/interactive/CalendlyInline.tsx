'use client';

import {useTranslations} from 'next-intl';
import {InlineWidget} from 'react-calendly';
import {Mail} from 'lucide-react';

interface CalendlyInlineProps {
  url: string;
  locale?: string;
  consentGiven?: boolean;
}

export function CalendlyInline({url, locale, consentGiven = true}: CalendlyInlineProps) {
  const t = useTranslations('ContactPage');

  // Append locale to Calendly URL if provided (Calendly supports ?locale=xx)
  const calendlyUrl = locale && locale !== 'en'
    ? `${url}?locale=${locale}`
    : url;

  if (!consentGiven) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center bg-muted/30">
        <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-2">{t('booking.consentRequired')}</p>
        <p className="text-sm text-muted-foreground">
          {t('booking.alternativeContact')}{' '}
          <a href="mailto:hello@planifactor.com" className="text-brand-600 underline">
            hello@planifactor.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border min-h-[700px]">
      <InlineWidget
        url={calendlyUrl}
        styles={{height: '700px', minWidth: '320px'}}
      />
    </div>
  );
}
