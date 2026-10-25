import React from 'react';

/**
 * ChalkboardFrame
 * 
 * 100% Pure Code & SVG Galvanized Steel Hardware Frame:
 * - Authentic corrugated weathered industrial steel border around the perimeter
 * - 4 Heavy-gauge galvanized corner brackets with 3D slotted hex bolt rivets
 * - Precision metallic bevels and shadow casting onto the green slate
 */
export default function ChalkboardFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden">
      
      {/* Top Galvanized Steel Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-gradient-to-b from-[#6B7B74] via-[#46544D] to-[#25302A] border-b border-[#1A231E] shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {/* Subtle brushed metal sheen lines */}
        <div className="w-full h-0.5 bg-white/20" />
        <div className="w-full h-full opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
      </div>

      {/* Bottom Galvanized Steel Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 bg-gradient-to-t from-[#6B7B74] via-[#46544D] to-[#25302A] border-t border-[#1A231E] shadow-[0_-4px_12px_rgba(0,0,0,0.8)]">
        <div className="w-full h-full opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
        <div className="w-full h-0.5 bg-black/40 absolute top-0" />
      </div>

      {/* Left Galvanized Steel Bar */}
      <div className="absolute top-0 bottom-0 left-0 w-4 md:w-6 bg-gradient-to-r from-[#6B7B74] via-[#46544D] to-[#25302A] border-r border-[#1A231E] shadow-[4px_0_12px_rgba(0,0,0,0.8)]">
        <div className="w-0.5 h-full bg-white/20 absolute left-0" />
      </div>

      {/* Right Galvanized Steel Bar */}
      <div className="absolute top-0 bottom-0 right-0 w-4 md:w-6 bg-gradient-to-l from-[#6B7B74] via-[#46544D] to-[#25302A] border-l border-[#1A231E] shadow-[-4px_0_12px_rgba(0,0,0,0.8)]">
        <div className="w-0.5 h-full bg-black/40 absolute left-0" />
      </div>

      {/* 4 Heavy-Gauge Bolted Metal Corner Brackets (Pure SVG with 3D Rivets) */}
      
      {/* Top-Left Corner Bracket */}
      <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 z-50">
        <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-[2px_3px_5px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bracketGradTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A9992" />
              <stop offset="40%" stopColor="#54635C" />
              <stop offset="80%" stopColor="#323F38" />
              <stop offset="100%" stopColor="#1E2722" />
            </linearGradient>
            <radialGradient id="boltGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#DDE5E1" />
              <stop offset="35%" stopColor="#7F8F87" />
              <stop offset="75%" stopColor="#3C4842" />
              <stop offset="100%" stopColor="#1C2420" />
            </radialGradient>
          </defs>
          {/* L-Shaped Metal Bracket Plate */}
          <polygon points="0,0 64,0 64,22 22,22 22,64 0,64" fill="url(#bracketGradTL)" stroke="#1A221E" strokeWidth="1.2" />
          <polygon points="1,1 63,1 63,4 4,4 4,63 1,63" fill="#FFFFFF" opacity="0.35" />
          {/* Bolted Rivet 1 (Horizontal leg) */}
          <circle cx="42" cy="11" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="39" y1="11" x2="45" y2="11" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
          {/* Bolted Rivet 2 (Vertical leg) */}
          <circle cx="11" cy="42" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="11" y1="39" x2="11" y2="45" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Top-Right Corner Bracket */}
      <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 z-50">
        <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-[-2px_3px_5px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bracketGradTR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A9992" />
              <stop offset="40%" stopColor="#54635C" />
              <stop offset="80%" stopColor="#323F38" />
              <stop offset="100%" stopColor="#1E2722" />
            </linearGradient>
          </defs>
          <polygon points="64,0 0,0 0,22 42,22 42,64 64,64" fill="url(#bracketGradTR)" stroke="#1A221E" strokeWidth="1.2" />
          <polygon points="63,1 1,1 1,4 60,4 60,63 63,63" fill="#FFFFFF" opacity="0.35" />
          <circle cx="22" cy="11" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="19" y1="11" x2="25" y2="11" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="53" cy="42" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="53" y1="39" x2="53" y2="45" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom-Left Corner Bracket */}
      <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 z-50">
        <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-[2px_-3px_5px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bracketGradBL" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A9992" />
              <stop offset="40%" stopColor="#54635C" />
              <stop offset="80%" stopColor="#323F38" />
              <stop offset="100%" stopColor="#1E2722" />
            </linearGradient>
          </defs>
          <polygon points="0,64 64,64 64,42 22,42 22,0 0,0" fill="url(#bracketGradBL)" stroke="#1A221E" strokeWidth="1.2" />
          <circle cx="42" cy="53" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="39" y1="53" x2="45" y2="53" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="11" cy="22" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="11" y1="19" x2="11" y2="25" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bottom-Right Corner Bracket */}
      <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 z-50">
        <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-[-2px_-3px_5px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="bracketGradBR" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8A9992" />
              <stop offset="40%" stopColor="#54635C" />
              <stop offset="80%" stopColor="#323F38" />
              <stop offset="100%" stopColor="#1E2722" />
            </linearGradient>
          </defs>
          <polygon points="64,64 0,64 0,42 42,42 42,0 64,0" fill="url(#bracketGradBR)" stroke="#1A221E" strokeWidth="1.2" />
          <circle cx="22" cy="53" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="19" y1="53" x2="25" y2="53" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="53" cy="22" r="5" fill="url(#boltGrad)" stroke="#161E1A" strokeWidth="0.8" />
          <line x1="53" y1="19" x2="53" y2="25" stroke="#252F2A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

    </div>
  );
}
