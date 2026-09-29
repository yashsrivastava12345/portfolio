/**
 * ============================================================================
 * YASH SRIVASTAVA — DEVELOPER PORTFOLIO MAIN SCRIPT
 * ============================================================================
 * 
 * Features:
 * - Dynamic project card rendering & category filtering with ARIA state
 * - Accessible case-study modal with focus trap, focus restoration & Escape handler
 * - Interactive photo gallery & accessible touch/keyboard lightbox
 * - ARIA tablist architecture diagram switcher with keyboard support
 * - Responsive navigation with mobile menu accessibility & scroll-spy
 * - Secure static contact form integration with Web3Forms & honeypot protection
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectCards();
  initProjectFiltering();
  initModalHandlers();
  initPhotoGalleryAndLightbox();
  initArchitectureTabs();
  initNavigation();
  initContactForm();
});

/**
 * ============================================================================
 * ACCESSIBLE DIALOG HELPER (Focus Trap & Restoration)
 * ============================================================================
 */
let lastActiveElement = null;

function getFocusableElements(container) {
  if (!container) return [];
  const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)).filter(el => {
    return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
  });
}

function trapFocusInDialog(e, dialogEl) {
  if (e.key !== 'Tab') return;
  const focusables = getFocusableElements(dialogEl);
  if (focusables.length === 0) {
    e.preventDefault();
    return;
  }

  const firstEl = focusables[0];
  const lastEl = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    }
  } else {
    if (document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }
}

/**
 * ============================================================================
 * PROJECT CARDS & FILTERING
 * ============================================================================
 */

function initProjectCards(filterCategory = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container || !window.projectsData) return;

  container.innerHTML = '';

  const filteredProjects = filterCategory === 'all' 
    ? window.projectsData 
    : window.projectsData.filter(p => p.category === filterCategory);

  filteredProjects.forEach(project => {
    const card = document.createElement('article');
    
    let themeClass = '';
    if (project.id === 'tecar') themeClass = 'project-card-tecar';
    if (project.id === 'laser-lumino-pro') themeClass = 'project-card-laser';
    
    card.className = `project-card ${themeClass}`;
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-category', project.category);

    const tagsHtml = project.tags.slice(0, 6).map(tag => 
      `<span class="project-tag-pill">${escapeHtml(tag)}</span>`
    ).join('');

    let statusClass = 'status-active';
    if (project.statusType === 'milestone') statusClass = 'status-milestone';
    if (project.statusType === 'completed') statusClass = 'status-completed';
    if (project.statusType === 'concept') statusClass = 'status-concept';

    let visualCueHtml = '';
    if (project.visualCues) {
      visualCueHtml = `
        <div class="project-visual-cue ${project.cardTheme || ''}" aria-hidden="true">
          <span class="cue-icon">${escapeHtml(project.visualCues.icon || '')}</span>
          <span class="cue-text">${escapeHtml(project.visualCues.badge || '')}</span>
        </div>
      `;
    }

    const outcomeBadge = project.outcome ? `
      <span class="project-outcome-pill" title="Project Outcome / Status">
        ${escapeHtml(project.outcome)}
      </span>
    ` : '';

    const plainSummaryHtml = project.plainSummary ? `
      <div class="project-plain-summary">
        <span class="plain-summary-label">In Plain English:</span>
        <p class="plain-summary-text">${escapeHtml(project.plainSummary)}</p>
      </div>
    ` : '';

    const medicalNotice = (project.category === 'medical' && project.details && project.details.disclaimer) ? `
      <div class="project-card-disclaimer">
        <span aria-hidden="true">🛡</span> ${escapeHtml(project.details.disclaimer)}
      </div>
    ` : '';

    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-card-status-wrapper">
          <span class="project-status-badge ${statusClass}">${escapeHtml(project.status)}</span>
          ${outcomeBadge}
        </div>
        ${visualCueHtml}
        <div class="project-meta-category" title="${escapeHtml(project.categoryLabel)}">${escapeHtml(project.categoryLabel)}</div>
        <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
      </div>
      <div class="project-card-body">
        ${plainSummaryHtml}
        <p class="project-card-desc">${escapeHtml(project.shortDescription)}</p>
        <div class="project-tags-list">
          ${tagsHtml}
        </div>
        ${medicalNotice}
        <div class="project-card-actions">
          <button type="button" class="btn btn-outline-green btn-sm view-details-btn" data-project-id="${project.id}" aria-label="View detailed case study for ${escapeHtml(project.title)}">
            <span>View Case Study</span>
            <span aria-hidden="true">→</span>
          </button>
          ${project.links && project.links.github ? `
            <a href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="View source code on GitHub for ${escapeHtml(project.title)}">
              <span>GitHub</span>
            </a>
          ` : ''}
          ${project.links && project.links.demo ? `
            <a href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="Open live demonstration for ${escapeHtml(project.title)}">
              <span>Live Demo</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Rebind click events to new detail buttons
  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      lastActiveElement = btn;
      openProjectModal(id);
    });
  });
}

function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const category = btn.getAttribute('data-filter') || 'all';
      initProjectCards(category);
    });
  });
}

/**
 * ============================================================================
 * PROJECT DETAILS CASE-STUDY MODAL
 * ============================================================================
 */

function openProjectModal(projectId) {
  if (!window.projectsData) return;
  const project = window.projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  if (!modalOverlay || !modalContent) return;

  let statusClass = 'status-active';
  if (project.statusType === 'milestone') statusClass = 'status-milestone';
  if (project.statusType === 'completed') statusClass = 'status-completed';
  if (project.statusType === 'concept') statusClass = 'status-concept';

  const techBadges = (project.details.technologies || []).map(t => 
    `<span class="skill-pill">${escapeHtml(t)}</span>`
  ).join('');

  const featuresList = (project.details.keyFeatures || []).map(f => 
    `<li>${escapeHtml(f)}</li>`
  ).join('');

  const challengesList = (project.details.challenges || []).map(c => `
    <div class="modal-challenge-card">
      <div class="modal-challenge-title"><span aria-hidden="true">⚠️</span> Challenge: ${escapeHtml(c.challenge)}</div>
      <div class="modal-challenge-mitigation"><span aria-hidden="true">✓</span> Mitigation: ${escapeHtml(c.mitigation)}</div>
    </div>
  `).join('');

  const architectureSteps = project.architecture && project.architecture.steps ? project.architecture.steps.map((s, idx) => `
    <div class="arch-step-node" style="margin-bottom: 8px;">
      <div class="arch-step-num">0${idx + 1}</div>
      <div>
        <div class="arch-step-title">${escapeHtml(s.title)}</div>
        <div class="arch-step-desc">${escapeHtml(s.desc)}</div>
      </div>
    </div>
  `).join('') : '';

  modalContent.innerHTML = `
    <!-- Header -->
    <div class="modal-case-header">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
        <span class="project-meta-category">${escapeHtml(project.categoryLabel)}</span>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <span class="project-status-badge ${statusClass}">${escapeHtml(project.status)}</span>
          ${project.outcome ? `<span class="project-outcome-pill">${escapeHtml(project.outcome)}</span>` : ''}
        </div>
      </div>
      <h2 id="modal-project-title" style="font-size: 1.85rem; margin-bottom: 6px; line-height: 1.2;">${escapeHtml(project.title)}</h2>
      <div style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.98rem; margin-bottom: 14px;">${escapeHtml(project.subtitle)}</div>
      
      ${project.plainSummary ? `
        <div class="modal-plain-summary" style="margin-bottom: 16px;">
          <strong style="color: var(--accent-green); font-family: var(--font-mono); font-size: 0.85rem; display: block; margin-bottom: 4px;">In Plain English:</strong>
          <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">${escapeHtml(project.plainSummary)}</p>
        </div>
      ` : ''}

      ${project.details.disclaimer ? `
        <div class="modal-disclaimer-badge">
          <span aria-hidden="true">🛡</span> ${escapeHtml(project.details.disclaimer)}
        </div>
      ` : ''}
    </div>

    <!-- 1. Project Overview -->
    ${project.overview ? `
      <div>
        <h3 class="modal-section-title">1. Project Overview</h3>
        <p class="modal-text">${escapeHtml(project.overview)}</p>
      </div>
    ` : ''}

    <!-- 2. Problem & Engineering Solution -->
    <div>
      <h3 class="modal-section-title">2. Problem &amp; Engineering Solution</h3>
      <p class="modal-text" style="margin-bottom: 12px;"><strong>Problem / Purpose:</strong> ${escapeHtml(project.details.problem)}</p>
      <p class="modal-text"><strong>Engineering Solution:</strong> ${escapeHtml(project.details.solution)}</p>
    </div>

    <!-- 3. My Technical Contribution -->
    <div>
      <h3 class="modal-section-title">3. My Technical Contribution</h3>
      <p class="modal-text">${escapeHtml(project.details.myContribution)}</p>
    </div>

    <!-- 4. Key Architectural Features -->
    <div>
      <h3 class="modal-section-title">4. Key Features &amp; Capabilities</h3>
      <ul class="modal-features-list">
        ${featuresList}
      </ul>
    </div>

    <!-- 5. Technology Stack -->
    <div>
      <h3 class="modal-section-title">5. Technology Stack</h3>
      <div class="skill-items-container">
        ${techBadges}
      </div>
    </div>

    <!-- 6. Architecture & System Flow -->
    <div>
      <h3 class="modal-section-title">6. System Architecture &amp; Data Flow</h3>
      <pre class="modal-arch-diagram">${escapeHtml(project.architecture.flowDiagram)}</pre>
      ${architectureSteps ? `<div style="margin-top: 14px;">${architectureSteps}</div>` : ''}
    </div>

    <!-- 7. Hardware Integration -->
    ${project.details.hardwareIntegration ? `
      <div>
        <h3 class="modal-section-title">7. Hardware Integration &amp; Embedded Linux</h3>
        <p class="modal-text">${escapeHtml(project.details.hardwareIntegration)}</p>
      </div>
    ` : ''}

    <!-- 8. Engineering Challenges & Mitigations -->
    ${project.details.challenges && project.details.challenges.length > 0 ? `
      <div>
        <h3 class="modal-section-title">8. Engineering Challenges &amp; Mitigations</h3>
        <div>${challengesList}</div>
      </div>
    ` : ''}

    <!-- 9. Current Status & Future Improvements -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      <div style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-green); text-transform: uppercase;">9. Current Status / Outcome</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 6px;">${escapeHtml(project.details.currentStatus)}</p>
      </div>
      <div style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan); text-transform: uppercase;">10. Future Improvements</div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 6px;">${escapeHtml(project.details.futureImprovements)}</p>
      </div>
    </div>

    <!-- Links / Notes -->
    ${project.links ? `
      <div style="padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <span style="font-size: 0.86rem; color: var(--text-muted); font-family: var(--font-mono);">${escapeHtml(project.links.note || '')}</span>
        <div style="display: flex; gap: 10px;">
          ${project.links.github ? `
            <a href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <span>View Repository</span>
              <span aria-hidden="true">↗</span>
            </a>
          ` : ''}
          ${project.links.demo ? `
            <a href="${escapeHtml(project.links.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <span>View Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
          ` : ''}
        </div>
      </div>
    ` : ''}
  `;

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay || !modalOverlay.classList.contains('open')) return;

  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
    lastActiveElement.focus();
    lastActiveElement = null;
  }
}

/**
 * ============================================================================
 * PERSONAL PHOTO GALLERY & LIGHTBOX
 * ============================================================================
 */

let currentPhotoIndex = 0;
let galleryPhotoList = [];

function initPhotoGalleryAndLightbox() {
  if (window.personalPhotos && Array.isArray(window.personalPhotos)) {
    galleryPhotoList = window.personalPhotos;
  }

  // Profile photo trigger
  const profilePhotoCard = document.getElementById('main-profile-photo-card');
  if (profilePhotoCard) {
    const handleProfileOpen = () => {
      lastActiveElement = profilePhotoCard;
      openLightbox(0);
    };
    profilePhotoCard.addEventListener('click', handleProfileOpen);
    profilePhotoCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleProfileOpen();
      }
    });
  }

  // Gallery cards
  const galleryCards = document.querySelectorAll('.personal-gallery-card');
  galleryCards.forEach(card => {
    const handleCardOpen = () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        lastActiveElement = card;
        openLightbox(idx);
      }
    };
    card.addEventListener('click', handleCardOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardOpen();
      }
    });
  });

  // Gallery header trigger badge
  const galleryTrigger = document.getElementById('gallery-lightbox-trigger');
  if (galleryTrigger) {
    galleryTrigger.addEventListener('click', () => {
      lastActiveElement = galleryTrigger;
      openLightbox(1);
    });
  }

  // Lightbox controls
  const lightbox = document.getElementById('photo-lightbox');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateLightbox(1));
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        navigateLightbox(1);
      } else if (touchEndX > touchStartX + threshold) {
        navigateLightbox(-1);
      }
    }
  }
}

function openLightbox(index) {
  const lightbox = document.getElementById('photo-lightbox');
  if (!lightbox || galleryPhotoList.length === 0) return;

  if (index < 0) index = 0;
  if (index >= galleryPhotoList.length) index = galleryPhotoList.length - 1;
  currentPhotoIndex = index;

  updateLightboxContent();

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('lightbox-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById('photo-lightbox');
  if (!lightbox || !lightbox.classList.contains('open')) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
    lastActiveElement.focus();
    lastActiveElement = null;
  }
}

function navigateLightbox(direction) {
  if (galleryPhotoList.length === 0) return;
  currentPhotoIndex = (currentPhotoIndex + direction + galleryPhotoList.length) % galleryPhotoList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const photo = galleryPhotoList[currentPhotoIndex];
  if (!photo) return;

  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.src = photo.src;
    imgEl.alt = photo.alt || 'Yash Srivastava Photograph';
  }

  if (titleEl) {
    titleEl.textContent = photo.title || 'Photograph';
  }

  if (counterEl) {
    counterEl.textContent = `${currentPhotoIndex + 1} / ${galleryPhotoList.length}`;
  }
}

/**
 * ============================================================================
 * MODAL CLOSE LISTENERS & KEYBOARD DISPATCHER
 * ============================================================================
 */
function initModalHandlers() {
  const projectModal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    // Focus traps
    if (projectModal && projectModal.classList.contains('open')) {
      if (e.key === 'Tab') {
        trapFocusInDialog(e, projectModal);
      } else if (e.key === 'Escape') {
        closeProjectModal();
      }
      return;
    }

    const lightbox = document.getElementById('photo-lightbox');
    if (lightbox && lightbox.classList.contains('open')) {
      if (e.key === 'Tab') {
        trapFocusInDialog(e, lightbox);
      } else if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
      return;
    }

    // Escape closes mobile nav if open
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    if (navLinks && navLinks.classList.contains('open') && e.key === 'Escape') {
      navLinks.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    }
  });
}

/**
 * ============================================================================
 * ARCHITECTURE DIAGRAMS TAB SWITCHER (with ARIA Keyboard Navigation)
 * ============================================================================
 */
function initArchitectureTabs() {
  const tabList = document.querySelector('[role="tablist"]');
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const showcases = document.querySelectorAll('.arch-showcase');

  function activateTab(tab) {
    const target = tab.getAttribute('data-arch-target') || tab.getAttribute('aria-controls');

    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.focus();

    showcases.forEach(s => {
      if (s.id === target) {
        s.style.display = 'block';
        s.removeAttribute('hidden');
      } else {
        s.style.display = 'none';
        s.setAttribute('hidden', '');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  if (tabList) {
    tabList.addEventListener('keydown', (e) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(document.activeElement);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabArray.length;
        activateTab(tabArray[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
        activateTab(tabArray[prevIndex]);
      }
    });
  }
}

/**
 * ============================================================================
 * NAVIGATION & SCROLL SPY
 * ============================================================================
 */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (menuToggle && navLinks) {
    menuToggle.setAttribute('aria-controls', 'nav-links');
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }
}

/**
 * ============================================================================
 * CONTACT FORM — Client-side Form Integration
 * ============================================================================
 */
const RECIPIENT_EMAIL = 'yashsrivastava2894@gmail.com';

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form || !statusMsg) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  function showStatus(messageHtml, statusType) {
    statusMsg.style.display = 'block';
    statusMsg.className = `form-status-msg ${statusType}`;
    statusMsg.innerHTML = messageHtml;
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (statusMsg.classList.contains('error')) {
          statusMsg.style.display = 'none';
        }
      });
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    const botcheckInput = form.querySelector('input[name="botcheck"]');
    if (botcheckInput && botcheckInput.checked) {
      // Honeypot caught automated bot
      return;
    }

    if (!name) {
      showStatus('Please enter your full name.', 'error');
      nameInput?.focus();
      return;
    }

    if (!email) {
      showStatus('Please enter your email address.', 'error');
      emailInput?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address (e.g. name@example.com).', 'error');
      emailInput?.focus();
      return;
    }

    if (!message || message.length < 5) {
      showStatus('Please enter your message (minimum 5 characters).', 'error');
      messageInput?.focus();
      return;
    }

    const htmlKeyInput = document.getElementById('web3forms-access-key');
    const accessKey = htmlKeyInput ? htmlKeyInput.value.trim() : '';

    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span> <span aria-hidden="true">✉</span>';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <span aria-hidden="true">⏳</span>`;
    }
    showStatus('Sending your message...', 'loading');

    try {
      if (!accessKey) {
        throw new Error('Contact form routing is not configured.');
      }

      const payload = {
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `Portfolio Inquiry from ${name}`,
        from_name: name,
        botcheck: botcheckInput ? botcheckInput.value : ""
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && (data.success || data.status === 200)) {
        form.reset();
        showStatus(
          `✓ Thank you, <strong>${escapeHtml(name)}</strong>! Your message was sent successfully. I will get back to you shortly at <strong>${escapeHtml(email)}</strong>.`,
          'success'
        );
      } else {
        const errorDetail = (data && data.message) ? data.message : `Server responded with status ${response.status}`;
        throw new Error(errorDetail);
      }
    } catch (err) {
      console.error('Contact Form Transmission Error:', err);
      showStatus(
        `✕ Message could not be sent: ${escapeHtml(err.message || 'Network error')}.<br>Your message has been preserved below. You can try again or email directly to <a href="mailto:${escapeHtml(RECIPIENT_EMAIL)}" style="color: var(--accent-green); text-decoration: underline;">${escapeHtml(RECIPIENT_EMAIL)}</a>.`,
        'error'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
