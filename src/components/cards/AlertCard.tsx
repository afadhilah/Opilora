import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatRelative } from '@/utils/formatters';
import type { RiskLevel } from '@/types/escalation.types';

interface AlertCardProps {
  title: string;
  description: string;
  riskLevel: RiskLevel;
  timestamp: string;
  topic?: string;
  isResolved?: boolean;
  onClick?: () => void;
}

const riskIcons: Record<RiskLevel, typeof AlertTriangle> = {
  critical: AlertCircle,
  high: AlertTriangle,
  medium: Info,
  low: CheckCircle,
};

const riskBadgeVariant: Record<RiskLevel, 'negative' | 'warning' | 'info' | 'positive'> = {
  critical: 'negative',
  high: 'negative',
  medium: 'warning',
  low: 'positive',
};

export function AlertCard({ title, description, riskLevel, timestamp, topic, isResolved, onClick }: AlertCardProps) {
  const Icon = riskIcons[riskLevel];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all hover:shadow-soft group ${
        isResolved
          ? 'bg-surface-50 border-surface-200 opacity-60'
          : 'bg-white border-surface-200 hover:border-surface-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-1.5 rounded-lg ${
          riskLevel === 'critical' || riskLevel === 'high' ? 'bg-red-50' : riskLevel === 'medium' ? 'bg-amber-50' : 'bg-emerald-50'
        }`}>
          <Icon className={`w-4 h-4 ${
            riskLevel === 'critical' || riskLevel === 'high' ? 'text-red-500' : riskLevel === 'medium' ? 'text-amber-500' : 'text-emerald-500'
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-surface-900 truncate">{title}</span>
            <Badge variant={riskBadgeVariant[riskLevel]} size="sm" dot>{riskLevel}</Badge>
          </div>
          <p className="text-xs text-surface-500 truncate-2 mb-2">{description}</p>
          <div className="flex items-center gap-3 text-2xs text-surface-400">
            <span>{formatRelative(timestamp)}</span>
            {topic && <span className="text-surface-300">·</span>}
            {topic && <span>{topic}</span>}
          </div>
        </div>
      </div>
    </button>
  );
}
