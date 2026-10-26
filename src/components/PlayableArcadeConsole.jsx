import React, { useState, useEffect, useRef } from 'react';
import { hudAudio } from './AudioEngine';

/**
 * PlayableArcadeConsole
 * 
 * 5-in-1 Classroom Chalkboard Multi-Game Arcade Engine:
 * 1. SPEEDWAY DODGE (3-lane Car Highway Racer)
 * 2. GALAXY INVADERS (Retro Space Bug Shooter)
 * 3. CHALK BREAKOUT (Paddle & Bouncing Brick Buster)
 * 4. CYBER SNAKE (Retro Serpent Fruit Eater)
 * 5. SHINOBI DASH (Side-Scrolling Jump & Slide Runner)
 * 
 * Modes:
 * - 'preview': Auto-plays each game in sequence for 2 seconds with live AI demo.
 *              Shows "[ ⚡ ARE YOU READY, GAMER? ]" prompt.
 * - 'select':  Arcade cabinet game carousel to choose your game.
 * - 'playing': 60 FPS interactive gameplay using the joystick battlestation!
 */
export const ARCADE_GAMES = [
  {
    id: 'racer',
    title: 'SPEEDWAY DODGE',
    badge: 'CAR RACING',
    color: '#38BDF8',
    controls: '◀ / ▶ Steer • ▲ Boost • ▼ Brake',
    desc: 'Dodge high-speed oncoming traffic at 128 MPH!'
  },
  {
    id: 'invaders',
    title: 'GALAXY INVADERS',
    badge: 'SPACE SHOOTER',
    color: '#FB7185',
    controls: '◀ / ▶ Move • ▲ Shoot / Auto-Fire',
    desc: 'Blast descending alien swarms with laser cannons!'
  },
  {
    id: 'breakout',
    title: 'CHALK BREAKOUT',
    badge: 'BRICK BUSTER',
    color: '#FDE047',
    controls: '◀ / ▶ Move Paddle • Deflect Ball',
    desc: 'Smash every chalk brick on the slate board!'
  },
  {
    id: 'snake',
    title: 'CYBER SNAKE',
    badge: 'RETRO SERPENT',
    color: '#34D399',
    controls: '▲ ▼ ◀ ▶ Navigate 4 Directions',
    desc: 'Eat glowing power orbs and grow your serpent!'
  },
  {
    id: 'runner',
    title: 'SHINOBI DASH',
    badge: 'ACTION RUNNER',
    color: '#A78BFA',
    controls: '▲ Jump • ▼ Slide • Dodge Spikes',
    desc: 'Sprint through rooftops, leap spikes, and survive!'
  }
];

export default function PlayableArcadeConsole({ externalControl = null }) {
  const canvasRef = useRef(null);

  // High-level mode: 'preview' | 'select' | 'playing'
  const [consoleMode, setConsoleMode] = useState('preview');
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState({
    racer: 1480,
    invaders: 2400,
    breakout: 850,
    snake: 340,
    runner: 920
  });

  // Reference for 60 FPS animation loop without React state lag
  const aRef = useRef({
    mode: 'preview', // 'preview' | 'playing'
    gameId: 'racer',
    previewTimer: 0,
    previewGameIndex: 0,
    score: 0,
    highScore: 1480,

    // 1. RACER STATE
    racer: {
      carLane: 1, // 0, 1, 2
      carX: 252,
      targetX: 252,
      tilt: 0,
      speed: 7.0,
      roadOffset: 0,
      enemies: [],
      lastSpawn: 0,
      particles: []
    },

    // 2. INVADERS STATE
    invaders: {
      shipX: 252,
      bullets: [],
      aliens: [],
      alienDir: 1,
      alienStepTimer: 0,
      lastShot: 0,
      particles: []
    },

    // 3. BREAKOUT STATE
    breakout: {
      paddleX: 252,
      paddleW: 76,
      ballX: 252,
      ballY: 180,
      ballVx: 3.2,
      ballVy: -3.6,
      bricks: [],
      particles: []
    },

    // 4. SNAKE STATE
    snake: {
      body: [{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }],
      dir: { x: 1, y: 0 },
      food: { x: 16, y: 7 },
      stepTimer: 0,
      gridW: 24,
      gridH: 14
    },

    // 5. RUNNER STATE
    runner: {
      shinobiY: 220,
      shinobiVy: 0,
      isJumping: false,
      isSliding: false,
      slideTimer: 0,
      obstacles: [],
      lastObstacle: 0,
      groundOffset: 0,
      particles: []
    }
  });

  // Auto-Cycle 2 Seconds for each game preview in attract mode
  useEffect(() => {
    if (consoleMode !== 'preview') return;
    const interval = setInterval(() => {
      setActiveGameIndex((prev) => {
        const next = (prev + 1) % ARCADE_GAMES.length;
        aRef.current.gameId = ARCADE_GAMES[next].id;
        aRef.current.previewGameIndex = next;
        initGame(ARCADE_GAMES[next].id, true);
        return next;
      });
    }, 2000); // Exact 2 seconds per game preview!

    return () => clearInterval(interval);
  }, [consoleMode]);

  // Initialize specific game states
  const initGame = (id, isPreview = false) => {
    const a = aRef.current;
    a.score = 0;
    setScore(0);

    if (id === 'racer') {
      a.racer.carLane = 1;
      a.racer.carX = 252;
      a.racer.targetX = 252;
      a.racer.speed = 7.5;
      a.racer.enemies = [
        { x: 96, y: 80, speed: 4.5, color: '#EF4444' },
        { x: 408, y: 160, speed: 4.0, color: '#3B82F6' }
      ];
      a.racer.particles = [];
    } else if (id === 'invaders') {
      a.invaders.shipX = 252;
      a.invaders.bullets = [];
      a.invaders.particles = [];
      a.invaders.aliens = [];
      const rows = 3;
      const cols = 8;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          a.invaders.aliens.push({
            x: 80 + c * 44,
            y: 40 + r * 28,
            alive: true,
            color: r === 0 ? '#FB7185' : r === 1 ? '#FDE047' : '#38BDF8'
          });
        }
      }
    } else if (id === 'breakout') {
      a.breakout.paddleX = 252;
      a.breakout.ballX = 252;
      a.breakout.ballY = 190;
      a.breakout.ballVx = 3.2 * (Math.random() > 0.5 ? 1 : -1);
      a.breakout.ballVy = -3.8;
      a.breakout.particles = [];
      a.breakout.bricks = [];
      const bRows = 4;
      const bCols = 9;
      const colors = ['#FB7185', '#FDE047', '#34D399', '#38BDF8'];
      for (let r = 0; r < bRows; r++) {
        for (let c = 0; c < bCols; c++) {
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
      a.runner.shinobiY = 220;
      a.runner.shinobiVy = 0;
      a.runner.isJumping = false;
      a.runner.isSliding = false;
      a.runner.particles = [];
      a.runner.obstacles = [
        { x: 380, type: 'spike', w: 20, h: 26 },
        { x: 580, type: 'blade', w: 24, h: 22, y: 195 }
      ];
    }
  };

  // Open Game Selector Menu
  const openGameSelect = () => {
    hudAudio.playOpen();
    setConsoleMode('select');
    aRef.current.mode = 'select';
  };

  // Start selected game
  const startGame = (index) => {
    hudAudio.playClick();
    const game = ARCADE_GAMES[index];
    setActiveGameIndex(index);
    aRef.current.gameId = game.id;
    aRef.current.mode = 'playing';
    setConsoleMode('playing');
    initGame(game.id, false);
  };

  // Handle external controls from Joystick / D-Pad
  useEffect(() => {
    if (!externalControl) return;
    const action = typeof externalControl === 'object' ? externalControl.action : externalControl;
    const a = aRef.current;

    // In preview mode: ANY input prompts them to select/play!
    if (consoleMode === 'preview') {
      openGameSelect();
      return;
    }

    // In select mode: Navigate through carousel
    if (consoleMode === 'select') {
      if (action === 'left') {
        setSelectedMenuIndex((prev) => (prev > 0 ? prev - 1 : ARCADE_GAMES.length - 1));
      } else if (action === 'right') {
        setSelectedMenuIndex((prev) => (prev < ARCADE_GAMES.length - 1 ? prev + 1 : 0));
      } else if (['boost', 'brake', 'restart', 'up', 'down'].includes(action)) {
        startGame(selectedMenuIndex);
      }
      return;
    }

    // In playing mode: Route action to current active game!
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
        // Fire laser
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (consoleMode === 'preview') {
        openGameSelect();
        return;
      }
      if (consoleMode === 'select') {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          setSelectedMenuIndex((prev) => (prev > 0 ? prev - 1 : ARCADE_GAMES.length - 1));
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          setSelectedMenuIndex((prev) => (prev < ARCADE_GAMES.length - 1 ? prev + 1 : 0));
        } else if (e.code === 'Enter' || e.code === 'Space') {
          startGame(selectedMenuIndex);
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
  }, [consoleMode, selectedMenuIndex]);

  // Main 60 FPS Canvas Game Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    initGame(ARCADE_GAMES[0].id, true);

    const loop = (timestamp) => {
      const a = aRef.current;
      const isAuto = consoleMode === 'preview';

      // Clear Canvas Screen (504 x 298 Widescreen Monitor)
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
      // 1. GAME 1: SPEEDWAY DODGE (Car Highway Racing)
      // ==============================================================
      if (a.gameId === 'racer') {
        const lanePositions = [96, 252, 408];

        // Kerbs
        a.racer.roadOffset = (a.racer.roadOffset + a.racer.speed) % 36;
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

        // Autopilot AI for preview mode
        if (isAuto) {
          const threat = a.racer.enemies.find((e) => e.y > 60 && e.y < 220 && Math.abs(e.x - a.racer.carX) < 70);
          if (threat) {
            a.racer.carLane = threat.x > 252 ? 0 : 2;
          }
        }

        // Player Car
        a.racer.targetX = lanePositions[a.racer.carLane];
        a.racer.carX += (a.racer.targetX - a.racer.carX) * 0.22;
        const diffX = a.racer.targetX - a.racer.carX;
        a.racer.tilt = Math.max(-0.25, Math.min(0.25, diffX * 0.006));

        // Spawn oncoming cars
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

        // Draw enemies
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

        // Draw Player Car
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
        // Windshield
        ctx.fillStyle = '#67E8F9';
        ctx.fillRect(-11, -12, 22, 12);
        ctx.restore();
      }

      // ==============================================================
      // 2. GAME 2: GALAXY INVADERS (Space Bug Shooter)
      // ==============================================================
      else if (a.gameId === 'invaders') {
        const inv = a.invaders;

        // Space Stars
        for (let st = 0; st < 30; st++) {
          const sx = (st * 73 + timestamp * 0.05) % 504;
          const sy = (st * 47 + timestamp * 0.1) % 298;
          ctx.fillStyle = st % 2 === 0 ? '#FDE047' : '#FFFFFF';
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Aliens Movement
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

        // Auto-pilot logic for preview
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

        // Bullets
        for (let b = inv.bullets.length - 1; b >= 0; b--) {
          const blt = inv.bullets[b];
          blt.y -= 7;
          ctx.fillStyle = '#34D399';
          ctx.fillRect(blt.x - 2, blt.y - 8, 4, 12);

          // Check hit aliens
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

        // Draw Aliens
        inv.aliens.forEach((al) => {
          if (al.alive) {
            ctx.fillStyle = al.color;
            ctx.beginPath();
            ctx.arc(al.x, al.y, 9, 0, Math.PI * 2);
            ctx.fill();
            // Alien antennae
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
        // Cockpit
        ctx.fillStyle = '#FDE047';
        ctx.fillRect(inv.shipX - 3, 242, 6, 8);
      }

      // ==============================================================
      // 3. GAME 3: CHALK BREAKOUT (Paddle & Brick Buster)
      // ==============================================================
      else if (a.gameId === 'breakout') {
        const brk = a.breakout;

        // Ball movement
        brk.ballX += brk.ballVx;
        brk.ballY += brk.ballVy;

        // Wall collisions
        if (brk.ballX < 12 || brk.ballX > 492) brk.ballVx *= -1;
        if (brk.ballY < 12) brk.ballVy *= -1;

        // Autopilot AI for preview
        if (isAuto) {
          brk.paddleX += (brk.ballX - brk.paddleX) * 0.18;
        }

        // Paddle collision
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

        // Bottom reset
        if (brk.ballY > 290) {
          brk.ballX = 252;
          brk.ballY = 180;
          brk.ballVy = -3.8;
        }

        // Brick collision
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
        ctx.roundRect(brk.paddleX - brk.paddleW / 2, paddleY, brk.paddleW, 12, 5);
        ctx.fill();
        ctx.stroke();

        // Draw Bouncing Ball
        ctx.fillStyle = '#FDE047';
        ctx.beginPath();
        ctx.arc(brk.ballX, brk.ballY, 6.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==============================================================
      // 4. GAME 4: CYBER SNAKE (Retro Serpent Fruit Eater)
      // ==============================================================
      else if (a.gameId === 'snake') {
        const snk = a.snake;
        const cell = 20;

        // Auto pilot for preview
        if (isAuto) {
          const head = snk.body[0];
          if (head.x < snk.food.x && snk.dir.x !== -1) snk.dir = { x: 1, y: 0 };
          else if (head.x > snk.food.x && snk.dir.x !== 1) snk.dir = { x: -1, y: 0 };
          else if (head.y < snk.food.y && snk.dir.y !== -1) snk.dir = { x: 0, y: 1 };
          else if (head.y > snk.food.y && snk.dir.y !== 1) snk.dir = { x: 0, y: -1 };
        }

        // Step movement
        if (timestamp - snk.stepTimer > 120) {
          snk.stepTimer = timestamp;
          const head = snk.body[0];
          const newHead = {
            x: (head.x + snk.dir.x + snk.gridW) % snk.gridW,
            y: (head.y + snk.dir.y + snk.gridH) % snk.gridH
          };

          snk.body.unshift(newHead);

          // Check food
          if (newHead.x === snk.food.x && newHead.y === snk.food.y) {
            snk.food = {
              x: Math.floor(Math.random() * (snk.gridW - 2)) + 1,
              y: Math.floor(Math.random() * (snk.gridH - 2)) + 1
            };
            if (!isAuto) a.score += 40;
          } else {
            snk.body.pop();
          }
        }

        // Draw Food
        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.arc(snk.food.x * cell + 10, snk.food.y * cell + 10, 7, 0, Math.PI * 2);
        ctx.fill();

        // Draw Snake
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
      // 5. GAME 5: SHINOBI DASH (Side-Scrolling Jump & Slide Runner)
      // ==============================================================
      else if (a.gameId === 'runner') {
        const run = a.runner;
        const groundY = 240;

        // Physics
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

        // Ground scroll
        run.groundOffset = (run.groundOffset + 5) % 24;

        // Obstacles
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

        // Move obstacles
        for (let o = run.obstacles.length - 1; o >= 0; o--) {
          const obs = run.obstacles[o];
          obs.x -= 5.5;

          // Autopilot for preview
          if (isAuto && obs.x > 80 && obs.x < 150) {
            if (obs.type === 'spike' && !run.isJumping) {
              run.isJumping = true;
              run.shinobiVy = -11;
            } else if (obs.type === 'blade' && !run.isSliding) {
              run.isSliding = true;
              run.slideTimer = 30;
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
            // Rotating blade
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

        // Ground Line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(504, groundY);
        ctx.stroke();

        // Draw Running Shinobi
        ctx.save();
        ctx.translate(90, run.shinobiY);
        if (run.isSliding) {
          ctx.fillStyle = '#A78BFA';
          ctx.beginPath();
          ctx.ellipse(0, 10, 18, 7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Shinobi Body
          ctx.fillStyle = '#A78BFA';
          ctx.beginPath();
          ctx.roundRect(-8, -16, 16, 28, 4);
          ctx.fill();
          // Headband trail
          ctx.strokeStyle = '#FDE047';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(-6, -12);
          ctx.lineTo(-24, -10 + Math.sin(timestamp * 0.02) * 5);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ==============================================================
      // OVERLAY HUD: Scanlines, Game Title, Live Telemetry
      // ==============================================================
      if (!isAuto) {
        setScore(a.score);
        // Play HUD Bar
        ctx.fillStyle = 'rgba(15, 33, 22, 0.85)';
        ctx.fillRect(0, 0, 504, 28);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = "bold 11px 'JetBrains Mono', monospace";
        ctx.fillText(`GAME: ${ARCADE_GAMES.find((g) => g.id === a.gameId)?.title}`, 12, 18);
        ctx.fillStyle = '#FDE047';
        ctx.fillText(`SCORE: ${a.score}`, 400, 18);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [consoleMode]);

  const activeGame = ARCADE_GAMES[activeGameIndex];

  return (
    <div className="relative w-full h-full select-none overflow-hidden font-sans">
      
      {/* Background 60 FPS HTML5 Canvas Screen */}
      <canvas
        ref={canvasRef}
        width={504}
        height={298}
        className="w-full h-full object-cover block"
      />

      {/* ==============================================================
          MODE 1: AUTO-PLAY ATTRACT PREVIEW (Cycles every 2 seconds)
          ============================================================== */}
      {consoleMode === 'preview' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-3 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-auto">
          
          {/* Top Bar: Preview Telemetry Badge */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono font-bold tracking-wider">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-400/50 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              AUTO-CYCLE PREVIEW (2s)
            </span>
            <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-600 text-slate-300">
              GAME {activeGameIndex + 1}/5: {activeGame.title}
            </span>
          </div>

          {/* Center Call-to-Action: "ARE YOU READY, GAMER?" */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={openGameSelect}
              className="group relative px-6 py-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black font-bebas text-2xl sm:text-3xl tracking-widest uppercase shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:scale-105 active:scale-95 transition-all border border-white/60 animate-pulse"
            >
              <span className="flex items-center gap-2">
                <span>⚡ ARE YOU READY, GAMER?</span>
              </span>
            </button>
            <p className="text-[11px] font-mono text-slate-200 bg-black/75 px-3 py-1 rounded-full border border-slate-700/80 shadow">
              Click button or press any joystick control to select game!
            </p>
          </div>

          {/* Bottom Controls Legend */}
          <div className="text-[10px] font-mono text-slate-300 bg-black/60 px-3 py-0.5 rounded-full border border-slate-700/60">
            {activeGame.controls}
          </div>

        </div>
      )}

      {/* ==============================================================
          MODE 2: ARCADE GAME SELECTION CAROUSEL
          ============================================================== */}
      {consoleMode === 'select' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-between p-4 bg-[#0d1d13]/95 backdrop-blur-md text-white pointer-events-auto">
          
          {/* Header */}
          <div className="text-center space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              ★ MISCREANT 128Hz ARCADE SUITE ★
            </span>
            <h4 className="font-bebas text-2xl sm:text-3xl tracking-wider text-white">
              SELECT YOUR GAME
            </h4>
          </div>

          {/* Horizontal Game Selector Pills */}
          <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-1">
            {ARCADE_GAMES.map((game, idx) => {
              const isSelected = idx === selectedMenuIndex;
              return (
                <button
                  key={game.id}
                  onClick={() => {
                    setSelectedMenuIndex(idx);
                    hudAudio.playClick();
                  }}
                  className={`px-3 py-2 rounded-xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#183625] border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-[#102318] border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold block" style={{ color: game.color }}>
                    {game.badge}
                  </span>
                  <span className="font-bebas text-sm sm:text-base leading-tight block text-white">
                    {game.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Game Card Detail */}
          <div className="w-full max-w-sm p-3 rounded-xl bg-black/50 border border-slate-700 flex flex-col items-center text-center space-y-1">
            <p className="text-xs text-slate-300 font-medium">
              {ARCADE_GAMES[selectedMenuIndex].desc}
            </p>
            <span className="text-[10px] font-mono text-amber-300">
              {ARCADE_GAMES[selectedMenuIndex].controls}
            </span>
          </div>

          {/* Play Start Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => startGame(selectedMenuIndex)}
              className="px-8 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bebas text-2xl tracking-wider uppercase font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.8)] active:scale-95 cursor-pointer"
            >
              ▶ START GAME
            </button>
            <button
              onClick={() => setConsoleMode('preview')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold uppercase transition-all border border-slate-700"
            >
              Demo Mode
            </button>
          </div>

        </div>
      )}

      {/* ==============================================================
          MODE 3: PLAYING HUD & CONTROLS OVERLAY
          ============================================================== */}
      {consoleMode === 'playing' && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={openGameSelect}
            className="px-2.5 py-1 rounded bg-black/75 hover:bg-black text-[10px] font-mono font-bold text-slate-300 hover:text-white border border-slate-600 transition-all cursor-pointer"
            title="Switch Game"
          >
            ☰ SWITCH GAME
          </button>
        </div>
      )}

    </div>
  );
}