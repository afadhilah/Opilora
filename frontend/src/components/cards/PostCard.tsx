import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatRelative, formatNumber } from '@/utils/formatters';
import { PLATFORMS } from '@/utils/constants';
import type { SentimentType } from '@/types/sentiment.types';
import type { Platform } from '@/types';

interface PostCardProps {
  text: string;
  author: string;
  platform: Platform;
  sentiment: SentimentType;
  timestamp: string;
  engagement: { likes: number; shares: number; comments: number };
}

const sentimentVariant: Record<SentimentType, 'positive' | 'negative' | 'neutral' | 'warning'> = {
  positive: 'positive',
  negative: 'negative',
  neutral: 'neutral',
  mixed: 'warning',
};

export function PostCard({ text, author, platform, sentiment, timestamp, engagement }: PostCardProps) {
  const platformInfo = PLATFORMS[platform];

  return (
    <div className="p-4 rounded-xl border border-surface-200 bg-white hover:border-surface-300 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-surface-100 flex items-center justify-center text-xs font-semibold text-surface-600">
            {author.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-sm font-medium text-surface-900">{author}</span>
            <span className="text-2xs text-surface-400 ml-2">{formatRelative(timestamp)}</span>
          </div>
        </div>
        <Badge variant={sentimentVariant[sentiment]} size="sm" dot>
          {sentiment}
        </Badge>
      </div>
      <p className="text-sm text-surface-700 mb-3 leading-relaxed">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-2xs text-surface-400">
          <span>{formatNumber(engagement.likes)} likes</span>
          <span>{formatNumber(engagement.shares)} shares</span>
          <span>{formatNumber(engagement.comments)} komentar</span>
        </div>
        <span
          className="text-2xs font-medium px-2 py-0.5 rounded-full"
          style={{ color: platformInfo.color, backgroundColor: `${platformInfo.color}10` }}
        >
          {platformInfo.label}
        </span>
      </div>
    </div>
  );
}
