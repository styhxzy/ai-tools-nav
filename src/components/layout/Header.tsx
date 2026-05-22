'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, User } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { MobileNav } from './MobileNav';
import { SearchCommand } from './SearchCommand';
import { ThemeToggle } from './ThemeToggle';

function useClerkSafe() {
  try {
    return useAuth();
  } catch {
    return { isSignedIn: false };
  }
}

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useClerkSafe();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-custom">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-primary">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center"><span className="text-white text-sm font-bold">AI</span></div>
              {SITE.name}
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => <Link key={link.href} href={link.href} className="px-4 py-2 rounded-lg text-sm font-medium text-secondary">{link.label}</Link>)}
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/20 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-gray-900 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              {SITE.name}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-50/80 rounded-lg border border-gray-200/50 hover:border-gray-300 hover:text-gray-700 transition-all"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">搜索工具...</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-gray-400 bg-gray-100 rounded font-mono">
                  Ctrl+K
                </kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="搜索"
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeToggle />
              {/* User */}
              <div className="flex items-center">
                {isSignedIn ? (
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 rounded-lg',
                        userButtonPopoverCard: 'shadow-xl border border-gray-100',
                      },
                    }}
                  />
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">登录</span>
                  </Link>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="菜单"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
