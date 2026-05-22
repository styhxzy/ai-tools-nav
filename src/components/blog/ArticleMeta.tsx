import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/shared/Badge';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticleMetaProps {
  author: string;
  date: string;
  readingTime: number;
  tags: string[];
}

export function ArticleMeta({ author, date, readingTime, tags }: ArticleMetaProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatDate(date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {readingTime} 分钟阅读
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((tag) => (
          <Badge key={tag} variant="primary" size="sm">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
