import { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: { default: `AI 助手 | ${SITE.name}`, template: `%s | ${SITE.name}` },
  robots: { index: false, follow: true },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
