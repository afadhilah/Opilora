import type { TimeSeriesPoint } from '@/types/chart.types';

export function generateTimeSeriesData(
  hours: number,
  baseValue: number,
  variance: number
): TimeSeriesPoint[] {
  const now = new Date();
  return Array.from({ length: hours }, (_, i) => {
    const timestamp = new Date(now.getTime() - (hours - i - 1) * 60 * 60 * 1000);
    const noise = (Math.random() - 0.5) * variance;
    const trend = Math.sin(i / 4) * (variance * 0.3);
    return {
      timestamp: timestamp.toISOString(),
      value: Math.max(0, Math.round(baseValue + noise + trend)),
    };
  });
}

export function smoothData(data: number[], windowSize = 3): number[] {
  return data.map((_, i, arr) => {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(arr.length, i + Math.ceil(windowSize / 2));
    const window = arr.slice(start, end);
    return window.reduce((sum, v) => sum + v, 0) / window.length;
  });
}

export function calculatePercentages(values: Record<string, number>): Record<string, number> {
  const total = Object.values(values).reduce((sum, v) => sum + v, 0);
  if (total === 0) return Object.fromEntries(Object.keys(values).map(k => [k, 0]));
  return Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, (v / total) * 100])
  );
}
