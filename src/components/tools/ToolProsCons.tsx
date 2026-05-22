import { ToolProsCons as ToolProsConsType } from '@/types/tool';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ToolProsConsProps {
  prosCons: ToolProsConsType;
}

export function ToolProsCons({ prosCons }: ToolProsConsProps) {
  return (
    <div className="mb-10" id="pros-cons">
      <h2 className="text-xl font-bold text-gray-900 mb-6">优缺点分析</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="glass-card p-6 border-l-4 border-l-green-400">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-700">优点</h3>
          </div>
          <ul className="space-y-2.5">
            {prosCons.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="glass-card p-6 border-l-4 border-l-red-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <ThumbsDown className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-semibold text-red-600">缺点</h3>
          </div>
          <ul className="space-y-2.5">
            {prosCons.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-300 shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
