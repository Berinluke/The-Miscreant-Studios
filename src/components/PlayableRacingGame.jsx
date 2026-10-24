import React, { useState, useEffect, useRef } from 'react';

/**
 * PlayableRacingGame (Project Velocity - Blue Pen Canvas Edition)
 * 
 * Runs a real, 60 FPS playable pen-doodle racing game inside the monitor screen:
 * - Autopilot / Demo Mode initially: car dodges oncoming cars automatically.
 * - "[TAKE ACCESS]" button overlay.
 * - When clicked: User takes manual control with Left/Right arrows, A/D, or click/touch controls!
 * - Oncoming cars, speed lines, score tracker, and crash detection with retry.
 */
export default function PlayableRacingGame({ externalControl = null }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('demo'); // 'demo' | 'playing' | 'crashed'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(1480);

  // Mutable game state ref for high performance 60 FPS animation loop
  const gRef = useRef({
    state: 'demo',
    carX: 250,
    carLane: 1, // 0 = left, 1 = center, 2 = right
    targetX: 250,
    speed: 5.5,
    roadOffset: 0,
    enemies: [],
    lastSpawn: 0,
    score: 0,
    keys: { left: false, right: false }
  });

  // Handle external gamepad clicks (from the drawn controller below)
  useEffect(() => {
    if (!externalControl) return;
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
    gRef.current.speed = 6.5;
    setGameState('playing');
    setScore(0);
  };

  const restartGame = () => {
    takeAccess();
  };

  // Main 60 FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const lanePositions = [140, 252, 364]; // x coords for the 3 lanes (width: 504)

    const loop = (timestamp) => {
      const g = gRef.current;

      // 1. CLEAR & DRAW ROAD (NOTEBOOK BLUE PEN STYLE)
      ctx.fillStyle = '#FAF8F2';
      ctx.fillRect(0, 0, 504, 298);

      // Road boundaries
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.strokeRect(80, 0, 344, 298);

      // Guard rails
      ctx.fillStyle = '#DBEAFE';
      ctx.fillRect(68, 0, 12, 298);
      ctx.fillRect(424, 0, 12, 298);
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(68, 0, 12, 298);
      ctx.strokeRect(424, 0, 12, 298);

      // Scrolling dashed lane dividers
      g.roadOffset = (g.roadOffset + g.speed) % 40;
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -g.roadOffset;

      // Lane 1 divider
      ctx.beginPath();
      ctx.moveTo(196, 0);
      ctx.lineTo(196, 298);
      ctx.stroke();

      // Lane 2 divider
      ctx.beginPath();
      ctx.moveTo(308, 0);
      ctx.lineTo(308, 298);
      ctx.stroke();
      ctx.setLineDash([]); // reset dash

      // 2. DEMO AUTOPILOT AI LOGIC
      if (g.state === 'demo') {
        // Find closest oncoming threat
        const threat = g.enemies.find(e => e.y > 60 && e.y < 220 && Math.abs(e.x - g.carX) < 45);
        if (threat) {
          // Dodge away to safest adjacent lane
          if (g.carLane === 1) {
            g.carLane = threat.x > 252 ? 0 : 2;
          } else if (g.carLane === 0) {
            g.carLane = 1;
          } else {
            g.carLane = 1;
          }
        }
      }

      // Smooth horizontal interpolation toward target lane
      g.targetX = lanePositions[g.carLane];
      g.carX += (g.targetX - g.carX) * 0.22;

      // 3. SPAWN ONCOMING CARS
      if (timestamp - g.lastSpawn > (g.state === 'demo' ? 1400 : 1100)) {
        g.lastSpawn = timestamp;
        // Pick random lane
        const randomLane = Math.floor(Math.random() * 3);
        g.enemies.push({
          x: lanePositions[randomLane],
          y: -50,
          speed: 3 + Math.random() * 2,
          type: Math.random() > 0.5 ? 'racer' : 'sedan'
        });
      }

      // 4. UPDATE & DRAW ONCOMING CARS
      for (let i = g.enemies.length - 1; i >= 0; i--) {
        const enemy = g.enemies[i];
        enemy.y += enemy.speed + (g.speed * 0.4);

        // Draw Oncoming Car in Blue Pen Ink
        ctx.save();
        ctx.translate(enemy.x, enemy.y);

        // Car Shadow
        ctx.fillStyle = 'rgba(30, 58, 138, 0.2)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 16, 28, 0, 0, Math.PI * 2);
        ctx.fill();

        // Oncoming Car Body (Red or Dark Blue ink)
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#1E3A8A';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.roundRect(-14, -26, 28, 52, 6);
        ctx.fill();
        ctx.stroke();

        // Windshield
        ctx.fillStyle = '#93C5FD';
        ctx.beginPath();
        ctx.roundRect(-10, -12, 20, 14, 3);
        ctx.fill();
        ctx.stroke();

        // Headlights
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(-8, 22, 2.5, 0, Math.PI * 2);
        ctx.arc(8, 22, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(-17, -20, 3, 10);
        ctx.fillRect(14, -20, 3, 10);
        ctx.fillRect(-17, 10, 3, 10);
        ctx.fillRect(14, 10, 3, 10);

        ctx.restore();

        // Collision Check (Hitbox)
        const playerY = 230;
        const dx = Math.abs(enemy.x - g.carX);
        const dy = Math.abs(enemy.y - playerY);

        if (dx < 26 && dy < 44) {
          if (g.state === 'playing') {
            g.state = 'crashed';
            setGameState('crashed');
            // Auto restart demo after 2.5s if untouched
            setTimeout(() => {
              if (gRef.current.state === 'crashed') {
                gRef.current.state = 'demo';
                setGameState('demo');
              }
            }, 3000);
          }
        }

        // Remove off-screen enemies
        if (enemy.y > 340) {
          g.enemies.splice(i, 1);
          if (g.state === 'playing') {
            g.score += 10;
            setScore(g.score);
            if (g.score > highScore) setHighScore(g.score);
          }
        }
      }

      // 5. DRAW PLAYER CAR (PROJECT VELOCITY PRO RACER)
      const pY = 230;
      ctx.save();
      ctx.translate(g.carX, pY);

      // Speed Exhaust Contrails
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-8, 26);
      ctx.lineTo(-8, 48);
      ctx.moveTo(8, 26);
      ctx.lineTo(8, 48);
      ctx.stroke();
      ctx.setLineDash([]);

      // Car Shadow
      ctx.fillStyle = 'rgba(30, 58, 138, 0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 2, 18, 30, 0, 0, Math.PI * 2);
      ctx.fill();

      // Main Aerodynamic Chassis (White with deep blue pen contour)
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.roundRect(-16, -28, 32, 56, 8);
      ctx.fill();
      ctx.stroke();

      // Cockpit Roof & Windshield (Cobalt Blue Ink)
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.roundRect(-10, -10, 20, 18, 4);
      ctx.fill();
      ctx.stroke();

      // Racing Striping (Red Miscreant Accent)
      ctx.fillStyle = '#FF2A5F';
      ctx.fillRect(-2, -26, 4, 52);

      // Taillights
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(-10, 25, 2.5, 0, Math.PI * 2);
      ctx.arc(10, 25, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Formula Slick Tires
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-19, -20, 4, 12);
      ctx.fillRect(15, -20, 4, 12);
      ctx.fillRect(-19, 10, 4, 12);
      ctx.fillRect(15, 10, 4, 12);

      ctx.restore();

      // 6. DRAW HUD TELEMETRY
      // Top Left Laps / Score
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '900 11px monospace';
      ctx.fillText(`SCORE: ${g.score}m`, 12, 22);
      ctx.fillStyle = '#64748B';
      ctx.font = '600 9px monospace';
      ctx.fillText(`BEST: ${highScore}m`, 12, 36);

      // Top Right Speed
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '900 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`128 MPH`, 492, 22);
      ctx.fillStyle = '#2563EB';
      ctx.font = '700 8px monospace';
      ctx.fillText(`128Hz REALTIME`, 492, 34);
      ctx.textAlign = 'left';

      // Crash Explosion Effect
      if (g.state === 'crashed') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.fillRect(0, 0, 504, 298);

        ctx.fillStyle = '#EF4444';
        ctx.font = '900 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💥 CRASHED!', 252, 130);
        ctx.fillStyle = '#1E3A8A';
        ctx.font = '700 12px monospace';
        ctx.fillText(`DISTANCE: ${g.score}m`, 252, 155);
        ctx.textAlign = 'left';
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [highScore]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden font-mono">
      
      {/* 60 FPS HTML5 Canvas */}
      <canvas 
        ref={canvasRef} 
        width={504} 
        height={298} 
        className="w-full h-full block"
      />

      {/* OVERLAY: "TAKE ACCESS" BUTTON (IN AUTOPILOT DEMO MODE) */}
      {gameState === 'demo' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-[1px] p-4 pointer-events-auto">
          <div className="bg-white/95 border-2 border-blue-600 rounded-xl px-5 py-3 shadow-xl flex flex-col items-center gap-2 animate-bounce">
            <span className="font-sans font-black text-xs text-blue-900 tracking-wider">
              🎮 AUTOPILOT ACTIVE
            </span>
            <button
              onClick={takeAccess}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-[#FF2A5F] active:scale-95 text-white font-black text-xs tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
            >
              <span>⚡ TAKE ACCESS</span>
            </button>
            <span className="text-[9px] text-slate-500 font-medium">
              Click button or press Left / Right arrows
            </span>
          </div>
        </div>
      )}

      {/* OVERLAY: CRASHED RETRY BUTTON */}
      {gameState === 'crashed' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
          <button
            onClick={restartGame}
            className="mt-20 px-5 py-2 rounded-lg bg-[#FF2A5F] hover:bg-slate-950 active:scale-95 text-white font-black text-xs tracking-widest uppercase transition-all shadow-lg flex items-center gap-2 animate-pulse"
          >
            <span>↺ RETRY RACE</span>
          </button>
        </div>
      )}

      {/* TOUCH / MOUSE STEERING ZONES (FOR MOBILE & EASY CLICKING) */}
      {gameState === 'playing' && (
        <div className="absolute inset-0 flex pointer-events-auto">
          {/* Left steering half */}
          <div 
            onClick={() => {
              gRef.current.carLane = Math.max(0, gRef.current.carLane - 1);
            }}
            className="w-1/2 h-full cursor-w-resize active:bg-blue-500/10 transition-colors flex items-end p-3"
          >
            <span className="bg-white/90 border border-blue-400 text-blue-900 font-black text-[10px] px-2 py-1 rounded shadow-sm opacity-60 hover:opacity-100">
              ◀ STEER LEFT
            </span>
          </div>

          {/* Right steering half */}
          <div 
            onClick={() => {
              gRef.current.carLane = Math.min(2, gRef.current.carLane + 1);
            }}
            className="w-1/2 h-full cursor-e-resize active:bg-blue-500/10 transition-colors flex items-end justify-end p-3"
          >
            <span className="bg-white/90 border border-blue-400 text-blue-900 font-black text-[10px] px-2 py-1 rounded shadow-sm opacity-60 hover:opacity-100">
              STEER RIGHT ▶
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
