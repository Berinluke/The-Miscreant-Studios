import React, { useState, useEffect, useRef } from 'react';

/**
 * ShinobiBattleStage (Naruto vs Sasuke Shinobi Jutsu War)
 * 
 * Positioned precisely on the top border/roof of the Game Presentation Card:
 * - Naruto Shinobi: Spiky blonde hair, leaf headband, whisker marks,
 *   swirling blue RASENGAN, Shadow Clone jutsu, and dynamic taijutsu.
 * - Sasuke Shinobi: Dark collar, rogue headband, glowing crimson SHARINGAN eye,
 *   crackling purple lightning CHIDORI, Fireball jutsu, and Kusa blade.
 * - Fighting Floor: The top border of the presentation card (marked in red by user)!
 * - Mid-air Clash: Epic Rasengan vs Chidori collision with shockwave sphere in the center.
 * - 100% clean: Zero text bubbles, zero dialogue, pure hand-drawn anime martial arts physics!
 */

// --- RASENGAN CHAKRA ORB COMPONENT ---
function RasenganOrb({ scale = 1 }) {
  return (
    <div 
      className="relative pointer-events-none"
      style={{ transform: `scale(${scale})` }}
    >
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="overflow-visible animate-spin" style={{ animationDuration: '0.5s' }}>
        <circle cx="19" cy="19" r="17" fill="rgba(56, 189, 248, 0.28)" />
        <circle cx="19" cy="19" r="12" fill="rgba(37, 99, 235, 0.45)" />
        <circle cx="19" cy="19" r="7.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M 19 6 C 26 6, 31 11, 31 19 C 31 25, 25 29, 19 29" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 19 32 C 12 32, 7 27, 7 19 C 7 13, 13 9, 19 9" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="27" cy="11" r="1.3" fill="#FFFFFF" />
        <circle cx="11" cy="27" r="1.3" fill="#38BDF8" />
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
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="overflow-visible animate-pulse">
        <circle cx="21" cy="21" r="15" fill="rgba(129, 140, 248, 0.32)" />
        <circle cx="21" cy="21" r="9" fill="rgba(99, 102, 241, 0.65)" />
        <circle cx="21" cy="21" r="4.5" fill="#FFFFFF" />
        <path d="M 21 21 L 31 10 L 28 6 L 39 2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 21 21 L 34 23 L 31 30 L 41 36" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 21 21 L 11 31 L 16 36 L 7 41" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 21 21 L 9 13 L 14 8 L 3 4" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// --- FIREBALL JUTSU (GOUKAKYUU) COMPONENT ---
function FireballJutsu() {
  return (
    <div className="relative pointer-events-none animate-pulse">
      <svg width="54" height="38" viewBox="0 0 54 38" fill="none" className="overflow-visible">
        <ellipse cx="27" cy="19" rx="25" ry="16" fill="rgba(239, 68, 68, 0.35)" />
        <ellipse cx="25" cy="19" rx="18" ry="11" fill="#F59E0B" />
        <ellipse cx="23" cy="19" rx="11" ry="6.5" fill="#FEF08A" />
        <path d="M 4 19 Q 18 9, 35 13 Q 48 19, 35 25 Q 18 29, 4 19 Z" fill="#EF4444" opacity="0.8" />
        <circle cx="11" cy="19" r="1.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

// --- DYNAMIC SHINOBI STICKMAN SPRITE ---
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
        width="46" 
        height="50" 
        viewBox="0 0 46 50" 
        fill="none" 
        stroke={inkColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="overflow-visible drop-shadow-[0_4px_10px_rgba(15,23,42,0.22)]"
      >
        {/* Animated Bandana / Ribbons */}
        {isNaruto ? (
          <g stroke="#3B82F6" strokeWidth="2.4">
            <path d="M 12 11 Q 5 6, -2 10 Q -8 15, -14 12" className="animate-pulse" />
            <path d="M 12 13 Q 5 11, 0 17 Q -5 22, -10 20" />
          </g>
        ) : (
          <g stroke="#4338CA" strokeWidth="2.4">
            <path d="M 12 11 Q 6 8, 1 12 Q -4 16, -10 13" />
          </g>
        )}

        {/* Head */}
        {isNaruto ? (
          <>
            <path d="M 14 10 L 12 4 L 17 7 L 21 2 L 24 7 L 29 3 L 29 9" fill="#F59E0B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            <rect x="14" y="9" width="14" height="4.5" rx="1.2" fill="#3B82F6" stroke={inkColor} strokeWidth="1.6" />
            <rect x="18" y="10" width="6" height="2.5" rx="0.8" fill="#E2E8F0" stroke={inkColor} strokeWidth="0.9" />
            <circle cx="21" cy="14" r="6" fill="#FAF8F2" />
            <line x1="16" y1="13" x2="18" y2="13" stroke="#F97316" strokeWidth="1.1" />
            <line x1="16" y1="15" x2="18" y2="15" stroke="#F97316" strokeWidth="1.1" />
            <line x1="24" y1="13" x2="26" y2="13" stroke="#F97316" strokeWidth="1.1" />
            <line x1="24" y1="15" x2="26" y2="15" stroke="#F97316" strokeWidth="1.1" />
            <circle cx="23" cy="13" r="1" fill="#0284C7" />
          </>
        ) : (
          <>
            <path d="M 13 12 L 9 7 L 15 9 L 18 3 L 22 8 L 27 4 L 30 10" fill="#1E1B4B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            <path d="M 16 18 L 13 13 L 18 16" fill="#1E1B4B" stroke={inkColor} strokeWidth="1.8" />
            <path d="M 26 18 L 29 13 L 24 16" fill="#1E1B4B" stroke={inkColor} strokeWidth="1.8" />
            <circle cx="21" cy="14" r="6" fill="#FAF8F2" />
            <circle cx="23" cy="13" r="1.5" fill="#DC2626" />
            <circle cx="23" cy="13" r="0.6" fill="#000000" />
            <path d="M 15 11 L 17 16" stroke="#1E1B4B" strokeWidth="2" />
          </>
        )}

        {/* Torso Spine */}
        <line x1="21" y1="20" x2="21" y2="33" strokeWidth="2.8" stroke={isNaruto ? '#EA580C' : '#312E81'} />

        {/* --- POSES --- */}
        {pose === 'rasengan_thrust' && (
          <>
            <line x1="21" y1="23" x2="38" y2="23" strokeWidth="3" stroke="#EA580C" />
            <path d="M 21 23 L 12 19 L 8 23" />
            <path d="M 21 33 L 13 42 L 6 49" strokeWidth="3" />
            <path d="M 21 33 L 30 41 L 39 48" strokeWidth="3.2" stroke="#EA580C" />
          </>
        )}

        {pose === 'chidori_sprint' && (
          <>
            <line x1="21" y1="23" x2="39" y2="29" strokeWidth="3" stroke="#4338CA" />
            <path d="M 21 23 L 11 17 L 7 11" />
            <path d="M 21 33 L 11 41 L 4 46" strokeWidth="3" />
            <path d="M 21 33 L 32 40 L 41 44" strokeWidth="3.2" stroke="#4338CA" />
          </>
        )}

        {pose === 'flying_kick' && (
          <>
            <path d="M 21 22 L 11 16 L 5 19" />
            <path d="M 21 22 L 29 17 L 35 13" strokeWidth="2.6" />
            <line x1="21" y1="33" x2="43" y2="31" strokeWidth="3.4" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <circle cx="43" cy="31" r="2.5" fill={isNaruto ? '#F97316' : '#6366F1'} />
            <path d="M 21 33 L 11 38 L 17 46" />
          </>
        )}

        {pose === 'fireball_cast' && (
          <>
            <path d="M 21 23 L 25 18 L 25 15" strokeWidth="2.8" stroke="#4338CA" />
            <path d="M 21 23 L 19 18 L 23 15" strokeWidth="2.8" stroke="#4338CA" />
            <path d="M 21 33 L 11 40 L 5 48" strokeWidth="3" />
            <path d="M 21 33 L 31 40 L 37 48" strokeWidth="3" />
          </>
        )}

        {pose === 'sword_slash' && (
          <>
            <path d="M 21 22 L 31 15 L 39 9" strokeWidth="2.8" />
            <line x1="31" y1="15" x2="45" y2="2" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 21 22 L 13 26 L 8 23" />
            <path d="M 21 33 L 12 41 L 5 49" />
            <path d="M 21 33 L 29 40 L 38 47" strokeWidth="3" />
          </>
        )}

        {pose === 'dodge' && (
          <>
            <path d="M 21 23 L 11 17 L 6 11" />
            <path d="M 21 23 L 30 19 L 36 23" strokeWidth="2.6" />
            <path d="M 21 33 L 10 38 L 4 46" />
            <path d="M 21 33 L 32 39 L 39 46" />
          </>
        )}

        {pose === 'sweep' && (
          <>
            <path d="M 21 23 L 12 19 L 8 24" />
            <path d="M 21 23 L 27 21 L 31 27" />
            <line x1="21" y1="33" x2="42" y2="46" strokeWidth="3.2" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <path d="M 21 33 L 12 39 L 7 47" />
          </>
        )}

        {pose === 'recoil' && (
          <>
            <path d="M 21 23 L 12 16 L 6 19" />
            <path d="M 21 23 L 14 28 L 8 32" />
            <path d="M 21 33 L 13 38 L 9 46" />
            <path d="M 21 33 L 22 40 L 20 48" />
          </>
        )}

        {pose === 'idle' && (
          <>
            <path d="M 21 22 L 13 25 L 11 20" />
            <path d="M 21 22 L 29 20 L 33 16" />
            <path d="M 21 33 L 13 41 L 8 49" strokeWidth="2.8" />
            <path d="M 21 33 L 29 40 L 34 48" strokeWidth="2.8" />
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
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="overflow-visible animate-pulse">
        <circle cx="50" cy="50" r="46" stroke="#38BDF8" strokeWidth="2.2" opacity="0.75" className="animate-ping" />
        <circle cx="50" cy="50" r="36" stroke="#818CF8" strokeWidth="2.6" opacity="0.85" />
        <ellipse cx="44" cy="50" rx="18" ry="18" fill="rgba(56, 189, 248, 0.7)" />
        <ellipse cx="56" cy="50" rx="18" ry="18" fill="rgba(129, 140, 248, 0.7)" />
        <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
        <path d="M 50 50 L 76 28 L 90 38" stroke="#FFFFFF" strokeWidth="2.2" />
        <path d="M 50 50 L 24 72 L 12 62" stroke="#38BDF8" strokeWidth="2.2" />
        <path d="M 50 50 L 72 76 L 84 88" stroke="#818CF8" strokeWidth="2.2" />
        <path d="M 50 50 L 28 24 L 16 12" stroke="#FFFFFF" strokeWidth="2.2" />
      </svg>
    </div>
  );
}

// --- MAIN ARENA COMPONENT (RESTRICTED TO CARD ROOF ALONG MARKED RED LINE) ---
export default function ShinobiBattleStage() {
  const arenaRef = useRef(null);
  const [arenaWidth, setArenaWidth] = useState(500);
  const [battleTime, setBattleTime] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (arenaRef.current) {
        setArenaWidth(arenaRef.current.clientWidth || 500);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let animId;
    const startTime = Date.now();

    // 60 FPS Jutsu War Loop
    const loop = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      setBattleTime(elapsed % 13.0); // 13.0s continuous war
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const t = battleTime;
  const width = Math.max(340, arenaWidth);
  // Feet rest directly on the top border of the card (the red line marked by the user)
  const floorY = 74; 
  const leftBound = 40;
  const rightBound = width - 40;
  const centerX = width / 2;

  // --- TRAJECTORY COMPUTATION ---
  let narutoX = leftBound;
  let narutoY = floorY;
  let narutoPose = 'idle';
  let narutoFacing = 'right';
  let narutoRotation = 0;
  let hasRasengan = false;

  let sasukeX = rightBound;
  let sasukeY = floorY;
  let sasukePose = 'idle';
  let sasukeFacing = 'left';
  let sasukeRotation = 0;
  let hasChidori = false;
  let hasFireball = false;

  let cloneActive = false;
  let cloneX = 0;
  let cloneY = 0;

  let clashActive = false;

  // --- 13.0s CARD ROOFTOP CHOREOGRAPHY ---
  if (t < 2.5) {
    // Phase 1: Sprint & Opening Fireball on the card roof
    const sub = t;
    if (sub < 0.8) {
      narutoX = leftBound + 15;
      sasukeX = rightBound - 15;
      narutoPose = 'idle';
      sasukePose = 'idle';
    } else if (sub < 1.6) {
      sasukeX = rightBound - 20;
      sasukeY = floorY - 8;
      sasukePose = 'fireball_cast';
      hasFireball = true;

      narutoX = leftBound + (centerX - leftBound) * 0.55;
      narutoY = floorY;
      narutoPose = 'dodge';
    } else {
      narutoX = centerX - 35;
      narutoY = floorY - 20;
      narutoPose = 'flying_kick';

      sasukeX = rightBound - 25;
      sasukeY = floorY;
      sasukePose = 'sword_slash';
    }
  } else if (t < 5.5) {
    // Phase 2: Shadow Clone Double Strike
    const sub = t - 2.5;

    cloneActive = sub > 0.4 && sub < 2.4;
    cloneX = rightBound - 25;
    cloneY = floorY - 45;

    narutoX = centerX + (rightBound - 85 - centerX) * (sub / 3.0);
    narutoY = floorY;
    narutoPose = 'sweep';
    narutoFacing = 'right';

    sasukeX = rightBound - 35;
    sasukeY = floorY;
    sasukePose = sub < 1.5 ? 'dodge' : 'sword_slash';
    sasukeFacing = 'left';
  } else if (t < 9.0) {
    // Phase 3: THE LEGENDARY RASENGAN VS CHIDORI CLASH (WAR TIME!)
    const sub = t - 5.5;

    if (sub < 1.3) {
      const p = sub / 1.3;
      hasRasengan = true;
      hasChidori = true;

      narutoX = leftBound + (centerX - 28 - leftBound) * p;
      narutoY = floorY - Math.sin(p * Math.PI) * 25;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      sasukeX = rightBound - (rightBound - (centerX + 28)) * p;
      sasukeY = floorY - Math.sin(p * Math.PI) * 25;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else if (sub < 2.5) {
      hasRasengan = true;
      hasChidori = true;
      clashActive = true;

      const jitter = Math.sin(sub * 28) * 3;
      narutoX = centerX - 24 + jitter;
      narutoY = floorY - 30;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      sasukeX = centerX + 24 - jitter;
      sasukeY = floorY - 30;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else {
      const p = (sub - 2.5) / 1.0;
      narutoX = (centerX - 24) - (centerX - 24 - (leftBound + 20)) * p;
      narutoY = floorY - 30 + 30 * p;
      narutoPose = 'recoil';
      narutoRotation = -20 * (1 - p);

      sasukeX = (centerX + 24) + ((rightBound - 20) - (centerX + 24)) * p;
      sasukeY = floorY - 30 + 30 * p;
      sasukePose = 'recoil';
      sasukeRotation = 20 * (1 - p);
    }
  } else if (t < 11.5) {
    // Phase 4: High-Speed Close Quarters Taijutsu Duel
    const sub = t - 9.0;
    narutoY = floorY;
    sasukeY = floorY;

    if (sub < 1.2) {
      narutoX = centerX - 30;
      sasukeX = centerX + 30;
      narutoPose = 'dash';
      narutoFacing = 'right';
      sasukePose = 'sword_slash';
      sasukeFacing = 'left';
    } else {
      narutoX = centerX - 24;
      sasukeX = centerX + 36;
      narutoPose = 'flying_kick';
      narutoFacing = 'right';
      sasukePose = 'dodge';
      sasukeFacing = 'left';
    }
  } else {
    // Phase 5: Acrobatic Somersault Reset to Edge
    const sub = t - 11.5;
    const p = sub / 1.5;
    const apex = Math.sin(p * Math.PI) * 40;

    narutoX = (centerX - 24) + (leftBound - (centerX - 24)) * p;
    narutoY = floorY - apex;
    narutoPose = 'flying_kick';
    narutoFacing = 'left';

    sasukeX = (centerX + 36) + (rightBound - (centerX + 36)) * p;
    sasukeY = floorY - apex;
    sasukePose = 'flying_kick';
    sasukeFacing = 'right';
  }

  return (
    <div 
      ref={arenaRef}
      className="relative w-full h-[76px] pointer-events-none select-none overflow-visible"
    >
      
      {/* 1. NARUTO SHINOBI */}
      <div 
        className="absolute z-30 transition-transform"
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
                right: narutoFacing === 'right' ? '-20px' : 'auto',
                left: narutoFacing === 'left' ? '-20px' : 'auto',
                top: '15px'
              }}
            >
              <RasenganOrb scale={1.15} />
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
          className="absolute z-25 transition-transform"
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
              rotation={15}
            />
          </div>
        </div>
      )}


      {/* 3. SASUKE SHINOBI */}
      <div 
        className="absolute z-30 transition-transform"
        style={{
          transform: `translate3d(${sasukeX}px, ${sasukeY}px, 0px)`,
          transition: 'none'
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center">
          
          {/* Crackling Chidori Lightning Blade */}
          {hasChidori && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: sasukeFacing === 'left' ? '-22px' : 'auto',
                right: sasukeFacing === 'right' ? '-22px' : 'auto',
                top: '18px'
              }}
            >
              <ChidoriBlade scale={1.2} />
            </div>
          )}

          {/* Fireball Jutsu Blast */}
          {hasFireball && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: sasukeFacing === 'left' ? '-50px' : 'auto',
                right: sasukeFacing === 'right' ? '-50px' : 'auto',
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
        <div style={{ position: 'absolute', left: `${centerX}px`, top: `${floorY - 30}px` }}>
          <ClashSphere active={clashActive} />
        </div>
      )}

    </div>
  );
}