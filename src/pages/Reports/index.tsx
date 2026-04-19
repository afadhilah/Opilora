import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ReportBuilder } from './components/ReportBuilder';
import { ScheduledReports } from './components/ScheduledReports';
import { ExportOptions } from './components/ExportOptions';

export default function Reports() {
  return (
    <MainLayout title="Laporan" subtitle="Generate dan kelola laporan analisis">
      <div className="space-y-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><ReportBuilder /></div>
          <ExportOptions />
        </div>
        <ScheduledReports />
      </div>
    </MainLayout>
  );
}
