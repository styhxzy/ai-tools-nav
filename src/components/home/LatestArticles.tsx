import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { GlassCard } from '@/components/shared/GlassCard';
import { Badge } from '@/components/shared/Badge';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface LatestArticlesProps {
  posts: BlogPost[];
}

export function LatestArticles({ posts }: LatestArticlesProps) {
  return (
    <section className="section-container py-16 sm:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            最新文章
          </h2>
          <p className="text-gray-500">AI工具使用教程与评测</p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          全部文章
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <GlassCard key={post.slug} href={`/blog/${post.slug}`}>
            {/* Cover image placeholder */}
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 mb-4 flex items-center justify-center overflow-hidden">
              <span className="text-3xl">📝</span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              {post.frontmatter.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} size="sm" variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.frontmatter.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {post.frontmatter.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.frontmatter.readingTime} 分钟阅读
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      <Link
        href="/blog"
        className="md:hidden flex items-center justify-center gap-1.5 mt-6 text-sm font-medium text-blue-600"
      >
        全部文章
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
