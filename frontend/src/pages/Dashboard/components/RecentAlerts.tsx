import React from 'react';
import { AlertTimeline } from '@/components/widgets/AlertTimeline';
import { useAlertStore } from '@/store';

export function RecentAlerts() {
  const alerts = useAlertStore((s) => s.alerts);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-surface-900">Alert Terbaru</h3>
          <p className="text-xs text-surface-400 mt-0.5">{alerts.filter(a => !a.isResolved).length} alert aktif</p>
        </div>
        <button className="text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors">
          Lihat Semua →
        </button>
      </div>
      <AlertTimeline alerts={alerts.slice(0, 4)} />
    </div>
  );
}
