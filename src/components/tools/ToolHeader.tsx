import { Tool } from '@/types/tool';
import { Rating } from '@/components/shared/Rating';
import { Badge } from '@/components/shared/Badge';
import { ExternalLinkButton } from './ExternalLinkButton';
import { CATEGORY_NAMES, PRICING_LABELS, PRICING_COLORS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { Calendar, Globe } from 'lucide-react';

interface ToolHeaderProps {
  tool: Tool;
}

export function ToolHeader({ tool }: ToolHeaderProps) {
  return (
    <div className="glass-card p-6 sm:p-8 mb-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
          <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {tool.name.slice(0, 2)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {tool.name}
            </h1>
            <Badge variant="outline" size="md">
              {CATEGORY_NAMES[tool.category]}
            </Badge>
            <Badge
              size="md"
              variant={tool.pricing === 'free' ? 'success' : tool.pricing === 'paid' ? 'warning' : 'primary'}
            >
              {PRICING_LABELS[tool.pricing]}
            </Badge>
          </div>

          <p className="text-gray-600 mb-3">{tool.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Rating value={tool.rating} reviewCount={tool.reviewCount} size="md" />
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              更新于 {formatDate(tool.updatedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                访问官网
              </a>
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="sm:self-start">
          <ExternalLinkButton href={tool.websiteUrl} />
        </div>
      </div>
    </div>
  );
}
