'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  allLabel: string;
  filterLabel: string;
}

export function TagFilter({tags, activeTag, allLabel, filterLabel}: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTagClick(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    // Reset to page 1 when changing tag filter
    params.delete('page');
    router.push(`?${params.toString()}`, {scroll: false});
  }

  return (
    <div className="mb-8" role="navigation" aria-label={filterLabel}>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => handleTagClick(null)}>
          <Badge
            variant={activeTag === null ? 'default' : 'secondary'}
            className={cn(
              'cursor-pointer text-sm px-3 py-1',
              activeTag === null && 'bg-brand-600 text-white hover:bg-brand-700'
            )}
          >
            {allLabel}
          </Badge>
        </button>
        {tags.map((tag) => (
          <button key={tag} onClick={() => handleTagClick(tag)}>
            <Badge
              variant={activeTag === tag ? 'default' : 'secondary'}
              className={cn(
                'cursor-pointer text-sm px-3 py-1',
                activeTag === tag && 'bg-brand-600 text-white hover:bg-brand-700'
              )}
            >
              {tag}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
