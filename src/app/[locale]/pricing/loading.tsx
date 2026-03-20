export default function PricingLoading() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Hero skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 max-w-full bg-muted animate-pulse rounded mx-auto" />
      </div>

      {/* Pricing cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i} className="p-8 rounded-lg border bg-card">
            <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded mb-6" />
            <div className="space-y-3">
              {Array.from({length: 5}).map((_, j) => (
                <div key={j} className="h-4 w-full bg-muted animate-pulse rounded" />
              ))}
            </div>
            <div className="h-10 w-full bg-muted animate-pulse rounded-md mt-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
