import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'AI Workspace - 中国AI效率工作台', template: '%s | AI Workspace' },
  description: '集成国产AI大模型，一个工作台完成写作、编程、PPT、学习。支持DeepSeek、Kimi、豆包、通义千问。',
  keywords: ['AI工作台', 'DeepSeek', 'Kimi', 'AI写作', 'AI编程', '国产AI'],
  metadataBase: new URL('https://ai-workspace.cn'),
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
