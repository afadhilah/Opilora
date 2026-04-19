import { useEffect, useRef, useState } from 'react';
import type { Mention } from '@/types';
import { useDashboardStore } from '@/store';

export function useRealTimeData(intervalMs = 30000) {
  const mentions = useDashboardStore((s) => s.mentions);
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!isLive) return;
    intervalRef.current = setInterval(() => {
      // In production, this would fetch new data from the API
      console.log('[Real-time] Would fetch new mentions');
    }, intervalMs);
    return () => clearInterval(intervalRef.current);
  }, [isLive, intervalMs]);

  return { mentions, isLive, setIsLive };
}
