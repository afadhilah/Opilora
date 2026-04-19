import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RiskDashboard } from './components/RiskDashboard';
import { EscalationHistory } from './components/EscalationHistory';
import { PredictionGraph } from './components/PredictionGraph';
import { FactorsBreakdown } from './components/FactorsBreakdown';

export default function EscalationMonitoring() {
  return (
    <MainLayout title="Eskalasi" subtitle="Pantau dan prediksi potensi eskalasi isu digital">
      <div className="space-y-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RiskDashboard />
          <div className="lg:col-span-2"><PredictionGraph /></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FactorsBreakdown />
          <EscalationHistory />
        </div>
      </div>
    </MainLayout>
  );
}
