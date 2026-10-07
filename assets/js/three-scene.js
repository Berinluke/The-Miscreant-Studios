/**
 * 3D CYBERPUNK ATMOSPHERIC CANVAS (Three.js)
 * Soft Floating Bokeh Embers - Strictly Left-Half Only (Clean Joystick Stage)
 */

class Cyber3DScene {
  constructor() {
    this.container = document.getElementById('webgl-canvas');
    if (!this.container || typeof THREE === 'undefined') return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.particleData = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.init();
  }

  init() {
    // 1. Scene & Camera setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 200;

    const heroEl = document.getElementById('hero');
    const width = heroEl ? heroEl.clientWidth : window.innerWidth;
    const height = heroEl ? heroEl.clientHeight : window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // 2. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Build Floating Embers strictly on the Left Half
    this.buildLeftHalfEmbers();

    // 4. Event Listeners
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });

    // 5. Render Loop
    this.animate();
  }

  buildLeftHalfEmbers() {
    const count = 50; // Perfectly distributed throughout the entire left stage box
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0xc084fc), // Bright neon violet
      new THREE.Color(0xd8b4fe), // Luminous lavender
      new THREE.Color(0xa855f7), // Vivid purple
      new THREE.Color(0xe879f9), // Glowing fuchsia
      new THREE.Color(0xffffff)  // Crisp white ember core
    ];

    for (let i = 0; i < count; i++) {
      // Fully span across the highlighted left box:
      // X from far left edge (-210) all the way up to the border line right before controller (+20)
      // Y across the full vertical height (-115 to +115)
      positions[i * 3] = -210 + Math.random() * 230; 
      positions[i * 3 + 1] = (Math.random() - 0.5) * 230;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      this.particleData.push({
        vy: 0.05 + Math.random() * 0.09,
        phase: Math.random() * Math.PI * 2,
        startX: positions[i * 3]
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // High-resolution soft glowing radial bokeh particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(232, 121, 249, 0.9)');
    grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.5)');
    grad.addColorStop(0.8, 'rgba(124, 58, 237, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);

    // 1. Group A: 60% small delicate dots (like the old subtle size ~ 3.6)
    const smallCount = 33;
    const smallGeo = new THREE.BufferGeometry();
    const smallPos = new Float32Array(smallCount * 3);
    const smallCol = new Float32Array(smallCount * 3);

    for (let i = 0; i < smallCount; i++) {
      smallPos[i * 3] = -210 + Math.random() * 230;
      smallPos[i * 3 + 1] = (Math.random() - 0.5) * 230;
      smallPos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      smallCol[i * 3] = col.r;
      smallCol[i * 3 + 1] = col.g;
      smallCol[i * 3 + 2] = col.b;

      this.particleData.push({
        group: 'small',
        index: i,
        vy: 0.04 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2
      });
    }

    smallGeo.setAttribute('position', new THREE.BufferAttribute(smallPos, 3));
    smallGeo.setAttribute('color', new THREE.BufferAttribute(smallCol, 3));

    const smallMat = new THREE.PointsMaterial({
      size: 3.6, // 60% are small like the old subtle size
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.smallParticles = new THREE.Points(smallGeo, smallMat);
    this.scene.add(this.smallParticles);

    // 2. Group B: 40% uniform medium-sized dots (~ 6.8)
    const mediumCount = 22;
    const medGeo = new THREE.BufferGeometry();
    const medPos = new Float32Array(mediumCount * 3);
    const medCol = new Float32Array(mediumCount * 3);

    for (let i = 0; i < mediumCount; i++) {
      medPos[i * 3] = -210 + Math.random() * 230;
      medPos[i * 3 + 1] = (Math.random() - 0.5) * 230;
      medPos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      medCol[i * 3] = col.r;
      medCol[i * 3 + 1] = col.g;
      medCol[i * 3 + 2] = col.b;

      this.particleData.push({
        group: 'medium',
        index: i,
        vy: 0.05 + Math.random() * 0.09,
        phase: Math.random() * Math.PI * 2
      });
    }

    medGeo.setAttribute('position', new THREE.BufferAttribute(medPos, 3));
    medGeo.setAttribute('color', new THREE.BufferAttribute(medCol, 3));

    const medMat = new THREE.PointsMaterial({
      size: 6.8, // 40% are uniform medium size
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.medParticles = new THREE.Points(medGeo, medMat);
    this.scene.add(this.medParticles);
  }

  onMouseMove(e) {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    this.targetX = (e.clientX - halfWidth) * 0.015;
    this.targetY = (e.clientY - halfHeight) * 0.015;
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    const heroEl = document.getElementById('hero');
    const width = heroEl ? heroEl.clientWidth : window.innerWidth;
    const height = heroEl ? heroEl.clientHeight : window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Only animate and render when hero landing page is visible in viewport!
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom <= 0) {
        return; // Paused: user scrolled past landing page!
      }
    }

    // Gentle camera parallax
    this.mouseX += (this.targetX - this.mouseX) * 0.04;
    this.mouseY += (this.targetY - this.mouseY) * 0.04;

    this.camera.position.x = this.mouseX;
    this.camera.position.y = -this.mouseY;
    this.camera.lookAt(0, 0, 0);

    // Animate both groups floating upwards within the marked border box
    const smallPositions = this.smallParticles?.geometry.attributes.position.array;
    const medPositions = this.medParticles?.geometry.attributes.position.array;

    for (let i = 0; i < this.particleData.length; i++) {
      const data = this.particleData[i];
      data.phase += 0.01;
      const pos = data.group === 'small' ? smallPositions : medPositions;
      const idx = data.index * 3;

      if (!pos) continue;

      // Float upwards
      pos[idx + 1] += data.vy;
      pos[idx] += Math.sin(data.phase) * 0.03;

      // Wrap around horizontally if drifting past the border right edge (X = +22)
      if (pos[idx] > 22) {
        pos[idx] = -210;
      }

      // Wrap around vertically
      if (pos[idx + 1] > 115) {
        pos[idx + 1] = -115;
        pos[idx] = -210 + Math.random() * 230;
      }
    }

    if (this.smallParticles) this.smallParticles.geometry.attributes.position.needsUpdate = true;
    if (this.medParticles) this.medParticles.geometry.attributes.position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyber3D = new Cyber3DScene();
});
