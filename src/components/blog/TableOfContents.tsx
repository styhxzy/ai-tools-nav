'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TocHeading } from '@/types/blog';

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">目录</h4>
      {headings.map((heading) => (
        <a
          key={heading.slug}
          href={`#${heading.slug}`}
          className={cn(
            'block text-sm py-1.5 transition-colors border-l-2',
            heading.level === 2 ? 'pl-3' : 'pl-6',
            activeId === heading.slug
              ? 'text-blue-600 border-blue-600 font-medium'
              : 'text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-200'
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
