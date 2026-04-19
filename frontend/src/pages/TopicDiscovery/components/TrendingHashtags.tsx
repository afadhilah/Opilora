import React from 'react';
import { TrendingKeywords as TrendingKeywordsWidget } from '@/components/widgets/TrendingKeywords';
import { useTopicStore } from '@/store';

export function TrendingHashtags() {
  const trendingKeywords = useTopicStore((s) => s.trendingKeywords);
  const formatted = trendingKeywords.map(k => ({ keyword: k.keyword, count: k.count, change: k.change }));
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Trending Keywords</h3>
      <p className="text-xs text-surface-400 mb-4">Top 10 keyword berdasarkan volume</p>
      <TrendingKeywordsWidget keywords={formatted} />
    </div>
  );
}
