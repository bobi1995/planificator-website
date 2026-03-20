export default function FeaturesLoading() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Hero skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 w-80 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
        <div className="h-5 w-[28rem] max-w-full bg-muted animate-pulse rounded mx-auto" />
      </div>

      {/* Feature sections skeleton */}
      {Array.from({length: 3}).map((_, i) => (
        <div key={i} className="mb-16">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, j) => (
              <div key={j} className="p-6 rounded-lg border bg-card">
                <div className="h-10 w-10 bg-muted animate-pulse rounded mb-4" />
                <div className="h-5 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
