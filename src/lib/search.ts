import { SearchResult, SearchResults } from '@/types/search';
import { searchTools } from './tools';
import { searchPosts } from './blog';

export function unifiedSearch(query: string): SearchResults {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: '', results: [], totalHits: 0 };
  }

  const tools = searchTools(trimmed);
  const posts = searchPosts(trimmed);

  const results: SearchResult[] = [
    ...tools.map(
      (t): SearchResult => ({
        type: 'tool',
        slug: t.slug,
        name: t.name,
        description: t.description,
        category: t.category,
        logo: t.logo,
        rating: t.rating,
      })
    ),
    ...posts.map(
      (p): SearchResult => ({
        type: 'blog',
        slug: p.slug,
        title: p.frontmatter.title,
        description: p.frontmatter.description,
        date: p.frontmatter.date,
        tags: p.frontmatter.tags,
      })
    ),
  ];

  return {
    query: trimmed,
    results,
    totalHits: results.length,
  };
}
