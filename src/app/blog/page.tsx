import { Metadata } from 'next';
import Link from 'next/link';
import { loadAllPosts } from '@/lib/blog';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { GlassCard } from '@/components/shared/GlassCard';
import { Badge } from '@/components/shared/Badge';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `博客 - AI工具教程与评测 | ${SITE.name}`,
  description: 'AI工具使用教程、深度评测和效率提升指南，帮助大学生更好地使用AI工具。',
  alternates: { canonical: `${SITE.url}/blog` },
};

export default async function BlogPage() {
  const posts = loadAllPosts();

  return (
    <div className="section-container py-8">
      <Breadcrumb items={[{ label: '博客' }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">博客文章</h1>
        <p className="text-gray-500">AI工具使用教程、深度评测与效率提升指南</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <GlassCard key={post.slug} href={`/blog/${post.slug}`}>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 mb-4 flex items-center justify-center text-3xl">
              📝
            </div>
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              {post.frontmatter.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} size="sm" variant="primary">{tag}</Badge>
              ))}
            </div>
            <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.frontmatter.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {post.frontmatter.description}
            </p>
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
    </div>
  );
}
