/**
 * THE MISCREANT STUDIOS - HERO & MACOS ECOSYSTEM CONTROLLER
 * Lenis Inertial Smooth Scrolling, Scroll Parallax Dissolve, 3D Tilt Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initGlitchScramble();
  initScrollReveal();
  initMacOsFiltering();
  initCard3DTilt();
  initStudioClock();
  initAudioInteractions();
  initGamesCarousel();
  initArsenalShowcase();
  initFullscreenScreenSnapping();
});

/* ==========================================================================
   1. LENIS INERTIAL ULTRA-SMOOTH SCROLLING ENGINE & PARALLAX HOOKS
   ========================================================================== */
function initLenisSmoothScroll() {
  const progressBar = document.getElementById('scroll-progress');
  const heroContent = document.querySelector('.hero-content');
  const heroForeground = document.querySelector('.hero-foreground-layer');
  const scrollIndicator = document.querySelector('.scroll-indicator-wrap');

  let lenis = null;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth luxury exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Unified Scroll Listener for Parallax & Progress
  function handleScrollUpdate(scrollY) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

    // 1. Update Neon Progress Bar
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // 2. Hero Dissolve & Parallax Transition
    const heroThreshold = window.innerHeight * 0.85;
    const heroProgress = Math.min(1, Math.max(0, scrollY / heroThreshold));

    if (heroContent) {
      const translateY = scrollY * -0.25;
      const scale = 1 - heroProgress * 0.05;
      const opacity = Math.max(0, 1 - heroProgress * 1.2);
      const blur = heroProgress * 6;

      heroContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
      heroContent.style.opacity = opacity;
      heroContent.style.filter = `blur(${blur}px)`;
    }

    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 120);
      scrollIndicator.style.pointerEvents = scrollY > 120 ? 'none' : 'auto';
    }
  }

  if (lenis) {
    lenis.on('scroll', (e) => {
      handleScrollUpdate(e.scroll);
    });
  } else {
    // Native smooth fallback
    window.addEventListener('scroll', () => {
      handleScrollUpdate(window.scrollY);
    }, { passive: true });
  }

  // Smooth click scrolling for anchor links coordinated with screen snapper
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const secName = targetId.replace('#', '');
      const secIdx = ['hero', 'showcase', 'arsenal'].indexOf(secName);

      if (secIdx !== -1 && typeof window.goToScreen === 'function') {
        e.preventDefault();
        window.goToScreen(secIdx);
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: 0, duration: 1.1 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/* ==========================================================================
   2. TEXT GLITCH SCRAMBLE ON HOVER
   ========================================================================== */
function initGlitchScramble() {
  const chars = '!<>-_\\/[]{}—=+*^?#________010101';
  const scramblers = document.querySelectorAll('[data-scramble]');

  scramblers.forEach(el => {
    const originalText = el.getAttribute('data-scramble') || el.innerText;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      const maxIterations = originalText.length;
      clearInterval(el.scrambleTimer);

      if (window.cyberAudio) window.cyberAudio.playGlitch();

      el.scrambleTimer = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) return originalText[index];
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= maxIterations) {
          clearInterval(el.scrambleTimer);
          el.innerText = originalText;
        }
        iteration += 1 / 2;
      }, 25);
    });
  });
}

/* ==========================================================================
   3. SMOOTH SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. MACOS DOCK PILL CATEGORY FILTERING
   ========================================================================== */
function initMacOsFiltering() {
  const filterPills = document.querySelectorAll('.dock-pill');
  const cards = document.querySelectorAll('.macos-card');

  if (!filterPills.length || !cards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      if (window.cyberAudio) window.cyberAudio.playClick();

      const filter = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = card.classList.contains('card-featured-expansion') ? 'grid' : 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'perspective(1000px) rotateX(8deg) translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. 3D GYROSCOPE CARD PERSPECTIVE TILT & HOLOGRAPHIC GLARE SHEEN
   ========================================================================== */
function initCard3DTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.carousel-card, .arsenal-card, .macos-card');

  tiltCards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      // Only tilt the active card or static cards to maintain layout harmony
      const isCarousel = card.classList.contains('carousel-card') || card.classList.contains('arsenal-card');
      if (isCarousel && !card.classList.contains('active-card')) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const normX = (x / rect.width) - 0.5; // -0.5 to 0.5
        const normY = (y / rect.height) - 0.5; // -0.5 to 0.5

        const rotateY = (normX * 13).toFixed(2);
        const rotateX = (-normY * 13).toFixed(2);

        if (isCarousel) {
          card.style.transform = `translateX(0%) translateZ(28px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        } else {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }

        // Dynamic holographic glare reflection positioning
        card.style.setProperty('--glare-x', `${((normX + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${((normY + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-opacity', '1');
      });
    });

    card.addEventListener('mouseleave', () => {
      const isCarousel = card.classList.contains('carousel-card') || card.classList.contains('arsenal-card');
      if (isCarousel && !card.classList.contains('active-card')) return;

      if (rafId) cancelAnimationFrame(rafId);
      if (isCarousel) {
        card.style.transform = 'translateX(0%) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)';
      } else {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
      card.style.setProperty('--glare-opacity', '0');
    });
  });
}

/* ==========================================================================
   RGB CHROMATIC ABERRATION & NEURAL GLITCH BURST UTILITY
   ========================================================================== */
function triggerChromaticGlitch(trackEl) {
  if (!trackEl) return;
  trackEl.classList.remove('chromatic-flash');
  void trackEl.offsetWidth; // Force DOM reflow
  trackEl.classList.add('chromatic-flash');
  setTimeout(() => {
    trackEl.classList.remove('chromatic-flash');
  }, 160);
}

/* ==========================================================================
   6. MACOS STUDIO LIVE CLOCK (UTC/Local)
   ========================================================================== */
function initStudioClock() {
  const clockEl = document.getElementById('studio-live-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.innerText = `CLUSTER TIME: ${hours}:${minutes}:${seconds} UTC // MESH: ACTIVE`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. AUDIO FEEDBACK HOOKS ON BUTTONS & LINKS
   ========================================================================== */
function initAudioInteractions() {
  const interactives = document.querySelectorAll('.btn-primary-glow, .btn-secondary-mac, .social-mac-btn, .scroll-indicator-wrap, .dock-pill, .carousel-nav-btn, .tech-card');

  interactives.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (window.cyberAudio) window.cyberAudio.playHover();
    });

    btn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playSuccess();
    });
  });
}

/* ==========================================================================
   8. 3D COVERFLOW GAMES CAROUSEL (Infinite loop, autoplay right-to-left & controls)
   ========================================================================== */
function initGamesCarousel() {
  const carouselWrapper = document.getElementById('gamesCarousel');
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!carouselWrapper || !track) return;

  const cards = Array.from(track.querySelectorAll('.carousel-card'));
  const total = cards.length;
  if (!total) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isHovered = false;

  // Build pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to game slide ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        if (window.cyberAudio) window.cyberAudio.playClick();
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

  function updateCards() {
    const isMobile = window.innerWidth <= 768;

    cards.forEach((card, i) => {
      let diff = (i - currentIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      card.classList.remove('active-card');

      if (diff === 0) {
        // Active Center Focus Card
        card.classList.add('active-card');
        card.style.transform = 'translateX(0%) translateZ(0px) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '12';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'default';
      } else if (diff === 1) {
        // Right Card (Next)
        const offset = isMobile ? 'calc(105% + 8px)' : 'calc(100% + 36px)';
        const scale = isMobile ? '0.82' : '0.88';
        const opacity = isMobile ? '0.2' : '0.58';
        card.style.transform = `translateX(${offset}) translateZ(-70px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = '6';
        card.style.filter = 'brightness(0.65)';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
      } else if (diff === -1) {
        // Left Card (Previous)
        const offset = isMobile ? 'calc(-105% - 8px)' : 'calc(-100% - 36px)';
        const scale = isMobile ? '0.82' : '0.88';
        const opacity = isMobile ? '0.2' : '0.58';
        card.style.transform = `translateX(${offset}) translateZ(-70px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = '6';
        card.style.filter = 'brightness(0.65)';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
      } else {
        // Hidden / Rear Depth Cards
        card.style.transform = 'translateX(0%) translateZ(-250px) scale(0.68)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.filter = 'none';
        card.style.pointerEvents = 'none';
        card.style.cursor = 'default';
      }

      card.style.setProperty('--glare-opacity', '0');
    });

    // Update dot indicators
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(index) {
    currentIndex = (index + total) % total;
    triggerChromaticGlitch(track);
    updateCards();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Click adjacent cards to slide to center
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (i !== currentIndex) {
        if (window.cyberAudio) window.cyberAudio.playClick();
        goToSlide(i);
      }
    });
  });

  // Buttons navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      nextSlide();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = carouselWrapper.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Touch Swipe for mobile/tablets
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    resumeAutoplay();
  }, { passive: true });

  // Autoplay functionality: moves automatically right to left
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 3000);
  }

  function pauseAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resumeAutoplay() {
    startAutoplay();
  }

  function resetAutoplay() {
    pauseAutoplay();
    resumeAutoplay();
  }

  // Pause on hover so user can easily read details & click buttons
  carouselWrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    pauseAutoplay();
  });

  carouselWrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    resumeAutoplay();
  });

  window.addEventListener('resize', () => {
    updateCards();
  });

  // Launch initial slide layout and begin autoplay
  updateCards();
  startAutoplay();
}

/* ==========================================================================
   9. ARSENAL 3D FOCUS CAROUSEL (Matching Running Operations Cover-Flow)
   ========================================================================== */
function initArsenalShowcase() {
  const carouselWrapper = document.getElementById('arsenalCarousel');
  const track = document.getElementById('arsenalCarouselTrack');
  const prevBtn = document.getElementById('arsenalPrevBtn');
  const nextBtn = document.getElementById('arsenalNextBtn');
  const dotsContainer = document.getElementById('arsenalDots');
  const filterPills = document.querySelectorAll('.arsenal-dock-pill');

  if (!carouselWrapper || !track) return;

  const allCards = Array.from(track.querySelectorAll('.arsenal-card'));
  if (allCards.length === 0) return;

  let activeFilter = 'all';
  let filteredCards = [...allCards];
  let currentIndex = 0;
  let autoplayTimer = null;
  let isHovered = false;

  // Build pagination dots
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    filteredCards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `arsenal-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Navigate to arsenal slide ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', () => {
        if (window.cyberAudio && window.cyberAudio.playClick) window.cyberAudio.playClick();
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function getDots() {
    return dotsContainer ? Array.from(dotsContainer.querySelectorAll('.arsenal-dot')) : [];
  }

  function updateCards() {
    const total = filteredCards.length;
    if (total === 0) return;

    const isMobile = window.innerWidth <= 768;

    allCards.forEach(card => {
      // Hide cards not in active filter
      if (!filteredCards.includes(card)) {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.classList.remove('active-card');
        return;
      }
      card.style.display = 'flex';
    });

    filteredCards.forEach((card, i) => {
      let diff = (i - currentIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      card.classList.remove('active-card');

      if (diff === 0) {
        // Active Center Focus Card (Elevated & Highlighted)
        card.classList.add('active-card');
        card.style.transform = 'translateX(0%) translateZ(0px) scale(1)';
        card.style.opacity = '1';
        card.style.zIndex = '12';
        card.style.filter = 'none';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'default';
      } else if (diff === 1) {
        // Right Card (Next)
        const offset = isMobile ? 'calc(105% + 8px)' : 'calc(100% + 36px)';
        const scale = isMobile ? '0.82' : '0.88';
        const opacity = isMobile ? '0.2' : '0.58';
        card.style.transform = `translateX(${offset}) translateZ(-70px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = '6';
        card.style.filter = 'brightness(0.65)';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
      } else if (diff === -1) {
        // Left Card (Previous)
        const offset = isMobile ? 'calc(-105% - 8px)' : 'calc(-100% - 36px)';
        const scale = isMobile ? '0.82' : '0.88';
        const opacity = isMobile ? '0.2' : '0.58';
        card.style.transform = `translateX(${offset}) translateZ(-70px) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = '6';
        card.style.filter = 'brightness(0.65)';
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
      } else {
        // Rear Hidden Depth Cards
        card.style.transform = 'translateX(0%) translateZ(-250px) scale(0.68)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.filter = 'none';
        card.style.pointerEvents = 'none';
        card.style.cursor = 'default';
      }

      card.style.setProperty('--glare-opacity', '0');
    });

    // Update dots
    const dots = getDots();
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(index) {
    const total = filteredCards.length;
    if (total === 0) return;
    currentIndex = (index + total) % total;
    triggerChromaticGlitch(track);
    updateCards();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Click adjacent cards to slide to center
  allCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const cardIndex = filteredCards.indexOf(card);
      if (cardIndex !== -1 && cardIndex !== currentIndex) {
        if (window.cyberAudio && window.cyberAudio.playClick) window.cyberAudio.playClick();
        goToSlide(cardIndex);
      }
    });
  });

  // Category filter dock pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (window.cyberAudio && window.cyberAudio.playClick) window.cyberAudio.playClick();
      const filter = pill.getAttribute('data-filter');
      activeFilter = filter;

      filterPills.forEach(p => {
        const isMatch = p === pill;
        p.classList.toggle('active', isMatch);
        p.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      if (filter === 'all') {
        filteredCards = [...allCards];
      } else {
        filteredCards = allCards.filter(c => c.getAttribute('data-category') === filter);
      }

      currentIndex = 0;
      buildDots();
      updateCards();
      resetAutoplay();
    });
  });

  // Circular navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (window.cyberAudio && window.cyberAudio.playClick) window.cyberAudio.playClick();
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (window.cyberAudio && window.cyberAudio.playClick) window.cyberAudio.playClick();
      nextSlide();
    });
  }

  // Keyboard navigation when near arsenal
  window.addEventListener('keydown', (e) => {
    const rect = carouselWrapper.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoplay();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    resumeAutoplay();
  }, { passive: true });

  // Autoplay functionality
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 3000);
  }

  function pauseAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resumeAutoplay() {
    startAutoplay();
  }

  function resetAutoplay() {
    pauseAutoplay();
    resumeAutoplay();
  }

  // Pause on hover
  carouselWrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    pauseAutoplay();
  });

  carouselWrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    resumeAutoplay();
  });

  window.addEventListener('resize', () => {
    updateCards();
  });

  // Initial build
  buildDots();
  updateCards();
  startAutoplay();
}

/* ==========================================================================
   10. FULLSCREEN SCREEN-SNAP & GHOSTING TRANSITION CONTROLLER
   ========================================================================== */
function initFullscreenScreenSnapping() {
  const sectionIds = ['hero', 'showcase', 'arsenal'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length < 2) return;

  let currentIndex = 0;
  let isTransitioning = false;
  let lastScrollTime = 0;
  const SCROLL_COOLDOWN = 850; // ms

  // Create & mount the cyber screen navigator dock
  const navLabels = ['01 HERO', '02 OPERATIONS', '03 ARSENAL'];
  let navDock = document.querySelector('.cyber-screen-navigator');
  if (!navDock) {
    navDock = document.createElement('nav');
    navDock.className = 'cyber-screen-navigator';
    navDock.setAttribute('aria-label', 'Screen Navigation HUD');
    
    sections.forEach((sec, idx) => {
      const btn = document.createElement('button');
      btn.className = `screen-nav-dot ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('data-index', idx);
      btn.setAttribute('aria-label', `Navigate to ${navLabels[idx] || 'Section'}`);
      btn.innerHTML = `
        <span class="screen-dot-indicator"></span>
        <span class="screen-dot-label">${navLabels[idx] || `0${idx + 1}`}</span>
      `;
      btn.addEventListener('click', () => {
        goToScreen(idx);
      });
      navDock.appendChild(btn);
    });
    document.body.appendChild(navDock);
  }

  const navDots = navDock.querySelectorAll('.screen-nav-dot');

  function updateActiveNav(idx) {
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  function goToScreen(targetIndex) {
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    if (targetIndex === currentIndex && !isTransitioning) return;
    if (isTransitioning) return;

    isTransitioning = true;
    const departingIndex = currentIndex;
    const departingSec = sections[departingIndex];
    const targetSec = sections[targetIndex];

    currentIndex = targetIndex;
    updateActiveNav(targetIndex);

    // Audio cue on screen transition
    if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
      window.cyberAudio.playHover();
    }

    // Apply Ghosting Animation Effect
    if (departingSec && departingSec !== targetSec) {
      departingSec.classList.remove('ghost-in');
      departingSec.classList.add('ghost-out');
    }
    if (targetSec) {
      targetSec.classList.remove('ghost-out');
      targetSec.classList.add('ghost-in');
    }

    let completed = false;
    const onComplete = () => {
      if (completed) return;
      completed = true;
      setTimeout(() => {
        if (departingSec) departingSec.classList.remove('ghost-out');
        if (targetSec) targetSec.classList.remove('ghost-in');
        isTransitioning = false;
        syncActiveScreen();
      }, 150);
    };

    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(targetSec, {
        offset: 0,
        duration: 0.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: onComplete,
        lock: true
      });
      // Safety timeout: unlock transition state even if Lenis event drops
      setTimeout(onComplete, 950);
    } else {
      targetSec.scrollIntoView({ behavior: 'smooth' });
      setTimeout(onComplete, 850);
    }
  }

  // Expose to window for navbar links
  window.goToScreen = goToScreen;

  // Intercept desktop mouse wheel & trackpad gestures for screen-by-screen snapping
  let wheelAccumulator = 0;
  let wheelDebounceTimer = null;
  const WHEEL_THRESHOLD = 30; // Clean intentional flick threshold

  window.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 992) return; // Allow natural scrolling on smaller mobile/tablet devices

    // Prevent awkward fractional scroll positions between 100vh screens
    e.preventDefault();

    if (isTransitioning) return;

    const now = Date.now();
    if (now - lastScrollTime < 550) return;

    // Accumulate wheel delta to cleanly distinguish tiny nudges from intentional swipes
    wheelAccumulator += e.deltaY;

    clearTimeout(wheelDebounceTimer);
    wheelDebounceTimer = setTimeout(() => {
      wheelAccumulator = 0;
    }, 120);

    if (Math.abs(wheelAccumulator) >= WHEEL_THRESHOLD) {
      const direction = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      clearTimeout(wheelDebounceTimer);

      if (direction > 0 && currentIndex < sections.length - 1) {
        lastScrollTime = now;
        goToScreen(currentIndex + 1);
      } else if (direction < 0 && currentIndex > 0) {
        lastScrollTime = now;
        goToScreen(currentIndex - 1);
      }
    }
  }, { passive: false });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'PageDown'].includes(e.code) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (currentIndex < sections.length - 1) {
        e.preventDefault();
        goToScreen(currentIndex + 1);
      }
    } else if (['ArrowUp', 'PageUp'].includes(e.code) && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (currentIndex > 0) {
        e.preventDefault();
        goToScreen(currentIndex - 1);
      }
    }
  });

  // Touch swipe gesture navigation for tablets
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (window.innerWidth <= 768) return; // Allow natural mobile scrolling
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    const now = Date.now();

    if (Math.abs(diff) > 45 && !isTransitioning && now - lastScrollTime >= 550) {
      if (diff > 0 && currentIndex < sections.length - 1) {
        lastScrollTime = now;
        goToScreen(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        lastScrollTime = now;
        goToScreen(currentIndex - 1);
      }
    }
  }, { passive: true });

  // Sync index on scroll position (dominant visible screen detection with rAF throttle)
  let isSyncing = false;
  function syncActiveScreen() {
    if (isTransitioning || isSyncing) return;
    isSyncing = true;

    requestAnimationFrame(() => {
      isSyncing = false;
      let maxVisibleHeight = -1;
      let bestIdx = currentIndex;

      sections.forEach((sec, idx) => {
        const rect = sec.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          bestIdx = idx;
        }
      });

      if (maxVisibleHeight > 100 && currentIndex !== bestIdx) {
        currentIndex = bestIdx;
        updateActiveNav(bestIdx);
      }
    });
  }

  // Single dedicated scroll event listener to avoid duplicate execution
  if (window.lenisInstance) {
    window.lenisInstance.on('scroll', syncActiveScreen);
  } else {
    window.addEventListener('scroll', syncActiveScreen, { passive: true });
  }

  // Initial sync check
  syncActiveScreen();
}

