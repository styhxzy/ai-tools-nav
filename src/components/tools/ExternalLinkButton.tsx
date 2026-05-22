import { ExternalLink } from 'lucide-react';

interface ExternalLinkButtonProps {
  href: string;
}

export function ExternalLinkButton({ href }: ExternalLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white gradient-bg rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-blue-500/25"
    >
      访问官网
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
