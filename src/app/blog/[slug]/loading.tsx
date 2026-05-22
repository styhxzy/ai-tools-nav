import { Skeleton } from '@/components/shared/Skeleton';

export default function BlogPostLoading() {
  return (
    <div className="section-container py-8">
      <Skeleton className="h-6 w-48 mb-8" />
      <Skeleton className="aspect-video max-w-3xl rounded-2xl mb-8" />
      <Skeleton className="h-10 w-3/4 max-w-3xl mb-4" />
      <Skeleton className="h-5 w-64 mb-8" />
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
