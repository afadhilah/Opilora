import React from 'react';
import { MessageCircle, TrendingUp, Hash, Shield } from 'lucide-react';
import { MetricCard } from '@/components/cards/MetricCard';
import { useDashboardStore } from '@/store';

export function QuickStats() {
  const { totalMentions, avgSentiment, activeTopics, riskScore } = useDashboardStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
      <MetricCard
        label="Total Mentions"
        value={totalMentions}
        change={12.5}
        changeLabel="vs 7 hari lalu"
        icon={<MessageCircle className="w-5 h-5" />}
      />
      <MetricCard
        label="Rata-rata Sentimen"
        value={avgSentiment}
        format="percentage"
        change={3.2}
        changeLabel="vs kemarin"
        icon={<TrendingUp className="w-5 h-5" />}
      />
      <MetricCard
        label="Topik Aktif"
        value={activeTopics}
        change={2}
        changeLabel="topik baru"
        icon={<Hash className="w-5 h-5" />}
      />
      <MetricCard
        label="Risk Score"
        value={riskScore}
        change={-5.1}
        changeLabel="membaik"
        icon={<Shield className="w-5 h-5" />}
      />
    </div>
  );
}
