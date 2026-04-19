import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'positive' | 'negative' | 'neutral' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', dot, className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    negative: 'bg-red-50 text-red-700 border-red-200/60',
    neutral: 'bg-surface-100 text-surface-600 border-surface-200/60',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
    info: 'bg-blue-50 text-blue-700 border-blue-200/60',
    default: 'bg-surface-100 text-surface-500 border-surface-200/60',
  };

  const dotColors: Record<string, string> = {
    positive: 'bg-emerald-500',
    negative: 'bg-red-500',
    neutral: 'bg-surface-400',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
    default: 'bg-surface-400',
  };

  const sizes: Record<string, string> = {
    sm: 'text-2xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
