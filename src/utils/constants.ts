export const APP_NAME = 'Opilora';
export const APP_DESCRIPTION = 'Public Opinion Analytics Platform';

export const PLATFORMS = {
  twitter: { label: 'Twitter/X', color: '#1da1f2', icon: 'twitter' },
  facebook: { label: 'Facebook', color: '#1877f2', icon: 'facebook' },
  instagram: { label: 'Instagram', color: '#e4405f', icon: 'instagram' },
  tiktok: { label: 'TikTok', color: '#010101', icon: 'music' },
  youtube: { label: 'YouTube', color: '#ff0000', icon: 'youtube' },
  reddit: { label: 'Reddit', color: '#ff5700', icon: 'message-circle' },
  news: { label: 'News', color: '#6366f1', icon: 'newspaper' },
} as const;

export const SENTIMENT_CONFIG = {
  positive: { label: 'Positif', color: '#10b981', bgColor: '#ecfdf5' },
  negative: { label: 'Negatif', color: '#ef4444', bgColor: '#fef2f2' },
  neutral: { label: 'Netral', color: '#94a3b8', bgColor: '#f1f5f9' },
  mixed: { label: 'Campuran', color: '#f59e0b', bgColor: '#fffbeb' },
} as const;

export const RISK_LEVELS = {
  low: { label: 'Rendah', color: '#10b981', threshold: 40 },
  medium: { label: 'Sedang', color: '#f59e0b', threshold: 70 },
  high: { label: 'Tinggi', color: '#f97316', threshold: 85 },
  critical: { label: 'Kritis', color: '#ef4444', threshold: 100 },
} as const;

export const CHART_COLORS = [
  '#3b6bfa',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#84cc16',
];

export const DATE_RANGES = [
  { label: '24 Jam', value: '24h' },
  { label: '7 Hari', value: '7d' },
  { label: '30 Hari', value: '30d' },
  { label: '90 Hari', value: '90d' },
  { label: 'Custom', value: 'custom' },
] as const;
