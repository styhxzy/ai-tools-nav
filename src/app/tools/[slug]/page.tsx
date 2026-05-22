export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolBySlug, getAllToolSlugs, getSimilarTools } from '@/lib/tools';
import { getCategoryBySlug } from '@/lib/categories';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { ToolFeatures } from '@/components/tools/ToolFeatures';
import { ToolProsCons } from '@/components/tools/ToolProsCons';
import { ToolTutorial } from '@/components/tools/ToolTutorial';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { JsonLd } from '@/components/seo/JsonLd';
import { CATEGORY_NAMES, SITE } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到' };

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: { canonical: `${SITE.url}/tools/${slug}` },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `${SITE.url}/tools/${slug}`,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'article',
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo.title,
      description: tool.seo.description,
      images: ['/images/og-default.jpg'],
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const similarTools = getSimilarTools(tool.similarTools);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Web',
    description: tool.description,
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : undefined,
      priceCurrency: 'CNY',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: SITE.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category?.name || tool.category,
        item: `${SITE.url}/category/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${SITE.url}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="section-container py-8">
        <Breadcrumb
          items={[
            { label: category?.name || tool.category, href: `/category/${tool.category}` },
            { label: tool.name },
          ]}
        />

        <ToolHeader tool={tool} />

        {/* Content sections */}
        <div className="max-w-4xl">
          {/* Long description */}
          {tool.longDescription && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">工具简介</h2>
              <div className="glass-card p-6 prose prose-gray max-w-none">
                {tool.longDescription.split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          <ToolFeatures features={tool.features} />
          <ToolProsCons prosCons={tool.prosCons} />
          <ToolTutorial content={tool.tutorial} />
          <SimilarTools tools={similarTools} />
        </div>
      </div>
    </>
  );
}
