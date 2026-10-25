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
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-6">
        
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

      {/* Authentic Hand-Drawn Chalkboard Mathematics & Physics Doodles Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-55">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Top-Right Formulas & Stars above Monitor */}
          <g stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.75">
            <path d="M 85% 15% L 85.5% 16.5% L 87% 16.5% L 85.8% 17.5% L 86.2% 19% L 85% 18% L 83.8% 19% L 84.2% 17.5% L 83% 16.5% L 84.5% 16.5% Z" strokeDasharray="3 2" />
            <path d="M 88% 22% L 88.4% 23% L 89.5% 23% L 88.6% 23.8% L 89% 25% L 88% 24.2% L 87% 25% L 87.4% 23.8% L 86.5% 23% L 87.6% 23% Z" strokeDasharray="2 2" />
            <text x="78%" y="14%" fill="#F8FAFC" fontSize="13" fontFamily="Permanent Marker" opacity="0.8">dx / dt = v</text>
            <text x="82%" y="19%" fill="#93C5FD" fontSize="11" fontFamily="Caveat" opacity="0.7">x² + y² = r²</text>
          </g>

          {/* Curved Hand-Drawn Chalk Arrow pointing to 'Explore Our Games' */}
          <g stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.6">
            <path d="M 160 520 C 140 560, 150 590, 185 600" strokeDasharray="4 3" />
            <polyline points="175,595 186,600 182,588" strokeLinecap="round" strokeLinejoin="round" />
            <text x="110" y="550" fill="#FDE047" fontSize="13" fontFamily="Caveat" transform="rotate(-15 110 550)">start here</text>
          </g>

          {/* Right Bottom Math Formulas (as in reference image) */}
          <g opacity="0.85">
            <text x="82%" y="67%" fill="#F8FAFC" fontSize="13" fontFamily="Permanent Marker" opacity="0.75">
              ΔV = 2/(3L) · erctan(b²)
            </text>
            <text x="84%" y="78%" fill="#93C5FD" fontSize="12" fontFamily="Caveat" opacity="0.8">
              max(h) = 1/2
            </text>
            <text x="86%" y="85%" fill="#FDE047" fontSize="14" fontFamily="Caveat" opacity="0.85">
              (x - 5) / 2
            </text>
          </g>

          {/* Realistic 3D White Chalk Piece on Bottom Slate Ledge */}
          <g transform="translate(1000, 780) rotate(-18)" opacity="0.95">
            {/* Powdery chalk dust smudge behind the chalk stick */}
            <ellipse cx="25" cy="8" rx="28" ry="12" fill="#FFFFFF" opacity="0.12" filter="blur(4px)" />
            {/* Chalk stick body */}
            <rect x="0" y="0" width="46" height="13" rx="3.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            {/* Subtle cylinder chalk shadow */}
            <rect x="0" y="7" width="46" height="6" rx="2" fill="#CBD5E1" opacity="0.5" />
            {/* Chalk stick tip */}
            <ellipse cx="46" cy="6.5" rx="3.5" ry="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
            <ellipse cx="0" cy="6.5" rx="3.5" ry="6.5" fill="#E2E8F0" />
            {/* Small chalk broken fragment */}
            <circle cx="-12" cy="14" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="-16" cy="18" r="1.5" fill="#FFFFFF" opacity="0.6" />
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
