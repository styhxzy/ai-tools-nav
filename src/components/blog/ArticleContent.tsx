interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article
      className="prose prose-gray max-w-none
        prose-headings:text-gray-900 prose-headings:scroll-mt-24
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-li:text-gray-600 prose-li:leading-relaxed
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-lg
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
        prose-img:rounded-2xl prose-img:shadow-lg
        prose-hr:border-gray-100
      "
    >
      {renderMarkdown(content)}
    </article>
  );
}

function renderMarkdown(md: string) {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^\w一-鿿\s]/g, '').replace(/\s+/g, '-');
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')

    // Inline formatting
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul class="list-disc pl-6 my-4 space-y-1">$1</ul>')

    // Code blocks
    .replace(/```(?:\w+)?\n([\s\S]*?)```/g,
      '<pre><code>$1</code></pre>')

    // Paragraphs (split on double newlines)
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<ul') ||
          block.startsWith('<pre') || block.startsWith('<ol')) {
        return block;
      }
      // Handle single newlines within paragraph
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
