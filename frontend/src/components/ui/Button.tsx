import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 select-none whitespace-nowrap';

  const variants: Record<string, string> = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-soft',
    secondary:
      'bg-white text-surface-700 border border-surface-200 hover:bg-surface-50 hover:border-surface-300 active:bg-surface-100',
    ghost: 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 active:bg-surface-200',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  };

  const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-5 text-sm',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
