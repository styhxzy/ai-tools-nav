export const SITE = {
  name: 'AI工具导航',
  nameEn: 'AI Tools Nav',
  description: '发现最适合大学生的AI效率工具。涵盖AI聊天、写作、PPT、编程、英语、视频、绘画、效率工具。',
  url: 'https://ai-workspace.cn',
  locale: 'zh_CN',
  author: 'AI工具导航团队',
} as const;

export const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '工具分类', href: '/categories' },
  { label: 'AI聊天', href: '/chat' },
  { label: '博客', href: '/blog' },
] as const;

export const CATEGORY_SLUGS = [
  'ai-chat',
  'ai-writing',
  'ai-ppt',
  'ai-coding',
  'ai-english',
  'ai-video',
  'ai-drawing',
  'ai-productivity',
] as const;

export const CATEGORY_NAMES: Record<string, string> = {
  'ai-chat': 'AI聊天',
  'ai-writing': 'AI写作',
  'ai-ppt': 'AI PPT',
  'ai-coding': 'AI编程',
  'ai-english': 'AI英语',
  'ai-video': 'AI视频',
  'ai-drawing': 'AI绘画',
  'ai-productivity': 'AI效率工具',
};

export const CATEGORY_ICONS: Record<string, string> = {
  'ai-chat': 'MessageCircle',
  'ai-writing': 'PenLine',
  'ai-ppt': 'Presentation',
  'ai-coding': 'Code2',
  'ai-english': 'Languages',
  'ai-video': 'Video',
  'ai-drawing': 'Palette',
  'ai-productivity': 'Zap',
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  'ai-chat': 'from-green-500 to-emerald-500',
  'ai-writing': 'from-blue-500 to-indigo-500',
  'ai-ppt': 'from-violet-500 to-purple-500',
  'ai-coding': 'from-emerald-500 to-teal-500',
  'ai-english': 'from-rose-500 to-pink-500',
  'ai-video': 'from-orange-500 to-red-500',
  'ai-drawing': 'from-amber-500 to-orange-500',
  'ai-productivity': 'from-cyan-500 to-sky-500',
};

export const PRICING_LABELS: Record<string, string> = {
  free: '免费',
  freemium: '免费增值',
  paid: '付费',
  'free-trial': '免费试用',
};

export const PRICING_COLORS: Record<string, string> = {
  free: 'bg-green-100 text-green-700',
  freemium: 'bg-blue-100 text-blue-700',
  paid: 'bg-purple-100 text-purple-700',
  'free-trial': 'bg-amber-100 text-amber-700',
};

export const SORT_OPTIONS = [
  { label: '推荐排序', value: 'weight' },
  { label: '评分最高', value: 'rating' },
  { label: '最新收录', value: 'newest' },
  { label: '名称 A-Z', value: 'name' },
] as const;
