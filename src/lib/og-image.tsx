import type {ReactElement} from 'react';

export const OG_SIZE = {width: 1200, height: 630};
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Creates a JSX element for use with Next.js ImageResponse.
 *
 * Uses only flexbox layout (satori requirement).
 * No CSS grid, no text gradients.
 */
export function createOgImageElement({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        padding: '60px 80px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
        color: '#ffffff',
      }}
    >
      {/* Brand name - top left */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 60,
          left: 80,
          fontSize: 28,
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        Planifactor
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1.15,
          maxWidth: '900px',
        }}
      >
        {title}
      </div>

      {/* Optional subtitle */}
      {subtitle ? (
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 400,
            opacity: 0.85,
            marginTop: 16,
            maxWidth: '800px',
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
