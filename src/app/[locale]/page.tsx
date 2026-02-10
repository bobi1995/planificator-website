import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Hero} from '@/components/sections/Hero';
import {ComparisonSection} from '@/components/sections/ComparisonSection';
import {FeatureHighlights} from '@/components/sections/FeatureHighlights';
import {SocialProof} from '@/components/sections/SocialProof';
import {CTABanner} from '@/components/sections/CTABanner';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';
import {SoftwareApplicationJsonLd} from '@/lib/structured-data';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: {absolute: t('title')},
    description: t('description'),
    alternates: buildAlternates(locale, ''),
    openGraph: {
      title: t('title'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}`,
      type: 'website',
    },
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
      <SoftwareApplicationJsonLd />
    </>
  );
}
