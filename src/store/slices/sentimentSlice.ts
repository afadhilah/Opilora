import { create } from 'zustand';

interface SentimentState {
  distribution: { name: string; value: number; color: string }[];
  timeline: { time: string; positive: number; negative: number; neutral: number }[];
  emotions: { emotion: string; value: number }[];
  aspects: { aspect: string; positive: number; negative: number; neutral: number; total: number }[];
}

const generateTimeline = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    data.push({
      time: `${date.getDate()}/${date.getMonth() + 1}`,
      positive: 30 + Math.floor(Math.random() * 25),
      negative: 15 + Math.floor(Math.random() * 20),
      neutral: 20 + Math.floor(Math.random() * 15),
    });
  }
  return data;
};

export const useSentimentStore = create<SentimentState>(() => ({
  distribution: [
    { name: 'Positif', value: 42.3, color: '#10b981' },
    { name: 'Negatif', value: 28.1, color: '#ef4444' },
    { name: 'Netral', value: 24.8, color: '#94a3b8' },
    { name: 'Campuran', value: 4.8, color: '#f59e0b' },
  ],
  timeline: generateTimeline(),
  emotions: [
    { emotion: 'Senang', value: 72 },
    { emotion: 'Marah', value: 45 },
    { emotion: 'Takut', value: 28 },
    { emotion: 'Sedih', value: 35 },
    { emotion: 'Terkejut', value: 42 },
    { emotion: 'Jijik', value: 18 },
  ],
  aspects: [
    { aspect: 'Harga', positive: 120, negative: 340, neutral: 90, total: 550 },
    { aspect: 'Kualitas', positive: 280, negative: 95, neutral: 120, total: 495 },
    { aspect: 'Layanan', positive: 190, negative: 210, neutral: 85, total: 485 },
    { aspect: 'Kebijakan', positive: 150, negative: 280, neutral: 170, total: 600 },
    { aspect: 'Infrastruktur', positive: 220, negative: 160, neutral: 110, total: 490 },
  ],
}));
