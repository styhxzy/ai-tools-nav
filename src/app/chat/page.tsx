'use client';
export const dynamic = 'force-dynamic';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Square, Bot, User, Trash2, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Msg { id: string; role: 'user' | 'assistant'; content: string; }
const MODELS = [{ id: 'deepseek-chat', name: 'DeepSeek V4 Flash', tier: 'free' },{ id: 'deepseek-reasoner', name: 'DeepSeek V4 Pro', tier: 'paid' }];
const SK = 'ai-chat-history';
function lh(): Msg[] { try { const s = localStorage.getItem(SK); return s ? JSON.parse(s) : []; } catch { return []; } }
function sh(msgs: Msg[]) { try { localStorage.setItem(SK, JSON.stringify(msgs)); } catch {} }
function rm(c: string): string {
  if (!c) return '';
  return c.replace(/```(\w*)\n([\s\S]*?)```/g, (_m: string, lang: string, code: string) => `<div class="code-block"><div class="code-header">${lang || 'code'}</div><pre><code>${code.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre></div>`).replace(/`([^`]+)`/g,'<code class="inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/^\#{2,3} (.+)$/gm,'<h3>$1</h3>').replace(/^- (.+)$/gm,'<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g,'<ul>$1</ul>').split(/\n\n+/).map(b => { b = b.trim(); if (!b) return ''; if (/^<(h|ul|div|pre)/.test(b)) return b; return `<p>${b.replace(/\n/g,'<br/>')}</p>`; }).join('\n');
}

export default function ChatPage() {
  const [msgs, sm] = useState<Msg[]>([]);
  const [l, sl] = useState(false); const [sc, ssc] = useState('');
  const [mnt, smnt] = useState(false); const [mdl, smdl] = useState(MODELS[0].id);
  const [smn, ssmn] = useState(false); const [inp, si] = useState('');
  const ar = useRef<AbortController | null>(null); const er = useRef<HTMLDivElement>(null); const tr = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { sm(lh()); smnt(true); }, []);
  useEffect(() => { if (mnt && msgs.length > 0) sh(msgs); }, [msgs, mnt]);
  useEffect(() => { er.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, sc]);
  useEffect(() => { if (tr.current) { tr.current.style.height = 'auto'; tr.current.style.height = Math.min(tr.current.scrollHeight, 200) + 'px'; } }, [inp]);
  const clr = () => { sm([]); localStorage.removeItem(SK); };
  const stp = useCallback(() => { ar.current?.abort(); ar.current = null; sl(false); ssc(p => { if (p) sm(ms => [...ms, { id: Date.now().toString(), role: 'assistant', content: p }]); return ''; }); }, []);
  const snd = useCallback(async (c: string) => {
    const um: Msg = { id: Date.now().toString(), role: 'user', content: c }; const nm = [...msgs, um]; sm(nm); sl(true); ssc(''); si('');
    const ctrl = new AbortController(); ar.current = ctrl;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nm.map(({ role, content }) => ({ role, content })), model: mdl }), signal: ctrl.signal });
      if (!res.ok) { const err = await res.json(); ssc('Error: ' + (err.error || 'request failed')); sl(false); return; }
      const reader = res.body?.getReader(); if (!reader) { sl(false); return; }
      const dec = new TextDecoder(); let ct = '';
      while (true) { const { done, value } = await reader.read(); if (done) break; ct += dec.decode(value, { stream: true }); ssc(ct); }
      sm(p => [...p, { id: (Date.now() + 1).toString(), role: 'assistant', content: ct }]); ssc('');
    } catch (e: unknown) { if (e instanceof Error && e.name === 'AbortError') return; ssc('Network error'); }
    finally { sl(false); ar.current = null; }
  }, [msgs, mdl]);
  const hs = () => { const t = inp.trim(); if (!t || l) return; snd(t); };
  const okd = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); hs(); } };
  if (!mnt) return <div className="flex h-[calc(100vh-4rem)] items-center justify-center"><div className="text-secondary">Loading...</div></div>;
  const disp = [...msgs]; if (sc) disp.push({ id: 's', role: 'assistant' as const, content: sc });
  return (<div className="flex flex-col h-[calc(100vh-4rem)]">
    <div className="flex items-center justify-between px-4 py-3 border-b border-custom bg-card">
      <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><MessageSquare className="w-3.5 h-3.5 text-white"/></div>
        <div><h2 className="text-sm font-semibold text-primary">AI Chat</h2>
          <div className="relative"><button onClick={() => ssmn(!smn)} disabled={l} className="flex items-center gap-1 text-[10px] text-tertiary hover:text-secondary disabled:opacity-50">{MODELS.find(m => m.id === mdl)?.name || 'Select'} <ChevronDown className="w-3 h-3"/></button>
            {smn && (<><div className="fixed inset-0 z-10" onClick={() => ssmn(false)}/><div className="absolute top-full left-0 mt-1 w-48 glass-card z-20 py-1"><div className="p-2 space-y-1">{MODELS.map(m => (<button key={m.id} onClick={() => { smdl(m.id); ssmn(false); }} className={cn('w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors', m.id === mdl ? 'bg-accent-light text-accent' : 'text-secondary hover:text-primary hover:bg-surface-hover')}><span>{m.name}</span><span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', m.tier === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400')}>{m.tier === 'free' ? 'Free' : 'Pro'}</span></button>))}</div></div></>)}</div></div></div>
      <div className="flex items-center gap-1"><span className="text-[10px] text-tertiary mr-2">{msgs.length} msgs</span>{msgs.length > 0 && <button onClick={clr} className="text-xs text-secondary hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-3 h-3"/>Clear</button>}</div>
    </div>
    <div className="flex-1 overflow-y-auto"><div className="max-w-3xl mx-auto px-4">
      {disp.length === 0 ? (<div className="flex flex-col items-center justify-center py-20 text-center"><div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mb-4"><MessageSquare className="w-8 h-8 text-accent"/></div><h3 className="text-lg font-semibold text-primary mb-2">AI Chat</h3><p className="text-sm text-secondary max-w-sm">Based on DeepSeek. Supports writing, translation, coding, tutoring.</p><div className="grid grid-cols-2 gap-2 mt-6 max-w-md">{['Write a paper outline','Explain machine learning','Translate to English','Write a Python function'].map(q => (<button key={q} onClick={() => snd(q)} disabled={l} className="text-xs text-left px-3 py-2 rounded-xl glass-card text-secondary hover:text-primary transition-all disabled:opacity-50">{q}</button>))}</div></div>) : (disp.map(msg => (<div key={msg.id} className={cn('flex gap-3 py-4', msg.role === 'user' ? 'justify-end' : 'justify-start')}>{msg.role !== 'user' && <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-4 h-4 text-white"/></div>}<div className={cn('max-w-[80%] rounded-2xl px-4 py-3', msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'glass-card rounded-bl-md')}>{msg.role === 'user' ? <p className="text-sm whitespace-pre-wrap">{msg.content}</p> : <div className={cn('chat-content', msg.id === 's' && 'streaming-cursor')} dangerouslySetInnerHTML={{ __html: rm(msg.content || (msg.id === 's' ? '|' : '')) }}/>}</div>{msg.role === 'user' && <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center shrink-0 mt-0.5"><User className="w-4 h-4 text-white"/></div>}</div>)))}
      <div ref={er}/></div></div>
    <div className="border-t border-custom bg-card"><div className="max-w-3xl mx-auto px-4 py-3"><div className="flex items-end gap-2 glass-card rounded-2xl px-4 py-2"><textarea ref={tr} value={inp} onChange={e => si(e.target.value)} onKeyDown={okd} placeholder="Type a message... (Enter to send)" rows={1} className="flex-1 resize-none bg-transparent py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none max-h-[200px]" disabled={l}/>{l ? <button onClick={stp} className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center shrink-0"><Square className="w-4 h-4" fill="currentColor"/></button> : <button onClick={hs} disabled={!inp.trim()} className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white flex items-center justify-center shrink-0 transition-colors"><Send className="w-4 h-4"/></button>}</div><p className="text-center text-[10px] text-tertiary mt-2">AI responses may contain errors</p></div></div>
  </div>);
}
