import {setRequestLocale, getTranslations} from 'next-intl/server';
import {getAllPosts, getAllTags, getPostsByTag} from '@/lib/blog';
import {BlogHero} from '@/components/sections/blog/BlogHero';
import {PostCard} from '@/components/sections/blog/PostCard';
import {TagFilter} from '@/components/sections/blog/TagFilter';
import {BlogPagination} from '@/components/sections/blog/BlogPagination';
import {CTABanner} from '@/components/sections/CTABanner';

const POSTS_PER_PAGE = 9;

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{tag?: string; page?: string}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'BlogPage'});
  return {
    title: `${t('metaTitle')} | Planifactor`,
    description: t('metaDescription'),
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
          <TagFilter
            tags={allTags}
            activeTag={tag || null}
            allLabel={t('allPosts')}
            filterLabel={t('filterByTag')}
          />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body-lg text-muted-foreground">
                {tag ? t('noPostsForTag') : t('noPosts')}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
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

              <BlogPagination
                currentPage={safePage}
                totalPages={totalPages}
                previousLabel={t('previousPage')}
                nextLabel={t('nextPage')}
                pageOfLabel={t('pageOf', {current: safePage, total: totalPages})}
              />
            </>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
