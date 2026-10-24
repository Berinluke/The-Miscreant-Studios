import React, { useState } from 'react';
import PlayableRacingGame from './PlayableRacingGame';

/**
 * BluePenDoodleJoystick
 * 
 * Master-tier College / Pro Ballpoint Pen Drawing of a Gaming Battlestation:
 * - Widescreen Gaming Monitor on desktop stand running a REAL 60 FPS PLAYABLE RACING GAME!
 *   (Autopilot demo initially with oncoming cars -> [TAKE ACCESS] button -> User full control!)
 * - Pro ergonomic gamepad controller resting directly in front of the monitor,
 *   with functional clickable D-Pad and Analog Sticks to steer the car!
 * - Drawn entirely in authentic multi-layered blue ballpoint pen (Bic Cristal style)
 *   with crosshatching, ink volume, and engineering drafting callouts.
 */
export default function BluePenDoodleJoystick() {
  const [externalControl, setExternalControl] = useState(null);

  const sendControl = (dir) => {
    setExternalControl(dir);
    setTimeout(() => setExternalControl(null), 120);
  };

  return (
    <div className="relative w-full max-w-[560px] flex flex-col items-center justify-center select-none py-1 pointer-events-auto">
      
      {/* Main Industrial Design Blueprint Sketch (Monitor + Playable Screen + Controller) */}
      <div className="relative w-full">
        <svg 
          viewBox="0 0 620 620" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_24px_36px_rgba(30,58,138,0.16)]"
        >
          <defs>
            {/* Fine architectural 45-deg crosshatching */}
            <pattern id="penHatchFine" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1E40AF" strokeWidth="0.9" strokeOpacity="0.4" />
            </pattern>
            {/* Dark deep cavity shadow crosshatching (double-angle) */}
            <pattern id="penCrossHatch" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="5" stroke="#1E3A8A" strokeWidth="1.1" strokeOpacity="0.55" />
              <line x1="0" y1="0" x2="5" y2="0" stroke="#1E3A8A" strokeWidth="0.7" strokeOpacity="0.35" />
            </pattern>
            {/* Knurled metal pattern for controller analog sticks */}
            <pattern id="knurlMetal" width="4" height="4" patternTransform="rotate(30 0 0)" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="2" height="2" fill="#1D4ED8" fillOpacity="0.55" />
              <rect x="2" y="2" width="2" height="2" fill="#1E3A8A" fillOpacity="0.8" />
            </pattern>
          </defs>

          {/* ========================================================
              LAYER 0: CONSTRUCTION DRAFTING GUIDELINES & PERSPECTIVE AXES
              ======================================================== */}
          <g stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6">
            <line x1="310" y1="10" x2="310" y2="600" />
            <line x1="20" y1="210" x2="600" y2="210" />
            <line x1="60" y1="410" x2="560" y2="410" />
          </g>

          {/* ========================================================
              PART 1: THE GAMING MONITOR ON STAND
              ======================================================== */}
          {/* Monitor Stand Base Shadow */}
          <ellipse cx="310" cy="405" rx="140" ry="24" fill="url(#penHatchFine)" />

          {/* Monitor Pedestal Foot (Desk Plate) */}
          <ellipse cx="310" cy="398" rx="125" ry="18" fill="#FAF8F2" stroke="#1E3A8A" strokeWidth="2.8" />
          <ellipse cx="310" cy="398" rx="112" ry="13" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.4" />
          <path d="M 205 398 C 235 410, 385 410, 415 398" stroke="#1D4ED8" strokeWidth="1.6" />

          {/* Monitor Neck (Vertical Column connecting stand to screen) */}
          <path 
            d="M 285 390 L 275 320 L 345 320 L 335 390 Z" 
            fill="#FAF8F2" 
            stroke="#1E3A8A" 
            strokeWidth="2.6" 
            strokeLinejoin="round" 
          />
          {/* Cable Management Hole & Neck Hatching */}
          <rect x="294" y="340" width="32" height="32" rx="16" fill="url(#penCrossHatch)" stroke="#1E3A8A" strokeWidth="2" />

          {/* Outer Monitor Bezel (Chassis) */}
          <rect 
            x="45" 
            y="25" 
            width="530" 
            height="325" 
            rx="14" 
            fill="#FAF8F2" 
            stroke="#1E3A8A" 
            strokeWidth="3.6" 
            strokeLinejoin="round" 
          />
          {/* Secondary Bezel Rim (Dual-bevel chamfer) */}
          <rect 
            x="52" 
            y="32" 
            width="516" 
            height="311" 
            rx="9" 
            stroke="#2563EB" 
            strokeWidth="1.4" 
            opacity="0.8" 
          />

          {/* Inner Active Display Screen Area - Surrounding Frame */}
          <rect 
            x="58" 
            y="38" 
            width="504" 
            height="298" 
            rx="6" 
            fill="#FAF8F2" 
            stroke="#1E3A8A" 
            strokeWidth="2.4" 
          />

          {/* REAL 60 FPS PLAYABLE RACING GAME (EMBEDDED INSIDE SCREEN) */}
          <foreignObject x="58" y="38" width="504" height="298">
            <PlayableRacingGame externalControl={externalControl} />
          </foreignObject>


          {/* ========================================================
              PART 2: THE ERGONOMIC CONTROLLER IN FRONT OF MONITOR
              ======================================================== */}
          {/* Controller Cast Shadow on Desk */}
          <ellipse cx="310" cy="565" rx="175" ry="32" fill="url(#penHatchFine)" />

          {/* USB-C Coiled Cable connecting Controller to Monitor Base */}
          <path 
            d="M 310 445 C 310 415, 260 410, 270 380 C 275 365, 305 360, 310 385 L 310 395" 
            stroke="#1E40AF" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M 310 445 C 310 415, 260 410, 270 380 C 275 365, 305 360, 310 385" 
            stroke="#60A5FA" 
            strokeWidth="1.4" 
            strokeDasharray="3 3" 
          />

          {/* Controller Main Body Group (Seated in front of screen on desk) */}
          <g transform="translate(130, 415)">
            
            {/* Controller Body Paper Mask */}
            <path 
              d="M 65 50 C 95 10, 265 10, 295 50 C 340 100, 375 185, 300 205 C 255 218, 225 150, 180 150 C 135 150, 105 218, 60 205 C -15 185, 20 100, 65 50 Z" 
              fill="#FAF8F2" 
            />

            {/* Deep Ballpoint Pen Double Contour Outlines */}
            <path 
              d="M 65 50 C 95 10, 265 10, 295 50 C 340 100, 375 185, 300 205 C 255 218, 225 150, 180 150 C 135 150, 105 218, 60 205 C -15 185, 20 100, 65 50 Z" 
              stroke="#1E3A8A" 
              strokeWidth="3.6" 
              strokeLinejoin="round" 
              strokeLinecap="round" 
            />
            <path 
              d="M 70 54 C 98 18, 262 18, 290 54 C 330 98, 362 178, 294 196 C 252 208, 222 144, 180 144 C 138 144, 108 208, 66 196 C -2 178, 30 98, 70 54 Z" 
              stroke="#2563EB" 
              strokeWidth="1.6" 
              opacity="0.8" 
            />

            {/* Top Shoulder Triggers (L1/L2 and R1/R2) */}
            <polygon points="75,44 85,18 120,24 135,52" fill="#E2E8F0" stroke="#1E3A8A" strokeWidth="2.2" strokeLinejoin="round" />
            <polygon points="285,44 275,18 240,24 225,52" fill="#E2E8F0" stroke="#1E3A8A" strokeWidth="2.2" strokeLinejoin="round" />

            {/* Left & Right Grip Crosshatch Shading & Texture */}
            <path d="M 28 115 C 20 145, 38 185, 62 195 C 55 170, 52 135, 50 110 Z" fill="url(#penCrossHatch)" stroke="#1E3A8A" strokeWidth="1.6" />
            <path d="M 332 115 C 340 145, 322 185, 298 195 C 305 170, 308 135, 310 110 Z" fill="url(#penCrossHatch)" stroke="#1E3A8A" strokeWidth="1.6" />

            {/* Center Touchpad Deck with Laser Inscription */}
            <rect x="135" y="40" width="90" height="52" rx="8" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.2" />
            <line x1="145" y1="48" x2="215" y2="48" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <text x="180" y="74" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="900" letterSpacing="0.1em" fill="#1E3A8A">
              MISCREANT 128Hz
            </text>

            {/* Left Directional D-Pad (INTERACTIVE BUTTONS TO STEER CAR!) */}
            <g transform="translate(72, 62)">
              <circle cx="28" cy="28" r="26" fill="#F1F5F9" stroke="#1E3A8A" strokeWidth="1.8" />
              <path 
                d="M 20 8 L 36 8 L 36 20 L 48 20 L 48 36 L 36 36 L 36 48 L 20 48 L 20 36 L 8 36 L 8 20 L 20 20 Z" 
                fill="#FFFFFF" 
                stroke="#1E3A8A" 
                strokeWidth="2.2" 
                strokeLinejoin="round" 
              />
              <circle cx="28" cy="28" r="4.5" fill="#1E40AF" />
              {/* Steer Left Click Area */}
              <rect 
                x="4" y="16" width="18" height="24" 
                fill="transparent" 
                className="cursor-pointer hover:fill-blue-500/20 active:scale-95" 
                onClick={() => sendControl('left')} 
                title="Click D-Pad to Steer Car Left"
              />
              {/* Steer Right Click Area */}
              <rect 
                x="32" y="16" width="18" height="24" 
                fill="transparent" 
                className="cursor-pointer hover:fill-blue-500/20 active:scale-95" 
                onClick={() => sendControl('right')} 
                title="Click D-Pad to Steer Car Right"
              />
            </g>

            {/* Right Action Face Buttons (▲ ■ ● ✖) */}
            <g transform="translate(232, 60)">
              <circle cx="28" cy="28" r="28" fill="#F1F5F9" stroke="#1E3A8A" strokeWidth="1.8" />
              <circle cx="28" cy="11" r="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
              <text x="28" y="15" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="900" fill="#1D4ED8">▲</text>
              <circle cx="28" cy="45" r="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
              <text x="28" y="49" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="900" fill="#1D4ED8">✖</text>
              <circle cx="11" cy="28" r="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
              <text x="11" y="32" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="900" fill="#1D4ED8">■</text>
              <circle cx="45" cy="28" r="8" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
              <text x="45" y="32" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="900" fill="#1D4ED8">●</text>
            </g>

            {/* Left Analog Thumbstick (Clicking steers left!) */}
            <g 
              transform="translate(135, 125)" 
              className="cursor-pointer group"
              onClick={() => sendControl('left')}
              title="Click Thumbstick to Steer Left"
            >
              <circle cx="0" cy="0" r="22" fill="#F1F5F9" stroke="#1E3A8A" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="18" fill="url(#knurlMetal)" stroke="#1E40AF" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="4" fill="#1E3A8A" />
            </g>

            {/* Right Analog Thumbstick (Clicking steers right!) */}
            <g 
              transform="translate(225, 125)" 
              className="cursor-pointer group"
              onClick={() => sendControl('right')}
              title="Click Thumbstick to Steer Right"
            >
              <circle cx="0" cy="0" r="22" fill="#F1F5F9" stroke="#1E3A8A" strokeWidth="2.2" />
              <circle cx="0" cy="0" r="18" fill="url(#knurlMetal)" stroke="#1E40AF" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="12" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="4" fill="#1E3A8A" />
            </g>

          </g>

        </svg>
      </div>

    </div>
  );
}
