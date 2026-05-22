import { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `AI 聊天助手 | ${SITE.name}`,
  description: '基于DeepSeek大模型的AI聊天助手，支持写作、翻译、代码、学习辅导等场景。',
  alternates: { canonical: `${SITE.url}/chat` },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
