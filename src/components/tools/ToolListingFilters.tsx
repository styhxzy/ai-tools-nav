'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SORT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ToolListingFiltersProps {
  categorySlug?: string;
}

export function ToolListingFilters({ categorySlug }: ToolListingFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'weight';
  const currentPricing = searchParams.get('pricing') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">排序:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam('sort', opt.value)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                currentSort === opt.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">价格:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { label: '全部', value: '' },
            { label: '免费', value: 'free' },
            { label: '免费增值', value: 'freemium' },
            { label: '付费', value: 'paid' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam('pricing', opt.value)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                currentPricing === opt.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
