import React from 'react';
import { SentimentDonut } from '@/components/charts/SentimentDonut';

export function CompetitorAnalysis() {
  const data = [
    { name: 'Subsidi Energi', value: 35, color: '#3b6bfa' },
    { name: 'Transportasi', value: 25, color: '#ef4444' },
    { name: 'Inflasi', value: 20, color: '#f59e0b' },
    { name: 'UMKM Digital', value: 12, color: '#10b981' },
    { name: 'Lainnya', value: 8, color: '#94a3b8' },
  ];
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Share of Voice</h3>
      <p className="text-xs text-surface-400 mb-2">Proporsi volume per topik</p>
      <SentimentDonut data={data} centerValue="100%" centerLabel="total" />
      <div className="space-y-2 mt-4">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-surface-600">{d.name}</span>
            </div>
            <span className="text-xs font-medium text-surface-900 tabular-nums">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
