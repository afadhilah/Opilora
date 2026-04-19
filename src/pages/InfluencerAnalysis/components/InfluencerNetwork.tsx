import React from 'react';
import { NetworkGraph } from '@/components/charts/NetworkGraph';

const nodes = [
  { id: '1', label: 'Andi K.', size: 80, color: '#3b6bfa' },
  { id: '2', label: 'Dewi F.', size: 60, color: '#ec4899' },
  { id: '3', label: 'Rizki P.', size: 90, color: '#10b981' },
  { id: '4', label: 'Sarah W.', size: 45, color: '#f59e0b' },
  { id: '5', label: 'Budi S.', size: 35, color: '#8b5cf6' },
  { id: '6', label: 'User A', size: 25 },
  { id: '7', label: 'User B', size: 20 },
  { id: '8', label: 'User C', size: 30 },
];

export function InfluencerNetwork() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Jaringan Influencer</h3>
      <p className="text-xs text-surface-400 mb-2">Hubungan antar influencer</p>
      <NetworkGraph nodes={nodes} height={320} />
    </div>
  );
}
