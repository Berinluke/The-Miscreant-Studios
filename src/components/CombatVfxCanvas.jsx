import React, { useEffect, useRef } from 'react';

export default function CombatVfxCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Bullet Tracers (Supersonic Combat Rounds)
    class Tracer {
      constructor() {
        this.reset();
      }

      reset() {
        // Bullets fly across the battlefield (some toward operator, some across)
        this.angle = (Math.random() * 12 - 6) * (Math.PI / 180); // Slight angle
        this.x = -Math.random() * 600;
        this.y = height * 0.15 + Math.random() * (height * 0.75);
        this.speed = 32 + Math.random() * 26; // High velocity
        this.length = 140 + Math.random() * 160;
        this.thickness = 1.8 + Math.random() * 1.5;
        this.alpha = 0.8 + Math.random() * 0.2;
        // 75% incandescent gold, 25% crimson tracer
        this.colorType = Math.random() > 0.3 ? 'gold' : 'crimson';
        this.hasHit = false;
        // Impact point around operator zone (right 45% of screen)
        this.impactX = width * (0.62 + Math.random() * 0.3);
      }

      update(sparks) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Trigger ricochet spark explosion when hitting combat zone
        if (!this.hasHit && this.x >= this.impactX) {
          this.hasHit = true;
          const sparkCount = 12 + Math.floor(Math.random() * 10);
          for (let i = 0; i < sparkCount; i++) {
            sparks.push(new Spark(this.x, this.y, this.colorType));
          }
        }

        if (this.x - this.length > width + 200) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const grad = ctx.createLinearGradient(-this.length, 0, 0, 0);
        if (this.colorType === 'gold') {
          grad.addColorStop(0, 'rgba(255, 180, 50, 0)');
          grad.addColorStop(0.5, 'rgba(255, 200, 80, 0.4)');
          grad.addColorStop(0.85, 'rgba(255, 235, 160, 0.9)');
          grad.addColorStop(1, '#ffffff');
        } else {
          grad.addColorStop(0, 'rgba(255, 20, 50, 0)');
          grad.addColorStop(0.5, 'rgba(255, 31, 61, 0.4)');
          grad.addColorStop(0.85, 'rgba(255, 80, 100, 0.9)');
          grad.addColorStop(1, '#ffffff');
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-this.length, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Glowing tracer tip head
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.colorType === 'gold' ? '#ffd700' : '#ff1f3d';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, this.thickness * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Ricochet Spark Explosion Particles
    class Spark {
      constructor(x, y, colorType) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        this.vx = Math.cos(angle) * speed + (Math.random() - 0.2) * 4;
        this.vy = Math.sin(angle) * speed - Math.random() * 3;
        this.gravity = 0.18;
        this.life = 0;
        this.maxLife = 20 + Math.random() * 25;
        this.size = 1.2 + Math.random() * 2;
        this.colorType = colorType;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life++;
      }

      draw() {
        const remaining = 1 - this.life / this.maxLife;
        if (remaining <= 0) return;
        ctx.save();
        ctx.globalAlpha = remaining;
        ctx.fillStyle = this.colorType === 'gold' ? '#ffe066' : '#ff3355';
        ctx.shadowColor = this.colorType === 'gold' ? '#ffd700' : '#ff1f3d';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * remaining, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Atmospheric Floating Embers
    class Ember {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = width * 0.4 + Math.random() * (width * 0.6);
        this.y = height + Math.random() * 50;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = -(1.2 + Math.random() * 2);
        this.size = 1 + Math.random() * 2.2;
        this.alpha = 0.3 + Math.random() * 0.6;
        this.decay = 0.003 + Math.random() * 0.005;
        this.hue = Math.random() > 0.4 ? '#ff2a3b' : '#ffaa00';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        if (this.alpha <= 0 || this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.hue;
        ctx.shadowColor = this.hue;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Floating 3D Geometric Shards (Ruby Crystals & Gold Shards)
    class CrystalShard {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = width * (0.55 + Math.random() * 0.42);
        this.y = height * (0.1 + Math.random() * 0.85);
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.size = 12 + Math.random() * 24;
        this.isGold = Math.random() > 0.5;
        this.floatOffset = Math.random() * 100;
      }

      update(time) {
        this.rot += this.rotSpeed;
        this.currentY = this.y + Math.sin((time + this.floatOffset) * 0.002) * 12;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.currentY);
        ctx.rotate(this.rot);

        if (this.isGold) {
          // Floating 3D Gold Token Coin
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.7, 0, 0, Math.PI * 2);
          const goldGrad = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
          goldGrad.addColorStop(0, '#ffe066');
          goldGrad.addColorStop(0.5, '#d49b1a');
          goldGrad.addColorStop(1, '#8a5c05');
          ctx.fillStyle = goldGrad;
          ctx.shadowColor = '#ffd700';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Floating Ruby Gem Facet
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.75, 0);
          ctx.lineTo(0, this.size);
          ctx.lineTo(-this.size * 0.75, 0);
          ctx.closePath();
          const rubyGrad = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
          rubyGrad.addColorStop(0, '#ff4763');
          rubyGrad.addColorStop(0.6, '#b30920');
          rubyGrad.addColorStop(1, '#52030d');
          ctx.fillStyle = rubyGrad;
          ctx.shadowColor = '#ff1f3d';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 150, 170, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Initialize Pools
    const tracers = Array.from({ length: 6 }, () => new Tracer());
    const embers = Array.from({ length: 30 }, () => new Ember());
    const shards = Array.from({ length: 10 }, () => new CrystalShard());
    let sparks = [];

    let startTime = performance.now();

    const loop = (currentTime) => {
      // Clear with slight trail retention for motion blur
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Shards
      shards.forEach((shard) => {
        shard.update(currentTime);
        shard.draw();
      });

      // Update & Draw Embers
      embers.forEach((ember) => {
        ember.update();
        ember.draw();
      });

      // Update & Draw Bullet Tracers
      tracers.forEach((tracer) => {
        tracer.update(sparks);
        tracer.draw();
      });

      // Update & Draw Sparks
      sparks = sparks.filter((spark) => spark.life < spark.maxLife);
      sparks.forEach((spark) => {
        spark.update();
        spark.draw();
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20 w-full h-full"
    />
  );
}
