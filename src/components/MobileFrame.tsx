import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#EEF2F6] flex items-center justify-center p-0 sm:py-6">
      {/* Mobile Device Canvas */}
      <div className="w-full sm:max-w-[420px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-white sm:rounded-[36px] shadow-2xl relative flex flex-col overflow-hidden sm:border-[8px] sm:border-slate-800">


        {/* Scrollable Mobile App Body */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar relative flex flex-col bg-[#FCFDFD]">
          {children}
        </div>
      </div>
    </div>
  );
};
