import React from 'react';
import { Badge } from '@/components/ui/Badge';

const sources = [
  { name: 'Twitter/X API v2', status: 'active' },
  { name: 'Meta Graph API', status: 'active' },
  { name: 'YouTube Data API', status: 'active' },
  { name: 'Reddit API', status: 'inactive' },
  { name: 'Web Scraper', status: 'active' },
  { name: 'RSS Feeds', status: 'active' },
];

export function DataSources() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Sumber Data</h3>
      <p className="text-xs text-surface-400 mb-4">Status koneksi ke setiap sumber data</p>
      <div className="space-y-2">
        {sources.map((src) => (
          <div key={src.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-50 transition-colors">
            <span className="text-sm text-surface-700">{src.name}</span>
            <Badge variant={src.status === 'active' ? 'positive' : 'neutral'} size="sm" dot>
              {src.status === 'active' ? 'Aktif' : 'Nonaktif'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
