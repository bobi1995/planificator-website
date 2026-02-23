import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {AnimatedGantt} from '@/components/sections/AnimatedGantt';

/**
 * Hero section — the first thing visitors see on the landing page.
 *
 * Full-viewport section with AI-focused headline, audience subtext,
 * two CTA buttons, and an animated Gantt chart.
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
            <p className="mt-4 text-sm text-muted-foreground">
              {t('trustSignal')}
            </p>
          </div>

          {/* Visual column — animated Gantt chart */}
          <div className="flex flex-col gap-6 justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none rounded-xl border bg-card shadow-lg overflow-hidden">
              <AnimatedGantt
                days={[t('gantt.mon'), t('gantt.tue'), t('gantt.wed'), t('gantt.thu'), t('gantt.fri')]}
                resources={[t('gantt.machineA'), t('gantt.machineB'), t('gantt.machineC'), t('gantt.line1'), t('gantt.line2'), t('gantt.line3')]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
