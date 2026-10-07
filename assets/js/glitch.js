/**
 * CYBERPUNK DIGITAL GLITCH & TEXT SCRAMBLE ENGINE
 */

class CyberGlitchEngine {
  constructor() {
    this.chars = '!<>-_\\/[]{}—=+*^?#________010101';
    this.init();
  }

  init() {
    this.bindTextScramblers();
  }

  scrambleElement(element, originalText, duration = 40) {
    let iteration = 0;
    const maxIterations = originalText.length;
    clearInterval(element.scrambleTimer);

    element.scrambleTimer = setInterval(() => {
      element.innerText = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (letter === ' ') return ' ';
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(element.scrambleTimer);
        element.innerText = originalText;
      }
      iteration += 1 / 2;
    }, duration);
  }

  bindTextScramblers() {
    const scramblers = document.querySelectorAll('[data-scramble]');
    scramblers.forEach(el => {
      const originalText = el.getAttribute('data-scramble') || el.innerText;
      el.addEventListener('mouseenter', () => {
        this.scrambleElement(el, originalText, 25);
        if (window.cyberAudio) window.cyberAudio.playGlitch();
      });
    });
  }

  triggerFullGlitch() {
    document.body.classList.add('cyber-glitching');
    if (window.cyberAudio) window.cyberAudio.playGlitch();
    setTimeout(() => {
      document.body.classList.remove('cyber-glitching');
    }, 250);
  }
}

window.cyberGlitch = new CyberGlitchEngine();
