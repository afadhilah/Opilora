import React from 'react';
import { TrendLine } from '@/components/charts/TrendLine';

const mockData = Array.from({ length: 14 }, (_, i) => ({
  time: `${i + 1}/4`,
  'Subsidi Energi': 800 + Math.floor(Math.random() * 400),
  'Transportasi': 600 + Math.floor(Math.random() * 300),
  'Inflasi': 400 + Math.floor(Math.random() * 200),
}));

export function TopicEvolution() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Evolusi Topik</h3>
      <p className="text-xs text-surface-400 mb-4">Perubahan volume topik dari waktu ke waktu</p>
      <TrendLine
        data={mockData}
        lines={[
          { dataKey: 'Subsidi Energi', label: 'Subsidi Energi', color: '#3b6bfa' },
          { dataKey: 'Transportasi', label: 'Transportasi', color: '#ef4444' },
          { dataKey: 'Inflasi', label: 'Inflasi', color: '#f59e0b' },
        ]}
      />
    </div>
  );
}
