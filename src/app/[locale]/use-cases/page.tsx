import {setRequestLocale, getTranslations} from 'next-intl/server';
import {UseCaseCard} from '@/components/sections/use-cases/UseCaseCard';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

const USE_CASE_SLUGS = ['discrete-manufacturing', 'job-shops', 'production-planning'] as const;

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'UseCasesIndex'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
  };
}

export default async function UseCasesIndexPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'UseCasesIndex'});

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-display md:text-hero">{t('title')}</h1>
            <p className="mt-6 text-body-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {USE_CASE_SLUGS.map((slug) => (
              <UseCaseCard
                key={slug}
                slug={slug}
                title={t(`cards.${slug}.title`)}
                description={t(`cards.${slug}.description`)}
                cta={t(`cards.${slug}.cta`)}
              />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
