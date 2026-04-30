import {getTranslations} from 'next-intl/server';

interface Props {
  slug: string;
}

export async function UseCaseBenefits({slug}: Props) {
  const t = await getTranslations(`UseCases.${slug}.benefits`);

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-heading md:text-display text-center mb-4">
          {t('title')}
        </h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">
                {t(`items.${i}.metric`)}
              </div>
              <p className="text-muted-foreground">
                {t(`items.${i}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
