import { create } from 'zustand';
import type { Mention } from '@/types';

interface DashboardState {
  mentions: Mention[];
  totalMentions: number;
  avgSentiment: number;
  activeTopics: number;
  riskScore: number;
  volumeData: { time: string; volume: number }[];
  platformDistribution: { name: string; value: number; color: string }[];
  isLoading: boolean;
  setMentions: (mentions: Mention[]) => void;
  setLoading: (loading: boolean) => void;
}

const mockMentions: Mention[] = [
  { id: '1', text: 'Kebijakan baru pemerintah soal subsidi energi mendapat respon positif dari masyarakat luas.', author: 'Ahmad Fajar', platform: 'twitter', sentiment: 'positive', sentimentScore: 0.85, timestamp: new Date(Date.now() - 120000).toISOString(), engagement: { likes: 342, shares: 89, comments: 47 } },
  { id: '2', text: 'Kenaikan harga BBM membuat beban masyarakat semakin berat, perlu ada solusi konkret segera.', author: 'Dewi Sartika', platform: 'facebook', sentiment: 'negative', sentimentScore: 0.25, timestamp: new Date(Date.now() - 300000).toISOString(), engagement: { likes: 1205, shares: 567, comments: 234 } },
  { id: '3', text: 'Program digitalisasi UMKM berjalan lancar di beberapa kota besar, pelatihan masih terus berlanjut.', author: 'Budi Santoso', platform: 'news', sentiment: 'positive', sentimentScore: 0.78, timestamp: new Date(Date.now() - 600000).toISOString(), engagement: { likes: 156, shares: 34, comments: 12 } },
  { id: '4', text: 'Kualitas transportasi publik di ibu kota perlu perhatian serius, banyak keluhan dari pengguna harian.', author: 'Rina Wati', platform: 'twitter', sentiment: 'negative', sentimentScore: 0.3, timestamp: new Date(Date.now() - 900000).toISOString(), engagement: { likes: 890, shares: 223, comments: 156 } },
  { id: '5', text: 'Festival budaya lokal sukses menarik ribuan pengunjung, potensi pariwisata daerah meningkat.', author: 'Joko Widodo', platform: 'instagram', sentiment: 'positive', sentimentScore: 0.92, timestamp: new Date(Date.now() - 1200000).toISOString(), engagement: { likes: 2340, shares: 450, comments: 89 } },
  { id: '6', text: 'Inflasi bulan ini masih dalam batas wajar menurut bank sentral, namun masyarakat merasakan dampaknya.', author: 'Siti Nurbaya', platform: 'news', sentiment: 'neutral', sentimentScore: 0.5, timestamp: new Date(Date.now() - 1800000).toISOString(), engagement: { likes: 67, shares: 12, comments: 5 } },
  { id: '7', text: 'Proyek infrastruktur baru diharapkan bisa mendorong pertumbuhan ekonomi di wilayah timur Indonesia.', author: 'Hendra Gunawan', platform: 'twitter', sentiment: 'positive', sentimentScore: 0.72, timestamp: new Date(Date.now() - 2400000).toISOString(), engagement: { likes: 445, shares: 98, comments: 67 } },
  { id: '8', text: 'Cuaca ekstrem di beberapa daerah menyebabkan banjir, warga mengeluhkan lambatnya penanganan.', author: 'Maria Ulfa', platform: 'facebook', sentiment: 'negative', sentimentScore: 0.18, timestamp: new Date(Date.now() - 3000000).toISOString(), engagement: { likes: 1567, shares: 678, comments: 312 } },
];

const generateVolumeData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const hour = time.getHours();
    const baseVolume = hour >= 8 && hour <= 22 ? 800 : 200;
    const volume = baseVolume + Math.floor(Math.random() * 400);
    data.push({ time: `${hour.toString().padStart(2, '0')}:00`, volume });
  }
  return data;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  mentions: mockMentions,
  totalMentions: 24853,
  avgSentiment: 62.4,
  activeTopics: 18,
  riskScore: 43,
  volumeData: generateVolumeData(),
  platformDistribution: [
    { name: 'Twitter/X', value: 38.5, color: '#1da1f2' },
    { name: 'Facebook', value: 24.2, color: '#1877f2' },
    { name: 'Instagram', value: 18.7, color: '#e4405f' },
    { name: 'TikTok', value: 8.3, color: '#010101' },
    { name: 'News', value: 7.1, color: '#6366f1' },
    { name: 'Reddit', value: 3.2, color: '#ff5700' },
  ],
  isLoading: false,
  setMentions: (mentions) => set({ mentions }),
  setLoading: (isLoading) => set({ isLoading }),
}));
