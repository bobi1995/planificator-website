import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Hero} from '@/components/sections/Hero';
import {ComparisonSection} from '@/components/sections/ComparisonSection';
import {FeatureHighlights} from '@/components/sections/FeatureHighlights';
import {SocialProof} from '@/components/sections/SocialProof';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ComparisonSection />
      <FeatureHighlights />
      <SocialProof />
      <CTABanner />
    </>
  );
}
