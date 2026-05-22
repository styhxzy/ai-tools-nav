'use client';

export const dynamic = 'force-dynamic';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ExternalLink, ArrowUpRight, Grid, List, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { loadAllTools } from '@/lib/tools';
import { loadCategories } from '@/lib/categories';
import { CATEGORY_NAMES, PRICING_LABELS } from '@/lib/constants';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('ai-chat');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => loadCategories(), []);
  const allTools = useMemo(() => loadAllTools(), []);

  const filteredTools = useMemo(() => {
    let tools = allTools.filter(t => t.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    return tools;
  }, [activeCategory, search, allTools]);

  const categoryToolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTools.forEach(t => { counts[t.category] = (counts[t.category] || 0) + 1; });
    return counts;
  }, [allTools]);

  return (
    <div className="section-container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">工具分类</h1>
      <p className="text-gray-500 mb-8">浏览 {allTools.length} 款AI工具，找到你需要的效率利器</p>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="sticky top-24 space-y-1">
            {categories.map(cat => {
              const isActive = activeCategory === cat.slug;
              const count = categoryToolCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    isActive ? 'bg-blue-500' : 'bg-gray-300'
                  )} />
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile category tabs */}
        <div className="md:hidden w-full mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                  activeCategory === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {cat.name} ({categoryToolCounts[cat.slug] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search + view toggle */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`搜索 ${CATEGORY_NAMES[activeCategory] || ''} 工具...`}
                className="w-full pl-10 pr-8 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')}
                className={cn('p-1.5 rounded-md', viewMode==='grid'?'bg-white shadow-sm':'text-gray-400 hover:text-gray-600')}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')}
                className={cn('p-1.5 rounded-md', viewMode==='list'?'bg-white shadow-sm':'text-gray-400 hover:text-gray-600')}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active category info */}
          <div className={cn(
            'glass-card p-4 mb-6',
            activeCategory === 'ai-chat' && 'border-l-4 border-l-green-400',
            activeCategory === 'ai-writing' && 'border-l-4 border-l-blue-400',
            activeCategory === 'ai-ppt' && 'border-l-4 border-l-violet-400',
            activeCategory === 'ai-coding' && 'border-l-4 border-l-emerald-400',
            activeCategory === 'ai-english' && 'border-l-4 border-l-rose-400',
            activeCategory === 'ai-video' && 'border-l-4 border-l-orange-400',
            activeCategory === 'ai-drawing' && 'border-l-4 border-l-amber-400',
            activeCategory === 'ai-productivity' && 'border-l-4 border-l-cyan-400'
          )}>
            <h2 className="font-semibold text-gray-900">
              {CATEGORY_NAMES[activeCategory]}
              <span className="text-sm font-normal text-gray-400 ml-2">
                {filteredTools.length} 款工具
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {categories.find(c => c.slug === activeCategory)?.description}
            </p>
          </div>

          {/* Tool cards */}
          {filteredTools.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>没有找到匹配的工具</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredTools.map(tool => (
                <div key={tool.slug}
                  className="glass-card p-4 group animate-fade-in">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-gray-500">{tool.name.slice(0,2)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">{tool.tagline}</p>
                    </div>
                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                      tool.pricing==='free'?'bg-green-100 text-green-600':'bg-blue-100 text-blue-600')}>
                      {PRICING_LABELS[tool.pricing]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {tool.tags.slice(0,2).map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tag}</span>
                      ))}
                    </div>
                    <a href={tool.websiteUrl} target="_blank" rel="noopener"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-0.5">
                      访问 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTools.map(tool => (
                <div key={tool.slug}
                  className="glass-card p-4 flex items-center gap-4 animate-fade-in">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">{tool.name.slice(0,2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-gray-900">{tool.name}</h3>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                        tool.pricing==='free'?'bg-green-100 text-green-600':'bg-blue-100 text-blue-600')}>
                        {PRICING_LABELS[tool.pricing]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.tags.slice(0,2).map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tag}</span>
                    ))}
                    <a href={tool.websiteUrl} target="_blank" rel="noopener"
                      className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                      访问官网 <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
