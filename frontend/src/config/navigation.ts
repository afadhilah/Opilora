import { routes } from './routes';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  section: 'main' | 'analysis' | 'system';
  badge?: number;
}

export const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: routes.dashboard, icon: 'LayoutDashboard', section: 'main' },
  { id: 'topics', label: 'Topik', path: routes.topics, icon: 'Hash', section: 'analysis' },
  { id: 'sentiment', label: 'Sentimen', path: routes.sentiment, icon: 'Heart', section: 'analysis' },
  { id: 'escalation', label: 'Eskalasi', path: routes.escalation, icon: 'AlertTriangle', section: 'analysis', badge: 3 },
  { id: 'influencers', label: 'Influencer', path: routes.influencers, icon: 'Users', section: 'analysis' },
  { id: 'compare', label: 'Komparasi', path: routes.compare, icon: 'BarChart3', section: 'analysis' },
  { id: 'reports', label: 'Laporan', path: routes.reports, icon: 'FileText', section: 'system' },
  { id: 'settings', label: 'Pengaturan', path: routes.settings, icon: 'Settings', section: 'system' },
];

export const navSections = [
  { id: 'main', label: '' },
  { id: 'analysis', label: 'Analisis' },
  { id: 'system', label: 'Sistem' },
] as const;
