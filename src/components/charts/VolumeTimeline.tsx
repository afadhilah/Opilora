import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VolumeTimelineProps {
  data: { time: string; volume: number; positive?: number; negative?: number }[];
  height?: number;
  showGrid?: boolean;
}

export function VolumeTimeline({ data, height = 260, showGrid = true }: VolumeTimelineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />}
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          dx={-4}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#f1f5f9',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
          itemStyle={{ color: '#f1f5f9' }}
          cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
        />
        <defs>
          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b6bfa" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#3b6bfa" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#3b6bfa"
          strokeWidth={2}
          fill="url(#volumeGradient)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b6bfa' }}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
