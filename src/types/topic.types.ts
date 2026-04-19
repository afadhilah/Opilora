export interface Topic {
  id: string;
  name: string;
  mentions: number;
  sentiment: number;
  trend: 'rising' | 'falling' | 'stable';
  keywords: string[];
  color?: string;
}

export interface TopicCluster {
  id: string;
  label: string;
  topics: Topic[];
  size: number;
}

export interface TrendingKeyword {
  keyword: string;
  count: number;
  change: number;
  relatedTopics: string[];
}
