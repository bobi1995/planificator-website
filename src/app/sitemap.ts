import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getAllPosts} from '@/lib/blog';
import {SITE_URL} from '@/lib/constants';

/**
 * Static pages that should appear in the sitemap.
 * Paths are relative to /{locale} (empty string = home page).
 */
const STATIC_PAGES = [
  '',
  '/features',
  '/use-cases',
  '/pricing',
  '/about',
  '/blog',
  '/contact',
  '/roi-calculator',
  '/privacy',
  '/terms',
  '/use-cases/discrete-manufacturing',
  '/use-cases/job-shops',
  '/use-cases/production-planning',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const languages = (path: string) =>
    Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_PAGES.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      alternates: {languages: languages(path)},
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const posts = await getAllPosts(locale);
        return posts.map((post) => ({
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.meta.date),
          alternates: {languages: languages(`/blog/${post.slug}`)},
        }));
      })
    )
  ).flat();

  return [...staticEntries, ...blogEntries];
}
