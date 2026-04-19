import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { QuickStats } from './components/QuickStats';
import { RealTimeMonitoring } from './components/RealTimeMonitoring';
import { RecentAlerts } from './components/RecentAlerts';

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard" subtitle="Ringkasan opini publik real-time">
      <div className="space-y-6 max-w-[1440px]">
        <QuickStats />
        <RealTimeMonitoring />
        <RecentAlerts />
      </div>
    </MainLayout>
  );
}
