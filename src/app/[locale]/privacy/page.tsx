import {setRequestLocale, getTranslations} from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Footer'});
  return {
    title: `${t('privacy')} | Planifactor`,
  };
}

export default async function PrivacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const footer = await getTranslations({locale, namespace: 'Footer'});
  const t = await getTranslations({locale, namespace: 'StubPage'});

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16">
      <h1 className="text-heading md:text-display mb-4">{footer('privacy')}</h1>
      <p className="text-muted-foreground text-body-lg">{t('comingSoon')}</p>
      <p className="text-muted-foreground mt-2">{t('description')}</p>
    </div>
  );
}
