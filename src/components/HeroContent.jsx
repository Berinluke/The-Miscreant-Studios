import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function HeroContent({ onExplore, onOpenProject }) {
  return (
    <div className="relative z-20 flex flex-col items-start max-w-2xl select-none">
      {/* Massive 3-Line Title */}
      <h1 className="font-dominate text-7xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tight text-white uppercase select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
        <span className="block text-white">THE</span>
        <span className="block text-white">MISCREANT</span>
        <span className="block text-[#ff1f3d] text-crimson-glow">STUDIOS</span>
      </h1>

      {/* Studio Value Proposition Narrative */}
      <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-300 font-sans font-normal leading-relaxed max-w-lg">
        We forge living digital battlegrounds and bare-metal engine systems that push human reflexes and raw silicon to their computational breaking points.
      </p>

      {/* Action Buttons Row */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
        <button
          onClick={() => {
            hudAudio.playOpen();
            onOpenProject();
          }}
          className="group flex items-center gap-2.5 px-6 sm:px-7 py-3 bg-[#ff1f3d] hover:bg-[#e01633] text-white font-sans font-bold text-xs sm:text-sm tracking-wider uppercase rounded shadow-[0_0_25px_rgba(255,31,61,0.5)] transition-all duration-200 active:scale-95"
        >
          <span>ENTER ARENA</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        <button
          onClick={() => {
            hudAudio.playClick();
            onExplore();
          }}
          className="group flex items-center gap-2 text-xs sm:text-sm font-sans font-bold tracking-wider text-neutral-300 hover:text-white uppercase transition-colors"
        >
          <span>SEE OUR WORK</span>
          <span className="text-[#ff1f3d] group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
