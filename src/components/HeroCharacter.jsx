import React, { useState, useEffect } from 'react';

export default function HeroCharacter({ title = "ZODIAC" }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Deep Atmospheric Crimson Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] via-[#1a0508] to-[#0a0204]" />
      
      {/* Red Ambient Glow Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff2a3b]/25 blur-[130px] pointer-events-none" />

      {/* Layer 1: Giant Typography BEHIND the Character */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-full flex items-center justify-center transition-transform duration-200 ease-out z-10"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.3}px), calc(-65% + ${mouseOffset.y * 0.3}px))`
        }}
      >
        <span className="font-orbitron text-7xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-black tracking-[0.08em] text-white select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-95">
          {title}
        </span>
      </div>

      {/* Layer 2: Center 3D Cyber Warrior Overlapping the Typography */}
      <div 
        className="relative z-20 flex items-center justify-center h-full max-h-[85vh] transition-transform duration-300 ease-out translate-y-6 sm:translate-y-10"
        style={{
          transform: `translate(${mouseOffset.x * 0.6}px, calc(1.5rem + ${mouseOffset.y * 0.6}px))`
        }}
      >
        <div className="relative h-full flex items-center justify-center">
          <img 
            src="/assets/operator-character.png" 
            alt="Cyber Warrior"
            className="h-[75vh] max-h-[620px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(255,42,59,0.4)]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Floating Red Ember Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#ff2a3b] shadow-[0_0_10px_#ff2a3b] animate-ping" />
        <span className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#ff2a3b] shadow-[0_0_12px_#ff2a3b] opacity-80" />
        <span className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white opacity-70" />
      </div>
    </div>
  );
}
