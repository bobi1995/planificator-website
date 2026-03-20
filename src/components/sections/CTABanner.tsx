import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';

interface CTABannerProps {
  headingKey?: string;
  descriptionKey?: string;
  ctaKey?: string;
  ctaHref?: string;
  namespace?: string;
}

export async function CTABanner({
  headingKey = 'heading',
  descriptionKey = 'description',
  ctaKey = 'cta',
  ctaHref = '/contact',
  namespace = 'CTABanner',
}: CTABannerProps = {}) {
  const t = await getTranslations(namespace);

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Gradient background matching product's signature indigo-to-purple */}
      <div className="absolute inset-0 bg-linear-to-r from-brand-600 to-accent-purple-600" />
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-purple-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-heading md:text-display text-white mb-4">
          {t(headingKey)}
        </h2>
        <p className="text-brand-100 text-body-lg mb-8 max-w-2xl mx-auto">
          {t(descriptionKey)}
        </p>
        <Button size="lg" variant="secondary" className="shadow-lg" asChild>
          <Link href={ctaHref}>{t(ctaKey)}</Link>
        </Button>
      </div>
    </section>
  );
}
