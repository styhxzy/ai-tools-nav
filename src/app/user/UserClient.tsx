'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { MessageSquare, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UserClient() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <div className="section-container py-20 text-center"><div className="text-secondary">Loading...</div></div>;
  if (!user) return (<div className="section-container py-20 text-center"><h1 className="text-2xl font-bold text-primary mb-3">请先登录</h1><p className="text-secondary mb-6">登录后查看个人中心和对话记录</p><Link href="/sign-in" className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white gradient-bg rounded-xl">前往登录<ArrowRight className="w-4 h-4"/></Link></div>);
  return (<div className="section-container py-8">
    <div className="glass-card p-6 mb-6"><div className="flex items-center gap-4"><UserButton appearance={{elements:{avatarBox:'w-16 h-16 rounded-2xl'}}}/><div><h1 className="text-xl font-bold text-primary">{user.fullName || user.username || '用户'}</h1><p className="text-sm text-secondary">{user.primaryEmailAddress?.emailAddress}</p></div></div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-custom"><div className="text-center"><div className="text-2xl font-bold gradient-text">0</div><div className="text-xs text-tertiary mt-1">对话次数</div></div><div className="text-center"><div className="text-2xl font-bold gradient-text">0</div><div className="text-xs text-tertiary mt-1">收藏工具</div></div><div className="text-center"><div className="text-2xl font-bold gradient-text">0</div><div className="text-xs text-tertiary mt-1">浏览记录</div></div></div></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"><Link href="/chat" className="glass-card p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center"><MessageSquare className="w-5 h-5 text-accent"/></div><div className="flex-1"><h3 className="font-medium text-sm text-primary">AI 聊天</h3><p className="text-xs text-tertiary">通用AI对话助手</p></div><ArrowRight className="w-4 h-4 text-tertiary"/></Link><Link href="/categories" className="glass-card p-4 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center"><Settings className="w-5 h-5 text-accent"/></div><div className="flex-1"><h3 className="font-medium text-sm text-primary">工具分类</h3><p className="text-xs text-tertiary">浏览 80+ 款AI工具</p></div><ArrowRight className="w-4 h-4 text-tertiary"/></Link></div>
    <h2 className="text-lg font-bold text-primary mb-3">AI 功能</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{[{href:'/ai/ppt',label:'AI PPT',desc:'演示文稿助手'},{href:'/ai/writing',label:'AI写作',desc:'论文文案助手'},{href:'/ai/coding',label:'AI编程',desc:'代码编程助手'},{href:'/ai/study',label:'AI学习',desc:'学习辅导助手'}].map(item=>(<Link key={item.href} href={item.href} className="glass-card p-4"><h3 className="font-medium text-sm text-primary">{item.label}</h3><p className="text-xs text-tertiary mt-0.5">{item.desc}</p></Link>))}</div>
  </div>);
}
