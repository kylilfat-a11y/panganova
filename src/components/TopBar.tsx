import React from 'react';
import { ArrowLeft, Bell, MoreVertical, User, Sparkles } from 'lucide-react';
import { NavigationTab } from '../types';

interface TopBarProps {
  title?: string;
  userName?: string;
  isHome?: boolean;
  onBack?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  unreadNotifsCount?: number;
  rightAction?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  userName = 'Kafa',
  isHome = false,
  onBack,
  onOpenNotifications,
  onOpenProfile,
  unreadNotifsCount = 0,
  rightAction,
}) => {
  if (isHome) {
    return (
      <header className="px-5 pt-3 pb-2 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold text-[#26372D] tracking-tight">
              Halo, {userName}!
            </h1>
            <span className="text-lg">👋</span>
          </div>
          <p className="text-xs text-[#657D6F] font-medium">
            Mari kelola pangan hari ini!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications bell */}
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 relative hover:bg-slate-200 transition-colors"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full bg-[#E6F3E9] text-[#236B46] font-bold text-xs flex items-center justify-center border border-[#69B786]/30 hover:opacity-90 transition-opacity"
            title="Profil & Preferensi"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="px-4 py-3 flex items-center justify-between bg-white/90 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-100/80">
      <div className="flex items-center gap-2.5">
        {onBack && (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors -ml-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <h2 className="text-base font-bold text-[#26372D] tracking-tight font-heading">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-1">
        {rightAction || (
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
