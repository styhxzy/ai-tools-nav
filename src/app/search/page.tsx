import { Metadata } from 'next';
import { unifiedSearch } from '@/lib/search';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ToolCard } from '@/components/tools/ToolCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { SearchBar } from '@/components/home/SearchBar';
import { getPostBySlug } from '@/lib/blog';
import { getToolBySlug } from '@/lib/tools';
import { GlassCard } from '@/components/shared/GlassCard';
import { Badge } from '@/components/shared/Badge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `搜索: ${q} | ${SITE.name}` : `搜索工具 | ${SITE.name}`,
    description: q ? `搜索"${q}"的结果` : '搜索AI工具和教程文章',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || '';

  const searchResults = unifiedSearch(query);
  const toolResults = searchResults.results.filter((r) => r.type === 'tool');
  const blogResults = searchResults.results.filter((r) => r.type === 'blog');

  return (
    <div className="section-container py-8">
      <Breadcrumb items={[{ label: '搜索' }]} />

      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">搜索工具</h1>
        <SearchBar />
      </div>

      {query && (
        <>
          <p className="text-sm text-gray-500 mb-8">
            搜索 &ldquo;{query}&rdquo; 找到 {searchResults.totalHits} 个结果
          </p>

          {searchResults.totalHits === 0 ? (
            <EmptyState
              title="没有找到结果"
              description="试试其他关键词，或者浏览分类页面查找"
            />
          ) : (
            <div className="space-y-10">
              {/* Tool results */}
              {toolResults.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    工具 ({toolResults.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toolResults.map((r) => {
                      const tool = getToolBySlug(r.slug);
                      if (!tool) return null;
                      return <ToolCard key={r.slug} tool={tool} />;
                    })}
                  </div>
                </div>
              )}

              {/* Blog results */}
              {blogResults.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    文章 ({blogResults.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {blogResults.map((r) => (
                      <GlassCard key={r.slug} href={`/blog/${r.slug}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="primary" size="sm">文章</Badge>
                          {r.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} size="sm">{tag}</Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {r.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                          {r.description}
                        </p>
                        <span className="text-xs text-gray-400">
                          {formatDate(r.date)}
                        </span>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="py-16 text-center">
          <p className="text-gray-500">输入关键词开始搜索AI工具和文章</p>
        </div>
      )}
    </div>
  );
}
