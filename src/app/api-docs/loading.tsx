export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="h-20 bg-gray-100 dark:bg-white/5 animate-pulse" />
      <main className="flex-1">
        {/* Hero skeleton */}
        <div className="py-28 sm:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse mb-6" />
            <div className="h-12 w-80 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mb-4" />
            <div className="h-6 w-64 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* API docs content skeleton - sidebar + main */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar skeleton */}
              <div className="lg:w-64 shrink-0 space-y-3">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 dark:bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
              {/* Main content skeleton */}
              <div className="flex-1 space-y-6">
                <div className="h-8 w-56 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
                <div className="h-40 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-32 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer skeleton */}
      <div className="h-64 bg-gray-100 dark:bg-white/5 animate-pulse" />
    </div>
  )
}
