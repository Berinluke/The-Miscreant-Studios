import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function LeftInfoPanel({ character, onWatchMore }) {
  return (
    <div className="absolute left-6 sm:left-10 md:left-14 bottom-12 sm:bottom-16 md:bottom-20 z-20 max-w-xs sm:max-w-sm flex flex-col items-start select-none">
      {/* 01 Indicator with Vertical Dots */}
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-[#ff2a3b] shadow-[0_0_8px_#ff2a3b]" />
        <span className="font-mono text-xs text-white/80 font-bold">{character.code}</span>
      </div>

      <div className="flex flex-col gap-1.5 mb-5 pl-0.5">
        <span className="h-1.5 w-1.5 rounded-full border border-white/40" />
        <span className="h-1.5 w-1.5 rounded-full border border-white/40" />
      </div>

      {/* Main Section Heading */}
      <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide leading-snug text-white">
        DISCOVER <span className="text-[#ff2a3b] drop-shadow-[0_0_15px_rgba(255,42,59,0.8)]">NEW</span><br />
        NFT COLLECTION
      </h2>

      {/* Lore Description */}
      <p className="mt-3 text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed tracking-normal max-w-[280px]">
        {character.lore}
      </p>

      {/* Watch More Pill Button with Circle Arrow */}
      <button
        onClick={() => {
          hudAudio.playOpen();
          onWatchMore();
        }}
        className="mt-6 group flex items-center justify-between pl-6 pr-1.5 py-1.5 bg-white hover:bg-neutral-100 text-black rounded-full shadow-2xl transition-all duration-200 active:scale-95"
      >
        <span className="text-xs sm:text-sm font-sans font-bold tracking-tight pr-4">
          Watch More
        </span>
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black text-white group-hover:bg-[#ff2a3b] transition-colors">
          <ArrowDownRight className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
