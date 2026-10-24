import React from 'react';
import { navItems } from '../data/charactersData';
import { hudAudio } from './AudioEngine';

export default function TopNotchNav({ activeNav, onSelectNav }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between px-6 sm:px-10 pt-4 sm:pt-6">
      {/* Top Left: Red Subtitle */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#ff2a3b] uppercase">
          CHOOSE YOUR OWN
        </span>
      </div>

      {/* Top Center: Notched White Nav Island */}
      <nav 
        className="relative bg-white text-neutral-900 px-6 sm:px-10 py-1.5 sm:py-2 flex items-center gap-6 sm:gap-10 shadow-lg top-notch-cut"
        style={{
          borderBottomLeftRadius: '14px',
          borderBottomRightRadius: '14px'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              hudAudio.playClick();
              onSelectNav(item.label);
            }}
            className={`text-xs sm:text-sm font-sans font-medium tracking-wide transition-colors ${
              activeNav === item.label
                ? 'text-black font-bold'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Top Right: Status Dots & Indicator */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#ff2a3b] shadow-[0_0_8px_#ff2a3b]" />
        <span className="h-2 w-2 rounded-full bg-[#ff2a3b] shadow-[0_0_8px_#ff2a3b]" />
        <span className="h-2 w-2 rounded-full border border-[#ff2a3b]" />
      </div>
    </div>
  );
}
