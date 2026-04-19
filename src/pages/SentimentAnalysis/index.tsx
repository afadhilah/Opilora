import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SentimentOverview } from './components/SentimentOverview';
import { AspectAnalysis } from './components/AspectAnalysis';
import { TopPosts } from './components/TopPosts';
import { EmotionRadar } from '@/components/charts/EmotionRadar';
import { useSentimentStore } from '@/store';

export default function SentimentAnalysis() {
  const emotions = useSentimentStore((s) => s.emotions);
  return (
    <MainLayout title="Sentimen" subtitle="Analisis sentimen mendalam dari opini publik">
      <div className="space-y-6">
        <SentimentOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AspectAnalysis />
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-surface-900 mb-1">Deteksi Emosi</h3>
            <p className="text-xs text-surface-400 mb-2">Distribusi emosi dalam konten</p>
            <EmotionRadar data={emotions} />
          </div>
        </div>
        <TopPosts />
      </div>
    </MainLayout>
  );
}
