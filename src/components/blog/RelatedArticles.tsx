import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { GlassCard } from '@/components/shared/GlassCard';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">相关文章</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <GlassCard key={post.slug} href={`/blog/${post.slug}`}>
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
              {post.frontmatter.title}
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {post.frontmatter.description}
            </p>
            <span className="text-xs text-gray-400">
              {formatDate(post.frontmatter.date)}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
