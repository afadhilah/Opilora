import React from 'react';
import { CHART_COLORS } from '@/utils/constants';

interface TopicBubblesProps {
  data: { name: string; value: number; sentiment: number }[];
  height?: number;
}

export function TopicBubbles({ data, height = 300 }: TopicBubblesProps) {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4" style={{ minHeight: height }}>
      {data.map((item, i) => {
        const size = 40 + (item.value / maxVal) * 80;
        const color = CHART_COLORS[i % CHART_COLORS.length];
        return (
          <div
            key={item.name}
            className="flex items-center justify-center rounded-full transition-transform hover:scale-110 cursor-pointer"
            style={{
              width: size,
              height: size,
              backgroundColor: `${color}15`,
              border: `1.5px solid ${color}40`,
            }}
            title={`${item.name}: ${item.value} mentions`}
          >
            <span className="text-2xs font-medium text-center leading-tight px-1" style={{ color, fontSize: Math.max(9, size / 8) }}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
