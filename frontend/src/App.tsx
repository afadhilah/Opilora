import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from '@/config/routes';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const TopicDiscovery = lazy(() => import('@/pages/TopicDiscovery'));
const SentimentAnalysis = lazy(() => import('@/pages/SentimentAnalysis'));
const EscalationMonitoring = lazy(() => import('@/pages/EscalationMonitoring'));
const InfluencerAnalysis = lazy(() => import('@/pages/InfluencerAnalysis'));
const ComparativeAnalysis = lazy(() => import('@/pages/ComparativeAnalysis'));
const Reports = lazy(() => import('@/pages/Reports'));
const Settings = lazy(() => import('@/pages/Settings'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-50">
      <LoadingSpinner size={32} className="text-brand-600" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.topics} element={<TopicDiscovery />} />
            <Route path={routes.sentiment} element={<SentimentAnalysis />} />
            <Route path={routes.escalation} element={<EscalationMonitoring />} />
            <Route path={routes.influencers} element={<InfluencerAnalysis />} />
            <Route path={routes.compare} element={<ComparativeAnalysis />} />
            <Route path={routes.reports} element={<Reports />} />
            <Route path={routes.settings} element={<Settings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
