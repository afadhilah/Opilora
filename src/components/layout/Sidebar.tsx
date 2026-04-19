import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigationItems, navSections } from '@/config/navigation';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const getIcon = (iconName: string) => {
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-[18px] h-[18px]" /> : null;
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
      style={{ backgroundColor: 'var(--bg-sidebar)' }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-5 border-b border-white/[0.06] ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">O</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white tracking-tight">Opilora</span>
            <span className="text-[10px] text-white/40 leading-none">Opinion Analytics</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((section) => {
          const items = navigationItems.filter((item) => item.section === section.id);
          if (items.length === 0) return null;
          return (
            <div key={section.id}>
              {section.label && !collapsed && (
                <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                        isActive
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/45 hover:text-white/70 hover:bg-white/[0.04]'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <span className={`flex-shrink-0 ${isActive ? 'text-brand-400' : ''}`}>
                        {getIcon(item.icon)}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Toggle */}
      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={onToggle}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all text-sm ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed ? <PanelLeft className="w-[18px] h-[18px]" /> : <PanelLeftClose className="w-[18px] h-[18px]" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
