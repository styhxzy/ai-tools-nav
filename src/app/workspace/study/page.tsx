'use client';
import { GraduationCap, Send, BookOpen } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
const P='你是AI学习助手。帮助大学生高效学习。提供知识讲解、复习计划、题目解答和学习方法。用中文，表达清晰易理解。';
const Q=['解释机器学习的监督学习与无监督学习','制定30天英语四级复习计划','用费曼学习法讲解量子计算','如何高效记笔记'];

export default function StudyPage() {
  const [ms,sm]=useState<{id:string;role:'user'|'assistant';content:string}[]>([]);const [inp,si]=useState('');const [l,sl]=useState(false);const [sc,ssc]=useState('');
  const ar=useRef<AbortController|null>(null);const er=useRef<HTMLDivElement>(null);
  const stp=useCallback(()=>{ar.current?.abort();sl(false);ssc(p=>{if(p)sm(m=>[...m,{id:Date.now().toString(),role:'assistant',content:p}]);return'';});},[]);
  const snd=useCallback(async(c:string)=>{const um={id:Date.now().toString(),role:'user' as const,content:c};const nm=[...ms,um];sm(nm);sl(true);ssc('');si('');
    const ctrl=new AbortController();ar.current=ctrl;
    try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'system',content:P},...nm.map(({role,content})=>({role,content}))]}),signal:ctrl.signal});
    if(!r.ok){ssc('Error');sl(false);return;}const reader=r.body?.getReader();if(!reader){sl(false);return;}const d=new TextDecoder();let ct='';
    while(true){const{done,value}=await reader.read();if(done)break;ct+=d.decode(value,{stream:true});ssc(ct);}
    sm(p=>[...p,{id:(Date.now()+1).toString(),role:'assistant',content:ct}]);ssc('');}catch(e){if(e instanceof Error&&e.name==='AbortError')return;}
    finally{sl(false);ar.current=null;}},[ms]);
  const dp=[...ms];if(sc)dp.push({id:'s',role:'assistant' as const,content:sc});
  return (<div className="flex flex-col h-screen">
    <div className="px-6 py-3 border-b border-custom bg-card/80 flex items-center gap-3"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-white"/></div><div><h1 className="text-sm font-semibold text-primary">学习室</h1><p className="text-[10px] text-tertiary">知识讲解/复习计划/题目解答</p></div></div>
    <div className="flex-1 overflow-y-auto"><div className="max-w-3xl mx-auto px-6">{dp.length===0?(<div className="py-20 text-center"><div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/10 flex items-center justify-center mb-4"><BookOpen className="w-8 h-8 text-rose-500"/></div><h2 className="text-xl font-bold text-primary mb-2">学习室</h2><p className="text-secondary text-sm mb-6">AI辅导——知识讲解、复习计划、学习建议</p><div className="grid grid-cols-2 gap-2 max-w-md mx-auto">{Q.map(q=>(<button key={q} onClick={()=>snd(q)} disabled={l} className="text-xs text-left px-3 py-2.5 rounded-xl glass-card text-secondary hover:text-primary disabled:opacity-50">{q}</button>))}</div></div>):dp.map(m=>(<div key={m.id} className={cn('flex gap-3 py-5',m.role==='user'?'justify-end':'')}>{m.role!=='user'&&<div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0"><GraduationCap className="w-4 h-4 text-rose-500"/></div>}<div className={cn('max-w-[80%] rounded-2xl px-4 py-3',m.role==='user'?'bg-rose-600 text-white':'glass-card')}>{m.role==='user'?<p className="text-sm">{m.content}</p>:<div className="chat-content" dangerouslySetInnerHTML={{__html:rm(m.content)}}/>}</div></div>))}<div ref={er}/></div></div>
    <div className="border-t border-custom bg-card/80 px-6 py-4"><div className="max-w-3xl mx-auto"><div className="flex items-end gap-2 glass-card rounded-2xl px-4 py-2.5"><textarea value={inp} onChange={e=>si(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();const t=inp.trim();if(t&&!l)snd(t);}}} placeholder="想学什么？" rows={1} className="flex-1 resize-none bg-transparent py-2 text-sm text-primary placeholder:text-tertiary focus:outline-none max-h-[200px]" disabled={l}/>{l?<button onClick={stp} className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0"><BookOpen className="w-4 h-4"/></button>:<button onClick={()=>{const t=inp.trim();if(t)snd(t);}} disabled={!inp.trim()} className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 disabled:opacity-30"><Send className="w-4 h-4"/></button>}</div></div></div>
  </div>);
}
function rm(c:string):string{return c.replace(/```(\w*)\n([\s\S]*?)```/g,(_:string,l:string,cd:string)=>`<div class="code-block"><div class="code-header">${l||'code'}</div><pre><code>${cd.trim().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre></div>`).replace(/`([^`]+)`/g,'<code class="inline-code">$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/^\#{2,3} (.+)$/gm,'<h3>$1</h3>').replace(/^- (.+)$/gm,'<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g,'<ul>$1</ul>').split(/\n\n+/).map(b=>{b=b.trim();if(!b)return'';if(/^<(h|ul|div|pre)/.test(b))return b;return`<p>${b.replace(/\n/g,'<br/>')}</p>`;}).join('\n');}
