import {SITE_URL} from '@/lib/constants';
import {routing} from '@/i18n/routing';

/**
 * Builds the `alternates` object for Next.js generateMetadata.
 *
 * @param locale - Current locale (e.g. 'en', 'bg')
 * @param path - Page path with leading slash (e.g. '/features') or empty string for home
 */
export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
  };
}
