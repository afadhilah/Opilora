import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TopicClusters } from './components/TopicClusters';
import { TrendingHashtags } from './components/TrendingHashtags';
import { TopicEvolution } from './components/TopicEvolution';

export default function TopicDiscovery() {
  return (
    <MainLayout title="Topik" subtitle="Temukan dan pantau topik yang sedang berkembang">
      <div className="space-y-6">
        <TopicClusters />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrendingHashtags />
          <TopicEvolution />
        </div>
      </div>
    </MainLayout>
  );
}
