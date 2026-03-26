import {Link} from '@/i18n/navigation';
import {Factory, Scissors, CalendarRange} from 'lucide-react';
import {ImagePlaceholder} from '@/components/ui/ImagePlaceholder';

const slugIcons: Record<string, React.ComponentType<{className?: string}>> = {
  'discrete-manufacturing': Factory,
  'job-shops': Scissors,
  'production-planning': CalendarRange,
};

const slugImages: Record<string, string> = {
  'discrete-manufacturing': '/images/use-cases/density.png',
  'job-shops': '/images/use-cases/changeovers.png',
  'production-planning': '/images/use-cases/playground.png',
};

interface UseCaseCardProps {
  slug: string;
  title: string;
  description: string;
  cta: string;
}

export function UseCaseCard({slug, title, description, cta}: UseCaseCardProps) {
  const Icon = slugIcons[slug] || Factory;
  const imageSrc = slugImages[slug];

  return (
    <Link href={`/use-cases/${slug}`} className="group">
      <div className="rounded-lg border bg-card overflow-hidden transition-colors hover:bg-accent h-full flex flex-col">
        {/* Use case image */}
        {imageSrc && (
          <ImagePlaceholder
            src={imageSrc}
            alt={title}
            width={800}
            height={500}
            className="rounded-none"
          />
        )}
        <div className="p-8 flex flex-col flex-1">
          <Icon className="h-12 w-12 text-brand-600 mb-4" />
          <h3 className="text-subheading mb-3">{title}</h3>
          <p className="text-muted-foreground mb-6 flex-1">{description}</p>
          <span className="text-brand-600 font-semibold group-hover:underline">
            {cta} &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
