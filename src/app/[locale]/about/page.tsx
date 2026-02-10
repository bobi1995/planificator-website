import {setRequestLocale, getTranslations} from 'next-intl/server';
import {AboutHero} from '@/components/sections/about/AboutHero';
import {CompanyStory} from '@/components/sections/about/CompanyStory';
import {MissionValues} from '@/components/sections/about/MissionValues';
import {TeamSection} from '@/components/sections/about/TeamSection';
import {CTABanner} from '@/components/sections/CTABanner';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'AboutPage'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
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
