import {Link} from '@/i18n/navigation';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {getReadingTime} from '@/lib/blog';
import type {BlogPostMeta} from '@/lib/blog';
import {useLocale} from 'next-intl';

interface PostCardProps {
  slug: string;
  meta: BlogPostMeta;
  content: string;
  readMoreLabel: string;
  minReadLabel: string;
}

export function PostCard({slug, meta, content, readMoreLabel, minReadLabel}: PostCardProps) {
  const locale = useLocale();
  const readingTime = getReadingTime(content);

  // Format date using locale-aware Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(meta.date));

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <time dateTime={meta.date}>{formattedDate}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{readingTime} {minReadLabel}</span>
        </div>
        <Link href={`/blog/${slug}`} className="group">
          <h2 className="text-subheading group-hover:text-brand-600 transition-colors">
            {meta.title}
          </h2>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <p className="text-muted-foreground mb-4 flex-1">
          {meta.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          {readMoreLabel} &rarr;
        </Link>
      </CardContent>
    </Card>
  );
}
