'use client';

import {cn} from '@/lib/utils';

interface FeatureNavProps {
  domains: {id: string; title: string}[];
}

export function FeatureNav({domains}: FeatureNavProps) {
  return (
    <nav
      className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
      aria-label="Feature sections"
    >
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <div className="flex gap-1 py-2 min-w-max">
          {domains.map((domain) => (
            <a
              key={domain.id}
              href={`#${domain.id}`}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {domain.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
