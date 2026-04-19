import React from 'react';

export function UserPreferences() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Preferensi</h3>
      <p className="text-xs text-surface-400 mb-4">Pengaturan tampilan dan bahasa</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-surface-600 mb-1.5 block">Bahasa</label>
          <select className="h-9 px-3 text-sm bg-white border border-surface-200 rounded-lg" defaultValue="id">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-surface-600 mb-1.5 block">Zona Waktu</label>
          <select className="h-9 px-3 text-sm bg-white border border-surface-200 rounded-lg" defaultValue="wib">
            <option value="wib">WIB (UTC+7)</option>
            <option value="wita">WITA (UTC+8)</option>
            <option value="wit">WIT (UTC+9)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
