import {getTranslations, getLocale} from 'next-intl/server';
import {Brain, Lightbulb, Zap} from 'lucide-react';
import Image from 'next/image';

const pillarIcons = [Brain, Lightbulb, Zap];

export async function TechnologySection() {
  const t = await getTranslations('AboutPage.technology');
  const locale = await getLocale();
  const techImage = locale === 'bg'
    ? '/images/features/AI_optimization_bg.png'
    : '/images/features/AI_optimization_en.png';

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display mb-4">
            {t('title')}
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((i) => {
            const Icon = pillarIcons[i];
            return (
              <div key={i} className="rounded-lg border bg-card p-6">
                <Icon className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="text-subheading mb-2">
                  {t(`pillars.${i}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`pillars.${i}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg overflow-hidden aspect-[2/1] max-w-4xl mx-auto">
          <Image
            src={techImage}
            alt={t('imageAlt')}
            width={1200}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
