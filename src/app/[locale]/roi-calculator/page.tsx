import {setRequestLocale, getTranslations} from 'next-intl/server';
import {ROICalculator} from '@/components/interactive/ROICalculator';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ROICalculator'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
  };
}

export default async function ROICalculatorPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'ROICalculator'});

  return (
    <>
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display md:text-hero">{t('hero.title')}</h1>
          <p className="mt-6 text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <ROICalculator />
      </section>

      <CTABanner />
    </>
  );
}
