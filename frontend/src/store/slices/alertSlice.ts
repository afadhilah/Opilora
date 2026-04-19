import { create } from 'zustand';
import type { EscalationAlert } from '@/types/escalation.types';

interface AlertState {
  alerts: EscalationAlert[];
  overallRiskScore: number;
  predictions: { time: string; predicted: number; actual?: number }[];
}

export const useAlertStore = create<AlertState>(() => ({
  overallRiskScore: 43,
  alerts: [
    { id: '1', title: 'Lonjakan Volume: Subsidi Energi', description: 'Volume mentions meningkat 340% dalam 2 jam terakhir, didominasi sentimen negatif.', riskLevel: 'high', riskScore: 78, timestamp: new Date(Date.now() - 1800000).toISOString(), factors: [{ name: 'volume', value: 85, weight: 0.3, label: 'Volume' }], topic: 'Subsidi Energi', isResolved: false },
    { id: '2', title: 'Influencer Amplification: Transportasi', description: 'Akun dengan >500K followers mulai membahas isu transportasi publik.', riskLevel: 'medium', riskScore: 56, timestamp: new Date(Date.now() - 7200000).toISOString(), factors: [{ name: 'influencer', value: 72, weight: 0.25, label: 'Influencer' }], topic: 'Transportasi Publik', isResolved: false },
    { id: '3', title: 'Cross-Platform Spread: BPJS', description: 'Isu BPJS muncul di 4 platform berbeda dalam 6 jam terakhir.', riskLevel: 'medium', riskScore: 52, timestamp: new Date(Date.now() - 14400000).toISOString(), factors: [{ name: 'cross_platform', value: 65, weight: 0.2, label: 'Cross-Platform' }], topic: 'Kesehatan', isResolved: false },
    { id: '4', title: 'Sentiment Shift: Inflasi', description: 'Pergeseran sentimen dari netral ke negatif sebesar 25% dalam 12 jam.', riskLevel: 'low', riskScore: 35, timestamp: new Date(Date.now() - 36000000).toISOString(), factors: [{ name: 'sentiment', value: 45, weight: 0.25, label: 'Sentimen' }], topic: 'Inflasi', isResolved: true },
    { id: '5', title: 'Media Pickup: Festival Budaya', description: 'Berita positif tentang festival budaya diangkat oleh 5 media nasional.', riskLevel: 'low', riskScore: 15, timestamp: new Date(Date.now() - 43200000).toISOString(), factors: [{ name: 'media', value: 20, weight: 0.15, label: 'Media' }], topic: 'Pariwisata Daerah', isResolved: true },
  ],
  predictions: Array.from({ length: 48 }, (_, i) => ({
    time: `${i}h`,
    predicted: 43 + Math.sin(i / 8) * 15 + Math.random() * 10,
    actual: i < 24 ? 43 + Math.sin(i / 8) * 12 + Math.random() * 8 : undefined,
  })),
}));
