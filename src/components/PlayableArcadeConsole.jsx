import React, { useState, useEffect, useRef } from 'react';
import { hudAudio } from './AudioEngine';

/**
 * PlayableArcadeConsole
 * 
 * 5-in-1 Classroom Chalkboard Multi-Game Arcade Engine with REAL GAMEPLAY & REAL GAME OVER:
 * 1. 🏎️ SPEEDWAY DODGE (Highway car racing with actual crash detection)
 * 2. 👾 GALAXY BLAST (Alien invaders that shoot laser bombs; ship destruction)
 * 3. 🧱 CHALK BREAKOUT (3 Lives paddle game; lose balls on bottom drop)
 * 4. 🐍 CYBER SNAKE (Solid wall borders & self-tail collision death)
 * 5. 🥷 SHINOBI JUMP (Spike & blade obstacles that defeat you if not jumped/slid)
 * 
 * Game Over:
 * - When you are out, YOU ARE OUT!
 * - Real explosion particle physics, crash sound effects, defeat telemetry, and instant restart.
 */
export const ARCADE_GAMES = [
  {
    id: 'racer',
    icon: '🏎️',
    name: 'SPEEDWAY',
    title: 'SPEEDWAY DODGE',
    color: '#38BDF8',
    controls: '◀ / ▶ Steer • ▲ Boost • ▼ Brake',
    defeatMsg: 'CRASHED AT 128 MPH!'
  },
  {
    id: 'invaders',
    icon: '👾',
    name: 'GALAXY',
    title: 'GALAXY BLAST',
    color: '#FB7185',
    controls: '◀ / ▶ Move • ▲ Shoot Lasers',
    defeatMsg: 'SHIP DESTROYED BY ALIEN FIRE!'
  },
  {
    id: 'breakout',
    icon: '🧱',
    name: 'BREAKOUT',
    title: 'CHALK BREAKOUT',
    color: '#FDE047',
    controls: '◀ / ▶ Paddle Deflect Ball',
    defeatMsg: 'OUT OF BALLS!'
  },
  {
    id: 'snake',
    icon: '🐍',
    name: 'SNAKE',
    title: 'CYBER SNAKE',
    color: '#34D399',
    controls: '▲ ▼ ◀ ▶ Navigate 4 Directions',
    defeatMsg: 'HIT THE WALL / BITTEN TAIL!'
  },
  {
    id: 'runner',
    icon: '🥷',
    name: 'SHINOBI',
    title: 'SHINOBI JUMP',
    color: '#A78BFA',
    controls: '▲ Jump • ▼ Slide Spikes',
    defeatMsg: 'STRUCK BY LETHAL OBSTACLE!'
  }
];

export default function PlayableArcadeConsole({ externalControl = null }) {
  const canvasRef = useRef(null);

  // States: 'preview' (auto-cycle AI) | 'select' (choose game) | 'playing' (active game) | 'gameover' (you are OUT)
  const [consoleMode, setConsoleMode] = useState('preview');
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [defeatReason, setDefeatReason] = useState('');
  const [highScores, setHighScores] = useState({
    racer: 1480,
    invaders: 2400,
    breakout: 620,
    snake: 360,
    runner: 840
  });

  // Mutable ref for 60 FPS animation loop without React state delay
  const aRef = useRef({
    mode: 'preview',
    gameId: 'racer',
    score: 0,
    lives: 3,
    shake: 0,
    particles: [],

    // 1. RACER
    racer: {
      carLane: 1,
      carX: 252,
      targetX: 252,
      tilt: 0,
      speed: 7.0,
      roadOffset: 0,
      enemies: [],
      lastSpawn: 0
    },

    // 2. INVADERS
    invaders: {
      shipX: 252,
      bullets: [],
      alienBombs: [],
      aliens: [],
      alienDir: 1,
      alienStepTimer: 0,
      lastBombSpawn: 0
    },

    // 3. BREAKOUT
    breakout: {
      paddleX: 252,
      paddleW: 76,
      ballX: 252,
      ballY: 180,
      ballVx: 3.4,
      ballVy: -3.8,
      bricks: []
    },

    // 4. SNAKE
    snake: {
      body: [{ x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }],
      dir: { x: 1, y: 0 },
      food: { x: 18, y: 7 },
      stepTimer: 0
    },

    // 5. RUNNER
    runner: {
      shinobiY: 215,
      shinobiVy: 0,
      isJumping: false,
      isSliding: false,
      slideTimer: 0,
      obstacles: [],
      lastObstacle: 0,
      groundOffset: 0
    }
  });

  // Spawn explosion particles
  const triggerExplosion = (x, y, count = 24, color = '#FB7185') => {
    aRef.current.shake = 12;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.5;
      aRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 25 + Math.random() * 15,
        maxLife: 40,
        color: i % 2 === 0 ? color : '#FDE047'
      });
    }
  };

  // Trigger Real Game Over
  const handleGameOver = (reason) => {
    hudAudio.playCrash();
    aRef.current.mode = 'gameover';
    setConsoleMode('gameover');
    setDefeatReason(reason);

    const gId = aRef.current.gameId;
    const finalScore = aRef.current.score;
    setScore(finalScore);

    setHighScores((prev) => {
      if (finalScore > (prev[gId] || 0)) {
        return { ...prev, [gId]: finalScore };
      }
      return prev;
    });
  };

  // Reset/Initialize state for any game
  const initGame = (id) => {
    const a = aRef.current;
    a.score = 0;
    a.lives = 3;
    a.particles = [];
    a.shake = 0;
    setScore(0);
    setLives(3);

    if (id === 'racer') {
      a.racer.carLane = 1;
      a.racer.carX = 252;
      a.racer.targetX = 252;
      a.racer.speed = 7.0;
      a.racer.enemies = [
        { x: 96, y: 50, speed: 4.5, color: '#EF4444' },
        { x: 408, y: 150, speed: 4.0, color: '#3B82F6' }
      ];
    } else if (id === 'invaders') {
      a.invaders.shipX = 252;
      a.invaders.bullets = [];
      a.invaders.alienBombs = [];
      a.invaders.aliens = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
          a.invaders.aliens.push({
            x: 84 + c * 44,
            y: 42 + r * 28,
            alive: true,
            color: r === 0 ? '#FB7185' : r === 1 ? '#FDE047' : '#38BDF8'
          });
        }
      }
    } else if (id === 'breakout') {
      a.breakout.paddleX = 252;
      a.breakout.ballX = 252;
      a.breakout.ballY = 180;
      a.breakout.ballVx = 3.4 * (Math.random() > 0.5 ? 1 : -1);
      a.breakout.ballVy = -3.8;
      a.breakout.bricks = [];
      const colors = ['#FB7185', '#FDE047', '#34D399', '#38BDF8'];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 9; c++) {
          a.breakout.bricks.push({
            x: 42 + c * 48,
            y: 35 + r * 18,
            w: 42,
            h: 12,
            alive: true,
            color: colors[r]
          });
        }
      }
    } else if (id === 'snake') {
      a.snake.body = [{ x: 12, y: 7 }, { x: 11, y: 7 }, { x: 10, y: 7 }];
      a.snake.dir = { x: 1, y: 0 };
      a.snake.food = { x: 18, y: 7 };
      a.snake.stepTimer = 0;
    } else if (id === 'runner') {
      a.runner.shinobiY = 215;
      a.runner.shinobiVy = 0;
      a.runner.isJumping = false;
      a.runner.isSliding = false;
      a.runner.obstacles = [
        { x: 380, type: 'spike', w: 20, h: 26 },
        { x: 580, type: 'blade', w: 24, h: 22, y: 195 }
      ];
    }
  };

  // Auto-Cycle Games every 2.0 seconds in preview mode
  useEffect(() => {
    if (consoleMode !== 'preview') return;
    const interval = setInterval(() => {
      setActiveGameIndex((prev) => {
        const next = (prev + 1) % ARCADE_GAMES.length;
        aRef.current.gameId = ARCADE_GAMES[next].id;
        initGame(ARCADE_GAMES[next].id);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [consoleMode]);

  // Open Select Mode
  const openSelect = () => {
    hudAudio.playOpen();
    setConsoleMode('select');
    aRef.current.mode = 'select';
  };

  // Switch Game
  const selectGame = (index) => {
    hudAudio.playClick();
    setActiveGameIndex(index);
    aRef.current.gameId = ARCADE_GAMES[index].id;
    initGame(ARCADE_GAMES[index].id);
  };

  // Start / Restart Playing
  const startPlay = () => {
    hudAudio.playClick();
    setConsoleMode('playing');
    aRef.current.mode = 'playing';
    initGame(ARCADE_GAMES[activeGameIndex].id);
  };

  // External Joystick & D-Pad Controls
  useEffect(() => {
    if (!externalControl) return;
    const action = typeof externalControl === 'object' ? externalControl.action : externalControl;
    const a = aRef.current;

    // 1. In Preview Mode: Opens game selector!
    if (consoleMode === 'preview') {
      openSelect();
      return;
    }

    // 2. In Select Mode: Navigate or start!
    if (consoleMode === 'select') {
      if (action === 'left') {
        const next = activeGameIndex > 0 ? activeGameIndex - 1 : ARCADE_GAMES.length - 1;
        selectGame(next);
      } else if (action === 'right') {
        const next = activeGameIndex < ARCADE_GAMES.length - 1 ? activeGameIndex + 1 : 0;
        selectGame(next);
      } else if (['boost', 'brake', 'restart', 'up', 'down'].includes(action)) {
        startPlay();
      }
      return;
    }

    // 3. In Game Over Mode: Restart immediately!
    if (consoleMode === 'gameover') {
      startPlay();
      return;
    }

    // 4. In Active Playing Mode:
    const gId = a.gameId;
    if (gId === 'racer') {
      if (action === 'left') a.racer.carLane = Math.max(0, a.racer.carLane - 1);
      else if (action === 'right') a.racer.carLane = Math.min(2, a.racer.carLane + 1);
      else if (action === 'boost' || action === 'up') a.racer.speed = 13.5;
      else if (action === 'brake' || action === 'down') a.racer.speed = 4.5;
    } else if (gId === 'invaders') {
      if (action === 'left') a.invaders.shipX = Math.max(40, a.invaders.shipX - 32);
      else if (action === 'right') a.invaders.shipX = Math.min(464, a.invaders.shipX + 32);
      else if (action === 'boost' || action === 'up' || action === 'brake') {
        hudAudio.playLaser();
        a.invaders.bullets.push({ x: a.invaders.shipX, y: 240 });
      }
    } else if (gId === 'breakout') {
      if (action === 'left') a.breakout.paddleX = Math.max(50, a.breakout.paddleX - 36);
      else if (action === 'right') a.breakout.paddleX = Math.min(454, a.breakout.paddleX + 36);
    } else if (gId === 'snake') {
      if (action === 'left' && a.snake.dir.x === 0) a.snake.dir = { x: -1, y: 0 };
      else if (action === 'right' && a.snake.dir.x === 0) a.snake.dir = { x: 1, y: 0 };
      else if ((action === 'boost' || action === 'up') && a.snake.dir.y === 0) a.snake.dir = { x: 0, y: -1 };
      else if ((action === 'brake' || action === 'down') && a.snake.dir.y === 0) a.snake.dir = { x: 0, y: 1 };
    } else if (gId === 'runner') {
      if ((action === 'boost' || action === 'up' || action === 'left') && !a.runner.isJumping) {
        hudAudio.playOpen();
        a.runner.isJumping = true;
        a.runner.shinobiVy = -11;
      } else if (action === 'brake' || action === 'down') {
        a.runner.isSliding = true;
        a.runner.slideTimer = 35;
      }
    }
  }, [externalControl]);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (consoleMode === 'preview') {
        openSelect();
        return;
      }
      if (consoleMode === 'select') {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          const next = activeGameIndex > 0 ? activeGameIndex - 1 : ARCADE_GAMES.length - 1;
          selectGame(next);
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          const next = activeGameIndex < ARCADE_GAMES.length - 1 ? activeGameIndex + 1 : 0;
          selectGame(next);
        } else if (['Enter', 'Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
          startPlay();
        }
        return;
      }
      if (consoleMode === 'gameover') {
        if (['Enter', 'Space'].includes(e.code)) {
          startPlay();
        }
        return;
      }

      // Playing mode keys
      const a = aRef.current;
      const gId = a.gameId;
      if (gId === 'racer') {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) a.racer.carLane = Math.max(0, a.racer.carLane - 1);
        else if (['ArrowRight', 'KeyD'].includes(e.code)) a.racer.carLane = Math.min(2, a.racer.carLane + 1);
      } else if (gId === 'invaders') {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) a.invaders.shipX = Math.max(40, a.invaders.shipX - 26);
        else if (['ArrowRight', 'KeyD'].includes(e.code)) a.invaders.shipX = Math.min(464, a.invaders.shipX + 26);
        else if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
          hudAudio.playLaser();
          a.invaders.bullets.push({ x: a.invaders.shipX, y: 240 });
        }
      } else if (gId === 'breakout') {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) a.breakout.paddleX = Math.max(50, a.breakout.paddleX - 32);
        else if (['ArrowRight', 'KeyD'].includes(e.code)) a.breakout.paddleX = Math.min(454, a.breakout.paddleX + 32);
      } else if (gId === 'snake') {
        if (['ArrowLeft', 'KeyA'].includes(e.code) && a.snake.dir.x === 0) a.snake.dir = { x: -1, y: 0 };
        else if (['ArrowRight', 'KeyD'].includes(e.code) && a.snake.dir.x === 0) a.snake.dir = { x: 1, y: 0 };
        else if (['ArrowUp', 'KeyW'].includes(e.code) && a.snake.dir.y === 0) a.snake.dir = { x: 0, y: -1 };
        else if (['ArrowDown', 'KeyS'].includes(e.code) && a.snake.dir.y === 0) a.snake.dir = { x: 0, y: 1 };
      } else if (gId === 'runner') {
        if (['ArrowUp', 'KeyW', 'Space'].includes(e.code) && !a.runner.isJumping) {
          hudAudio.playOpen();
          a.runner.isJumping = true;
          a.runner.shinobiVy = -11;
        } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
          a.runner.isSliding = true;
          a.runner.slideTimer = 35;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [consoleMode, activeGameIndex]);

  // Main 60 FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    initGame(ARCADE_GAMES[0].id);

    const loop = (timestamp) => {
      const a = aRef.current;
      const isAuto = a.mode === 'preview' || a.mode === 'select';
      const isGameOver = a.mode === 'gameover';

      // Screen Shake
      ctx.save();
      if (a.shake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * a.shake,
          (Math.random() - 0.5) * a.shake
        );
        a.shake *= 0.88;
        if (a.shake < 0.5) a.shake = 0;
      }

      // Clear Canvas Screen (504 x 298 Widescreen Chalkboard)
      ctx.fillStyle = '#0F2116';
      ctx.fillRect(0, 0, 504, 298);

      // Subtle chalk grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 504; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 298);
        ctx.stroke();
      }

      // ==============================================================
      // 1. GAME 1: SPEEDWAY DODGE (REAL CRASH DETECTION)
      // ==============================================================
      if (a.gameId === 'racer') {
        const lanePositions = [96, 252, 408];

        if (!isGameOver) {
          a.racer.roadOffset = (a.racer.roadOffset + a.racer.speed) % 36;
        }

        // Draw Kerbs
        for (let s = -2; s < 18; s++) {
          const y = s * 18 + (a.racer.roadOffset % 18);
          const isAlt = Math.floor((s * 18 + a.racer.roadOffset) / 18) % 2 === 0;
          ctx.fillStyle = isAlt ? '#EF4444' : '#0284C7';
          ctx.fillRect(0, y, 16, 18);
          ctx.fillRect(488, y, 16, 18);
        }

        // Dividers
        ctx.strokeStyle = '#FDE047';
        ctx.lineWidth = 2.2;
        ctx.setLineDash([20, 16]);
        ctx.lineDashOffset = -a.racer.roadOffset;
        ctx.beginPath();
        ctx.moveTo(174, 0);
        ctx.lineTo(174, 298);
        ctx.moveTo(330, 0);
        ctx.lineTo(330, 298);
        ctx.stroke();
        ctx.setLineDash([]);

        if (isAuto && !isGameOver) {
          const threat = a.racer.enemies.find((e) => e.y > 60 && e.y < 220 && Math.abs(e.x - a.racer.carX) < 70);
          if (threat) {
            a.racer.carLane = threat.x > 252 ? 0 : 2;
          }
        }

        if (!isGameOver) {
          a.racer.targetX = lanePositions[a.racer.carLane];
          a.racer.carX += (a.racer.targetX - a.racer.carX) * 0.22;
          const diffX = a.racer.targetX - a.racer.carX;
          a.racer.tilt = Math.max(-0.25, Math.min(0.25, diffX * 0.006));

          // Spawn traffic
          if (timestamp - a.racer.lastSpawn > 1050) {
            a.racer.lastSpawn = timestamp;
            const rLane = Math.floor(Math.random() * 3);
            a.racer.enemies.push({
              x: lanePositions[rLane],
              y: -60,
              speed: 3 + Math.random() * 2.5,
              color: rLane === 0 ? '#EF4444' : rLane === 1 ? '#3B82F6' : '#10B981'
            });
          }
        }

        // Draw and update enemies
        for (let i = a.racer.enemies.length - 1; i >= 0; i--) {
          const e = a.racer.enemies[i];
          if (!isGameOver) {
            e.y += e.speed + a.racer.speed * 0.45;
          }

          ctx.save();
          ctx.translate(e.x, e.y);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = e.color;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.roundRect(-15, -26, 30, 52, 6);
          ctx.fill();
          ctx.stroke();
          ctx.restore();

          // REAL COLLISION DETECTION WITH PLAYER CAR!
          if (!isAuto && !isGameOver) {
            const dx = Math.abs(e.x - a.racer.carX);
            const dy = Math.abs(e.y - 230);
            if (dx < 26 && dy < 44) {
              triggerExplosion(a.racer.carX, 230, 28, '#EF4444');
              handleGameOver('💥 HIGH-SPEED TRAFFIC COLLISION!');
              break;
            }
          }

          if (e.y > 340) {
            a.racer.enemies.splice(i, 1);
            if (!isAuto && !isGameOver) a.score += 20;
          }
        }

        // Draw Player Car
        if (!isGameOver) {
          ctx.save();
          ctx.translate(a.racer.carX, 230);
          ctx.rotate(a.racer.tilt);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#0284C7';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(-16, -28, 32, 56, 7);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#67E8F9';
          ctx.fillRect(-11, -12, 22, 12);
          ctx.restore();
        }
      }

      // ==============================================================
      // 2. GAME 2: GALAXY BLAST (REAL ALIEN BOMBS & DESTRUCTION)
      // ==============================================================
      else if (a.gameId === 'invaders') {
        const inv = a.invaders;

        // Stars
        for (let st = 0; st < 30; st++) {
          const sx = (st * 73 + timestamp * 0.05) % 504;
          const sy = (st * 47 + timestamp * 0.1) % 298;
          ctx.fillStyle = st % 2 === 0 ? '#FDE047' : '#FFFFFF';
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Alien Swarm March
        if (!isGameOver && timestamp - inv.alienStepTimer > 380) {
          inv.alienStepTimer = timestamp;
          let hitWall = false;
          inv.aliens.forEach((al) => {
            if (al.alive) {
              al.x += inv.alienDir * 12;
              if (al.x < 30 || al.x > 470) hitWall = true;
            }
          });
          if (hitWall) {
            inv.alienDir *= -1;
            inv.aliens.forEach((al) => (al.y += 12));
          }
        }

        // Aliens drop laser bombs downwards!
        if (!isGameOver && timestamp - inv.lastBombSpawn > 900) {
          inv.lastBombSpawn = timestamp;
          const aliveAliens = inv.aliens.filter((al) => al.alive);
          if (aliveAliens.length > 0) {
            const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
            inv.alienBombs.push({ x: shooter.x, y: shooter.y + 10 });
          }
        }

        // Update Alien Bombs
        for (let ab = inv.alienBombs.length - 1; ab >= 0; ab--) {
          const bomb = inv.alienBombs[ab];
          if (!isGameOver) bomb.y += 5.2;

          ctx.fillStyle = '#FB7185';
          ctx.beginPath();
          ctx.arc(bomb.x, bomb.y, 4, 0, Math.PI * 2);
          ctx.fill();

          // REAL COLLISION: Alien bomb hits Player Ship!
          if (!isAuto && !isGameOver) {
            if (Math.abs(bomb.x - inv.shipX) < 18 && Math.abs(bomb.y - 245) < 16) {
              triggerExplosion(inv.shipX, 245, 30, '#FB7185');
              handleGameOver('🛸 SHIP DESTROYED BY ALIEN PLASMA!');
              break;
            }
          }

          if (bomb.y > 300) inv.alienBombs.splice(ab, 1);
        }

        // Check if aliens reach Earth/Player line!
        if (!isAuto && !isGameOver) {
          const breached = inv.aliens.some((al) => al.alive && al.y > 220);
          if (breached) {
            triggerExplosion(inv.shipX, 245, 35, '#FB7185');
            handleGameOver('👾 ALIEN INVASION BREACHED BASE!');
          }
        }

        // Auto-pilot logic
        if (isAuto && !isGameOver) {
          const nearestAlien = inv.aliens.find((al) => al.alive && Math.abs(al.x - inv.shipX) < 40);
          if (nearestAlien) {
            inv.bullets.push({ x: inv.shipX, y: 240 });
          } else {
            inv.shipX += Math.sin(timestamp * 0.004) * 2.2;
          }
        }

        // Player Bullets
        for (let b = inv.bullets.length - 1; b >= 0; b--) {
          const blt = inv.bullets[b];
          if (!isGameOver) blt.y -= 7.5;

          ctx.fillStyle = '#34D399';
          ctx.fillRect(blt.x - 2, blt.y - 8, 4, 12);

          for (let al of inv.aliens) {
            if (al.alive && Math.abs(al.x - blt.x) < 18 && Math.abs(al.y - blt.y) < 16) {
              al.alive = false;
              hudAudio.playPoint();
              triggerExplosion(al.x, al.y, 10, al.color);
              inv.bullets.splice(b, 1);
              if (!isAuto) a.score += 50;
              break;
            }
          }
          if (blt.y < 0) inv.bullets.splice(b, 1);
        }

        // Draw Aliens
        inv.aliens.forEach((al) => {
          if (al.alive) {
            ctx.fillStyle = al.color;
            ctx.beginPath();
            ctx.arc(al.x, al.y, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(al.x - 6, al.y - 8);
            ctx.lineTo(al.x - 10, al.y - 13);
            ctx.moveTo(al.x + 6, al.y - 8);
            ctx.lineTo(al.x + 10, al.y - 13);
            ctx.stroke();
          }
        });

        // Draw Player Spacecraft
        if (!isGameOver) {
          ctx.fillStyle = '#38BDF8';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(inv.shipX, 230);
          ctx.lineTo(inv.shipX - 16, 260);
          ctx.lineTo(inv.shipX + 16, 260);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FDE047';
          ctx.fillRect(inv.shipX - 3, 242, 6, 8);
        }
      }

      // ==============================================================
      // 3. GAME 3: CHALK BREAKOUT (3 LIVES & BALL LOSS OUT)
      // ==============================================================
      else if (a.gameId === 'breakout') {
        const brk = a.breakout;

        if (!isGameOver) {
          brk.ballX += brk.ballVx;
          brk.ballY += brk.ballVy;

          // Wall bounces
          if (brk.ballX < 12 || brk.ballX > 492) brk.ballVx *= -1;
          if (brk.ballY < 12) brk.ballVy *= -1;

          // Autopilot
          if (isAuto) {
            brk.paddleX += (brk.ballX - brk.paddleX) * 0.18;
          }

          // Paddle deflection
          const paddleY = 260;
          if (
            brk.ballY >= paddleY - 8 &&
            brk.ballY <= paddleY + 12 &&
            brk.ballX >= brk.paddleX - brk.paddleW / 2 &&
            brk.ballX <= brk.paddleX + brk.paddleW / 2
          ) {
            hudAudio.playPoint();
            brk.ballVy = -Math.abs(brk.ballVy);
            const hitOffset = (brk.ballX - brk.paddleX) / (brk.paddleW / 2);
            brk.ballVx = hitOffset * 4.2;
          }

          // REAL BALL DROP OUT!
          if (brk.ballY > 292) {
            if (!isAuto) {
              a.lives--;
              setLives(a.lives);
              hudAudio.playCrash();

              if (a.lives <= 0) {
                triggerExplosion(brk.ballX, 280, 20, '#FDE047');
                handleGameOver('❌ OUT OF BALLS! GAME OVER');
              } else {
                // Reset ball position
                brk.ballX = brk.paddleX;
                brk.ballY = 190;
                brk.ballVy = -3.8;
                brk.ballVx = 3.2 * (Math.random() > 0.5 ? 1 : -1);
              }
            } else {
              brk.ballX = 252;
              brk.ballY = 180;
              brk.ballVy = -3.8;
            }
          }

          // Brick collisions
          for (let b of brk.bricks) {
            if (b.alive) {
              if (
                brk.ballX > b.x &&
                brk.ballX < b.x + b.w &&
                brk.ballY > b.y &&
                brk.ballY < b.y + b.h
              ) {
                b.alive = false;
                hudAudio.playPoint();
                triggerExplosion(b.x + b.w / 2, b.y + b.h / 2, 8, b.color);
                brk.ballVy *= -1;
                if (!isAuto) a.score += 30;
                break;
              }
            }
          }
        }

        // Draw Bricks
        brk.bricks.forEach((b) => {
          if (b.alive) {
            ctx.fillStyle = b.color;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(b.x, b.y, b.w, b.h, 3);
            ctx.fill();
            ctx.stroke();
          }
        });

        // Draw Paddle
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.roundRect(brk.paddleX - brk.paddleW / 2, 260, brk.paddleW, 12, 5);
        ctx.fill();
        ctx.stroke();

        // Draw Ball
        if (!isGameOver) {
          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(brk.ballX, brk.ballY, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ==============================================================
      // 4. GAME 4: CYBER SNAKE (SOLID WALL & SELF-COLLISION DEATH)
      // ==============================================================
      else if (a.gameId === 'snake') {
        const snk = a.snake;
        const cell = 20;

        if (isAuto && !isGameOver) {
          const head = snk.body[0];
          if (head.x < snk.food.x && snk.dir.x !== -1) snk.dir = { x: 1, y: 0 };
          else if (head.x > snk.food.x && snk.dir.x !== 1) snk.dir = { x: -1, y: 0 };
          else if (head.y < snk.food.y && snk.dir.y !== -1) snk.dir = { x: 0, y: 1 };
          else if (head.y > snk.food.y && snk.dir.y !== 1) snk.dir = { x: 0, y: -1 };
        }

        if (!isGameOver && timestamp - snk.stepTimer > 120) {
          snk.stepTimer = timestamp;
          const head = snk.body[0];
          const newHead = {
            x: head.x + snk.dir.x,
            y: head.y + snk.dir.y
          };

          // REAL SOLID WALL COLLISION DEATH!
          if (!isAuto && (newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 14)) {
            triggerExplosion(head.x * cell + 10, head.y * cell + 10, 25, '#34D399');
            handleGameOver('🐍 CRASHED INTO CHALKBOARD WALL!');
          }
          // REAL SELF-TAIL COLLISION DEATH!
          else if (!isAuto && snk.body.slice(1).some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
            triggerExplosion(head.x * cell + 10, head.y * cell + 10, 25, '#EF4444');
            handleGameOver('💀 BITTEN YOUR OWN SERPENT TAIL!');
          } else {
            snk.body.unshift(newHead);

            if (newHead.x === snk.food.x && newHead.y === snk.food.y) {
              hudAudio.playPoint();
              snk.food = {
                x: Math.floor(Math.random() * 23) + 1,
                y: Math.floor(Math.random() * 12) + 1
              };
              if (!isAuto) a.score += 40;
            } else {
              snk.body.pop();
            }
          }
        }

        // Draw Food
        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.arc(snk.food.x * cell + 10, snk.food.y * cell + 10, 7, 0, Math.PI * 2);
        ctx.fill();

        // Draw Snake Body
        snk.body.forEach((seg, idx) => {
          ctx.fillStyle = idx === 0 ? '#34D399' : '#86EFAC';
          ctx.strokeStyle = '#0F2116';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(seg.x * cell + 2, seg.y * cell + 2, cell - 4, cell - 4, 4);
          ctx.fill();
          ctx.stroke();
        });
      }

      // ==============================================================
      // 5. GAME 5: SHINOBI JUMP (REAL SPIKE & BLADE COLLISION DEATH)
      // ==============================================================
      else if (a.gameId === 'runner') {
        const run = a.runner;
        const groundY = 240;

        if (!isGameOver) {
          if (run.isJumping) {
            run.shinobiVy += 0.65;
            run.shinobiY += run.shinobiVy;
            if (run.shinobiY >= groundY - 20) {
              run.shinobiY = groundY - 20;
              run.isJumping = false;
              run.shinobiVy = 0;
            }
          }

          if (run.isSliding) {
            run.slideTimer--;
            if (run.slideTimer <= 0) run.isSliding = false;
          }

          run.groundOffset = (run.groundOffset + 5) % 24;

          if (timestamp - run.lastObstacle > 1300) {
            run.lastObstacle = timestamp;
            const isHigh = Math.random() > 0.5;
            run.obstacles.push({
              x: 520,
              type: isHigh ? 'blade' : 'spike',
              w: 22,
              h: isHigh ? 20 : 28,
              y: isHigh ? groundY - 45 : groundY - 28
            });
          }
        }

        for (let o = run.obstacles.length - 1; o >= 0; o--) {
          const obs = run.obstacles[o];
          if (!isGameOver) obs.x -= 5.5;

          // Autopilot for demo
          if (isAuto && obs.x > 80 && obs.x < 150) {
            if (obs.type === 'spike' && !run.isJumping) {
              run.isJumping = true;
              run.shinobiVy = -11;
            } else if (obs.type === 'blade' && !run.isSliding) {
              run.isSliding = true;
              run.slideTimer = 30;
            }
          }

          // REAL OBSTACLE COLLISION DEATH!
          if (!isAuto && !isGameOver) {
            const playerX = 90;
            const dx = Math.abs(obs.x - playerX);

            // Hit ground spike if NOT jumping
            if (obs.type === 'spike' && dx < 18 && !run.isJumping) {
              triggerExplosion(playerX, groundY - 15, 25, '#FB7185');
              handleGameOver('⚔️ STRUCK BY SHINOBI SPIKES!');
              break;
            }
            // Hit high blade if NOT sliding
            if (obs.type === 'blade' && dx < 18 && !run.isSliding && run.shinobiY > 185) {
              triggerExplosion(playerX, obs.y + 10, 25, '#FDE047');
              handleGameOver('🪓 SLASHED BY ROTATING SHURIKEN BLADE!');
              break;
            }
          }

          // Draw obstacle
          if (obs.type === 'spike') {
            ctx.fillStyle = '#FB7185';
            ctx.beginPath();
            ctx.moveTo(obs.x, groundY);
            ctx.lineTo(obs.x + 11, obs.y);
            ctx.lineTo(obs.x + 22, groundY);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.save();
            ctx.translate(obs.x + 10, obs.y + 10);
            ctx.rotate(timestamp * 0.015);
            ctx.fillStyle = '#FDE047';
            ctx.fillRect(-10, -3, 20, 6);
            ctx.fillRect(-3, -10, 6, 20);
            ctx.restore();
          }

          if (obs.x < -30) {
            run.obstacles.splice(o, 1);
            if (!isAuto && !isGameOver) a.score += 25;
          }
        }

        // Ground Line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(504, groundY);
        ctx.stroke();

        // Draw Shinobi
        if (!isGameOver) {
          ctx.save();
          ctx.translate(90, run.shinobiY);
          if (run.isSliding) {
            ctx.fillStyle = '#A78BFA';
            ctx.beginPath();
            ctx.ellipse(0, 10, 18, 7, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#A78BFA';
            ctx.beginPath();
            ctx.roundRect(-8, -16, 16, 28, 4);
            ctx.fill();
            ctx.strokeStyle = '#FDE047';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(-6, -12);
            ctx.lineTo(-24, -10 + Math.sin(timestamp * 0.02) * 5);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // Draw active particles across all games
      for (let p = a.particles.length - 1; p >= 0; p--) {
        const pt = a.particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (pt.life / pt.maxLife) * 4, 0, Math.PI * 2);
        ctx.fill();

        if (pt.life <= 0) a.particles.splice(p, 1);
      }

      ctx.restore(); // Restore shake

      if (consoleMode === 'playing') {
        setScore(a.score);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [consoleMode]);

  const activeGame = ARCADE_GAMES[activeGameIndex];

  return (
    <div className="relative w-full h-full select-none overflow-hidden font-mono">
      
      {/* 60 FPS Canvas Game Screen (ALWAYS 100% VISIBLE & RUNNING) */}
      <canvas
        ref={canvasRef}
        width={504}
        height={298}
        className="w-full h-full object-cover block"
      />

      {/* ==============================================================
          MODE 1: AUTO-PLAY PREVIEW (Exact Aesthetic Match to Original Card)
          ============================================================== */}
      {consoleMode === 'preview' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 pointer-events-auto">
          <div className="bg-[#14281D]/95 border-2 border-emerald-400/90 rounded-xl px-5 py-3 shadow-2xl flex flex-col items-center gap-2 max-w-sm text-center">
            
            <span className="font-sans font-black text-[11px] text-[#86EFAC] tracking-wider flex items-center gap-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AUTO PREVIEW (2s) • {activeGame.icon} {activeGame.name}
            </span>

            <button
              onClick={openSelect}
              className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-lg font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.7)] active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>⚡</span> ARE YOU READY, GAMER?
            </button>

            <span className="text-[10px] text-slate-300 font-medium font-mono">
              Click button or press any joystick control to select game!
            </span>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODE 2: CHOOSE YOUR GAME (Compact, Clean Card matching Original)
          ============================================================== */}
      {consoleMode === 'select' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[1px] p-4 pointer-events-auto">
          <div className="bg-[#14281D]/95 border-2 border-emerald-400/90 rounded-xl p-4 shadow-2xl flex flex-col items-center gap-2.5 max-w-md w-full text-center">
            
            <span className="font-sans font-black text-xs text-[#86EFAC] tracking-wider uppercase flex items-center gap-1.5">
              <span>🕹️</span> SELECT YOUR GAME:
            </span>

            <div className="flex items-center justify-center gap-1.5 flex-wrap w-full">
              {ARCADE_GAMES.map((game, idx) => {
                const isSelected = idx === activeGameIndex;
                return (
                  <button
                    key={game.id}
                    onClick={() => selectGame(idx)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 border-white shadow-[0_0_12px_rgba(16,185,129,0.8)] scale-105'
                        : 'bg-[#102318] text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span>{game.icon}</span>
                    <span>{game.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={startPlay}
              className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-black text-xs sm:text-sm px-6 py-2 rounded-lg font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.7)] active:scale-95 cursor-pointer flex items-center gap-1.5 mt-1"
            >
              <span>▶</span> START {activeGame.title}
            </button>

            <div className="flex items-center justify-between w-full text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              <span className="text-amber-300 font-mono">{activeGame.controls}</span>
              <button
                onClick={() => setConsoleMode('preview')}
                className="underline hover:text-white cursor-pointer"
              >
                Auto-Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==============================================================
          MODE 3: PLAYING HUD (Clean Top Bar with Lives & Score)
          ============================================================== */}
      {consoleMode === 'playing' && (
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3 py-1.5 pointer-events-auto bg-black/60 border-b border-slate-700/60 backdrop-blur-sm">
          <button
            onClick={openSelect}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#102318] hover:bg-slate-800 text-[10px] font-mono font-bold text-slate-200 border border-slate-600 transition-all cursor-pointer"
            title="Switch Game"
          >
            <span>☰</span>
            <span>GAMES (5)</span>
          </button>

          <span className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-1">
            <span>{activeGame.icon}</span>
            <span>{activeGame.title}</span>
          </span>

          <div className="flex items-center gap-3">
            {activeGame.id === 'breakout' && (
              <span className="text-xs text-rose-400 font-bold">
                {'❤️'.repeat(lives)}
              </span>
            )}
            <span className="font-mono text-xs font-bold text-amber-300">
              SCORE: {score}
            </span>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODE 4: REAL GAME OVER SCREEN (WHEN THEY ARE OUT, THEY ARE OUT!)
          ============================================================== */}
      {consoleMode === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-[2px] p-4 pointer-events-auto animate-fade-in">
          <div className="bg-[#1C1215]/95 border-2 border-rose-500 rounded-xl p-4 shadow-2xl flex flex-col items-center gap-2 max-w-sm w-full text-center">
            
            <span className="text-rose-400 font-black text-sm tracking-widest uppercase flex items-center gap-1.5">
              <span>💥</span> YOU ARE OUT! GAME OVER
            </span>

            <p className="text-xs text-slate-300 font-bold font-mono">
              {defeatReason}
            </p>

            <div className="flex items-center justify-center gap-4 py-1.5 px-4 rounded-lg bg-black/50 border border-slate-800 w-full text-xs font-mono">
              <span className="text-slate-300">SCORE: <strong className="text-white">{score}</strong></span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300">BEST: <strong>{highScores[activeGame.id] || score}</strong></span>
            </div>

            <div className="flex items-center gap-2 pt-1 w-full justify-center">
              <button
                onClick={startPlay}
                className="bg-rose-500 hover:bg-rose-400 text-white font-black text-xs px-5 py-2 rounded-lg font-mono tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(244,63,94,0.6)] active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>🔄</span> PLAY AGAIN
              </button>
              <button
                onClick={openSelect}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg font-mono font-bold uppercase transition-all border border-slate-700 cursor-pointer"
              >
                SELECT GAME
              </button>
            </div>

            <span className="text-[10px] text-slate-400">
              Press Joystick Cross ✖ or Space to restart instantly!
            </span>

          </div>
        </div>
      )}

    </div>
  );
}
