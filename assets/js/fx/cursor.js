/**
 * MASTERPIECE AWWWARDS-CALIBER TARGETING RETICLE & MAGNETIC TELEMETRY CURSOR
 * 60/120 FPS Lerped Dynamics | Magnetic Proximity Snapping | Dynamic Action Badges | Ambient Spotlight Sync
 */

class CyberCursor {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.label = null;
    this.coords = null;

    this.mouse = { x: -200, y: -200 };
    this.pos = { x: -200, y: -200 };
    this.magneticTarget = null;
    this.lerpSpeed = 0.22;
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

    this.label = document.createElement('div');
    this.label.className = 'cyber-cursor-label';
    this.label.textContent = 'EXPLORE';

    this.coords = document.createElement('div');
    this.coords.className = 'cyber-cursor-coords';
    this.coords.textContent = 'SYS://READY';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
    document.body.appendChild(this.label);
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

    // 1. Position dot immediately for instantaneous responsiveness
    if (this.dot) {
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    }

    // 2. Position dynamic label slightly offset
    if (this.label) {
      this.label.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y - 28}px)`;
    }

    // 3. Update telemetry badge
    if (this.coords) {
      this.coords.style.transform = `translate(${this.mouse.x + 18}px, ${this.mouse.y + 18}px)`;
      this.coords.textContent = `X:${String(this.mouse.x).padStart(4, '0')} Y:${String(this.mouse.y).padStart(4, '0')}`;
    }

    // 4. Global Ambient Cursor Spotlight CSS Variables
    document.documentElement.style.setProperty('--spot-x', `${this.mouse.x}px`);
    document.documentElement.style.setProperty('--spot-y', `${this.mouse.y}px`);
  }

  onMouseDown() {
    if (this.ring) this.ring.classList.add('cursor-down');
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  onMouseUp() {
    if (this.ring) this.ring.classList.remove('cursor-down');
  }

  setLabel(text, type = 'default') {
    if (!this.label) return;
    this.label.textContent = text;
    this.label.className = `cyber-cursor-label label-visible ${type ? 'label-' + type : ''}`;
  }

  clearLabel() {
    if (!this.label) return;
    this.label.className = 'cyber-cursor-label';
  }

  bindHoverElements() {
    // Magnetic target buttons
    const magneticButtons = document.querySelectorAll(
      '.btn-primary-glow, .island-cta-btn, .carousel-nav-btn, .island-cmd-trigger, .island-audio-toggle, #dossierAcknowledgeBtn'
    );

    magneticButtons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        this.magneticTarget = btn;
        if (this.ring) this.ring.classList.add('cursor-magnetic');
        if (btn.classList.contains('island-cta-btn') || btn.classList.contains('btn-primary-glow')) {
          this.setLabel('UPLINK', 'launch');
        }
      });
      btn.addEventListener('mouseleave', () => {
        this.magneticTarget = null;
        if (this.ring) this.ring.classList.remove('cursor-magnetic');
        this.clearLabel();
      });
    });

    // Games Carousel / 3D coverflow: [ DRAG ]
    const dragStages = document.querySelectorAll('.games-carousel-wrapper, .carousel-stage');
    dragStages.forEach(stage => {
      stage.addEventListener('mouseenter', (e) => {
        if (!e.target.closest('button, a')) {
          this.setLabel('DRAG / SCROLL', 'drag');
        }
      });
      stage.addEventListener('mouseleave', () => {
        this.clearLabel();
      });
    });

    // Cards / Dossier triggers: [ VIEW DOSSIER ]
    const dossierCards = document.querySelectorAll(
      '.carousel-card, .universe-game-card, .btn-dossier-trigger, .arsenal-card'
    );
    dossierCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (!e.target.closest('button, a')) {
          this.setLabel('VIEW DOSSIER', 'default');
        }
      });
      card.addEventListener('mouseleave', () => {
        this.clearLabel();
      });
    });

    // General clickable elements
    const generalTargets = document.querySelectorAll('a, button, input, .partner-logo-item, .cmd-item');
    generalTargets.forEach(el => {
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
    let targetX = this.mouse.x;
    let targetY = this.mouse.y;

    // If locked onto a magnetic button, pull the ring towards its center
    if (this.magneticTarget) {
      const rect = this.magneticTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Soft magnetic attraction pull
      targetX = targetX * 0.35 + centerX * 0.65;
      targetY = targetY * 0.35 + centerY * 0.65;
    }

    // Lerp smooth follow for the outer ring
    this.pos.x += (targetX - this.pos.x) * this.lerpSpeed;
    this.pos.y += (targetY - this.pos.y) * this.lerpSpeed;

    if (this.ring) {
      this.ring.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }

    this.rafId = requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cyberCursor = new CyberCursor();
});
