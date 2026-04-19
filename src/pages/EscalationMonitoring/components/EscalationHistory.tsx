import React from 'react';
import { AlertTimeline } from '@/components/widgets/AlertTimeline';
import { useAlertStore } from '@/store';

export function EscalationHistory() {
  const alerts = useAlertStore((s) => s.alerts);
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Riwayat Eskalasi</h3>
      <p className="text-xs text-surface-400 mb-4">Semua alert yang tercatat</p>
      <AlertTimeline alerts={alerts} />
    </div>
  );
}
