import React from 'react';
import { PostCard } from '@/components/cards/PostCard';
import { useDashboardStore } from '@/store';

export function TopPosts() {
  const mentions = useDashboardStore((s) => s.mentions);
  const positive = mentions.filter(m => m.sentiment === 'positive').slice(0, 2);
  const negative = mentions.filter(m => m.sentiment === 'negative').slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-emerald-700 mb-3">🟢 Paling Positif</h3>
        <div className="space-y-3">
          {positive.map(m => <PostCard key={m.id} {...m} />)}
        </div>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-red-700 mb-3">🔴 Paling Negatif</h3>
        <div className="space-y-3">
          {negative.map(m => <PostCard key={m.id} {...m} />)}
        </div>
      </div>
    </div>
  );
}
