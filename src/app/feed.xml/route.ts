import {Feed} from 'feed';
import {getAllPosts} from '@/lib/blog';

const SITE_URL = 'https://planifactor.com';

export async function GET() {
  const feed = new Feed({
    title: 'Planifactor Blog',
    description: 'Production scheduling insights for manufacturers',
    id: SITE_URL,
    link: `${SITE_URL}/en/blog`,
    language: 'en',
    copyright: `${new Date().getFullYear()} Planifactor`,
    feedLinks: {
      rss2: `${SITE_URL}/feed.xml`,
    },
  });

  const posts = await getAllPosts('en');

  for (const post of posts) {
    feed.addItem({
      title: post.meta.title,
      id: `${SITE_URL}/en/blog/${post.slug}`,
      link: `${SITE_URL}/en/blog/${post.slug}`,
      description: post.meta.description,
      date: new Date(post.meta.date),
      author: [{name: post.meta.author}],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
