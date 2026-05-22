import Link from 'next/link';
import { GlassCard } from '@/components/shared/GlassCard';
import { Category } from '@/types/category';
import {
  PenLine,
  Presentation,
  Code2,
  Languages,
  Palette,
  Zap,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  PenLine,
  Presentation,
  Code2,
  Languages,
  Palette,
  Zap,
};

interface CategoryCardsProps {
  categories: Category[];
}

export function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section className="section-container py-16 sm:py-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          探索工具分类
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          按需浏览，找到你需要的AI工具类型
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Zap;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="glass-card p-5 text-center group cursor-pointer"
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400">{cat.toolCount} 款工具</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
