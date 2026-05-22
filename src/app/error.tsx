'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section-container py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">出错了</h1>
        <p className="text-gray-500 mb-8">
          页面加载时发生了错误，请刷新重试。
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          重新加载
        </button>
      </div>
    </div>
  );
}
