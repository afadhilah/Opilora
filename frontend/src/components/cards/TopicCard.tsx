import React from 'react';
import { TrendingUp, TrendingDown, Minus, Hash } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface TopicCardProps {
  name: string;
  mentions: number;
  sentiment: number;
  trend: 'rising' | 'falling' | 'stable';
  keywords: string[];
  color?: string;
  onClick?: () => void;
}

export function TopicCard({ name, mentions, sentiment, trend, keywords, color = '#3b6bfa', onClick }: TopicCardProps) {
  const trendIcon = trend === 'rising' ? TrendingUp : trend === 'falling' ? TrendingDown : Minus;
  const TrendIcon = trendIcon;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-surface-200 bg-white hover:border-surface-300 hover:shadow-soft transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
            <Hash className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-sm font-semibold text-surface-900">{name}</span>
        </div>
        <TrendIcon
          className={`w-4 h-4 ${
            trend === 'rising' ? 'text-emerald-500' : trend === 'falling' ? 'text-red-500' : 'text-surface-400'
          }`}
        />
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div>
          <div className="text-lg font-bold text-surface-900 tabular-nums">{formatNumber(mentions)}</div>
          <div className="text-2xs text-surface-400">mention</div>
        </div>
        <div className="h-8 w-px bg-surface-100" />
        <div>
          <div className="text-lg font-bold text-surface-900 tabular-nums">{(sentiment * 100).toFixed(0)}%</div>
          <div className="text-2xs text-surface-400">positif</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {keywords.slice(0, 4).map((kw) => (
          <span key={kw} className="text-2xs px-2 py-0.5 rounded-full bg-surface-100 text-surface-500">
            {kw}
          </span>
        ))}
      </div>
    </button>
  );
}
