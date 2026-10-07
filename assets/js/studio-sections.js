/**
 * THE MISCREANT STUDIOS — STUDIO EXPANSION CONTROLLER (SECTIONS 04 - 10)
 * Handles interactive Universe filters, Transmissions terminal, Careers application flow,
 * and encrypted Contact Uplink form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initUniverseFilters();
  initTransmissionFilters();
  initCareerInteractions();
  initContactUplinkForm();
  initDossierModal();
});

/* ==========================================================================
   1. GAME UNIVERSE CATEGORY FILTER
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
   2. TRANSMISSIONS TERMINAL FILTERS
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
   3. CAREER APPLICATION FLOW
   ========================================================================== */
function initCareerInteractions() {
  const applyBtns = document.querySelectorAll('.job-action-btn');
  const contactSubject = document.getElementById('contact-subject');
  const contactSection = document.getElementById('contact');

  applyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
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
   4. CONTACT UPLINK FORM TRANSMISSION SIMULATOR
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

      alert(`[TRANSMISSION DISPATCHED]\n\nAgent: ${nameInput.value}\nFrequency: ${emailInput.value}\nStatus: Enroute to The Miscreant Studios Central Dispatch.`);
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

/* ==========================================================================
   5. DOSSIER MODAL PREVIEW FOR GAMES & TRANSMISSIONS
   ========================================================================== */
function initDossierModal() {
  const briefingBtns = document.querySelectorAll('.btn-briefing-trigger');
  
  briefingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const gameTitle = btn.getAttribute('data-game') || 'Classified Project';
      const gameDetails = btn.getAttribute('data-info') || 'Detailed tactical telemetry is currently classified under studio NDA.';

      alert(`[THE MISCREANT STUDIOS // CLASSIFIED DOSSIER]\n\nProject: ${gameTitle}\n\n${gameDetails}`);

      if (window.cyberAudio && typeof window.cyberAudio.playClick === 'function') {
        window.cyberAudio.playClick();
      }
    });
  });
}
