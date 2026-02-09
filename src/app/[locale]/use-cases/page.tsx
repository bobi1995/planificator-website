import {setRequestLocale, getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Navigation'});
  return {
    title: `${t('useCases')} | Planifactor`,
  };
}

export default async function UseCasesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({locale, namespace: 'Navigation'});
  const t = await getTranslations({locale, namespace: 'StubPage'});

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16">
      <h1 className="text-heading md:text-display mb-4">{nav('useCases')}</h1>
      <p className="text-muted-foreground text-body-lg">{t('comingSoon')}</p>
      <p className="text-muted-foreground mt-2">{t('description')}</p>
    </div>
  );
}
