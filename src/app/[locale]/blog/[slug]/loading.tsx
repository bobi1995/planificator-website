const LINE_WIDTHS = ['w-full', 'w-11/12', 'w-full', 'w-10/12', 'w-full', 'w-11/12', 'w-9/12', 'w-full', 'w-10/12', 'w-full', 'w-11/12', 'w-8/12'];

export default function BlogPostLoading() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      {/* Back link */}
      <div className="h-5 w-24 bg-muted animate-pulse rounded mb-8" />

      {/* Title */}
      <div className="h-10 w-full bg-muted animate-pulse rounded-lg mb-4" />
      <div className="h-10 w-2/3 bg-muted animate-pulse rounded-lg mb-6" />

      {/* Meta */}
      <div className="flex gap-4 mb-8">
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
      </div>

      {/* Content lines */}
      <div className="space-y-4">
        {LINE_WIDTHS.map((width, i) => (
          <div
            key={i}
            className={`h-4 bg-muted animate-pulse rounded ${width}`}
          />
        ))}
      </div>
    </article>
  );
}
