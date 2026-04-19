import React from 'react';
import { MetricCard } from '@/components/cards/MetricCard';
import { Users, Eye, MessageCircle } from 'lucide-react';

export function ReachEstimation() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard label="Total Reach" value={11200000} change={8.4} changeLabel="vs minggu lalu" icon={<Eye className="w-5 h-5" />} />
      <MetricCard label="Total Influencer" value={47} change={5} changeLabel="baru" icon={<Users className="w-5 h-5" />} />
      <MetricCard label="Avg Engagement" value={4.6} format="percentage" change={0.3} changeLabel="improvement" icon={<MessageCircle className="w-5 h-5" />} />
    </div>
  );
}
