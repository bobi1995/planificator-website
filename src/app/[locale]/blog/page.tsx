import type {Metadata} from 'next';
import {Suspense} from 'react';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {getAllPosts, getAllTags, getPostsByTag} from '@/lib/blog';
import {BlogHero} from '@/components/sections/blog/BlogHero';
import {FeaturedPostCard} from '@/components/sections/blog/FeaturedPostCard';
import {PostCard} from '@/components/sections/blog/PostCard';
import {TagFilter} from '@/components/sections/blog/TagFilter';
import {BlogPagination} from '@/components/sections/blog/BlogPagination';
import {CTABanner} from '@/components/sections/CTABanner';
import {buildAlternates} from '@/lib/metadata';
import {SITE_URL} from '@/lib/constants';

const POSTS_PER_PAGE = 9;

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{tag?: string; page?: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'BlogPage'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/blog'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${SITE_URL}/${locale}/blog`,
      type: 'website',
    },
  };
}

export default async function BlogPage({params, searchParams}: Props) {
  const {locale} = await params;
  const {tag, page} = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'BlogPage'});
  const allTags = await getAllTags(locale);
  const allFilteredPosts = tag
    ? await getPostsByTag(locale, tag)
    : await getAllPosts(locale);

  // Pagination
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allFilteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const posts = allFilteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <BlogHero />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="flex gap-2 mb-8">{Array.from({length: 4}).map((_, i) => <div key={i} className="h-8 w-20 bg-muted animate-pulse rounded-full" />)}</div>}>
            <TagFilter
              tags={allTags}
              activeTag={tag || null}
              allLabel={t('allPosts')}
              filterLabel={t('filterByTag')}
            />
          </Suspense>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body-lg text-muted-foreground">
                {tag ? t('noPostsForTag') : t('noPosts')}
              </p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {posts.length > 0 && (
                <div className="mb-12">
                  <FeaturedPostCard
                    slug={posts[0].slug}
                    meta={posts[0].meta}
                    content={posts[0].content}
                    readMoreLabel={t('readMore')}
                    minReadLabel={t('minRead')}
                  />
                </div>
              )}

              {/* Remaining posts */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <PostCard
                      key={post.slug}
                      slug={post.slug}
                      meta={post.meta}
                      content={post.content}
                      readMoreLabel={t('readMore')}
                      minReadLabel={t('minRead')}
                    />
                  ))}
                </div>
              )}

              <Suspense>
                <BlogPagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  previousLabel={t('previousPage')}
                  nextLabel={t('nextPage')}
                  pageOfLabel={t('pageOf', {current: safePage, total: totalPages})}
                />
              </Suspense>
            </>
          )}
        </div>
      </section>

      <CTABanner headingKey="blogHeading" descriptionKey="blogDescription" ctaKey="blogCta" />
    </>
  );
}
