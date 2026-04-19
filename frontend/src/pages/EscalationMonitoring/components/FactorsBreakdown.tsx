import React from 'react';
import { GeographicHeatmap } from '@/components/charts/GeographicHeatmap';

const factorsData = [
  { name: 'Volume Velocity', value: 68, color: '#3b6bfa' },
  { name: 'Sentiment Shift', value: 42, color: '#ef4444' },
  { name: 'Influencer Factor', value: 55, color: '#f59e0b' },
  { name: 'Cross-Platform', value: 38, color: '#8b5cf6' },
  { name: 'Media Coverage', value: 25, color: '#10b981' },
  { name: 'Engagement Rate', value: 61, color: '#ec4899' },
];

export function FactorsBreakdown() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Faktor Kontribusi</h3>
      <p className="text-xs text-surface-400 mb-4">Kontribusi setiap faktor terhadap risk score</p>
      <GeographicHeatmap data={factorsData} height={280} />
    </div>
  );
}
