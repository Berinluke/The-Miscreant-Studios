import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { hudAudio } from './AudioEngine';

export default function Navigation({ onOpenContact, onSelectSection }) {
  const navLinks = [
    { label: "GAMES", id: "games" },
    { label: "ENGINE (128HZ)", id: "engine" },
    { label: "WAR ROOM", id: "warroom" },
    { label: "MANIFESTO", id: "manifesto" }
  ];

  return (
    <header className="relative z-30 w-full flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-8">
      {/* Studio Brand Monogram */}
      <div 
        onClick={() => {
          hudAudio.playClick();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded bg-[#ff1f3d] flex items-center justify-center shadow-[0_0_15px_rgba(255,31,61,0.5)] group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
          </svg>
        </div>
        <div>
          <div className="font-sans font-black text-sm tracking-widest uppercase text-white leading-tight">
            THE MISCREANT
          </div>
          <div className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase">
            STUDIOS // REMOTE NODE
          </div>
        </div>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              hudAudio.playClick();
              onSelectSection(item.id);
            }}
            className="text-xs font-mono tracking-widest text-neutral-300 hover:text-white uppercase transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Action CTA */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            hudAudio.playOpen();
            onOpenContact();
          }}
          className="group flex items-center gap-2 px-5 py-2.5 bg-[#ff1f3d] hover:bg-[#e01633] text-white font-sans font-bold text-xs tracking-wider uppercase rounded transition-all duration-200 shadow-[0_0_20px_rgba(255,31,61,0.4)] active:scale-95"
        >
          <span>JOIN THE CHAOS</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
