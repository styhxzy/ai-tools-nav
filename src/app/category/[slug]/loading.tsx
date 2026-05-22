import { CardSkeleton } from '@/components/shared/Skeleton';

export default function CategoryLoading() {
  return (
    <div className="section-container py-8">
      <div className="h-6 w-48 bg-gray-100 rounded animate-pulse mb-8" />
      <div className="h-32 bg-gray-100 rounded-2xl animate-pulse mb-8" />
      <div className="flex gap-4 mb-8">
        <div className="h-10 w-64 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-10 w-48 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
