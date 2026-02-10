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

  // Static pages with alternates for all locales
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${SITE_URL}/en${path}`,
    lastModified: now,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
      ),
    },
  }));

  // Blog post entries (EN canonical, with locale alternates)
  const posts = await getAllPosts('en');
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.meta.date),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])
      ),
    },
  }));

  return [...staticEntries, ...blogEntries];
}
