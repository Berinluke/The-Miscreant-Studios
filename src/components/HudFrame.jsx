import React from 'react';

export default function HudFrame({ children }) {
  return (
    <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] bg-white p-2 sm:p-3.5 md:p-4 rounded-[22px] sm:rounded-[30px] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Inner Screen Viewport */}
      <div className="relative w-full h-full bg-[#08080c] overflow-hidden rounded-[16px] sm:rounded-[22px] border border-black/40 shadow-inner flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
