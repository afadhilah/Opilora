import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchBar({ placeholder = 'Cari...', value: controlledValue, onChange, className = '' }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-9 text-sm bg-surface-50 border border-surface-200 rounded-lg text-surface-700 placeholder:text-surface-400 hover:border-surface-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
      />
      {value && (
        <button
          onClick={() => handleChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
