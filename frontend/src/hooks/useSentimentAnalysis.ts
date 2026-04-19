import { useSentimentStore } from '@/store';
export function useSentimentAnalysis() {
  const distribution = useSentimentStore((s) => s.distribution);
  const timeline = useSentimentStore((s) => s.timeline);
  const emotions = useSentimentStore((s) => s.emotions);
  const aspects = useSentimentStore((s) => s.aspects);
  return { distribution, timeline, emotions, aspects };
}
