import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  className = '',
}: DateRangePickerProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          className="h-9 pl-8 pr-3 text-sm bg-white border border-surface-200 rounded-lg text-surface-700 hover:border-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>
      <span className="text-surface-400 text-sm">—</span>
      <div className="relative">
        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          className="h-9 pl-8 pr-3 text-sm bg-white border border-surface-200 rounded-lg text-surface-700 hover:border-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
        />
      </div>
    </div>
  );
}
