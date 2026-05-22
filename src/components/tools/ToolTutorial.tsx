import { cn } from '@/lib/utils';

interface ToolTutorialProps {
  content: string;
  className?: string;
}

export function ToolTutorial({ content, className }: ToolTutorialProps) {
  return (
    <div className={cn('mb-10', className)} id="tutorial">
      <h2 className="text-xl font-bold text-gray-900 mb-6">使用教程</h2>
      <div className="glass-card p-6 sm:p-8">
        <div
          className="prose prose-gray max-w-none
            prose-headings:text-gray-900
            prose-h2:text-lg prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={markdownToHtml(content)}
        />
      </div>
    </div>
  );
}

function markdownToHtml(md: string): { __html: string } {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, '').replace(/```$/, '');
      return `<pre><code>${code}</code></pre>`;
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hupol])/gm, '<p>')
    .replace(/(?<![>])\n(?!<[\/]?[hupol])/g, '<br/>');

  html = '<p>' + html + '</p>';
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(\s*<[hu])/g, '$1');
  html = html.replace(/(<\/[hu][^>]*>)\s*<\/p>/g, '$1');

  return { __html: html };
}
