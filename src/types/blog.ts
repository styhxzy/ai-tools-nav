export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  authorAvatar?: string;
  coverImage: string;
  coverImageAlt: string;
  tags: string[];
  readingTime: number;
  draft?: boolean;
  seo: {
    keywords: string[];
    canonicalUrl?: string;
  };
}

export interface TocHeading {
  level: 2 | 3;
  text: string;
  slug: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  rawContent: string;
  headings: TocHeading[];
}
