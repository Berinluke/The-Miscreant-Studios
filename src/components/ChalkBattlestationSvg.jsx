import React, { useState } from 'react';
import PlayableRacingGame from './PlayableRacingGame';

/**
 * ChalkBattlestationSvg
 * 
 * 100% Code & SVG Hand-Drawn Chalkboard Gaming Battlestation:
 * - Hand-sketched chalk monitor chassis mounted atop a classical Greek fluted column
 * - Ergonomic hand-drawn chalk gamepad controller with interactive clickable steer buttons
 * - Live 60 FPS HTML5 Canvas Racing Game embedded seamlessly inside the monitor window
 * - Authentic chalk math doodles (dx/dt = v, x² + y² = r², ΔV, stars)
 * - Zero raster screenshots used!
 */
export default function ChalkBattlestationSvg() {
  const [externalControl, setExternalControl] = useState(null);

  const handleSteer = (dir) => {
    setExternalControl(dir);
    setTimeout(() => setExternalControl(null), 120);
  };

  return (
    <div className="relative w-full max-w-[560px] flex flex-col items-center justify-center select-none py-1 pointer-events-auto">
      
      {/* Battlestation Master SVG & Canvas Composite */}
      <div className="relative w-full aspect-[460/480] drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        
        {/* Layer 1: Live Interactive 60 FPS Canvas Racing Game (Inside Chalk Screen Window) */}
        <div 
          className="absolute z-10 overflow-hidden bg-black"
          style={{
            left: '8.7%',
            top: '7.5%',
            width: '67.8%',
            height: '40.8%',
            borderRadius: '4px'
          }}
        >
          <PlayableRacingGame externalControl={externalControl} />
        </div>

        {/* Layer 2: Pure Code & SVG Hand-Drawn Chalkboard Artwork */}
        <svg 
          viewBox="0 0 460 480" 
          className="absolute inset-0 w-full h-full pointer-events-none z-20 select-none overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* SVG Chalk Stroke Roughness Filter for authentic porous chalk texture */}
            <filter id="chalkNoise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <filter id="chalkDustBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* ==========================================================
              1. MONITOR CHASSIS (Hand-Drawn Chalk Bezel)
              ========================================================== */}
          <g filter="url(#chalkNoise)" stroke="#FFFFFF" fill="none" opacity="0.95">
            {/* Outer Monitor Frame (x: 36, width: 316 -> ends at 352) */}
            <rect 
              x="36" y="32" width="316" height="200" rx="8" 
              strokeWidth="2.4" 
              strokeDasharray="160 2 220 3" 
            />
            <rect 
              x="40" y="36" width="308" height="192" rx="6" 
              strokeWidth="1.2" 
              strokeDasharray="80 3 120 2" 
              opacity="0.8" 
            />

            {/* Inner Monitor Bezel Framing the Screen Window */}
            <rect 
              x="42" y="38" width="304" height="188" rx="4" 
              strokeWidth="1.6" 
              stroke="#E2E8F0" 
            />

            {/* Corner diagonal chalk reinforcement brackets */}
            <line x1="38" y1="50" x2="48" y2="40" strokeWidth="1.6" />
            <line x1="350" y1="50" x2="340" y2="40" strokeWidth="1.6" />
            <line x1="38" y1="214" x2="48" y2="224" strokeWidth="1.6" />
            <line x1="350" y1="214" x2="340" y2="224" strokeWidth="1.6" />

            {/* Chalk hatch marks on the monitor chin */}
            <g strokeWidth="1.2" opacity="0.6">
              <line x1="180" y1="228" x2="190" y2="228" />
              <line x1="195" y1="228" x2="208" y2="228" />
              <line x1="214" y1="228" x2="224" y2="228" />
            </g>
          </g>

          {/* ==========================================================
              2. CLASSICAL GREEK FLUTED PEDESTAL COLUMN
              ========================================================== */}
          <g filter="url(#chalkNoise)" stroke="#FFFFFF" fill="none" opacity="0.92">
            {/* Column Capital Top Scroll / Cornice */}
            <path d="M 125 348 C 145 340, 245 340, 265 348 L 272 358 C 248 352, 142 352, 118 358 Z" strokeWidth="2.4" fill="#14281D" fillOpacity="0.4" />
            <line x1="115" y1="360" x2="275" y2="360" strokeWidth="2" />
            
            {/* Fluted Vertical Ridges on Column Shaft */}
            {/* Left Outer Contour */}
            <path d="M 128 360 Q 134 415 125 460" strokeWidth="2.6" />
            {/* Flute 1 */}
            <path d="M 145 360 Q 147 415 142 460" strokeWidth="2" strokeDasharray="30 2 50 1" />
            {/* Flute 2 */}
            <path d="M 165 360 Q 166 415 162 460" strokeWidth="2" />
            {/* Center Flute 3 */}
            <path d="M 185 360 Q 185 415 183 460" strokeWidth="2.2" />
            {/* Center Flute 4 */}
            <path d="M 205 360 Q 205 415 205 460" strokeWidth="2.2" />
            {/* Flute 5 */}
            <path d="M 225 360 Q 224 415 228 460" strokeWidth="2" />
            {/* Flute 6 */}
            <path d="M 245 360 Q 243 415 248 460" strokeWidth="2" strokeDasharray="40 2 40 1" />
            {/* Right Outer Contour */}
            <path d="M 262 360 Q 256 415 268 460" strokeWidth="2.6" />
            
            {/* Column Shaft Horizontal Shading & Scratches */}
            <g strokeWidth="1" opacity="0.5">
              <line x1="135" y1="385" x2="160" y2="385" />
              <line x1="172" y1="405" x2="200" y2="405" />
              <line x1="230" y1="395" x2="255" y2="395" />
              <line x1="138" y1="440" x2="175" y2="440" />
              <line x1="210" y1="445" x2="250" y2="445" />
            </g>

            {/* Stepped Column Base Plinth */}
            <path d="M 115 460 L 278 460 L 286 472 L 106 472 Z" strokeWidth="2.4" fill="#14281D" fillOpacity="0.5" />
            <line x1="100" y1="475" x2="292" y2="475" strokeWidth="2.8" />
          </g>

          {/* ==========================================================
              3. HAND-DRAWN CHALK GAMEPAD CONTROLLER
              ========================================================== */}
          <g filter="url(#chalkNoise)">
            {/* Controller Outer Body Silhouette */}
            <path 
              d="M 145 256 
                 C 165 252, 225 252, 245 256 
                 C 265 260, 295 272, 310 302 
                 C 322 328, 315 352, 292 360 
                 C 275 365, 258 350, 250 334 
                 C 238 312, 215 305, 195 305 
                 C 175 305, 152 312, 140 334 
                 C 132 350, 115 365, 98 360 
                 C 75 352, 68 328, 80 302 
                 C 95 272, 125 260, 145 256 Z" 
              fill="#12251B" 
              fillOpacity="0.9" 
              stroke="#FFFFFF" 
              strokeWidth="2.6" 
            />

            {/* Controller Inner Contour Line */}
            <path 
              d="M 150 262 
                 C 168 258, 222 258, 240 262 
                 C 258 266, 285 276, 298 305 
                 C 308 326, 302 342, 286 348 
                 C 274 352, 260 340, 254 326 
                 C 242 305, 218 298, 195 298 
                 C 172 298, 148 305, 136 326 
                 C 130 340, 116 352, 104 348 
                 C 88 342, 82 326, 92 305 
                 C 105 276, 132 266, 150 262 Z" 
              fill="none" 
              stroke="#E2E8F0" 
              strokeWidth="1.2" 
              opacity="0.8" 
            />

            {/* D-Pad (Left Cross) */}
            <g stroke="#FFFFFF" fill="#1A3324" strokeWidth="2">
              {/* Vertical Cross Bar */}
              <rect x="122" y="286" width="16" height="42" rx="2" />
              {/* Horizontal Cross Bar */}
              <rect x="109" y="299" width="42" height="16" rx="2" />
              {/* D-Pad Arrow Markings */}
              <polyline points="130,290 126,294 134,294" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
              <polyline points="130,324 126,320 134,320" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
              <polyline points="113,307 117,303 117,311" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
              <polyline points="147,307 143,303 143,311" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
            </g>

            {/* Action Buttons (Right 4 Buttons in Diamond Layout) */}
            <g stroke="#FFFFFF" fill="#1A3324" strokeWidth="1.8">
              {/* Top (Y) */}
              <circle cx="265" cy="292" r="7" />
              <text x="265" y="295.5" fill="#FDE047" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Y</text>
              {/* Left (X) */}
              <circle cx="251" cy="306" r="7" />
              <text x="251" y="309.5" fill="#67E8F9" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">X</text>
              {/* Right (B) */}
              <circle cx="279" cy="306" r="7" />
              <text x="279" y="309.5" fill="#FB7185" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">B</text>
              {/* Bottom (A) */}
              <circle cx="265" cy="320" r="7" />
              <text x="265" y="323.5" fill="#86EFAC" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">A</text>
            </g>

            {/* Dual Analog Thumbsticks */}
            <g stroke="#FFFFFF" strokeWidth="1.8" fill="#14281D">
              {/* Left Thumbstick */}
              <circle cx="158" cy="318" r="13" />
              <circle cx="158" cy="318" r="8" fill="#223E2C" strokeDasharray="3 2" />
              {/* Right Thumbstick */}
              <circle cx="232" cy="318" r="13" />
              <circle cx="232" cy="318" r="8" fill="#223E2C" strokeDasharray="3 2" />
            </g>

            {/* Center Touchpad / Miscreant Plate */}
            <rect x="175" y="266" width="40" height="22" rx="4" stroke="#FFFFFF" strokeWidth="1.5" fill="#1A3324" />
            <text x="195" y="280" fill="#FDE047" fontSize="7.5" fontFamily="Permanent Marker" textAnchor="middle" opacity="0.95">
              MISCREANT
            </text>
          </g>

          {/* ==========================================================
              4. SURROUNDING MATHEMATICS & PHYSICS CHALK DOODLES
              ========================================================== */}
          {/* Top Right Physics formula & Stars (Cleanly placed to right of monitor) */}
          <g opacity="0.9">
            <text x="368" y="22" fill="#FFFFFF" fontSize="13" fontFamily="Caveat" fontWeight="bold">
              dx / dt = v
            </text>
            <text x="375" y="44" fill="#93C5FD" fontSize="12" fontFamily="Caveat">
              x² + y² = r²
            </text>
            {/* Hand-Drawn Chalk Stars */}
            <path d="M 420 65 L 422 71 L 428 71 L 423 75 L 425 81 L 420 77 L 415 81 L 417 75 L 412 71 L 418 71 Z" stroke="#FDE047" strokeWidth="1.4" fill="none" />
            <path d="M 432 92 L 433 96 L 438 96 L 434 99 L 436 104 L 432 101 L 428 104 L 430 99 L 426 96 L 431 96 Z" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.75" />
          </g>

          {/* Right Bottom Math Formulas */}
          <g opacity="0.9">
            <text x="368" y="275" fill="#FFFFFF" fontSize="13" fontFamily="Permanent Marker" opacity="0.85">
              ΔV = 2/(3L)
            </text>
            <text x="376" y="325" fill="#93C5FD" fontSize="13" fontFamily="Caveat" opacity="0.95">
              max(h) = 1/2
            </text>
            <text x="382" y="360" fill="#FDE047" fontSize="15" fontFamily="Caveat">
              (x - 5) / 2
            </text>
            {/* Small chalk wedge diagram */}
            <polygon points="390,342 420,358 390,364" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
          </g>

          {/* Curved Hand-Drawn Chalk Arrow pointing Left */}
          <g stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.8" filter="url(#chalkNoise)">
            <path d="M 30 250 C 10 260, 10 290, 28 295" />
            <polyline points="20,288 29,295 23,304" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* ==========================================================
              5. REALISTIC 3D CHALK STICK PIECE (Bottom Slate Ledge)
              ========================================================== */}
          <g transform="translate(255, 410) rotate(-16)" opacity="0.95">
            {/* Powdery chalk dust smudge behind the chalk stick */}
            <ellipse cx="28" cy="9" rx="30" ry="12" fill="#FFFFFF" opacity="0.16" filter="url(#chalkDustBlur)" />
            {/* Chalk stick body */}
            <rect x="0" y="0" width="48" height="13" rx="3.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            {/* Subtle cylinder 3D bevel shadow */}
            <rect x="0" y="7" width="48" height="6" rx="2" fill="#94A3B8" opacity="0.65" />
            {/* Chalk stick rounded tips */}
            <ellipse cx="48" cy="6.5" rx="3.5" ry="6.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
            <ellipse cx="0" cy="6.5" rx="3.5" ry="6.5" fill="#CBD5E1" />
            {/* Small broken chalk crumbs */}
            <circle cx="-10" cy="14" r="2.8" fill="#FFFFFF" opacity="0.85" />
            <circle cx="-16" cy="18" r="1.6" fill="#FFFFFF" opacity="0.6" />
          </g>
        </svg>

        {/* Layer 3: Interactive Steer Controls over Gamepad D-Pad & Action Buttons */}
        
        {/* Left D-Pad Steer Hitbox */}
        <button
          onClick={() => handleSteer('left')}
          className="absolute z-30 cursor-pointer rounded-full hover:bg-cyan-400/25 active:scale-90 transition-all flex items-center justify-center border border-transparent hover:border-cyan-300/40"
          style={{
            left: '23%',
            top: '60%',
            width: '11%',
            height: '11%'
          }}
          title="Steer Car Left (D-Pad)"
          aria-label="Steer Car Left"
        >
          <span className="sr-only">Steer Left</span>
        </button>

        {/* Right Action Button Steer Hitbox */}
        <button
          onClick={() => handleSteer('right')}
          className="absolute z-30 cursor-pointer rounded-full hover:bg-rose-400/25 active:scale-90 transition-all flex items-center justify-center border border-transparent hover:border-rose-300/40"
          style={{
            left: '55%',
            top: '60%',
            width: '11%',
            height: '11%'
          }}
          title="Steer Car Right (Buttons)"
          aria-label="Steer Car Right"
        >
          <span className="sr-only">Steer Right</span>
        </button>

      </div>

    </div>
  );
}
