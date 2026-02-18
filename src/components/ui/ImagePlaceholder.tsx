'use client';

import Image from 'next/image';
import {useState} from 'react';

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
 *
 * Drop your image file into `public/images/...` at the path
 * specified by `src` and it will render automatically.
 * Until then, a rounded gray placeholder is shown.
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

  return (
    <div
      className={`bg-muted rounded-lg overflow-hidden ${className}`}
      style={{aspectRatio: `${width}/${height}`}}
    >
      {!error && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
