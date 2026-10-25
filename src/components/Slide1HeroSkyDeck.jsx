import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import JetMissionScrollytelling from './JetMissionScrollytelling';
import ChalkBattlestationSvg from './ChalkBattlestationSvg';

/**
 * Slide1HeroSkyDeck
 * 
 * 100% Pure Code & SVG Chalkboard Hero Stage:
 * - High-character scraped chalk typography ("THE MISCREANT STUDIOS", coral tagline, description)
 * - Hand-drawn SVG chalk pill buttons ("Explore Our Games", "Studio Story ↗")
 * - Hand-drawn chalk arrows, formulas, and math doodles
 * - Pure SVG Chalk Battlestation on fluted pedestal with live 60 FPS Canvas racing game
 * - Zero raster screenshots used anywhere!
 */
export default function Slide1HeroSkyDeck({ onScrollDown }) {
  const containerRef = useRef(null);
  const letterTRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-10 sm:pt-14 pb-8 px-6 sm:px-10 lg:px-16 bg-transparent select-none overflow-hidden"
    >
      {/* Supersonic Fighter Jet Atmospheric Flyby */}
      <JetMissionScrollytelling
        containerRef={containerRef}
        letterTRef={letterTRef}
      />

      {/* Main Hero Stage (Two-Column Asymmetric Architectural Bento Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ==============================================================
            LEFT COLUMN: Pure Code Chalk Typography & Hand-Drawn Buttons
            ============================================================== */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center relative">
          
          {/* Main Scraped Chalk Studio Title */}
          <div className="relative">
            <h1 
              ref={letterTRef}
              className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-black tracking-tight leading-[0.88] chalk-title text-white select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            >
              THE MISCREANT<br />STUDIOS
            </h1>

            {/* Hand-drawn chalk highlight smudge underline */}
            <div className="w-48 sm:w-64 h-1 bg-white/20 rounded-full blur-[1px] mt-2 ml-1" />
          </div>

          {/* Tagline in Coral Chalk */}
          <div className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-wide chalk-coral mt-5 select-none drop-shadow-[0_2px_8px_rgba(251,113,133,0.3)]">
            BUILT FOR PLAYERS. DESIGNED FOR CHAOS.
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mt-4 sm:mt-5 select-none">
            Independent game studio forging addictive hyper-casual hits and rich, immersive story-based games designed for pure player immersion.
          </p>

          {/* Action Row: Real Hand-Drawn Chalk Pill Buttons & Doodles */}
          <div className="relative flex flex-wrap items-center gap-5 sm:gap-6 mt-8 sm:mt-10">
            
            {/* Button 1: "Explore Our Games" (Pure SVG Rough Chalk Oval) */}
            <a
              href="#games"
              onClick={(e) => {
                e.preventDefault();
                if (onScrollDown) onScrollDown('games');
              }}
              className="group relative px-8 py-3.5 rounded-full cursor-pointer flex items-center justify-center font-sans font-bold text-sm sm:text-base tracking-wide text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              title="Explore Our Games"
              aria-label="Explore Our Games"
            >
              {/* SVG Rough Chalk Oval Border & Dust Fill */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
                preserveAspectRatio="none" 
                viewBox="0 0 180 52"
              >
                <rect 
                  x="2" y="2" width="176" height="48" rx="24" 
                  fill="#FFFFFF" fillOpacity="0.14" 
                  stroke="#FFFFFF" strokeWidth="2.2" 
                  strokeDasharray="40 2 80 3" 
                  className="group-hover:fill-opacity-25 group-hover:stroke-amber-200 transition-all duration-200" 
                />
                <rect 
                  x="5" y="5" width="170" height="42" rx="21" 
                  fill="none" 
                  stroke="#FFFFFF" strokeWidth="1" 
                  strokeDasharray="25 3 50 2" 
                  opacity="0.6" 
                />
              </svg>
              <span className="relative z-10 chalk-title group-hover:text-amber-100 transition-colors">
                Explore Our Games
              </span>
            </a>

            {/* Button 2: "Studio Story ↗" (Pure SVG Chalk Capsule Outline) */}
            <a
              href="#culture"
              onClick={(e) => {
                e.preventDefault();
                if (onScrollDown) onScrollDown('culture');
              }}
              className="group relative px-7 py-3.5 rounded-full cursor-pointer flex items-center justify-center font-sans font-medium text-sm sm:text-base tracking-wide text-slate-200 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              title="Studio Story"
              aria-label="Studio Story"
            >
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
                preserveAspectRatio="none" 
                viewBox="0 0 150 52"
              >
                <rect 
                  x="2" y="2" width="146" height="48" rx="24" 
                  fill="none" 
                  stroke="#CBD5E1" strokeWidth="1.8" 
                  strokeDasharray="35 3 65 2" 
                  className="group-hover:stroke-emerald-300 group-hover:fill-white/10 transition-all duration-200" 
                />
              </svg>
              <span className="relative z-10 chalk-text group-hover:text-white transition-colors">
                Studio Story ↗
              </span>
            </a>

            {/* Hand-Drawn Chalk Arrow pointing to 'Explore Our Games' */}
            <div className="hidden sm:block absolute left-6 -top-9 pointer-events-none select-none">
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                <path d="M 8 6 C 18 16, 28 20, 38 28" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.75" />
                <polyline points="32,27 39,29 37,22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
                <text x="4" y="12" fill="#FDE047" fontSize="13" fontFamily="Caveat" transform="rotate(-10 4 12)">start here</text>
              </svg>
            </div>

          </div>

        </div>

        {/* ==============================================================
            RIGHT COLUMN: Pure SVG Chalk Battlestation on Pedestal with Live Racing Game
            ============================================================== */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <ChalkBattlestationSvg />
        </div>

      </div>

      {/* ==============================================================
          BOTTOM MINIMALIST CHALKBOARD FOOTER (100% Remote-First)
          ============================================================== */}
      <div className="relative z-20 w-full flex items-center justify-between max-w-7xl mx-auto pt-6 border-t border-slate-700/60 text-xs font-medium text-slate-400">
        
        {/* Left: Global & 100% Remote Badge */}
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-300 font-semibold tracking-wider">
            Global &amp; 100% Remote Studio
          </span>
        </span>
        
        {/* Center: Scroll to explore */}
        <a 
          href="#games"
          onClick={(e) => {
            if (onScrollDown) {
              e.preventDefault();
              onScrollDown('games');
            }
          }}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors chalk-text"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-slate-200" />
        </a>

        {/* Right: Technical Metadata */}
        <span className="font-mono text-slate-400">
          Independent &amp; Player-Owned
        </span>
      </div>

    </section>
  );
}
