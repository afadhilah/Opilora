import React from 'react';
import { SentimentGauge } from '@/components/charts/SentimentGauge';

interface RiskMeterProps {
  score: number;
  factors: { name: string; value: number; label: string }[];
}

export function RiskMeter({ score, factors }: RiskMeterProps) {
  return (
    <div className="flex flex-col items-center">
      <SentimentGauge score={score} size={180} />
      <div className="w-full mt-6 space-y-2">
        {factors.map((f) => (
          <div key={f.name} className="flex items-center gap-3">
            <span className="text-xs text-surface-500 w-28 truncate">{f.label}</span>
            <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${f.value}%`,
                  backgroundColor: f.value > 70 ? '#ef4444' : f.value > 40 ? '#f59e0b' : '#10b981',
                }}
              />
            </div>
            <span className="text-xs font-medium text-surface-700 tabular-nums w-8 text-right">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
