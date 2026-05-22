export interface SearchToolResult {
  type: 'tool';
  slug: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  rating: number;
}

export interface SearchBlogResult {
  type: 'blog';
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export type SearchResult = SearchToolResult | SearchBlogResult;

export interface SearchResults {
  query: string;
  results: SearchResult[];
  totalHits: number;
}
