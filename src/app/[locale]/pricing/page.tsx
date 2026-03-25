import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {PricingHero} from '@/components/sections/pricing/PricingHero';
import {PricingTierCard} from '@/components/sections/pricing/PricingTierCard';
import {PricingComparisonTable} from '@/components/sections/pricing/PricingComparisonTable';
import {PricingFAQ} from '@/components/sections/pricing/PricingFAQ';
import {CTABanner} from '@/components/sections/CTABanner';
import {Link} from '@/i18n/navigation';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';
import {FAQPageJsonLd} from '@/lib/structured-data';
import {PricingAddons} from '@/components/sections/pricing/PricingAddons';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'PricingPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/pricing'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/pricing`,
      type: 'website',
    },
  };
}

const TIER_KEYS = ['starter', 'professional', 'enterprise'] as const;

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'PricingPage'});

  const tiers = TIER_KEYS.map((key) => {
    const featureCount = key === 'starter' ? 6 : 7;
    const features = Array.from({length: featureCount}, (_, i) =>
      t(`tiers.${key}.features.${i}`)
    );

    return {
      key,
      name: t(`tiers.${key}.name`),
      description: t(`tiers.${key}.description`),
      cta: t(`tiers.${key}.cta`),
      features,
      badge: key === 'professional' ? t(`tiers.${key}.badge`) : undefined,
      highlighted: key === 'professional',
    };
  });

  const faqItems = Array.from({length: 7}, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  return (
    <>
      <PricingHero />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier) => (
              <PricingTierCard
                key={tier.key}
                name={tier.name}
                description={tier.description}
                cta={tier.cta}
                features={tier.features}
                badge={tier.badge}
                highlighted={tier.highlighted}
              />
            ))}
          </div>
        </div>
      </section>

      <PricingComparisonTable />
      <PricingAddons />
      <PricingFAQ title={t('faq.title')} items={faqItems} />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body-lg text-muted-foreground">
            {t('roiLink.text')}{' '}
            <Link href="/roi-calculator" className="text-brand-600 font-medium hover:text-brand-700 underline">
              {t('roiLink.cta')}
            </Link>
          </p>
        </div>
      </section>

      <CTABanner headingKey="pricingHeading" descriptionKey="pricingDescription" ctaKey="pricingCta" />
      <FAQPageJsonLd items={faqItems} />
    </>
  );
}
