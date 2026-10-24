import React, { useState, useEffect } from 'react';

/**
 * StickmanFighterSprite
 * 
 * High-character authentic ballpoint pen stickman combat sprite:
 * - Red Bot: Crimson Ninja with flowing headband ribbons & red ink Katana.
 * - Blue Bot: Cobalt Shinobi with flowing headband ribbons & blue ink Bo-Staff.
 * - Dynamic Kung-Fu Poses:
 *   - idle: wide balanced horse stance with martial arts guard.
 *   - dash: aggressive forward sprint stride.
 *   - flying_kick: horizontal airborne dropkick with pointed foot.
 *   - wall_perch: feet planted on vertical wall/bezel, deep spring crouch.
 *   - wall_spring: explosive leap springing away from the wall.
 *   - slash: dynamic weapon strike with curved ink contrail.
 *   - sweep: low crouch sweeping kick.
 *   - matrix_dodge: arched backward dodging strike.
 *   - recoil_hit: pushed back from collision.
 * - Zero dialogue, zero text, pure martial arts cinema!
 */
function StickmanFighterSprite({ team, pose, facing = 'right', rotation = 0 }) {
  const isRed = team === 'red';
  const primaryColor = isRed ? '#FF2A5F' : '#2563EB';
  const weaponColor = isRed ? '#DC2626' : '#1D4ED8';
  const inkColor = '#0F172A';

  // Base flip for horizontal direction
  const scaleX = facing === 'left' ? -1 : 1;

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
        height="54" 
        viewBox="0 0 48 54" 
        fill="none" 
        stroke={inkColor} 
        strokeWidth="2.6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="overflow-visible drop-shadow-[0_4px_10px_rgba(15,23,42,0.22)]"
      >
        {/* Animated Headband Ribbons Fluttering in the Wind */}
        <g stroke={primaryColor} strokeWidth="2.5">
          <path d="M 12 11 Q 5 6, -2 10 Q -8 15, -14 12" className="animate-pulse" />
          <path d="M 12 13 Q 5 11, 0 17 Q -5 22, -10 20" />
        </g>

        {/* Head */}
        <circle cx="21" cy="12" r="7" fill="#FAF8F2" />
        
        {/* Headband / Cap */}
        <path d="M 14 11 L 28 11" stroke={primaryColor} strokeWidth="3.2" />
        
        {/* Fierce Anime Combat Eyes */}
        <path d="M 18 11 L 21 13" stroke={inkColor} strokeWidth="1.6" />
        <path d="M 24 11 L 21 13" stroke={inkColor} strokeWidth="1.6" />
        <circle cx="22" cy="13" r="0.9" fill={primaryColor} />

        {/* Torso Spine */}
        <line x1="21" y1="19" x2="21" y2="34" />

        {/* --- DYNAMIC POSES & WEAPONS --- */}
        
        {/* 1. WALL PERCH (Feet planted firmly against vertical wall / PC bezel) */}
        {pose === 'wall_perch' && (
          <>
            {/* Clinging Hands touching the wall */}
            <path d="M 21 23 L 12 20 L 4 22" strokeWidth="2.8" />
            <path d="M 21 23 L 28 18 L 34 14" stroke={weaponColor} strokeWidth="2.6" />
            {/* Knees deeply bent in high-tension wall spring */}
            <path d="M 21 34 L 11 38 L 2 34" strokeWidth="3" />
            <path d="M 21 34 L 14 44 L 2 48" strokeWidth="3" stroke={primaryColor} />
            {/* Wall contact dots */}
            <circle cx="2" cy="34" r="2" fill={primaryColor} />
            <circle cx="2" cy="48" r="2" fill={primaryColor} />
          </>
        )}

        {/* 2. WALL SPRING (Exploding off the wall towards opponent) */}
        {pose === 'wall_spring' && (
          <>
            {/* Arms lunging forward */}
            <line x1="21" y1="23" x2="42" y2="21" strokeWidth="3" stroke={weaponColor} />
            <circle cx="42" cy="21" r="2.5" fill={primaryColor} />
            <path d="M 21 23 L 13 18 L 8 14" />
            {/* Legs kicked completely back springing from the wall */}
            <line x1="21" y1="34" x2="2" y2="40" strokeWidth="3.2" />
            <line x1="21" y1="34" x2="6" y2="46" strokeWidth="3.2" />
            {/* Spring Thrust Lines */}
            <line x1="-3" y1="38" x2="-10" y2="38" stroke={primaryColor} strokeWidth="1.8" strokeDasharray="3 3" />
            <line x1="-1" y1="44" x2="-8" y2="44" stroke={primaryColor} strokeWidth="1.8" strokeDasharray="3 3" />
          </>
        )}

        {/* 3. FLYING KICK (Airborne horizontal dropkick) */}
        {pose === 'flying_kick' && (
          <>
            {/* Aerodynamic Guard Arms */}
            <path d="M 21 22 L 11 16 L 5 18" />
            <path d="M 21 22 L 30 17 L 36 13" stroke={weaponColor} strokeWidth="2.6" />
            {/* Front Dropkick Leg Extended with Wind Trail */}
            <line x1="21" y1="34" x2="44" y2="32" strokeWidth="3.4" stroke={primaryColor} />
            <circle cx="44" cy="32" r="2.6" fill={weaponColor} />
            {/* Tucked Back Leg */}
            <path d="M 21 34 L 11 38 L 17 46" />
          </>
        )}

        {/* 4. DASH FORWARD (Sprinting attack) */}
        {pose === 'dash' && (
          <>
            <line x1="21" y1="23" x2="38" y2="21" strokeWidth="2.8" stroke={weaponColor} />
            <circle cx="38" cy="21" r="2.5" fill={primaryColor} />
            <path d="M 21 23 L 13 28 L 10 23" />
            <path d="M 21 34 L 13 43 L 6 51" />
            <path d="M 21 34 L 30 42 L 37 49" strokeWidth="3" />
          </>
        )}

        {/* 5. WEAPON SLASH (Katana or Staff strike) */}
        {pose === 'slash' && (
          <>
            <path d="M 21 22 L 31 16 L 38 10" strokeWidth="2.8" />
            {/* Glowing Weapon Arc */}
            {isRed ? (
              <path d="M 38 10 L 48 3 C 50 17, 46 30, 32 40" stroke={weaponColor} strokeWidth="3.2" strokeLinecap="round" />
            ) : (
              <line x1="10" y1="40" x2="44" y2="6" stroke={weaponColor} strokeWidth="3.4" strokeLinecap="round" />
            )}
            <path d="M 21 22 L 14 26 L 10 24" />
            <path d="M 21 34 L 13 42 L 7 50" />
            <path d="M 21 34 L 30 41 L 38 48" />
          </>
        )}

        {/* 6. MATRIX DODGE (Arched back under incoming strike) */}
        {pose === 'matrix_dodge' && (
          <>
            <path d="M 21 23 L 11 18 L 6 12" />
            <path d="M 21 23 L 30 20 L 36 24" stroke={weaponColor} strokeWidth="2.6" />
            {/* Deep bent stance */}
            <path d="M 21 34 L 10 40 L 4 48" />
            <path d="M 21 34 L 32 41 L 39 48" />
          </>
        )}

        {/* 7. LOW SWEEP */}
        {pose === 'sweep' && (
          <>
            <path d="M 21 24 L 13 20 L 9 25" />
            <path d="M 21 24 L 28 22 L 32 28" />
            {/* Sweeping leg flat along ground */}
            <line x1="21" y1="34" x2="44" y2="48" strokeWidth="3.2" stroke={primaryColor} />
            <path d="M 21 34 L 13 41 L 8 49" />
          </>
        )}

        {/* 8. RECOIL / KNOCKBACK */}
        {pose === 'recoil' && (
          <>
            <path d="M 21 23 L 12 16 L 6 19" />
            <path d="M 21 23 L 14 28 L 8 32" />
            <path d="M 21 34 L 13 39 L 9 47" />
            <path d="M 21 34 L 22 41 L 20 49" />
          </>
        )}

        {/* 9. DEFAULT / IDLE COMBAT STANCE (Wide, athletic horse guard) */}
        {pose === 'idle' && (
          <>
            <path d="M 21 22 L 13 25 L 11 20" />
            <path d="M 21 22 L 29 20 L 33 16" />
            {isRed ? (
              <line x1="33" y1="16" x2="44" y2="4" stroke={weaponColor} strokeWidth="2.8" strokeLinecap="round" />
            ) : (
              <line x1="24" y1="30" x2="38" y2="6" stroke={weaponColor} strokeWidth="2.6" strokeLinecap="round" />
            )}
            <path d="M 21 34 L 14 43 L 9 51" strokeWidth="2.8" />
            <path d="M 21 34 L 28 42 L 33 50" strokeWidth="2.8" />
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
 * 4. BOT FIGHT & PARKOUR WALL-JUMP ENGINE:
 *    - The Text ('THE MISCREANT STUDIOS') and the PC Monitor are SOLID WALLS in their arena!
 *    - They spar on 'T' with clean spacing (no overlapping!).
 *    - Blue gets kicked towards the PC monitor, plants feet on the PC monitor bezel (wall-perch),
 *      and springs off the PC monitor with massive force!
 *    - Red rebounds off the vertical letter 'T', kicks off the letters, and dives into combat!
 *    - Down in the chasm between Text and PC, they wall-jump back and forth while falling!
 *    - They spar on the desk near the controller, and wall-run vertically back up to 'T'!
 *    - 100% clean: Zero text badges, zero dialogue, pure kung-fu movie physics!
 */
export default function JetMissionScrollytelling({ 
  containerRef, 
  letterTRef, 
  studiosRef, 
  btnRef,
  monitorRef
}) {
  const [mounted, setMounted] = useState(false);
  const [missionPhase, setMissionPhase] = useState('entering');
  const [jetVanished, setJetVanished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measured coordinates relative to hero container
  const [anchors, setAnchors] = useState({
    jetCenter: { x: 520, y: 35 },
    letterT: { x: 500, y: 200 },
    studios: { x: 260, y: 320 },
    button: { x: 220, y: 460 },
    exitNextPage: { x: 260, y: 780 },
    monitorLeft: 660,
    monitorTop: 160
  });

  // Combat State
  const [fightCycle, setFightCycle] = useState(0);
  const [redPose, setRedPose] = useState('idle');
  const [bluePose, setBluePose] = useState('idle');
  const [redFacing, setRedFacing] = useState('right');
  const [blueFacing, setBlueFacing] = useState('left');
  const [redRotation, setRedRotation] = useState(0);
  const [blueRotation, setBlueRotation] = useState(0);

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

    // Measure PC Monitor position for accurate wall-jumping!
    let mLeft = tX + 140;
    let mTop = tY - 30;
    if (monitorRef?.current) {
      const mRect = monitorRef.current.getBoundingClientRect();
      mLeft = mRect.left - cRect.left + 50; // Left bezel edge of PC monitor
      mTop = mRect.top - cRect.top;
    }

    setAnchors({
      jetCenter: { x: jetTargetX, y: jetTargetY },
      letterT: { x: tX, y: tY },
      studios: { x: sX, y: sY },
      button: { x: bX, y: bY },
      exitNextPage: { x: bX + 30, y: cRect.height + 40 },
      monitorLeft: mLeft,
      monitorTop: mTop
    });
  };

  useEffect(() => {
    setMounted(true);
    updateAnchors();

    const handleResize = () => updateAnchors();
    window.addEventListener('resize', handleResize);

    const dropTimer = setTimeout(() => {
      setMissionPhase('dropping');
    }, 1100);

    const landTimer = setTimeout(() => {
      setMissionPhase('landed_fighting');
    }, 2100);

    const jetDepartTimer = setTimeout(() => {
      setJetVanished(true);
    }, 2600);

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

  // 60 FPS CONTINUOUS BOT FIGHT & PARKOUR WALL ENGINE
  useEffect(() => {
    if (missionPhase !== 'landed_fighting') return;

    let animId;
    const startTime = Date.now();

    const fightLoop = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const cycleTime = elapsed % 11.5; // 11.5s infinite parkour fight movie
      setFightCycle(cycleTime);

      // --- CHOREOGRAPHED MARTIAL ARTS & WALL-JUMP MOVES ---
      if (cycleTime < 2.0) {
        // Phase 1: Sparring on 'T' with wide combat spacing
        setRedFacing('right');
        setBlueFacing('left');
        setRedRotation(0);
        setBlueRotation(0);

        if (cycleTime < 0.8) {
          setRedPose('idle');
          setBluePose('idle');
        } else if (cycleTime < 1.4) {
          setRedPose('dash');
          setBluePose('matrix_dodge');
        } else {
          setRedPose('flying_kick');
          setBluePose('recoil');
        }
      } else if (cycleTime < 3.8) {
        // Phase 2: Blue gets kicked to PC Monitor wall -> plants feet on PC bezel -> springs off!
        const sub = cycleTime - 2.0;
        if (sub < 0.9) {
          // Blue flying towards PC monitor wall
          setBlueFacing('left');
          setBluePose('recoil');
          setBlueRotation(15);
          setRedFacing('right');
          setRedPose('dash');
          setRedRotation(0);
        } else if (sub < 1.3) {
          // Blue PLANTS FEET ON THE PC MONITOR BEZEL (Wall Perch!)
          setBlueFacing('left');
          setBluePose('wall_perch');
          setBlueRotation(0);
          setRedFacing('right');
          setRedPose('flying_kick');
        } else {
          // Blue EXPLODES OFF PC MONITOR WALL!
          setBlueFacing('left');
          setBluePose('wall_spring');
          setBlueRotation(-10);
          setRedFacing('right');
          setRedPose('slash');
        }
      } else if (cycleTime < 5.8) {
        // Phase 3: Clash in mid-air -> Red rebounds off the vertical letter 'T'!
        const sub = cycleTime - 3.8;
        if (sub < 0.7) {
          // Mid-air collision
          setRedFacing('right');
          setBlueFacing('left');
          setRedPose('recoil');
          setBluePose('slash');
        } else if (sub < 1.3) {
          // Red plants feet on the vertical letter 'T' (Text Wall Perch!)
          setRedFacing('right');
          setRedPose('wall_perch');
          setRedRotation(0);
          setBlueFacing('left');
          setBluePose('flying_kick');
        } else {
          // Red springs off the letter 'T'!
          setRedFacing('right');
          setRedPose('wall_spring');
          setBlueFacing('left');
          setBluePose('matrix_dodge');
        }
      } else if (cycleTime < 8.6) {
        // Phase 4: FALLING CHASM DUEL (Wall-jumping between Text and PC Monitor!)
        const sub = cycleTime - 5.8;
        if (sub < 0.9) {
          // Red kicking off PC monitor at lower height
          setRedFacing('left');
          setRedPose('wall_spring');
          setBlueFacing('right');
          setBluePose('flying_kick');
        } else if (sub < 1.8) {
          // Blue kicks off the word STUDIOS (Text Wall)
          setBlueFacing('right');
          setBluePose('wall_spring');
          setRedFacing('left');
          setRedPose('slash');
        } else {
          // Mid-air spin flurry while falling
          setRedFacing('right');
          setBlueFacing('left');
          setRedPose('slash');
          setBluePose('slash');
        }
      } else if (cycleTime < 10.2) {
        // Phase 5: Desk / Controller Floor Duel
        const sub = cycleTime - 8.6;
        if (sub < 0.6) {
          setRedFacing('right');
          setBlueFacing('left');
          setRedPose('sweep');
          setBluePose('matrix_dodge');
        } else {
          setRedFacing('right');
          setBlueFacing('left');
          setRedPose('slash');
          setBluePose('flying_kick');
        }
      } else {
        // Phase 6: Vertical Ninja Wall-Run Climb back to 'T'
        setRedFacing('left');
        setBlueFacing('left');
        setRedPose('dash');
        setBluePose('flying_kick');
        setRedRotation(-25);
        setBlueRotation(-25);
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

  // --- PARKOUR ARENA DIMENSIONS & WALLS ---
  const wallLeft = anchors.letterT.x;        // Left wall = Right edge of 'MISCREANT' text
  const wallRight = anchors.monitorLeft;      // Right wall = Left bezel edge of PC monitor
  const chasmSpan = Math.max(130, wallRight - wallLeft);
  const perchY = anchors.letterT.y;           // Platform = Top stroke of letter 'T'
  const floorY = perchY + 250;               // Floor = Desk level near controller
  const sProgress = scrollProgress;

  // Coordinates when in initial entry / drop
  let redX = wallLeft - 32;
  let redY = perchY;
  let blueX = wallLeft + 32;
  let blueY = perchY;
  let redParachute = false;
  let blueParachute = false;
  let redVisible = missionPhase !== 'entering';
  let blueVisible = missionPhase !== 'entering';
  let dropTransition = 'none';

  if (missionPhase === 'entering') {
    redX = anchors.jetCenter.x - 12;
    redY = anchors.jetCenter.y + 10;
    blueX = anchors.jetCenter.x + 12;
    blueY = anchors.jetCenter.y + 10;
  } else if (missionPhase === 'dropping') {
    redX = wallLeft - 32;
    redY = perchY;
    blueX = wallLeft + 32;
    blueY = perchY;
    redParachute = true;
    blueParachute = true;
    dropTransition = 'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1)';
  } else if (missionPhase === 'landed_fighting') {
    // Scroll handling
    if (sProgress > 0.05) {
      if (sProgress <= 0.35) {
        const p = (sProgress - 0.05) / 0.30;
        const jumpArc = Math.sin(p * Math.PI) * 45;
        redX = wallLeft - 32 + (anchors.studios.x - wallLeft) * p;
        redY = perchY + (anchors.studios.y - perchY) * p - jumpArc;
        blueX = wallLeft + 32 + (anchors.studios.x - wallLeft) * p;
        blueY = perchY + (anchors.studios.y - perchY) * p - jumpArc;
      } else if (sProgress <= 0.70) {
        const p = (sProgress - 0.35) / 0.35;
        const jumpArc = Math.sin(p * Math.PI) * 35;
        redX = anchors.studios.x - 32 + (anchors.button.x - anchors.studios.x) * p;
        redY = anchors.studios.y + (anchors.button.y - anchors.studios.y) * p - jumpArc;
        blueX = anchors.studios.x + 32 + (anchors.button.x - anchors.studios.x) * p;
        blueY = anchors.studios.y + (anchors.button.y - anchors.studios.y) * p - jumpArc;
      } else {
        const p = Math.min((sProgress - 0.70) / 0.35, 1.2);
        redX = anchors.button.x - 32 + (anchors.exitNextPage.x - anchors.button.x) * p;
        redY = anchors.button.y + (anchors.exitNextPage.y - anchors.button.y) * p;
        blueX = anchors.button.x + 32 + (anchors.exitNextPage.x - anchors.button.x) * p;
        blueY = anchors.button.y + (anchors.exitNextPage.y - anchors.button.y) * p;
        redParachute = true;
        blueParachute = true;
      }
    } else {
      // --- CONTINUOUS PARKOUR WALL-JUMP DUEL ENGINE ---
      const t = fightCycle;

      if (t < 2.0) {
        // Phase 1: Sparring on the 'T' with clean 65px combat spacing
        if (t < 0.8) {
          redX = wallLeft - 32;
          redY = perchY;
          blueX = wallLeft + 32;
          blueY = perchY;
        } else if (t < 1.4) {
          // Red rushes forward, Blue ducks back
          redX = wallLeft - 10;
          redY = perchY;
          blueX = wallLeft + 42;
          blueY = perchY;
        } else {
          // Red kicks Blue towards the PC Monitor
          redX = wallLeft;
          redY = perchY - 8;
          blueX = wallLeft + 65;
          blueY = perchY - 4;
        }
      } else if (t < 3.8) {
        // Phase 2: Blue travels to PC Monitor wall -> plants feet on PC bezel -> springs off!
        const sub = t - 2.0;
        if (sub < 0.9) {
          const p = sub / 0.9;
          blueX = wallLeft + 65 + (wallRight - (wallLeft + 65)) * p;
          blueY = perchY + 15 * p;
          redX = wallLeft + 25 * p;
          redY = perchY - 5;
        } else if (sub < 1.3) {
          // Blue is PLANTED ON PC MONITOR BEZEL (Wall Perch!)
          blueX = wallRight - 4;
          blueY = perchY + 15;
          redX = wallLeft + 35;
          redY = perchY;
        } else {
          // Blue SPRINGS OFF PC MONITOR WALL back towards Red!
          const p = (sub - 1.3) / 0.5;
          blueX = wallRight - 4 - (chasmSpan * 0.45) * p;
          blueY = perchY + 15 - Math.sin(p * Math.PI) * 25;
          redX = wallLeft + 35 + (chasmSpan * 0.15) * p;
          redY = perchY;
        }
      } else if (t < 5.8) {
        // Phase 3: Clash & Red rebounds onto the Text (Letter 'T' Wall!)
        const sub = t - 3.8;
        if (sub < 0.7) {
          const p = sub / 0.7;
          redX = (wallLeft + 50) - (chasmSpan * 0.45) * p;
          redY = perchY + 10;
          blueX = (wallRight - chasmSpan * 0.35) + 15 * p;
          blueY = perchY + 5;
        } else if (sub < 1.3) {
          // Red is PLANTED ON LETTER 'T' (Text Wall Perch!)
          redX = wallLeft - 16;
          redY = perchY + 10;
          blueX = wallLeft + chasmSpan * 0.5;
          blueY = perchY - 12;
        } else {
          // Red SPRINGS OFF LETTER 'T' into the chasm!
          const p = (sub - 1.3) / 0.7;
          redX = wallLeft - 16 + (chasmSpan * 0.35) * p;
          redY = perchY + 10 + 20 * p;
          blueX = wallLeft + chasmSpan * 0.5 + 20 * p;
          blueY = perchY + 25 * p;
        }
      } else if (t < 8.6) {
        // Phase 4: FALLING CHASM DUEL (Wall-jumping between Text and PC Monitor down the gap)
        const sub = t - 5.8;
        const p = sub / 2.8;
        const currentY = (perchY + 30) + (floorY - (perchY + 30)) * p;

        if (sub < 0.9) {
          // Red kicks off PC Monitor wall
          redX = wallRight - 8;
          redY = currentY;
          blueX = wallLeft + chasmSpan * 0.35;
          blueY = currentY - 15;
        } else if (sub < 1.8) {
          // Blue kicks off the Text wall (STUDIOS)
          blueX = wallLeft + 12;
          blueY = currentY;
          redX = wallLeft + chasmSpan * 0.65;
          redY = currentY - 10;
        } else {
          // Mid-air dual strike in center of chasm
          const osc = Math.sin((sub - 1.8) * 8) * 20;
          redX = wallLeft + chasmSpan * 0.5 - 24 + osc;
          redY = currentY;
          blueX = wallLeft + chasmSpan * 0.5 + 24 - osc;
          blueY = currentY;
        }
      } else if (t < 10.2) {
        // Phase 5: Desk / Controller Floor Duel
        const sub = t - 8.6;
        const floorCenter = wallLeft + chasmSpan * 0.5;
        const sway = Math.sin(sub * 8) * 15;

        redX = floorCenter - 32 + sway;
        redY = floorY;
        blueX = floorCenter + 32 - sway;
        blueY = floorY;
      } else {
        // Phase 6: Vertical Ninja Wall-Run Climb back to 'T'
        const p = (t - 10.2) / 1.3;
        const jumpApex = Math.sin(p * Math.PI) * 90;

        // Running up along the walls back to top of 'T'
        redX = (wallLeft + 30) + ((wallLeft - 32) - (wallLeft + 30)) * p;
        redY = floorY + (perchY - floorY) * p - jumpApex;

        blueX = (wallRight - 20) + ((wallLeft + 32) - (wallRight - 20)) * p;
        blueY = floorY + (perchY - floorY) * p - jumpApex;
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


      {/* 2. RED BOT FIGHTER (CRIMSON NINJA - PARKOUR WALL RUNNER) */}
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

            {/* Dynamic Sprite with Rotation */}
            <StickmanFighterSprite 
              team="red" 
              pose={redPose} 
              facing={redFacing}
              rotation={redRotation}
            />

          </div>
        </div>
      )}


      {/* 3. BLUE BOT FIGHTER (COBALT SHINOBI - PARKOUR WALL RUNNER) */}
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

            {/* Dynamic Sprite with Rotation */}
            <StickmanFighterSprite 
              team="blue" 
              pose={bluePose} 
              facing={blueFacing}
              rotation={blueRotation}
            />

          </div>
        </div>
      )}

    </div>
  );
}