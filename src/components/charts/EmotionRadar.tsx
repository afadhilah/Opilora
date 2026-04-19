import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface EmotionRadarProps {
  data: { emotion: string; value: number; fullMark?: number }[];
  height?: number;
}

export function EmotionRadar({ data, height = 250 }: EmotionRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="emotion"
          tick={{ fontSize: 11, fill: '#64748b' }}
        />
        <Radar
          name="Emosi"
          dataKey="value"
          stroke="#3b6bfa"
          fill="#3b6bfa"
          fillOpacity={0.12}
          strokeWidth={2}
          dot={{ r: 3, fill: '#3b6bfa', strokeWidth: 0 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
