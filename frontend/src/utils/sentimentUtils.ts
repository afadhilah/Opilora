import { SENTIMENT_CONFIG, RISK_LEVELS } from './constants';
import type { SentimentType } from '@/types/sentiment.types';
import type { RiskLevel } from '@/types/escalation.types';

export function getSentimentColor(sentiment: SentimentType): string {
  return SENTIMENT_CONFIG[sentiment]?.color ?? '#94a3b8';
}

export function getSentimentBg(sentiment: SentimentType): string {
  return SENTIMENT_CONFIG[sentiment]?.bgColor ?? '#f1f5f9';
}

export function getSentimentLabel(sentiment: SentimentType): string {
  return SENTIMENT_CONFIG[sentiment]?.label ?? sentiment;
}

export function getRiskColor(level: RiskLevel): string {
  return RISK_LEVELS[level]?.color ?? '#94a3b8';
}

export function getRiskLabel(level: RiskLevel): string {
  return RISK_LEVELS[level]?.label ?? level;
}

export function scoreToSentiment(score: number): SentimentType {
  if (score >= 0.6) return 'positive';
  if (score <= 0.4) return 'negative';
  return 'neutral';
}

export function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 85) return 'critical';
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
