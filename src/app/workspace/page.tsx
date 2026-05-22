'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { AI_MODELS } from '@/lib/models';
import { MessageSquare, PenLine, Code2, Presentation, GraduationCap, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const WORKSPACES = [
  { href: '/workspace/chat', icon: MessageSquare, label: 'AI 对话', desc: '多模型AI助手，支持DeepSeek、Kimi、豆包', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-500/10' },
  { href: '/workspace/write', icon: PenLine, label: '写作', desc: '论文、文案、邮件——AI辅助写作', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-500/10' },
  { href: '/workspace/code', icon: Code2, label: '编程', desc: '代码生成、Debug、算法讲解', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10' },
  { href: '/workspace/ppt', icon: Presentation, label: 'PPT', desc: '演示文稿大纲与结构生成', color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10' },
  { href: '/workspace/study', icon: GraduationCap, label: '学习', desc: '知识讲解、复习计划、笔记整理', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-500/10' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const enabledModels = AI_MODELS.filter(m => !m.disabled);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Greeting */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-2xl font-bold text-primary">
          {user?.nickname ? `${user.nickname}，下午好` : '下午好'}
        </h1>
        <p className="text-secondary mt-1">今天想完成什么工作？</p>
      </div>

      {/* AI Models Status */}
      <div className="glass-card p-5 mb-8 animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /> 已接入模型
          </h2>
          <span className="text-xs text-tertiary">{enabledModels.length} 个可用</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {enabledModels.map(m => (
            <div key={m.id}
              className="flex items-center gap-2 px-3 py-2 bg-surface-hover rounded-xl text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-primary font-medium">{m.name}</span>
              <span className="text-tertiary text-xs">{m.provider}</span>
              {m.capabilities.slice(0, 1).map(c => (
                <span key={c.tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-light text-accent">{c.tag}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Workspace Grid */}
      <h2 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-accent" /> 工作区
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {WORKSPACES.map((ws, i) => {
          const Icon = ws.icon;
          return (
            <Link key={ws.href} href={ws.href}
              className="glass-card p-5 group animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`w-10 h-10 rounded-2xl ${ws.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 bg-gradient-to-br ${ws.color} bg-clip-text`}
                  style={{ color: 'transparent', backgroundImage: `linear-gradient(135deg, var(--gradient-1), var(--gradient-2))` }} />
              </div>
              <h3 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{ws.label}</h3>
              <p className="text-xs text-secondary">{ws.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
