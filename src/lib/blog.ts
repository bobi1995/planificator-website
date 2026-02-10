import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published?: boolean;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string; // raw MDX content (without frontmatter)
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

/**
 * Estimated reading time in minutes (average 200 words/min).
 */
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Returns all published posts for a locale, sorted by date descending.
 */
export const getAllPosts = cache(async (locale: string): Promise<BlogPost[]> => {
  const dir = path.join(CONTENT_DIR, locale);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return []; // locale directory doesn't exist yet
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), 'utf-8');
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ''),
          meta: data as BlogPostMeta,
          content,
        };
      })
  );

  return posts
    .filter((p) => p.meta.published !== false)
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
});

/**
 * Returns a single post by slug, or null if not found.
 */
export const getPostBySlug = cache(
  async (locale: string, slug: string): Promise<BlogPost | null> => {
    const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const meta = data as BlogPostMeta;
      if (meta.published === false) return null;
      return { slug, meta, content };
    } catch {
      return null;
    }
  }
);

/**
 * Returns posts filtered by tag for a locale.
 */
export const getPostsByTag = cache(
  async (locale: string, tag: string): Promise<BlogPost[]> => {
    const posts = await getAllPosts(locale);
    return posts.filter((p) =>
      p.meta.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }
);

/**
 * Returns all unique tags across all posts for a locale.
 */
export const getAllTags = cache(async (locale: string): Promise<string[]> => {
  const posts = await getAllPosts(locale);
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.meta.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
});

/**
 * Returns all valid slugs for a locale (for generateStaticParams).
 */
export const getPostSlugs = cache(async (locale: string): Promise<string[]> => {
  const posts = await getAllPosts(locale);
  return posts.map((p) => p.slug);
});
