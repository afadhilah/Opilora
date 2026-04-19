import { useMemo } from 'react';
export function useChartData<T>(data: T[], transform?: (data: T[]) => T[]) {
  return useMemo(() => transform ? transform(data) : data, [data, transform]);
}
