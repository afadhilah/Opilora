import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TopInfluencers } from './components/TopInfluencers';
import { InfluencerNetwork } from './components/InfluencerNetwork';
import { ReachEstimation } from './components/ReachEstimation';

export default function InfluencerAnalysis() {
  return (
    <MainLayout title="Influencer" subtitle="Analisis influencer dan jangkauan pengaruh">
      <div className="space-y-6 max-w-[1440px]">
        <ReachEstimation />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3"><TopInfluencers /></div>
          <div className="lg:col-span-2"><InfluencerNetwork /></div>
        </div>
      </div>
    </MainLayout>
  );
}
