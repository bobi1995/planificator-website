import {getTranslations} from 'next-intl/server';
import {ImagePlaceholder} from '@/components/ui/ImagePlaceholder';

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
          <ImagePlaceholder
            src="/images/use-cases/changeovers.png"
            alt={t('imageAlt')}
            width={800}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
