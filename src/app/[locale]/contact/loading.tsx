export default function ContactLoading() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Hero skeleton */}
      <div className="text-center mb-12">
        <div className="h-12 w-72 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 max-w-full bg-muted animate-pulse rounded mx-auto" />
      </div>

      {/* Two-column layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="space-y-4">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="h-12 w-full bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
        <div className="h-[500px] bg-muted animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
