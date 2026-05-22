'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Star, MessageCircle, PenLine, Presentation, Code2, Languages, Video, Palette, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types/category';
import { Tool } from '@/types/tool';
import { BlogPost } from '@/types/blog';
import { CATEGORY_ICONS, PRICING_LABELS } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{className?:string}>> = {MessageCircle, PenLine, Presentation, Code2, Languages, Video, Palette, Zap};

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' as const }, transition: { duration: 0.5 } };
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const staggerItem = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

interface Props {
  categories: Category[];
  hotTools: Tool[];
  latestPosts: BlogPost[];
  toolCounts: Record<string, number>;
  totalTools: number;
  totalPosts: number;
}

export function HomePageClient({ categories, hotTools, latestPosts, toolCounts, totalTools, totalPosts }: Props) {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const onSearch = (e: React.FormEvent) => { e.preventDefault(); if(search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`); };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-30 dark:opacity-20"/>
        <div className="absolute inset-0 animate-gradient-shift opacity-20 dark:opacity-30"
          style={{ background: 'linear-gradient(135deg, hsl(var(--gradient-1)), hsl(var(--gradient-2)), hsl(var(--gradient-3)), hsl(var(--gradient-1)))', backgroundSize: '300% 300%' }}/>
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] opacity-20" style={{background:'hsl(var(--gradient-1))'}}/>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-[120px] opacity-15" style={{background:'hsl(var(--gradient-2))'}}/>

        <div className="section-container relative py-20 sm:py-28 lg:py-36">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="max-w-3xl mx-auto text-center">
            <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.1,duration:0.5}}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm text-secondary mb-8">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"/></span>
              80+ AI工具 · 8大分类 · 选题辅导
            </motion.div>
            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-4">
              用AI工具<br/><span className="gradient-text">让大学更轻松</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}}
              className="text-lg text-secondary max-w-2xl mx-auto mb-10">
              精选 80+ 款AI效率工具，涵盖聊天、写作、PPT、编程、英语、视频、绘画、效率工具，每款都有详细评测和使用教程。
            </motion.p>
            <motion.form initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.5}} onSubmit={onSearch} className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-violet-500/30 rounded-3xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"/>
                <div className="relative flex items-center glass-card rounded-2xl px-5 py-4">
                  <Search className="w-5 h-5 text-tertiary shrink-0"/>
                  <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索AI工具或文章..." className="flex-1 bg-transparent text-primary placeholder:text-tertiary focus:outline-none ml-3 text-base"/>
                  <button type="submit" className="px-5 py-2.5 font-medium text-white gradient-bg rounded-xl hover:opacity-90 transition-all active:scale-95 text-sm">搜索</button>
                </div>
              </div>
            </motion.form>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6,duration:0.5}}
              className="flex items-center justify-center gap-8 mt-10 text-sm text-tertiary">
              <span>🏷️ <span className="font-semibold text-primary">8</span> 分类</span> · <span>🔧 <span className="font-semibold text-primary">{totalTools}</span> 工具</span> · <span>📝 <span className="font-semibold text-primary">{totalPosts}</span> 教程</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container py-16 sm:py-20">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">探索分类</h2>
          <p className="text-secondary">按需浏览，找到你需要的AI工具类型</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true,margin:'-80px'}}
          className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] || Zap;
            return (
              <motion.div key={cat.slug} variants={staggerItem} whileHover={{y:-4}} whileTap={{scale:0.96}}>
                <Link href="/categories" className="glass-card p-5 flex flex-col items-center text-center gap-3 cursor-pointer block">
                  <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center"><Icon className="w-6 h-6 text-white"/></div>
                  <div><h3 className="font-semibold text-sm text-primary">{cat.name}</h3><p className="text-xs text-tertiary mt-0.5">{toolCounts[cat.slug]||0} 款工具</p></div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Hot Tools */}
      <section className="section-container py-16 sm:py-20">
        <motion.div {...fadeIn} className="flex items-end justify-between mb-12">
          <div><h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">热门工具</h2><p className="text-secondary">大家最常用的AI工具</p></div>
          <Link href="/categories" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">全部<ArrowRight className="w-4 h-4"/></Link>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true,margin:'-80px'}}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {hotTools.map(tool => (
            <motion.div key={tool.slug} variants={staggerItem} whileHover={{y:-4,scale:1.01}} whileTap={{scale:0.98}}>
              <Link href={`/tools/${tool.slug}`} className="glass-card p-5 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-surface-hover border border-custom flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{tool.name.slice(0,2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-primary">{tool.name}</h3>
                    <p className="text-xs text-tertiary mt-0.5 line-clamp-1">{tool.tagline}</p>
                  </div>
                </div>
                <p className="text-xs text-secondary line-clamp-2 mb-3 flex-1">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400"/><span className="text-xs text-secondary">{tool.rating}</span></div>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium',tool.pricing==='free'?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':'bg-accent-light text-accent')}>{PRICING_LABELS[tool.pricing]}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="section-container py-16 sm:py-20">
          <motion.div {...fadeIn} className="flex items-end justify-between mb-12">
            <div><h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">最新文章</h2><p className="text-secondary">AI工具使用教程与评测</p></div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">全部文章<ArrowRight className="w-4 h-4"/></Link>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true,margin:'-80px'}}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestPosts.map(post => (
              <motion.div key={post.slug} variants={staggerItem} whileHover={{y:-4}} whileTap={{scale:0.98}}>
                <Link href={`/blog/${post.slug}`} className="glass-card p-5 flex flex-col h-full">
                  <div className="aspect-video rounded-2xl bg-surface-hover mb-4 flex items-center justify-center text-4xl">📝</div>
                  <div className="flex gap-1.5 mb-2 flex-wrap">{post.frontmatter.tags.slice(0,2).map(tag=><span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-light text-accent">{tag}</span>)}</div>
                  <h3 className="font-semibold text-sm text-primary mb-1 line-clamp-2">{post.frontmatter.title}</h3>
                  <p className="text-xs text-secondary line-clamp-2 mb-3">{post.frontmatter.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-tertiary mt-auto">
                    <span>{new Date(post.frontmatter.date).toLocaleDateString('zh-CN')}</span><span>{post.frontmatter.readingTime} 分钟阅读</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
