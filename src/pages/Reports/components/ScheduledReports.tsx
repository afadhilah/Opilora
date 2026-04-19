import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const reports = [
  { id: '1', name: 'Weekly Report — 7-13 Apr', date: '14 Apr 2026', status: 'completed', type: 'Mingguan' },
  { id: '2', name: 'Monthly Report — Maret 2026', date: '1 Apr 2026', status: 'completed', type: 'Bulanan' },
  { id: '3', name: 'Daily Digest — 18 Apr', date: '18 Apr 2026', status: 'scheduled', type: 'Harian' },
  { id: '4', name: 'Weekly Report — 14-20 Apr', date: '21 Apr 2026', status: 'scheduled', type: 'Mingguan' },
];

export function ScheduledReports() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Laporan Terjadwal</h3>
      <p className="text-xs text-surface-400 mb-4">Report otomatis yang sudah dikonfigurasi</p>
      <div className="space-y-2">
        {reports.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 transition-colors">
            <div className="flex items-center gap-3">
              {r.status === 'completed' ? (
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              ) : (
                <Clock className="w-4 h-4 text-amber-500" />
              )}
              <div>
                <span className="text-sm font-medium text-surface-900">{r.name}</span>
                <span className="text-2xs text-surface-400 ml-2">{r.date}</span>
              </div>
            </div>
            <Badge variant={r.status === 'completed' ? 'positive' : 'warning'} size="sm">
              {r.status === 'completed' ? 'Selesai' : 'Terjadwal'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
