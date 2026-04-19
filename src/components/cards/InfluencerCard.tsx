import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface InfluencerCardProps {
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  sentiment: number;
  mentions: number;
  verified: boolean;
  rank: number;
}

export function InfluencerCard({ name, handle, platform, followers, engagementRate, sentiment, mentions, verified, rank }: InfluencerCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-surface-200 bg-white hover:border-surface-300 hover:shadow-soft transition-all">
      <span className="w-6 text-center text-xs font-semibold text-surface-400">#{rank}</span>
      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-sm font-bold text-brand-600">
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-surface-900 truncate">{name}</span>
          {verified && <BadgeCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />}
        </div>
        <span className="text-2xs text-surface-400">@{handle} · {platform}</span>
      </div>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-xs font-semibold text-surface-900 tabular-nums">{formatNumber(followers)}</div>
          <div className="text-2xs text-surface-400">Followers</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-surface-900 tabular-nums">{engagementRate.toFixed(1)}%</div>
          <div className="text-2xs text-surface-400">Engagement</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-surface-900 tabular-nums">{mentions}</div>
          <div className="text-2xs text-surface-400">Mentions</div>
        </div>
      </div>
    </div>
  );
}
