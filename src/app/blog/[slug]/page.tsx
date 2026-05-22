import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ArticleMeta } from '@/components/blog/ArticleMeta';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.seo.keywords,
    alternates: {
      canonical: post.frontmatter.seo.canonicalUrl || `${SITE.url}/blog/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${SITE.url}/blog/${slug}`,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: [{ url: post.frontmatter.coverImage, width: 1200, height: 630, alt: post.frontmatter.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [post.frontmatter.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
    },
    image: post.frontmatter.coverImage,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <div className="section-container py-8">
        <Breadcrumb
          items={[
            { label: '博客', href: '/blog' },
            { label: post.frontmatter.title },
          ]}
        />

        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Cover image */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 mb-8 flex items-center justify-center overflow-hidden">
              <span className="text-6xl">📝</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {post.frontmatter.title}
            </h1>

            <div className="mb-8">
              <ArticleMeta
                author={post.frontmatter.author}
                date={post.frontmatter.date}
                readingTime={post.frontmatter.readingTime}
                tags={post.frontmatter.tags}
              />
            </div>

            <ArticleContent content={post.rawContent} />

            <RelatedArticles posts={relatedPosts} />
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
