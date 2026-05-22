import { cn } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  hover?: boolean;
}

export function GlassCard({ href, hover = true, className, children, ...props }: GlassCardProps) {
  const classes = cn(
    'glass rounded-2xl p-6',
    hover && 'glass-hover',
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block cursor-pointer')}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
