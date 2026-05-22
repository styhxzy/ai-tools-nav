import Link from 'next/link';
import { SITE, CATEGORY_NAMES, CATEGORY_SLUGS } from '@/lib/constants';

const footerLinks = {
  快速导航: [
    { label: '首页', href: '/' },
    { label: '工具分类', href: '/categories' },
    { label: 'AI聊天', href: '/chat' },
    { label: '博客文章', href: '/blog' },
    { label: '搜索工具', href: '/search' },
  ],
  AI功能: [
    { label: 'AI PPT助手', href: '/ai/ppt' },
    { label: 'AI写作助手', href: '/ai/writing' },
    { label: 'AI编程助手', href: '/ai/coding' },
    { label: 'AI学习助手', href: '/ai/study' },
  ],
  工具分类: CATEGORY_SLUGS.map((slug) => ({
    label: CATEGORY_NAMES[slug],
    href: `/categories`,
  })),
  关于我们: [
    { label: '关于本站', href: '/about' },
    { label: '收录申请', href: '/about' },
    { label: '联系方式', href: '/about' },
    { label: '友情链接', href: '/about' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg mb-3">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              {SITE.name}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {SITE.description}
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-gray-900 mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {SITE.name}. 本站为非盈利性质，仅供学习交流。
          </p>
          <p className="text-xs text-gray-400">
            用 ❤️ 为大学生打造
          </p>
        </div>
      </div>
    </footer>
  );
}
