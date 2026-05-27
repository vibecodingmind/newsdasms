export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="h-20 bg-gray-100 dark:bg-white/5 animate-pulse" />
      <main className="flex-1">
        {/* Hero skeleton */}
        <div className="py-28 sm:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-6 w-32 mx-auto bg-gray-200 dark:bg-white/10 rounded-full animate-pulse mb-6" />
            <div className="h-12 w-72 mx-auto max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* Wide pricing cards skeleton */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
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
