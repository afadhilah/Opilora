import React from 'react';
import { TrendLine } from '@/components/charts/TrendLine';
import { useAlertStore } from '@/store';

export function PredictionGraph() {
  const predictions = useAlertStore((s) => s.predictions);
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Prediksi Eskalasi</h3>
      <p className="text-xs text-surface-400 mb-4">Proyeksi risk score 48 jam ke depan</p>
      <TrendLine
        data={predictions}
        lines={[
          { dataKey: 'predicted', label: 'Prediksi', color: '#3b6bfa' },
          { dataKey: 'actual', label: 'Aktual', color: '#10b981' },
        ]}
      />
    </div>
  );
}
