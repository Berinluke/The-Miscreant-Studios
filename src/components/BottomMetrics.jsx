import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function BottomMetrics({ onOpenFeatured }) {
  const stats = [
    { value: "128 HZ", label: "BARE-METAL TICK" },
    { value: "3.4M+", label: "COMBAT HOURS" },
    { value: "120+", label: "FPS TARGET" }
  ];

  const partners = ["STEAM", "UNREAL", "NEXON", "SONY"];

  return (
    <div className="relative z-20 w-full flex flex-wrap items-end justify-between gap-6 px-6 sm:px-12 pb-6 sm:pb-8 pt-4">
      {/* Left Numerical Metrics */}
      <div className="flex items-center gap-6 sm:gap-10">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-dominate text-3xl sm:text-4xl text-[#ff1f3d] tracking-normal leading-none">
              {stat.value}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Center "TRUSTED BY" Logos */}
      <div className="hidden xl:flex flex-col items-start gap-1.5 border-l border-white/10 pl-8">
        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          POWERED BY & ARCHITECTED FOR
        </span>
        <div className="flex items-center gap-6 text-sm font-sans font-black tracking-wider text-neutral-400">
          {partners.map((p) => (
            <span key={p} className="hover:text-white transition-colors cursor-default">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Right Floating Featured Project Card */}
      <div 
        onClick={() => {
          hudAudio.playOpen();
          onOpenFeatured();
        }}
        className="group relative flex items-center gap-4 p-3 pr-5 bg-black/80 hover:bg-neutral-900/90 backdrop-blur-md border border-white/15 hover:border-[#ff1f3d]/60 rounded-xl cursor-pointer shadow-2xl transition-all duration-300 max-w-xs sm:max-w-sm"
      >
        {/* Project Thumbnail with Red Hue */}
        <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden bg-neutral-950 flex-shrink-0 border border-white/10">
          <img 
            src="/assets/operator-character.png" 
            alt="Project Overkill" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#ff1f3d]/20 mix-blend-color" />
        </div>

        {/* Project Details */}
        <div className="flex flex-col">
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
            FEATURED TITLE
          </span>
          <span className="font-sans font-bold text-xs sm:text-sm text-white group-hover:text-[#ff1f3d] transition-colors leading-tight mt-0.5">
            PROJECT: OVERKILL
          </span>
          <span className="text-[10px] text-neutral-400 font-sans mt-0.5">
            128Hz Arena Brawler
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#ff1f3d] mt-1">
            <span>VIEW CASE STUDY</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
