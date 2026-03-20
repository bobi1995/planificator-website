import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {AnimatedGantt} from '@/components/sections/AnimatedGantt';

/**
 * Hero section — the first thing visitors see on the landing page.
 *
 * Full-viewport section with gradient background, AI-focused headline,
 * audience subtext, two CTA buttons, and an animated Gantt chart.
 *
 * Async server component using next-intl getTranslations.
 */
export async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative min-h-dvh flex items-center py-20 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-50 via-white to-accent-purple-400/10" />
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-accent-purple-400/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium">
              {t('trustSignal')}
            </div>
            <h1 className="text-heading md:text-display lg:text-hero bg-linear-to-r from-brand-700 via-brand-600 to-accent-purple-600 bg-clip-text text-transparent">
              {t('headline')}
            </h1>
            <p className="mt-6 text-base md:text-body-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              {t('subtext')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-linear-to-r from-brand-600 to-accent-purple-600 hover:from-brand-700 hover:to-accent-purple-600 shadow-lg shadow-brand-600/25" asChild>
                <Link href="/contact">{t('cta')}</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-brand-200 hover:bg-brand-50" asChild>
                <Link href="/features">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>

          {/* Visual column — animated Gantt chart */}
          <div className="flex flex-col gap-6 justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none rounded-xl border border-brand-200/50 bg-white/80 backdrop-blur shadow-xl shadow-brand-600/10 overflow-hidden">
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
