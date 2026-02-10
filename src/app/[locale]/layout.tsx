import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Inter} from 'next/font/google';
import PlausibleProvider from 'next-plausible';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {CookieConsent} from '@/components/interactive/CookieConsent';
import {SITE_URL, SITE_NAME} from '@/lib/constants';
import {OrganizationJsonLd} from '@/lib/structured-data';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    openGraph: {
      siteName: SITE_NAME,
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      type: 'website',
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {en: `${SITE_URL}/en`, bg: `${SITE_URL}/bg`},
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <PlausibleProvider domain="planifactor.com">
          <NextIntlClientProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <CookieConsent />
          </NextIntlClientProvider>
        </PlausibleProvider>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
