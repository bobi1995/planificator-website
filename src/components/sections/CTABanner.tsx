import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';

/**
 * CTA Banner section — full-width brand-colored call to action.
 *
 * Displays a heading, description, and demo request button
 * on a brand-600 blue background with white text.
 *
 * Async server component using next-intl getTranslations.
 */
export async function CTABanner() {
  const t = await getTranslations('CTABanner');

  return (
    <section className="bg-brand-600 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-heading md:text-display text-white mb-4">
          {t('heading')}
        </h2>
        <p className="text-brand-100 text-body-lg mb-8 max-w-2xl mx-auto">
          {t('description')}
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">{t('cta')}</Link>
        </Button>
      </div>
    </section>
  );
}
