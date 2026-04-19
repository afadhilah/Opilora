import React from 'react';
import { useSentimentStore } from '@/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AspectAnalysis() {
  const aspects = useSentimentStore((s) => s.aspects);
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Analisis Aspek</h3>
      <p className="text-xs text-surface-400 mb-4">Sentimen berdasarkan aspek</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={aspects} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="aspect" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} labelStyle={{ color: '#94a3b8', marginBottom: '4px' }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar dataKey="positive" name="Positif" fill="#10b981" radius={[2, 2, 0, 0]} barSize={18} />
          <Bar dataKey="negative" name="Negatif" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={18} />
          <Bar dataKey="neutral" name="Netral" fill="#94a3b8" radius={[2, 2, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
