import React, { useState, useEffect, useRef } from 'react';
import { studioInfo } from '../data/studioData';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import JetMissionScrollytelling from './JetMissionScrollytelling';
import BluePenDoodleJoystick from './BluePenDoodleJoystick';

export default function Slide1HeroSkyDeck({ onScrollDown }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Anchor references for precise stickmen paratrooper and letter jumps
  const containerRef = useRef(null);
  const letterTRef = useRef(null);
  const studiosRef = useRef(null);
  const btnRef = useRef(null);
  const monitorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-12 sm:pt-16 pb-10 px-6 sm:px-10 lg:px-16 bg-transparent overflow-hidden select-none"
    >
      {/* Supersonic Fighter Jet Atmospheric Flyby */}
      <JetMissionScrollytelling
        containerRef={containerRef}
        letterTRef={letterTRef}
      />

      {/* Main Hero Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pl-6 sm:pl-12">
        
        {/* Left: Typography & Story Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          <div className="space-y-3">
            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] relative chalk-title">
              <span className="inline-block relative">
                <span>THE</span>
              </span>{' '}
              <span className="inline-block relative">
                <span>MISCREAN</span>
                {/* TARGET LANDING PERCH: THE 'T' IN MISCREANT MARKED BY USER */}
                <span ref={letterTRef} className="relative inline-block text-white">
                  T
                </span>
              </span>
              <br className="hidden sm:inline" />{' '}
              <span ref={studiosRef} className="inline-block">STUDIOS</span>
            </h1>

            <p className="font-bebas text-3xl sm:text-4xl md:text-5xl tracking-wide chalk-coral">
              {studioInfo.subTagline}
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
            Independent game studio forging addictive hyper-casual hits and rich, immersive story-based games designed for pure player immersion.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              ref={btnRef}
              href="#games"
              onClick={(e) => {
                if (onScrollDown) {
                  e.preventDefault();
                  onScrollDown('games');
                }
              }}
              className="chalk-btn-primary px-8 py-3.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 active:scale-95"
            >
              <span>Explore Our Games</span>
            </a>

            <a
              href="#culture"
              onClick={(e) => {
                if (onScrollDown) {
                  e.preventDefault();
                  onScrollDown('culture');
                }
              }}
              className="chalk-btn-secondary px-7 py-3.5 rounded-full font-bold text-sm tracking-wide flex items-center gap-1.5 active:scale-95"
            >
              <span>Studio Story</span>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </a>
          </div>

        </div>

        {/* Right: Big Hand-Drawn Blue Pen Joystick (Sticky & completely stationary) */}
        <div ref={monitorRef} className="lg:col-span-5 relative flex items-center justify-center sticky top-20">
          <BluePenDoodleJoystick />
        </div>

      </div>

      {/* Hand-Drawn Chalkboard Mathematics & Physics Doodles Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Top-Right Chalk Stars & Formulas */}
          <g stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.6">
            <path d="M 120 180 L 126 195 L 142 195 L 129 204 L 134 220 L 120 210 L 106 220 L 111 204 L 98 195 L 114 195 Z" strokeDasharray="3 2" />
            <path d="M 60 320 C 80 300, 110 300, 130 320" strokeDasharray="2 3" />
            <text x="140" y="325" fill="#FFFFFF" fontSize="13" fontFamily="Permanent Marker" opacity="0.7">F = m · a</text>
          </g>

          {/* Center-Right Physics Doodles */}
          <g stroke="#93C5FD" strokeWidth="1" fill="none" opacity="0.5">
            <circle cx="580" cy="180" r="35" strokeDasharray="4 4" />
            <line x1="580" y1="140" x2="580" y2="220" />
            <line x1="540" y1="180" x2="620" y2="180" />
            <text x="590" y="170" fill="#93C5FD" fontSize="11" fontFamily="Caveat">θ = 45°</text>
          </g>

          {/* Bottom Chalk Formula & Chalk Piece */}
          <g opacity="0.7">
            <text x="75%" y="88%" fill="#FDE047" fontSize="14" fontFamily="Caveat" opacity="0.75">
              E = mc² // 60 FPS
            </text>
            <text x="68%" y="92%" fill="#FFFFFF" fontSize="12" fontFamily="Caveat" opacity="0.55">
              v = u + a·t
            </text>
            {/* White Chalk Piece on the Bottom Slate Ledge */}
            <g transform="translate(1020, 880) rotate(-14)">
              <rect x="0" y="0" width="34" height="10" rx="3" fill="#FFFFFF" opacity="0.9" />
              <rect x="2" y="2" width="30" height="6" rx="2" fill="#E2E8F0" opacity="0.6" />
              <ellipse cx="40" cy="7" rx="8" ry="3" fill="#FFFFFF" opacity="0.25" />
            </g>
          </g>
        </svg>
      </div>

      {/* Clean Minimalist Chalkboard Footer */}
      <div className="relative z-10 w-full flex items-center justify-between max-w-7xl mx-auto pt-6 border-t border-slate-700/60 text-xs font-medium text-slate-400">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Global &amp; 100% Remote Studio</span>
        </span>
        
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

        <span>Independent &amp; Player-Owned</span>
      </div>

    </section>
  );
}
