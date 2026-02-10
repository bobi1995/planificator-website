'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  pageOfLabel: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  previousLabel,
  nextLabel,
  pageOfLabel,
}: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    router.push(`?${params.toString()}`, {scroll: false});
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        {previousLabel}
      </Button>

      <span className="text-sm text-muted-foreground">
        {pageOfLabel}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="gap-1"
      >
        {nextLabel}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
