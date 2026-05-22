import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section-container py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">页面未找到</h1>
        <p className="text-gray-500 mb-8">
          你访问的页面不存在或已被移除。请检查链接是否正确。
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
