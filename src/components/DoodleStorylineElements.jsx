import React, { useState, useEffect } from 'react';

// ===================================================================
// CHAPTER 1: THE FIGHTER JET AIR-DROP (WITH DYNAMIC CONTINUOUS FLIGHT)
// ===================================================================

// 1. Sketched F-22 Fighter Jet (ACTUALLY FLYING ACROSS THE SKY!)
export function DoodleFighterJet({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-jet-flight ${className}`}>
      <svg width="220" height="90" viewBox="0 0 220 90" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {/* Jet Nose & Cockpit */}
        <path d="M 215 45 Q 185 36 145 32 L 65 32 L 15 42 L 5 45 L 15 48 L 65 58 L 145 58 Q 185 54 215 45 Z" fill="#FAF8F2" />
        <path d="M 165 33 Q 180 34 190 42 L 160 42 Z" stroke="#DC2626" fill="#FEE2E2" strokeWidth="2" />
        
        {/* Main Swept Wings */}
        <polygon points="125,32 50,5 30,5 55,32" fill="#F1F5F9" />
        <polygon points="125,58 50,85 30,85 55,58" fill="#F1F5F9" />

        {/* Twin Tail Fins */}
        <line x1="45" y1="32" x2="20" y2="18" strokeWidth="3" />
        <line x1="45" y1="58" x2="20" y2="72" strokeWidth="3" />

        {/* Open Rear Cargo Ramp (where squad jumped out!) */}
        <polygon points="15,42 0,38 0,52 15,48" stroke="#DC2626" strokeWidth="2.5" fill="#FEF2F2" />
        
        {/* Animated Afterburner Flame Pulsing! */}
        <g className="animate-afterburner">
          <path d="M 2 41 L -22 45 L 2 49 Z" stroke="#FFA000" fill="#FEF3C7" strokeWidth="2.5" />
          <line x1="-22" y1="45" x2="-45" y2="45" stroke="#DC2626" strokeDasharray="3 3" strokeWidth="2.5" />
        </g>

        {/* Sonic Boom Air Shockwaves */}
        <path d="M 195 20 Q 215 45 195 70" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="4 4" />
      </svg>
      <span className="font-marker text-xs text-pen-blue -mt-2 block pl-14">
        JET PATROL: FLYING ACTIVE ✈️
      </span>
    </div>
  );
}

// 2. The 4 Blue-Pen Miscreants (ACTUALLY DIVING IN FREEFALL WITH WIND TRAILS!)
export function DoodleSkydivingSquad({ className = "" }) {
  return (
    <div className={`relative inline-flex items-center gap-6 select-none pointer-events-none animate-squad-dive ${className}`}>
      
      {/* Squad Leader: Headfirst Dive Fluttering */}
      <div className="flex flex-col items-center transform rotate-45 animate-diver-1">
        <svg width="42" height="60" viewBox="0 0 42 60" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="21" cy="48" r="6" fill="#FAF8F2" />
          <line x1="21" y1="42" x2="21" y2="20" strokeWidth="3" />
          <path d="M 21 34 L 10 24 L 6 12" />
          <path d="M 21 34 L 32 24 L 36 12" />
          <path d="M 21 20 L 14 8 L 12 0" />
          <path d="M 21 20 L 28 8 L 30 0" />
        </svg>
        <span className="font-hand text-xs text-pen-blue font-bold -rotate-45 -mt-2">
          Leader
        </span>
      </div>

      {/* Heavy Gunner Fluttering */}
      <div className="flex flex-col items-center transform rotate-35 animate-diver-2">
        <svg width="46" height="62" viewBox="0 0 46 62" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="23" cy="50" r="6" fill="#FAF8F2" />
          <rect x="17" y="24" width="12" height="18" rx="3" stroke="#0F172A" fill="#F1F5F9" />
          <line x1="23" y1="44" x2="23" y2="24" />
          <path d="M 23 36 L 8 26 L 4 16" />
          <path d="M 23 36 L 38 26 L 42 16" />
          <path d="M 23 24 L 16 10 L 14 0" />
          <path d="M 23 24 L 30 10 L 32 0" />
        </svg>
        <span className="font-hand text-xs text-pen-blue font-bold -rotate-35 -mt-2">
          Gunner
        </span>
      </div>

      {/* Commando 3: Freefall Spiral */}
      <div className="flex flex-col items-center transform rotate-50 animate-diver-1">
        <svg width="40" height="58" viewBox="0 0 40 58" fill="none" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="46" r="6" fill="#FAF8F2" />
          <line x1="20" y1="40" x2="20" y2="18" />
          <path d="M 20 32 L 8 22 L 5 10" />
          <path d="M 20 32 L 32 22 L 35 10" />
          <path d="M 20 18 L 13 8 L 10 0" />
          <path d="M 20 18 L 27 8 L 30 0" />
        </svg>
        <span className="font-hand text-xs text-pen-blue font-bold -rotate-50 -mt-2">
          Scout
        </span>
      </div>

      {/* Animated Wind Streaks Rushing Past! */}
      <div className="space-y-1.5 animate-wind-rush">
        <div className="w-16 h-[2px] bg-blue-500 opacity-80" />
        <div className="w-24 h-[2.5px] bg-blue-600 opacity-90" />
        <div className="w-14 h-[2px] bg-blue-500 opacity-70" />
      </div>

    </div>
  );
}

// 3. Enemy Anti-Air Flak Drone (BOBBING & SHOOTING LASER TRACERS UPWARD!)
export function DoodleEnemyFlakDrone({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-flak-hover ${className}`}>
      <svg width="90" height="120" viewBox="0 0 90 120" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Upward Laser Tracers firing towards diving squad! */}
        <g className="animate-laser-up">
          <line x1="40" y1="40" x2="40" y2="0" stroke="#DC2626" strokeWidth="3" />
          <line x1="50" y1="40" x2="58" y2="0" stroke="#FFA000" strokeWidth="2" />
        </g>

        {/* Drone Center Core */}
        <circle cx="45" cy="65" r="12" fill="#FEF2F2" />
        <circle cx="45" cy="65" r="4" fill="#DC2626" />
        
        {/* 4 Drone Arms */}
        <line x1="45" y1="53" x2="20" y2="40" />
        <line x1="45" y1="53" x2="70" y2="40" />
        <line x1="45" y1="77" x2="20" y2="90" />
        <line x1="45" y1="77" x2="70" y2="90" />

        {/* Spinning Rotor Blurs */}
        <ellipse cx="20" cy="40" rx="14" ry="4" stroke="#0F172A" />
        <ellipse cx="70" cy="40" rx="14" ry="4" stroke="#0F172A" />
        <ellipse cx="20" cy="90" rx="14" ry="4" stroke="#0F172A" />
        <ellipse cx="70" cy="90" rx="14" ry="4" stroke="#0F172A" />
      </svg>
      <span className="font-hand text-xs text-pen-red font-bold block text-center -mt-4">
        FLAK DRONE (FIRING UP!)
      </span>
    </div>
  );
}


// ===================================================================
// CHAPTER 2: MID-AIR SKETCH COMBAT (DROP-KICK IN MOTION!)
// ===================================================================

export function DoodleEnemyRedParatrooper({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-parachute ${className}`}>
      <svg width="65" height="90" viewBox="0 0 65 90" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 6 30 Q 32 2 58 30 Z" fill="#FEE2E2" strokeWidth="2.8" />
        <line x1="6" y1="30" x2="32" y2="54" />
        <line x1="24" y1="30" x2="32" y2="54" />
        <line x1="40" y1="30" x2="32" y2="54" />
        <line x1="58" y1="30" x2="32" y2="54" />

        <circle cx="32" cy="58" r="5" stroke="#0F172A" fill="#FEE2E2" />
        <line x1="32" y1="63" x2="32" y2="76" strokeWidth="2.5" />
        
        <line x1="18" y1="66" x2="48" y2="62" stroke="#0F172A" strokeWidth="3.2" />
        <polygon points="48,60 56,62 48,64" fill="#DC2626" />
        
        <path d="M 32 76 L 24 88" />
        <path d="M 32 76 L 40 88" />
      </svg>
      <span className="font-hand text-xs text-pen-red font-bold block -mt-2">
        RED INTERCEPTOR (RPG)
      </span>
    </div>
  );
}

// Blue Hero Drop-Kicking a Red Villain (IN REPEATED ACTION STRIKE!)
export function DoodleMidAirDropKick({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-kick-strike ${className}`}>
      <svg width="130" height="75" viewBox="0 0 130 75" fill="none" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Blue Hero delivering flying dropkick */}
        <g stroke="#1E3A8A" strokeWidth="2.6">
          <circle cx="30" cy="22" r="6" fill="#FAF8F2" />
          <line x1="36" y1="24" x2="68" y2="34" strokeWidth="3" />
          <path d="M 46 28 L 38 14" />
          <path d="M 46 28 L 48 12" />
          <line x1="68" y1="34" x2="94" y2="38" strokeWidth="3.5" />
          <path d="M 68 34 L 58 48 L 70 52" />
        </g>

        {/* IMPACT STAR BURST */}
        <polygon points="94,38 100,28 108,36 116,28 112,40 122,44 110,48 114,58 102,52 96,60 94,48 84,44" fill="#FFA000" stroke="#DC2626" strokeWidth="2" />

        {/* Red Villain flying backward knocked out */}
        <g stroke="#DC2626" strokeWidth="2.4" className="transform translate-x-4">
          <circle cx="110" cy="20" r="5" fill="#FEE2E2" />
          <line x1="108" y1="25" x2="118" y2="40" />
          <path d="M 112 30 L 122 24" />
          <path d="M 118 40 L 122 52" />
        </g>

      </svg>
      <span className="font-marker text-xs text-pen-red block font-bold -mt-2">
        WHAM! (OUT OF MY WAY!)
      </span>
    </div>
  );
}


// ===================================================================
// CHAPTER 3: THE 60Hz LAG MONSTER BATTLE (IN ACTIVE COMBAT!)
// ===================================================================

// Giant Red Scribble 60Hz Lag Spider Demon (WRITHING TENTACLES!)
export function DoodleLagMonster({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-lag-writhe ${className}`}>
      <svg width="150" height="110" viewBox="0 0 150 110" fill="none" stroke="#DC2626" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Chaotic Scribble Body */}
        <path d="M 50 50 Q 75 25 100 50 Q 120 75 100 90 Q 75 105 50 90 Q 30 75 50 50 Z" fill="#FEE2E2" strokeWidth="3" />
        <path d="M 55 58 Q 70 45 95 62 Q 80 85 60 75 Z" stroke="#DC2626" strokeWidth="2" strokeDasharray="2 3" />

        {/* Angry Glowing Red Eyes */}
        <polygon points="65,52 75,56 65,60" fill="#DC2626" />
        <polygon points="85,52 75,56 85,60" fill="#DC2626" />

        {/* Tangled 8 Spider Latency Cables */}
        <path d="M 45 60 Q 20 40 5 60" strokeWidth="2.5" />
        <path d="M 42 70 Q 15 70 8 90" strokeWidth="2.5" />
        <path d="M 48 80 Q 25 100 15 110" strokeWidth="2.5" />
        
        <path d="M 105 60 Q 130 40 145 60" strokeWidth="2.5" />
        <path d="M 108 70 Q 135 70 142 90" strokeWidth="2.5" />
        <path d="M 102 80 Q 125 100 135 110" strokeWidth="2.5" />
      </svg>
      <div className="font-marker text-xs text-pen-red bg-yellow-100 px-2 py-0.5 rounded border border-red-400 inline-block -mt-4 shadow-sm animate-bounce">
        BOSS: 60Hz LAG MONSTER (480ms PING)
      </div>
    </div>
  );
}

// Blue Commando Slicing with Pulsing 128Hz Laser Beam
export function Doodle128HzSlicer({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none ${className}`}>
      <svg width="130" height="70" viewBox="0 0 130 70" fill="none" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Blue Commando standing firm */}
        <g stroke="#1E3A8A" strokeWidth="2.6">
          <circle cx="20" cy="25" r="6" fill="#FAF8F2" />
          <line x1="20" y1="31" x2="20" y2="52" />
          <path d="M 20 52 L 12 68" />
          <path d="M 20 52 L 28 68" />
          <path d="M 20 38 L 35 34 L 45 34" />
        </g>

        {/* Pulsing 128Hz Laser Wave Slicing Out! */}
        <g className="animate-laser-slice">
          <path d="M 45 34 Q 60 20 75 34 Q 90 48 105 34 L 128 34" stroke="#00C2FF" strokeWidth="3.5" />
          <path d="M 45 34 Q 60 48 75 34 Q 90 20 105 34" stroke="#FF2A5F" strokeWidth="2" />
        </g>

      </svg>
      <span className="font-hand text-xs text-cyan-700 font-bold block -mt-2">
        128Hz ZERO-LATENCY BEAM!
      </span>
    </div>
  );
}


// ===================================================================
// CHAPTER 4: THE CORPORATE SUITS AMBUSH (COFFEE SPLAT ANIMATED!)
// ===================================================================

export function DoodleCorporateSuitKnockout({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-suit-knockout ${className}`}>
      <svg width="130" height="85" viewBox="0 0 130 85" fill="none" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Flying Coffee Mug SPLAT */}
        <g stroke="#FFA000" strokeWidth="2" fill="#FEF3C7">
          <rect x="15" y="28" width="18" height="22" rx="3" />
          <path d="M 33 32 Q 40 38 33 44" fill="none" strokeWidth="2" />
          <path d="M 34 26 Q 50 16 62 28 Q 54 40 36 34 Z" fill="#92400E" stroke="#92400E" />
        </g>

        {/* Corporate Suit falling backwards */}
        <g stroke="#DC2626" strokeWidth="2.4" className="transform rotate-12">
          <circle cx="85" cy="22" r="6" fill="#FEE2E2" />
          <line x1="85" y1="28" x2="90" y2="52" strokeWidth="3" />
          <polygon points="85,30 83,44 85,46 87,44" fill="#0F172A" stroke="#0F172A" />
          <path d="M 86 36 L 72 26" />
          <path d="M 88 38 L 105 30" />
          <path d="M 90 52 L 80 70" />
          <path d="M 90 52 L 102 68" />
        </g>

        {/* Dropped Briefcase */}
        <g stroke="#0F172A" strokeWidth="2" fill="#FAF8F2">
          <rect x="98" y="52" width="22" height="16" rx="2" />
          <line x1="105" y1="52" x2="105" y2="48" />
          <line x1="113" y1="52" x2="113" y2="48" />
        </g>

      </svg>
      <div className="flex items-center gap-2 -mt-2">
        <span className="font-marker text-xs text-amber-700 font-bold">
          COFFEE SPLAT! ☕
        </span>
        <span className="font-hand text-xs text-slate-500 line-through">
          crunch policy
        </span>
      </div>
    </div>
  );
}


// ===================================================================
// CHAPTER 5: SUPERHERO LANDING (WITH GROUND IMPACT SHOCKWAVES!)
// ===================================================================

export function DoodleSuperheroLanding({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none ${className}`}>
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#1E3A8A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Animated Ground Shockwave Expanding! */}
        <g className="animate-ground-shock">
          <ellipse cx="60" cy="74" rx="45" ry="8" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
          <ellipse cx="60" cy="74" rx="28" ry="5" stroke="#DC2626" strokeWidth="2.2" />
        </g>

        {/* Billowing Dust Clouds */}
        <circle cx="25" cy="70" r="10" stroke="#94A3B8" fill="#F8FAFC" />
        <circle cx="95" cy="70" r="10" stroke="#94A3B8" fill="#F8FAFC" />
        
        {/* Stickman in 3-Point Landing */}
        <circle cx="60" cy="38" r="6.5" fill="#FAF8F2" strokeWidth="2.8" />
        <path d="M 60 45 L 60 58 L 74 65" strokeWidth="3" />
        <path d="M 60 48 L 48 58 L 48 72" strokeWidth="3" />
        <path d="M 60 48 L 72 44 L 84 46" />
        <path d="M 60 58 L 50 68 L 38 72" strokeWidth="3" />
        <path d="M 74 65 L 82 72 L 72 74" strokeWidth="3" />
      </svg>
      <div className="text-center -mt-2">
        <span className="font-marker text-sm text-pen-blue font-black tracking-wide block animate-bounce">
          SUPERHERO 3-POINT LANDING! 💥
        </span>
      </div>
    </div>
  );
}

export function DoodleTiedUpVillains({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none ${className}`}>
      <svg width="90" height="75" viewBox="0 0 90 75" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="35" cy="24" r="5" stroke="#DC2626" fill="#FEE2E2" strokeWidth="2.2" />
        <circle cx="55" cy="26" r="5" stroke="#DC2626" fill="#FEE2E2" strokeWidth="2.2" />
        <rect x="25" y="30" width="40" height="32" rx="8" stroke="#DC2626" fill="#FEE2E2" strokeWidth="2.2" />
        <line x1="25" y1="36" x2="65" y2="36" stroke="#92400E" strokeWidth="3" />
        <line x1="25" y1="44" x2="65" y2="44" stroke="#92400E" strokeWidth="3" />
        <line x1="25" y1="52" x2="65" y2="52" stroke="#92400E" strokeWidth="3" />
        <line x1="65" y1="60" x2="80" y2="12" stroke="#0F172A" strokeWidth="2.2" />
        <polygon points="80,12 80,24 68,18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      </svg>
      <span className="font-hand text-xs text-slate-500 font-bold block text-center -mt-1">
        VILLAINS CAPTURED ✔
      </span>
    </div>
  );
}

export function DoodleVictoryFlag({ className = "" }) {
  return (
    <div className={`relative inline-block select-none pointer-events-none animate-flag-wave ${className}`}>
      <svg width="70" height="85" viewBox="0 0 70 85" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="20" y1="10" x2="20" y2="80" stroke="#0F172A" strokeWidth="3" />
        <polygon points="20,10 65,22 20,34" fill="#1E3A8A" stroke="#1E3A8A" strokeWidth="2" />
        <text x="28" y="26" fill="#FFFFFF" fontSize="14" fontFamily="Bebas Neue" fontWeight="bold">M</text>
        <ellipse cx="20" cy="80" rx="10" ry="3" fill="#E2E8F0" stroke="#94A3B8" />
      </svg>
      <span className="font-marker text-xs text-pen-blue block -mt-2">
        FLAG PLANTED
      </span>
    </div>
  );
}


// ===================================================================
// 0-CLICK SCROLL-DESCENT TRACKER (THE SQUAD PHYSICALLY FALLS WITH SCROLL!)
// ===================================================================

export function ScrollDescentSquad() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY / totalScroll;
        setScrollProgress(Math.min(Math.max(current, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate altitude from 30,000 FT down to 0 FT (Touchdown)
  const altitude = Math.round((1 - scrollProgress) * 30000);

  return (
    <div className="fixed right-3 top-24 bottom-24 z-40 hidden xl:flex flex-col items-center justify-between pointer-events-none select-none w-16">
      
      {/* Top Altitude Indicator */}
      <div className="bg-white/90 border border-slate-300 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-700 shadow-sm text-center">
        <span>30k FT</span>
      </div>

      {/* Vertical Descent Track Wire (Like a notebook margin ruler) */}
      <div className="relative w-1 flex-1 bg-slate-300/80 rounded-full my-2">
        
        {/* The Squad physically descending down this track as you scroll! */}
        <div 
          className="absolute -left-6 w-14 transition-all duration-150 ease-out flex flex-col items-center"
          style={{
            top: `${scrollProgress * 92}%`
          }}
        >
          {/* Mini Squad Skydivers / Parachute Icon */}
          <div className="relative animate-bounce">
            {scrollProgress < 0.7 ? (
              // Freefall Diving Stickman
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="14" cy="26" r="4" fill="#FAF8F2" />
                <line x1="14" y1="22" x2="14" y2="8" />
                <path d="M 14 16 L 6 10" />
                <path d="M 14 16 L 22 10" />
                <path d="M 14 8 L 8 2" />
                <path d="M 14 8 L 20 2" />
              </svg>
            ) : (
              // Parachute Deployed for Touchdown!
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round">
                <path d="M 4 14 Q 16 2 28 14 Z" fill="#DC2626" stroke="#0F172A" />
                <line x1="4" y1="14" x2="16" y2="26" />
                <line x1="28" y1="14" x2="16" y2="26" />
                <circle cx="16" cy="30" r="3" fill="#FAF8F2" />
                <line x1="16" y1="33" x2="16" y2="38" />
              </svg>
            )}

            {/* Altitude Bubble */}
            <div className="bg-[#1E3A8A] text-white text-[9px] font-mono px-1 py-0.5 rounded shadow whitespace-nowrap -mt-1 font-bold">
              {altitude} FT
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Ground Indicator */}
      <div className="bg-emerald-100 border border-emerald-300 rounded px-1.5 py-0.5 text-[10px] font-mono text-emerald-800 font-bold shadow-sm text-center">
        <span>0 FT (HQ)</span>
      </div>

    </div>
  );
}
