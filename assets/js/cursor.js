/**
 * CYBERPUNK TARGETING RETICLE & TELEMETRY CURSOR
 * 60/120 FPS Lerped Dynamics | Magnetic Lock-on | Coordinate Readout
 */

class CyberCursor {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.coords = null;

    this.mouse = { x: -100, y: -100 };
    this.pos = { x: -100, y: -100 };
    this.lerpSpeed = 0.18;
    this.rafId = null;

    this.init();
  }

  init() {
    // Only initialize on desktop/fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Create DOM elements
    this.dot = document.createElement('div');
    this.dot.className = 'cyber-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'cyber-cursor-ring';

    this.coords = document.createElement('div');
    this.coords.className = 'cyber-cursor-coords';
    this.coords.textContent = 'SYS://READY';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
    document.body.appendChild(this.coords);

    // Bind event listeners
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    window.addEventListener('mousedown', () => this.onMouseDown());
    window.addEventListener('mouseup', () => this.onMouseUp());

    this.bindHoverElements();
    this.render();
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    // Position dot immediately
    if (this.dot) {
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    }

    // Update telemetry badge
    if (this.coords) {
      this.coords.style.transform = `translate(${this.mouse.x + 16}px, ${this.mouse.y + 16}px)`;
      this.coords.textContent = `X:${String(this.mouse.x).padStart(4, '0')} Y:${String(this.mouse.y).padStart(4, '0')}`;
    }
  }

  onMouseDown() {
    if (this.ring) this.ring.classList.add('cursor-down');
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  onMouseUp() {
    if (this.ring) this.ring.classList.remove('cursor-down');
  }

  bindHoverElements() {
    const targets = document.querySelectorAll('a, button, input, .cyber-card, .genre-tag, .partner-logo-item');
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (this.ring) this.ring.classList.add('cursor-hover');
        if (window.cyberAudio) window.cyberAudio.playHover();
      });
      el.addEventListener('mouseleave', () => {
        if (this.ring) this.ring.classList.remove('cursor-hover');
      });
    });
  }

  render() {
    // Lerp smooth follow for the outer ring
    this.pos.x += (this.mouse.x - this.pos.x) * this.lerpSpeed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.lerpSpeed;

    if (this.ring) {
      this.ring.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }

    this.rafId = requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberCursor = new CyberCursor();
});
