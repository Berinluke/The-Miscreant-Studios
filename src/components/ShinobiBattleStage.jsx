import React, { useState, useEffect, useRef } from 'react';

/**
 * ShinobiBattleStage (Naruto vs Sasuke Stickman Shinobi Jutsu War)
 * 
 * Contained entirely within the user's marked battleground in Slide 2 ("OUR GAMES"):
 * - Naruto Shinobi: Spiky blonde hair, leaf headband with fluttering ribbons, whisker marks,
 *   swirling blue RASENGAN, Shadow Clone jutsu, and dynamic taijutsu.
 * - Sasuke Shinobi: Dark collar, rogue headband, glowing crimson SHARINGAN eye,
 *   crackling purple lightning CHIDORI, Fireball jutsu, and Kusa blade.
 * - Fighting Floor: The horizontal notebook border line acts as their sparring floor!
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
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="overflow-visible animate-spin" style={{ animationDuration: '0.55s' }}>
        <circle cx="20" cy="20" r="18" fill="rgba(56, 189, 248, 0.28)" />
        <circle cx="20" cy="20" r="13" fill="rgba(37, 99, 235, 0.45)" />
        <circle cx="20" cy="20" r="8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M 20 6 C 27 6, 32 12, 32 20 C 32 26, 26 30, 20 30" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 20 34 C 13 34, 8 28, 8 20 C 8 14, 14 10, 20 10" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="28" cy="11" r="1.4" fill="#FFFFFF" />
        <circle cx="12" cy="29" r="1.4" fill="#38BDF8" />
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
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="overflow-visible animate-pulse">
        <circle cx="22" cy="22" r="16" fill="rgba(129, 140, 248, 0.32)" />
        <circle cx="22" cy="22" r="9" fill="rgba(99, 102, 241, 0.65)" />
        <circle cx="22" cy="22" r="5" fill="#FFFFFF" />
        {/* Lightning Bolts */}
        <path d="M 22 22 L 32 10 L 29 6 L 41 2" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 22 22 L 36 24 L 33 31 L 43 37" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 22 22 L 12 32 L 17 37 L 8 43" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 22 22 L 10 14 L 15 9 L 3 5" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// --- FIREBALL JUTSU (GOUKAKYUU) COMPONENT ---
function FireballJutsu() {
  return (
    <div className="relative pointer-events-none animate-pulse">
      <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="overflow-visible">
        <ellipse cx="28" cy="20" rx="26" ry="17" fill="rgba(239, 68, 68, 0.35)" />
        <ellipse cx="26" cy="20" rx="19" ry="12" fill="#F59E0B" />
        <ellipse cx="24" cy="20" rx="12" ry="7" fill="#FEF08A" />
        <path d="M 4 20 Q 18 10, 36 14 Q 50 20, 36 26 Q 18 30, 4 20 Z" fill="#EF4444" opacity="0.8" />
        <circle cx="12" cy="20" r="2" fill="#FFFFFF" />
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
        width="48" 
        height="52" 
        viewBox="0 0 48 52" 
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
            {/* Naruto Spiky Blonde Hair */}
            <path d="M 14 10 L 12 4 L 17 7 L 21 2 L 24 7 L 29 3 L 29 9" fill="#F59E0B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            {/* Konoha Headband Plate */}
            <rect x="14" y="9" width="14" height="4.5" rx="1.2" fill="#3B82F6" stroke={inkColor} strokeWidth="1.6" />
            <rect x="18" y="10" width="6" height="2.5" rx="0.8" fill="#E2E8F0" stroke={inkColor} strokeWidth="0.9" />
            <circle cx="21" cy="14" r="6.2" fill="#FAF8F2" />
            {/* Whiskers */}
            <line x1="16" y1="13" x2="18" y2="13" stroke="#F97316" strokeWidth="1.1" />
            <line x1="16" y1="15" x2="18" y2="15" stroke="#F97316" strokeWidth="1.1" />
            <line x1="24" y1="13" x2="26" y2="13" stroke="#F97316" strokeWidth="1.1" />
            <line x1="24" y1="15" x2="26" y2="15" stroke="#F97316" strokeWidth="1.1" />
            <circle cx="23" cy="13" r="1" fill="#0284C7" />
          </>
        ) : (
          <>
            {/* Sasuke Spiky Dark Ninja Hair with Bangs */}
            <path d="M 13 12 L 9 7 L 15 9 L 18 3 L 22 8 L 27 4 L 30 10" fill="#1E1B4B" stroke={inkColor} strokeWidth="2" strokeLinejoin="round" />
            {/* High Collar */}
            <path d="M 16 18 L 13 13 L 18 16" fill="#1E1B4B" stroke={inkColor} strokeWidth="1.8" />
            <path d="M 26 18 L 29 13 L 24 16" fill="#1E1B4B" stroke={inkColor} strokeWidth="1.8" />
            <circle cx="21" cy="14" r="6.2" fill="#FAF8F2" />
            {/* Red Sharingan Eye! */}
            <circle cx="23" cy="13" r="1.5" fill="#DC2626" />
            <circle cx="23" cy="13" r="0.6" fill="#000000" />
            <path d="M 15 11 L 17 16" stroke="#1E1B4B" strokeWidth="2" />
          </>
        )}

        {/* Torso Spine */}
        <line x1="21" y1="20" x2="21" y2="34" strokeWidth="2.8" stroke={isNaruto ? '#EA580C' : '#312E81'} />

        {/* --- POSES --- */}

        {/* 1. RASENGAN THRUST (Naruto charging with sphere) */}
        {pose === 'rasengan_thrust' && (
          <>
            <line x1="21" y1="23" x2="38" y2="23" strokeWidth="3" stroke="#EA580C" />
            <path d="M 21 23 L 12 19 L 8 23" />
            <path d="M 21 34 L 13 43 L 6 51" strokeWidth="3" />
            <path d="M 21 34 L 30 42 L 39 49" strokeWidth="3.2" stroke="#EA580C" />
          </>
        )}

        {/* 2. CHIDORI SPRINT (Sasuke charging with lightning) */}
        {pose === 'chidori_sprint' && (
          <>
            <line x1="21" y1="23" x2="40" y2="30" strokeWidth="3" stroke="#4338CA" />
            <path d="M 21 23 L 11 17 L 7 11" />
            <path d="M 21 34 L 11 42 L 4 47" strokeWidth="3" />
            <path d="M 21 34 L 32 41 L 42 45" strokeWidth="3.2" stroke="#4338CA" />
          </>
        )}

        {/* 3. FLYING KICK */}
        {pose === 'flying_kick' && (
          <>
            <path d="M 21 22 L 11 16 L 5 19" />
            <path d="M 21 22 L 29 17 L 35 13" strokeWidth="2.6" />
            <line x1="21" y1="34" x2="44" y2="32" strokeWidth="3.4" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <circle cx="44" cy="32" r="2.6" fill={isNaruto ? '#F97316' : '#6366F1'} />
            <path d="M 21 34 L 11 39 L 17 47" />
          </>
        )}

        {/* 4. FIREBALL HAND SIGN */}
        {pose === 'fireball_cast' && (
          <>
            <path d="M 21 23 L 25 18 L 25 15" strokeWidth="2.8" stroke="#4338CA" />
            <path d="M 21 23 L 19 18 L 23 15" strokeWidth="2.8" stroke="#4338CA" />
            <path d="M 21 34 L 11 41 L 5 49" strokeWidth="3" />
            <path d="M 21 34 L 31 41 L 37 49" strokeWidth="3" />
          </>
        )}

        {/* 5. KATANA SWORD SLASH */}
        {pose === 'sword_slash' && (
          <>
            <path d="M 21 22 L 31 15 L 39 9" strokeWidth="2.8" />
            <line x1="31" y1="15" x2="46" y2="2" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 21 22 L 13 26 L 8 23" />
            <path d="M 21 34 L 12 42 L 5 50" />
            <path d="M 21 34 L 29 41 L 38 48" strokeWidth="3" />
          </>
        )}

        {/* 6. MATRIX DODGE */}
        {pose === 'dodge' && (
          <>
            <path d="M 21 23 L 11 17 L 6 11" />
            <path d="M 21 23 L 30 19 L 36 23" strokeWidth="2.6" />
            <path d="M 21 34 L 10 39 L 4 47" />
            <path d="M 21 34 L 32 40 L 39 47" />
          </>
        )}

        {/* 7. LOW SWEEP */}
        {pose === 'sweep' && (
          <>
            <path d="M 21 23 L 12 19 L 8 24" />
            <path d="M 21 23 L 27 21 L 31 27" />
            <line x1="21" y1="34" x2="42" y2="47" strokeWidth="3.2" stroke={isNaruto ? '#EA580C' : '#4338CA'} />
            <path d="M 21 34 L 12 40 L 7 48" />
          </>
        )}

        {/* 8. RECOIL */}
        {pose === 'recoil' && (
          <>
            <path d="M 21 23 L 12 16 L 6 19" />
            <path d="M 21 23 L 14 28 L 8 32" />
            <path d="M 21 34 L 13 39 L 9 47" />
            <path d="M 21 34 L 22 41 L 20 49" />
          </>
        )}

        {/* 9. DEFAULT COMBAT IDLE */}
        {pose === 'idle' && (
          <>
            <path d="M 21 22 L 13 25 L 11 20" />
            <path d="M 21 22 L 29 20 L 33 16" />
            <path d="M 21 34 L 13 42 L 8 50" strokeWidth="2.8" />
            <path d="M 21 34 L 29 41 L 34 49" strokeWidth="2.8" />
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
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="overflow-visible animate-pulse">
        <circle cx="55" cy="55" r="50" stroke="#38BDF8" strokeWidth="2.4" opacity="0.75" className="animate-ping" />
        <circle cx="55" cy="55" r="40" stroke="#818CF8" strokeWidth="2.8" opacity="0.85" />
        <ellipse cx="48" cy="55" rx="20" ry="20" fill="rgba(56, 189, 248, 0.7)" />
        <ellipse cx="62" cy="55" rx="20" ry="20" fill="rgba(129, 140, 248, 0.7)" />
        <circle cx="55" cy="55" r="12" fill="#FFFFFF" />
        <path d="M 55 55 L 82 32 L 96 42" stroke="#FFFFFF" strokeWidth="2.4" />
        <path d="M 55 55 L 28 78 L 14 68" stroke="#38BDF8" strokeWidth="2.4" />
        <path d="M 55 55 L 78 82 L 90 94" stroke="#818CF8" strokeWidth="2.4" />
        <path d="M 55 55 L 32 28 L 20 16" stroke="#FFFFFF" strokeWidth="2.4" />
      </svg>
    </div>
  );
}

// --- MAIN ARENA COMPONENT (RESTRICTED TO THE EXACT MARKED RED BOX) ---
export default function ShinobiBattleStage() {
  const arenaRef = useRef(null);
  const [arenaWidth, setArenaWidth] = useState(480);
  const [arenaHeight, setArenaHeight] = useState(140);
  const [battleTime, setBattleTime] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (arenaRef.current) {
        setArenaWidth(arenaRef.current.clientWidth || 480);
        setArenaHeight(arenaRef.current.clientHeight || 140);
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
      setBattleTime(elapsed % 13.0); // 13.0 second loop
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
  const floorY = arenaHeight - 4; // Sparring right on top of the notebook line
  const leftBound = 35;
  const rightBound = width - 35;
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

  // --- 13.0s ARENA CHOREOGRAPHY ---
  if (t < 2.5) {
    // Phase 1: Sprint & Opening Fireball Jutsu
    const sub = t;
    if (sub < 0.8) {
      narutoX = leftBound + 15;
      sasukeX = rightBound - 15;
      narutoPose = 'idle';
      sasukePose = 'idle';
    } else if (sub < 1.6) {
      // Sasuke leaps back, hand signs -> Fireball Jutsu!
      sasukeX = rightBound - 20;
      sasukeY = floorY - 10;
      sasukePose = 'fireball_cast';
      hasFireball = true;

      // Naruto slides low under the fireball
      narutoX = leftBound + (centerX - leftBound) * 0.55;
      narutoY = floorY;
      narutoPose = 'dodge';
    } else {
      // Naruto leaps out of slide
      narutoX = centerX - 40;
      narutoY = floorY - 25;
      narutoPose = 'flying_kick';

      sasukeX = rightBound - 25;
      sasukeY = floorY;
      sasukePose = 'sword_slash';
    }
  } else if (t < 5.5) {
    // Phase 2: Shadow Clone Double Strike
    const sub = t - 2.5;

    // Naruto summons a Shadow Clone
    cloneActive = sub > 0.4 && sub < 2.4;
    cloneX = rightBound - 25;
    cloneY = floorY - 55;

    // Real Naruto sweeps low
    narutoX = centerX + (rightBound - 85 - centerX) * (sub / 3.0);
    narutoY = floorY;
    narutoPose = 'sweep';
    narutoFacing = 'right';

    // Sasuke parries sweep and slashes through clone
    sasukeX = rightBound - 35;
    sasukeY = floorY;
    sasukePose = sub < 1.5 ? 'dodge' : 'sword_slash';
    sasukeFacing = 'left';
  } else if (t < 9.0) {
    // Phase 3: THE LEGENDARY RASENGAN VS CHIDORI CLASH (WAR TIME!)
    const sub = t - 5.5;

    if (sub < 1.3) {
      // Charging toward center!
      const p = sub / 1.3;
      hasRasengan = true;
      hasChidori = true;

      // Naruto sprinting from left with Rasengan
      narutoX = leftBound + (centerX - 28 - leftBound) * p;
      narutoY = floorY - Math.sin(p * Math.PI) * 25;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      // Sasuke sprinting from right with Chidori
      sasukeX = rightBound - (rightBound - (centerX + 28)) * p;
      sasukeY = floorY - Math.sin(p * Math.PI) * 25;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else if (sub < 2.5) {
      // MID-AIR COLLISION AT CENTER!
      hasRasengan = true;
      hasChidori = true;
      clashActive = true;

      const jitter = Math.sin(sub * 28) * 3;
      narutoX = centerX - 24 + jitter;
      narutoY = floorY - 35;
      narutoPose = 'rasengan_thrust';
      narutoFacing = 'right';

      sasukeX = centerX + 24 - jitter;
      sasukeY = floorY - 35;
      sasukePose = 'chidori_sprint';
      sasukeFacing = 'left';
    } else {
      // Recoil: Blast launches both fighters back to edges!
      const p = (sub - 2.5) / 1.0;
      narutoX = (centerX - 24) - (centerX - 24 - (leftBound + 20)) * p;
      narutoY = floorY - 35 + 35 * p;
      narutoPose = 'recoil';
      narutoRotation = -20 * (1 - p);

      sasukeX = (centerX + 24) + ((rightBound - 20) - (centerX + 24)) * p;
      sasukeY = floorY - 35 + 35 * p;
      sasukePose = 'recoil';
      sasukeRotation = 20 * (1 - p);
    }
  } else if (t < 11.5) {
    // Phase 4: High-Speed Close Quarters Taijutsu Duel
    const sub = t - 9.0;
    narutoY = floorY;
    sasukeY = floorY;

    if (sub < 1.2) {
      narutoX = centerX - 32;
      sasukeX = centerX + 32;
      narutoPose = 'dash';
      narutoFacing = 'right';
      sasukePose = 'sword_slash';
      sasukeFacing = 'left';
    } else {
      narutoX = centerX - 26;
      sasukeX = centerX + 38;
      narutoPose = 'flying_kick';
      narutoFacing = 'right';
      sasukePose = 'dodge';
      sasukeFacing = 'left';
    }
  } else {
    // Phase 5: Acrobatic Somersault Reset to Edge
    const sub = t - 11.5;
    const p = sub / 1.5;
    const apex = Math.sin(p * Math.PI) * 45;

    narutoX = (centerX - 26) + (leftBound - (centerX - 26)) * p;
    narutoY = floorY - apex;
    narutoPose = 'flying_kick';
    narutoFacing = 'left';

    sasukeX = (centerX + 38) + (rightBound - (centerX + 38)) * p;
    sasukeY = floorY - apex;
    sasukePose = 'flying_kick';
    sasukeFacing = 'right';
  }

  return (
    <div 
      ref={arenaRef}
      className="relative w-full h-full pointer-events-none select-none overflow-visible"
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
                right: narutoFacing === 'right' ? '-22px' : 'auto',
                left: narutoFacing === 'left' ? '-22px' : 'auto',
                top: '15px'
              }}
            >
              <RasenganOrb scale={1.2} />
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
                left: sasukeFacing === 'left' ? '-24px' : 'auto',
                right: sasukeFacing === 'right' ? '-24px' : 'auto',
                top: '18px'
              }}
            >
              <ChidoriBlade scale={1.25} />
            </div>
          )}

          {/* Fireball Jutsu Blast */}
          {hasFireball && (
            <div 
              className="absolute pointer-events-none z-50"
              style={{
                left: sasukeFacing === 'left' ? '-54px' : 'auto',
                right: sasukeFacing === 'right' ? '-54px' : 'auto',
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
        <div style={{ position: 'absolute', left: `${centerX}px`, top: `${floorY - 35}px` }}>
          <ClashSphere active={clashActive} />
        </div>
      )}

    </div>
  );
}