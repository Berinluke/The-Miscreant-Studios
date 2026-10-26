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

            {/* Hatch Patterns for Gamepad Grip Wings */}
            <pattern id="hatchLeft" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
            </pattern>
            <pattern id="hatchRight" width="6" height="6" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />
            </pattern>
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
              3. EXACT REFERENCE CHALK GAMEPAD CONTROLLER
              ========================================================== */}
          {/* Top Coiled Wire Leading to Monitor Base */}
          <path 
            d="M 195 246 C 190 234, 202 226, 195 218 C 188 210, 200 200, 195 188" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            opacity="0.9" 
          />

          {/* Master Controller Group (Centered at X=195, Y=310) */}
          <g transform="translate(195, 310) scale(0.74) translate(-266, -120)">
            
            {/* Top Shoulder Bumpers (Left & Right Angled Charcoal Trapezoids) */}
            <g filter="url(#chalkNoise)">
              {/* Left Bumper */}
              <polygon points="144,38 196,36 200,64 136,68" fill="#18232E" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
              {/* Right Bumper */}
              <polygon points="336,36 388,38 396,68 332,64" fill="#18232E" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            </g>

            {/* Controller Body Silhouette */}
            <g filter="url(#chalkNoise)">
              {/* Outer Chalk Stroke Contour */}
              <path 
                d="M 196,44 
                   C 216,40, 250,40, 266,40 
                   C 282,40, 316,40, 336,44 
                   C 362,50, 400,64, 420,105 
                   C 438,140, 430,178, 400,192 
                   C 376,204, 350,188, 338,164 
                   C 322,132, 292,122, 266,122 
                   C 240,122, 210,132, 194,164 
                   C 182,188, 156,204, 132,192 
                   C 102,178, 94,140, 112,105 
                   C 132,64, 170,50, 196,44 Z" 
                fill="#13241A" 
                stroke="#FFFFFF" 
                strokeWidth="3.2" 
                strokeLinejoin="round"
              />

              {/* Inner Contour (Mint Green Chalk #86EFAC) */}
              <path 
                d="M 200,50 
                   C 218,46, 248,46, 266,46 
                   C 284,46, 314,46, 332,50 
                   C 356,56, 392,68, 410,105 
                   C 426,136, 418,170, 394,184 
                   C 372,194, 348,180, 338,158 
                   C 324,128, 292,118, 266,118 
                   C 240,118, 208,128, 194,158 
                   C 184,180, 160,194, 138,184 
                   C 114,170, 106,136, 122,105 
                   C 140,68, 176,56, 200,50 Z" 
                fill="none" 
                stroke="#86EFAC" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* Left Grip Textured Hatch Panel */}
              <path 
                d="M 116,118 
                   C 112,135, 116,160, 134,178 
                   C 140,165, 142,142, 136,125 Z" 
                fill="url(#hatchLeft)" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
              />

              {/* Right Grip Textured Hatch Panel */}
              <path 
                d="M 416,118 
                   C 420,135, 416,160, 398,178 
                   C 392,165, 390,142, 396,125 Z" 
                fill="url(#hatchRight)" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
              />
            </g>

            {/* Center Screen: Rounded Box with Yellow Accent & MISCREANT 128Hz */}
            <g filter="url(#chalkNoise)">
              <rect x="230" y="42" width="72" height="46" rx="6" fill="#182430" stroke="#FFFFFF" strokeWidth="2.2" />
              {/* Top Yellow Status Accent Line */}
              <line x1="238" y1="50" x2="294" y2="50" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
              {/* Screen Text: MISCREANT 128Hz */}
              <text x="266" y="70" fill="#FFFFFF" fontSize="7.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
                MISCREANT 128Hz
              </text>
            </g>

            {/* Left: Directional D-Pad */}
            <g filter="url(#chalkNoise)">
              {/* Circular Backdrop */}
              <circle cx="178" cy="100" r="24" fill="#15212D" stroke="#FFFFFF" strokeWidth="2.2" />
              {/* Cross D-Pad */}
              <path 
                d="M 172,83 L 184,83 L 184,94 L 195,94 L 195,106 L 184,106 L 184,117 L 172,117 L 172,106 L 161,106 L 161,94 L 172,94 Z" 
                fill="#15212D" 
                stroke="#FFFFFF" 
                strokeWidth="1.8" 
                strokeLinejoin="round"
              />
              {/* Center Pivot Dot */}
              <circle cx="178" cy="100" r="2.8" fill="#FFFFFF" />
            </g>

            {/* Right: Action Buttons (PlayStation Style Diamond) */}
            <g filter="url(#chalkNoise)">
              {/* Circular Backdrop */}
              <circle cx="354" cy="100" r="24" fill="#15212D" stroke="#FFFFFF" strokeWidth="2.2" />
              
              {/* Top Button: Red/Coral Triangle ▲ */}
              <circle cx="354" cy="85" r="6" fill="#182430" stroke="#FB7185" strokeWidth="1.5" />
              <polygon points="354,82 350.8,87.5 357.2,87.5" fill="#FB7185" />

              {/* Left Button: Yellow Square ■ */}
              <circle cx="339" cy="100" r="6" fill="#182430" stroke="#FDE047" strokeWidth="1.5" />
              <rect x="336.5" y="97.5" width="5" height="5" fill="#FDE047" />

              {/* Right Button: Green Circle ● */}
              <circle cx="369" cy="100" r="6" fill="#182430" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="369" cy="100" r="2.6" fill="none" stroke="#34D399" strokeWidth="1.5" />

              {/* Bottom Button: Cyan Cross ✖ */}
              <circle cx="354" cy="115" r="6" fill="#182430" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="351.5" y1="112.5" x2="356.5" y2="117.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="356.5" y1="112.5" x2="351.5" y2="117.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Bottom Center: Dual Analog Thumbsticks */}
            <g filter="url(#chalkNoise)">
              {/* Left Stick */}
              <g transform="translate(210, 138)">
                <circle cx="0" cy="0" r="17" fill="#101922" stroke="#FFFFFF" strokeWidth="2.2" />
                {/* Ring of 12 grip knurling dots */}
                <circle cx="0" cy="-12" r="1.3" fill="#FFFFFF" />
                <circle cx="6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                <circle cx="12" cy="0" r="1.3" fill="#FFFFFF" />
                <circle cx="10.4" cy="6" r="1.3" fill="#FFFFFF" />
                <circle cx="6" cy="10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="0" cy="12" r="1.3" fill="#FFFFFF" />
                <circle cx="-6" cy="10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="-10.4" cy="6" r="1.3" fill="#FFFFFF" />
                <circle cx="-12" cy="0" r="1.3" fill="#FFFFFF" />
                <circle cx="-10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                <circle cx="-6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                {/* Inner stick cap */}
                <circle cx="0" cy="0" r="9" fill="#1A2836" stroke="#CBD5E1" strokeWidth="1.4" />
                <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
              </g>

              {/* Right Stick */}
              <g transform="translate(322, 138)">
                <circle cx="0" cy="0" r="17" fill="#101922" stroke="#FFFFFF" strokeWidth="2.2" />
                {/* Ring of 12 grip knurling dots */}
                <circle cx="0" cy="-12" r="1.3" fill="#FFFFFF" />
                <circle cx="6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                <circle cx="12" cy="0" r="1.3" fill="#FFFFFF" />
                <circle cx="10.4" cy="6" r="1.3" fill="#FFFFFF" />
                <circle cx="6" cy="10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="0" cy="12" r="1.3" fill="#FFFFFF" />
                <circle cx="-6" cy="10.4" r="1.3" fill="#FFFFFF" />
                <circle cx="-10.4" cy="6" r="1.3" fill="#FFFFFF" />
                <circle cx="-12" cy="0" r="1.3" fill="#FFFFFF" />
                <circle cx="-10.4" cy="-6" r="1.3" fill="#FFFFFF" />
                <circle cx="-6" cy="-10.4" r="1.3" fill="#FFFFFF" />
                {/* Inner stick cap */}
                <circle cx="0" cy="0" r="9" fill="#1A2836" stroke="#CBD5E1" strokeWidth="1.4" />
                <circle cx="0" cy="0" r="2.8" fill="#FFFFFF" />
              </g>
            </g>
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
            top: '56%',
            width: '12%',
            height: '12%'
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
            left: '51%',
            top: '56%',
            width: '12%',
            height: '12%'
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
