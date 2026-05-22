import { Skeleton } from '@/components/shared/Skeleton';

export default function BlogLoading() {
  return (
    <div className="section-container py-8">
      <Skeleton className="h-6 w-32 mb-8" />
      <Skeleton className="h-10 w-48 mb-3" />
      <Skeleton className="h-5 w-80 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5">
            <Skeleton className="aspect-video rounded-xl mb-4" />
            <Skeleton className="h-5 w-20 rounded-full mb-3" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
