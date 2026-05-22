import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Tool } from '@/types/tool';
import { Rating } from '@/components/shared/Rating';
import { Badge } from '@/components/shared/Badge';
import { CATEGORY_NAMES, PRICING_LABELS } from '@/lib/constants';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="glass-card p-5 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {tool.name.slice(0, 2)}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {tool.name}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{tool.tagline}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <Rating value={tool.rating} reviewCount={tool.reviewCount} />
        <div className="flex items-center gap-1.5">
          <Badge size="sm" variant="outline">
            {CATEGORY_NAMES[tool.category]}
          </Badge>
          <Badge
            size="sm"
            variant={tool.pricing === 'free' ? 'success' : 'primary'}
          >
            {PRICING_LABELS[tool.pricing]}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
