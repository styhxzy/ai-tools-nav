export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  gradient: string;
  toolCount: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
