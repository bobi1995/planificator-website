'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {InlineWidget} from 'react-calendly';
import {Mail} from 'lucide-react';
import {getConsentStatus} from '@/lib/cookie-consent';

interface CalendlyInlineProps {
  url: string;
  locale?: string;
}

export function CalendlyInline({url, locale}: CalendlyInlineProps) {
  const t = useTranslations('ContactPage');
  const [consent, setConsent] = useState<'accepted' | 'declined' | 'unknown'>('unknown');

  useEffect(() => {
    // Read initial consent status
    setConsent(getConsentStatus());

    // Listen for consent changes (from CookieConsent banner)
    function handleConsentChange(e: Event) {
      const detail = (e as CustomEvent).detail as string;
      if (detail === 'accepted' || detail === 'declined') {
        setConsent(detail);
      }
    }

    window.addEventListener('consent-changed', handleConsentChange);
    return () => window.removeEventListener('consent-changed', handleConsentChange);
  }, []);

  // Append locale to Calendly URL if provided
  const calendlyUrl = locale && locale !== 'en'
    ? `${url}?locale=${locale}`
    : url;

  if (consent !== 'accepted') {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center bg-muted/30 min-h-[700px] flex flex-col items-center justify-center">
        <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-2">{t('booking.consentRequired')}</p>
        <p className="text-sm text-muted-foreground">
          {t('booking.alternativeContact')}{' '}
          <a href="mailto:hello@planificator.com" className="text-brand-600 underline">
            hello@planificator.com
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
