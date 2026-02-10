import {getTranslations} from 'next-intl/server';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Mail, Phone, Linkedin, Clock, CheckCircle} from 'lucide-react';

export async function ContactInfo() {
  const t = await getTranslations('ContactPage');

  return (
    <div className="space-y-6">
      {/* Contact details card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-subheading">{t('info.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-brand-600 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t('info.emailLabel')}</p>
              <a href="mailto:hello@planifactor.com" className="text-brand-600 hover:underline">
                {t('info.emailValue')}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-brand-600 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t('info.phoneLabel')}</p>
              <p>{t('info.phoneValue')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-brand-600 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t('info.linkedinLabel')}</p>
              <p>{t('info.linkedinValue')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-brand-600 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">{t('info.officeHours')}</p>
              <p>{t('info.officeHoursValue')}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-2 border-t">
            {t('info.responseTime')}
          </p>
        </CardContent>
      </Card>

      {/* What to expect card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-subheading">{t('expect.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm">{t('expect.step1')}</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm">{t('expect.step2')}</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <p className="text-sm">{t('expect.step3')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
