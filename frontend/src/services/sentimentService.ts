// Sentiment API service — returns mock data for prototype
export const sentimentService = {
  async getDistribution() {
    return { positive: 42.3, negative: 28.1, neutral: 24.8, mixed: 4.8 };
  },
  async getTimeline(days: number = 30) {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 86400000).toISOString(),
      positive: 30 + Math.random() * 25,
      negative: 15 + Math.random() * 20,
      neutral: 20 + Math.random() * 15,
    }));
  },
  async getEmotions() {
    return { joy: 72, anger: 45, fear: 28, sadness: 35, surprise: 42, disgust: 18 };
  },
};
