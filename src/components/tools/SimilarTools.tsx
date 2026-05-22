import { Tool } from '@/types/tool';
import { ToolCard } from './ToolCard';

interface SimilarToolsProps {
  tools: Tool[];
}

export function SimilarTools({ tools }: SimilarToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">相似工具推荐</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
