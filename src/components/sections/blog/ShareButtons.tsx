'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Linkedin, LinkIcon, Check} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({url}: ShareButtonsProps) {
  const t = useTranslations('BlogPage');
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={copyLink}
        aria-label={t('copyLink')}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
