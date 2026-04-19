import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-surface-200/60 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-base font-semibold text-surface-900 font-display">{title}</h1>
        {subtitle && <p className="text-xs text-surface-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <SearchBar placeholder="Cari topik, keyword..." className="w-64 hidden lg:block" />

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-100 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-xs font-semibold text-brand-700">A</span>
              </div>
              <span className="text-sm font-medium text-surface-700 hidden sm:block">Admin</span>
              <ChevronDown className="w-3.5 h-3.5 text-surface-400" />
            </div>
          }
        >
          <DropdownItem>Profil</DropdownItem>
          <DropdownItem>Pengaturan</DropdownItem>
          <div className="my-1 border-t border-surface-100" />
          <DropdownItem danger>Keluar</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
