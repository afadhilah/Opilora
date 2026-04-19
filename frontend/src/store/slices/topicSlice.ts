import { create } from 'zustand';
import type { Topic, TrendingKeyword } from '@/types/topic.types';

interface TopicState {
  topics: Topic[];
  trendingKeywords: TrendingKeyword[];
}

export const useTopicStore = create<TopicState>(() => ({
  topics: [
    { id: '1', name: 'Subsidi Energi', mentions: 4520, sentiment: 0.65, trend: 'rising', keywords: ['BBM', 'listrik', 'subsidi', 'harga'], color: '#3b6bfa' },
    { id: '2', name: 'Transportasi Publik', mentions: 3890, sentiment: 0.38, trend: 'falling', keywords: ['MRT', 'KRL', 'bus', 'macet'], color: '#ef4444' },
    { id: '3', name: 'Digitalisasi UMKM', mentions: 2750, sentiment: 0.82, trend: 'rising', keywords: ['UMKM', 'digital', 'ecommerce', 'pelatihan'], color: '#10b981' },
    { id: '4', name: 'Pariwisata Daerah', mentions: 2140, sentiment: 0.76, trend: 'stable', keywords: ['wisata', 'budaya', 'festival', 'hotel'], color: '#f59e0b' },
    { id: '5', name: 'Pendidikan', mentions: 1920, sentiment: 0.55, trend: 'stable', keywords: ['sekolah', 'kurikulum', 'guru', 'siswa'], color: '#8b5cf6' },
    { id: '6', name: 'Kesehatan', mentions: 1680, sentiment: 0.48, trend: 'rising', keywords: ['BPJS', 'rumah sakit', 'obat', 'dokter'], color: '#ec4899' },
    { id: '7', name: 'Inflasi', mentions: 3210, sentiment: 0.32, trend: 'rising', keywords: ['harga', 'sembako', 'inflasi', 'daya beli'], color: '#f97316' },
    { id: '8', name: 'Infrastruktur', mentions: 1560, sentiment: 0.71, trend: 'stable', keywords: ['tol', 'jalan', 'jembatan', 'bandara'], color: '#06b6d4' },
  ],
  trendingKeywords: [
    { keyword: '#SubsidiEnergi', count: 12450, change: 45.2, relatedTopics: ['Subsidi Energi'] },
    { keyword: 'harga BBM', count: 9870, change: 32.1, relatedTopics: ['Subsidi Energi', 'Inflasi'] },
    { keyword: '#DigitalUMKM', count: 7650, change: 28.5, relatedTopics: ['Digitalisasi UMKM'] },
    { keyword: 'transportasi publik', count: 6340, change: -12.3, relatedTopics: ['Transportasi Publik'] },
    { keyword: '#FestivalBudaya', count: 5210, change: 67.8, relatedTopics: ['Pariwisata Daerah'] },
    { keyword: 'inflasi', count: 4890, change: 15.4, relatedTopics: ['Inflasi'] },
    { keyword: 'BPJS', count: 4320, change: -5.2, relatedTopics: ['Kesehatan'] },
    { keyword: 'kurikulum baru', count: 3780, change: 22.1, relatedTopics: ['Pendidikan'] },
    { keyword: 'macet Jakarta', count: 3450, change: -8.7, relatedTopics: ['Transportasi Publik'] },
    { keyword: 'tol baru', count: 2890, change: 18.3, relatedTopics: ['Infrastruktur'] },
  ],
}));
