import React, { useState, useEffect, useRef } from 'react';
import { hudAudio } from './AudioEngine';

/**
 * PlayableArcadeConsole
 * 
 * 5-in-1 Classroom Chalkboard Multi-Game Arcade Engine:
 * 1. 🏎️ SPEEDWAY (Car Highway Racing)
 * 2. 👾 GALAXY (Space Invader Blaster)
 * 3. 🧱 BREAKOUT (Brick Buster Paddle)
 * 4. 🐍 SNAKE (Retro Serpent Fruit Eater)
 * 5. 🥷 SHINOBI (Ninja Rooftop Jump)
 */
export const ARCADE_GAMES = [
  {
    id: 'racer',
    icon: '🏎️',
    name: 'SPEEDWAY',
    title: 'MISCREANT SPEEDWAY',
    color: '#38BDF8',
    controls: '◀ / ▶ Steer • ▲ Boost • ▼ Brake'
  },
  {
    id: 'invaders',
    icon: '👾',
    name: 'GALAXY',
    title: 'GALAXY BLAST',
    color: '#FB7185',
    controls: '◀ / ▶ Move • ▲ Fire Lasers'
  },
  {
    id: 'breakout',
    icon: '🧱',
    name: 'BREAKOUT',
    title: 'CHALK BREAKOUT',
    color: '#FDE047',
    controls: '◀ / ▶ Paddle Deflect Ball'
  },
  {
    id: 'snake',
    icon: '🐍',
    name: 'SNAKE',
    title: 'CYBER SNAKE',
    color: '#34D399',
    controls: '▲ ▼ ◀ ▶ Navigate Grid'
  },
  {
    id: 'runner',
    icon: '🥷',
    name: 'SHINOBI',
    title: 'SHINOBI JUMP',
    color: '#A78BFA',
    controls: '▲ Jump • ▼ Slide Spikes'
  }
];

export default function PlayableArcadeConsole({ externalControl = null }) {
  const canvasRef = useRef(null);

  // States: 'preview' (auto-cycle 2s) | 'select' (choose game) | 'playing' (active game)
  const [consoleMode, setConsoleMode] = useState('preview');
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Mutable ref for 60 FPS animation loop
  const aRef = useRef({
    mode: 'preview',
    gameId: 'racer',
    score: 0,

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
      aliens: [],
      alienDir: 1,
      alienStepTimer: 0,
      lastShot: 0
    },

    // 3. BREAKOUT
    breakout: {
      paddleX: 252,
      paddleW: 76,
      ballX: 252,
      ballY: 180,
      ballVx: 3.2,
      ballVy: -3.6,
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

  // Reset/Initialize state for any game
  const initGame = (id) => {
    const a = aRef.current;
    a.score = 0;
    setScore(0);

    if (id === 'racer') {
      a.racer.carLane = 1;
      a.racer.carX = 252;
      a.racer.targetX = 252;
      a.racer.speed = 7.0;
      a.racer.enemies = [
        { x: 96, y: 60, speed: 4.5, color: '#EF4444' },
        { x: 408, y: 150, speed: 4.0, color: '#3B82F6' }
      ];
    } else if (id === 'invaders') {
      a.invaders.shipX = 252;
      a.invaders.bullets = [];
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
      a.breakout.ballVx = 3.2 * (Math.random() > 0.5 ? 1 : -1);
      a.breakout.ballVy = -3.6;
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
    }, 2000); // Exact 2.0 seconds auto-cycle

    return () => clearInterval(interval);
  }, [consoleMode]);

  // Open Select Mode
  const openSelect = () => {
    hudAudio.playOpen();
    setConsoleMode('select');
    aRef.current.mode = 'select';
  };

  // Switch Game in Select Mode (live background updates)
  const selectGame = (index) => {
    hudAudio.playClick();
    setActiveGameIndex(index);
    aRef.current.gameId = ARCADE_GAMES[index].id;
    initGame(ARCADE_GAMES[index].id);
  };

  // Start Playing
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

    if (consoleMode === 'preview') {
      openSelect();
      return;
    }

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

    // In Playing Mode:
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
      const isAuto = consoleMode === 'preview' || consoleMode === 'select';

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
      // 1. GAME 1: SPEEDWAY DODGE
      // ==============================================================
      if (a.gameId === 'racer') {
        const lanePositions = [96, 252, 408];

        a.racer.roadOffset = (a.racer.roadOffset + a.racer.speed) % 36;
        for (let s = -2; s < 18; s++) {
          const y = s * 18 + (a.racer.roadOffset % 18);
          const isAlt = Math.floor((s * 18 + a.racer.roadOffset) / 18) % 2 === 0;
          ctx.fillStyle = isAlt ? '#EF4444' : '#0284C7';
          ctx.fillRect(0, y, 16, 18);
          ctx.fillRect(488, y, 16, 18);
        }

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

        if (isAuto) {
          const threat = a.racer.enemies.find((e) => e.y > 60 && e.y < 220 && Math.abs(e.x - a.racer.carX) < 70);
          if (threat) {
            a.racer.carLane = threat.x > 252 ? 0 : 2;
          }
        }

        a.racer.targetX = lanePositions[a.racer.carLane];
        a.racer.carX += (a.racer.targetX - a.racer.carX) * 0.22;
        const diffX = a.racer.targetX - a.racer.carX;
        a.racer.tilt = Math.max(-0.25, Math.min(0.25, diffX * 0.006));

        if (timestamp - a.racer.lastSpawn > 1100) {
          a.racer.lastSpawn = timestamp;
          const rLane = Math.floor(Math.random() * 3);
          a.racer.enemies.push({
            x: lanePositions[rLane],
            y: -60,
            speed: 3 + Math.random() * 2.5,
            color: rLane === 0 ? '#EF4444' : rLane === 1 ? '#3B82F6' : '#10B981'
          });
        }

        for (let i = a.racer.enemies.length - 1; i >= 0; i--) {
          const e = a.racer.enemies[i];
          e.y += e.speed + a.racer.speed * 0.45;
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

          if (e.y > 340) {
            a.racer.enemies.splice(i, 1);
            if (!isAuto) a.score += 20;
          }
        }

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

      // ==============================================================
      // 2. GAME 2: GALAXY BLAST
      // ==============================================================
      else if (a.gameId === 'invaders') {
        const inv = a.invaders;

        for (let st = 0; st < 30; st++) {
          const sx = (st * 73 + timestamp * 0.05) % 504;
          const sy = (st * 47 + timestamp * 0.1) % 298;
          ctx.fillStyle = st % 2 === 0 ? '#FDE047' : '#FFFFFF';
          ctx.fillRect(sx, sy, 2, 2);
        }

        if (timestamp - inv.alienStepTimer > 400) {
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
            inv.aliens.forEach((al) => (al.y += 10));
          }
        }

        if (isAuto) {
          const nearestAlien = inv.aliens.find((al) => al.alive && Math.abs(al.x - inv.shipX) < 40);
          if (nearestAlien) {
            if (timestamp - inv.lastShot > 350) {
              inv.lastShot = timestamp;
              inv.bullets.push({ x: inv.shipX, y: 240 });
            }
          } else {
            inv.shipX += Math.sin(timestamp * 0.004) * 2.2;
          }
        }

        for (let b = inv.bullets.length - 1; b >= 0; b--) {
          const blt = inv.bullets[b];
          blt.y -= 7;
          ctx.fillStyle = '#34D399';
          ctx.fillRect(blt.x - 2, blt.y - 8, 4, 12);

          for (let al of inv.aliens) {
            if (al.alive && Math.abs(al.x - blt.x) < 18 && Math.abs(al.y - blt.y) < 16) {
              al.alive = false;
              inv.bullets.splice(b, 1);
              if (!isAuto) a.score += 50;
              break;
            }
          }
          if (blt.y < 0) inv.bullets.splice(b, 1);
        }

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

      // ==============================================================
      // 3. GAME 3: CHALK BREAKOUT
      // ==============================================================
      else if (a.gameId === 'breakout') {
        const brk = a.breakout;

        brk.ballX += brk.ballVx;
        brk.ballY += brk.ballVy;

        if (brk.ballX < 12 || brk.ballX > 492) brk.ballVx *= -1;
        if (brk.ballY < 12) brk.ballVy *= -1;

        if (isAuto) {
          brk.paddleX += (brk.ballX - brk.paddleX) * 0.18;
        }

        const paddleY = 260;
        if (
          brk.ballY >= paddleY - 8 &&
          brk.ballY <= paddleY + 12 &&
          brk.ballX >= brk.paddleX - brk.paddleW / 2 &&
          brk.ballX <= brk.paddleX + brk.paddleW / 2
        ) {
          brk.ballVy = -Math.abs(brk.ballVy);
          const hitOffset = (brk.ballX - brk.paddleX) / (brk.paddleW / 2);
          brk.ballVx = hitOffset * 4.2;
        }

        if (brk.ballY > 290) {
          brk.ballX = 252;
          brk.ballY = 180;
          brk.ballVy = -3.8;
        }

        for (let b of brk.bricks) {
          if (b.alive) {
            if (
              brk.ballX > b.x &&
              brk.ballX < b.x + b.w &&
              brk.ballY > b.y &&
              brk.ballY < b.y + b.h
            ) {
              b.alive = false;
              brk.ballVy *= -1;
              if (!isAuto) a.score += 30;
              break;
            }
          }
        }

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

        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.roundRect(brk.paddleX - brk.paddleW / 2, paddleY, brk.paddleW, 12, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FDE047';
        ctx.beginPath();
        ctx.arc(brk.ballX, brk.ballY, 6.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==============================================================
      // 4. GAME 4: CYBER SNAKE
      // ==============================================================
      else if (a.gameId === 'snake') {
        const snk = a.snake;
        const cell = 20;

        if (isAuto) {
          const head = snk.body[0];
          if (head.x < snk.food.x && snk.dir.x !== -1) snk.dir = { x: 1, y: 0 };
          else if (head.x > snk.food.x && snk.dir.x !== 1) snk.dir = { x: -1, y: 0 };
          else if (head.y < snk.food.y && snk.dir.y !== -1) snk.dir = { x: 0, y: 1 };
          else if (head.y > snk.food.y && snk.dir.y !== 1) snk.dir = { x: 0, y: -1 };
        }

        if (timestamp - snk.stepTimer > 120) {
          snk.stepTimer = timestamp;
          const head = snk.body[0];
          const newHead = {
            x: (head.x + snk.dir.x + 24) % 24,
            y: (head.y + snk.dir.y + 14) % 14
          };

          snk.body.unshift(newHead);

          if (newHead.x === snk.food.x && newHead.y === snk.food.y) {
            snk.food = {
              x: Math.floor(Math.random() * 22) + 1,
              y: Math.floor(Math.random() * 12) + 1
            };
            if (!isAuto) a.score += 40;
          } else {
            snk.body.pop();
          }
        }

        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.arc(snk.food.x * cell + 10, snk.food.y * cell + 10, 7, 0, Math.PI * 2);
        ctx.fill();

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
      // 5. GAME 5: SHINOBI JUMP
      // ==============================================================
      else if (a.gameId === 'runner') {
        const run = a.runner;
        const groundY = 240;

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

        for (let o = run.obstacles.length - 1; o >= 0; o--) {
          const obs = run.obstacles[o];
          obs.x -= 5.5;

          if (isAuto && obs.x > 80 && obs.x < 150) {
            if (obs.type === 'spike' && !run.isJumping) {
              run.isJumping = true;
              run.shinobiVy = -11;
            } else if (obs.type === 'blade' && !run.isSliding) {
              run.isSliding = true;
              run.slideTimer = 30;
            }
          }

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
            if (!isAuto) a.score += 25;
          }
        }

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(504, groundY);
        ctx.stroke();

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
            
            {/* Top Auto-Cycle Telemetry */}
            <span className="font-sans font-black text-[11px] text-[#86EFAC] tracking-wider flex items-center gap-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AUTO PREVIEW (2s) • {activeGame.icon} {activeGame.name}
            </span>

            {/* Main Action Button */}
            <button
              onClick={openSelect}
              className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-lg font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.7)] active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>⚡</span> ARE YOU READY, GAMER?
            </button>

            {/* Subtitle */}
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
            
            {/* Header */}
            <span className="font-sans font-black text-xs text-[#86EFAC] tracking-wider uppercase flex items-center gap-1.5">
              <span>🕹️</span> SELECT YOUR GAME:
            </span>

            {/* 5 Compact Game Buttons */}
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

            {/* Start Button */}
            <button
              onClick={startPlay}
              className="bg-[#10B981] hover:bg-[#059669] text-slate-950 font-black text-xs sm:text-sm px-6 py-2 rounded-lg font-mono tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.7)] active:scale-95 cursor-pointer flex items-center gap-1.5 mt-1"
            >
              <span>▶</span> START {activeGame.title}
            </button>

            {/* Controls Info */}
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
          MODE 3: PLAYING HUD (Clean Top Bar)
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

          <span className="font-mono text-xs font-bold text-amber-300">
            SCORE: {score}
          </span>
        </div>
      )}

    </div>
  );
}
