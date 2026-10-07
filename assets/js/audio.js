/**
 * MASTERPIECE CYBERPUNK SYNTHESIZER AUDIO ENGINE (Web Audio API)
 * Zero external audio files | Pure native mathematical waveform synthesis | Audio Cockpit Controls
 */

class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted to respect browser policy, user opts in via navbar toggle
    this.initialized = false;
    this.init();
  }

  init() {
    // Check saved state
    const saved = localStorage.getItem('miscreant_audio_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }

    document.addEventListener('DOMContentLoaded', () => {
      this.bindNavbarToggle();
    });
  }

  bindNavbarToggle() {
    const toggleBtn = document.getElementById('islandAudioToggle');
    if (!toggleBtn) return;

    this.updateToggleUI(toggleBtn);

    toggleBtn.addEventListener('click', () => {
      const isMuted = this.toggleMute();
      this.updateToggleUI(toggleBtn);
      if (!isMuted) {
        this.playSuccess();
      }
    });
  }

  updateToggleUI(btn) {
    if (!btn) return;
    const label = btn.querySelector('.audio-toggle-label');
    if (this.isMuted) {
      btn.classList.remove('audio-active');
      if (label) label.textContent = 'SOUND: OFF';
      btn.setAttribute('aria-pressed', 'false');
    } else {
      btn.classList.add('audio-active');
      if (label) label.textContent = 'SOUND: ON';
      btn.setAttribute('aria-pressed', 'true');
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('miscreant_audio_muted', this.isMuted);
    if (!this.isMuted) {
      this.ensureContext();
    }
    return this.isMuted;
  }

  // Futuristic UI Hover Blip (subtle, high-frequency short ping)
  playHover() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Tactical Cyber Click (punchy low-mid blip with resonant decay)
  playClick() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  // Low-frequency Sub-Bass Chapter Switch Sweep
  playSectionTransition() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(95, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  // Cyber Glitch Noise Burst
  playGlitch() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.07;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.07);
    } catch (e) {}
  }

  // Success Confirmation Chime (two-tone futuristic harmony)
  playSuccess() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [587.33, 880].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.06, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.18);
      });
    } catch (e) {}
  }
}

window.cyberAudio = new CyberAudioEngine();
