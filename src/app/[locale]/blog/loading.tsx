export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Hero skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 max-w-full bg-muted animate-pulse rounded mx-auto" />
      </div>

      {/* Tag filter skeleton */}
      <div className="flex gap-2 mb-8">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="h-8 w-20 bg-muted animate-pulse rounded-full" />
        ))}
      </div>

      {/* Featured post skeleton */}
      <div className="h-64 bg-muted animate-pulse rounded-lg mb-12" />

      {/* Post grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
