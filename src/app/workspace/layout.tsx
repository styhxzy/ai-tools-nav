'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { ChevronDown, LogOut, Settings, User, Sparkles, MessageSquare, PenLine, Code2, Presentation, GraduationCap, Wrench, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/workspace', label: '工作台', icon: Home },
  { href: '/workspace/chat', label: 'AI 对话', icon: MessageSquare },
  { href: '/workspace/write', label: '写作', icon: PenLine },
  { href: '/workspace/code', label: '编程', icon: Code2 },
  { href: '/workspace/ppt', label: 'PPT', icon: Presentation },
  { href: '/workspace/study', label: '学习', icon: GraduationCap },
  { href: '/workspace/tools', label: '工具集', icon: Wrench },
];

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.replace('/auth/login');
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) return <div className="min-h-screen bg-surface flex items-center justify-center"><div className="text-tertiary">加载中...</div></div>;
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-card border-r border-custom transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}>
        {/* Logo */}
        <Link href="/workspace" className="flex items-center gap-3 px-5 h-16 border-b border-custom shrink-0">
          <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!collapsed && <span className="font-bold text-primary text-base">Workspace</span>}
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/workspace' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent-light text-accent'
                    : 'text-secondary hover:text-primary hover:bg-surface-hover'
                )}>
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-custom relative">
          <button onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-surface-hover transition-colors">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{user?.nickname}</p>
                  <p className="text-xs text-tertiary truncate">{user?.phone}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-tertiary" />
              </>
            )}
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute bottom-full left-3 right-3 mb-2 glass-card p-1 z-20 animate-fade-up">
                <Link href="/workspace" onClick={()=>setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover rounded-lg">
                  <Settings className="w-4 h-4" /> 个人设置
                </Link>
                <button onClick={() => { logout(); router.push('/auth/login'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <LogOut className="w-4 h-4" /> 退出登录
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className={cn('flex-1 transition-all duration-300', collapsed ? 'ml-[68px]' : 'ml-[240px]')}>
        {children}
      </main>
    </div>
  );
}
