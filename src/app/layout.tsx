import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ClerkProviderWrapper } from '@/components/layout/ClerkProviderWrapper';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/shared/BackToTop';
import { SITE } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.description.slice(0, 30)}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['AI工具', '人工智能', '效率工具', '大学生', 'AI写作', 'AI编程', 'AI绘画', 'AI英语', 'AI PPT'],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSansSC.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider>
          <ClerkProviderWrapper>
            <div className="flex flex-col min-h-screen bg-surface text-primary transition-colors duration-300">
              <Header />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
              <BackToTop />
            </div>
          </ClerkProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
