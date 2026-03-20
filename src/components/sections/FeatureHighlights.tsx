import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Brain, GanttChart, Users, Zap, Clock, CalendarClock} from 'lucide-react';

const features = [
  {key: 'aiScheduling', icon: Brain, gradient: 'from-brand-500 to-accent-purple-500'},
  {key: 'ganttVisualization', icon: GanttChart, gradient: 'from-brand-600 to-brand-400'},
  {key: 'resourceManagement', icon: Users, gradient: 'from-accent-purple-500 to-brand-500'},
  {key: 'optimization', icon: Zap, gradient: 'from-brand-400 to-accent-purple-400'},
  {key: 'realTimePlanning', icon: Clock, gradient: 'from-brand-700 to-brand-500'},
  {key: 'shiftManagement', icon: CalendarClock, gradient: 'from-accent-purple-600 to-brand-600'},
] as const;

/**
 * Feature Highlights section — grid of 6 feature cards with icons.
 *
 * Each card links to the /features page and displays a Lucide icon
 * in a gradient circle, title, and description.
 *
 * Async server component using next-intl getTranslations.
 */
export async function FeatureHighlights() {
  const t = await getTranslations('Features');

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-50/50 via-white to-brand-50/30" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display">{t('title')}</h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.key} href="/features" className="group">
              <div className="rounded-xl border border-brand-100/50 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/10 hover:-translate-y-1 h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br ${feature.gradient} mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-subheading mb-2 group-hover:text-brand-600 transition-colors">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
