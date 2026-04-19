import type { SentimentType as _SentimentType } from './sentiment.types';

export type { SentimentType, SentimentScore, SentimentData, EmotionData } from './sentiment.types';
export type { Topic, TopicCluster, TrendingKeyword } from './topic.types';
export type { EscalationAlert, EscalationFactor, RiskLevel } from './escalation.types';
export type { Influencer, InfluencerActivity } from './influencer.types';
export type { ChartDataPoint, TimeSeriesPoint } from './chart.types';
export type { ApiResponse, PaginatedResponse } from './api.types';

export interface Mention {
  id: string;
  text: string;
  author: string;
  authorAvatar?: string;
  platform: Platform;
  sentiment: _SentimentType;
  sentimentScore: number;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  url?: string;
}

export type Platform = 'twitter' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'reddit' | 'news';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterState {
  dateRange: DateRange;
  platforms: Platform[];
  sentiments: _SentimentType[];
  keywords: string[];
  topics: string[];
}

export interface MetricData {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  format?: 'number' | 'percentage' | 'compact';
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
}
