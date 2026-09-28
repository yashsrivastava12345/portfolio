# Yash Srivastava — Developer Portfolio

A responsive, high-performance personal developer portfolio showcasing practical systems engineering across Python, artificial intelligence, embedded hardware, web applications, and medical technology.

---

## About

This portfolio represents the engineering work, personal background, and technical projects of **Yash Srivastava**, an early-career Software Engineer based in Ghaziabad, Uttar Pradesh, India. 

The site tells a cohesive story of an engineer who bridges physical circuits, embedded Linux devices (Raspberry Pi CM5), touch-first graphical interfaces (PyQt6), enterprise databases (Django ORM), and applied AI/computer vision pipelines into robust, real-world systems.

---

## Sections

The portfolio contains the following sections:

1. **Navigation & Terminal Prompt**: Fixed glassmorphic navbar with terminal styling, section navigation anchors, and an optional Matrix Rain Canvas toggle (defaulted to OFF for zero CPU/GPU overhead).
2. **Hero Section**: High-contrast headline, technical focus badges (`Python`, `PyQt6`, `Django`, `React`, `Next.js`, `AI/ML`, `Raspberry Pi`), call-to-action buttons, and an interactive developer workstation HUD terminal card.
3. **What I Build (Core Competencies)**: Overview of expertise in AI Applications, Full-Stack Applications, Medical Technology, Embedded Systems, and Enterprise Systems.
4. **Behind the Code / Meet Yash**: Profile photograph card with corner cyber brackets, personal introduction, competency pills, a `$ whoami` diagnostic terminal, and an engineering philosophy statement.
5. **Snapshots & Engineering Lab**: 4-slot interactive photographic gallery featuring workstations, past technical roles (including uCertify content ingestion workflows), touchscreen GUI calibration, and sensor test benches, backed by an interactive fullscreen lightbox with keyboard and swipe navigation.
6. **Technical Skills**: Structured skill cards covering Programming Languages, Frameworks & Libraries, AI & Computer Vision, Embedded & Hardware, Databases, and DevOps/Tools.
7. **Featured Projects Showcase**: Category-filterable project cards (Medical Technology, AI & Vision, Enterprise, IoT & Hardware) rendering dynamic details and deep-dive technical modals from structured data.
8. **System Architecture Diagrams**: Tabbed architectural pipeline workflows for flagship platforms (TECAR Therapy Control Software and Laser Lumino Pro Platform).
9. **Embedded & Hardware Engineering**: Details on Raspberry Pi Compute Module 5 eMMC deployment, custom systemd kiosk daemons, I2C/SPI serial buses, and hardware interlocks.
10. **Achievements & Milestones**: Career milestones including uCertify content ingestion workflows, medical GUI integrations, and embedded hardware deployments.
11. **Experience & Education**: Timeline detailing roles at Curves and Contours LLP, uCertify, HAL (Hindustan Aeronautics Limited TAD Kanpur), and B.Tech degree from UCER Prayagraj.
12. **Currently Exploring**: Continuous professional development topics (RAG pipelines, embedded Linux, advanced PyQt6 architectures).
13. **Verified Statistics**: Key metrics covering major projects, hardware protocols, and frameworks.
14. **Resume Section**: Dedicated download interface and interactive specification modal for the official resume PDF.
15. **GitHub Repositories**: Direct links to open-source systems repositories and Yash's GitHub profile.
16. **Contact Section**: Direct contact links (Email, LinkedIn, Location) and an asynchronous client-side contact form powered by Web3Forms.
17. **Custom 404 Error Page (`404.html`)**: Terminal-themed error recovery interface with automated diagnostics and return routes.

---

## Technologies Used

* **HTML5**: Semantic document structuring, accessibility attributes, and metadata.
* **CSS3**: Modern layout engine with CSS Grid, Flexbox, custom CSS properties (variables), glassmorphic backdrops, ambient neon accents, and responsive breakpoints.
* **Vanilla JavaScript (ES6+)**: Zero runtime dependencies. Modular architecture handling dynamic DOM rendering, project category filtering, modal state machines, full-featured image lightbox, and touch/keyboard events.
* **HTML5 Canvas**: Ambient Matrix digital rain effect with frame-rate optimization and toggleable memory management.
* **WebP Image Pipeline**: High-efficiency WebP image encoding preserving visual fidelity while minimizing payload sizes.
* **Web3Forms API**: Client-side form submission integration routing directly to email without requiring backend servers.

---

## Project Structure

```text
Portfolio/
│
├── index.html                  # Main developer portfolio entry point
├── 404.html                    # Cyberpunk terminal 404 error recovery page
├── README.md                   # Project documentation and setup guide
├── .gitignore                  # Git ignore rules for clean version control
│
├── assets/                     # Core stylesheets, scripts, icons, and documents
│   ├── css/
│   │   └── style.css           # Complete responsive stylesheet and design system
│   ├── js/
│   │   ├── app.js              # Application logic, UI controllers, and lightbox
│   │   ├── matrix.js           # Canvas Matrix rain animation engine
│   │   └── projects-data.js    # Data model for projects and photography registry
│   ├── icons/
│   │   └── 089305c4-7529-4927-acb3-99b4bcc4f451.png # Preserved icon asset
│   └── Yash_Srivastava_Resume.pdf # Official downloadable resume document
│
└── images/                     # Portfolio photographs and visual assets
    ├── profile/
    │   ├── yash-profile.webp   # Primary portrait photograph (optimized WebP)
    │   ├── yash-profile.png    # Primary portrait photograph (transparent PNG fallback)
    │   ├── yash-profile-suit.webp # Executive standing portrait (optimized WebP)
    │   └── yash-profile-suit.png  # Executive standing portrait (transparent PNG fallback)
    ├── projects/
    │   ├── AIwallpaper20250202040324316.webp # Project hero visual (WebP)
    │   └── AIwallpaper20250202040324316.png  # Project hero visual (PNG fallback)
    ├── snapshots-engineering-lab/
    │   ├── Workstation & Embedded Lab.webp   # Engineering workbench snapshot
    │   ├── Medical Device GUI Testing.webp   # Clinical GUI testing snapshot
    │   ├── Sensor & Hardware Engineering.webp # Sensor test bench snapshot
    │   └── uCertify — Ingest Role.webp       # uCertify role snapshot
    ├── ucertify/
    │   └── uCertify — Ingest Role.webp       # uCertify dedicated gallery asset
    ├── certificates/                         # Directory prepared for certification assets
    ├── Error 404.webp                        # 404 illustration (WebP)
    └── Error 404.png                         # 404 illustration (PNG fallback)
```

---

## Image Organization

* All portfolio photographs and media assets reside under `images/`.
* Code assets (CSS, JavaScript, documents, and icons) are cleanly separated under `assets/`.
* High-resolution photographic content is encoded in modern **WebP** (`.webp`), significantly reducing page weight and load times while preserving sharpness and detail.
* Profile photos requiring transparent silhouettes include both `.webp` (with 32-bit RGBA alpha) and `.png` fallbacks.
* Photographs are categorized by their specific gallery and context:
  * `images/profile/`: Personal portrait photography.
  * `images/projects/`: Project illustrations and diagrams.
  * `images/snapshots-engineering-lab/`: Engineering workstations, test benches, and device calibration.
  * `images/ucertify/`: Past technical role and courseware ingestion documentation.
  * `images/certificates/`: Reserved for future academic and professional certifications.

---

## Running Locally

Because this project is a zero-dependency static website, it does not require Node.js, npm, or build tools to run.

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Python HTTP Server (Recommended)
From the project directory, run:

```bash
# Python 3
python -m http.server 8000
```

Then visit `http://localhost:8000` in your web browser.

### Option 3: VS Code Live Server
Open the project folder in VS Code, right-click `index.html`, and choose **"Open with Live Server"**.

---

## GitHub Deployment

To initialize Git and deploy the repository to GitHub:

```bash
# 1. Initialize local repository
git init

# 2. Stage all cleaned files
git add .

# 3. Create initial commit
git commit -m "Initial portfolio commit: cleaned, optimized, and reorganized"

# 4. Set default branch to main
git branch -M main

# 5. Connect your remote repository
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>

# 6. Push to GitHub
git push -u origin main
```

> **Note**: Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual repository URL (e.g., `https://github.com/username/portfolio.git`).

---

## Cloudflare Pages Deployment

This static portfolio can be deployed to Cloudflare Pages in less than a minute:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your portfolio GitHub repository.
3. Configure build settings:
   * **Framework preset**: `None`
   * **Build command**: *(Leave blank)*
   * **Build output directory**: `/` (root directory)
4. Click **Save and Deploy**.
5. Cloudflare Pages will build and deploy the portfolio globally across its edge network.

---

## Credits / Ownership & Professional Disclaimer

* **Hardware & Workplace Context**: Photographs showing embedded test benches, clinical devices, workstation setups, and lab equipment reflect Yash Srivastava's professional engineering and technical ingestion experience at previous employers and partner organizations (Curves and Contours LLP, uCertify, and Hindustan Aeronautics Limited).
* **Proprietary Work**: No confidential schematics, proprietary firmware source code, or internal company credentials are published in this repository. Architectural diagrams and project showcases represent generalized engineering methodologies and public technical specifications.
* **Profile Photography**: Photography of Yash Srivastava, including podium keynote presentations and executive portraits, is personal media used with permission.
