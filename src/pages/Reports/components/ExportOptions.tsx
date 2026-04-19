import React from 'react';
import { Button } from '@/components/ui/Button';
import { FileText, Sheet, FileSpreadsheet } from 'lucide-react';

export function ExportOptions() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Export Data</h3>
      <p className="text-xs text-surface-400 mb-4">Unduh data dalam berbagai format</p>
      <div className="space-y-2">
        <Button variant="secondary" className="w-full justify-start" icon={<FileText className="w-4 h-4" />}>Export PDF</Button>
        <Button variant="secondary" className="w-full justify-start" icon={<FileSpreadsheet className="w-4 h-4" />}>Export Excel</Button>
        <Button variant="secondary" className="w-full justify-start" icon={<Sheet className="w-4 h-4" />}>Export CSV</Button>
      </div>
    </div>
  );
}
