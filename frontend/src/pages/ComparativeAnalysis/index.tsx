import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MultiTopicComparison } from './components/MultiTopicComparison';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { BenchmarkChart } from './components/BenchmarkChart';

export default function ComparativeAnalysis() {
  return (
    <MainLayout title="Komparasi" subtitle="Bandingkan metrik antar topik dan kompetitor">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><MultiTopicComparison /></div>
          <CompetitorAnalysis />
        </div>
        <BenchmarkChart />
      </div>
    </MainLayout>
  );
}
