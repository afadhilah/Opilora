import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'Tidak ada data',
  description = 'Data belum tersedia untuk ditampilkan.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-6 h-6 text-surface-400" />}
      </div>
      <h3 className="text-sm font-semibold text-surface-800 mb-1">{title}</h3>
      <p className="text-xs text-surface-500 max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}
