import { Metadata } from 'next';
import { HomePageClient } from '@/components/home/HomePageClient';
import { loadCategories } from '@/lib/categories';
import { getHotTools, loadAllTools } from '@/lib/tools';
import { loadAllPosts } from '@/lib/blog';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE.name} - 大学生AI效率工具导航`,
  description: SITE.description,
};

export default function HomePage() {
  const categories = loadCategories();
  const hotTools = getHotTools(8);
  const allPosts = loadAllPosts();
  const allTools = loadAllTools();
  const latestPosts = allPosts.slice(0, 3);

  const toolCounts: Record<string, number> = {};
  allTools.forEach(t => { toolCounts[t.category] = (toolCounts[t.category] || 0) + 1; });

  return (
    <HomePageClient
      categories={categories}
      hotTools={hotTools}
      latestPosts={latestPosts}
      toolCounts={toolCounts}
      totalTools={allTools.length}
      totalPosts={allPosts.length}
    />
  );
}
