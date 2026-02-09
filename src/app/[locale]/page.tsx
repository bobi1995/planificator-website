import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Logo} from '@/components/brand/Logo';
import {Button} from '@/components/ui/button';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Hero'});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 md:px-12 md:py-24">
      <Logo size="lg" className="mb-8" />
      <h1 className="text-heading md:text-display lg:text-hero text-center">
        {t('headline')}
      </h1>
      <p className="mt-6 text-base md:text-body-lg text-muted-foreground max-w-2xl text-center">
        {t('subtext')}
      </p>
      <div className="mt-8 flex gap-4">
        <Button size="lg">
          {t('cta')}
        </Button>
        <Button variant="outline" size="lg">
          {t('ctaSecondary')}
        </Button>
      </div>
    </main>
  );
}
