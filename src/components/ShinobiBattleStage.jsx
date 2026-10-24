import React, { useState, useEffect, useRef } from 'react';

/**
 * ShinobiBattleStage (Naruto vs Sasuke Stickman Ninja Jutsu War)
 * 
 * Authentic hand-drawn ballpoint pen anime battle for Slide 2 ("OUR GAMES"):
 * - Naruto Shinobi: Spiky hair, leaf headband, swirling RASENGAN chakra, Shadow Clone jutsu.
 * - Sasuke Shinobi: Dark collar, rogue headband, crimson SHARINGAN eye, crackling CHIDORI lightning, Fireball jutsu.
 * - Parkour Battleground: They leap across "OUR GAMES" header, wall-run down the game selection cards,
 *   and execute the legendary mid-air RASENGAN vs CHIDORI collision in the center!
 * - Zero dialogue, zero text bubbles, pure high-octane ninja martial arts & jutsu physics.
 */

// --- RASENGAN CHAKRA ORB COMPONENT ---
function RasenganOrb({ scale = 1 }) {
  return (
    <div 
      className="relative pointer-events-none"
      style={{ transform: `scale(${scale})` }}
    >
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="overflow-visible animate-spin" style={{ animationDuration: '0.6s' }}>
        {/* Outer Aura Glow */}
        <circle cx="21" cy="21" r="18" fill="rgba(56, 189, 248, 0.25)" />
        <circle cx="21" cy="21" r="14" fill="rgba(37, 99, 235, 0.4)" />
        {/* Core Chakra Sphere */}
        <circle cx="21" cy="21" r="9" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.8" />
        {/* Swirling Chakra Spirals */}
        <path d="M 21 7 C 28 7, 33 13, 33 21 C 33 27, 27 31, 21 31" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 21 35 C 14 35, 9 29, 9 21 C 9 15, 15 11, 21 11" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 11 21 C 11 13, 17 9, 23 11 C 29 13, 31 19, 27 25" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
        {/* Orbital Chakra Sparks */}
        <circle cx="29" cy="12" r="1.5" fill="#FFFFFF" />
        <circle cx="13" cy="30" r="1.5" fill="#38BDF8" />
        <circle cx="32" cy="28" r="1.5" fill="#93C5FD" />
      </svg>
    </div>
  );
}

// --- CHIDORI LIGHTNING BLADE COMPONENT ---
function ChidoriBlade({ scale = 1 }) {
  return (
    <div 
      className="relative pointer-events-none"
      style={{ transform: `scale(${scale})` }}
    >
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" className="overflow-visible animate-pulse">
        {/* Violet Lightning Aura */}
        <circle cx="23" cy="23" r="16" fill="rgba(129, 140, 248, 0.3)" />
        <circle cx="23" cy="23" r="10" fill="rgba(99, 102, 241, 0.6)" />
        <circle cx="23" cy="23" r="5" fill="#FFFFFF" />
        {/* Crackling Lightning Bolts */}
        <path d="M 23 23 L 33 11 L 30 7 L 42 3" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 23 23 L 37 25 L 34 32 L 44 38" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 23 23 L 13 33 L 18 38 L 9 44" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 23 23 L 11 15 L 16 10 L 4 6" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 23 23 L 26 37 L 22 43" stroke="#FFFFFF" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

// --- FIREBALL JUTSU (GOUKAKYUU) COMPONENT ---
function FireballJutsu() {
  return (
    <div className="relative pointer-events-none animate-pulse">
      <svg width="54" height="44" viewBox="0 0 54 44" fill="none" className="overflow-visible">
        <ellipse cx="28" cy="22" rx="24" ry="18" fill="rgba(239, 68, 68, 0.35)" />
        <ellipse cx="26" cy="22" rx="18" ry="13" fill="#F59E0B" />
        <ellipse cx="24" cy="22" rx="12" ry="8" fill="#FEF08A" />
        <path d="M 4 22 Q 18 12, 34 16 Q 48 22, 34 28 Q 18 32, 4 22 Z" fill="#EF4444" opacity="0.8" />
        <circle cx="12" cy="22" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

// --- DYNAMIC STICKMAN SHINOBI SPRITE ---
function ShinobiSprite({ type, pose, facing = 'right', rotation = 0 }) {
  const isNaruto = type === 'naruto';
  const scaleX = facing === 'left' ? -1 : 1;
  const inkColor = '#0F172A';

  return (
    <div 
      className="relative select-none pointer-events-none transition-transform duration-75"
      style={{ 
        transform: `scaleX(${scaleX}) rotate(${rotation}deg)`, 
        transformOrigin: 'center center' 
      }}
    >
      <svg 
        width="52" 
        height="56" 
        viewBox="0 0 52 56" 
        fill="none" 
        stroke={inkColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="overflow-visible drop-shadow-[0_4px_12px_rgba(15,23,42,0.22)]"
      >
        {/* --- HEAD & HAIR --- */}
        {isNaruto ? (
          <>
            {/* Naruto Spiky Blonde/Orange Hair */}
            <path d="M 15 10 L 13 4 L 18 7 L 22 2 L 25 7 L 30 3 L 30 9" fill="#F59E0B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            {/* Konoha Leaf Headband */}
            <rect x="15" y="9" width="15" height="5" rx="1.5" fill="#3B82F6" stroke={inkColor} strokeWidth="1.8" />
            <rect x="19" y="10" width="7" height="3" rx="1" fill="#E2E8F0" stroke={inkColor} strokeWidth="1" />
            {/* Flowing Bandana Tails */}
            <path d="M 15 11 Q 9 9, 4 14" stroke="#3B82F6" strokeWidth="2.2" />
            <path d="M 15 13 Q 8 15, 2 21" stroke="#3B82F6" strokeWidth="2.2" />
            {/* Face */}
            <circle cx="22" cy="14" r="6.5" fill="#FAF8F2" />
            {/* Whiskers */}
            <line x1="17" y1="13" x2="19" y2="13" stroke="#F97316" strokeWidth="1.2" />
            <line x1="17" y1="15" x2="19" y2="15" stroke="#F97316" strokeWidth="1.2" />
            <line x1="25" y1="13" x2="27" y2="13" stroke="#F97316" strokeWidth="1.2" />
            <line x1="25" y1="15" x2="27" y2="15" stroke="#F97316" strokeWidth="1.2" />
            {/* Determined Blue Eyes */}
            <circle cx="24" cy="13" r="1.1" fill="#0284C7" />
          </>
        ) : (
          <>
            {/* Sasuke Spiky Dark Ninja Hair with Bangs */}
            <path d="M 14 12 L 10 7 L 16 9 L 19 3 L 23 8 L 28 4 L 31 10" fill="#1E1B4B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            {/* High Uchiha Collar */}
            <path d="M 17 19 L 14 14 L 19 17" fill="#1E1B4B" stroke={inkColor} strokeWidth="2" />
            <path d="M 27 19 L 30 14 L 25 17" fill="#1E1B4B" stroke={inkColor} strokeWidth="2" />
            {/* Face */}
            <circle cx="22" cy="14" r="6.5" fill="#FAF8F2" />
            {/* Red Sharingan Eye! */}
            <circle cx="24" cy="13" r="1.5" fill="#DC2626" />
            <circle cx="24" cy="13" r="0.6" fill="#000000" />
            {/* Dark Hair Bangs framing face */}
            <path d="M 16 11 L 18 16" stroke="#1E1B4B" strokeWidth="2.2" />
            <path d="M 28 11 L 26 16" stroke="#1E1B4B" strokeWidth="2.2" />
          </>
        )}

        {/* Torso Spine */}
        <line x1="22" y1="20" x2="22" y2="35" strokeWidth="2.8" stroke={isNaruto ? '#EA580C' : '#312E81'} />

        {/* --- POSES --- */}

        {/* 1. RASENGAN CHARGE POSE (Naruto thrusting glowing sphere forward) */}
        {pose === 'rasengan_thrust' && (
          <>
            {/* Thrusting arm holding sphere */}
            <line x1="22" y1="24" x2="40" y2="24" strokeWidth="3" stroke="#EA580C" />
            {/* Back guard arm */}
            <path d="M 22 24 L 13 20 L 8 24" />
            {/* Stride legs */}
            <path d="M 22 35 L 14 44 L 7 52" strokeWidth="3" />
            <path d="M 22 35 L 32 43 L 41 50" strokeWidth="3.2" stroke="#EA580C" />
          </>
        )}

        {/* 2. CHIDORI RUN POSE (Sasuke dragging lightning hand across the ground) */}
        {pose === 'chidori_sprint' && (
          <>
            {/* Leaning 30 degrees into sprint */}
            <line x1="22" y1="24" x2="42" y2="32" strokeWidth="3" stroke="#4338CA" />
            <path d="M 22 24 L 12 18 L 8 12" />
            {/* Powerful sprint stride */}
            <path d="M 22 35 L 12 43 L 4 48" strokeWidth="3" />
            <path d="M 22 35 L 34 42 L 44 46" strokeWidth="3.2" stroke="#4338CA" />
          </>
        )}

        {/* 3. FLYING DRAGON KICK */}
        {pose === 'flying_kick' && (
          <>
            <path d="M 22 23 L 12 17 L 6 20" />
            <path d="M 22 23 L 30 18 L 36 14" strokeWidth="2.6" />
            {/* Extended kick leg */}
            <line x1="22" y1="35" x2="46" y2="33" strokeWidth="3.4" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <circle cx="46" cy="33" r="2.8" fill={isNaruto ? '#F97316' : '#6366F1'} />
            {/* Tucked leg */}
            <path d="M 22 35 L 12 40 L 18 48" />
          </>
        )}

        {/* 4. FIREBALL HAND SIGN POSE */}
        {pose === 'fireball_cast' && (
          <>
            {/* Hands brought to mouth in tiger hand seal */}
            <path d="M 22 23 L 26 18 L 26 15" strokeWidth="2.8" stroke="#4338CA" />
            <path d="M 22 23 L 20 18 L 24 15" strokeWidth="2.8" stroke="#4338CA" />
            {/* Balanced crouch legs */}
            <path d="M 22 35 L 12 42 L 6 50" strokeWidth="3" />
            <path d="M 22 35 L 32 42 L 38 50" strokeWidth="3" />
          </>
        )}

        {/* 5. KUSA BLADE SWORD SLASH (Sasuke katana) */}
        {pose === 'sword_slash' && (
          <>
            <path d="M 22 23 L 33 16 L 41 10" strokeWidth="2.8" />
            {/* Steel Chokuto Katana with lightning gleam */}
            <line x1="33" y1="16" x2="48" y2="2" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 22 23 L 14 27 L 9 24" />
            <path d="M 22 35 L 13 43 L 6 51" />
            <path d="M 22 35 L 31 42 L 40 49" strokeWidth="3" />
          </>
        )}

        {/* 6. WALL PERCH (Planting feet on tab button / card edges) */}
        {pose === 'wall_perch' && (
          <>
            <path d="M 22 23 L 13 20 L 5 22" strokeWidth="2.8" />
            <path d="M 22 23 L 30 18 L 36 14" strokeWidth="2.6" />
            <path d="M 22 35 L 12 39 L 2 35" strokeWidth="3.2" />
            <path d="M 22 35 L 15 45 L 2 49" strokeWidth="3.2" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <circle cx="2" cy="35" r="2.2" fill={isNaruto ? '#F97316' : '#6366F1'} />
            <circle cx="2" cy="49" r="2.2" fill={isNaruto ? '#F97316' : '#6366F1'} />
          </>
        )}

        {/* 7. WALL SPRING (Exploding off card / letter) */}
        {pose === 'wall_spring' && (
          <>
            <line x1="22" y1="23" x2="44" y2="21" strokeWidth="3" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <circle cx="44" cy="21" r="2.6" fill={isNaruto ? '#F97316' : '#818CF8'} />
            <path d="M 22 23 L 14 18 L 9 14" />
            <line x1="22" y1="35" x2="2" y2="41" strokeWidth="3.4" />
            <line x1="22" y1="35" x2="6" y2="47" strokeWidth="3.4" />
          </>
        )}

        {/* 8. MATRIX DODGE */}
        {pose === 'dodge' && (
          <>
            <path d="M 22 23 L 12 18 L 7 12" />
            <path d="M 22 23 L 31 20 L 37 24" strokeWidth="2.6" />
            <path d="M 22 35 L 11 40 L 5 48" />
            <path d="M 22 35 L 33 41 L 40 48" />
          </>
        )}

        {/* 9. RECOIL */}
        {pose === 'recoil' && (
          <>
            <path d="M 22 23 L 13 16 L 7 19" />
            <path d="M 22 23 L 15 28 L 9 32" />
            <path d="M 22 35 L 14 39 L 10 47" />
            <path d="M 22 35 L 23 41 L 21 49" />
          </>
        )}

        {/* 10. DEFAULT COMBAT IDLE */}
        {pose === 'idle' && (
          <>
            <path d="M 22 23 L 14 26 L 11 20" />
            <path d="M 22 23 L 30 20 L 34 16" />
            <path d="M 22 35 L 14 43 L 9 51" strokeWidth="2.8" />
            <path d="M 22 35 L 30 42 L 35 50" strokeWidth="2.8" />
          </>
        )}
      </svg>
    </div>
  );
}

// --- CLASH SHOCKWAVE COMPONENT (RASENGAN VS CHIDORI SPHERE) ---
function ClashSphere({ active }) {
  if (!active) return null;
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="overflow-visible animate-pulse">
        {/* Expanding Shockwave Rings */}
        <circle cx="60" cy="60" r="54" stroke="#38BDF8" strokeWidth="2.5" opacity="0.7" className="animate-ping" />
        <circle cx="60" cy="60" r="44" stroke="#818CF8" strokeWidth="3" opacity="0.85" />
        {/* Dual Chakra Collision Core */}
        <ellipse cx="52" cy="60" rx="22" ry="22" fill="rgba(56, 189, 248, 0.7)" />
        <ellipse cx="68" cy="60" rx="22" ry="22" fill="rgba(129, 140, 248, 0.7)" />
        <circle cx="60" cy="60" r="14" fill="#FFFFFF" />
        {/* Electric Tendrils */}
        <path d="M 60 60 L 90 35 L 105 45" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 60 60 L 30 85 L 15 75" stroke="#38BDF8" strokeWidth="2.5" />
        <path d="M 60 60 L 85 90 L 98 102" stroke="#818CF8" strokeWidth="2.5" />
        <path d="M 60 60 L 35 30 L 22 18" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

// --- SHADOW CLONE SMOKE PUFF ---
function SmokePuff({ active, x, y }) {
  if (!active) return null;
  return (
    <div 
      className="absolute pointer-events-none z-40 transition-opacity duration-300"
      style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
    >
      <svg width="60" height="48" viewBox="0 0 60 48" fill="none" className="animate-ping">
        <ellipse cx="30" cy="24" rx="22" ry="16" fill="rgba(241, 245, 249, 0.85)" stroke="#64748B" strokeWidth="1.8" />
        <circle cx="18" cy="20" r="10" fill="rgba(241, 245, 249, 0.9)" />
        <circle cx="42" cy="20" r="10" fill="rgba(241, 245, 249, 0.9)" />
      </svg>
    </div>
  );
}

// --- MAIN SHINOBI BATTLE STAGE ---
export default function ShinobiBattleStage({ containerRef, headerRef, tabsRef, cardRef }) {
  const [mounted, setMounted] = useState(false);
  const [battleTime, setBattleTime] = useState(0);

  // Position anchors relative to Slide 2 container
  const [anchors, setAnchors] = useState({
    headerLeft: 120,   // "OUR"
    headerRight: 360,  // "GAMES"
    headerTop: 95,
    tabsTop: 240,
    tabsBottom: 580,
    tabsLeft: 110,
    tabsRight: 380,
    cardLeft: 460,
    cardRight: 980,
    cardTop: 240,
    centerChasmX: 420
  });

  const updateAnchors = () => {
    if (!containerRef?.current) return;
    const cRect = containerRef.current.getBoundingClientRect();

    let hLeft = 120;
    let hRight = 360;
    let hTop = 95;
    if (headerRef?.current) {
      const hRect = headerRef.current.getBoundingClientRect();
      hLeft = hRect.left - cRect.left + (hRect.width * 0.25);
      hRight = hRect.left - cRect.left + (hRect.width * 0.75);
      hTop = hRect.top - cRect.top + 10;
    }

    let tTop = 240;
    let tBottom = 580;
    let tLeft = 110;
    let tRight = 380;
    if (tabsRef?.current) {
      const tbRect = tabsRef.current.getBoundingClientRect();
      tTop = tbRect.top - cRect.top;
      tBottom = tbRect.bottom - cRect.top;
      tLeft = tbRect.left - cRect.left;
      tRight = tbRect.right - cRect.left;
    }

    let cLeft = tRight + 60;
    let cRight = cLeft + 520;
    let cTop = tTop;
    if (cardRef?.current) {
      const cdRect = cardRef.current.getBoundingClientRect();
      cLeft = cdRect.left - cRect.left;
      cRight = cdRect.right - cRect.left;
      cTop = cdRect.top - cRect.top;
    }

    const centerChasm = (tRight + cLeft) / 2;

    setAnchors({
      headerLeft: hLeft,
      headerRight: hRight,
      headerTop: hTop,
      tabsTop: tTop,
      tabsBottom: tBottom,
      tabsLeft: tLeft,
      tabsRight: tRight,
      cardLeft: cLeft,
      cardRight: cRight,
      cardTop: cTop,
      centerChasmX: centerChasm
    });
  };

  useEffect(() => {
    setMounted(true);
    updateAnchors();

    const handleResize = () => updateAnchors();
    window.addEventListener('resize', handleResize);

    let animId;
    const startTime = Date.now();

    // 60 FPS Continuous Shinobi War Loop
    const loop = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      setBattleTime(elapsed % 13.5); // 13.5 second anime jutsu war cycle
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!mounted) return null;

  const t = battleTime;

  // --- TRAJECTORY & JUTSU ENGINE ---
  let narutoX = anchors.headerLeft;
  let narutoY = anchors.headerTop;
  let narutoPose = 'idle';
  let narutoFacing = 'right';
  let narutoRotation = 0;
  let hasRasengan = false;

  let sasukeX = anchors.headerRight;
  let sasukeY = anchors.headerTop;
  let sasukePose = 'idle';
  let sasukeFacing = 'left';
  let sasukeRotation = 0;
  let hasChidori = false;
  let hasFireball = false;

  let cloneActive = false;
  let cloneX = 0;
  let cloneY = 0;

  let clashActive = false;
  let clashX = anchors.centerChasmX;
  let clashY = anchors.tabsTop + 140;

  // --- 13.5s CHOREOGRAPHED JUTSU WAR TIMELINE ---
  if (t < 2.5) {
    // Phase 1: Sparring on the "OUR GAMES" Summit
    const sub = t;
    narutoY = anchors.headerTop;
    sasukeY = anchors.headerTop;

    if (sub < 0.8) {
      narutoX = anchors.headerLeft;
      sasukeX = anchors.headerRight;
      narutoPose = 'idle';
      sasukePose = 'idle';
    } else if (sub < 1.6) {
      // Sasuke hand signs -> Fireball Jutsu!
      sasukeX = anchors.headerRight - 15;
      sasukePose = 'fireball_cast';
      hasFireball = true;

      // Naruto Matrix Dodge
      narutoX = anchors.headerLeft + 35;
      narutoPose = 'dodge';
    } else {
      // Naruto leaps over fireball, preparing clone
      narutoX = anchors.headerLeft + 70;
      narutoY = anchors.headerTop - 25;
      narutoPose = 'flying_kick';

      sasukeX = anchors.headerRight;
      sasukePose = 'sword_slash';
    }
  } else if (t < 5.8) {
    // Phase 2: Parkour Wall-Run down the Game Tabs (Left) & Card (Right)
    const sub = t - 2.5;
    const p = sub / 3.3;

    // Naruto leaps down to the Game Selection Tabs on left
    const tabTargetY = anchors.tabsTop + (anchors.tabsBottom - anchors.tabsTop) * p;
    narutoX = anchors.tabsRight - 15;
    narutoY = tabTargetY;
    narutoFacing = 'right';

    // Shadow Clone assists Naruto!
    cloneActive = sub > 0.8 && sub < 2.5;
    cloneX = anchors.tabsLeft + 60;
    cloneY = tabTargetY - 20;

    if (sub < 1.1) {
      narutoPose = 'wall_perch';
    } else if (sub < 2.2) {
      narutoPose = 'wall_spring';
    } else {
      narutoPose = 'dash';
    }

    // Sasuke teleports (Shunshin) and wall-runs down the Card Border
    sasukeX = anchors.cardLeft + 15;
    sasukeY = tabTargetY + 15;
    sasukeFacing = 'left';

    if (sub < 1.1) {
      sasukePose = 'sword_slash';
    } else if (sub < 2.2) {
      sasukePose = 'flying_kick';
    } else {
      sasukePose = 'chidori_sprint';
    }
  } else if (t < 9.2) {
    // Phase 3: THE LEGENDARY RASENGAN VS CHIDORI CLASH (War Time!)
    const sub = t - 5.8;

    if (sub < 1.4) {
      // Charging toward center chasm!
      const p = sub / 1.4;
      hasRasengan = true;
      hasChidori = true;

      // Naruto charging with Rasengan from left
      narutoX = anchors.tabsRight + (anchors.centerChasmX - 35 - anchors.tabsRight) * p;
      narutoY = anchors.tabsTop + 140 - Math.sin(p * Math.PI) * 35;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      // Sasuke charging with Chidori from right
      sasukeX = anchors.cardLeft - (anchors.cardLeft - (anchors.centerChasmX + 35)) * p;
      sasukeY = anchors.tabsTop + 140 - Math.sin(p * Math.PI) * 35;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else if (sub < 2.6) {
      // MID-AIR COLLISION! (Rasengan vs Chidori Sphere)
      hasRasengan = true;
      hasChidori = true;
      clashActive = true;
      clashX = anchors.centerChasmX;
      clashY = anchors.tabsTop + 130;

      // Locked in power struggle with vibration
      const jitter = Math.sin(sub * 30) * 4;
      narutoX = anchors.centerChasmX - 24 + jitter;
      narutoY = anchors.tabsTop + 130;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      sasukeX = anchors.centerChasmX + 24 - jitter;
      sasukeY = anchors.tabsTop + 130;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else {
      // RECOIL: Shockwave pushes both fighters back onto the platforms!
      const p = (sub - 2.6) / 0.8;
      narutoX = (anchors.centerChasmX - 24) - (anchors.centerChasmX - 24 - (anchors.tabsRight - 30)) * p;
      narutoY = anchors.tabsTop + 130 - Math.sin(p * Math.PI) * 25;
      narutoPose = 'recoil';
      narutoRotation = -20 * (1 - p);

      sasukeX = (anchors.centerChasmX + 24) + ((anchors.cardLeft + 30) - (anchors.centerChasmX + 24)) * p;
      sasukeY = anchors.tabsTop + 130 - Math.sin(p * Math.PI) * 25;
      sasukePose = 'recoil';
      sasukeRotation = 20 * (1 - p);
    }
  } else if (t < 11.8) {
    // Phase 4: Card Rooftop Taijutsu Duel
    const sub = t - 9.2;
    narutoY = anchors.cardTop - 8;
    sasukeY = anchors.cardTop - 8;

    if (sub < 1.2) {
      narutoX = anchors.cardLeft + 60;
      sasukeX = anchors.cardLeft + 150;
      narutoPose = 'dash';
      narutoFacing = 'right';
      sasukePose = 'sword_slash';
      sasukeFacing = 'left';
    } else {
      narutoX = anchors.cardLeft + 90;
      sasukeX = anchors.cardLeft + 170;
      narutoPose = 'flying_kick';
      narutoFacing = 'right';
      sasukePose = 'dodge';
      sasukeFacing = 'left';
    }
  } else {
    // Phase 5: Super Chakra Leap Back to "OUR GAMES" Summit
    const sub = t - 11.8;
    const p = sub / 1.7;
    const apex = Math.sin(p * Math.PI) * 95;

    // Naruto leaps from card back to "OUR"
    narutoX = (anchors.cardLeft + 90) + (anchors.headerLeft - (anchors.cardLeft + 90)) * p;
    narutoY = (anchors.cardTop - 8) + (anchors.headerTop - (anchors.cardTop - 8)) * p - apex;
    narutoPose = 'wall_spring';
    narutoFacing = 'left';

    // Sasuke leaps from card back to "GAMES"
    sasukeX = (anchors.cardLeft + 170) + (anchors.headerRight - (anchors.cardLeft + 170)) * p;
    sasukeY = (anchors.cardTop - 8) + (anchors.headerTop - (anchors.cardTop - 8)) * p - apex;
    sasukePose = 'flying_kick';
    sasukeFacing = 'left';
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-visible select-none">
      
      {/* 1. NARUTO SHINOBI */}
      <div 
        className="absolute z-40 transition-transform"
        style={{
          transform: `translate3d(${narutoX}px, ${narutoY}px, 0px)`,
          transition: 'none'
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
          
          {/* Swirling Rasengan in Hand */}
          {hasRasengan && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                right: narutoFacing === 'right' ? '-24px' : 'auto',
                left: narutoFacing === 'left' ? '-24px' : 'auto',
                top: '16px'
              }}
            >
              <RasenganOrb scale={1.25} />
            </div>
          )}

          <ShinobiSprite 
            type="naruto"
            pose={narutoPose}
            facing={narutoFacing}
            rotation={narutoRotation}
          />

        </div>
      </div>


      {/* 2. SHADOW CLONE (KAGE BUNSHIN) */}
      {cloneActive && (
        <div 
          className="absolute z-35 transition-transform"
          style={{
            transform: `translate3d(${cloneX}px, ${cloneY}px, 0px)`,
            transition: 'none'
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center opacity-85">
            <ShinobiSprite 
              type="naruto"
              pose="flying_kick"
              facing="right"
              rotation={10}
            />
          </div>
        </div>
      )}


      {/* 3. SASUKE SHINOBI */}
      <div 
        className="absolute z-40 transition-transform"
        style={{
          transform: `translate3d(${sasukeX}px, ${sasukeY}px, 0px)`,
          transition: 'none'
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
          
          {/* Crackling Chidori Lightning Blade in Hand */}
          {hasChidori && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: sasukeFacing === 'left' ? '-26px' : 'auto',
                right: sasukeFacing === 'right' ? '-26px' : 'auto',
                top: '20px'
              }}
            >
              <ChidoriBlade scale={1.3} />
            </div>
          )}

          {/* Fireball Jutsu Blast */}
          {hasFireball && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: sasukeFacing === 'left' ? '-58px' : 'auto',
                right: sasukeFacing === 'right' ? '-58px' : 'auto',
                top: '6px'
              }}
            >
              <FireballJutsu />
            </div>
          )}

          <ShinobiSprite 
            type="sasuke"
            pose={sasukePose}
            facing={sasukeFacing}
            rotation={sasukeRotation}
          />

        </div>
      </div>


      {/* 4. MID-AIR RASENGAN VS CHIDORI CLASH SHOCKWAVE */}
      {clashActive && (
        <div style={{ position: 'absolute', left: `${clashX}px`, top: `${clashY}px` }}>
          <ClashSphere active={clashActive} />
        </div>
      )}

    </div>
  );
}