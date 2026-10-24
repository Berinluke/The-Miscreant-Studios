import React, { useState, useEffect } from 'react';

/**
 * JetMissionScrollytelling
 * 
 * Supersonic Jet Flyby for Slide 1 Hero:
 * - Fighter Jet enters from top-left, roars across the sky with blue contrails and
 *   ignites orange afterburners as it accelerates off towards the top-right corner.
 * - Zero stickmen on Slide 1 (as requested, keeping the Hero stage 100% clean).
 */
export default function JetMissionScrollytelling({ 
  containerRef, 
  letterTRef
}) {
  const [mounted, setMounted] = useState(false);
  const [missionPhase, setMissionPhase] = useState('entering'); // 'entering' -> 'departed'
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measured coordinates relative to hero container
  const [anchors, setAnchors] = useState({
    jetCenter: { x: 520, y: 35 },
    letterT: { x: 500, y: 200 }
  });

  const updateAnchors = () => {
    if (!containerRef?.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    let tX = 500;
    let tY = 200;

    if (letterTRef?.current) {
      const rect = letterTRef.current.getBoundingClientRect();
      tX = rect.left - cRect.left + (rect.width * 0.48);
      tY = rect.top - cRect.top + Math.max(rect.height * 0.08, 6);
    }

    const jetTargetX = Math.max(tX + 10, 360);
    const jetTargetY = 35;

    setAnchors({
      jetCenter: { x: jetTargetX, y: jetTargetY },
      letterT: { x: tX, y: tY }
    });
  };

  useEffect(() => {
    setMounted(true);
    updateAnchors();

    const handleResize = () => updateAnchors();
    window.addEventListener('resize', handleResize);

    // Jet Flyby Timeline:
    // 1. Enters from top-left (0 -> 1200ms)
    // 2. Accelerates to top-right corner with afterburners (1800ms)
    const departTimer = setTimeout(() => {
      setMissionPhase('departed');
    }, 1800);

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
      clearTimeout(departTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  // --- JET POSITION ---
  const isJetDeparting = missionPhase === 'departed' || scrollProgress > 0.01;

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

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-visible select-none">
      
      {/* SUPERSONIC FIGHTER JET FLYBY */}
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

          {/* Afterburner Thruster Flame */}
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

        </div>
      </div>

    </div>
  );
}