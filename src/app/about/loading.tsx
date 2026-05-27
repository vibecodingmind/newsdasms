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
            <div className="h-12 w-64 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mb-4" />
            <div className="h-6 w-80 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* About content skeleton */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-4">
                <div className="h-10 w-72 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
                <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
              </div>
              <div className="flex-1 h-64 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
        {/* Stats / values skeleton */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Footer skeleton */}
      <div className="h-64 bg-gray-100 dark:bg-white/5 animate-pulse" />
    </div>
  )
}
