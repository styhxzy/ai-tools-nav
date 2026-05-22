import { SearchBar } from './SearchBar';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-500/10 animate-gradient-shift" />
      <div className="absolute inset-0 noise-bg" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl" />

      <div className="section-container relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-gray-600 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            发现最适合大学生的AI工具
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 animate-slide-up">
            用AI工具
            <br />
            <span className="gradient-text">让学习效率翻倍</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-slide-up text-balance">
            精选100+款AI效率工具，涵盖写作、PPT、编程、英语、绘画等领域，
            每款工具都有详细评测和使用教程，帮你找到最适合的工具。
          </p>

          {/* Search */}
          <div className="animate-slide-up">
            <SearchBar size="lg" />
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400 animate-fade-in">
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-700">6</span> 大分类
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-700">20+</span> 款工具
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-700">10+</span> 篇教程
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
