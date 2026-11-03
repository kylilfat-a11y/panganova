import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#EEF2F6] flex items-center justify-center p-0 sm:py-6">
      {/* Mobile Device Canvas */}
      <div className="w-full sm:max-w-[420px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-white sm:rounded-[36px] shadow-2xl relative flex flex-col overflow-hidden sm:border-[8px] sm:border-slate-800">
        
        {/* iOS-Style Dynamic Island / Speaker notch & Status Bar */}
        <div className="w-full bg-white z-40 pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 select-none shrink-0 border-b border-slate-50">
          <span className="tracking-tight text-[13px] font-bold font-sans">9:41</span>
          
          {/* Subtle Dynamic Island pill */}
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto hidden sm:block opacity-90"></div>
          
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Mobile App Body */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col bg-[#FCFDFD]">
          {children}
        </div>
      </div>
    </div>
  );
};
