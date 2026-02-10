import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {createOgImageElement, OG_SIZE, OG_CONTENT_TYPE} from '@/lib/og-image';

export const alt = 'Planifactor Use Case';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const VALID_SLUGS = ['discrete-manufacturing', 'job-shops', 'production-planning'];

export default async function Image({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;

  if (!VALID_SLUGS.includes(slug)) {
    return new ImageResponse(
      createOgImageElement({title: 'Planifactor'}),
      {...size}
    );
  }

  const t = await getTranslations({locale, namespace: `UseCases.${slug}`});

  return new ImageResponse(
    createOgImageElement({
      title: t('metaTitle'),
      subtitle: t('metaDescription'),
    }),
    {...size}
  );
}
