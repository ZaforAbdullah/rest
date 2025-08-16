import React from 'react'

const SkeletonCard: React.FC = () => {
  return (
    <div
      data-testid="skeleton-card"
      className="animate-pulse rounded-xl border p-0 overflow-hidden shadow-sm bg-card text-card-foreground"
    >
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700" />
      <div className="px-4 pt-4 pb-6 space-y-2">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/4" />
      </div>
    </div>
  )
}

export default SkeletonCard
