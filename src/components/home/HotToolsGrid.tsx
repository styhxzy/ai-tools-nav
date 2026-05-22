import Link from 'next/link';
import { Tool } from '@/types/tool';
import { HotToolCard } from './HotToolCard';
import { ArrowRight } from 'lucide-react';

interface HotToolsGridProps {
  tools: Tool[];
}

export function HotToolsGrid({ tools }: HotToolsGridProps) {
  return (
    <section className="section-container py-16 sm:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            热门AI工具
          </h2>
          <p className="text-gray-500">大学生最常用的AI效率工具</p>
        </div>
        <Link
          href="/search"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          查看全部
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <HotToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      <Link
        href="/search"
        className="sm:hidden flex items-center justify-center gap-1.5 mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        查看全部工具
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
