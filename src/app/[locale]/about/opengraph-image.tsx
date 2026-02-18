import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {createOgImageElement, OG_SIZE, OG_CONTENT_TYPE} from '@/lib/og-image';

export const alt = 'Planificator';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'AboutPage'});

  return new ImageResponse(
    createOgImageElement({
      title: t('metaTitle'),
      subtitle: t('metaDescription'),
    }),
    {...size}
  );
}
