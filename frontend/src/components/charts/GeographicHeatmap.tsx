import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CHART_COLORS } from '@/utils/constants';

interface HorizontalBarChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
}

export function GeographicHeatmap({ data, height = 300 }: HorizontalBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#475569' }}
          width={100}
        />
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
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
