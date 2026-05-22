export type PricingTier = 'free' | 'freemium' | 'paid' | 'free-trial';

export interface ToolFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ToolProsCons {
  pros: string[];
  cons: string[];
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  logo: string;
  category: string;
  pricing: PricingTier;
  websiteUrl: string;
  affiliateUrl?: string;
  rating: number;
  reviewCount: number;
  features: ToolFeature[];
  prosCons: ToolProsCons;
  tutorial: string;
  isHot: boolean;
  weight: number;
  updatedAt: string;
  tags: string[];
  similarTools: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
