import {getTranslations} from 'next-intl/server';
import {ImagePlaceholder} from '@/components/ui/ImagePlaceholder';

export async function ContactHero() {
  const t = await getTranslations('ContactPage');

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-display md:text-hero">{t('hero.title')}</h1>
        <p className="mt-6 text-body-lg text-muted-foreground max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </div>
      {/* Office/team photo — drop image at public/images/contact/office.jpg */}
      <div className="max-w-5xl mx-auto mt-12">
        <ImagePlaceholder
          src="/images/contact/office.jpg"
          alt=""
          width={1200}
          height={600}
        />
      </div>
    </section>
  );
}
