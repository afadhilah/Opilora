import React from 'react';
import { ComparisonTable } from '@/components/widgets/ComparisonTable';

export function BenchmarkChart() {
  const headers = ['Topik', 'Mentions', 'Sentimen Avg', 'Engagement', 'Trend'];
  const rows = [
    ['Subsidi Energi', '4,520', '65%', '12.5K', '↑ Rising'],
    ['Transportasi Publik', '3,890', '38%', '9.8K', '↓ Falling'],
    ['Digitalisasi UMKM', '2,750', '82%', '7.2K', '↑ Rising'],
    ['Pariwisata Daerah', '2,140', '76%', '5.4K', '→ Stable'],
    ['Inflasi', '3,210', '32%', '11.1K', '↑ Rising'],
  ];
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Benchmark</h3>
      <p className="text-xs text-surface-400 mb-4">Perbandingan metrik antar topik</p>
      <ComparisonTable headers={headers} rows={rows} />
    </div>
  );
}
