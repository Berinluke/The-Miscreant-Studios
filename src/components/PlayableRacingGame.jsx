import React, { useState, useEffect, useRef } from 'react';

/**
 * PlayableRacingGame (Project Velocity - Widescreen Ballpoint Pen Edition)
 * 
 * Runs a real, 60 FPS playable pen-doodle racing game inside the TV/Monitor screen:
 * - FILLS THE ENTIRE WIDESCREEN DISPLAY EDGE-TO-EDGE (504px x 298px).
 * - Full-width 3-lane highway with scrolling high-speed red/blue kerbs and dashed dividers.
 * - Autopilot / Demo Mode initially: car dodges oncoming cars automatically.
 * - "[⚡ TAKE ACCESS]" button overlay.
 * - Manual control: Left/Right arrows, A/D, on-screen touch/mouse halves, or D-Pad / Analog Sticks!
 * - Realistic car tilt physics when changing lanes.
 * - Score counter, speed telemetry, and crash detection with quick restart.
 */
export default function PlayableRacingGame({ externalControl = null }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('demo'); // 'demo' | 'playing' | 'crashed'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1480);

  // Mutable game state ref for 60 FPS animation loop without React render lag
  const gRef = useRef({
    state: 'demo',
    carX: 252,
    carLane: 1, // 0 = left (96), 1 = center (252), 2 = right (408)
    targetX: 252,
    tilt: 0,
    speed: 6.5,
    roadOffset: 0,
    enemies: [],
    lastSpawn: 0,
    score: 0,
    crashParticles: []
  });

  // Handle external gamepad clicks (from the drawn controller below the monitor)
  useEffect(() => {
    if (!externalControl) return;
    if (gRef.current.state === 'demo') {
      takeAccess();
    }
    if (externalControl === 'left') {
      gRef.current.carLane = Math.max(0, gRef.current.carLane - 1);
    } else if (externalControl === 'right') {
      gRef.current.carLane = Math.min(2, gRef.current.carLane + 1);
    }
  }, [externalControl]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        if (gRef.current.state === 'demo') {
          takeAccess();
        }
        gRef.current.carLane = Math.max(0, gRef.current.carLane - 1);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        if (gRef.current.state === 'demo') {
          takeAccess();
        }
        gRef.current.carLane = Math.min(2, gRef.current.carLane + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const takeAccess = () => {
    gRef.current.state = 'playing';
    gRef.current.score = 0;
    gRef.current.enemies = [];
    gRef.current.carLane = 1;
    gRef.current.speed = 7.5;
    gRef.current.crashParticles = [];
    setGameState('playing');
    setScore(0);
  };

  const restartGame = () => {
    takeAccess();
  };

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Full widescreen lane positions across 504px width:
    // Left kerb: 0..18, Road: 18..486, Right kerb: 486..504
    // 3 wide lanes (width 156 each):
    // Lane 0: 96, Lane 1: 252, Lane 2: 408
    const lanePositions = [96, 252, 408];

    const loop = (timestamp) => {
      const g = gRef.current;

      // 1. CLEAR & FILL ENTIRE WIDESCREEN DISPLAY (NOTEBOOK PAPER CANVAS)
      ctx.fillStyle = '#FAF8F2';
      ctx.fillRect(0, 0, 504, 298);

      // Subtle engineering blueprint grid pattern on road
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 18; x < 486; x += 39) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 298);
        ctx.stroke();
      }

      // Scrolling speed offset
      g.roadOffset = (g.roadOffset + g.speed) % 36;

      // 2. SCROLLING RACING KERBS (LEFT & RIGHT EDGES - EDGE-TO-EDGE FIT)
      const kerbSegmentH = 18;
      const numSegments = Math.ceil(298 / kerbSegmentH) + 2;

      for (let s = -2; s < numSegments; s++) {
        const y = s * kerbSegmentH + (g.roadOffset % kerbSegmentH);
        const isAlternate = (Math.floor((s * kerbSegmentH + g.roadOffset) / kerbSegmentH)) % 2 === 0;

        // Left Kerb (0 to 18px)
        ctx.fillStyle = isAlternate ? '#EF4444' : '#1E40AF';
        ctx.fillRect(0, y, 18, kerbSegmentH);
        ctx.strokeStyle = '#FAF8F2';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, y, 18, kerbSegmentH);

        // Right Kerb (486 to 504px)
        ctx.fillStyle = isAlternate ? '#1E40AF' : '#EF4444';
        ctx.fillRect(486, y, 18, kerbSegmentH);
        ctx.strokeRect(486, y, 18, kerbSegmentH);
      }

      // Solid Deep Blue Pen Barrier Edges
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(18, 298);
      ctx.moveTo(486, 0);
      ctx.lineTo(486, 298);
      ctx.stroke();

      // 3. SCROLLING DASHED LANE DIVIDERS (AT 174px and 330px)
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([22, 18]);
      ctx.lineDashOffset = -g.roadOffset;

      // Lane Divider 1 (between Lane 0 and Lane 1)
      ctx.beginPath();
      ctx.moveTo(174, 0);
      ctx.lineTo(174, 298);
      ctx.stroke();

      // Lane Divider 2 (between Lane 1 and Lane 2)
      ctx.beginPath();
      ctx.moveTo(330, 0);
      ctx.lineTo(330, 298);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // 4. DEMO AUTOPILOT AI LOGIC
      if (g.state === 'demo') {
        const threat = g.enemies.find(e => e.y > 50 && e.y < 220 && Math.abs(e.x - g.carX) < 65);
        if (threat) {
          if (g.carLane === 1) {
            g.carLane = threat.x > 252 ? 0 : 2;
          } else if (g.carLane === 0) {
            g.carLane = 1;
          } else {
            g.carLane = 1;
          }
        }
      }

      // Smooth horizontal interpolation toward target lane + tilt physics
      g.targetX = lanePositions[g.carLane];
      const diffX = g.targetX - g.carX;
      g.carX += diffX * 0.22;
      g.tilt = Math.max(-0.25, Math.min(0.25, diffX * 0.006));

      // 5. SPAWN ONCOMING TRAFFIC
      const spawnInterval = g.state === 'demo' ? 1200 : 950;
      if (timestamp - g.lastSpawn > spawnInterval) {
        g.lastSpawn = timestamp;
        const randomLane = Math.floor(Math.random() * 3);
        const types = ['racer', 'sedan', 'truck'];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        g.enemies.push({
          x: lanePositions[randomLane],
          y: -70,
          speed: 3 + Math.random() * 2.5,
          type: chosenType,
          color: randomLane === 0 ? '#DC2626' : randomLane === 1 ? '#1E3A8A' : '#0F172A'
        });
      }

      // 6. UPDATE & DRAW ONCOMING CARS
      for (let i = g.enemies.length - 1; i >= 0; i--) {
        const enemy = g.enemies[i];
        enemy.y += enemy.speed + (g.speed * 0.45);

        ctx.save();
        ctx.translate(enemy.x, enemy.y);

        // Headlight Beams Shining Downward onto Road
        const grad = ctx.createLinearGradient(0, 30, 0, 95);
        grad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
        grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-14, 25);
        ctx.lineTo(-28, 95);
        ctx.lineTo(28, 95);
        ctx.lineTo(14, 25);
        ctx.closePath();
        ctx.fill();

        // Drop Shadow
        ctx.fillStyle = 'rgba(30, 58, 138, 0.22)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 20, 32, 0, 0, Math.PI * 2);
        ctx.fill();

        // Main Vehicle Body (Clean paper fill + ballpoint pen ink outlines)
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = enemy.color;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.roundRect(-16, -28, 32, 56, 7);
        ctx.fill();
        ctx.stroke();

        // Windshield
        ctx.fillStyle = '#93C5FD';
        ctx.strokeStyle = '#1E3A8A';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(-12, -12, 24, 15, 4);
        ctx.fill();
        ctx.stroke();

        // Roof Accent / Crosshatch Ink Shading
        ctx.fillStyle = enemy.color;
        ctx.fillRect(-4, -26, 8, 10);

        // Headlight Bulbs
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(-10, 24, 3, 0, Math.PI * 2);
        ctx.arc(10, 24, 3, 0, Math.PI * 2);
        ctx.fill();

        // Wide Racing Wheels
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(-20, -22, 4, 12);
        ctx.fillRect(16, -22, 4, 12);
        ctx.fillRect(-20, 10, 4, 12);
        ctx.fillRect(16, 10, 4, 12);

        ctx.restore();

        // Collision Detection with Player Car
        const playerY = 230;
        const dx = Math.abs(enemy.x - g.carX);
        const dy = Math.abs(enemy.y - playerY);

        if (dx < 32 && dy < 48) {
          if (g.state === 'playing') {
            g.state = 'crashed';
            setGameState('crashed');

            // Generate explosion ink sparks
            g.crashParticles = Array.from({ length: 24 }).map(() => ({
              x: g.carX,
              y: playerY,
              vx: (Math.random() - 0.5) * 12,
              vy: (Math.random() - 0.5) * 12,
              life: 1,
              color: Math.random() > 0.5 ? '#EF4444' : '#1E3A8A'
            }));

            // Auto-recover back to demo autopilot after 3.2s
            setTimeout(() => {
              if (gRef.current.state === 'crashed') {
                gRef.current.state = 'demo';
                setGameState('demo');
              }
            }, 3200);
          }
        }

        // Clean up passed cars and update score
        if (enemy.y > 340) {
          g.enemies.splice(i, 1);
          if (g.state === 'playing') {
            g.score += 15;
            setScore(g.score);
            if (g.score > highScore) setHighScore(g.score);
          }
        }
      }

      // 7. DRAW PLAYER CAR (PROJECT VELOCITY PRO RACER WITH REALISTIC TILT)
      const pY = 230;
      ctx.save();
      ctx.translate(g.carX, pY);
      ctx.rotate(g.tilt); // Dynamic steering tilt!

      // Exhaust Speed Trails (Blue Pen dashed jet contrails)
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-10, 28);
      ctx.lineTo(-10, 52);
      ctx.moveTo(10, 28);
      ctx.lineTo(10, 52);
      ctx.stroke();
      ctx.setLineDash([]);

      // Car Drop Shadow
      ctx.fillStyle = 'rgba(30, 58, 138, 0.28)';
      ctx.beginPath();
      ctx.ellipse(0, 3, 22, 34, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main Aerodynamic Chassis
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-18, -30, 36, 60, 8);
      ctx.fill();
      ctx.stroke();

      // Cockpit Roof & Windshield (Cobalt Cyan Pen Ink)
      ctx.fillStyle = '#38BDF8';
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-12, -12, 24, 20, 5);
      ctx.fill();
      ctx.stroke();

      // Miscreant Red Racing Stripe
      ctx.fillStyle = '#FF2A5F';
      ctx.fillRect(-3, -28, 6, 56);

      // Rear Spoiler / Wing
      ctx.fillStyle = '#1E3A8A';
      ctx.fillRect(-18, 22, 36, 4);
      ctx.strokeRect(-18, 22, 36, 4);

      // Taillights
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(-11, 26, 3, 0, Math.PI * 2);
      ctx.arc(11, 26, 3, 0, Math.PI * 2);
      ctx.fill();

      // Formula Slick Tires
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-22, -22, 4, 14);
      ctx.fillRect(18, -22, 4, 14);
      ctx.fillRect(-22, 10, 4, 14);
      ctx.fillRect(18, 10, 4, 14);

      ctx.restore();

      // 8. CRASH EXPLOSION PARTICLES
      if (g.crashParticles.length > 0) {
        for (let p = g.crashParticles.length - 1; p >= 0; p--) {
          const pt = g.crashParticles[p];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life -= 0.03;

          if (pt.life <= 0) {
            g.crashParticles.splice(p, 1);
            continue;
          }

          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.life * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 9. DRAW FULL-WIDTH HUD TELEMETRY (EDGE-TO-EDGE)
      // Top HUD Background Banner Bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 1.5;
      ctx.fillRect(18, 6, 468, 24);
      ctx.strokeRect(18, 6, 468, 24);

      // Left: Score & Distance
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '900 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${g.score}m`, 26, 22);

      // Center: Miscreant Speedway
      ctx.fillStyle = '#DC2626';
      ctx.font = '900 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ MISCREANT SPEEDWAY', 252, 22);

      // Right: Speed & High Score
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '900 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`142 MPH`, 478, 22);

      // Crash Screen Message
      if (g.state === 'crashed') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
        ctx.fillRect(0, 0, 504, 298);

        ctx.fillStyle = '#EF4444';
        ctx.font = '900 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💥 CRASHED!', 252, 130);

        ctx.fillStyle = '#1E3A8A';
        ctx.font = '800 13px monospace';
        ctx.fillText(`DISTANCE REACHED: ${g.score}m`, 252, 158);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [highScore]);

  return (
    <div 
      className="relative w-full h-full select-none overflow-hidden font-mono"
      style={{ width: '100%', height: '100%', borderRadius: '6px' }}
    >
      
      {/* 60 FPS HTML5 Canvas (Full 504 x 298 resolution edge-to-edge) */}
      <canvas 
        ref={canvasRef} 
        width={504} 
        height={298} 
        className="w-full h-full block rounded-[6px]"
      />

      {/* OVERLAY: "TAKE ACCESS" BUTTON (IN AUTOPILOT DEMO MODE) */}
      {gameState === 'demo' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/15 backdrop-blur-[1px] p-4 pointer-events-auto">
          <div className="bg-white/95 border-2 border-blue-600 rounded-xl px-6 py-3.5 shadow-2xl flex flex-col items-center gap-2 animate-bounce">
            <span className="font-sans font-black text-xs text-blue-900 tracking-wider flex items-center gap-1.5">
              <span>🎮</span> AUTOPILOT ACTIVE
            </span>
            <button
              onClick={takeAccess}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-[#FF2A5F] active:scale-95 text-white font-black text-xs tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
            >
              <span>⚡ TAKE ACCESS</span>
            </button>
            <span className="text-[10px] text-slate-500 font-medium">
              Click button or press ◀ / ▶ arrows to steer
            </span>
          </div>
        </div>
      )}

      {/* OVERLAY: CRASHED RETRY BUTTON */}
      {gameState === 'crashed' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <button
            onClick={restartGame}
            className="mt-20 px-6 py-2.5 rounded-lg bg-[#FF2A5F] hover:bg-slate-950 active:scale-95 text-white font-black text-xs tracking-widest uppercase transition-all shadow-xl flex items-center gap-2 animate-pulse"
          >
            <span>↺ RETRY RACE</span>
          </button>
        </div>
      )}

      {/* TOUCH / MOUSE STEERING ZONES (FOR MOBILE & EASY CLICKING ON SCREEN) */}
      {gameState === 'playing' && (
        <div className="absolute inset-0 flex pointer-events-auto">
          {/* Left steering half */}
          <div 
            onClick={() => {
              gRef.current.carLane = Math.max(0, gRef.current.carLane - 1);
            }}
            className="w-1/2 h-full cursor-w-resize active:bg-blue-500/10 transition-colors flex items-end p-3.5"
          >
            <span className="bg-white/95 border border-blue-500 text-blue-900 font-black text-[10px] px-2.5 py-1 rounded shadow-sm opacity-70 hover:opacity-100">
              ◀ STEER LEFT
            </span>
          </div>

          {/* Right steering half */}
          <div 
            onClick={() => {
              gRef.current.carLane = Math.min(2, gRef.current.carLane + 1);
            }}
            className="w-1/2 h-full cursor-e-resize active:bg-blue-500/10 transition-colors flex items-end justify-end p-3.5"
          >
            <span className="bg-white/95 border border-blue-500 text-blue-900 font-black text-[10px] px-2.5 py-1 rounded shadow-sm opacity-70 hover:opacity-100">
              STEER RIGHT ▶
            </span>
          </div>
        </div>
      )}

    </div>
  );
}