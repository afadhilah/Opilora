import React from 'react';

interface SentimentGaugeProps {
  score: number;
  size?: number;
}

export function SentimentGauge({ score, size = 160 }: SentimentGaugeProps) {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const angle = (normalizedScore / 100) * 180 - 90;
  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.55;

  const getColor = () => {
    if (normalizedScore >= 70) return '#10b981';
    if (normalizedScore >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = () => {
    if (normalizedScore >= 70) return 'Positif';
    if (normalizedScore >= 40) return 'Netral';
    return 'Negatif';
  };

  const arcPath = (startAngle: number, endAngle: number, r: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const needleRad = (angle) * (Math.PI / 180);
  const needleLen = radius * 0.72;
  const nx = cx + needleLen * Math.cos(needleRad);
  const ny = cy + needleLen * Math.sin(needleRad);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        <path d={arcPath(-90, 90, radius)} fill="none" stroke="#e2e8f0" strokeWidth={12} strokeLinecap="round" />
        <path d={arcPath(-90, -90 + (normalizedScore / 100) * 180, radius)} fill="none" stroke={getColor()} strokeWidth={12} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#0f172a" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill="#0f172a" />
      </svg>
      <div className="text-center -mt-1">
        <span className="text-2xl font-bold text-surface-900 font-display tabular-nums">{normalizedScore}</span>
        <span className="text-sm text-surface-400 ml-1">/100</span>
      </div>
      <span className="text-xs font-medium mt-0.5" style={{ color: getColor() }}>{getLabel()}</span>
    </div>
  );
}
