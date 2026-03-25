import {getTranslations} from 'next-intl/server';
import {Cpu, Factory, Package, Settings} from 'lucide-react';

const ADDON_ICONS = [Cpu, Factory, Package, Settings] as const;
const ADDON_KEYS = ['optimizer', 'mes', 'mrp', 'erp'] as const;

export async function PricingAddons() {
  const t = await getTranslations('PricingPage.addons');

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-heading md:text-display text-center mb-4">
          {t('title')}
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10">
          {t('description')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ADDON_KEYS.map((key, i) => {
            const Icon = ADDON_ICONS[i];
            return (
              <div
                key={key}
                className={`rounded-lg border p-5 text-center ${
                  key === 'optimizer'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950'
                    : ''
                }`}
              >
                <Icon className="h-8 w-8 mx-auto mb-3 text-brand-600" />
                <p className="text-sm font-medium">{t(key)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
