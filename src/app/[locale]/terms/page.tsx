import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

type Props = {
  params: Promise<{locale: string}>;
};

const SECTION_KEYS = [
  'definitions',
  'acceptance',
  'serviceDescription',
  'accounts',
  'acceptableUse',
  'intellectualProperty',
  'userData',
  'payment',
  'availability',
  'limitation',
  'indemnification',
  'termination',
  'governingLaw',
  'changes',
  'contact',
] as const;

const ITEM_COUNTS: Partial<Record<string, number>> = {
  definitions: 3,
  acceptableUse: 6,
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'TermsPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/terms'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/terms`,
      type: 'website',
    },
  };
}

export default async function TermsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'TermsPage'});

  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-heading md:text-display mb-2">{t('title')}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t('lastUpdated')}</p>
        <p className="text-body-lg text-muted-foreground mb-12">{t('intro')}</p>

        <div className="space-y-10">
          {SECTION_KEYS.map((key) => (
            <section key={key}>
              <h2 className="text-subheading mb-3">{t(`sections.${key}.title`)}</h2>

              {/* Contact section with email link */}
              {key === 'contact' && (
                <div className="space-y-1 text-sm">
                  <p>{t(`sections.${key}.content`)}</p>
                  <p>
                    <a href={`mailto:${t(`sections.${key}.email`)}`} className="text-brand-600 hover:underline">
                      {t(`sections.${key}.email`)}
                    </a>
                  </p>
                  <p>{t(`sections.${key}.phone`)}</p>
                </div>
              )}

              {/* Sections with just a content paragraph */}
              {!ITEM_COUNTS[key] && key !== 'contact' && (
                <p className="text-sm text-muted-foreground">{t(`sections.${key}.content`)}</p>
              )}

              {/* Sections with intro + items list */}
              {ITEM_COUNTS[key] != null && (
                <>
                  {key === 'acceptableUse' && (
                    <p className="text-sm text-muted-foreground mb-3">{t(`sections.${key}.intro`)}</p>
                  )}
                  <ul className="list-disc pl-6 space-y-2">
                    {Array.from({length: ITEM_COUNTS[key]!}, (_, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {t(`sections.${key}.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
