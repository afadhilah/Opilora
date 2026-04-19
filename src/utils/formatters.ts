import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString('id-ID');
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  if (Math.abs(value) >= 1000) {
    return `${sign}${formatNumber(value)}`;
  }
  return `${sign}${value.toFixed(1)}`;
}

export function formatDate(dateStr: string, pattern = 'dd MMM yyyy'): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, pattern, { locale: id });
}

export function formatTime(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, 'HH:mm', { locale: id });
}

export function formatRelative(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
}

export function formatChartDate(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) return dateStr;
  return format(date, 'dd/MM HH:mm');
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
