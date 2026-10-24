import React from 'react';

export default function RightStatsDock({ stats }) {
  return (
    <div 
      className="absolute bottom-0 right-0 z-20 bg-white text-neutral-900 pt-3 pb-3 sm:pb-4 px-6 sm:px-10 flex items-center gap-6 sm:gap-10 shadow-2xl stats-dock-cut"
      style={{
        borderTopLeftRadius: '24px',
        borderBottomRightRadius: '20px'
      }}
    >
      {/* Stat 1 */}
      <div className="flex flex-col items-start pl-2">
        <span className="font-orbitron text-lg sm:text-2xl font-black tracking-tight text-black">
          {stats.collections}
        </span>
        <span className="text-[9px] sm:text-[11px] font-sans text-neutral-500 font-medium lowercase">
          {stats.collectionsLabel}
        </span>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col items-start">
        <span className="font-orbitron text-lg sm:text-2xl font-black tracking-tight text-black">
          {stats.community}
        </span>
        <span className="text-[9px] sm:text-[11px] font-sans text-neutral-500 font-medium lowercase">
          {stats.communityLabel}
        </span>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col items-start">
        <span className="font-orbitron text-lg sm:text-2xl font-black tracking-tight text-black">
          {stats.cards}
        </span>
        <span className="text-[9px] sm:text-[11px] font-sans text-neutral-500 font-medium lowercase">
          {stats.cardsLabel}
        </span>
      </div>
    </div>
  );
}
