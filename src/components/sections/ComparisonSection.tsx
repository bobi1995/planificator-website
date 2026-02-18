import {getTranslations} from 'next-intl/server';
import {Activity, Clock, Truck, Pause} from 'lucide-react';
import {ComparisonSlider} from './ComparisonSlider';

/**
 * Before/After comparison section — draggable slider revealing KPI impact.
 *
 * Shows "Manual Scheduling" (red) vs "With Planificator" (brand-blue) metrics
 * in a 2x2 grid with a draggable divider. Desktop uses vertical (landscape)
 * divider, mobile uses horizontal (portrait) divider.
 *
 * Async server component using next-intl getTranslations.
 */
export async function ComparisonSection() {
  const t = await getTranslations('Comparison');

  const metrics = [
    {
      label: t('resourceUtilization'),
      before: t('resourceUtilizationBefore'),
      after: t('resourceUtilizationAfter'),
      icon: <Activity />,
    },
    {
      label: t('onTimeDelivery'),
      before: t('onTimeDeliveryBefore'),
      after: t('onTimeDeliveryAfter'),
      icon: <Truck />,
    },
    {
      label: t('schedulingTime'),
      before: t('schedulingTimeBefore'),
      after: t('schedulingTimeAfter'),
      icon: <Clock />,
    },
    {
      label: t('idleTime'),
      before: t('idleTimeBefore'),
      after: t('idleTimeAfter'),
      icon: <Pause />,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display">
            {t('sectionHeading')}
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t('sectionSubtext')}
          </p>
        </div>

        <div className="min-h-[350px] md:min-h-[300px] rounded-xl border bg-card shadow-lg overflow-hidden">
          <ComparisonSlider
            beforeLabel={t('beforeLabel')}
            afterLabel={t('afterLabel')}
            metrics={metrics}
          />
        </div>
      </div>
    </section>
  );
}
