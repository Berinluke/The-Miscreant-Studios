/**
 * THE MISCREANT STUDIOS — STUDIO EXPANSION CONTROLLER (SECTIONS 04 - 10)
 * Handles interactive Universe filters, Transmissions terminal, Careers application flow,
 * Command Palette (⌘K), Tactical Dossier Modal, and Bento Card Mouse Spotlight.
 */

document.addEventListener('DOMContentLoaded', () => {
  initUniverseFilters();
  initTransmissionFilters();
  initCareerInteractions();
  initContactUplinkForm();
  initDossierModal();
  initCommandPalette();
  initBentoSpotlight();
  initActiveNavHighlight();
});

/* ==========================================================================
   1. ⌘K CYBER COMMAND PALETTE CONTROLLER
   ========================================================================== */
function initCommandPalette() {
  const palette = document.getElementById('commandPalette');
  const triggerBtn = document.getElementById('cmdPaletteTrigger');
  const closeBtn = document.getElementById('cmdCloseBtn');
  const searchInput = document.getElementById('cmdSearchInput');
  const resultsContainer = document.getElementById('cmdResultsList');

  if (!palette || !searchInput) return;

  const cmdItems = Array.from(palette.querySelectorAll('.cmd-item'));
  let selectedIndex = -1;

  function openPalette() {
    palette.classList.add('active');
    palette.setAttribute('aria-hidden', 'false');
    searchInput.value = '';
    filterItems('');
    selectedIndex = -1;
    updateSelection();
    setTimeout(() => searchInput.focus(), 60);

    if (window.cyberAudio && typeof window.cyberAudio.playClick === 'function') {
      window.cyberAudio.playClick();
    }
  }

  function closePalette() {
    palette.classList.remove('active');
    palette.setAttribute('aria-hidden', 'true');
    searchInput.blur();
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closePalette);
  }

  palette.addEventListener('click', (e) => {
    if (e.target === palette) {
      closePalette();
    }
  });

  // Global Keyboard Shortcuts (⌘K or Ctrl+K, ESC)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
  });

  // Search input filtering
  searchInput.addEventListener('input', () => {
    filterItems(searchInput.value.trim().toLowerCase());
  });

  function filterItems(query) {
    let visibleItems = [];
    cmdItems.forEach(item => {
      const title = (item.getAttribute('data-title') || '').toLowerCase();
      const label = item.querySelector('.cmd-item-label')?.textContent.toLowerCase() || '';
      if (!query || title.includes(query) || label.includes(query)) {
        item.style.display = 'flex';
        visibleItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });
    selectedIndex = visibleItems.length > 0 ? 0 : -1;
    updateSelection(visibleItems);
  }

  function updateSelection(visibleList) {
    const list = visibleList || cmdItems.filter(item => item.style.display !== 'none');
    cmdItems.forEach(item => item.classList.remove('selected'));
    if (selectedIndex >= 0 && selectedIndex < list.length) {
      list[selectedIndex].classList.add('selected');
      list[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Keyboard navigation within the command palette
  searchInput.addEventListener('keydown', (e) => {
    const visibleList = cmdItems.filter(item => item.style.display !== 'none');
    if (!visibleList.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % visibleList.length;
      updateSelection(visibleList);
      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + visibleList.length) % visibleList.length;
      updateSelection(visibleList);
      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < visibleList.length) {
        const targetHref = visibleList[selectedIndex].getAttribute('href');
        closePalette();
        if (targetHref) {
          const targetEl = document.querySelector(targetHref);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  });

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      closePalette();
    });
  });
}

/* ==========================================================================
   2. TACTICAL CLASSIFIED DOSSIER MODAL (Replacing basic alert)
   ========================================================================== */
function initDossierModal() {
  const modal = document.getElementById('dossierModal');
  const closeBtn = document.getElementById('dossierCloseBtn');
  const ackBtn = document.getElementById('dossierAcknowledgeBtn');
  const titleEl = document.getElementById('dossierTitle');
  const descEl = document.getElementById('dossierDesc');
  const statusEl = document.getElementById('dossierStatus');
  const combatEl = document.getElementById('dossierCombat');
  const engineEl = document.getElementById('dossierEngine');
  const briefingBtns = document.querySelectorAll('.btn-briefing-trigger');

  if (!modal) return;

  function openDossier(gameName, gameInfo) {
    if (titleEl) titleEl.textContent = gameName.toUpperCase();
    if (descEl) descEl.textContent = gameInfo;
    
    if (statusEl) {
      if (gameName.includes('VOID')) {
        statusEl.textContent = 'STATUS: MMORPG LIVE CLUSTER // VOIDBREAKER 2.4';
        if (combatEl) combatEl.textContent = '64-Player Distributed Server Mesh';
        if (engineEl) engineEl.textContent = 'UE5.5 Lumen & Nanite Micro-Polygons';
      } else if (gameName.includes('OMEGA')) {
        statusEl.textContent = 'STATUS: CLOSED BETA WAVE 03 // 128HZ';
        if (combatEl) combatEl.textContent = '128Hz Bare-Metal UDP & Kernel Anti-Cheat';
        if (engineEl) engineEl.textContent = 'Chaos Voxel Destruction Engine';
      } else if (gameName.includes('VELOCITY')) {
        statusEl.textContent = 'STATUS: STEAM NEXT FEST DEMO // IN-DEV';
        if (combatEl) combatEl.textContent = 'Sub-Stepping Physics Solver (< 1ms)';
        if (engineEl) engineEl.textContent = 'Native WebGPU Shaders (120+ FPS)';
      } else {
        statusEl.textContent = 'STATUS: CLASSIFIED // INTERNAL PROTOCOL';
        if (combatEl) combatEl.textContent = 'Zero-G Depressurization Hazards';
        if (engineEl) engineEl.textContent = 'Dynamic Volumetric Sound Occlusion';
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    if (window.cyberAudio && typeof window.cyberAudio.playClick === 'function') {
      window.cyberAudio.playClick();
    }
  }

  function closeDossier() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  briefingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const game = btn.getAttribute('data-game') || 'Classified Project';
      const info = btn.getAttribute('data-info') || 'Tactical telemetry is currently classified.';
      openDossier(game, info);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDossier);
  if (ackBtn) ackBtn.addEventListener('click', closeDossier);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeDossier();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeDossier();
    }
  });
}

/* ==========================================================================
   3. BENTO CARD MOUSE SPOTLIGHT (Dynamic 2026 Lighting Glow)
   ========================================================================== */
function initBentoSpotlight() {
  const cards = document.querySelectorAll('.about-bento-card, .universe-game-card, .team-card, .culture-pillar-card, .contact-hub-card, .contact-terminal-form-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   4. ACTIVE NAV LINK SCROLL HIGHLIGHT
   ========================================================================== */
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.island-nav-link');
  const sections = document.querySelectorAll('section[id], main[id]');

  if (!navLinks.length || !sections.length) return;

  function updateNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let currentId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ==========================================================================
   5. GAME UNIVERSE CATEGORY FILTER
   ========================================================================== */
function initUniverseFilters() {
  const filterBtns = document.querySelectorAll('.universe-filter-btn');
  const gameCards = document.querySelectorAll('.universe-game-card');

  if (!filterBtns.length || !gameCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter') || 'all';

      gameCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });

      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }
    });
  });
}

/* ==========================================================================
   6. TRANSMISSIONS TERMINAL FILTERS
   ========================================================================== */
function initTransmissionFilters() {
  const filterBtns = document.querySelectorAll('.term-filter-btn');
  const transRows = document.querySelectorAll('.transmission-row');

  if (!filterBtns.length || !transRows.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-type') || 'all';

      transRows.forEach(row => {
        const rowType = row.getAttribute('data-type');
        if (filterType === 'all' || rowType === filterType) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });

      if (window.cyberAudio && typeof window.cyberAudio.playHover === 'function') {
        window.cyberAudio.playHover();
      }
    });
  });
}

/* ==========================================================================
   7. CAREER APPLICATION FLOW
   ========================================================================== */
function initCareerInteractions() {
  const applyBtns = document.querySelectorAll('.job-action-btn');
  const contactSubject = document.getElementById('contact-subject');
  const contactSection = document.getElementById('contact');

  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const roleName = btn.getAttribute('data-role') || 'Open Role';
      
      if (contactSubject && contactSection) {
        contactSubject.value = 'careers';
        const msgField = document.getElementById('contact-message');
        if (msgField) {
          msgField.value = `// APPLICATION FOR: ${roleName}\n// Portfolio Link:\n// Experience Summary:\n`;
          msgField.focus();
        }
        
        contactSection.scrollIntoView({ behavior: 'smooth' });

        if (window.cyberAudio && typeof window.cyberAudio.playClick === 'function') {
          window.cyberAudio.playClick();
        }
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT UPLINK FORM TRANSMISSION SIMULATOR
   ========================================================================== */
function initContactUplinkForm() {
  const form = document.getElementById('contact-uplink-form');
  const submitBtn = document.getElementById('btn-transmit-submit');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');

    if (!nameInput || !emailInput || !msgInput) return;
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('Please fill out all required transmission credentials.');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>ENCRYPTING PACKET (AES-256)...</span>`;

    if (window.cyberAudio && typeof window.cyberAudio.playClick === 'function') {
      window.cyberAudio.playClick();
    }

    setTimeout(() => {
      submitBtn.innerHTML = `<span>TRANSMITTING SIGNAL TO CHENNAI HQ...</span>`;
    }, 800);

    setTimeout(() => {
      submitBtn.innerHTML = `<span>✓ SIGNAL RECEIVED // 200 OK</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      submitBtn.style.borderColor = '#34d399';

      const successToast = document.createElement('div');
      successToast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 3000;
        background: rgba(14, 11, 28, 0.95);
        border: 1px solid #34d399;
        border-radius: 14px;
        padding: 16px 24px;
        color: #ffffff;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(52, 211, 153, 0.4);
      `;
      successToast.innerHTML = `
        <div style="color: #34d399; font-weight: bold; margin-bottom: 4px;">[TRANSMISSION DISPATCHED // 200 OK]</div>
        <div>Agent: ${nameInput.value}</div>
        <div style="color: #94a3b8; font-size: 0.7rem; margin-top: 4px;">Signal ingested into Chennai HQ dispatch terminal.</div>
      `;
      document.body.appendChild(successToast);
      setTimeout(() => successToast.remove(), 5000);

      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
      }, 4000);
    }, 1800);
  });
}
