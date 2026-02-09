import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Brain, GanttChart, Users, Zap, Clock} from 'lucide-react';

const features = [
  {key: 'aiScheduling', icon: Brain},
  {key: 'ganttVisualization', icon: GanttChart},
  {key: 'resourceManagement', icon: Users},
  {key: 'optimization', icon: Zap},
  {key: 'realTimePlanning', icon: Clock},
] as const;

/**
 * Feature Highlights section — grid of 5 feature cards with icons.
 *
 * Each card links to the /features page and displays a Lucide icon,
 * title, and description from the Features translation namespace.
 *
 * Async server component using next-intl getTranslations.
 */
export async function FeatureHighlights() {
  const t = await getTranslations('Features');

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display">{t('title')}</h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.key} href="/features" className="group">
              <div className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent h-full">
                <feature.icon className="h-10 w-10 text-brand-600 mb-4" />
                <h3 className="text-subheading mb-2">
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
