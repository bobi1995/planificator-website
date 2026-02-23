import type {WithContext, Organization, SoftwareApplication, Article, FAQPage} from 'schema-dts';
import {SITE_URL, SITE_NAME} from '@/lib/constants';

/**
 * Safely serializes JSON-LD, escaping `<` to prevent XSS in script tags.
 */
function safeJsonLd(data: WithContext<Organization | SoftwareApplication | Article | FAQPage>): string {
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
      priceCurrency: 'EUR',
      description: 'Contact for pricing. Free demo available.',
      availability: 'https://schema.org/OnlineOnly',
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
  dateModified,
  author,
  url,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
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

/**
 * FAQPage structured data for pages with FAQ sections.
 */
export function FAQPageJsonLd({items}: {items: {question: string; answer: string}[]}) {
  const jsonLd: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: safeJsonLd(jsonLd)}}
    />
  );
}
