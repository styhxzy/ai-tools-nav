import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <ol
        className="flex items-center gap-1.5 text-sm text-gray-500"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only" itemProp="name">首页</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-900 font-medium" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={`${i + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
