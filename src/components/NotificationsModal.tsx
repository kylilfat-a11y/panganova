import React from 'react';
import { X, Bell, Check, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AppNotification, NavigationTab } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  notifications: AppNotification[];
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications,
  onClose,
  onNavigate,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-[420px] rounded-t-3xl sm:rounded-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#236B46]" />
            <h3 className="text-sm font-bold text-[#26372D] font-heading">
              Pemberitahuan Pangan
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[10px] text-[#236B46] font-semibold hover:underline"
            >
              Tandai Dibaca
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.targetTab) {
                  onNavigate(notif.targetTab);
                  onClose();
                }
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white border-slate-100 opacity-80'
                  : 'bg-[#FFF8E9]/60 border-[#F7E6C4] shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-[#26372D]">
                  {notif.title}
                </span>
                <span className="text-[9px] text-slate-400">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-[#657D6F] mt-1 leading-snug">
                {notif.message}
              </p>
              {notif.targetTab && (
                <div className="mt-2 text-[10px] font-bold text-[#236B46] flex items-center gap-1">
                  Buka Menu <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
