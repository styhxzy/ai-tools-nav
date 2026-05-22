import { Category } from '@/types/category';
import categoriesData from '@/content/categories/categories.json';

let categoriesCache: Category[] | null = null;

export function loadCategories(): Category[] {
  if (categoriesCache) return categoriesCache;
  categoriesCache = categoriesData as Category[];
  return categoriesCache;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadCategories().find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return loadCategories().map((c) => c.slug);
}

export function updateCategoryToolCount(categorySlug: string, count: number): void {
  const categories = loadCategories();
  const category = categories.find((c) => c.slug === categorySlug);
  if (category) {
    category.toolCount = count;
  }
}
