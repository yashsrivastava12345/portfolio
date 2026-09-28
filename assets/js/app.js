/**
 * ============================================================================
 * YASH SRIVASTAVA — DEVELOPER PORTFOLIO MAIN SCRIPT
 * ============================================================================
 * 
 * Controls:
 * - Dynamic project card rendering & category filtering (with separate TECAR & Laser cards)
 * - Detailed architecture & case-study modals for all 7 projects
 * - Personal photo gallery & interactive touch-enabled lightbox
 * - Architecture diagram tab switching
 * - Navigation & scroll spy
 * - Contact interaction & external modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectCards();
  initProjectFiltering();
  initModalHandlers();
  initPhotoGalleryAndLightbox();
  initArchitectureTabs();
  initNavigation();
  initContactForm();
  initResumeModal();
  initWhatsAppModal();
});

/**
 * ============================================================================
 * PROJECT CARDS & FILTERING
 * ============================================================================
 */

/**
 * Render dynamic project cards from projectsData
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
    
    // Distinguish TECAR and Laser with dedicated CSS classes and visual styling
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

    // Visual cue badge for medical & flagship engineering projects
    let visualCueHtml = '';
    if (project.visualCues) {
      visualCueHtml = `
        <div class="project-visual-cue ${project.cardTheme || ''}">
          <span class="cue-icon">${escapeHtml(project.visualCues.icon || '')}</span>
          <span class="cue-text">${escapeHtml(project.visualCues.badge || '')}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="project-card-header">
        <div class="project-card-status-wrapper">
          <span class="project-status-badge ${statusClass}">${escapeHtml(project.status)}</span>
        </div>
        ${visualCueHtml}
        <div class="project-meta-category" title="${escapeHtml(project.categoryLabel)}">${escapeHtml(project.categoryLabel)}</div>
        <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
      </div>
      <div class="project-card-body">
        <p class="project-card-desc">${escapeHtml(project.shortDescription)}</p>
        <div class="project-tags-list">
          ${tagsHtml}
        </div>
        <div class="project-card-actions">
          <button type="button" class="btn btn-outline-green btn-sm view-details-btn" data-project-id="${project.id}">
            <span>View Architecture &amp; Details</span>
            <span>→</span>
          </button>
          ${project.links && project.links.github ? `
            <a href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="View repository on GitHub">
              <span>GitHub</span>
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
      openProjectModal(id);
    });
  });
}

/**
 * Handle project category filtering
 */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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

/**
 * Open project details modal with complete 10-point technical case study
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
      <div class="modal-challenge-title">⚠️ Challenge: ${escapeHtml(c.challenge)}</div>
      <div class="modal-challenge-mitigation">✓ Mitigation: ${escapeHtml(c.mitigation)}</div>
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
        <span class="project-status-badge ${statusClass}">${escapeHtml(project.status)}</span>
      </div>
      <h2 style="font-size: 1.85rem; margin-bottom: 6px; line-height: 1.2;">${escapeHtml(project.title)}</h2>
      <div style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.98rem; margin-bottom: 14px;">${escapeHtml(project.subtitle)}</div>
      
      ${project.details.disclaimer ? `
        <div class="modal-disclaimer-badge">
          🛡 ${escapeHtml(project.details.disclaimer)}
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

    <!-- 2. Problem / Purpose & Engineering Solution -->
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
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-green); text-transform: uppercase;">9. Current Status</div>
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
        ${project.links.github ? `
          <a href="${escapeHtml(project.links.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>${escapeHtml(project.links.githubLabel || 'View Project Repository')}</span>
            <span>↗</span>
          </a>
        ` : ''}
      </div>
    ` : ''}
  `;

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

/**
 * Close project details modal
 */
function closeProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * ============================================================================
 * PERSONAL PHOTO GALLERY & LIGHTBOX
 * ============================================================================
 */

let currentPhotoIndex = 0;
let galleryPhotoList = [];

function initPhotoGalleryAndLightbox() {
  // Collect all photos from personalPhotos configuration
  if (window.personalPhotos && Array.isArray(window.personalPhotos)) {
    galleryPhotoList = window.personalPhotos;
  } else {
    galleryPhotoList = [
      {
        id: "profile-main",
        src: "images/profile/yash-profile.webp",
        alt: "Yash Srivastava",
        title: "Yash Srivastava — Profile Portrait",
        caption: ""
      },
      {
        id: "photo-01",
        src: "images/snapshots-engineering-lab/Workstation & Embedded Lab.webp",
        alt: "Workstation & Embedded Lab",
        title: "Workstation & Embedded Lab",
        caption: ""
      },
      {
        id: "photo-02",
        src: "images/ucertify/uCertify — Ingest Role.webp",
        alt: "uCertify — Ingest Role",
        title: "uCertify — Ingest Role",
        caption: ""
      },
      {
        id: "photo-03",
        src: "images/snapshots-engineering-lab/Medical Device GUI Testing.webp",
        alt: "Medical Device GUI Testing",
        title: "Medical Device GUI Testing",
        caption: ""
      },
      {
        id: "photo-04",
        src: "images/snapshots-engineering-lab/Sensor & Hardware Engineering.webp",
        alt: "Sensor & Hardware Engineering",
        title: "Sensor & Hardware Engineering",
        caption: ""
      }
    ];
  }

  // Bind click on main profile photo to open lightbox
  const profilePhotoCard = document.getElementById('main-profile-photo-card');
  if (profilePhotoCard) {
    profilePhotoCard.addEventListener('click', () => {
      openLightbox(0);
    });
    profilePhotoCard.style.cursor = 'pointer';
  }

  // Bind click on hero profile photo as well
  const heroPhotoImg = document.getElementById('hero-profile-photo');
  if (heroPhotoImg) {
    heroPhotoImg.addEventListener('click', () => {
      openLightbox(0);
    });
    heroPhotoImg.style.cursor = 'pointer';
  }

  // Bind clicks on gallery cards
  const galleryCards = document.querySelectorAll('.personal-gallery-card');
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx);
      }
    });
  });

  // Bind click on gallery header trigger badge ("Click to view in lightbox")
  const galleryTrigger = document.getElementById('gallery-lightbox-trigger');
  if (galleryTrigger) {
    galleryTrigger.addEventListener('click', () => {
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

    // Touch swipe gesture support for mobile devices
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
        // Swiped left -> next
        navigateLightbox(1);
      } else if (touchEndX > touchStartX + threshold) {
        // Swiped right -> prev
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
}

function closeLightbox() {
  const lightbox = document.getElementById('photo-lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
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
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.src = photo.src;
    imgEl.alt = photo.alt || 'Yash Srivastava Photograph';
  }

  if (titleEl) {
    titleEl.textContent = photo.title || 'Personal Photography';
  }

  if (captionEl) {
    captionEl.textContent = '';
    captionEl.style.display = 'none';
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
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeLightbox();
      closeResumeModal();
      closeWhatsAppModal();
    } else if (e.key === 'ArrowLeft') {
      const lightbox = document.getElementById('photo-lightbox');
      if (lightbox && lightbox.classList.contains('open')) {
        navigateLightbox(-1);
      }
    } else if (e.key === 'ArrowRight') {
      const lightbox = document.getElementById('photo-lightbox');
      if (lightbox && lightbox.classList.contains('open')) {
        navigateLightbox(1);
      }
    }
  });
}

/**
 * ============================================================================
 * ARCHITECTURE DIAGRAMS TAB SWITCHER (3 TABS)
 * ============================================================================
 */
function initArchitectureTabs() {
  const tabs = document.querySelectorAll('.arch-tab-btn');
  const showcases = document.querySelectorAll('.arch-showcase');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-arch-target');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      showcases.forEach(s => {
        if (s.id === target) {
          s.style.display = 'block';
        } else {
          s.style.display = 'none';
        }
      });
    });
  });
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
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) {
        navLinks.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // IntersectionObserver for scroll spy active navigation item
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
 * CONTACT FORM — Production Static-Form Integration
 * ============================================================================
 * Sends inquiries directly to yashsrivastava2894@gmail.com using Web3Forms.
 * Features:
 * - Client-side validation (Name, Email format, Message length)
 * - Temporary button disabling with "Sending Message..." state
 * - Asynchronous JSON fetch dispatch (zero page reload, no mailto client popups)
 * - Honeypot anti-spam botcheck
 * - Dynamic subject line: "Portfolio Inquiry from [Visitor Name]"
 * - Structured email payload identifying visitor name, email, and message
 * - Inline status reporting (success/error banners)
 * - Form reset on success & complete user input preservation on failure
 */

// Web3Forms Public Access Key Configuration
// You can enter your access key here or in Index.html (#web3forms-access-key).
// To generate your key, visit https://web3forms.com and enter: yashsrivastava2894@gmail.com
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
const RECIPIENT_EMAIL = 'yashsrivastava2894@gmail.com';

function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form || !statusMsg) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Helper to show inline status banner
  function showStatus(messageHtml, statusType) {
    statusMsg.style.display = 'block';
    statusMsg.className = `form-status-msg ${statusType}`;
    statusMsg.innerHTML = messageHtml;
  }

  // Clear error status banner when visitor starts typing again
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

    // 1. Read input values
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // 2. Spam Honeypot Check (Silently reject bot submissions)
    const botcheckInput = form.querySelector('input[name="botcheck"]');
    if (botcheckInput && botcheckInput.checked) {
      return;
    }

    // 3. Validation
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
      showStatus('Please provide message details (minimum 5 characters).', 'error');
      messageInput?.focus();
      return;
    }

    // 4. Resolve Access Key
    const htmlKeyInput = document.getElementById('web3forms-access-key');
    const accessKey = (htmlKeyInput && htmlKeyInput.value.trim() && htmlKeyInput.value.trim() !== 'YOUR_ACCESS_KEY_HERE')
      ? htmlKeyInput.value.trim()
      : (WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE' ? WEB3FORMS_ACCESS_KEY : '');

    // 5. Update UI to Sending State
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>Transmit Message</span> <span>✉</span>';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <span>⏳</span>`;
    }
    showStatus('Transmitting your message securely...', 'loading');

    try {
      if (!accessKey) {
        throw new Error('Web3Forms Access Key is not configured yet. Please add your key in index.html or assets/js/app.js.');
      }

      // Structure email according to requirements
      const payload = {
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `Portfolio Inquiry from ${name}`,
        from_name: name
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
        // Success: Reset form inputs, present success message, restore button
        form.reset();
        showStatus(
          `✓ Thank you, <strong>${escapeHtml(name)}</strong>! Your message was transmitted successfully to <strong>${escapeHtml(RECIPIENT_EMAIL)}</strong>. I will get back to you shortly at <strong>${escapeHtml(email)}</strong>.`,
          'success'
        );
      } else {
        const errorDetail = (data && data.message) ? data.message : `Server responded with status ${response.status}`;
        throw new Error(errorDetail);
      }
    } catch (err) {
      console.error('Contact Form Transmission Error:', err);
      // Failure: Display clear error message, PRESERVE entered data (do not reset form), allow retry
      showStatus(
        `✕ Transmission could not be completed: ${escapeHtml(err.message || 'Network error')}.<br>Your message has been preserved below. You can try again or email directly to <a href="mailto:${escapeHtml(RECIPIENT_EMAIL)}" style="color: var(--accent-green); text-decoration: underline;">${escapeHtml(RECIPIENT_EMAIL)}</a>.`,
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

/**
 * ============================================================================
 * RESUME MODAL HANDLER
 * ============================================================================
 */
function initResumeModal() {
  const openResumeBtn = document.getElementById('open-resume-viewer-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('resume-modal-close-btn');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }
}

function closeResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * ============================================================================
 * WHATSAPP MODAL HANDLER
 * ============================================================================
 */
function initWhatsAppModal() {
  const openBtn = document.getElementById('open-whatsapp-modal-btn');
  const modal = document.getElementById('whatsapp-modal');
  const closeBtn = document.getElementById('whatsapp-modal-close-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeWhatsAppModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWhatsAppModal();
      }
    });
  }
}

function closeWhatsAppModal() {
  const modal = document.getElementById('whatsapp-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Basic XSS protection utility
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
