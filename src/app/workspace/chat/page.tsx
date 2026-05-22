'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AI_MODELS, AIModel } from '@/lib/models';
import { Send, Square, Bot, Trash2, Sparkles, ChevronDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const enabledModels = AI_MODELS.filter(m => !m.disabled);

interface Message { id: string; role: 'user' | 'assistant'; content: string; modelId?: string; }

function rm(c: string): string {
  return c
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, l: string, cd: string) =>
      `<div class="code-block"><div class="code-header">${l || 'code'}</div><pre><code>${cd.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre></div>`)
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\#{2,3} (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    .split(/\n\n+/).map(b => { b = b.trim(); if (!b) return ''; if (/^<(h|ul|div|pre)/.test(b)) return b; return `<p>${b.replace(/\n/g,'<br/>')}</p>`; }).join('\n');
}

export default function ChatPage() {
  const [msgs, sm] = useState<Message[]>([]);
  const [inp, si] = useState(''); const [l, sl] = useState(false);
  const [sc, ssc] = useState(''); const [mdl, smdl] = useState(enabledModels[0]?.id || '');
  const [showMdl, setShowMdl] = useState(false);
  const ar = useRef<AbortController | null>(null); const er = useRef<HTMLDivElement>(null);

  useEffect(() => { er.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, sc]);

  const stp = useCallback(() => { ar.current?.abort(); sl(false); ssc(p => { if (p) sm(ms => [...ms, { id: Date.now().toString(), role: 'assistant', content: p, modelId: mdl }]); return ''; }); }, [mdl]);

  const snd = useCallback(async (content: string) => {
    const um: Message = { id: Date.now().toString(), role: 'user', content }; const nm = [...msgs, um]; sm(nm); sl(true); ssc(''); si('');
    const ctrl = new AbortController(); ar.current = ctrl;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nm.map(({ role, content }) => ({ role, content })), model: mdl }), signal: ctrl.signal });
      if (!res.ok) { const e = await res.json(); ssc('**错误**: ' + (e.error || '请求失败')); sl(false); return; }
      const reader = res.body?.getReader(); if (!reader) { sl(false); return; }
      const dec = new TextDecoder(); let ct = '';
      while (true) { const { done, value } = await reader.read(); if (done) break; ct += dec.decode(value, { stream: true }); ssc(ct); }
      sm(p => [...p, { id: (Date.now() + 1).toString(), role: 'assistant', content: ct, modelId: mdl }]); ssc('');
    } catch (e: unknown) { if (e instanceof Error && e.name === 'AbortError') return; ssc('**网络错误**'); }
    finally { sl(false); ar.current = null; }
  }, [msgs, mdl]);

  const disp = [...msgs]; if (sc) disp.push({ id: 's', role: 'assistant' as const, content: sc, modelId: mdl });
  const currentModel = AI_MODELS.find(m => m.id === mdl);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-custom bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <div>
            <h1 className="text-sm font-semibold text-primary">AI 对话</h1>
            {/* Model Selector */}
            <div className="relative">
              <button onClick={() => setShowMdl(!showMdl)} disabled={l}
                className="flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors disabled:opacity-50 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {currentModel?.name || '选择模型'}
                {currentModel && <span className="text-tertiary">· {currentModel.provider}</span>}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showMdl && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMdl(false)} />
                  <div className="absolute top-full left-0 mt-2 w-80 glass-card z-20 p-2 space-y-1 animate-fade-up">
                    {enabledModels.map(m => (
                      <button key={m.id} onClick={() => { smdl(m.id); setShowMdl(false); }}
                        className={cn('w-full text-left px-3 py-2.5 rounded-xl transition-colors',
                          m.id === mdl ? 'bg-accent-light' : 'hover:bg-surface-hover')}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">{m.name}</span>
                          <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full', m.tier === 'free' ? 'bg-green-400/20 text-green-400' : 'bg-amber-400/20 text-amber-400')}>
                            {m.tier === 'free' ? '免费' : '付费'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {m.capabilities.slice(0, 3).map(c => (
                            <span key={c.tag} className={cn('text-[10px] px-1.5 py-0.5 rounded-full',
                              c.level === 'excellent' ? 'bg-accent/20 text-accent' : 'bg-surface-hover text-tertiary')}>
                              {c.tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-tertiary mt-1">{m.description}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-tertiary">{msgs.length} 条消息</span>
          {msgs.length > 0 && (
            <button onClick={() => sm([])} className="text-xs text-secondary hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="w-3 h-3" /> 清空
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6">
          {disp.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-accent-light flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">AI 对话</h2>
              <p className="text-secondary text-sm mb-2">
                当前模型：<span className="text-accent font-medium">{currentModel?.name}</span>
                <span className="text-tertiary"> · {currentModel?.provider}</span>
              </p>
              {/* Model capabilities */}
              <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {currentModel?.capabilities.map(c => (
                  <span key={c.tag} className={cn('text-xs px-2 py-1 rounded-full',
                    c.level === 'excellent' ? 'bg-accent/10 text-accent' : 'bg-surface-hover text-tertiary')}>
                    {c.tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                {['解释量子计算的基本原理', '写一段Python快速排序代码', '帮我润色这段论文摘要', '制定一份英语学习计划'].map(q => (
                  <button key={q} onClick={() => snd(q)} disabled={l}
                    className="text-xs text-left px-3 py-2.5 rounded-xl glass-card text-secondary hover:text-primary transition-all disabled:opacity-50">{q}</button>
                ))}
              </div>
            </div>
          ) : (
            disp.map(msg => (
              <div key={msg.id} className={cn('flex gap-3 py-5 animate-fade-up', msg.role === 'user' ? 'justify-end' : '')}>
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-accent-light flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div className={cn('max-w-[80%]', msg.role === 'user' ? '' : 'flex-1')}>
                  {msg.modelId && msg.role === 'assistant' && (
                    <span className="text-[10px] text-tertiary ml-1 mb-1 block">
                      {AI_MODELS.find(m => m.id === msg.modelId)?.name || msg.modelId}
                    </span>
                  )}
                  <div className={cn('rounded-2xl px-4 py-3',
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-br-md ml-auto inline-block'
                      : 'glass-card rounded-bl-md')}>
                    {msg.role === 'user' ? (
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="chat-content" dangerouslySetInnerHTML={{ __html: rm(msg.content || '') }} />
                    )}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-gray-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={er} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-custom bg-card/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 glass-card rounded-2xl px-4 py-2.5">
            <textarea value={inp} onChange={e => si(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); const t = inp.trim(); if (t && !l) snd(t); } }}
              placeholder={`与 ${currentModel?.name || 'AI'} 对话...`} rows={1}
              className="flex-1 resize-none bg-transparent py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none max-h-[200px]"
              disabled={l} />
            {l ? (
              <button onClick={stp} className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                <Square className="w-4 h-4" fill="currentColor" />
              </button>
            ) : (
              <button onClick={() => { const t = inp.trim(); if (t) snd(t); }} disabled={!inp.trim()}
                className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-center text-[10px] text-tertiary mt-2">
            {currentModel?.name} · AI回答仅供参考
          </p>
        </div>
      </div>
    </div>
  );
}
