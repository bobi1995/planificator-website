import {getTranslations} from 'next-intl/server';

export async function MissionStatement() {
  const t = await getTranslations('AboutPage');

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl md:text-2xl text-foreground font-medium italic leading-relaxed">
          &ldquo;{t('missionStatement')}&rdquo;
        </p>
      </div>
    </section>
  );
}
