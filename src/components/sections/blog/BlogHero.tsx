import {getTranslations} from 'next-intl/server';
import {BookOpen} from 'lucide-react';

export async function BlogHero() {
  const t = await getTranslations('BlogPage');

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <BookOpen className="h-16 w-16 text-brand-600 mx-auto mb-6" />
        <h1 className="text-display md:text-hero">
          {t('heroTitle')}
        </h1>
        <p className="mt-6 text-body-lg text-muted-foreground max-w-3xl mx-auto">
          {t('heroSubtitle')}
        </p>
      </div>
    </section>
  );
}
