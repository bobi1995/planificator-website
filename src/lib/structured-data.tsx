import type {WithContext, Organization, SoftwareApplication, Article} from 'schema-dts';
import {SITE_URL, SITE_NAME} from '@/lib/constants';

/**
 * Safely serializes JSON-LD, escaping `<` to prevent XSS in script tags.
 */
function safeJsonLd(data: WithContext<Organization | SoftwareApplication | Article>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Organization structured data for the site.
 * Place in root layout or on every page.
 */
export function OrganizationJsonLd() {
  const jsonLd: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: 'AI-powered production scheduling platform for manufacturers',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: safeJsonLd(jsonLd)}}
    />
  );
}

/**
 * SoftwareApplication structured data for the landing page.
 */
export function SoftwareApplicationJsonLd() {
  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: 'AI-powered production scheduling platform for manufacturers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Contact for pricing',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: safeJsonLd(jsonLd)}}
    />
  );
}

/**
 * Article structured data for blog posts.
 */
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  author,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
}) {
  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    url,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: safeJsonLd(jsonLd)}}
    />
  );
}
