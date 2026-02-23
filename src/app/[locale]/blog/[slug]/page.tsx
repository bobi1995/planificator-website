import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import {getPostBySlug, getPostSlugs, getAllPosts} from '@/lib/blog';
import {PostHeader} from '@/components/sections/blog/PostHeader';
import {PostCard} from '@/components/sections/blog/PostCard';
import {ShareButtons} from '@/components/sections/blog/ShareButtons';
import {CTABanner} from '@/components/sections/CTABanner';
import {mdxComponents} from '@/components/mdx/mdx-components';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';
import {ArticleJsonLd} from '@/lib/structured-data';

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

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      tags: post.meta.tags,
    },
  };
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({locale, namespace: 'BlogPage'});

  const allPosts = await getAllPosts(locale);
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.meta.tags.some((tag) => post.meta.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={post.meta.title}
        description={post.meta.description}
        datePublished={post.meta.date}
        dateModified={post.meta.date}
        author={post.meta.author}
        url={`${SITE_URL}/${locale}/blog/${slug}`}
      />
      <article className="max-w-3xl mx-auto py-16 px-4">
        <PostHeader
          meta={post.meta}
          content={post.content}
          backLabel={t('backToBlog')}
          publishedLabel={t('publishedOn')}
          byLabel={t('writtenBy')}
          minReadLabel={t('minRead')}
        />

        <div className="flex justify-end mb-6">
          <ShareButtons url={`${SITE_URL}/${locale}/blog/${slug}`} title={post.meta.title} />
        </div>

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

      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-heading text-center mb-8">{t('relatedPosts')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <PostCard
                  key={relPost.slug}
                  slug={relPost.slug}
                  meta={relPost.meta}
                  content={relPost.content}
                  readMoreLabel={t('readMore')}
                  minReadLabel={t('minRead')}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner headingKey="blogHeading" descriptionKey="blogDescription" ctaKey="blogCta" />
    </>
  );
}

export const dynamicParams = false;
