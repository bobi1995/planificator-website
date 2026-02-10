import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {UseCaseHero} from '@/components/sections/use-cases/UseCaseHero';
import {UseCaseBenefits} from '@/components/sections/use-cases/UseCaseBenefits';
import {CTABanner} from '@/components/sections/CTABanner';
import {AlertTriangle, CheckCircle} from 'lucide-react';

const VALID_SLUGS = ['discrete-manufacturing', 'job-shops', 'production-planning'] as const;
type UseCaseSlug = typeof VALID_SLUGS[number];

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props) {
  const {locale, slug} = await params;
  if (!VALID_SLUGS.includes(slug as UseCaseSlug)) return {};
  const t = await getTranslations({locale, namespace: `UseCases.${slug}`});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
  };
}

export default async function UseCasePage({params}: Props) {
  const {locale, slug} = await params;
  if (!VALID_SLUGS.includes(slug as UseCaseSlug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: `UseCases.${slug}`});

  return (
    <>
      <UseCaseHero slug={slug} />

      {/* Pain Points */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-heading md:text-display text-center mb-12">
            {t('painPoints.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-subheading mb-2">
                      {t(`painPoints.items.${i}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`painPoints.items.${i}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-heading md:text-display text-center mb-12">
            {t('solutions.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-brand-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-subheading mb-2">
                      {t(`solutions.items.${i}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`solutions.items.${i}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits metrics */}
      <UseCaseBenefits slug={slug} />

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-foreground italic mb-8">
            &ldquo;{t('testimonial.quote')}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-brand-100 text-brand-700 text-sm font-semibold">
                {t('testimonial.name')
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-semibold text-sm">{t('testimonial.name')}</p>
              <p className="text-muted-foreground text-sm">
                {t('testimonial.title')}, {t('testimonial.company')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
