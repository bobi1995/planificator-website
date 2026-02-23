import {Link} from '@/i18n/navigation';
import {Badge} from '@/components/ui/badge';
import {getReadingTime} from '@/lib/blog';
import type {BlogPostMeta} from '@/lib/blog';
import {useLocale} from 'next-intl';

interface FeaturedPostCardProps {
  slug: string;
  meta: BlogPostMeta;
  content: string;
  readMoreLabel: string;
  minReadLabel: string;
}

export function FeaturedPostCard({slug, meta, content, readMoreLabel, minReadLabel}: FeaturedPostCardProps) {
  const locale = useLocale();
  const readingTime = getReadingTime(content);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(meta.date));

  return (
    <div className="rounded-lg border bg-card p-8 hover:shadow-lg transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <time dateTime={meta.date}>{formattedDate}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{readingTime} {minReadLabel}</span>
          </div>
          <Link href={`/blog/${slug}`} className="group">
            <h2 className="text-heading md:text-display group-hover:text-brand-600 transition-colors mb-4">
              {meta.title}
            </h2>
          </Link>
          <p className="text-body-lg text-muted-foreground mb-4">
            {meta.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {meta.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <Link
            href={`/blog/${slug}`}
            className="text-brand-600 font-medium hover:text-brand-700 transition-colors"
          >
            {readMoreLabel} &rarr;
          </Link>
        </div>
        <div className="hidden lg:block rounded-lg bg-muted/30 aspect-video" />
      </div>
    </div>
  );
}
