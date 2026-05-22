'use client';

export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Square, Code2, Trash2, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROMPT = '你是AI编程助手，帮助用户解决编程问题。用中文回答，代码块标注语言。';
const SUGGESTIONS = ['用Python写一个学生成绩管理系统','解释什么是RESTful API','如何优化SQL查询性能','写一个React组件实现拖拽排序'];

export default function CodingPage() {
  const [messages, setMessages] = useState<{id:string;role:'user'|'assistant';content:string}[]>([]);
  const [input, setInput] = useState(''); const [isLoading, setIsLoading] = useState(false);
  const [streaming, setStreaming] = useState(''); const abortRef = useRef<AbortController|null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages, streaming]);
  const stop = useCallback(() => { abortRef.current?.abort(); setIsLoading(false); setStreaming(p => { if(p) setMessages(m => [...m,{id:Date.now().toString(),role:'assistant',content:p}]); return ''; }); }, []);
  const send = useCallback(async (content: string) => {
    const um={id:Date.now().toString(),role:'user' as const,content};const nm=[...messages,um];setMessages(nm);setIsLoading(true);setStreaming('');setInput('');
    const ctrl=new AbortController();abortRef.current=ctrl;
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'deepseek-chat',messages:[{role:'system',content:PROMPT},...nm.map(({role,content})=>({role,content}))]}),signal:ctrl.signal});
      if(!res.ok){const e=await res.json();setStreaming('Error: '+e.error);setIsLoading(false);return;}
      const reader=res.body?.getReader();if(!reader){setIsLoading(false);return;}const dec=new TextDecoder();let c='';
      while(true){const{done,value}=await reader.read();if(done)break;c+=dec.decode(value,{stream:true});setStreaming(c);}
      setMessages(p=>[...p,{id:(Date.now()+1).toString(),role:'assistant',content:c}]);setStreaming('');
    }catch(e){if(e instanceof Error&&e.name==='AbortError')return;setStreaming('Network error');}
    finally{setIsLoading(false);abortRef.current=null;}
  },[messages]);
  const disp=[...messages];if(streaming)disp.push({id:'s',role:'assistant' as const,content:streaming});
  return (<div className="flex flex-col h-[calc(100vh-4rem)]">
    <div className="flex items-center justify-between px-4 py-3 border-b border-custom bg-card"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><Code2 className="w-3.5 h-3.5 text-white"/></div><div><h2 className="text-sm font-semibold text-primary">AI编程助手</h2><p className="text-[10px] text-tertiary">帮助解决代码问题</p></div></div>{messages.length>0&&<button onClick={()=>{setMessages([]);setStreaming('');}} className="text-xs text-secondary hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded-lg"><Trash2 className="w-3 h-3"/>清空</button>}</div>
    <div className="flex-1 overflow-y-auto"><div className="max-w-3xl mx-auto px-4">{disp.length===0?(<div className="py-20 text-center"><div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mb-4"><Terminal className="w-8 h-8 text-emerald-600"/></div><h3 className="text-lg font-semibold text-primary mb-2">AI 编程助手</h3><p className="text-sm text-secondary mb-6">代码生成、Debug调试、算法讲解</p><div className="grid grid-cols-2 gap-2 max-w-md mx-auto">{SUGGESTIONS.map(q=>(<button key={q} onClick={()=>send(q)} disabled={isLoading} className="text-xs text-left px-3 py-2.5 rounded-xl glass-card text-secondary hover:text-primary transition-all disabled:opacity-50">{q}</button>))}</div></div>):disp.map(m=>(<div key={m.id} className={cn('flex gap-3 py-4',m.role==='user'?'justify-end':'')}>{m.role!=='user'&&<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0"><Code2 className="w-3.5 h-3.5 text-white"/></div>}<div className={cn('max-w-[80%] rounded-2xl px-4 py-3',m.role==='user'?'bg-emerald-600 text-white':'glass-card')}>{m.role==='user'?<p className="text-sm">{m.content}</p>:<div className="chat-content" dangerouslySetInnerHTML={{__html:rC(m.content||'')}}/>}</div>{m.role==='user'&&<div className="w-7 h-7 rounded-lg bg-gray-600 flex items-center justify-center shrink-0"><Terminal className="w-3.5 h-3.5 text-white"/></div>}</div>))}<div ref={endRef}/></div></div>
    <div className="border-t border-custom bg-card"><div className="max-w-3xl mx-auto px-4 py-3"><div className="flex items-end gap-2 glass-card rounded-2xl px-4 py-2"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();const t=input.trim();if(t&&!isLoading)send(t);}}} placeholder="描述你的编程问题..." rows={1} className="flex-1 resize-none bg-transparent py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none max-h-[200px]" disabled={isLoading}/>{isLoading?<button onClick={stop} className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center shrink-0"><Square className="w-4 h-4" fill="currentColor"/></button>:<button onClick={()=>{const t=input.trim();if(t)send(t);}} disabled={!input.trim()} className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 disabled:bg-gray-300"><Send className="w-4 h-4"/></button>}</div><p className="text-center text-[10px] text-tertiary mt-2">AI编程助手</p></div></div>
  </div>);
}
function rC(c:string){let h=c.replace(/```(\w*)\n([\s\S]*?)```/g,(_:string,l:string,code:string)=>`<div class="code-block"><div class="code-header">${l||'code'}</div><pre><code>${code.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre></div>`).replace(/`([^`]+)`/g,'<code class="inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/^\#{2,3} (.+)$/gm,'<h3>$1</h3>').replace(/^- (.+)$/gm,'<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g,'<ul>$1</ul>').split(/\n\n+/).map((b:string)=>{b=b.trim();if(!b)return'';if(/^<(h|ul|div|pre)/.test(b))return b;return`<p>${b.replace(/\n/g,'<br/>')}</p>`;}).join('\n');return h;}
