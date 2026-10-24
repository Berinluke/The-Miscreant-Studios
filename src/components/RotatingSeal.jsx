import React from 'react';

export default function RotatingSeal({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Outer Rotating SVG Text Ring */}
      <svg
        className="w-28 h-28 sm:w-32 sm:h-32 animate-spin-slow"
        viewBox="0 0 160 160"
      >
        <path
          id="circlePath"
          d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          fill="none"
        />
        <text className="text-[10px] uppercase font-mono tracking-[0.24em] fill-white/80 font-bold">
          <textPath href="#circlePath" startOffset="0%">
            THE MISCREANT STUDIOS • DIGITAL CHAOS •
          </textPath>
        </text>
      </svg>

      {/* Center Crimson Badge Icon */}
      <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#9c0a18] to-[#ff2a3b] border-2 border-white/20 flex items-center justify-center shadow-[0_0_25px_rgba(255,31,61,0.6)]">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
        </svg>
      </div>

      {/* Floating Gold Coin Shimmer */}
      <div className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-gradient-to-tr from-[#e5a00d] to-[#ffd700] shadow-[0_0_12px_#ffd700] rotate-12 opacity-90 animate-bounce" />
    </div>
  );
}
