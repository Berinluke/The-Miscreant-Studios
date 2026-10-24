import React, { useState, useEffect } from 'react';

/**
 * StickmanFighterSprite
 * 
 * High-character authentic ballpoint pen stickman combat sprite:
 * - Red Bot: Crimson Ninja with flowing headband ribbons & red ink Katana.
 * - Blue Bot: Cobalt Shinobi with flowing headband ribbons & blue ink Bo-Staff.
 * - Dynamic poses: Idle guard, punch rush, flying dragon kick, katana slash,
 *   bo-staff spin, block shield, hurt/knockback, and 360-flip.
 * - Completely clean: No text bubbles, no dialogue, no labels.
 */
function StickmanFighterSprite({ team, pose, facing = 'right', isJumping = false }) {
  const isRed = team === 'red';
  const primaryColor = isRed ? '#FF2A5F' : '#2563EB';
  const weaponColor = isRed ? '#DC2626' : '#1D4ED8';
  const inkColor = '#0F172A';

  // Flip horizontally if facing left
  const flipTransform = facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)';

  return (
    <div 
      className="relative select-none pointer-events-none"
      style={{ transform: flipTransform, transformOrigin: 'center center' }}
    >
      <svg 
        width="46" 
        height="52" 
        viewBox="0 0 46 52" 
        fill="none" 
        stroke={inkColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="overflow-visible drop-shadow-[0_4px_8px_rgba(15,23,42,0.18)]"
      >
        {/* Animated Headband Ribbons Fluttering in the Wind */}
        <g stroke={primaryColor} strokeWidth="2.4">
          <path d="M 12 11 Q 5 7, 0 11 Q -5 15, -12 12" className="animate-pulse" />
          <path d="M 12 13 Q 6 11, 2 17 Q -2 21, -8 20" />
        </g>

        {/* Head */}
        <circle cx="20" cy="12" r="7" fill="#FAF8F2" />
        
        {/* Headband / Cap */}
        <path d="M 13 11 L 27 11" stroke={primaryColor} strokeWidth="3" />
        
        {/* Fierce Anime Combat Eyes */}
        <path d="M 17 11 L 20 13" stroke={inkColor} strokeWidth="1.6" />
        <path d="M 23 11 L 20 13" stroke={inkColor} strokeWidth="1.6" />
        <circle cx="21" cy="13" r="0.9" fill={primaryColor} />

        {/* Torso Spine */}
        <line x1="20" y1="19" x2="20" y2="33" />

        {/* --- DYNAMIC POSES & WEAPONS --- */}
        {pose === 'punch' && (
          <>
            {/* Punching Arm Extended with Speed Contrails */}
            <line x1="20" y1="23" x2="38" y2="21" strokeWidth="2.8" stroke={weaponColor} />
            <circle cx="38" cy="21" r="2.5" fill={primaryColor} />
            <line x1="20" y1="23" x2="14" y2="28" />
            <line x1="14" y1="28" x2="11" y2="23" />
            {/* Speed Lines */}
            <line x1="40" y1="18" x2="46" y2="18" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="41" y1="24" x2="47" y2="24" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Stance Legs */}
            <path d="M 20 33 L 14 42 L 8 50" />
            <path d="M 20 33 L 28 41 L 34 49" />
          </>
        )}

        {pose === 'kick' && (
          <>
            {/* Guard Arms */}
            <path d="M 20 23 L 13 20 L 10 25" />
            <path d="M 20 23 L 26 21 L 28 27" />
            {/* High Flying Roundhouse Kick */}
            <line x1="20" y1="33" x2="38" y2="19" strokeWidth="3" stroke={primaryColor} />
            <path d="M 38 19 L 44 16" stroke={weaponColor} strokeWidth="3" />
            {/* Standing / Pivoting Leg */}
            <path d="M 20 33 L 15 41 L 12 50" />
          </>
        )}

        {pose === 'air_kick' && (
          <>
            {/* Aerodynamic Dive Kick */}
            <path d="M 20 22 L 10 16 L 4 18" />
            <path d="M 20 22 L 28 17 L 34 14" stroke={weaponColor} strokeWidth="2.5" />
            {/* Front Dropkick Leg */}
            <line x1="20" y1="33" x2="42" y2="40" strokeWidth="3.2" stroke={primaryColor} />
            <circle cx="42" cy="40" r="2.5" fill={weaponColor} />
            {/* Tucked Back Leg */}
            <path d="M 20 33 L 10 37 L 16 45" />
          </>
        )}

        {pose === 'slash' && (
          <>
            {/* Katana / Blade Slash */}
            <path d="M 20 22 L 29 16 L 36 10" strokeWidth="2.8" />
            {/* Glowing Weapon Arc */}
            {isRed ? (
              <path d="M 36 10 L 46 2 C 48 16, 44 28, 30 38" stroke={weaponColor} strokeWidth="3" strokeLinecap="round" />
            ) : (
              <line x1="12" y1="38" x2="42" y2="6" stroke={weaponColor} strokeWidth="3.2" strokeLinecap="round" />
            )}
            <path d="M 20 22 L 14 26 L 10 24" />
            {/* Combat Stride Legs */}
            <path d="M 20 33 L 13 41 L 7 49" />
            <path d="M 20 33 L 29 40 L 37 47" />
          </>
        )}

        {pose === 'block' && (
          <>
            {/* Defensive X-Guard */}
            <line x1="20" y1="23" x2="28" y2="16" strokeWidth="2.8" />
            <line x1="28" y1="16" x2="34" y2="24" strokeWidth="2.8" stroke={weaponColor} />
            <line x1="20" y1="23" x2="28" y2="24" strokeWidth="2.8" />
            <line x1="28" y1="24" x2="34" y2="16" strokeWidth="2.8" stroke={weaponColor} />
            {/* Energy Shield Spark */}
            <circle cx="33" cy="20" r="5" fill="none" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Braced Legs */}
            <path d="M 20 33 L 12 41 L 8 49" />
            <path d="M 20 33 L 26 41 L 30 49" />
          </>
        )}

        {pose === 'hurt' && (
          <>
            {/* Arched Knockback Body */}
            <path d="M 20 23 L 12 16 L 6 19" />
            <path d="M 20 23 L 14 28 L 8 32" />
            <path d="M 20 33 L 14 39 L 10 47" />
            <path d="M 20 33 L 22 41 L 20 49" />
          </>
        )}

        {/* DEFAULT / IDLE COMBAT STANCE */}
        {pose === 'idle' && (
          <>
            {/* Martial Arts Bouncing Guard with Held Weapon */}
            <path d="M 20 22 L 13 25 L 11 20" />
            <path d="M 20 22 L 28 20 L 32 16" />
            {/* Weapon resting in hand */}
            {isRed ? (
              <line x1="32" y1="16" x2="42" y2="4" stroke={weaponColor} strokeWidth="2.8" strokeLinecap="round" />
            ) : (
              <line x1="24" y1="30" x2="36" y2="6" stroke={weaponColor} strokeWidth="2.6" strokeLinecap="round" />
            )}
            {/* Ready Legs */}
            <path d="M 20 33 L 15 42 L 12 50" />
            <path d="M 20 33 L 25 41 L 28 49" />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * JetMissionScrollytelling
 * 
 * Choreography:
 * 1. Entry: Fighter Jet enters from top-left and flies directly to the area above the 'T' in MISCREANT.
 * 2. Drop: 2 Stickmen troops eject from the jet and drop straight down onto the 'T'.
 * 3. Land: They stick the landing right on top of the 'T'. Jet departs with afterburners.
 * 4. BOT FIGHT ENGINE (AUTOPLAYING VIDEOGAME ACTION MOVIE - ZERO DIALOGUE / TEXT):
 *    - The two stickmen are OPPONENTS (Red Bot vs Blue Bot).
 *    - Pure visual combat: jabs, parries, sweeps, flying kicks, slashes, and acrobatics.
 *    - They launch into the air together!
 *    - WHILE FALLING IN THE AIR down the marked channel between title and monitor, they fight furiously.
 *    - They hit the desk near the controller, clash in a rapid ground duel, and somersault back up to 'T' in an endless epic fight!
 *    - On scroll, the battle expands across the words and down into Slide 2!
 */
export default function JetMissionScrollytelling({ 
  containerRef, 
  letterTRef, 
  studiosRef, 
  btnRef 
}) {
  const [mounted, setMounted] = useState(false);
  // 'entering' (0-1100ms) -> 'dropping' (1100-2100ms) -> 'landed_fighting' (2100ms+)
  const [missionPhase, setMissionPhase] = useState('entering');
  const [jetVanished, setJetVanished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measured coordinates relative to hero container
  const [anchors, setAnchors] = useState({
    jetCenter: { x: 520, y: 35 },
    letterT: { x: 500, y: 200 },
    studios: { x: 260, y: 320 },
    button: { x: 220, y: 460 },
    exitNextPage: { x: 260, y: 780 }
  });

  // Combat State Machine for 60 FPS Bot Fight
  const [fightCycle, setFightCycle] = useState(0);
  const [redPose, setRedPose] = useState('idle');
  const [bluePose, setBluePose] = useState('idle');
  const [redFacing, setRedFacing] = useState('right');
  const [blueFacing, setBlueFacing] = useState('left');

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

    // Initial Drop Timeline:
    const dropTimer = setTimeout(() => {
      setMissionPhase('dropping');
    }, 1100);

    const landTimer = setTimeout(() => {
      setMissionPhase('landed_fighting');
    }, 2100);

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

  useEffect(() => {
    const t = setTimeout(updateAnchors, 250);
    return () => clearTimeout(t);
  }, [mounted]);

  // 60 FPS FIGHTING ENGINE LOOP (WHEN LANDED)
  useEffect(() => {
    if (missionPhase !== 'landed_fighting') return;

    let animId;
    const startTime = Date.now();

    const fightLoop = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000; // in seconds
      const cycleTime = elapsed % 10.5; // 10.5-second choreographed anime duel cycle
      setFightCycle(cycleTime);

      // --- COMBAT MOVE POSE SCHEDULER (PURE ACTIONS, ZERO TEXT) ---
      if (cycleTime < 2.0) {
        // Phase 1: Fight on 'T'
        setRedFacing('right');
        setBlueFacing('left');
        if (cycleTime < 0.6) {
          setRedPose('idle');
          setBluePose('idle');
        } else if (cycleTime < 1.1) {
          setRedPose('punch');
          setBluePose('block');
        } else if (cycleTime < 1.6) {
          setRedPose('block');
          setBluePose('kick');
        } else {
          setRedPose('slash');
          setBluePose('hurt');
        }
      } else if (cycleTime < 3.8) {
        // Phase 2: Launch into Air
        setRedFacing('right');
        setBlueFacing('left');
        setRedPose('slash');
        setBluePose('air_kick');
      } else if (cycleTime < 7.2) {
        // Phase 3: FALLING AIR BATTLE (MID-AIR COMBAT DOWN THE MARKED CHANNEL)
        const sub = cycleTime - 3.8;
        if (sub < 0.8) {
          setRedPose('air_kick');
          setBluePose('slash');
        } else if (sub < 1.6) {
          setRedPose('slash');
          setBluePose('block');
        } else if (sub < 2.4) {
          setRedPose('block');
          setBluePose('air_kick');
        } else {
          setRedPose('slash');
          setBluePose('slash');
        }
      } else if (cycleTime < 9.0) {
        // Phase 4: Desk / Controller Landing & Duel
        const sub = cycleTime - 7.2;
        if (sub < 0.6) {
          setRedPose('idle');
          setBluePose('idle');
        } else if (sub < 1.2) {
          setRedPose('punch');
          setBluePose('hurt');
        } else {
          setRedPose('hurt');
          setBluePose('kick');
        }
      } else {
        // Phase 5: Ninja Leap Return back to 'T'
        setRedFacing('left');
        setBlueFacing('left');
        setRedPose('air_kick');
        setBluePose('slash');
      }

      animId = requestAnimationFrame(fightLoop);
    };

    animId = requestAnimationFrame(fightLoop);
    return () => cancelAnimationFrame(animId);
  }, [missionPhase]);

  if (!mounted) return null;

  // --- JET POSITION ---
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

  // --- 2 BOT FIGHTERS TRAJECTORY COMPUTATION ---
  const tX = anchors.letterT.x;
  const tY = anchors.letterT.y; // Feet rest on top bar of the 'T'
  const sProgress = scrollProgress;

  // Coordinates when in initial entry / drop
  let redX = tX - 16;
  let redY = tY;
  let blueX = tX + 16;
  let blueY = tY;
  let redParachute = false;
  let blueParachute = false;
  let redVisible = missionPhase !== 'entering';
  let blueVisible = missionPhase !== 'entering';
  let dropTransition = 'none';

  if (missionPhase === 'entering') {
    redX = anchors.jetCenter.x - 10;
    redY = anchors.jetCenter.y + 10;
    blueX = anchors.jetCenter.x + 10;
    blueY = anchors.jetCenter.y + 10;
  } else if (missionPhase === 'dropping') {
    redX = tX - 16;
    redY = tY;
    blueX = tX + 16;
    blueY = tY;
    redParachute = true;
    blueParachute = true;
    dropTransition = 'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1)';
  } else if (missionPhase === 'landed_fighting') {
    // If user is scrolled, follow scroll journey
    if (sProgress > 0.05) {
      if (sProgress <= 0.35) {
        const p = (sProgress - 0.05) / 0.30;
        const jumpArc = Math.sin(p * Math.PI) * 45;
        redX = tX - 16 + (anchors.studios.x - tX) * p;
        redY = tY + (anchors.studios.y - tY) * p - jumpArc;
        blueX = tX + 16 + (anchors.studios.x - tX) * p;
        blueY = tY + (anchors.studios.y - tY) * p - jumpArc;
      } else if (sProgress <= 0.70) {
        const p = (sProgress - 0.35) / 0.35;
        const jumpArc = Math.sin(p * Math.PI) * 35;
        redX = anchors.studios.x - 16 + (anchors.button.x - anchors.studios.x) * p;
        redY = anchors.studios.y + (anchors.button.y - anchors.studios.y) * p - jumpArc;
        blueX = anchors.studios.x + 16 + (anchors.button.x - anchors.studios.x) * p;
        blueY = anchors.studios.y + (anchors.button.y - anchors.studios.y) * p - jumpArc;
      } else {
        const p = Math.min((sProgress - 0.70) / 0.35, 1.2);
        redX = anchors.button.x - 16 + (anchors.exitNextPage.x - anchors.button.x) * p;
        redY = anchors.button.y + (anchors.exitNextPage.y - anchors.button.y) * p;
        blueX = anchors.button.x + 16 + (anchors.exitNextPage.x - anchors.button.x) * p;
        blueY = anchors.button.y + (anchors.exitNextPage.y - anchors.button.y) * p;
        redParachute = true;
        blueParachute = true;
      }
    } else {
      // --- AUTOPLAYING VIDEOGAME BOT FIGHT (MATCHING THE USER'S MARKED PATH) ---
      const t = fightCycle;

      if (t < 2.0) {
        // Phase 1: Duel on the 'T'
        const hop = Math.abs(Math.sin(t * 12)) * 5;
        redX = tX - 18;
        redY = tY - (redPose === 'kick' ? hop : 0);
        blueX = tX + 18;
        blueY = tY - (bluePose === 'kick' ? hop : 0);
      } else if (t < 3.8) {
        // Phase 2: Launch into Air towards the marked diagonal channel
        const p = (t - 2.0) / 1.8;
        const jumpApex = Math.sin(p * Math.PI) * 65;
        const targetX = tX + 45 * p;
        const targetY = tY + 40 * p - jumpApex;

        redX = targetX - 16;
        redY = targetY;
        blueX = targetX + 16;
        blueY = targetY - 6;
      } else if (t < 7.2) {
        // Phase 3: FALLING AIR BATTLE (MID-AIR CLASH DOWN THE MARKED PATH)
        // User marked: from 'T' down through the channel between text and monitor (x: 520 to 670, y: 200 to 450)
        const p = (t - 3.8) / 3.4;
        const startX = tX + 45;
        const startY = tY + 40;
        const endX = tX + 145;
        const endY = tY + 245;

        const curX = startX + (endX - startX) * p;
        const curY = startY + (endY - startY) * p;

        // Dynamic aerial combat orbit/oscillation
        const orbit = Math.sin(p * 8 * Math.PI) * 16;
        redX = curX - 18 + orbit;
        redY = curY;
        blueX = curX + 18 - orbit;
        blueY = curY - 5;
      } else if (t < 9.0) {
        // Phase 4: Desk / Controller Area Ground Duel
        const deskX = tX + 145;
        const deskY = tY + 250;
        const recoil = Math.sin((t - 7.2) * 8) * 8;

        redX = deskX - 22 + recoil;
        redY = deskY;
        blueX = deskX + 22 - recoil;
        blueY = deskY;
      } else {
        // Phase 5: Acrobatic Ninja Wall-Jump Return back to 'T'
        const p = (t - 9.0) / 1.5;
        const startX = tX + 145;
        const startY = tY + 250;
        const jumpApex = Math.sin(p * Math.PI) * 105;

        const curX = startX + (tX - startX) * p;
        const curY = startY + (tY - startY) * p - jumpApex;

        redX = curX - 16;
        redY = curY;
        blueX = curX + 16;
        blueY = curY;
      }
    }
  }

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

          {/* Afterburner Thruster Flame (ignites on departure) */}
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


      {/* 2. RED BOT FIGHTER (CRIMSON NINJA - PURE COMBAT ACTION) */}
      {redVisible && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            transform: `translate3d(${redX}px, ${redY}px, 0px)`,
            transition: dropTransition
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
            
            {/* Parachute during drop */}
            {redParachute && (
              <div className="mb-[-4px] animate-pulse">
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

            {/* Animated Sprite */}
            <StickmanFighterSprite 
              team="red" 
              pose={redPose} 
              facing={redFacing}
              isJumping={missionPhase === 'dropping' || fightCycle > 2.0}
            />

          </div>
        </div>
      )}


      {/* 3. BLUE BOT FIGHTER (COBALT SHINOBI - PURE COMBAT ACTION) */}
      {blueVisible && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            transform: `translate3d(${blueX}px, ${blueY}px, 0px)`,
            transition: dropTransition
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
            
            {/* Parachute during drop */}
            {blueParachute && (
              <div className="mb-[-4px] animate-pulse">
                <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
                  <path d="M 4 20 C 4 5, 36 5, 36 20 Z" fill="#FAF8F2" stroke="#0F172A" strokeWidth="2" />
                  <path d="M 14 8 C 13 13, 12 20, 12 20" stroke="#3B82F6" strokeWidth="2" />
                  <path d="M 26 8 C 27 13, 28 20, 28 20" stroke="#3B82F6" strokeWidth="2" />
                  <line x1="4" y1="20" x2="20" y2="26" stroke="#64748B" strokeWidth="1" />
                  <line x1="36" y1="20" x2="20" y2="26" stroke="#64748B" strokeWidth="1" />
                </svg>
              </div>
            )}

            {/* Animated Sprite */}
            <StickmanFighterSprite 
              team="blue" 
              pose={bluePose} 
              facing={blueFacing}
              isJumping={missionPhase === 'dropping' || fightCycle > 2.0}
            />

          </div>
        </div>
      )}

    </div>
  );
}