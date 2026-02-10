import {getTranslations} from 'next-intl/server';
import {Wrench, Shield, Rocket, Factory} from 'lucide-react';

const valueIcons = [Wrench, Shield, Rocket, Factory];

export async function MissionValues() {
  const t = await getTranslations('AboutPage.mission');

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-heading md:text-display mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-foreground font-medium max-w-3xl mx-auto italic">
            &ldquo;{t('statement')}&rdquo;
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((i) => {
            const Icon = valueIcons[i];
            return (
              <div key={i} className="rounded-lg border bg-card p-6">
                <Icon className="h-8 w-8 text-brand-600 mb-3" />
                <h3 className="text-subheading mb-2">
                  {t(`values.${i}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`values.${i}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
