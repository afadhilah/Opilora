import React from 'react';
import { InfluencerCard } from '@/components/cards/InfluencerCard';

const influencers = [
  { id: '1', name: 'Andi Kurniawan', handle: 'andikurniawan', platform: 'Twitter/X', followers: 1250000, engagementRate: 4.2, sentiment: 0.72, mentions: 89, reach: 2800000, verified: true },
  { id: '2', name: 'Dewi Fortuna', handle: 'dewi.fortuna', platform: 'Instagram', followers: 890000, engagementRate: 5.8, sentiment: 0.65, mentions: 67, reach: 1950000, verified: true },
  { id: '3', name: 'Rizki Pratama', handle: 'rizkipratama', platform: 'TikTok', followers: 2100000, engagementRate: 7.1, sentiment: 0.45, mentions: 45, reach: 5200000, verified: false },
  { id: '4', name: 'Sarah Wijaya', handle: 'sarahwijaya', platform: 'Twitter/X', followers: 567000, engagementRate: 3.9, sentiment: 0.58, mentions: 34, reach: 890000, verified: true },
  { id: '5', name: 'Budi Setiawan', handle: 'budisetiawan', platform: 'YouTube', followers: 345000, engagementRate: 2.1, sentiment: 0.81, mentions: 23, reach: 450000, verified: false },
];

export function TopInfluencers() {
  return (
    <div className="space-y-3 stagger-children">
      {influencers.map((inf, i) => (
        <InfluencerCard key={inf.id} {...inf} rank={i + 1} />
      ))}
    </div>
  );
}
