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
            <div className="h-6 w-96 max-w-full bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
        {/* Contact info cards skeleton */}
        <div className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        {/* Form skeleton */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3 space-y-5">
                <div className="h-8 w-56 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="h-12 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-12 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
                </div>
                <div className="h-12 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
                <div className="h-32 bg-gray-200 dark:bg-white/5 rounded-xl animate-pulse" />
                <div className="h-14 w-44 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="h-48 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
                <div className="h-64 bg-gray-200 dark:bg-white/5 rounded-2xl animate-pulse" />
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
