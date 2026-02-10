import {ImageResponse} from 'next/og';
import {getPostBySlug} from '@/lib/blog';
import {createOgImageElement, OG_SIZE, OG_CONTENT_TYPE} from '@/lib/og-image';

export const alt = 'Planifactor Blog';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const post = await getPostBySlug(locale, slug);

  const title = post?.meta.title ?? 'Planifactor Blog';
  const subtitle = post?.meta.description;

  return new ImageResponse(
    createOgImageElement({title, subtitle}),
    {...size}
  );
}
