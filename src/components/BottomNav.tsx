import React from 'react';
import { Home, Package, UtensilsCrossed, HeartHandshake, TrendingUp } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  activeTab: NavigationTab;
  onChangeTab: (tab: NavigationTab) => void;
  pantryAlertCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  pantryAlertCount = 0,
}) => {
  const tabs = [
    { id: 'beranda' as NavigationTab, label: 'Beranda', icon: Home },
    { id: 'pantry' as NavigationTab, label: 'Pantry', icon: Package, badge: pantryAlertCount },
    { id: 'menu' as NavigationTab, label: 'Menu', icon: UtensilsCrossed },
    { id: 'rescue' as NavigationTab, label: 'Rescue', icon: HeartHandshake },
    { id: 'dampak' as NavigationTab, label: 'Dampak', icon: TrendingUp },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 py-1.5 px-3 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative min-h-[48px] ${
              isActive
                ? 'text-[#236B46] font-semibold'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 text-[#236B46] stroke-[2.3]' : 'stroke-[1.8]'
                }`}
              />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span
              className={`text-[10px] tracking-tight mt-1 transition-all ${
                isActive ? 'font-bold text-[#236B46]' : 'font-medium text-slate-600'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 bg-[#236B46] rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
