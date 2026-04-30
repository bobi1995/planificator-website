'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {getConsentStatus, setConsentStatus} from '@/lib/cookie-consent';

export function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsentStatus() === 'unknown') setVisible(true);
  }, []);

  function handleAccept() {
    setConsentStatus('accepted');
    setVisible(false);
    // Dispatch custom event so CalendlyInline can react without page reload
    window.dispatchEvent(new CustomEvent('consent-changed', {detail: 'accepted'}));
  }

  function handleDecline() {
    setConsentStatus('declined');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('consent-changed', {detail: 'declined'}));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 py-4 shadow-lg min-h-[60px]"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          {t('message')}{' '}
          <Link href="/privacy" className="text-brand-600 underline hover:text-brand-700">
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            {t('decline')}
          </Button>
          <Button size="sm" onClick={handleAccept}>
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
