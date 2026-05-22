'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchResult, SearchResults } from '@/types/search';

interface SearchCommandProps {
  open: boolean;
  onClose: () => void;
}

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const performSearch = useCallback(async (q: string) => {
    if (q.length < 1) {
      setResults([]);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data: SearchResults = await res.json();
    setResults(data.results);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    } else {
      setTimeout(() => {
        const input = document.getElementById('search-command-input');
        input?.focus();
      }, 50);
    }
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        const r = results[selectedIndex];
        const url = r.type === 'tool' ? `/tools/${r.slug}` : `/blog/${r.slug}`;
        onClose();
        router.push(url);
      } else if (query.trim()) {
        onClose();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[61] flex items-start justify-center pt-[15vh]">
        <div
          className="w-full max-w-lg glass rounded-2xl border-white/20 shadow-2xl overflow-hidden animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              id="search-command-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="搜索工具或文章..."
              className="flex-1 py-4 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {loading && (
              <div className="py-8 text-center text-sm text-gray-400">
                搜索中...
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="py-8 text-center text-sm text-gray-400">
                未找到结果，试试其他关键词
              </div>
            )}

            {!loading && !query && (
              <div className="py-8 text-center text-sm text-gray-400">
                输入关键词搜索工具和文章
              </div>
            )}

            {results.map((result, i) => (
              <button
                key={`${result.type}-${result.slug}`}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                  i === selectedIndex
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50'
                )}
                onClick={() => {
                  onClose();
                  const url = result.type === 'tool' ? `/tools/${result.slug}` : `/blog/${result.slug}`;
                  router.push(url);
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">
                      {result.type === 'tool' ? result.name : result.title}
                    </span>
                    <span className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded font-medium',
                      result.type === 'tool'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    )}>
                      {result.type === 'tool' ? '工具' : '文章'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {result.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>↑↓ 导航  ·  Enter 打开  ·  Esc 关闭</span>
            <span>直接输入关键词搜索</span>
          </div>
        </div>
      </div>
    </>
  );
}
