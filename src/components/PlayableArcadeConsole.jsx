import React, { useState, useEffect, useRef } from 'react';
import { hudAudio } from './AudioEngine';

/**
 * PlayableArcadeConsole
 * 
 * 5-in-1 Classroom Chalkboard Multi-Game Arcade Engine:
 * - 60+ FPS Delta-Time Normalization across all refresh rates (60Hz, 120Hz, 144Hz+)
 * - Continuous Analog Steering & Sub-Pixel Smooth Movement (No stutter or discrete jumps)
 * - True Key Holding & Analog Joystick Sensitivity
 * - Fluid Interpolated Snake Slither, Dynamic Particle Physics, Comet Trails & Organic Squadron Waves
 * - REAL GAMEPLAY & REAL GAME OVER:
 *   1. 🏎️ SPEEDWAY DODGE (Analog steering, velocity lerp, traffic crash)
 *   2. 👾 GALAXY BLAST (Continuous strafing, fluid alien wave, plasma bombs)
 *   3. 🧱 CHALK BREAKOUT (Smooth paddle glide, comet tail ball physics, 3 lives)
 *   4. 🐍 CYBER SNAKE (Continuous sub-step interpolation, wall & tail collision)
 *   5. 🥷 SHINOBI JUMP (Variable jump physics, animated running legs, cloth scarf, obstacles)
 */
export const ARCADE_GAMES = [
  {
    id: 'racer',
    icon: '🏎️',
    name: 'SPEEDWAY',
    title: 'SPEEDWAY DODGE',
    color: '#38BDF8',
    controls: '◀ / ▶ Analog Steer • ▲ Boost • ▼ Brake',
    defeatMsg: 'CRASHED AT 138 MPH!'
  },
  {
    id: 'invaders',
    icon: '👾',
    name: 'GALAXY',
    title: 'GALAXY BLAST',
    color: '#FB7185',
    controls: '◀ / ▶ Glide • ▲ / Space Rapid Lasers',
    defeatMsg: 'SHIP DESTROYED BY ALIEN FIRE!'
  },
  {
    id: 'breakout',
    icon: '🧱',
    name: 'BREAKOUT',
    title: 'CHALK BREAKOUT',
    color: '#FDE047',
    controls: '◀ / ▶ Glide Paddle • Spin Deflect',
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
    controls: '▲ Jump (Hold for High) • ▼ Slide',
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
    racer: 1680,
    invaders: 2850,
    breakout: 740,
    snake: 420,
    runner: 960
  });

  // Continuous live input state (tracks held keys and analog stick without OS key-repeat stutter)
  const inputRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
    fire: false,
    analogX: 0,
    analogY: 0
  });

  // Mutable state ref for 60+ FPS physics engine
  const aRef = useRef({
    mode: 'preview',
    gameId: 'racer',
    score: 0,
    lives: 3,
    shake: 0,
    particles: [],

    // 1. RACER (Speedway Dodge)
    racer: {
      carX: 252,
      carVx: 0,
      tilt: 0,
      speed: 7.5,
      targetSpeed: 7.5,
      roadOffset: 0,
      enemies: [],
      lastSpawn: 0,
      smokeTimer: 0
    },

    // 2. INVADERS (Galaxy Blast)
    invaders: {
      shipX: 252,
      shipVx: 0,
      shipTilt: 0,
      bullets: [],
      alienBombs: [],
      aliens: [],
      swarmX: 60,
      swarmY: 40,
      swarmDir: 1,
      lastBombSpawn: 0,
      lastFireTime: 0
    },

    // 3. BREAKOUT (Chalk Breakout)
    breakout: {
      paddleX: 252,
      paddleVx: 0,
      paddleW: 82,
      ballX: 252,
      ballY: 180,
      ballVx: 3.5,
      ballVy: -4.0,
      ballTrail: [],
      bricks: []
    },

    // 4. SNAKE (Cyber Snake)
    snake: {
      // Each segment stores both previous grid and current grid for sub-step lerp
      body: [
        { fromX: 11, fromY: 7, toX: 12, toY: 7 },
        { fromX: 10, fromY: 7, toX: 11, toY: 7 },
        { fromX: 9, fromY: 7, toX: 10, toY: 7 },
        { fromX: 8, fromY: 7, toX: 9, toY: 7 }
      ],
      currHead: { x: 12, y: 7 },
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: { x: 18, y: 7 },
      lastStep: 0,
      stepInterval: 125
    },

    // 5. RUNNER (Shinobi Jump)
    runner: {
      shinobiY: 220,
      shinobiVy: 0,
      isJumping: false,
      isSliding: false,
      slideTimer: 0,
      runCycle: 0,
      speed: 6.2,
      groundOffset: 0,
      obstacles: [],
      lastObstacle: 0,
      dustPuffs: [],
      scarfNodes: [
        { x: 80, y: 210 },
        { x: 74, y: 211 },
        { x: 68, y: 212 },
        { x: 62, y: 213 }
      ]
    }
  });

  // Spawn explosion particles
  const triggerExplosion = (x, y, count = 26, color = '#FB7185') => {
    aRef.current.shake = 14;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 5.8;
      aRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 24 + Math.random() * 16,
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
      a.racer.carX = 252;
      a.racer.carVx = 0;
      a.racer.tilt = 0;
      a.racer.speed = 7.5;
      a.racer.targetSpeed = 7.5;
      a.racer.roadOffset = 0;
      a.racer.enemies = [
        { x: 120, y: 40, speed: 4.2, color: '#EF4444' },
        { x: 380, y: 140, speed: 3.8, color: '#3B82F6' }
      ];
      a.racer.lastSpawn = performance.now();
    } else if (id === 'invaders') {
      a.invaders.shipX = 252;
      a.invaders.shipVx = 0;
      a.invaders.shipTilt = 0;
      a.invaders.bullets = [];
      a.invaders.alienBombs = [];
      a.invaders.aliens = [];
      a.invaders.swarmX = 70;
      a.invaders.swarmY = 40;
      a.invaders.swarmDir = 1;
      a.invaders.lastBombSpawn = performance.now();
      a.invaders.lastFireTime = 0;

      const colors = ['#FB7185', '#FDE047', '#38BDF8'];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
          a.invaders.aliens.push({
            row: r,
            col: c,
            alive: true,
            color: colors[r],
            x: 0,
            y: 0
          });
        }
      }
    } else if (id === 'breakout') {
      a.breakout.paddleX = 252;
      a.breakout.paddleVx = 0;
      a.breakout.ballX = 252;
      a.breakout.ballY = 180;
      a.breakout.ballVx = 3.6 * (Math.random() > 0.5 ? 1 : -1);
      a.breakout.ballVy = -4.2;
      a.breakout.ballTrail = [];
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
      a.snake.body = [
        { fromX: 11, fromY: 7, toX: 12, toY: 7 },
        { fromX: 10, fromY: 7, toX: 11, toY: 7 },
        { fromX: 9, fromY: 7, toX: 10, toY: 7 },
        { fromX: 8, fromY: 7, toX: 9, toY: 7 }
      ];
      a.snake.currHead = { x: 12, y: 7 };
      a.snake.dir = { x: 1, y: 0 };
      a.snake.nextDir = { x: 1, y: 0 };
      a.snake.food = { x: 18, y: 7 };
      a.snake.lastStep = performance.now();
    } else if (id === 'runner') {
      a.runner.shinobiY = 220;
      a.runner.shinobiVy = 0;
      a.runner.isJumping = false;
      a.runner.isSliding = false;
      a.runner.slideTimer = 0;
      a.runner.runCycle = 0;
      a.runner.speed = 6.2;
      a.runner.groundOffset = 0;
      a.runner.dustPuffs = [];
      a.runner.obstacles = [
        { x: 380, type: 'spike', w: 20, h: 26, y: 214 },
        { x: 580, type: 'blade', w: 24, h: 22, y: 185, angle: 0 }
      ];
      a.runner.lastObstacle = performance.now();
      a.runner.scarfNodes = [
        { x: 80, y: 210 },
        { x: 74, y: 211 },
        { x: 68, y: 212 },
        { x: 62, y: 213 }
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

  // External Joystick & D-Pad Controls with holding & analog support
  useEffect(() => {
    if (!externalControl) return;
    const { action, type, x, y } = typeof externalControl === 'object' ? externalControl : { action: externalControl, type: 'down' };
    const a = aRef.current;

    // Analog stick streaming input (-1.0 to +1.0)
    if (type === 'analog') {
      inputRef.current.analogX = typeof x === 'number' ? x : 0;
      inputRef.current.analogY = typeof y === 'number' ? y : 0;
      return;
    }

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
      } else if (['boost', 'brake', 'restart', 'up', 'down', 'fire'].includes(action)) {
        startPlay();
      }
      return;
    }

    // 3. In Game Over Mode: Restart immediately!
    if (consoleMode === 'gameover') {
      startPlay();
      return;
    }

    // 4. In Active Playing Mode: Continuous keys
    const isDown = type !== 'up';
    if (action === 'left') inputRef.current.left = isDown;
    if (action === 'right') inputRef.current.right = isDown;
    if (action === 'boost' || action === 'up') {
      inputRef.current.up = isDown;
      inputRef.current.fire = isDown;
    }
    if (action === 'brake' || action === 'down') inputRef.current.down = isDown;

    // Snake direction buffer
    if (a.gameId === 'snake' && isDown) {
      const s = a.snake;
      if (action === 'left' && s.dir.x === 0) s.nextDir = { x: -1, y: 0 };
      else if (action === 'right' && s.dir.x === 0) s.nextDir = { x: 1, y: 0 };
      else if ((action === 'boost' || action === 'up') && s.dir.y === 0) s.nextDir = { x: 0, y: -1 };
      else if ((action === 'brake' || action === 'down') && s.dir.y === 0) s.nextDir = { x: 0, y: 1 };
    }

    // Auto-release for quick single clicks
    if (type === 'down' || !type) {
      setTimeout(() => {
        if (action === 'left') inputRef.current.left = false;
        if (action === 'right') inputRef.current.right = false;
        if (action === 'boost' || action === 'up') {
          inputRef.current.up = false;
          inputRef.current.fire = false;
        }
        if (action === 'brake' || action === 'down') inputRef.current.down = false;
      }, 150);
    }
  }, [externalControl]);

  // Window Keyboard Listeners: Keydown & Keyup for butter-smooth holding
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
        if (['Enter', 'Space', 'KeyR'].includes(e.code)) {
          startPlay();
        }
        return;
      }

      // Playing mode continuous keys
      const a = aRef.current;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') inputRef.current.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') inputRef.current.right = true;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        inputRef.current.up = true;
        inputRef.current.fire = true;
      }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') inputRef.current.down = true;
      if (e.code === 'Space') inputRef.current.fire = true;

      // Snake discrete direction queuing
      if (a.gameId === 'snake') {
        const s = a.snake;
        if (['ArrowLeft', 'KeyA'].includes(e.code) && s.dir.x === 0) s.nextDir = { x: -1, y: 0 };
        else if (['ArrowRight', 'KeyD'].includes(e.code) && s.dir.x === 0) s.nextDir = { x: 1, y: 0 };
        else if (['ArrowUp', 'KeyW'].includes(e.code) && s.dir.y === 0) s.nextDir = { x: 0, y: -1 };
        else if (['ArrowDown', 'KeyS'].includes(e.code) && s.dir.y === 0) s.nextDir = { x: 0, y: 1 };
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') inputRef.current.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') inputRef.current.right = false;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        inputRef.current.up = false;
        inputRef.current.fire = false;
      }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') inputRef.current.down = false;
      if (e.code === 'Space') inputRef.current.fire = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [consoleMode, activeGameIndex]);

  // Main 60+ FPS Delta-Time Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let lastTime = performance.now();

    initGame(ARCADE_GAMES[0].id);

    const loop = (timestamp) => {
      // High-precision delta time calculation clamped between 10 FPS and 165 FPS
      const dtRaw = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      const dt = Math.min(Math.max(dtRaw, 0.001), 0.04);
      const scale = dt * 60; // 1.0 at 60 FPS

      const a = aRef.current;
      const input = inputRef.current;
      const isAuto = a.mode === 'preview' || a.mode === 'select';
      const isGameOver = a.mode === 'gameover';

      // Screen Shake
      ctx.save();
      if (a.shake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * a.shake,
          (Math.random() - 0.5) * a.shake
        );
        a.shake *= Math.pow(0.86, scale);
        if (a.shake < 0.4) a.shake = 0;
      }

      // Clear Canvas Screen (504 x 298 Widescreen Chalkboard)
      ctx.fillStyle = '#0F2116';
      ctx.fillRect(0, 0, 504, 298);

      // Subtle chalk architectural grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 504; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 298);
        ctx.stroke();
      }

      // ==============================================================
      // 1. GAME 1: SPEEDWAY DODGE (FLUID ANALOG STEERING & TRAFFIC)
      // ==============================================================
      if (a.gameId === 'racer') {
        const rc = a.racer;

        // Fluid Continuous Steer & Velocity
        let steer = 0;
        if (!isGameOver) {
          if (isAuto) {
            // Autopilot AI smoothly tracks closest gap
            const threat = rc.enemies.find((e) => e.y > 50 && e.y < 230 && Math.abs(e.x - rc.carX) < 70);
            if (threat) {
              steer = threat.x > rc.carX ? -0.9 : 0.9;
            } else {
              steer = Math.sin(timestamp * 0.0025) * 0.4;
            }
          } else {
            if (input.left) steer -= 1.0;
            if (input.right) steer += 1.0;
            if (Math.abs(input.analogX) > 0.1) steer = input.analogX;

            // Target speed based on Boost / Brake
            if (input.up) rc.targetSpeed = 13.5;
            else if (input.down) rc.targetSpeed = 4.2;
            else rc.targetSpeed = 7.5;
          }

          // Smooth exponential velocity lerp & aerodynamic friction
          rc.carVx += steer * 34 * dt;
          rc.carVx *= Math.pow(0.82, scale);
          rc.carX += rc.carVx * scale * 1.8;
          rc.carX = Math.max(48, Math.min(456, rc.carX));

          // Smooth car tilt
          const targetTilt = (rc.carVx / 8.0) * 0.24;
          rc.tilt += (targetTilt - rc.tilt) * Math.min(1, 0.22 * scale);

          // Smooth speed ramping
          rc.speed += (rc.targetSpeed - rc.speed) * Math.min(1, 0.14 * scale);

          // Sub-pixel continuous road scrolling
          rc.roadOffset = (rc.roadOffset + rc.speed * scale) % 36;

          // Exhaust chalk smoke particles
          if (timestamp - rc.smokeTimer > 80) {
            rc.smokeTimer = timestamp;
            a.particles.push({
              x: rc.carX + (Math.random() - 0.5) * 8,
              y: 254,
              vx: (Math.random() - 0.5) * 0.8,
              vy: 2.2 + Math.random() * 1.5,
              life: 14,
              maxLife: 14,
              color: 'rgba(255, 255, 255, 0.35)'
            });
          }

          // Spawn traffic
          if (timestamp - rc.lastSpawn > 950) {
            rc.lastSpawn = timestamp;
            const lanes = [96, 252, 408];
            const laneX = lanes[Math.floor(Math.random() * 3)] + (Math.random() - 0.5) * 30;
            rc.enemies.push({
              x: laneX,
              y: -50,
              speed: 3.5 + Math.random() * 2.8,
              color: laneX < 180 ? '#EF4444' : laneX < 330 ? '#3B82F6' : '#10B981'
            });
          }
        }

        // Draw Sub-Pixel Red/Blue Kerbs
        for (let s = -2; s < 18; s++) {
          const y = s * 18 + (rc.roadOffset % 18);
          const isAlt = Math.floor((s * 18 + rc.roadOffset) / 18) % 2 === 0;
          ctx.fillStyle = isAlt ? '#EF4444' : '#0284C7';
          ctx.fillRect(0, y, 16, 18);
          ctx.fillRect(488, y, 16, 18);
        }

        // Road Dividers
        ctx.strokeStyle = '#FDE047';
        ctx.lineWidth = 2.4;
        ctx.setLineDash([20, 16]);
        ctx.lineDashOffset = -rc.roadOffset;
        ctx.beginPath();
        ctx.moveTo(174, 0);
        ctx.lineTo(174, 298);
        ctx.moveTo(330, 0);
        ctx.lineTo(330, 298);
        ctx.stroke();
        ctx.setLineDash([]);

        // Update and draw enemy cars
        for (let i = rc.enemies.length - 1; i >= 0; i--) {
          const e = rc.enemies[i];
          if (!isGameOver) {
            e.y += (e.speed + rc.speed * 0.45) * scale;
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
            const dx = Math.abs(e.x - rc.carX);
            const dy = Math.abs(e.y - 230);
            if (dx < 26 && dy < 44) {
              triggerExplosion(rc.carX, 230, 30, '#EF4444');
              handleGameOver('💥 HIGH-SPEED TRAFFIC COLLISION!');
              break;
            }
          }

          if (e.y > 340) {
            rc.enemies.splice(i, 1);
            if (!isAuto && !isGameOver) a.score += 20;
          }
        }

        // Draw Player Car
        if (!isGameOver) {
          ctx.save();
          ctx.translate(rc.carX, 230);
          ctx.rotate(rc.tilt);
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#0284C7';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(-16, -28, 32, 56, 7);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#67E8F9';
          ctx.fillRect(-11, -12, 22, 12);
          // Headlights glow beams
          ctx.fillStyle = 'rgba(253, 224, 71, 0.15)';
          ctx.beginPath();
          ctx.moveTo(-12, -28);
          ctx.lineTo(-24, -90);
          ctx.lineTo(24, -90);
          ctx.lineTo(12, -28);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      // ==============================================================
      // 2. GAME 2: GALAXY BLAST (SMOOTH STRAFING & ORGANIC SQUADRON)
      // ==============================================================
      else if (a.gameId === 'invaders') {
        const inv = a.invaders;

        // Dynamic Starfield with sub-pixel parallax
        for (let st = 0; st < 32; st++) {
          const speedFactor = (st % 3 + 1) * 0.4;
          const sx = (st * 71 + timestamp * 0.03 * speedFactor) % 504;
          const sy = (st * 43 + timestamp * 0.08 * speedFactor) % 298;
          ctx.fillStyle = st % 2 === 0 ? '#FDE047' : '#FFFFFF';
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Smooth Continuous Ship Movement
        let strafe = 0;
        if (!isGameOver) {
          if (isAuto) {
            const nearestAlien = inv.aliens.find((al) => al.alive && Math.abs(al.x - inv.shipX) < 45);
            if (nearestAlien) {
              if (timestamp - inv.lastFireTime > 200) {
                inv.lastFireTime = timestamp;
                inv.bullets.push({ x: inv.shipX, y: 236 });
              }
            } else {
              strafe = Math.sin(timestamp * 0.003) * 0.7;
            }
          } else {
            if (input.left) strafe -= 1.0;
            if (input.right) strafe += 1.0;
            if (Math.abs(input.analogX) > 0.1) strafe = input.analogX;

            // Continuous rapid fire when holding Space or Up
            if ((input.fire || input.up) && timestamp - inv.lastFireTime > 165) {
              inv.lastFireTime = timestamp;
              hudAudio.playLaser();
              inv.bullets.push({ x: inv.shipX, y: 236 });
            }
          }

          inv.shipVx += strafe * 38 * dt;
          inv.shipVx *= Math.pow(0.80, scale);
          inv.shipX += inv.shipVx * scale * 1.8;
          inv.shipX = Math.max(32, Math.min(472, inv.shipX));
          inv.shipTilt = (inv.shipVx / 9.0) * 0.22;

          // Organic Squadron Wave Movement (Continuous fluid sine wave instead of blocky steps)
          inv.swarmX += inv.swarmDir * 40 * dt;
          if (inv.swarmX < 45) {
            inv.swarmDir = 1;
            inv.swarmY += 10;
          } else if (inv.swarmX > 115) {
            inv.swarmDir = -1;
            inv.swarmY += 10;
          }

          // Aliens drop laser bombs downwards smoothly
          if (timestamp - inv.lastBombSpawn > 850) {
            inv.lastBombSpawn = timestamp;
            const aliveAliens = inv.aliens.filter((al) => al.alive);
            if (aliveAliens.length > 0) {
              const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
              inv.alienBombs.push({ x: shooter.x, y: shooter.y + 12 });
            }
          }
        }

        // Calculate and Draw Fluid Alien Positions
        inv.aliens.forEach((al) => {
          if (al.alive) {
            al.x = inv.swarmX + al.col * 44 + Math.sin(timestamp * 0.0035 + al.col * 0.4) * 6;
            al.y = inv.swarmY + al.row * 28 + Math.cos(timestamp * 0.003 + al.row * 0.5) * 3;

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

        // Update Alien Bombs
        for (let ab = inv.alienBombs.length - 1; ab >= 0; ab--) {
          const bomb = inv.alienBombs[ab];
          if (!isGameOver) bomb.y += 5.2 * scale;

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

        // Update Player Lasers
        for (let b = inv.bullets.length - 1; b >= 0; b--) {
          const blt = inv.bullets[b];
          if (!isGameOver) blt.y -= 9.2 * scale;

          ctx.fillStyle = '#34D399';
          ctx.fillRect(blt.x - 2, blt.y - 9, 4, 14);

          for (let al of inv.aliens) {
            if (al.alive && Math.abs(al.x - blt.x) < 18 && Math.abs(al.y - blt.y) < 16) {
              al.alive = false;
              hudAudio.playPoint();
              triggerExplosion(al.x, al.y, 12, al.color);
              inv.bullets.splice(b, 1);
              if (!isAuto) a.score += 50;
              break;
            }
          }
          if (blt.y < 0) inv.bullets.splice(b, 1);
        }

        // Draw Player Spacecraft
        if (!isGameOver) {
          ctx.save();
          ctx.translate(inv.shipX, 246);
          ctx.rotate(inv.shipTilt);
          ctx.fillStyle = '#38BDF8';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(0, -18);
          ctx.lineTo(-16, 12);
          ctx.lineTo(16, 12);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FDE047';
          ctx.fillRect(-3, -2, 6, 8);
          // Plasma Thruster Flame
          ctx.fillStyle = 'rgba(251, 113, 133, 0.8)';
          ctx.beginPath();
          ctx.moveTo(-6, 12);
          ctx.lineTo(0, 20 + Math.random() * 5);
          ctx.lineTo(6, 12);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      // ==============================================================
      // 3. GAME 3: CHALK BREAKOUT (BUTTER-SMOOTH PADDLE & COMET TAIL)
      // ==============================================================
      else if (a.gameId === 'breakout') {
        const brk = a.breakout;

        if (!isGameOver) {
          let padSteer = 0;
          if (isAuto) {
            brk.paddleX += (brk.ballX - brk.paddleX) * Math.min(1, 0.18 * scale);
          } else {
            if (input.left) padSteer -= 1.0;
            if (input.right) padSteer += 1.0;
            if (Math.abs(input.analogX) > 0.1) padSteer = input.analogX;

            brk.paddleVx += padSteer * 44 * dt;
            brk.paddleVx *= Math.pow(0.78, scale);
            brk.paddleX += brk.paddleVx * scale * 1.8;
          }
          brk.paddleX = Math.max(brk.paddleW / 2 + 10, Math.min(504 - brk.paddleW / 2 - 10, brk.paddleX));

          // Ball continuous sub-pixel movement
          brk.ballX += brk.ballVx * scale;
          brk.ballY += brk.ballVy * scale;

          // Record trail positions for comet glow
          brk.ballTrail.unshift({ x: brk.ballX, y: brk.ballY });
          if (brk.ballTrail.length > 5) brk.ballTrail.pop();

          // Wall bounces
          if (brk.ballX < 12) {
            brk.ballX = 12;
            brk.ballVx = Math.abs(brk.ballVx);
          } else if (brk.ballX > 492) {
            brk.ballX = 492;
            brk.ballVx = -Math.abs(brk.ballVx);
          }
          if (brk.ballY < 12) {
            brk.ballY = 12;
            brk.ballVy = Math.abs(brk.ballVy);
          }

          // Paddle deflection with angle + spin transfer
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
            brk.ballVx = hitOffset * 4.4 + brk.paddleVx * 0.25;
            // Cap max ball speed
            brk.ballVx = Math.max(-6.5, Math.min(6.5, brk.ballVx));
          }

          // REAL BALL DROP OUT!
          if (brk.ballY > 294) {
            if (!isAuto) {
              a.lives--;
              setLives(a.lives);
              hudAudio.playCrash();

              if (a.lives <= 0) {
                triggerExplosion(brk.ballX, 280, 24, '#FDE047');
                handleGameOver('❌ OUT OF BALLS! GAME OVER');
              } else {
                brk.ballX = brk.paddleX;
                brk.ballY = 190;
                brk.ballVy = -4.0;
                brk.ballVx = 3.4 * (Math.random() > 0.5 ? 1 : -1);
                brk.ballTrail = [];
              }
            } else {
              brk.ballX = 252;
              brk.ballY = 180;
              brk.ballVy = -4.0;
              brk.ballTrail = [];
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

        // Draw Ball & Comet Motion Trail
        if (!isGameOver) {
          brk.ballTrail.forEach((pt, idx) => {
            const alpha = 0.35 - (idx * 0.07);
            ctx.fillStyle = `rgba(253, 224, 71, ${alpha})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6.0 - idx * 0.8, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.fillStyle = '#FDE047';
          ctx.beginPath();
          ctx.arc(brk.ballX, brk.ballY, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ==============================================================
      // 4. GAME 4: CYBER SNAKE (SUB-STEP CONTINUOUS GLIDE & SMOOTH SPINE)
      // ==============================================================
      else if (a.gameId === 'snake') {
        const snk = a.snake;
        const cell = 20;

        if (isAuto && !isGameOver) {
          const head = snk.currHead;
          if (head.x < snk.food.x && snk.dir.x !== -1) snk.nextDir = { x: 1, y: 0 };
          else if (head.x > snk.food.x && snk.dir.x !== 1) snk.nextDir = { x: -1, y: 0 };
          else if (head.y < snk.food.y && snk.dir.y !== -1) snk.nextDir = { x: 0, y: 1 };
          else if (head.y > snk.food.y && snk.dir.y !== 1) snk.nextDir = { x: 0, y: -1 };
        }

        // Advance logical grid at step intervals
        if (!isGameOver && timestamp - snk.lastStep > snk.stepInterval) {
          snk.lastStep = timestamp;
          snk.dir = { ...snk.nextDir };

          const newHead = {
            x: snk.currHead.x + snk.dir.x,
            y: snk.currHead.y + snk.dir.y
          };

          // REAL SOLID WALL COLLISION DEATH!
          if (!isAuto && (newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 14)) {
            triggerExplosion(snk.currHead.x * cell + 10, snk.currHead.y * cell + 10, 25, '#34D399');
            handleGameOver('🐍 CRASHED INTO CHALKBOARD WALL!');
          }
          // REAL SELF-TAIL COLLISION DEATH!
          else if (!isAuto && snk.body.slice(1).some((seg) => seg.toX === newHead.x && seg.toY === newHead.y)) {
            triggerExplosion(snk.currHead.x * cell + 10, snk.currHead.y * cell + 10, 25, '#EF4444');
            handleGameOver('💀 BITTEN YOUR OWN SERPENT TAIL!');
          } else {
            // Push new segment at front with smooth interpolation endpoints
            snk.body.unshift({
              fromX: snk.currHead.x,
              fromY: snk.currHead.y,
              toX: newHead.x,
              toY: newHead.y
            });
            snk.currHead = newHead;

            // Update remaining segments' interpolation source
            for (let s = 1; s < snk.body.length; s++) {
              snk.body[s].fromX = snk.body[s].toX;
              snk.body[s].fromY = snk.body[s].toY;
              snk.body[s].toX = snk.body[s - 1].fromX;
              snk.body[s].toY = snk.body[s - 1].fromY;
            }

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

        // Sub-step interpolation factor (0.0 to 1.0)
        const t = Math.min(1.0, Math.max(0.0, (timestamp - snk.lastStep) / snk.stepInterval));

        // Draw Pulsing Food
        const foodPulse = Math.sin(timestamp * 0.008) * 1.5;
        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.arc(snk.food.x * cell + 10, snk.food.y * cell + 10, 7 + foodPulse, 0, Math.PI * 2);
        ctx.fill();

        // Render Smooth Interpolated Serpent Body
        snk.body.forEach((seg, idx) => {
          const rx = (seg.fromX + (seg.toX - seg.fromX) * t) * cell + 10;
          const ry = (seg.fromY + (seg.toY - seg.fromY) * t) * cell + 10;

          if (idx === 0) {
            // Head with cute animated eyes looking forward
            ctx.fillStyle = '#34D399';
            ctx.beginPath();
            ctx.arc(rx, ry, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0F2116';
            const eyeOffX = snk.dir.x * 3;
            const eyeOffY = snk.dir.y * 3;
            ctx.beginPath();
            ctx.arc(rx + eyeOffX - 2, ry + eyeOffY - 2, 2, 0, Math.PI * 2);
            ctx.arc(rx + eyeOffX + 2, ry + eyeOffY + 2, 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Body segments smoothly connected
            ctx.fillStyle = idx % 2 === 0 ? '#34D399' : '#86EFAC';
            ctx.beginPath();
            ctx.arc(rx, ry, 7.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // ==============================================================
      // 5. GAME 5: SHINOBI JUMP (VARIABLE JUMP PHYSICS & ANIMATED RUN)
      // ==============================================================
      else if (a.gameId === 'runner') {
        const run = a.runner;
        const groundY = 240;

        if (!isGameOver) {
          // Continuous Run Cycle & Ground Parallax
          run.runCycle += 14 * dt;
          run.groundOffset = (run.groundOffset + run.speed * scale) % 24;

          // Variable Jump Physics (Hold ▲ for higher leap)
          if (!run.isJumping) {
            if (isAuto) {
              const threat = run.obstacles.find((o) => o.x > 80 && o.x < 150);
              if (threat) {
                if (threat.type === 'spike') {
                  run.isJumping = true;
                  run.shinobiVy = -12.0;
                } else if (threat.type === 'blade') {
                  run.isSliding = true;
                  run.slideTimer = 30;
                }
              }
            } else {
              if (input.up) {
                hudAudio.playOpen();
                run.isJumping = true;
                run.shinobiVy = -12.4;
              } else if (input.down) {
                run.isSliding = true;
                run.slideTimer = 30;
              }
            }
          } else {
            // Cut jump short if player releases button early (classic responsive platformer feel!)
            if (!isAuto && !input.up && run.shinobiVy < -4) {
              run.shinobiVy *= 0.65;
            }
          }

          if (run.isJumping) {
            run.shinobiVy += 32 * dt; // Gravity
            run.shinobiY += run.shinobiVy * scale;
            if (run.shinobiY >= groundY - 20) {
              run.shinobiY = groundY - 20;
              run.isJumping = false;
              run.shinobiVy = 0;
            }
          }

          if (run.isSliding) {
            run.slideTimer -= scale;
            if (run.slideTimer <= 0) run.isSliding = false;
          }

          // Spawn obstacles
          if (timestamp - run.lastObstacle > 1250) {
            run.lastObstacle = timestamp;
            const isBlade = Math.random() > 0.5;
            run.obstacles.push({
              x: 520,
              type: isBlade ? 'blade' : 'spike',
              w: 22,
              h: isBlade ? 20 : 28,
              y: isBlade ? groundY - 45 : groundY - 28,
              angle: 0
            });
          }

          // Foot dust puffs while sprinting on ground
          if (!run.isJumping && !run.isSliding && Math.random() < 0.25) {
            run.dustPuffs.push({
              x: 84,
              y: groundY - 2,
              vx: -(1.5 + Math.random() * 2),
              vy: -(Math.random() * 1.5),
              life: 12
            });
          }
        }

        // Update Foot Dust
        for (let d = run.dustPuffs.length - 1; d >= 0; d--) {
          const df = run.dustPuffs[d];
          df.x += df.vx * scale;
          df.y += df.vy * scale;
          df.life -= scale;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(df.x, df.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          if (df.life <= 0) run.dustPuffs.splice(d, 1);
        }

        // Update and draw obstacles
        for (let o = run.obstacles.length - 1; o >= 0; o--) {
          const obs = run.obstacles[o];
          if (!isGameOver) {
            obs.x -= run.speed * scale;
            if (obs.type === 'blade') obs.angle += 12 * dt;
          }

          // REAL OBSTACLE COLLISION DEATH!
          if (!isAuto && !isGameOver) {
            const playerX = 90;
            const dx = Math.abs(obs.x - playerX);

            // Ground spike struck if NOT jumping
            if (obs.type === 'spike' && dx < 20 && !run.isJumping) {
              triggerExplosion(playerX, groundY - 15, 26, '#FB7185');
              handleGameOver('⚔️ STRUCK BY SHINOBI SPIKES!');
              break;
            }
            // Rotating blade struck if NOT sliding
            if (obs.type === 'blade' && dx < 20 && !run.isSliding && run.shinobiY > 185) {
              triggerExplosion(playerX, obs.y + 10, 26, '#FDE047');
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
            ctx.translate(obs.x + 11, obs.y + 10);
            ctx.rotate(obs.angle);
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

        // Draw Ground Line & Sub-Pixel Parallax Notches
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(504, groundY);
        ctx.stroke();

        for (let g = 0; g < 504; g += 24) {
          const gx = (g - run.groundOffset + 504) % 504;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(gx, groundY);
          ctx.lineTo(gx - 8, groundY + 8);
          ctx.stroke();
        }

        // Draw Shinobi Ninja with Animated Legs & Trailing Flowing Scarf
        if (!isGameOver) {
          ctx.save();
          ctx.translate(90, run.shinobiY);

          // Flowing Ninja Scarf / Cape
          ctx.strokeStyle = '#FDE047';
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(-6, -10);
          ctx.lineTo(-20, -8 + Math.sin(timestamp * 0.015) * 5);
          ctx.lineTo(-32, -6 + Math.sin(timestamp * 0.018) * 8);
          ctx.stroke();

          if (run.isSliding) {
            // Low-Profile Slide Pose
            ctx.fillStyle = '#A78BFA';
            ctx.beginPath();
            ctx.ellipse(0, 10, 18, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(8, 6, 5, 4); // Eye visor
          } else {
            // Torso
            ctx.fillStyle = '#A78BFA';
            ctx.beginPath();
            ctx.roundRect(-8, -16, 16, 24, 4);
            ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(2, -14, 5, 3); // Eye visor

            // Animated Running Legs
            const legSwing = run.isJumping ? 0.3 : Math.sin(run.runCycle);
            ctx.strokeStyle = '#A78BFA';
            ctx.lineWidth = 3.2;
            ctx.beginPath();
            // Left leg
            ctx.moveTo(-4, 8);
            ctx.lineTo(-4 + legSwing * 9, 20);
            // Right leg
            ctx.moveTo(4, 8);
            ctx.lineTo(4 - legSwing * 9, 20);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // Draw Global Explosion Particles Across All Games
      for (let p = a.particles.length - 1; p >= 0; p--) {
        const pt = a.particles[p];
        pt.x += pt.vx * scale;
        pt.y += pt.vy * scale;
        pt.life -= scale;

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.5, (pt.life / pt.maxLife) * 4), 0, Math.PI * 2);
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
      
      {/* 60+ FPS Canvas Game Screen (ALWAYS 100% VISIBLE & RUNNING) */}
      <canvas
        ref={canvasRef}
        width={504}
        height={298}
        className="w-full h-full object-cover block"
      />

      {/* ==============================================================
          MODE 1: AUTO-PLAY PREVIEW (Exact Aesthetic Match to Reference Card)
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
          MODE 2: CHOOSE YOUR GAME (Compact, Clean Card matching Reference)
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
