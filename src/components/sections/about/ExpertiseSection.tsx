import {getTranslations} from 'next-intl/server';
import Image from 'next/image';

export async function ExpertiseSection() {
  const t = await getTranslations('AboutPage.expertise');

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-heading md:text-display mb-8">
              {t('title')}
            </h2>
            <div className="space-y-6 text-body-lg text-muted-foreground">
              {[0, 1, 2].map((i) => (
                <p key={i}>{t(`paragraphs.${i}`)}</p>
              ))}
            </div>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden aspect-[4/3]">
            <Image
              src="/images/use-cases/gantt-pic.png"
              alt={t('imageAlt')}
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
