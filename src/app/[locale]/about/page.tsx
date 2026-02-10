import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {AboutHero} from '@/components/sections/about/AboutHero';
import {CompanyStory} from '@/components/sections/about/CompanyStory';
import {MissionValues} from '@/components/sections/about/MissionValues';
import {TeamSection} from '@/components/sections/about/TeamSection';
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
      <CompanyStory />
      <MissionValues />
      <TeamSection />
      <CTABanner />
    </>
  );
}
