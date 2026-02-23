'use client';

import {useTranslations} from 'next-intl';
import {Linkedin, LinkIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({url}: ShareButtonsProps) {
  const t = useTranslations('BlogPage');

  function copyLink() {
    navigator.clipboard.writeText(url);
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t('share')}:</span>
      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyLink} aria-label={t('copyLink')}>
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
