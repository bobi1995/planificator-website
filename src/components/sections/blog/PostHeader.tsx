import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {Link} from '@/i18n/navigation';
import {ArrowLeft} from 'lucide-react';
import type {BlogPostMeta} from '@/lib/blog';
import {getReadingTime} from '@/lib/blog';
import {useLocale} from 'next-intl';

interface PostHeaderProps {
  meta: BlogPostMeta;
  content: string;
  backLabel: string;
  publishedLabel: string;
  byLabel: string;
  minReadLabel: string;
}

export function PostHeader({meta, content, backLabel, publishedLabel, byLabel, minReadLabel}: PostHeaderProps) {
  const locale = useLocale();
  const readingTime = getReadingTime(content);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(meta.date));

  return (
    <header className="mb-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <h1 className="text-display md:text-hero mb-4">
        {meta.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
        <span>{byLabel} {meta.author}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={meta.date}>{publishedLabel} {formattedDate}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime} {minReadLabel}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {meta.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <Separator />
    </header>
  );
}
