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
      {/* Global SVG Chalk Texture Filters for GPU-Accelerated Lettering */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          {/* Authentic Physical Chalk Stick Roughness & Porosity Filter */}
          <filter id="chalk-piece-realistic" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="fineNoise" />
            <feDisplacementMap in="SourceGraphic" in2="fineNoise" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="roughened" />
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="porosity" />
            <feColorMatrix in="porosity" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0.15" result="porousAlpha" />
            <feComposite in="roughened" in2="porousAlpha" operator="in" result="porousChalk" />
            <feGaussianBlur in="roughened" stdDeviation="0.8" result="chalkDust" />
            <feMerge>
              <feMergeNode in="chalkDust" />
              <feMergeNode in="porousChalk" />
            </feMerge>
          </filter>

          {/* Chalk Coral Tagline Filter */}
          <filter id="chalk-piece-coral" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>
      </svg>

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
          
          {/* Main Scraped Chalk Studio Title (Heavy Condensed Sans-Serif Bebas Neue / Eraser Dust) */}
          <div className="relative">
            <h1 
              ref={letterTRef}
              className="chalk-piece-headline text-6xl sm:text-7xl md:text-8xl lg:text-[7.6rem] font-black leading-[0.88] select-none text-white tracking-wide"
            >
              THE MISCREANT<br />STUDIOS
            </h1>

            {/* Hand-drawn chalk highlight smudge underline */}
            <div className="w-64 sm:w-80 h-2 bg-white/25 rounded-full blur-[1px] mt-3 ml-1" />
          </div>

          {/* Tagline in Coral Chalk Block/Condensed Typography */}
          <div className="chalk-piece-tagline text-2xl sm:text-3xl md:text-4xl tracking-wider mt-4 sm:mt-5 select-none font-black">
            BUILT FOR PLAYERS. DESIGNED FOR CHAOS.
          </div>

          {/* Description written in authentic classroom chalk font */}
          <p className="text-slate-200 text-base sm:text-lg md:text-xl max-w-xl font-hand font-bold tracking-wide leading-relaxed mt-4 sm:mt-5 select-none chalk-text">
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
              className="group relative px-8 py-3.5 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
              <span className="relative z-10 font-bebas text-2xl sm:text-3xl tracking-wider group-hover:text-amber-100 transition-colors uppercase chalk-piece-btn">
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
              className="group relative px-7 py-3.5 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
              <span className="relative z-10 font-bebas text-2xl sm:text-3xl tracking-wider group-hover:text-white transition-colors uppercase chalk-piece-btn">
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
