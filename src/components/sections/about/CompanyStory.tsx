import {getTranslations} from 'next-intl/server';

export async function CompanyStory() {
  const t = await getTranslations('AboutPage.story');

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-heading md:text-display mb-8">
          {t('title')}
        </h2>
        <div className="space-y-6 text-body-lg text-muted-foreground">
          {[0, 1, 2].map((i) => (
            <p key={i}>{t(`paragraphs.${i}`)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
