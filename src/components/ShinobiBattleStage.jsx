import React, { useEffect, useRef } from 'react';

/**
 * ShinobiBattleStage (High-Octane 60 FPS Native Canvas Anime War)
 * 
 * High-Speed Stickman Shinobi Battle (Naruto vs Sasuke):
 * - 0% React overhead: Pure GPU-accelerated HTML5 Canvas 2D engine running at solid 60 FPS.
 * - Bold, high-character 1.45x scale: Deep black ink lines, Konoha headband, Whisker marks,
 *   Rogue Uchiha collar, and glowing crimson Sharingan.
 * - Blistering Anime Speed (Alan Becker / Xiao Xiao / Naruto Shippuden anime physics):
 *   0.0s - 0.8s: Instant Body Flicker (Shunshin) Mach sprint across the card roof with dust trails!
 *   0.8s - 1.6s: Sasuke unleashes roaring Fireball Jutsu; Naruto leaps high over the flames!
 *   1.6s - 2.4s: Mid-air Shadow Clone (Kage Bunshin) combo; Sasuke draws Kusanagi sword to parry!
 *   2.4s - 3.4s: High-speed Taijutsu flurry (rapid punches, kicks, blocks with spark bursts)!
 *   3.4s - 4.2s: Signature Jutsu charge: Swirling giant Rasengan vs Crackling violet Chidori!
 *   4.2s - 4.6s: Mach clash in center with massive shockwave explosion & chakra sparks!
 *   4.6s - 5.0s: Acrobatic somersault recovery landing on the roof to loop seamlessly!
 */

export default function ShinobiBattleStage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Dynamic particle pool (sparks, lightning motes, chakra flames, smoke)
    const particles = [];
    const spawnParticle = (x, y, vx, vy, color, size, maxLife) => {
      if (particles.length > 90) particles.shift();
      particles.push({ x, y, vx, vy, color, size, life: 0, maxLife });
    };

    const startTime = performance.now();

    // -------------------------------------------------------------
    // 60 FPS RENDER LOOP
    // -------------------------------------------------------------
    const render = (now) => {
      animId = requestAnimationFrame(render);
      if (!width || !height) return;

      const elapsed = (now - startTime) / 1000;
      // High-speed 4.8s intense loop
      const t = elapsed % 4.8; 

      ctx.clearRect(0, 0, width, height);

      const floorY = height - 2; // Precise top border of the card
      const leftBound = 40;
      const rightBound = width - 40;
      const centerX = width * 0.5;

      // -----------------------------------------------------------
      // CHOREOGRAPHY KINEMATICS
      // -----------------------------------------------------------
      let nX = leftBound, nY = floorY, nPose = 'sprint', nFacing = 1, nRasengan = false;
      let sX = rightBound, sY = floorY, sPose = 'sprint', sFacing = -1, sChidori = false, sFireball = false, sSword = false;
      let cloneActive = false, cloneX = 0, cloneY = 0;
      let clash = false, clashScale = 0;
      let shakeX = 0, shakeY = 0;

      if (t < 0.7) {
        // 1. High-Speed Dash Opening
        const p = t / 0.7;
        nX = leftBound + (centerX - 90 - leftBound) * p;
        nY = floorY;
        nPose = 'sprint';
        nFacing = 1;

        sX = rightBound - (rightBound - (centerX + 90)) * p;
        sY = floorY;
        sPose = 'sprint';
        sFacing = -1;

        // Running dust puffs along the card border
        if (Math.random() > 0.4) {
          spawnParticle(nX - 12, floorY - 2, -15 - Math.random() * 20, -Math.random() * 10, '#94A3B8', 2.5, 0.2);
          spawnParticle(sX + 12, floorY - 2, 15 + Math.random() * 20, -Math.random() * 10, '#94A3B8', 2.5, 0.2);
        }
      } else if (t < 1.5) {
        // 2. Sasuke Fireball & Naruto Leap
        const p = (t - 0.7) / 0.8;
        sX = centerX + 90 - p * 30;
        sY = floorY;
        sFacing = -1;
        sPose = 'fireball_cast';
        sFireball = true;

        if (p < 0.25) {
          nX = centerX - 90 + p * 40;
          nY = floorY;
          nPose = 'sprint';
          nFacing = 1;
        } else {
          // Naruto leaps high over the fireball!
          const leapP = (p - 0.25) / 0.75;
          nX = centerX - 80 + leapP * 90;
          nY = floorY - Math.sin(leapP * Math.PI) * 65;
          nPose = 'jump_kick';
          nFacing = 1;
        }
      } else if (t < 2.3) {
        // 3. Shadow Clone Flank & Sasuke Sword Parry
        const p = (t - 1.5) / 0.8;
        sX = centerX + 40;
        sY = floorY;
        sFacing = -1;
        sPose = 'sword_stance';
        sSword = true;

        // Naruto lands with a direct punch
        nX = centerX - 25;
        nY = floorY;
        nPose = 'punch';
        nFacing = 1;

        // Shadow clone drops from above with a dive kick
        cloneActive = p < 0.85;
        cloneX = centerX + 55 - p * 25;
        cloneY = floorY - 55 + p * 45;

        // Metal sword clashing hit-sparks
        if (p > 0.2 && p < 0.7) {
          spawnParticle(centerX + 18, floorY - 25, (Math.random() - 0.5) * 90, -Math.random() * 70, '#FBBF24', 2.8, 0.22);
          spawnParticle(centerX + 18, floorY - 25, (Math.random() - 0.5) * 90, -Math.random() * 70, '#FFFFFF', 2, 0.18);
        }
      } else if (t < 3.3) {
        // 4. Blistering Fast Taijutsu Flurry (Rapid punches/kicks)
        const p = (t - 2.3) / 1.0;
        const hitTick = Math.floor(p * 16);
        const toggle = hitTick % 2 === 0;

        nX = centerX - 26 + (toggle ? 3 : -3);
        nY = floorY;
        nFacing = 1;
        nPose = toggle ? 'punch' : 'kick';

        sX = centerX + 26 - (toggle ? 3 : -3);
        sY = floorY;
        sFacing = -1;
        sPose = toggle ? 'block' : 'sword_slash';
        sSword = true;

        // High-frequency impact sparks
        spawnParticle(centerX + (Math.random() - 0.5) * 16, floorY - 22 + (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 80, -Math.random() * 60, '#38BDF8', 2.2, 0.18);
        spawnParticle(centerX + (Math.random() - 0.5) * 16, floorY - 22 + (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 80, -Math.random() * 60, '#F43F5E', 2.2, 0.18);
      } else if (t < 4.3) {
        // 5. Signature Jutsu Charge & Mach Collision (Rasengan vs Chidori)
        const p = (t - 3.3) / 1.0;

        if (p < 0.4) {
          // Leap back to corners to charge up
          const backP = p / 0.4;
          nX = (centerX - 26) - (centerX - 26 - (leftBound + 25)) * backP;
          nY = floorY - Math.sin(backP * Math.PI) * 28;
          nPose = 'charge';
          nFacing = 1;
          nRasengan = true;

          sX = (centerX + 26) + ((rightBound - 25) - (centerX + 26)) * backP;
          sY = floorY - Math.sin(backP * Math.PI) * 28;
          sPose = 'charge';
          sFacing = -1;
          sChidori = true;
        } else if (p < 0.72) {
          // Mach speed forward thrust!
          const sprintP = (p - 0.4) / 0.32;
          nX = (leftBound + 25) + (centerX - 20 - (leftBound + 25)) * sprintP;
          nY = floorY - Math.sin(sprintP * Math.PI) * 20;
          nPose = 'thrust';
          nFacing = 1;
          nRasengan = true;

          sX = (rightBound - 25) - ((rightBound - 25) - (centerX + 20)) * sprintP;
          sY = floorY - Math.sin(sprintP * Math.PI) * 20;
          sPose = 'thrust';
          sFacing = -1;
          sChidori = true;
        } else {
          // EPIC CLASH AT CENTER!
          const clashP = (p - 0.72) / 0.28;
          clash = true;
          clashScale = Math.sin(clashP * Math.PI);
          shakeX = (Math.random() - 0.5) * 8 * clashScale;
          shakeY = (Math.random() - 0.5) * 8 * clashScale;

          nX = centerX - 22 + (Math.random() - 0.5) * 3;
          nY = floorY - 30;
          nPose = 'thrust';
          nFacing = 1;
          nRasengan = true;

          sX = centerX + 22 + (Math.random() - 0.5) * 3;
          sY = floorY - 30;
          sPose = 'thrust';
          sFacing = -1;
          sChidori = true;

          // Shockwave chakra shower
          for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 70 + Math.random() * 140;
            spawnParticle(centerX, floorY - 32, Math.cos(angle) * speed, Math.sin(angle) * speed, Math.random() > 0.5 ? '#38BDF8' : '#A78BFA', 3.2, 0.3);
          }
        }
      } else {
        // 6. Blast Rebound Somersault Landing
        const p = (t - 4.3) / 0.5;
        const apex = Math.sin(p * Math.PI) * 44;

        nX = (centerX - 22) - (centerX - 22 - leftBound) * p;
        nY = floorY - apex;
        nPose = p < 0.65 ? 'somersault' : 'land';
        nFacing = 1;

        sX = (centerX + 22) + (rightBound - (centerX + 22)) * p;
        sY = floorY - apex;
        sPose = p < 0.65 ? 'somersault' : 'land';
        sFacing = -1;
      }

      ctx.save();
      if (shakeX || shakeY) {
        ctx.translate(shakeX, shakeY);
      }

      // -----------------------------------------------------------
      // DRAW VISUAL EFFECTS & JUTSU
      // -----------------------------------------------------------

      // Fireball Jutsu (Sasuke)
      if (sFireball) {
        const fbDist = ((t - 0.7) / 0.8);
        const fbX = (centerX + 60) - fbDist * 180;
        const fbY = floorY - 24;
        if (fbX > 10) {
          const grad = ctx.createRadialGradient(fbX, fbY, 3, fbX, fbY, 32);
          grad.addColorStop(0, '#FEF08A');
          grad.addColorStop(0.35, '#F59E0B');
          grad.addColorStop(0.75, '#EF4444');
          grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(fbX, fbY, 32, 0, Math.PI * 2);
          ctx.fill();

          // Embers
          spawnParticle(fbX + (Math.random() - 0.5) * 14, fbY + (Math.random() - 0.5) * 12, 50 + Math.random() * 50, (Math.random() - 0.5) * 20, '#F97316', 3, 0.22);
        }
      }

      // Giant Swirling Rasengan (Naruto)
      if (nRasengan) {
        const rX = nX + (nFacing === 1 ? 24 : -24);
        const rY = nY - 26;

        ctx.save();
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 18;
        const grad = ctx.createRadialGradient(rX, rY, 2, rX, rY, 17);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.45, '#38BDF8');
        grad.addColorStop(0.85, '#0284C7');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(rX, rY, 17, 0, Math.PI * 2);
        ctx.fill();

        // High-speed vortex rings
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const spin = elapsed * 22;
        ctx.arc(rX, rY, 11, spin, spin + Math.PI * 1.3);
        ctx.stroke();
        ctx.restore();

        // Swirling chakra motes
        if (Math.random() > 0.3) {
          spawnParticle(rX + (Math.random() - 0.5) * 12, rY + (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, '#7DD3FC', 2.5, 0.25);
        }
      }

      // Crackling Chidori Lightning Blade (Sasuke)
      if (sChidori) {
        const cX = sX + (sFacing === 1 ? 24 : -24);
        const cY = sY - 26;

        ctx.save();
        ctx.shadowColor = '#818CF8';
        ctx.shadowBlur = 22;

        // Core burst
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cX, cY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Branching electric bolts
        ctx.strokeStyle = '#818CF8';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let b = 0; b < 7; b++) {
          const a = (b / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
          const len = 16 + Math.random() * 16;
          const midX = cX + Math.cos(a) * (len * 0.5) + (Math.random() - 0.5) * 10;
          const midY = cY + Math.sin(a) * (len * 0.5) + (Math.random() - 0.5) * 10;
          const endX = cX + Math.cos(a) * len;
          const endY = cY + Math.sin(a) * len;
          ctx.moveTo(cX, cY);
          ctx.lineTo(midX, midY);
          ctx.lineTo(endX, endY);
        }
        ctx.stroke();
        ctx.restore();

        if (Math.random() > 0.3) {
          spawnParticle(cX + (Math.random() - 0.5) * 10, cY + (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 45, (Math.random() - 0.5) * 45, '#C7D2FE', 2.6, 0.22);
        }
      }

      // Mid-Air Clash Shockwave
      if (clash && clashScale > 0.05) {
        ctx.save();
        const shockR = 48 * clashScale;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * clashScale})`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(centerX, floorY - 30, shockR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 * clashScale})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerX, floorY - 30, shockR * 1.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // -----------------------------------------------------------
      // DRAW STICKMEN FIGHTERS (1.45X PROPORTIONS)
      // -----------------------------------------------------------

      // Naruto Shinobi
      drawShinobi(ctx, nX, nY, {
        isNaruto: true,
        facing: nFacing,
        pose: nPose,
        elapsed
      });

      // Shadow Clone
      if (cloneActive) {
        ctx.save();
        ctx.globalAlpha = 0.88;
        drawShinobi(ctx, cloneX, cloneY, {
          isNaruto: true,
          facing: 1,
          pose: 'jump_kick',
          elapsed
        });
        ctx.restore();
      }

      // Sasuke Shinobi
      drawShinobi(ctx, sX, sY, {
        isNaruto: false,
        facing: sFacing,
        pose: sPose,
        hasSword: sSword,
        elapsed
      });

      // -----------------------------------------------------------
      // DRAW & UPDATE PARTICLES
      // -----------------------------------------------------------
      const dt = 1 / 60;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const progress = p.life / p.maxLife;
        const alpha = 1 - progress;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full pointer-events-none select-none block"
    />
  );
}

// -----------------------------------------------------------------
// HAND-DRAWN ANIME SHINOBI SKELETAL RENDERER (NATIVE CANVAS 2D)
// -----------------------------------------------------------------
function drawShinobi(ctx, x, y, options) {
  const { isNaruto, facing = 1, pose = 'sprint', hasSword = false, elapsed = 0 } = options;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

  const inkColor = '#0F172A';
  ctx.strokeStyle = inkColor;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3.2;

  // Joint skeleton points (1.45x scale: crisp, visible, heroic proportions)
  const headR = 10.5;
  const headY = -42;
  const neckY = -31.5;
  const hipY = -16;

  let rShoulder = { x: 0, y: neckY + 2 }, rElbow = { x: 8, y: -20 }, rHand = { x: 15, y: -16 };
  let lShoulder = { x: 0, y: neckY + 2 }, lElbow = { x: -8, y: -20 }, lHand = { x: -15, y: -16 };
  let rHip = { x: 0, y: hipY }, rKnee = { x: 8, y: -8 }, rFoot = { x: 14, y: 0 };
  let lHip = { x: 0, y: hipY }, lKnee = { x: -8, y: -8 }, lFoot = { x: -14, y: 0 };

  // --- SKELETON POSE KINEMATICS ---
  if (pose === 'sprint') {
    const cycle = Math.sin(elapsed * 26);
    rHand = { x: 18 + cycle * 6, y: -20 };
    lHand = { x: -16 - cycle * 6, y: -24 };
    rKnee = { x: 10 + cycle * 8, y: -10 + cycle * 3 };
    rFoot = { x: 16 + cycle * 10, y: cycle > 0 ? -5 : 0 };
    lKnee = { x: -10 - cycle * 8, y: -10 - cycle * 3 };
    lFoot = { x: -16 - cycle * 10, y: cycle < 0 ? -5 : 0 };
  } else if (pose === 'punch') {
    rShoulder = { x: 3, y: neckY + 2 };
    rElbow = { x: 16, y: -30 };
    rHand = { x: 30, y: -30 };
    lHand = { x: -10, y: -22 };
    rFoot = { x: 16, y: 0 };
    lFoot = { x: -16, y: 0 };
  } else if (pose === 'kick' || pose === 'jump_kick') {
    rShoulder = { x: -3, y: neckY + 2 };
    rHand = { x: -14, y: -24 };
    lHand = { x: 10, y: -26 };
    rKnee = { x: 16, y: -20 };
    rFoot = { x: 30, y: -25 };
    lFoot = { x: -10, y: 0 };
  } else if (pose === 'thrust') {
    rShoulder = { x: 6, y: neckY + 2 };
    rElbow = { x: 16, y: -28 };
    rHand = { x: 28, y: -28 };
    lHand = { x: -16, y: -20 };
    rFoot = { x: 18, y: 0 };
    lFoot = { x: -18, y: 0 };
  } else if (pose === 'fireball_cast') {
    rHand = { x: 8, y: -38 };
    lHand = { x: 10, y: -35 };
    rFoot = { x: 14, y: 0 };
    lFoot = { x: -14, y: 0 };
  } else if (pose === 'sword_stance' || pose === 'sword_slash') {
    rHand = { x: 18, y: -32 };
    lHand = { x: -8, y: -24 };
    rFoot = { x: 14, y: 0 };
    lFoot = { x: -14, y: 0 };
  } else if (pose === 'block') {
    rHand = { x: 10, y: -35 };
    lHand = { x: 6, y: -30 };
    rFoot = { x: 10, y: 0 };
    lFoot = { x: -12, y: 0 };
  } else if (pose === 'somersault') {
    rHand = { x: -15, y: -35 };
    lHand = { x: -10, y: -40 };
    rFoot = { x: 12, y: -12 };
    lFoot = { x: -8, y: -10 };
  } else if (pose === 'land') {
    rHand = { x: 8, y: -2 };
    lHand = { x: -10, y: -18 };
    rFoot = { x: 16, y: 0 };
    lFoot = { x: -12, y: 0 };
  }

  // --- DRAW TORSO & SPINE ---
  ctx.strokeStyle = isNaruto ? '#EA580C' : '#312E81';
  ctx.beginPath();
  ctx.moveTo(0, neckY);
  ctx.lineTo(0, hipY);
  ctx.stroke();

  // --- DRAW LEGS ---
  ctx.strokeStyle = inkColor;
  ctx.beginPath();
  ctx.moveTo(rHip.x, rHip.y);
  ctx.lineTo(rKnee.x, rKnee.y);
  ctx.lineTo(rFoot.x, rFoot.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(lHip.x, lHip.y);
  ctx.lineTo(lKnee.x, lKnee.y);
  ctx.lineTo(lFoot.x, lFoot.y);
  ctx.stroke();

  // --- DRAW ARMS ---
  ctx.beginPath();
  ctx.moveTo(lShoulder.x, lShoulder.y);
  ctx.lineTo(lElbow.x, lElbow.y);
  ctx.lineTo(lHand.x, lHand.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rShoulder.x, rShoulder.y);
  ctx.lineTo(rElbow.x, rElbow.y);
  ctx.lineTo(rHand.x, rHand.y);
  ctx.stroke();

  // --- DRAW KUSANAGI SWORD (SASUKE) ---
  if (hasSword) {
    ctx.save();
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(rHand.x, rHand.y);
    ctx.lineTo(rHand.x + 28, rHand.y - 18);
    ctx.stroke();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rHand.x + 5, rHand.y - 3);
    ctx.lineTo(rHand.x + 24, rHand.y - 15);
    ctx.stroke();
    ctx.restore();
  }

  // --- DRAW HEAD ---
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = inkColor;
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.arc(0, headY, headR, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // --- NARUTO FEATURES ---
  if (isNaruto) {
    // Spiky Blonde Hair
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.moveTo(-headR, headY - 1);
    ctx.lineTo(-headR - 5, headY - 9);
    ctx.lineTo(-5, headY - 12);
    ctx.lineTo(0, headY - 19);
    ctx.lineTo(6, headY - 12);
    ctx.lineTo(headR + 5, headY - 9);
    ctx.lineTo(headR, headY - 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Leaf Headband
    ctx.fillStyle = '#2563EB';
    ctx.fillRect(-headR, headY - 5, headR * 2, 5);

    // Metal Plate
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(-5, headY - 4.5, 10, 4);

    // Fluttering Ribbon
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    const ribSin = Math.sin(elapsed * 18) * 5;
    ctx.moveTo(-headR, headY - 3);
    ctx.quadraticCurveTo(-headR - 10, headY - 7 + ribSin, -headR - 20, headY - 5 - ribSin);
    ctx.stroke();

    // Whisker Marks
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(2, headY + 1); ctx.lineTo(7, headY);
    ctx.moveTo(2, headY + 4); ctx.lineTo(7, headY + 3);
    ctx.stroke();
  } else {
    // --- SASUKE FEATURES ---
    // Dark Spiky Hair with Framing Bangs
    ctx.fillStyle = '#1E1B4B';
    ctx.beginPath();
    ctx.moveTo(-headR - 2, headY);
    ctx.lineTo(-headR - 6, headY - 7);
    ctx.lineTo(-headR - 10, headY + 3);
    ctx.lineTo(-4, headY - 17);
    ctx.lineTo(4, headY - 17);
    ctx.lineTo(headR + 4, headY - 7);
    ctx.lineTo(headR + 2, headY + 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rogue Headband
    ctx.fillStyle = '#334155';
    ctx.fillRect(-headR, headY - 5, headR * 2, 5);

    // Rogue Scratch Line
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-5, headY - 2.5);
    ctx.lineTo(5, headY - 2.5);
    ctx.stroke();

    // Glowing Crimson Sharingan
    ctx.save();
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(4.5, headY, 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(4.5, headY, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Popped High Collar
    ctx.strokeStyle = '#312E81';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(-5, neckY + 1);
    ctx.lineTo(-10, neckY - 6);
    ctx.moveTo(5, neckY + 1);
    ctx.lineTo(10, neckY - 6);
    ctx.stroke();
  }

  ctx.restore();
}
