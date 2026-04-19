import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatRelative } from '@/utils/formatters';
import { PLATFORMS } from '@/utils/constants';
import type { Mention } from '@/types';
import type { SentimentType } from '@/types/sentiment.types';

interface LiveFeedProps {
  mentions: Mention[];
  maxItems?: number;
}

const sentimentVariant = {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
  mixed: 'warning',
} as const;

type BadgeVariant = 'positive' | 'negative' | 'neutral' | 'warning' | 'info' | 'default';

export function LiveFeed({ mentions, maxItems = 8 }: LiveFeedProps) {
  return (
    <div className="space-y-1">
      {mentions.slice(0, maxItems).map((mention, i) => {
        const platform = PLATFORMS[mention.platform];
        return (
          <div
            key={mention.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-50 transition-colors animate-slide-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: platform?.color || '#6366f1' }}
            >
              {mention.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-surface-900 truncate">{mention.author}</span>
                <Badge variant={(sentimentVariant[mention.sentiment] || 'neutral') as BadgeVariant} size="sm">
                  {mention.sentiment}
                </Badge>
              </div>
              <p className="text-xs text-surface-600 truncate-2 leading-relaxed">{mention.text}</p>
              <div className="flex items-center gap-2 mt-1.5 text-2xs text-surface-400">
                <span style={{ color: platform?.color }}>{platform?.label}</span>
                <span>·</span>
                <span>{formatRelative(mention.timestamp)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
