export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface MultiSeriesPoint {
  timestamp: string;
  [key: string]: string | number;
}

export interface PieSlice {
  name: string;
  value: number;
  color: string;
}
