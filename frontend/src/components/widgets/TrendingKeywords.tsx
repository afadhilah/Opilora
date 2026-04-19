import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface TrendingKeywordsProps {
  keywords: { keyword: string; count: number; change: number }[];
}

export function TrendingKeywords({ keywords }: TrendingKeywordsProps) {
  const maxCount = Math.max(...keywords.map(k => k.count));

  return (
    <div className="space-y-2">
      {keywords.map((kw, i) => (
        <div key={kw.keyword} className="flex items-center gap-3 group">
          <span className="w-5 text-right text-2xs font-medium text-surface-400 tabular-nums">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-surface-800 truncate">{kw.keyword}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-surface-500 tabular-nums">{formatNumber(kw.count)}</span>
                {kw.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : kw.change < 0 ? (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                ) : (
                  <Minus className="w-3 h-3 text-surface-400" />
                )}
              </div>
            </div>
            <div className="h-1 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-500"
                style={{ width: `${(kw.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
