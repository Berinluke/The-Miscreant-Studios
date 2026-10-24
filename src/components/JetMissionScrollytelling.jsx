import React, { useState, useEffect } from 'react';

/**
 * JetMissionScrollytelling
 * 
 * Choreography:
 * 1. Entry: Fighter Jet enters from top-left and flies directly to the green box area above the 'T' in MISCREANT.
 * 2. Drop: 2 Stickmen troops eject from the jet and drop straight down onto the 'T' in MISCREANT.
 * 3. Land: They stick the landing right on top of the 'T' with impact puff and stand ready.
 * 4. Scroll Out: When user scrolls down, the jet accelerates towards top-right corner with afterburners and vanishes.
 * 5. Scroll Journey: Stickmen jump from the 'T' down onto 'STUDIOS', then down onto 'Explore Our Games', and leap into page 2!
 */
export default function JetMissionScrollytelling({ 
  containerRef, 
  letterTRef, 
  studiosRef, 
  btnRef 
}) {
  const [mounted, setMounted] = useState(false);
  // 'entering' (0-1100ms) -> 'dropping' (1100-2100ms) -> 'landed' (2100ms+)
  const [missionPhase, setMissionPhase] = useState('entering');
  const [jetVanished, setJetVanished] = useState(false);
  const [impactPuff, setImpactPuff] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measured coordinates relative to hero container
  const [anchors, setAnchors] = useState({
    jetCenter: { x: 520, y: 35 },
    letterT: { x: 500, y: 200 },
    studios: { x: 260, y: 320 },
    button: { x: 220, y: 460 },
    exitNextPage: { x: 260, y: 780 }
  });

  const updateAnchors = () => {
    if (!containerRef?.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    // Default fallbacks
    let tX = 500;
    let tY = 200;

    // MEASURE THE EXACT 'T' in MISCREANT (TARGET MARKED BY USER)
    if (letterTRef?.current) {
      const rect = letterTRef.current.getBoundingClientRect();
      tX = rect.left - cRect.left + (rect.width * 0.48);
      // Top bar of the letter T stroke (accounting for Bebas Neue font ascent)
      tY = rect.top - cRect.top + Math.max(rect.height * 0.08, 6);
    }

    // Jet target stops right above the letter T (as marked in green box)
    const jetTargetX = Math.max(tX + 10, 360);
    const jetTargetY = 35;

    let sX = tX - 180;
    let sY = tY + 110;
    if (studiosRef?.current) {
      const rect = studiosRef.current.getBoundingClientRect();
      sX = rect.left - cRect.left + (rect.width * 0.5);
      sY = rect.top - cRect.top;
    }

    let bX = sX - 40;
    let bY = sY + 140;
    if (btnRef?.current) {
      const rect = btnRef.current.getBoundingClientRect();
      bX = rect.left - cRect.left + (rect.width * 0.4);
      bY = rect.top - cRect.top;
    }

    setAnchors({
      jetCenter: { x: jetTargetX, y: jetTargetY },
      letterT: { x: tX, y: tY },
      studios: { x: sX, y: sY },
      button: { x: bX, y: bY },
      exitNextPage: { x: bX + 30, y: cRect.height + 40 }
    });
  };

  useEffect(() => {
    setMounted(true);
    updateAnchors();

    const handleResize = () => updateAnchors();
    window.addEventListener('resize', handleResize);

    // Timeline:
    // 1. Jet flies in (0ms -> 1100ms)
    const dropTimer = setTimeout(() => {
      setMissionPhase('dropping');
    }, 1100);

    // 2. Troops touch down on the 'T' (2100ms)
    const landTimer = setTimeout(() => {
      setMissionPhase('landed');
      setImpactPuff(true);
      setTimeout(() => setImpactPuff(false), 800);
    }, 2100);

    // 3. Right after troops land, jet takes off to top-right corner and vanishes! (2600ms)
    const jetDepartTimer = setTimeout(() => {
      setJetVanished(true);
    }, 2600);

    // Scroll tracker
    const handleScroll = () => {
      if (!containerRef?.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const heroHeight = cRect.height || 800;
      const currentScroll = Math.max(0, -cRect.top);
      const ratio = Math.min(Math.max(currentScroll / heroHeight, 0), 1.5);
      setScrollProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(landTimer);
      clearTimeout(jetDepartTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Recalculate after web fonts settle
  useEffect(() => {
    const t = setTimeout(updateAnchors, 250);
    return () => clearTimeout(t);
  }, [mounted]);

  if (!mounted) return null;

  // --- JET POSITION ---
  // The jet departs automatically to top-right as soon as stickmen land, or on scroll!
  const isJetDeparting = jetVanished || scrollProgress > 0.01;

  const jetCurrentX = missionPhase === 'entering'
    ? -220
    : isJetDeparting
      ? (typeof window !== 'undefined' ? window.innerWidth + 350 : 1600)
      : anchors.jetCenter.x;

  const jetCurrentY = missionPhase === 'entering'
    ? anchors.jetCenter.y
    : isJetDeparting
      ? -140
      : anchors.jetCenter.y;

  const jetRotation = isJetDeparting ? -18 : 0;
  const jetOpacity = isJetDeparting ? 0 : 1;

  // --- 2 STICKMEN COORDINATES ---
  const sProgress = scrollProgress;

  const getTroopCoords = (offset = 0) => {
    const tX = anchors.letterT.x + offset;
    const tY = anchors.letterT.y; // FEET REST DIRECTLY ON THE TOP BAR OF 'T' (NO FLOATING!)

    // 1. Entering (tucked inside the jet as it flies in)
    if (missionPhase === 'entering') {
      return {
        x: anchors.jetCenter.x + offset * 0.5,
        y: anchors.jetCenter.y + 10,
        visible: false,
        jumping: false,
        parachute: false,
        transition: 'none'
      };
    }

    // 2. Dropping from jet down to the letter T
    if (missionPhase === 'dropping') {
      return {
        x: tX,
        y: tY, // smoothly drops down to the top bar of the T
        visible: true,
        jumping: true,
        parachute: offset < 0,
        transition: 'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1)'
      };
    }

    // 3. Landed on the 'T'
    if (sProgress <= 0.05) {
      return {
        x: tX,
        y: tY,
        visible: true,
        jumping: false,
        parachute: false,
        transition: 'transform 0.04s linear'
      };
    }

    // 4. Scroll Stage 1 (0.05 -> 0.35): Jump from 'T' down onto 'STUDIOS'
    if (sProgress <= 0.35) {
      const p = (sProgress - 0.05) / 0.30;
      const startX = tX;
      const startY = tY;
      const targetX = anchors.studios.x + offset;
      const targetY = anchors.studios.y;
      const jumpArc = Math.sin(p * Math.PI) * 40;
      return {
        x: startX + (targetX - startX) * p,
        y: startY + (targetY - startY) * p - jumpArc,
        visible: true,
        jumping: true,
        parachute: false,
        transition: 'transform 0.04s linear'
      };
    }

    // 5. Scroll Stage 2 (0.35 -> 0.70): Jump from 'STUDIOS' down onto 'Explore Our Games' button
    if (sProgress <= 0.70) {
      const p = (sProgress - 0.35) / 0.35;
      const startX = anchors.studios.x + offset;
      const startY = anchors.studios.y;
      const targetX = anchors.button.x + offset;
      const targetY = anchors.button.y;
      const jumpArc = Math.sin(p * Math.PI) * 25;
      return {
        x: startX + (targetX - startX) * p,
        y: startY + (targetY - startY) * p - jumpArc,
        visible: true,
        jumping: true,
        parachute: p > 0.4 && offset < 0,
        transition: 'transform 0.04s linear'
      };
    }

    // 6. Scroll Stage 3 (0.70 -> 1.0+): Leap down into Slide 2 (Multiverse)
    const p = Math.min((sProgress - 0.70) / 0.35, 1.2);
    const startX = anchors.button.x + offset;
    const startY = anchors.button.y - 36;
    const targetX = anchors.exitNextPage.x + offset;
    const targetY = anchors.exitNextPage.y;
    return {
      x: startX + (targetX - startX) * p,
      y: startY + (targetY - startY) * p,
      visible: true,
      jumping: true,
      parachute: true,
      transition: 'transform 0.04s linear'
    };
  };

  const troop1 = getTroopCoords(-12); // Scout (Leader with Red Headband)
  const troop2 = getTroopCoords(12);  // Gunner (Acrobat)

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-visible select-none">
      
      {/* 1. FIGHTER JET (Flies across to above the 'T') */}
      <div
        className="absolute z-40 transition-transform"
        style={{
          transform: `translate3d(${jetCurrentX}px, ${jetCurrentY}px, 0px) rotate(${jetRotation}deg)`,
          transition: missionPhase === 'entering' 
            ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)' 
            : isJetDeparting 
              ? 'transform 1.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.0s ease-out' 
              : 'transform 0.3s ease-out',
          opacity: jetOpacity,
          pointerEvents: isJetDeparting ? 'none' : 'auto'
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center">
          
          {/* Contrail Speed Lines from Jet Tail */}
          <div className="absolute right-[85%] top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-80 pointer-events-none">
            <div className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${isJetDeparting ? 'w-32 animate-pulse' : 'w-16'}`} />
            <div className={`h-[2px] bg-sky-400 rounded-full transition-all duration-300 ${isJetDeparting ? 'w-40 animate-pulse' : 'w-24'}`} />
            <div className={`h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${isJetDeparting ? 'w-28 animate-pulse' : 'w-14'}`} />
          </div>

          {/* Afterburner Thruster Flame (ignites on scroll departure) */}
          {isJetDeparting && (
            <div className="absolute right-[92%] top-1/2 -translate-y-1/2 flex items-center">
              <div className="w-12 h-3.5 bg-gradient-to-l from-orange-500 via-amber-300 to-transparent rounded-full blur-[1px] animate-pulse" />
              <div className="w-8 h-2 bg-gradient-to-l from-[#FF2A5F] to-transparent rounded-full" />
            </div>
          )}

          {/* Tactical Supersonic Fighter Jet */}
          <svg 
            width="120" 
            height="50" 
            viewBox="0 0 120 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_16px_rgba(15,23,42,0.15)]"
          >
            <polygon points="30,25 65,46 76,46 70,25 76,4 65,4" fill="#E2E8F0" />
            <polygon points="38,25 68,44 74,44 68,25 74,6 68,6" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M 112 25 L 80 18 L 22 18 L 14 22 L 8 22 L 8 28 L 14 28 L 22 32 L 80 32 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M 72 21 L 96 25 L 72 29 Z" fill="#38BDF8" fillOpacity="0.85" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="76" y1="23" x2="88" y2="25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="18,18 26,6 34,6 30,18" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
            <polygon points="18,32 26,44 34,44 30,32" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
            <text x="36" y="27" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#FF2A5F">MS-01</text>
            <line x1="112" y1="25" x2="119" y2="25" stroke="#0F172A" strokeWidth="1.8" />
          </svg>

          {/* Mission Alert Bubble */}
          {missionPhase === 'dropping' && !isJetDeparting && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-md border border-slate-700 animate-bounce">
              EJECT! DROP ON 'T'! 🪂
            </div>
          )}

        </div>
      </div>


      {/* 2. STICKMAN 1 ("SCOUT" - LANDING ON THE 'T') */}
      {troop1.visible && (
        <div
          className="absolute z-50 transition-transform"
          style={{
            transform: `translate3d(${troop1.x}px, ${troop1.y}px, 0px)`,
            transition: troop1.transition
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
            
            {/* Parachute */}
            {troop1.parachute && (
              <div className="mb-[-2px] animate-pulse">
                <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                  <path d="M 4 22 C 4 6, 40 6, 40 22 Z" fill="#FAF8F2" stroke="#0F172A" strokeWidth="2" />
                  <path d="M 16 9 C 14 14, 13 22, 13 22" stroke="#FF2A5F" strokeWidth="2" />
                  <path d="M 28 9 C 30 14, 31 22, 31 22" stroke="#FF2A5F" strokeWidth="2" />
                  <line x1="4" y1="22" x2="22" y2="28" stroke="#64748B" strokeWidth="1" />
                  <line x1="14" y1="22" x2="22" y2="28" stroke="#64748B" strokeWidth="1" />
                  <line x1="30" y1="22" x2="22" y2="28" stroke="#64748B" strokeWidth="1" />
                  <line x1="40" y1="22" x2="22" y2="28" stroke="#64748B" strokeWidth="1" />
                </svg>
              </div>
            )}

            {/* Stickman Body */}
            <svg 
              width="32" 
              height="42" 
              viewBox="0 0 32 42" 
              fill="none" 
              stroke="#0F172A" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="16" cy="9" r="6" fill="#FAF8F2" />
              <path d="M 10 8 L 22 8" stroke="#FF2A5F" strokeWidth="2.5" />
              <path d="M 10 8 L 6 6" stroke="#FF2A5F" strokeWidth="2" />
              <circle cx="14" cy="9" r="0.8" fill="#0F172A" />

              <line x1="16" y1="15" x2="16" y2="27" />

              {troop1.jumping ? (
                <>
                  <path d="M 16 18 L 8 12 L 4 15" />
                  <path d="M 16 18 L 24 12 L 28 8" />
                  <path d="M 16 27 L 10 33 L 13 40" />
                  <path d="M 16 27 L 22 33 L 20 40" />
                </>
              ) : (
                <>
                  <path d="M 16 18 L 9 22 L 5 26" />
                  <path d="M 16 18 L 23 20 L 28 17" strokeWidth="2.8" stroke="#FF2A5F" />
                  <path d="M 16 27 L 11 34 L 8 41" />
                  <path d="M 16 27 L 21 34 L 24 41" />
                </>
              )}
            </svg>

          </div>
        </div>
      )}


      {/* 3. STICKMAN 2 ("GUNNER" - ACROBAT LANDING ON THE 'T') */}
      {troop2.visible && (
        <div
          className="absolute z-50 transition-transform"
          style={{
            transform: `translate3d(${troop2.x}px, ${troop2.y}px, 0px)`,
            transition: troop2.transition
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
            
            {/* Parachute */}
            {troop2.parachute && (
              <div className="mb-[-2px] animate-pulse">
                <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
                  <path d="M 4 20 C 4 5, 36 5, 36 20 Z" fill="#FAF8F2" stroke="#0F172A" strokeWidth="2" />
                  <path d="M 14 8 C 13 13, 12 20, 12 20" stroke="#3B82F6" strokeWidth="2" />
                  <path d="M 26 8 C 27 13, 28 20, 28 20" stroke="#3B82F6" strokeWidth="2" />
                  <line x1="4" y1="20" x2="20" y2="26" stroke="#64748B" strokeWidth="1" />
                  <line x1="36" y1="20" x2="20" y2="26" stroke="#64748B" strokeWidth="1" />
                </svg>
              </div>
            )}

            {/* Stickman Body */}
            <svg 
              width="32" 
              height="42" 
              viewBox="0 0 32 42" 
              fill="none" 
              stroke="#0F172A" 
              strokeWidth="2.4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="16" cy="9" r="6" fill="#FAF8F2" />
              <path d="M 11 6 Q 16 3 22 6 L 25 8" stroke="#2563EB" strokeWidth="2.5" />
              <circle cx="18" cy="9" r="0.8" fill="#0F172A" />

              <line x1="16" y1="15" x2="16" y2="27" />

              {troop2.jumping ? (
                <>
                  <path d="M 16 18 L 6 14 L 3 8" />
                  <path d="M 16 18 L 26 14 L 29 8" />
                  <path d="M 16 27 L 8 32 L 6 39" />
                  <path d="M 16 27 L 24 30 L 27 36" />
                </>
              ) : (
                <>
                  <path d="M 16 18 L 9 24 L 4 23" />
                  <path d="M 16 18 L 22 13 L 26 13" />
                  <path d="M 16 27 L 11 34 L 7 41" />
                  <path d="M 16 27 L 22 34 L 25 41" />
                </>
              )}
            </svg>

          </div>
        </div>
      )}


      {/* 4. LANDING IMPACT PUFF RIGHT ON THE 'T' */}
      {impactPuff && (
        <div 
          className="absolute z-50 pointer-events-none animate-ping"
          style={{
            left: `${anchors.letterT.x}px`,
            top: `${anchors.letterT.y - 14}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="flex items-center gap-1 font-mono text-[11px] font-black text-[#FF2A5F]">
            <span>💥</span>
            <span>LANDED!</span>
          </div>
        </div>
      )}

    </div>
  );
}
