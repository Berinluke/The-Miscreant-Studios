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
      {/* Interactive Fighter Jet & Stickmen Paratrooper Scrollytelling Mission */}
      <JetMissionScrollytelling
        containerRef={containerRef}
        letterTRef={letterTRef}
        studiosRef={studiosRef}
        btnRef={btnRef}
        monitorRef={monitorRef}
      />

      {/* Main Hero Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pl-6 sm:pl-12">
        
        {/* Left: Typography & Story Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          <div className="space-y-2">
            <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-slate-950 leading-[0.88] relative">
              <span className="inline-block relative">
                <span>THE</span>
              </span>{' '}
              <span className="inline-block relative">
                <span>MISCREAN</span>
                {/* TARGET LANDING PERCH: THE 'T' IN MISCREANT MARKED BY USER */}
                <span ref={letterTRef} className="relative inline-block text-slate-950">
                  T
                </span>
              </span>
              <br className="hidden sm:inline" />{' '}
              <span ref={studiosRef} className="inline-block">STUDIOS</span>
            </h1>

            <p className="font-bebas text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#FF2A5F]">
              {studioInfo.subTagline}
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
            Independent game studio based in Chennai, India. We forge living digital battlegrounds and bare-metal engine systems that push human reflexes to their limits.
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
              className="px-7 py-3.5 rounded-full bg-slate-950 hover:bg-[#FF2A5F] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-2"
            >
              Explore Our Games
            </a>

            <a
              href="#culture"
              onClick={(e) => {
                if (onScrollDown) {
                  e.preventDefault();
                  onScrollDown('culture');
                }
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm tracking-wide border border-slate-300 transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>Studio Story</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>

        </div>

        {/* Right: Big Hand-Drawn Blue Pen Joystick (Sticky & completely stationary) */}
        <div ref={monitorRef} className="lg:col-span-5 relative flex items-center justify-center sticky top-20">
          <BluePenDoodleJoystick />
        </div>

      </div>

      {/* Clean Minimalist Footer */}
      <div className="relative z-10 w-full flex items-center justify-between max-w-7xl mx-auto pt-6 border-t border-slate-200 text-xs font-medium text-slate-500">
        <span>Chennai, Tamil Nadu, India</span>
        
        <a 
          href="#games"
          onClick={(e) => {
            if (onScrollDown) {
              e.preventDefault();
              onScrollDown('games');
            }
          }}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-950 transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-slate-900" />
        </a>

        <span>Independent &amp; Player-Owned</span>
      </div>

    </section>
  );
}
