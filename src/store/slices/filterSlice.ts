import { create } from 'zustand';
import type { Platform, FilterState } from '@/types';

interface FilterStore extends FilterState {
  setDateRange: (start: Date, end: Date) => void;
  togglePlatform: (platform: Platform) => void;
  setKeywords: (keywords: string[]) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  dateRange: { start: new Date(Date.now() - 7 * 86400000), end: new Date() },
  platforms: [],
  sentiments: [],
  keywords: [],
  topics: [],
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilters,
  setDateRange: (start, end) => set({ dateRange: { start, end } }),
  togglePlatform: (platform) =>
    set((state) => ({
      platforms: state.platforms.includes(platform)
        ? state.platforms.filter((p) => p !== platform)
        : [...state.platforms, platform],
    })),
  setKeywords: (keywords) => set({ keywords }),
  resetFilters: () => set(defaultFilters),
}));
