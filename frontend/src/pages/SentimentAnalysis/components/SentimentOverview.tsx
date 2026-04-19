import React from 'react';
import { SentimentDonut } from '@/components/charts/SentimentDonut';
import { TrendLine } from '@/components/charts/TrendLine';
import { useSentimentStore } from '@/store';

export function SentimentOverview() {
  const { distribution, timeline } = useSentimentStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-surface-900 mb-1">Distribusi Sentimen</h3>
        <p className="text-xs text-surface-400 mb-2">Proporsi keseluruhan</p>
        <SentimentDonut data={distribution} centerValue="42.3%" centerLabel="positif" />
        <div className="space-y-2 mt-4">
          {distribution.map((d) => (
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
      <div className="lg:col-span-2 card p-5">
        <h3 className="text-sm font-semibold text-surface-900 mb-1">Tren Sentimen</h3>
        <p className="text-xs text-surface-400 mb-4">30 hari terakhir</p>
        <TrendLine
          data={timeline}
          lines={[
            { dataKey: 'positive', label: 'Positif', color: '#10b981' },
            { dataKey: 'negative', label: 'Negatif', color: '#ef4444' },
            { dataKey: 'neutral', label: 'Netral', color: '#94a3b8' },
          ]}
        />
      </div>
    </div>
  );
}
