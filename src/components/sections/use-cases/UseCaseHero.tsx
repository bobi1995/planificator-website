import {getTranslations} from 'next-intl/server';
import {Factory, Scissors, CalendarRange} from 'lucide-react';

const slugIcons: Record<string, React.ComponentType<{className?: string}>> = {
  'discrete-manufacturing': Factory,
  'job-shops': Scissors,
  'production-planning': CalendarRange,
};

interface Props {
  slug: string;
}

export async function UseCaseHero({slug}: Props) {
  const t = await getTranslations(`UseCases.${slug}`);
  const Icon = slugIcons[slug] || Factory;

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <Icon className="h-16 w-16 text-brand-600 mx-auto mb-6" />
        <h1 className="text-display md:text-hero">
          {t('hero.title')}
        </h1>
        <p className="mt-6 text-body-lg text-muted-foreground max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
