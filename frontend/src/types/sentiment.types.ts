export type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed';

export interface SentimentScore {
  positive: number;
  negative: number;
  neutral: number;
  mixed: number;
}

export interface SentimentData {
  timestamp: string;
  scores: SentimentScore;
  volume: number;
  averageIntensity: number;
}

export interface EmotionData {
  joy: number;
  anger: number;
  fear: number;
  sadness: number;
  surprise: number;
  disgust: number;
}

export interface AspectSentiment {
  aspect: string;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}
