import { Skeleton, CardSkeleton } from '@/components/shared/Skeleton';

export default function HomeLoading() {
  return (
    <div className="animate-fade-in">
      {/* Hero skeleton */}
      <div className="section-container py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="w-48 h-8 rounded-full mx-auto mb-8" />
          <Skeleton className="h-14 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-14 w-1/2 mx-auto mb-8" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-10" />
          <Skeleton className="h-14 w-full max-w-2xl mx-auto rounded-2xl" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="section-container py-8">
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>

      {/* Category skeleton */}
      <div className="section-container py-16">
        <Skeleton className="h-8 w-48 mx-auto mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Tool cards skeleton */}
      <div className="section-container py-16">
        <Skeleton className="h-8 w-40 mb-3" />
        <Skeleton className="h-5 w-64 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
