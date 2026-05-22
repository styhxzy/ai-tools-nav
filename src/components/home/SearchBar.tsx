'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  size?: 'default' | 'lg';
  className?: string;
}

export function SearchBar({ size = 'default', className }: SearchBarProps) {
  const [value, setValue] = useState('');
  const router = useRouter();

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [value, router]
  );

  const isLg = size === 'lg';

  return (
    <form onSubmit={onSubmit} className={cn('w-full', isLg ? 'max-w-2xl' : 'max-w-lg', 'mx-auto', className)}>
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

        <div className="relative flex items-center glass rounded-2xl border-white/30 overflow-hidden">
          <Search className={cn('text-gray-400 shrink-0', isLg ? 'w-5 h-5 ml-5' : 'w-4 h-4 ml-4')} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="搜索AI工具或文章..."
            className={cn(
              'flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none',
              isLg ? 'py-4 px-4 text-base' : 'py-3 px-3 text-sm'
            )}
          />
          <button
            type="submit"
            className={cn(
              'font-medium text-white gradient-bg hover:opacity-90 transition-opacity shrink-0',
              isLg ? 'px-6 py-4 mr-1.5 rounded-xl text-sm' : 'px-4 py-2 mr-1.5 rounded-lg text-xs'
            )}
          >
            搜索
          </button>
        </div>
      </div>
    </form>
  );
}
