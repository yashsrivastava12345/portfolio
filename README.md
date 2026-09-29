# Yash Srivastava — Developer Portfolio

A responsive, production-ready developer portfolio showcasing practical systems engineering across Python, PyQt6, Django, embedded hardware, and medical technology.

---

## About

This portfolio represents the engineering work, background, and technical projects of **Yash Srivastava**, a Software Engineer based in Ghaziabad, Uttar Pradesh, India.

The site highlights practical systems engineering: bridging hardware circuits, embedded Linux devices (Raspberry Pi CM5/4), touch-first graphical interfaces (PyQt6), relational databases (Django ORM & SQLite), and applied computer vision pipelines into robust, real-world solutions.

---

## Key Sections

1. **Navigation & Terminal Prompt**: Glassmorphic sticky navbar with terminal branding, section anchors, and an optional Matrix Rain Canvas toggle (defaulted to OFF for zero CPU/GPU overhead).
2. **Hero Section**: Value proposition, technical badges, direct resume and contact CTAs, and a developer workstation HUD illustration.
3. **What I Build (Core Competencies)**: Overview of expertise across Medical Technology Software, Embedded Systems & Linux, Enterprise Django Systems, Desktop GUI Engineering, and Computer Vision.
4. **Behind the Code / Meet Yash**: Profile photograph with fullscreen lightbox, background overview, competency pills, and `$ whoami` terminal card.
5. **Snapshots & Engineering Lab**: 4-slot photographic gallery featuring workstations, past technical roles, touchscreen GUI testing, and sensor test benches, with responsive WebP images and full keyboard/touch lightbox support.
6. **Technical Skills**: Structured proficiencies covering Programming Languages, Frameworks & GUIs, Embedded & Hardware, Computer Vision, Databases, DevOps/Tools, and Continuous Learning.
7. **Featured Projects**: Filterable project cards (Medical Technology, AI & Vision, Enterprise) rendering dynamic details and deep-dive technical case study modals with plain-English summaries.
8. **System Architecture Diagrams**: Tabbed architectural pipeline workflows for flagship platforms (TECAR Therapy Control Software and Laser Lumino Pro Platform) with ARIA tablist keyboard navigation.
9. **Embedded & Hardware Engineering**: Details on Raspberry Pi Compute Module deployments, custom systemd kiosk daemons, I2C/SPI serial buses, and safety cutoff monitoring.
10. **Services / How I Can Help**: Practical service offerings (Python GUI engineering, Raspberry Pi kiosks, Django web systems, computer vision automation) and availability status.
11. **Key Milestones & Experience**: Career history detailing roles at Curves and Contours LLP, uCertify, HAL (Hindustan Aeronautics Limited TAD Kanpur), and B.Tech degree from UCER Prayagraj.
12. **Currently Exploring**: Continuous professional development topics (Edge AI, custom embedded Linux, modern full-stack web architectures).
13. **Resume & GitHub**: Direct PDF download and preview links, along with GitHub profile and repositories.
14. **Contact Section**: Direct communication channels (Email, LinkedIn, WhatsApp) and client-side contact form powered by Web3Forms with anti-spam honeypot protection.
15. **Custom 404 Error Page (`404.html`)**: Terminal-themed error recovery interface with root-relative paths and return routes.

---

## Technical Stack & Architecture

* **HTML5**: Semantic document structuring, WCAG AA accessibility standards, landmarks, and metadata.
* **CSS3**: Modern layout engine with CSS Grid, Flexbox, custom CSS properties (variables), glassmorphic backdrops, ambient neon accents, and responsive breakpoints down to 320px.
* **Vanilla JavaScript (ES6+)**: Zero runtime dependencies. Modular architecture handling dynamic DOM rendering, project category filtering, accessible modal state machine with focus traps, image lightbox with swipe navigation, and keyboard handlers.
* **HTML5 Canvas**: Ambient Matrix digital rain effect with frame-rate optimization and toggleable memory management.
* **WebP Image Pipeline**: High-efficiency WebP image encoding with responsive `srcset` display variants, reducing initial gallery weight by over 85%.
* **Web3Forms API**: Client-side form submission integration routing directly to email without requiring backend servers.
* **Security & Edge Headers**: `_headers` configuration for Cloudflare Pages enforcing Content Security Policy (CSP), X-Content-Type-Options, Referrer-Policy, and immutable asset caching.

---

## Project Structure

```text
Portfolio/
├── index.html                  # Main developer portfolio entry point
├── 404.html                    # Cyberpunk terminal 404 error page (root-relative assets)
├── README.md                   # Project documentation and setup guide
├── robots.txt                  # Search engine crawl rules and sitemap reference
├── sitemap.xml                 # Canonical sitemap for single-page portfolio
├── _headers                    # Cloudflare Pages security headers and asset caching
├── .gitattributes              # LF line-ending normalization and binary declarations
├── .gitignore                  # Git ignore rules for clean version control
│
├── assets/                     # Core stylesheets, scripts, icons, and documents
│   ├── css/
│   │   └── style.css           # Design tokens, responsive breakpoints, accessible UI
│   ├── js/
│   │   ├── app.js              # Application logic, accessible dialogs, and lightbox
│   │   ├── matrix.js           # Canvas Matrix rain animation engine (guarded storage)
│   │   └── projects-data.js    # Data model for projects and photo registry
│   ├── icons/
│   │   ├── favicon-32x32.png   # Standard 32x32 browser favicon
│   │   ├── apple-touch-icon.png# iOS home screen icon (180x180)
│   │   └── android-chrome-*.png# PWA / high-res icons
│   └── Yash_Srivastava_Resume.pdf # Downloadable resume document
│
└── images/                     # Optimized WebP visual assets
    ├── profile/
    │   └── yash-profile.webp   # Primary portrait photograph
    ├── projects/
    │   └── AIwallpaper20250202040324316.webp # Workstation HUD visual
    ├── snapshots-engineering-lab/
    │   ├── workstation-embedded-lab.webp     # High-res workstation snapshot
    │   ├── workstation-embedded-lab-800.webp # Optimized display thumbnail
    │   ├── medical-device-gui-testing.webp   # High-res GUI testing snapshot
    │   ├── medical-device-gui-testing-800.webp # Optimized display thumbnail
    │   ├── sensor-hardware-engineering.webp  # High-res sensor bench snapshot
    │   ├── sensor-hardware-engineering-800.webp # Optimized display thumbnail
    │   ├── ucertify-ingest-role.webp         # High-res role snapshot
    │   └── ucertify-ingest-role-800.webp     # Optimized display thumbnail
    ├── error-404.webp                        # 404 error page visual
    ├── og-image.webp                         # Branded 1200x630 social share card
    └── og-image.png                          # PNG fallback for social crawlers
```

---

## Running Locally

Because this project is a zero-dependency static website, it does not require Node.js, npm, or build tools to run.

### Option 1: Python HTTP Server (Recommended)
From the project directory, run:

```bash
# Python 3
python -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

### Option 2: VS Code Live Server
Open the project folder in VS Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## Deployment (Cloudflare Pages)

The site is configured for static edge deployment on Cloudflare Pages:

1. Connect the GitHub repository `github.com/yashsrivastava12345/portfolio`.
2. Configure build settings:
   * **Framework preset**: `None`
   * **Build command**: *(Leave blank)*
   * **Build output directory**: `/` (root directory)
3. Deploy. Cloudflare Pages automatically respects the `_headers` file for HTTP caching and Content Security Policy.

---

## How to Update Content

* **Project Data & Case Studies**: Edit `assets/js/projects-data.js`. Each project contains structured fields for title, subtitle, category, tags, outcome, plain-English summary, problem/solution, and technical challenges.
* **Resume Document**: Replace `assets/Yash_Srivastava_Resume.pdf` with your newly exported PDF. Verify it with `qpdf --check assets/Yash_Srivastava_Resume.pdf`.
* **Contact Form Email Routing**: The contact form routes submissions via Web3Forms. Ensure your active domain is whitelisted in the Web3Forms dashboard.

---

## Professional Disclaimer

* **Hardware & Workplace Context**: Photographs showing embedded test benches, clinical devices, workstation setups, and lab equipment reflect Yash Srivastava's professional engineering and technical ingestion experience at previous employers and partner organizations (Curves and Contours LLP, uCertify, and Hindustan Aeronautics Limited).
* **Proprietary Work**: No confidential schematics, proprietary firmware source code, or internal company credentials are published in this repository. Architectural diagrams and project showcases represent generalized engineering methodologies and public technical specifications.
* **Medical Systems Disclaimer**: Medical software interfaces and kiosk platforms described herein are software and interface prototypes. They do not claim clinical certification or medical device regulatory approvals.
