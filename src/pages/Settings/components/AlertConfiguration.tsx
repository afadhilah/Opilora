import React from 'react';

export function AlertConfiguration() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Konfigurasi Alert</h3>
      <p className="text-xs text-surface-400 mb-4">Atur threshold dan channel notifikasi</p>
      <div className="space-y-4">
        {['Volume Spike', 'Sentiment Shift', 'Escalation Warning', 'Influencer Mention'].map((alert) => (
          <div key={alert} className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
            <span className="text-sm text-surface-700">{alert}</span>
            <label className="relative inline-flex cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-surface-300 peer-checked:bg-brand-600 rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-4" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
