import React from 'react';
import { VolumeTimeline } from '@/components/charts/VolumeTimeline';
import { SentimentDonut } from '@/components/charts/SentimentDonut';
import { LiveFeed } from '@/components/widgets/LiveFeed';
import { useDashboardStore } from '@/store';
import { Radio } from 'lucide-react';

export function RealTimeMonitoring() {
  const { volumeData, platformDistribution, mentions } = useDashboardStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Volume Timeline — spans 2 cols */}
      <div className="lg:col-span-2 card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-surface-900">Volume Mentions</h3>
            <p className="text-xs text-surface-400 mt-0.5">24 jam terakhir</p>
          </div>
          <div className="flex items-center gap-1.5 text-2xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <Radio className="w-3 h-3" />
            <span className="font-medium">Live</span>
          </div>
        </div>
        <VolumeTimeline data={volumeData} />
      </div>

      {/* Platform Distribution */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-surface-900 mb-1">Distribusi Platform</h3>
        <p className="text-xs text-surface-400 mb-2">Proporsi per platform</p>
        <SentimentDonut
          data={platformDistribution}
          centerValue={`${platformDistribution.length}`}
          centerLabel="platform"
          height={180}
        />
        <div className="space-y-2 mt-4">
          {platformDistribution.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs text-surface-600">{p.name}</span>
              </div>
              <span className="text-xs font-medium text-surface-900 tabular-nums">{p.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Feed — full width */}
      <div className="lg:col-span-3 card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-surface-900">Feed Terbaru</h3>
            <p className="text-xs text-surface-400 mt-0.5">Mentions dari semua platform</p>
          </div>
          <button className="text-xs text-brand-600 font-medium hover:text-brand-700 transition-colors">
            Lihat Semua →
          </button>
        </div>
        <LiveFeed mentions={mentions} />
      </div>
    </div>
  );
}
