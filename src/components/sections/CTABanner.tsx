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
    <section className="bg-brand-600 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-heading md:text-display text-white mb-4">
          {t(headingKey)}
        </h2>
        <p className="text-brand-100 text-body-lg mb-8 max-w-2xl mx-auto">
          {t(descriptionKey)}
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href={ctaHref}>{t(ctaKey)}</Link>
        </Button>
      </div>
    </section>
  );
}
