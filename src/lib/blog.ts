import { BlogPost, BlogFrontmatter } from '@/types/blog';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { estimateReadTime } from './utils';

const BLOG_DIR = join(process.cwd(), 'content/blog');

let postsCache: BlogPost[] | null = null;

function parseFrontmatter(raw: string): { frontmatter: BlogFrontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid MDX frontmatter format');
  }

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const key = kv[1];
    let value: unknown = kv[2].trim();

    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (/^\d+$/.test(value as string)) value = parseInt(value as string);
    else if ((value as string).startsWith('[') && (value as string).endsWith(']')) {
      value = (value as string)
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/['"]/g, ''));
    }

    frontmatter[key] = value;
  }

  const content = match[2].trim();
  const fm = frontmatter as unknown as BlogFrontmatter;

  if (!fm.readingTime) {
    fm.readingTime = estimateReadTime(content);
  }

  return { frontmatter: fm, content: match[2].trim() };
}

function extractHeadings(rawContent: string): { level: 2 | 3; text: string; slug: string }[] {
  const headings: { level: 2 | 3; text: string; slug: string }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(rawContent)) !== null) {
    const level = match[1].length as 2 | 3;
    if (level > 3) continue;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w一-鿿\s]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ level, text, slug });
  }

  return headings;
}

export function loadAllPosts(): BlogPost[] {
  if (postsCache) return postsCache;

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  postsCache = files
    .map((file) => {
      const raw = readFileSync(join(BLOG_DIR, file), 'utf-8');
      const { frontmatter, content } = parseFrontmatter(raw);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        frontmatter,
        content,
        rawContent: content,
        headings: extractHeadings(content),
      };
    })
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return postsCache;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = loadAllPosts().filter((p) => p.slug !== slug);

  const scored = others.map((p) => {
    let score = 0;
    const commonTags = p.frontmatter.tags.filter((t) =>
      current.frontmatter.tags.includes(t)
    );
    score += commonTags.length * 10;
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function getAllPostSlugs(): string[] {
  return loadAllPosts().map((p) => p.slug);
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return loadAllPosts().filter(
    (p) =>
      p.frontmatter.title.toLowerCase().includes(q) ||
      p.frontmatter.description.toLowerCase().includes(q) ||
      p.frontmatter.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.rawContent.toLowerCase().includes(q)
  );
}
