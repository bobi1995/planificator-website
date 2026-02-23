import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {AboutHero} from '@/components/sections/about/AboutHero';
import {ExpertiseSection} from '@/components/sections/about/ExpertiseSection';
import {TechnologySection} from '@/components/sections/about/TechnologySection';
import {MissionStatement} from '@/components/sections/about/MissionStatement';
import {CTABanner} from '@/components/sections/CTABanner';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'AboutPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/about'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/about`,
      type: 'website',
    },
  };
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <ExpertiseSection />
      <TechnologySection />
      <MissionStatement />
      <CTABanner headingKey="aboutHeading" descriptionKey="aboutDescription" ctaKey="aboutCta" />
    </>
  );
}
