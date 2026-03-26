import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ContactHero} from '@/components/sections/contact/ContactHero';
import {ContactInfo} from '@/components/sections/contact/ContactInfo';
import {CalendlyInlineLoader} from '@/components/interactive/CalendlyInlineLoader';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ContactPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/contact'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/contact`,
      type: 'website',
    },
  };
}

const CALENDLY_URL = 'https://calendly.com/borislav-stefanov-1995/30min';

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'ContactPage'});

  return (
    <>
      <ContactHero />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendly widget -- takes 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <h2 className="text-heading mb-2">{t('booking.title')}</h2>
              <p className="text-muted-foreground mb-6">{t('booking.description')}</p>
              <CalendlyInlineLoader url={CALENDLY_URL} locale={locale} />
            </div>

            {/* Contact info sidebar -- takes 1/3 width on desktop */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
