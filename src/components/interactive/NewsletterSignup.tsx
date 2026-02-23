'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Mail} from 'lucide-react';

export function NewsletterSignup() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: Connect to email service (Resend, Mailchimp, etc.)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="text-brand-600 font-medium">{t('thankYou')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          required
          placeholder={t('placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit">{t('subscribe')}</Button>
    </form>
  );
}
