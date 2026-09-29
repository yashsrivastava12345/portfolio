/**
 * ============================================================================
 * YASH SRIVASTAVA — PORTFOLIO SETTINGS, THEME, PALETTE & MATRIX ENGINE
 * ============================================================================
 * 
 * Manages:
 * 1. Theme: Dark / Light Mode (persisted, system-preference aware)
 * 2. Color Palette: 6 Curated Accents (Emerald, Electric Blue, Cyan, Violet, Amber, Monochrome)
 * 3. Matrix FX: Optional Canvas Rain (persisted, 0% CPU when OFF, tab-hidden pause)
 * 4. Terminal Intro: First-visit popup with Enter / Skip and replay capability
 * 5. Navigation: Mobile drawer, active link detection, accessible focus management
 */

(function () {
  'use strict';

  // Available curated color palettes
  const PALETTES = ['emerald', 'electric-blue', 'cyan', 'violet', 'amber', 'monochrome'];
  const DEFAULT_PALETTE = 'emerald';
  const DEFAULT_THEME = 'dark';

  // Safe localStorage helper
  const storage = {
    get(key, fallback = null) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {}
    }
  };

  /**
   * ==========================================================================
   * 1. THEME MANAGER (Dark / Light)
   * ==========================================================================
   */
  const ThemeManager = {
    current: DEFAULT_THEME,

    init() {
      const saved = storage.get('portfolio_theme');
      if (saved && (saved === 'dark' || saved === 'light')) {
        this.current = saved;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.current = 'light';
      } else {
        this.current = DEFAULT_THEME;
      }
      this.apply(this.current, false);
      this.bindEvents();
    },

    apply(theme, save = true) {
      this.current = theme;
      document.documentElement.setAttribute('data-theme', theme);
      if (save) storage.set('portfolio_theme', theme);

      // Update toggle buttons across desktop and mobile
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        const isDark = theme === 'dark';
        btn.setAttribute('aria-label', isDark ? 'Switch to Light theme' : 'Switch to Dark theme');
        btn.setAttribute('title', isDark ? 'Current: Dark Theme (Click for Light)' : 'Current: Light Theme (Click for Dark)');
        const label = btn.querySelector('.ctrl-label');
        if (label) label.textContent = isDark ? 'Dark' : 'Light';
      });
    },

    toggle() {
      const next = this.current === 'dark' ? 'light' : 'dark';
      this.apply(next, true);
    },

    bindEvents() {
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });

      // Listen for OS theme changes if user has not explicitly chosen
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
          if (!storage.get('portfolio_theme')) {
            this.apply(e.matches ? 'light' : 'dark', false);
          }
        });
      }
    }
  };

  /**
   * ==========================================================================
   * 2. COLOR PALETTE MANAGER (6 Curated Accents)
   * ==========================================================================
   */
  const PaletteManager = {
    current: DEFAULT_PALETTE,

    init() {
      const saved = storage.get('portfolio_palette');
      if (saved && PALETTES.includes(saved)) {
        this.current = saved;
      } else {
        this.current = DEFAULT_PALETTE;
      }
      this.apply(this.current, false);
      this.bindEvents();
    },

    apply(palette, save = true) {
      if (!PALETTES.includes(palette)) palette = DEFAULT_PALETTE;
      this.current = palette;
      document.documentElement.setAttribute('data-palette', palette);
      if (save) storage.set('portfolio_palette', palette);

      // Update palette preview swatches and active menu states
      document.querySelectorAll('.palette-color-preview').forEach(preview => {
        preview.setAttribute('data-active-palette', palette);
      });

      document.querySelectorAll('.palette-option').forEach(option => {
        const optPal = option.getAttribute('data-palette');
        const isActive = optPal === palette;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    },

    bindEvents() {
      // Toggle dropdown menu
      document.querySelectorAll('.palette-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const container = btn.closest('.palette-dropdown');
          if (!container) return;
          const menu = container.querySelector('.palette-menu');
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          this.closeAllMenus();
          if (!isExpanded && menu) {
            btn.setAttribute('aria-expanded', 'true');
            menu.classList.add('open');
          }
        });
      });

      // Palette option selection
      document.querySelectorAll('.palette-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPalette = option.getAttribute('data-palette');
          if (targetPalette) {
            this.apply(targetPalette, true);
            this.closeAllMenus();
          }
        });
      });

      // Close menu on click outside or Escape
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.palette-dropdown')) {
          this.closeAllMenus();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllMenus();
        }
      });
    },

    closeAllMenus() {
      document.querySelectorAll('.palette-dropdown').forEach(container => {
        const btn = container.querySelector('.palette-toggle');
        const menu = container.querySelector('.palette-menu');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (menu) menu.classList.remove('open');
      });
    }
  };

  /**
   * ==========================================================================
   * 3. MATRIX FX CANVAS ENGINE
   * ==========================================================================
   */
  const MatrixEngine = {
    canvas: null,
    ctx: null,
    isActive: false,
    isVisible: true,
    animId: null,
    lastFrameTime: 0,
    targetFps: 30,
    frameInterval: 1000 / 30,
    fontSize: 14,
    columns: 0,
    drops: [],
    characters: '010101010101λπΣ{}[]<>/=+$#_01010101',
    specialWords: ['RPi', 'CM5', 'TECAR', 'AI', 'PyQt', 'IoT', 'Linux'],

    init() {
      this.canvas = document.getElementById('matrixCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.isActive = false;
      } else {
        const saved = storage.get('portfolio_matrix_fx');
        this.isActive = saved === 'true'; // Default is OFF
      }

      this.bindEvents();

      if (this.isActive) {
        this.canvas.classList.add('active');
        this.resize();
        this.start();
      } else {
        this.canvas.classList.remove('active');
        this.stop();
        this.clear();
      }

      this.updateButtons();
    },

    resize() {
      if (!this.canvas || !this.ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);

      this.columns = Math.floor(width / this.fontSize);
      const oldLen = this.drops.length;
      this.drops.length = this.columns;
      for (let i = 0; i < this.columns; i++) {
        if (i >= oldLen || typeof this.drops[i] !== 'number') {
          this.drops[i] = Math.floor(Math.random() * -50);
        }
      }
    },

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (this.isActive) this.resize();
        }, 200);
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else if (this.isActive && this.isVisible) {
          this.start();
        }
      });

      document.querySelectorAll('.matrix-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });
    },

    toggle() {
      this.isActive = !this.isActive;
      storage.set('portfolio_matrix_fx', this.isActive ? 'true' : 'false');
      this.updateButtons();

      if (this.isActive) {
        if (this.canvas) {
          this.canvas.classList.add('active');
          this.resize();
          this.start();
        }
      } else {
        if (this.canvas) {
          this.canvas.classList.remove('active');
          this.stop();
          this.clear();
        }
      }
    },

    updateButtons() {
      document.querySelectorAll('.matrix-toggle').forEach(btn => {
        btn.setAttribute('aria-pressed', this.isActive ? 'true' : 'false');
        btn.classList.toggle('active', this.isActive);
        btn.setAttribute('title', this.isActive ? 'Matrix FX: Currently ON (Click to Disable)' : 'Matrix FX: Currently OFF (Click to Enable)');
        const dot = btn.querySelector('.matrix-status-dot');
        if (dot) dot.classList.toggle('active', this.isActive);
        const label = btn.querySelector('.ctrl-label');
        if (label) label.textContent = this.isActive ? 'Matrix: ON' : 'Matrix: OFF';
      });
    },

    draw(currentTime) {
      if (!this.isActive || !this.isVisible) {
        this.stop();
        return;
      }

      this.animId = requestAnimationFrame((time) => this.draw(time));
      const elapsed = currentTime - this.lastFrameTime;
      if (elapsed < this.frameInterval) return;
      this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Dark background trail in dark mode, light background trail in light mode
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      this.ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.22)' : 'rgba(6, 9, 14, 0.16)';
      this.ctx.fillRect(0, 0, width, height);

      this.ctx.font = `${this.fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

      // Read accent color from active CSS tokens
      const accentStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00ff88';

      for (let i = 0; i < this.columns; i++) {
        const y = this.drops[i];
        if (y < 0) {
          this.drops[i]++;
          continue;
        }

        const isSpecial = Math.random() > 0.985;
        const char = isSpecial
          ? this.specialWords[Math.floor(Math.random() * this.specialWords.length)]
          : this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        const xPos = i * this.fontSize;
        const yPos = y * this.fontSize;

        if (Math.random() > 0.88) {
          this.ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        } else if (Math.random() > 0.6) {
          this.ctx.fillStyle = accentStyle;
        } else {
          this.ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.35)';
        }

        this.ctx.fillText(char, xPos, yPos);

        if (yPos > height && Math.random() > 0.975) {
          this.drops[i] = 0;
        } else {
          this.drops[i]++;
        }
      }
    },

    clear() {
      if (!this.canvas || !this.ctx) return;
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();
    },

    start() {
      if (!this.animId && this.isActive) {
        this.lastFrameTime = performance.now();
        this.animId = requestAnimationFrame((time) => this.draw(time));
      }
    },

    stop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  };

  /**
   * ==========================================================================
   * 4. TERMINAL INTRO POPUP (First Visit & Replay)
   * ==========================================================================
   */
  const TerminalIntro = {
    overlay: null,
    lastFocus: null,

    init() {
      this.overlay = document.getElementById('terminal-intro-modal');
      if (!this.overlay) return;

      const enterBtn = document.getElementById('btn-enter-portfolio');
      const skipBtn = document.getElementById('btn-skip-intro');
      const replayBtns = document.querySelectorAll('.replay-terminal-trigger');

      if (enterBtn) {
        enterBtn.addEventListener('click', () => this.close(true));
      }
      if (skipBtn) {
        skipBtn.addEventListener('click', () => this.close(true));
      }

      replayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open(true);
        });
      });

      // Escape key to dismiss
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay && !this.overlay.hasAttribute('hidden')) {
          this.close(true);
        }
      });

      // Check first visit on Home page
      const hasSeen = storage.get('portfolio_intro_seen');
      const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '';
      if (!hasSeen && isHome) {
        this.open(false);
      }
    },

    open(isManualReplay = false) {
      if (!this.overlay) return;
      this.lastFocus = document.activeElement;
      this.overlay.removeAttribute('hidden');
      this.overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';

      const enterBtn = document.getElementById('btn-enter-portfolio');
      if (enterBtn) enterBtn.focus();

      // Animate terminal lines if motion not reduced
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lines = this.overlay.querySelectorAll('.term-line');

      if (prefersReducedMotion) {
        lines.forEach(line => line.style.opacity = '1');
      } else {
        lines.forEach(line => {
          line.style.opacity = '0';
          const delay = parseInt(line.getAttribute('data-delay') || '0', 10);
          setTimeout(() => {
            line.style.opacity = '1';
            line.classList.add('typed');
          }, delay);
        });
      }
    },

    close(markSeen = true) {
      if (!this.overlay) return;
      if (markSeen) storage.set('portfolio_intro_seen', 'true');
      this.overlay.classList.remove('visible');
      setTimeout(() => {
        this.overlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
          this.lastFocus.focus();
        }
      }, 250);
    }
  };

  /**
   * ==========================================================================
   * 5. GLOBAL NAVIGATION & ROUTE HIGHLIGHTING
   * ==========================================================================
   */
  const Navigation = {
    init() {
      const toggle = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');

      if (toggle && navLinks) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const isOpen = navLinks.classList.contains('open');
          if (isOpen) {
            this.closeMenu(toggle, navLinks);
          } else {
            this.openMenu(toggle, navLinks);
          }
        });

        // Close when clicking a nav link
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            this.closeMenu(toggle, navLinks);
          });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            this.closeMenu(toggle, navLinks);
          }
        });
      }

      this.highlightActiveRoute();
    },

    openMenu(toggle, navLinks) {
      navLinks.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close Navigation Menu');
    },

    closeMenu(toggle, navLinks) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open Navigation Menu');
    },

    highlightActiveRoute() {
      const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const normalizedHref = href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
        const isExact = normalizedHref === currentPath;
        const isParent = normalizedHref !== '/' && currentPath.startsWith(normalizedHref);

        if (isExact || isParent) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }
  };

  // Expose global manager on window
  window.PortfolioSettings = {
    Theme: ThemeManager,
    Palette: PaletteManager,
    Matrix: MatrixEngine,
    TerminalIntro: TerminalIntro,
    Navigation: Navigation
  };

  // Initialize all managers when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ThemeManager.init();
      PaletteManager.init();
      MatrixEngine.init();
      TerminalIntro.init();
      Navigation.init();
    });
  } else {
    ThemeManager.init();
    PaletteManager.init();
    MatrixEngine.init();
    TerminalIntro.init();
    Navigation.init();
  }
})();
