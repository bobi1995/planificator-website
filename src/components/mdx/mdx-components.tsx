import type { MDXComponents } from 'mdx/types';
import { Callout } from './Callout';

export const mdxComponents: MDXComponents = {
  // Custom components available in MDX files
  Callout,

  // Override heading elements for brand typography + slug anchors
  h1: ({ children, id, ...props }) => (
    <h1 id={id} className="text-display mb-6 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-heading mt-12 mb-4 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="text-subheading mt-8 mb-3 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
};
