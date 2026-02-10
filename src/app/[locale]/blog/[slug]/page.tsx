import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import {getPostBySlug, getPostSlugs} from '@/lib/blog';
import {PostHeader} from '@/components/sections/blog/PostHeader';
import {CTABanner} from '@/components/sections/CTABanner';
import {mdxComponents} from '@/components/mdx/mdx-components';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  // Return slugs only -- parent [locale] handles locale enumeration
  // Gather unique slugs across all locales
  const locales = ['en', 'bg'];
  const slugSet = new Set<string>();
  for (const locale of locales) {
    const slugs = await getPostSlugs(locale);
    for (const slug of slugs) {
      slugSet.add(slug);
    }
  }
  return Array.from(slugSet).map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props) {
  const {locale, slug} = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Planifactor`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({locale, namespace: 'BlogPage'});

  return (
    <>
      <article className="max-w-3xl mx-auto py-16 px-4">
        <PostHeader
          meta={post.meta}
          content={post.content}
          backLabel={t('backToBlog')}
          publishedLabel={t('publishedOn')}
          byLabel={t('writtenBy')}
          minReadLabel={t('minRead')}
        />

        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypePrettyCode, {theme: 'github-dark', keepBackground: true}],
                ],
              },
            }}
          />
        </div>
      </article>

      <CTABanner />
    </>
  );
}

export const dynamicParams = false;
