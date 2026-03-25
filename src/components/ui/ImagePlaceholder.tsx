'use client';

import Image from 'next/image';
import {useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import {X} from 'lucide-react';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * Image with graceful fallback to a styled gray box.
 * Clicking the image opens it in a styled lightbox dialog.
 */
export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: ImagePlaceholderProps) {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => !error && setOpen(true)}
        className={`relative ${error ? 'bg-muted' : ''} rounded-lg overflow-hidden ${className} ${!error ? 'cursor-pointer' : ''}`}
        style={{aspectRatio: `${width}/${height}`}}
      >
        {!error && (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-full object-contain"
            priority={priority}
            onError={() => setError(true)}
          />
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="!max-w-[95vw] sm:!max-w-[95vw] max-h-[95vh] w-fit p-0 border shadow-2xl overflow-hidden"
          showCloseButton={false}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b bg-background">
            <DialogTitle className="text-base font-semibold">{alt}</DialogTitle>
            <DialogClose className="rounded-sm p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <div className="overflow-auto bg-background p-2">
            <Image
              src={src}
              alt={alt}
              width={width * 3}
              height={height * 3}
              className="max-h-[85vh] w-auto h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
