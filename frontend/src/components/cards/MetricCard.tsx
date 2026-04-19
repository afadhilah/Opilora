import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/utils/formatters';

interface MetricCardProps {
  label: string;
  value: number;
  change?: number;
  changeLabel?: string;
  format?: 'number' | 'percentage' | 'compact';
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, change, changeLabel, format = 'number', icon, className = '' }: MetricCardProps) {
  const formattedValue = format === 'percentage' ? `${value.toFixed(1)}%` : formatNumber(value);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-surface-50 flex items-center justify-center text-surface-400">
            {icon}
          </div>
        )}
      </div>
      <div className="metric-value text-surface-900 tabular-nums">
        {formattedValue}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md ${
              isPositive
                ? 'text-emerald-700 bg-emerald-50'
                : isNegative
                ? 'text-red-700 bg-red-50'
                : 'text-surface-500 bg-surface-100'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {formatPercentage(change)}
          </span>
          {changeLabel && <span className="text-2xs text-surface-400">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
}
