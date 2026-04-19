import React from 'react';

interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-1 border-b border-surface-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap
            ${
              activeTab === tab.id
                ? 'text-brand-600'
                : 'text-surface-500 hover:text-surface-700'
            }
          `}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-2xs px-1.5 py-0.5 rounded-full font-medium ${
                  activeTab === tab.id
                    ? 'bg-brand-50 text-brand-600'
                    : 'bg-surface-100 text-surface-500'
                }`}
              >
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
