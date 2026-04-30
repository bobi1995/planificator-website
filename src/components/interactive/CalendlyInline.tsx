'use client';

import {useState, useEffect, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';
import {InlineWidget} from 'react-calendly';
import {Mail, Send, CheckCircle, AlertCircle, Loader2} from 'lucide-react';
import {getConsentStatus} from '@/lib/cookie-consent';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {sendContactEmail} from '@/app/actions/contact';

interface CalendlyInlineProps {
  url: string;
  locale?: string;
}

export function CalendlyInline({url, locale}: CalendlyInlineProps) {
  const t = useTranslations('ContactPage');
  const [consent, setConsent] = useState<'accepted' | 'declined' | 'unknown'>('unknown');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    setConsent(getConsentStatus());

    function handleConsentChange(e: Event) {
      const detail = (e as CustomEvent).detail as string;
      if (detail === 'accepted' || detail === 'declined') {
        setConsent(detail);
      }
    }

    window.addEventListener('consent-changed', handleConsentChange);
    return () => window.removeEventListener('consent-changed', handleConsentChange);
  }, []);

  const calendlyUrl = locale && locale !== 'en'
    ? `${url}?locale=${locale}`
    : url;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus('success');
      setFormData({name: '', email: '', company: '', message: ''});
    } else {
      setStatus('error');
    }
  }

  if (consent !== 'accepted') {
    if (status === 'success') {
      return (
        <div className="rounded-lg border bg-card p-6 md:p-8 shadow-sm text-center">
          <CheckCircle className="h-12 w-12 text-brand-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('form.successTitle')}</h3>
          <p className="text-sm text-muted-foreground">{t('form.successMessage')}</p>
        </div>
      );
    }

    return (
      <div className="rounded-lg border bg-card p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Mail className="h-6 w-6 text-brand-600 shrink-0" />
          <h3 className="text-lg font-semibold">{t('booking.title')}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {t('form.formDescription')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t('form.nameLabel')}</Label>
              <Input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">{t('form.emailLabel')}</Label>
              <Input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-company">{t('form.companyLabel')}</Label>
            <Input
              id="contact-company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({...prev, company: e.target.value}))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">{t('form.messageLabel')}</Label>
            <Textarea
              id="contact-message"
              rows={4}
              required
              placeholder={t('form.messagePlaceholder')}
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {t('form.errorMessage')}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {status === 'sending' ? t('form.sendingButton') : t('form.submitButton')}
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          {t('booking.consentRequired')}{' '}
          {t('booking.alternativeContact')}{' '}
          <a href="mailto:hello@planificator.bg" className="text-brand-600 underline">
            hello@planificator.bg
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
