import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

type Props = {
  params: Promise<{locale: string}>;
};

const SECTION_KEYS = [
  'dataController',
  'dataWeCollect',
  'howWeUse',
  'legalBasis',
  'cookies',
  'dataSharing',
  'dataRetention',
  'yourRights',
  'dataSecurity',
  'internationalTransfers',
  'children',
  'changes',
  'contact',
] as const;

const ITEM_COUNTS: Partial<Record<string, number>> = {
  dataWeCollect: 4,
  howWeUse: 5,
  legalBasis: 4,
  dataSharing: 4,
  yourRights: 7,
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'PrivacyPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/privacy'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/privacy`,
      type: 'website',
    },
  };
}

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'PrivacyPage'});

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

              {/* Content paragraph (most sections have one) */}
              {key === 'dataController' && (
                <div className="space-y-1 text-sm">
                  <p>{t(`sections.${key}.content`)}</p>
                  <p className="font-medium">{t(`sections.${key}.company`)}</p>
                  <p>{t(`sections.${key}.website`)}</p>
                  <p>{t(`sections.${key}.email`)}</p>
                  <p>{t(`sections.${key}.phone`)}</p>
                </div>
              )}

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
              {['cookies', 'dataRetention', 'dataSecurity', 'internationalTransfers', 'children', 'changes'].includes(key) && (
                <p className="text-sm text-muted-foreground">{t(`sections.${key}.content`)}</p>
              )}

              {/* Sections with intro + items list */}
              {ITEM_COUNTS[key] != null && (
                <>
                  <p className="text-sm text-muted-foreground mb-3">{t(`sections.${key}.intro`)}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {Array.from({length: ITEM_COUNTS[key]!}, (_, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {t(`sections.${key}.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                  {key === 'yourRights' && (
                    <p className="text-sm text-muted-foreground mt-3">
                      {t('sections.yourRights.howToExercise')}
                    </p>
                  )}
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
