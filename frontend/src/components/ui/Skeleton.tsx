import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'line' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'line', width, height }: SkeletonProps) {
  const base = 'animate-shimmer rounded';

  const variants: Record<string, string> = {
    line: 'h-4 rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="p-5 space-y-4 bg-white border border-surface-200 rounded-xl">
      <div className="flex items-center justify-between">
        <Skeleton width={100} height={14} />
        <Skeleton variant="circle" width={32} height={32} />
      </div>
      <Skeleton width={140} height={28} />
      <Skeleton width={80} height={14} />
    </div>
  );
}
