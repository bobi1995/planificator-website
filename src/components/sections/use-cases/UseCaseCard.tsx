import {Link} from '@/i18n/navigation';
import {Factory, Scissors, CalendarRange} from 'lucide-react';

const slugIcons: Record<string, React.ComponentType<{className?: string}>> = {
  'discrete-manufacturing': Factory,
  'job-shops': Scissors,
  'production-planning': CalendarRange,
};

interface UseCaseCardProps {
  slug: string;
  title: string;
  description: string;
  cta: string;
}

export function UseCaseCard({slug, title, description, cta}: UseCaseCardProps) {
  const Icon = slugIcons[slug] || Factory;

  return (
    <Link href={`/use-cases/${slug}`} className="group">
      <div className="rounded-lg border bg-card p-8 transition-colors hover:bg-accent h-full flex flex-col">
        <Icon className="h-12 w-12 text-brand-600 mb-4" />
        <h3 className="text-subheading mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-1">{description}</p>
        <span className="text-brand-600 font-semibold group-hover:underline">
          {cta} &rarr;
        </span>
      </div>
    </Link>
  );
}
