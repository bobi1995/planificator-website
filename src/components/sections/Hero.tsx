import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {AnimatedGantt} from '@/components/sections/AnimatedGantt';
import {ImagePlaceholder} from '@/components/ui/ImagePlaceholder';

/**
 * Hero section — the first thing visitors see on the landing page.
 *
 * Full-viewport section with AI-focused headline, audience subtext,
 * two CTA buttons, and a static Gantt chart mockup.
 *
 * Async server component using next-intl getTranslations.
 */
export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="min-h-dvh flex items-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <h1 className="text-heading md:text-display lg:text-hero">
              {t('headline')}
            </h1>
            <p className="mt-6 text-base md:text-body-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {t('subtext')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/contact">{t('cta')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>

          {/* Visual column — Gantt mockup + product screenshot */}
          <div className="flex flex-col gap-6 justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none rounded-xl border bg-card shadow-lg overflow-hidden">
              <AnimatedGantt />
            </div>
            {/* Product dashboard screenshot — drop image at public/images/home/product-dashboard.png */}
            <ImagePlaceholder
              src="/images/home/product-dashboard.png"
              alt={t('ganttAlt')}
              width={1200}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
