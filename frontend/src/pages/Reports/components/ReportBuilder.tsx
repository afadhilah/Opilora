import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { DateRangePicker } from '@/components/ui/DateRangePicker';

export function ReportBuilder() {
  const [topic, setTopic] = useState('all');
  const [startDate, setStartDate] = useState('2026-04-01');
  const [endDate, setEndDate] = useState('2026-04-19');
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Buat Laporan</h3>
      <p className="text-xs text-surface-400 mb-5">Konfigurasi parameter laporan</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-surface-600 mb-1.5 block">Topik</label>
          <Select value={topic} onChange={setTopic} options={[
            { label: 'Semua Topik', value: 'all' },
            { label: 'Subsidi Energi', value: 'subsidi' },
            { label: 'Transportasi Publik', value: 'transportasi' },
            { label: 'Digitalisasi UMKM', value: 'umkm' },
          ]} className="max-w-xs" />
        </div>
        <div>
          <label className="text-xs font-medium text-surface-600 mb-1.5 block">Rentang Tanggal</label>
          <DateRangePicker startDate={startDate} endDate={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
        </div>
        <div className="pt-2">
          <Button variant="primary">Generate Laporan</Button>
        </div>
      </div>
    </div>
  );
}
