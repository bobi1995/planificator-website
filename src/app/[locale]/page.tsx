import {setRequestLocale, getTranslations} from 'next-intl/server';

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

  const t = await getTranslations({locale, namespace: 'HomePage'});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl text-center">
        {t('description')}
      </p>
      <div className="mt-8 flex gap-4">
        <button className="rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90">
          {t('cta')}
        </button>
        <button className="rounded-md border border-input px-6 py-3 font-medium hover:bg-accent hover:text-accent-foreground">
          {t('ctaSecondary')}
        </button>
      </div>
    </main>
  );
}
