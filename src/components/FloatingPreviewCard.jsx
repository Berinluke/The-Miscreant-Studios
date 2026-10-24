import React from 'react';
import { hudAudio } from './AudioEngine';

export default function FloatingPreviewCard({ character, onOpenCollection }) {
  return (
    <div className="absolute right-6 sm:right-10 md:right-16 top-1/2 -translate-y-4 sm:translate-y-0 z-20 hidden sm:flex items-center gap-4 glass-hud-red p-4 sm:p-5 rounded-2xl max-w-sm shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-[#ff2a3b]/40">
      {/* Left text column */}
      <div className="flex-1">
        <h3 className="font-orbitron text-base sm:text-lg font-black tracking-wider text-white uppercase flex items-center gap-2">
          {character.name}
        </h3>
        
        <p className="mt-1 text-[11px] text-neutral-300 font-sans leading-tight">
          {character.desc}
        </p>

        <button
          onClick={() => {
            hudAudio.playOpen();
            onOpenCollection();
          }}
          className="mt-3 px-4 py-1.5 bg-[#ff2a3b]/20 hover:bg-[#ff2a3b] text-white hover:text-black border border-[#ff2a3b] rounded-full text-[10px] font-sans font-bold tracking-wider transition-all duration-200 active:scale-95"
        >
          Open Collection
        </button>
      </div>

      {/* Right mini character cutout preview */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border border-[#ff2a3b]/50 bg-black/60 shadow-[0_0_15px_rgba(255,42,59,0.3)]">
        <img 
          src="/assets/operator-character.png" 
          alt={character.name}
          className="w-full h-full object-cover object-center scale-150 translate-y-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
