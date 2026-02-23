import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {FeatureHero} from '@/components/sections/features/FeatureHero';
import {FeatureDomainSection} from '@/components/sections/features/FeatureDomainSection';
import {FeatureNav} from '@/components/sections/features/FeatureNav';
import {CTABanner} from '@/components/sections/CTABanner';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FeaturesPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/features'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/features`,
      type: 'website',
    },
  };
}

const domains = [
  'scheduling',
  'resources',
  'optimization',
  'shifts',
  'bom',
  'shopFloor',
] as const;

export default async function FeaturesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'FeaturesPage'});
  const domainNav = domains.map((d) => ({
    id: d,
    title: t(`domains.${d}.title`),
  }));

  return (
    <>
      <FeatureHero />
      <FeatureNav domains={domainNav} />
      {domains.map((domain, index) => (
        <FeatureDomainSection key={domain} domain={domain} index={index} />
      ))}
      <CTABanner headingKey="featuresHeading" descriptionKey="featuresDescription" ctaKey="featuresCta" />
    </>
  );
}
