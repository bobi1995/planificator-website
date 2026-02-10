import {setRequestLocale, getTranslations} from 'next-intl/server';
import {FeatureHero} from '@/components/sections/features/FeatureHero';
import {FeatureDomainSection} from '@/components/sections/features/FeatureDomainSection';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'FeaturesPage'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
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

  return (
    <>
      <FeatureHero />
      {domains.map((domain, index) => (
        <FeatureDomainSection key={domain} domain={domain} index={index} />
      ))}
      <CTABanner />
    </>
  );
}
