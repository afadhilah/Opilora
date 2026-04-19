import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { topic: 'Subsidi Energi', positive: 65, negative: 25, neutral: 10 },
  { topic: 'Transportasi', positive: 38, negative: 45, neutral: 17 },
  { topic: 'UMKM Digital', positive: 82, negative: 8, neutral: 10 },
  { topic: 'Inflasi', positive: 22, negative: 58, neutral: 20 },
  { topic: 'Pariwisata', positive: 76, negative: 12, neutral: 12 },
];

export function MultiTopicComparison() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Perbandingan Topik</h3>
      <p className="text-xs text-surface-400 mb-4">Sentimen per topik (%)</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} labelStyle={{ color: '#94a3b8', marginBottom: '4px' }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar dataKey="positive" name="Positif" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="neutral" name="Netral" fill="#94a3b8" stackId="a" />
          <Bar dataKey="negative" name="Negatif" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
