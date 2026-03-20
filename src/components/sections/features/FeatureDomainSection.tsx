import {getTranslations} from 'next-intl/server';
import {
  GanttChart, Users, Brain, Calendar, Layers, Activity,
  MousePointerClick, AlertTriangle, Monitor, Wrench, GraduationCap,
  BarChart3, FolderTree, Zap, SlidersHorizontal, GitBranch,
  Clock, Coffee, ArrowLeftRight, CalendarDays,
  FileStack, Package, ClipboardCheck,
  Radio, ListChecks, MessageSquare
} from 'lucide-react';
import {ImagePlaceholder} from '@/components/ui/ImagePlaceholder';

// Map domain keys to their Lucide header icons
const domainIcons: Record<string, React.ComponentType<{className?: string}>> = {
  scheduling: GanttChart,
  resources: Users,
  optimization: Brain,
  shifts: Calendar,
  bom: Layers,
  shopFloor: Activity,
};

// Map domain + feature index to specific Lucide icons for feature cards
const featureIcons: Record<string, React.ComponentType<{className?: string}>[]> = {
  scheduling: [Monitor, MousePointerClick, AlertTriangle, GanttChart],
  resources: [Wrench, GraduationCap, BarChart3, FolderTree],
  optimization: [Zap, SlidersHorizontal, GitBranch, GanttChart],
  shifts: [Clock, Coffee, ArrowLeftRight, CalendarDays],
  bom: [FileStack, Package, ClipboardCheck],
  shopFloor: [Radio, ListChecks, MessageSquare],
};

// Map domain keys to screenshot image paths
// TODO: add _en variants and use locale to pick the right one
const domainImages: Record<string, string> = {
  scheduling: '/images/features/playground_bg.png',
  resources: '/images/features/resource_bg.png',
  optimization: '/images/features/plan-compare_bg.png',
  shifts: '/images/features/shift_bg.png',
  bom: '/images/features/routes_bg.png',
  shopFloor: '/images/features/schedule_bg.png',
};

interface Props {
  domain: string;
  index: number;
}

export async function FeatureDomainSection({domain, index}: Props) {
  const t = await getTranslations(`FeaturesPage.domains.${domain}`);

  const DomainIcon = domainIcons[domain] || GanttChart;
  const icons = featureIcons[domain] || [];
  const imageSrc = domainImages[domain];

  // Count features (domains have 3 or 4 features)
  const featureCount = domain === 'bom' || domain === 'shopFloor' ? 3 : 4;
  const featureIndices = Array.from({length: featureCount}, (_, i) => i);

  const isAlternate = index % 2 === 1;
  const imageOnRight = index % 2 === 0;

  return (
    <section id={domain} className={isAlternate ? 'py-20 px-4 bg-muted/30' : 'py-20 px-4'}>
      <div className="max-w-7xl mx-auto">
        {/* Domain header with image */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-center ${imageOnRight ? '' : 'lg:direction-rtl'}`}>
          <div className={imageOnRight ? '' : 'lg:order-2'}>
            <div className="flex items-center gap-3 mb-4">
              <DomainIcon className="h-10 w-10 text-brand-600" />
              <h2 className="text-heading md:text-display">{t('title')}</h2>
            </div>
            <p className="text-body-lg text-muted-foreground max-w-3xl">
              {t('description')}
            </p>
          </div>
          <div className={imageOnRight ? '' : 'lg:order-1'}>
            {/* Feature screenshot — drop image at public{imageSrc} */}
            <ImagePlaceholder
              src={imageSrc}
              alt={t('title')}
              width={800}
              height={500}
            />
          </div>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureIndices.map((i) => {
            const FeatureIcon = icons[i] || GanttChart;
            return (
              <div
                key={i}
                className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
              >
                <FeatureIcon className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="text-subheading mb-2">
                  {t(`features.${i}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`features.${i}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
