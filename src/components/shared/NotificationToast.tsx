import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const toastConfig = {
  success: { icon: CheckCircle, bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
  error: { icon: AlertCircle, bg: 'bg-red-50 border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
  info: { icon: Info, bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
  warning: { icon: AlertCircle, bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', iconColor: 'text-amber-500' },
};

export function NotificationToast({ message, type = 'info', onClose }: NotificationToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border rounded-xl shadow-elevated animate-slide-up ${config.bg}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
      <p className={`text-sm font-medium flex-1 ${config.text}`}>{message}</p>
      <button onClick={onClose} className="p-1 rounded-md hover:bg-black/5 transition-colors">
        <X className="w-3.5 h-3.5 text-surface-500" />
      </button>
    </div>
  );
}
