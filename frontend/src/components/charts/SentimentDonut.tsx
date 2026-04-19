import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SentimentDonutProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  height?: number;
}

export function SentimentDonut({ data, centerLabel, centerValue, height = 220 }: SentimentDonutProps) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              color: '#f1f5f9',
            }}
            itemStyle={{ color: '#f1f5f9' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && (
            <span className="text-2xl font-bold text-surface-900 font-display tabular-nums">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-xs text-surface-400 mt-0.5">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
