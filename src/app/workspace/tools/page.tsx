'use client';
import { Wrench, ExternalLink } from 'lucide-react';

const TOOLS = [
  { name: 'DeepSeek Chat', url: 'https://chat.deepseek.com', desc: '国产顶尖AI对话，免费使用' },
  { name: 'Kimi Chat', url: 'https://kimi.moonshot.cn', desc: '200万字超长上下文' },
  { name: '豆包', url: 'https://www.doubao.com', desc: '字节跳动AI助手' },
  { name: '通义千问', url: 'https://tongyi.aliyun.com', desc: '阿里云AI大模型' },
  { name: '智谱清言', url: 'https://chatglm.cn', desc: '清华系AI对话平台' },
  { name: 'Cursor', url: 'https://cursor.sh', desc: 'AI原生代码编辑器' },
  { name: 'Gamma', url: 'https://gamma.app', desc: 'AI一键生成PPT' },
  { name: '剪映', url: 'https://www.capcut.cn', desc: 'AI视频编辑工具' },
];

export default function ToolsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-cyan-500" />
          </div>
          <h1 className="text-2xl font-bold text-primary">工具集</h1>
        </div>
        <p className="text-secondary">精选AI工具，一键直达使用</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool, i) => (
          <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
            className="glass-card p-5 group animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm text-primary group-hover:text-accent transition-colors">{tool.name}</h3>
              <ExternalLink className="w-4 h-4 text-tertiary group-hover:text-accent transition-colors shrink-0" />
            </div>
            <p className="text-xs text-secondary">{tool.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
