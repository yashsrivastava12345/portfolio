/**
 * Yash Srivastava - Developer Portfolio
 * Optional Easter Egg: High-Performance Matrix Rain Animation
 * 
 * Default State: OFF (clean static technical background)
 * Can be explicitly toggled ON via the navigation 'Matrix FX' button.
 * 
 * Features:
 * - 0% CPU & GPU usage when OFF (no requestAnimationFrame, canvas cleared)
 * - Graceful lifecycle: stops immediately and clears canvas when disabled
 * - Accessible and honors prefers-reduced-motion
 * - High-DPI crisp rendering when enabled
 */

class MatrixRain {
  constructor(canvasId = 'matrixCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.isActive = false; // Strictly OFF by default
    this.isVisible = true;
    this.animationFrameId = null;
    this.lastFrameTime = 0;
    this.targetFps = 33; // Smooth frame pacing
    this.frameInterval = 1000 / this.targetFps;

    // Glyphs used when enabled
    this.characters = '010101010101λπΣ{}[]<>/=+$#_01010101';
    this.specialWords = ['RPi', 'CM5', 'TECAR', 'AI', '0x1A', 'PyQt', 'IoT'];
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];

    // Honor system prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.isActive = false;
    } else {
      // Safely check session preference
      try {
        const sessionPref = sessionStorage.getItem('matrix_fx_enabled');
        if (sessionPref === 'true') {
          this.isActive = true;
        }
      } catch (err) {
        // Storage access restricted (private browsing / strict sandboxing)
        this.isActive = false;
      }
    }

    this.init();
  }

  init() {
    this.bindEvents();

    if (this.isActive) {
      this.canvas.classList.add('active');
      this.resizeCanvas();
      this.start();
    } else {
      this.canvas.classList.remove('active');
      this.stop();
      this.clear();
    }

    this.updateToggleButton();
  }

  resizeCanvas() {
    if (!this.canvas || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    // Pre-fill canvas with theme background to prevent first-frame flicker
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    this.ctx.fillStyle = isLight ? '#f8fafc' : '#070a0e';
    this.ctx.fillRect(0, 0, width, height);

    this.columns = Math.floor(width / this.fontSize);
    
    // Initialize or resize drops array
    const oldLength = this.drops.length;
    this.drops.length = this.columns;
    for (let i = 0; i < this.columns; i++) {
      if (i >= oldLength || typeof this.drops[i] !== 'number') {
        this.drops[i] = Math.floor(Math.random() * -50); // Stagger drop starts
      }
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.isActive) {
          this.resizeCanvas();
        }
      }, 200);
    });

    // Pause when user switches tabs to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (this.isActive && this.isVisible) {
        this.start();
      }
    });

    // Keep matrix animation active across the entire page if enabled
    this.isVisible = true;

    // Connect UI toggle button if present
    const toggleBtn = document.getElementById('matrix-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }

    // Watch for theme changes — re-fill canvas immediately to prevent flicker
    // when user switches theme while Matrix FX is active
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' && this.isActive && this.ctx) {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          const width = window.innerWidth;
          const height = window.innerHeight;
          // Immediately paint over the canvas with the new theme background
          // so the old-theme trail color doesn't flash
          this.ctx.fillStyle = isLight ? '#f8fafc' : '#070a0e';
          this.ctx.fillRect(0, 0, width, height);
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });
  }

  toggle() {
    this.isActive = !this.isActive;
    try {
      sessionStorage.setItem('matrix_fx_enabled', this.isActive.toString());
    } catch (err) {
      // Storage access restricted
    }
    this.updateToggleButton();

    if (this.isActive) {
      this.canvas.classList.add('active');
      this.resizeCanvas();
      this.start();
    } else {
      this.canvas.classList.remove('active');
      this.stop();
      this.clear();
    }
  }

  updateToggleButton() {
    const toggleBtn = document.getElementById('matrix-toggle-btn');
    if (!toggleBtn) return;

    if (this.isActive) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('title', 'Toggle Matrix Rain: Currently ON');
      toggleBtn.innerHTML = `
        <span class="matrix-status-dot active"></span>
        <span class="ctrl-label btn-label">Matrix FX: ON</span>
      `;
    } else {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('title', 'Toggle Matrix Rain: Currently OFF');
      toggleBtn.innerHTML = `
        <span class="matrix-status-dot"></span>
        <span class="ctrl-label btn-label">Matrix FX: OFF</span>
      `;
    }
  }

  draw(currentTime) {
    if (!this.isActive || !this.isVisible) {
      this.stop();
      return;
    }

    this.animationFrameId = requestAnimationFrame((time) => this.draw(time));

    const elapsed = currentTime - this.lastFrameTime;
    if (elapsed < this.frameInterval) return;
    this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Use theme-aware trail color to prevent flicker on light backgrounds
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const trailColor = isLight
      ? 'rgba(248, 250, 252, 0.25)' // light bg fade — matches #f8fafc
      : 'rgba(8, 12, 16, 0.15)';    // dark bg fade — matches #070a0e

    // Semi-transparent overlay for smooth trails
    this.ctx.fillStyle = trailColor;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.font = `${this.fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

    for (let i = 0; i < this.columns; i++) {
      const y = this.drops[i];
      if (y < 0) {
        this.drops[i]++;
        continue;
      }

      let char;
      const isSpecial = Math.random() > 0.985;
      if (isSpecial) {
        char = this.specialWords[Math.floor(Math.random() * this.specialWords.length)];
      } else {
        char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      }

      const xPos = i * this.fontSize;
      const yPos = y * this.fontSize;

      // Color gradation — darker tones for light mode legibility
      if (isLight) {
        if (Math.random() > 0.85) {
          this.ctx.fillStyle = '#0369a1'; // accessible ocean cyan
        } else if (Math.random() > 0.6) {
          this.ctx.fillStyle = '#059669'; // accessible emerald
        } else {
          this.ctx.fillStyle = 'rgba(5, 150, 105, 0.6)'; // muted emerald
        }
      } else {
        if (Math.random() > 0.85) {
          this.ctx.fillStyle = '#67e8f9'; // Cyan
        } else if (Math.random() > 0.6) {
          this.ctx.fillStyle = '#00ff66'; // Green
        } else {
          this.ctx.fillStyle = 'rgba(0, 229, 153, 0.55)'; // Deep cyber green
        }
      }

      this.ctx.fillText(char, xPos, yPos);

      // Reset when drop reaches bottom
      if (yPos > height && Math.random() > 0.975) {
        this.drops[i] = 0;
      } else {
        this.drops[i]++;
      }
    }
  }

  clear() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();
  }

  start() {
    if (!this.animationFrameId && this.isActive) {
      this.lastFrameTime = performance.now();
      this.animationFrameId = requestAnimationFrame((time) => this.draw(time));
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.matrixEffect = new MatrixRain('matrixCanvas');
});
