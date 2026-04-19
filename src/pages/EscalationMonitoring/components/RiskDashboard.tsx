import React from 'react';
import { RiskMeter } from '@/components/widgets/RiskMeter';
import { useAlertStore } from '@/store';

export function RiskDashboard() {
  const riskScore = useAlertStore((s) => s.overallRiskScore);
  const factors = [
    { name: 'volume', value: 68, label: 'Volume Velocity' },
    { name: 'sentiment', value: 42, label: 'Sentiment Shift' },
    { name: 'influencer', value: 55, label: 'Influencer Factor' },
    { name: 'crossPlatform', value: 38, label: 'Cross-Platform' },
    { name: 'media', value: 25, label: 'Media Coverage' },
    { name: 'engagement', value: 61, label: 'Engagement Rate' },
  ];
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Risk Score</h3>
      <p className="text-xs text-surface-400 mb-4">Skor eskalasi keseluruhan</p>
      <RiskMeter score={riskScore} factors={factors} />
    </div>
  );
}
