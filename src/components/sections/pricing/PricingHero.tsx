import {getTranslations} from 'next-intl/server';

export async function PricingHero() {
  const t = await getTranslations('PricingPage');

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
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
