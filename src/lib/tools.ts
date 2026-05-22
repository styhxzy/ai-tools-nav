import { Tool } from '@/types/tool';
import toolsData from '@/content/tools.json';

let toolsCache: Tool[] | null = null;

export function loadAllTools(): Tool[] {
  if (toolsCache) return toolsCache;
  toolsCache = (toolsData as Tool[]).sort((a, b) => b.weight - a.weight);
  return toolsCache;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return loadAllTools().find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return loadAllTools().filter((t) => t.category === categorySlug);
}

export function getHotTools(limit: number = 8): Tool[] {
  return loadAllTools()
    .filter((t) => t.isHot)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);
}

export function getSimilarTools(slugs: string[]): Tool[] {
  const all = loadAllTools();
  return slugs
    .map((s) => all.find((t) => t.slug === s))
    .filter((t): t is Tool => t !== undefined);
}

export function getAllToolSlugs(): string[] {
  return loadAllTools().map((t) => t.slug);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return loadAllTools().filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}

export function getToolsCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  loadAllTools().forEach((t) => {
    counts[t.category] = (counts[t.category] || 0) + 1;
  });
  return counts;
}
