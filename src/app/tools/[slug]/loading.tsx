import { Skeleton } from '@/components/shared/Skeleton';

export default function ToolLoading() {
  return (
    <div className="section-container py-8">
      <Skeleton className="h-6 w-48 mb-8" />
      <Skeleton className="h-48 rounded-2xl mb-8" />
      <div className="max-w-4xl">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}
