import React, { useState } from 'react';

// 1. LIVING WALKING / PATROLLING STICKMAN (Moving legs, swinging arms, patrolling left & right)
export function DoodleLivingWalkingStickman({ className = "" }) {
  return (
    <div className={`inline-block select-none pointer-events-none animate-stick-patrol ${className}`}>
      <svg width="36" height="52" viewBox="0 0 36 52" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head with bobbing neck */}
        <circle cx="18" cy="10" r="5.5" />
        {/* Torso */}
        <line x1="18" y1="15.5" x2="18" y2="32" />
        
        {/* Left Arm holding weapon */}
        <path d="M 18 19 L 26 22 L 34 18" />
        <line x1="26" y1="20" x2="35" y2="17" strokeWidth="2.8" stroke="#0F172A" />

        {/* Right Arm swinging back */}
        <path d="M 18 19 L 8 25 L 4 28" />

        {/* Animated Left Leg walking forward */}
        <g className="animate-leg-l">
          <path d="M 18 32 L 12 42 L 8 50" strokeWidth="2.6" />
        </g>

        {/* Animated Right Leg walking backward */}
        <g className="animate-leg-r">
          <path d="M 18 32 L 24 42 L 28 50" strokeWidth="2.6" />
        </g>
      </svg>
    </div>
  );
}

// 2. JUMPING & BACKFLIPPING STICKMAN (Springs up, 360-degree flip, lands on text!)
export function DoodleJumpingStickman({ className = "" }) {
  return (
    <div className={`inline-block select-none pointer-events-none animate-stick-jump ${className}`}>
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="20" cy="10" r="6" />
        {/* Torso */}
        <line x1="20" y1="16" x2="20" y2="34" />
        {/* Arms outstretched in mid-air flip */}
        <path d="M 20 20 L 8 12 L 4 8" />
        <path d="M 20 20 L 32 12 L 36 8" />
        {/* Tucked legs in jump */}
        <path d="M 20 34 L 10 42 L 14 48" />
        <path d="M 20 34 L 30 42 L 26 48" />
      </svg>
    </div>
  );
}

// 3. LIVING TANK (Drives, wheels spin, cannon fires shell, explosion impact!)
export function DoodleLivingTank({ className = "" }) {
  const [clickBlast, setClickBlast] = useState(false);

  const handleClick = () => {
    setClickBlast(true);
    setTimeout(() => setClickBlast(false), 1200);
  };

  return (
    <div 
      onClick={handleClick}
      title="Click the tank to fire!"
      className={`relative inline-block select-none cursor-pointer group ${className}`}
    >
      {/* Tank Vehicle with Drive & Recoil animation */}
      <div className="inline-flex items-center gap-2 animate-tank-drive-and-fire">
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Tank Treads */}
          <rect x="8" y="28" width="76" height="16" rx="8" fill="#F8FAFC" />
          
          {/* Animated Tread Wheels spinning */}
          <g className="animate-wheel-spin">
            <circle cx="18" cy="36" r="5" strokeWidth="2" />
            <line x1="18" y1="31" x2="18" y2="41" stroke="#94A3B8" />
          </g>
          <g className="animate-wheel-spin">
            <circle cx="32" cy="36" r="5" strokeWidth="2" />
            <line x1="32" y1="31" x2="32" y2="41" stroke="#94A3B8" />
          </g>
          <g className="animate-wheel-spin">
            <circle cx="46" cy="36" r="5" strokeWidth="2" />
            <line x1="46" y1="31" x2="46" y2="41" stroke="#94A3B8" />
          </g>
          <g className="animate-wheel-spin">
            <circle cx="60" cy="36" r="5" strokeWidth="2" />
            <line x1="60" y1="31" x2="60" y2="41" stroke="#94A3B8" />
          </g>
          <g className="animate-wheel-spin">
            <circle cx="74" cy="36" r="5" strokeWidth="2" />
            <line x1="74" y1="31" x2="74" y2="41" stroke="#94A3B8" />
          </g>

          {/* Armor Hull */}
          <polygon points="14,28 22,17 68,17 78,28" fill="#FAF8F2" />
          
          {/* Revolving Turret */}
          <path d="M 32 17 Q 44 6 60 17" fill="#F1F5F9" />
          
          {/* Cannon Barrel */}
          <line x1="56" y1="12" x2="94" y2="7" strokeWidth="3.4" />
          <line x1="94" y1="4" x2="94" y2="10" strokeWidth="3" />

          {/* Commander Stickman in Hatch */}
          <circle cx="40" cy="4" r="3.5" stroke="#0F172A" />
          <line x1="40" y1="7.5" x2="40" y2="13" stroke="#0F172A" />
          <line x1="40" y1="9" x2="46" y2="6" stroke="#0F172A" />
        </svg>

        {/* Fired Flying Cannon Shell */}
        <div className="absolute top-2 left-24 animate-cannon-shell pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="5" fill="#DC2626" stroke="#0F172A" strokeWidth="1.5" />
            <path d="M 4 9 L 0 5 M 4 11 L 0 14" stroke="#DC2626" strokeWidth="2" />
          </svg>
        </div>

        {/* Impact Explosion Burst on the line */}
        <div className="absolute -top-6 left-64 animate-kaboom-burst pointer-events-none z-30">
          <span className="font-marker text-xl text-pen-red font-black drop-shadow-sm select-none">
            KABOOM! 💥
          </span>
        </div>

        {/* Click Triggered Instant Blast */}
        {clickBlast && (
          <div className="absolute -top-10 left-28 animate-bounce z-40 bg-yellow-300 text-slate-950 font-marker px-3 py-1 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_#DC2626]">
            DIRECT HIT!
          </div>
        )}
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export const DoodleTank = DoodleLivingTank;
export const DoodleHelicopter = DoodleLivingHelicopter;

// 4. LIVING HELICOPTER (Flying sine-wave patrol, rotor blur, rope ladder)
export function DoodleLivingHelicopter({ className = "" }) {
  return (
    <div className={`inline-block select-none pointer-events-none animate-copter-fly ${className}`}>
      <svg width="110" height="70" viewBox="0 0 110 70" fill="none" stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Animated Rotor Blades Blur */}
        <g className="animate-rotor-blur">
          <line x1="10" y1="8" x2="90" y2="8" stroke="#0F172A" strokeWidth="3" />
          <line x1="20" y1="8" x2="80" y2="8" stroke="#DC2626" strokeWidth="1.5" />
        </g>
        <line x1="50" y1="8" x2="50" y2="16" strokeWidth="2.8" />

        {/* Helicopter Cabin */}
        <path d="M 28 28 C 28 17 72 17 72 28 C 72 40 32 40 28 28 Z" fill="#F8FAFC" />
        
        {/* Cockpit Glass */}
        <path d="M 56 20 Q 70 21 70 28 L 56 28 Z" stroke="#DC2626" fill="#FEE2E2" />

        {/* Tail Boom & Spinning Tail Rotor */}
        <line x1="28" y1="28" x2="2" y2="24" strokeWidth="2.8" />
        <line x1="2" y1="16" x2="2" y2="32" stroke="#94A3B8" strokeWidth="2.4" />

        {/* Landing Skids */}
        <line x1="38" y1="40" x2="38" y2="48" />
        <line x1="62" y1="40" x2="62" y2="48" />
        <line x1="30" y1="48" x2="72" y2="48" strokeWidth="3" />

        {/* Rope Ladder hanging down with Stickman paratrooper */}
        <line x1="48" y1="48" x2="48" y2="68" strokeDasharray="3 3" strokeWidth="1.8" />
        <line x1="44" y1="55" x2="52" y2="55" strokeWidth="1.8" />
        <line x1="44" y1="62" x2="52" y2="62" strokeWidth="1.8" />
        {/* Commando stickman climbing down */}
        <circle cx="54" cy="56" r="3" stroke="#0F172A" />
        <line x1="54" y1="59" x2="54" y2="66" stroke="#0F172A" strokeWidth="1.8" />
      </svg>
      <span className="font-hand text-xs text-pen-red font-bold -mt-2 block pl-8">
        chk-chk-chk!
      </span>
    </div>
  );
}

// 5. STICKMAN CLIMBER (Swinging on letters)
export function DoodleStickmanClimber({ className = "" }) {
  return (
    <div className={`inline-block animate-stick-swing pointer-events-none select-none ${className}`}>
      <svg width="34" height="64" viewBox="0 0 34 64" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 12 0 L 12 12" />
        <circle cx="12" cy="18" r="6" />
        <line x1="12" y1="24" x2="12" y2="42" />
        <path d="M 12 28 L 26 22 L 30 14" />
        <path d="M 12 42 L 5 56 L 2 62" />
        <path d="M 12 42 L 20 54 L 24 60" />
      </svg>
    </div>
  );
}

// 6. STICKMAN SNIPER (Prone on baseline, fires "pew pew!")
export function DoodleStickmanSniper({ className = "" }) {
  return (
    <div className={`inline-block pointer-events-none select-none ${className}`}>
      <svg width="74" height="28" viewBox="0 0 74 28" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="5" />
        <line x1="17" y1="16" x2="40" y2="18" />
        <path d="M 40 18 L 52 14 L 60 10" />
        <path d="M 40 18 L 50 22 L 58 24" />
        <path d="M 22 17 L 30 20 L 42 16" />
        <line x1="26" y1="14" x2="68" y2="14" strokeWidth="2.8" />
        <line x1="38" y1="10" x2="48" y2="10" strokeWidth="2" />
        <line x1="43" y1="10" x2="43" y2="14" strokeWidth="1.5" />
        <line x1="58" y1="14" x2="56" y2="24" />
        <line x1="58" y1="14" x2="62" y2="24" />
        <path d="M 69 11 L 73 14 L 69 17" stroke="#DC2626" strokeWidth="2" />
      </svg>
      <span className="font-hand text-xs text-pen-red font-bold ml-1 animate-ping">
        pew!
      </span>
    </div>
  );
}

// 7. MOTORBIKE STUNT (Doing a wheelie)
export function DoodleMotorbike({ className = "" }) {
  return (
    <div className={`inline-block select-none animate-bike-wheelie ${className}`}>
      <svg width="75" height="52" viewBox="0 0 75 52" fill="none" stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="36" r="12" />
        <circle cx="16" cy="36" r="4" />
        <circle cx="58" cy="22" r="12" />
        <circle cx="58" cy="22" r="4" />
        <path d="M 16 36 L 36 34 L 50 18 L 58 22" />
        <path d="M 36 34 L 32 20 L 46 20" />
        <line x1="16" y1="36" x2="32" y2="20" />
        <line x1="48" y1="14" x2="52" y2="18" strokeWidth="3" />
        <path d="M 28 34 L 10 40" strokeWidth="2.5" />
        <circle cx="4" cy="42" r="2" stroke="#94A3B8" />
        <circle cx="0" cy="45" r="3.5" stroke="#94A3B8" />
        <circle cx="28" cy="6" r="5" stroke="#0F172A" />
        <line x1="28" y1="11" x2="30" y2="24" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M 29 15 L 42 16 L 50 16" stroke="#0F172A" />
        <path d="M 30 24 L 28 32 L 34 35" stroke="#0F172A" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

// 8. PARATROOPER DRIFTING
export function DoodleParatrooper({ className = "" }) {
  return (
    <div className={`inline-block select-none animate-parachute ${className}`}>
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 6 30 Q 30 2 54 30 Z" stroke="#DC2626" strokeWidth="2.4" fill="#FEE2E2" />
        <line x1="6" y1="30" x2="30" y2="52" />
        <line x1="22" y1="30" x2="30" y2="52" />
        <line x1="38" y1="30" x2="30" y2="52" />
        <line x1="54" y1="30" x2="30" y2="52" />
        <circle cx="30" cy="56" r="4.5" stroke="#0F172A" />
        <line x1="30" y1="60.5" x2="30" y2="72" stroke="#0F172A" strokeWidth="2.2" />
        <path d="M 30 63 L 23 55" stroke="#0F172A" />
        <path d="M 30 63 L 37 55" stroke="#0F172A" />
        <path d="M 30 72 L 25 80" stroke="#0F172A" />
        <path d="M 30 72 L 35 80" stroke="#0F172A" />
      </svg>
    </div>
  );
}

// 9. MARGINALIA (Tic-Tac-Toe, Crossed Math, Ink test)
export function DoodleMarginalia({ className = "" }) {
  return (
    <div className={`space-y-6 select-none ${className}`}>
      <div className="relative inline-block">
        <p className="font-hand text-lg text-slate-400 line-through decoration-red-500 decoration-2">
          (a + b)² = a² + 2ab + b²
        </p>
        <span className="font-hand text-base text-pen-red font-bold block transform -rotate-3 mt-1">
          BORING! LET'S BUILD GAMES!
        </span>
      </div>

      <div className="w-16 h-16 relative">
        <svg viewBox="0 0 60 60" className="w-full h-full stroke-slate-400" strokeWidth="2">
          <line x1="20" y1="4" x2="20" y2="56" />
          <line x1="40" y1="4" x2="40" y2="56" />
          <line x1="4" y1="20" x2="56" y2="20" />
          <line x1="4" y1="40" x2="56" y2="40" />
          <path d="M 6 6 L 16 16 M 16 6 L 6 16" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="30" cy="10" r="5" stroke="#1E3A8A" strokeWidth="2.5" fill="none" />
          <path d="M 24 24 L 36 36 M 36 24 L 24 36" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="5" stroke="#1E3A8A" strokeWidth="2.5" fill="none" />
          <path d="M 44 4 L 54 16 M 54 4 L 44 16" stroke="#DC2626" strokeWidth="2.5" />
        </svg>
      </div>

      <div className="relative">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#1E3A8A" strokeWidth="1.8">
          <path d="M 20 20 Q 25 10 32 18 Q 38 28 26 34 Q 12 36 8 24 Q 4 12 18 6 Q 34 2 36 22" />
        </svg>
        <span className="font-hand text-xs text-slate-400 -mt-2 block">
          ink test
        </span>
      </div>
    </div>
  );
}

// 10. ARROW
export function DoodleArrow({ text = "", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <span className="font-hand text-base text-pen-red font-bold">
        {text}
      </span>
      <svg width="38" height="18" viewBox="0 0 38 18" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 2 9 Q 18 3 34 9" />
        <path d="M 26 3 L 35 9 L 26 15" />
      </svg>
    </div>
  );
}
