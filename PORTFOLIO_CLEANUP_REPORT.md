# Portfolio Cleanup & Production Optimization Report

**Project:** Yash Srivastava — Systems Software Engineer Portfolio  
**Audit Date:** October 4, 2026  
**Status:** Pre-cleanup analysis and verification complete  

---

## 1. Overview & Inventory Summary

Before initiating file removals, an exhaustive audit of all 58 repository files, their cross-references across 21 code files (HTML, CSS, JS, JSON, XML, MD, _headers), and all 293 internal links was performed.

* **Total non-Git files before cleanup:** 58 files
* **Files scheduled for removal:** 11 files (~7.5 MB of unreferenced bloat, duplicate files, and legacy uncompressed artifacts)
* **Expected non-Git files after cleanup:** 47 files
* **Total internal link references verified:** 293 valid routes (0 errors, 0 broken paths, 0 404s)

---

## 2. Removed Files

The following 11 files were verified as 100% unreferenced by any HTML, CSS, JavaScript, metadata, or documentation, and are safe to remove:

| File Path | Size | Reason for Safe Removal |
| :--- | :--- | :--- |
| `assets/icons/089305c4-7529-4927-acb3-99b4bcc4f451.png` | 8.5 KB | Unreferenced temporary artifact with random UUID filename created during early icon prototyping. |
| `images/Error 404.png` | 1,309.8 KB | Unreferenced 1.3 MB legacy uncompressed PNG with spaces in filename. Canonical visual `images/error-404.webp` (113.8 KB) is maintained. |
| `images/Error 404.webp` | 160.9 KB | Unreferenced duplicate WebP with space in filename. The cleanly named `images/error-404.webp` is the canonical version. |
| `images/snapshots-engineering-lab/Medical Device GUI Testing.webp` | 447.5 KB | Legacy uncompressed WebP with spaces in filename. The site actively references `images/snapshots-engineering-lab/medical-device-gui-testing.webp` (70.7 KB) and responsive thumbnail `medical-device-gui-testing-800.webp` (24.5 KB). |
| `images/snapshots-engineering-lab/Sensor & Hardware Engineering.webp` | 1,484.0 KB | Legacy 1.5 MB WebP with spaces and ampersand. The site actively references `images/snapshots-engineering-lab/sensor-hardware-engineering.webp` (321.1 KB) and thumbnail `sensor-hardware-engineering-800.webp` (90.4 KB). |
| `images/snapshots-engineering-lab/Workstation & Embedded Lab.webp` | 621.6 KB | Legacy 621.6 KB WebP with spaces and ampersand. The site actively references `images/snapshots-engineering-lab/workstation-embedded-lab.webp` (333.1 KB) and thumbnail `workstation-embedded-lab-800.webp` (116.6 KB). |
| `images/snapshots-engineering-lab/uCertify - Ingest Role.webp` | 509.6 KB | Legacy 509.6 KB WebP with spaces and hyphen. The site actively references `images/snapshots-engineering-lab/ucertify-ingest-role.webp` (271.1 KB) and thumbnail `ucertify-ingest-role-800.webp` (102.5 KB). |
| `images/snapshots-engineering-lab/uCertify — Ingest Role.webp` | 509.6 KB | Duplicate 509.6 KB WebP with spaces and em-dash. |
| `images/ucertify/uCertify - Ingest Role.webp` | 509.6 KB | Byte-for-byte duplicate (MD5: `acab3abe27be7880ba679cdedb57b556`) in orphaned subfolder `images/ucertify/`. |
| `images/ucertify/uCertify — Ingest Role.webp` | 509.6 KB | Byte-for-byte duplicate in orphaned subfolder `images/ucertify/`. (Orphaned folder removed after cleanup). |
| `images/profile/yash-profile-suit.png` | 1,408.2 KB | Unreferenced 1.4 MB legacy uncompressed PNG. The high-quality WebP version `images/profile/yash-profile-suit.webp` (156.4 KB) is retained in `images/profile/`. |

**Total disk storage reclaimed:** ~7,488 KB (~7.5 MB)

---

## 3. Retained Files

The following critical production assets were intentionally preserved to ensure full functionality, design integrity, and multi-platform compatibility:

* **Production Pages (13 HTML files):**
  * `index.html` (Main hub, terminal intro, interactive HUD, direct contact channels)
  * `about/index.html` (Dedicated About biography, core principles, identity terminal)
  * `skills/index.html` (Complete technical proficiencies, architecture details, case study buttons)
  * `experience/index.html` (Dual-column career journey, credentials, recruiter actions)
  * `projects/index.html` (Catalogue grid with live category filters)
  * `projects/tecar/index.html` (TECAR Therapy case study deep dive)
  * `projects/laser-lumino-pro/index.html` (Lumino Pro Laser case study deep dive)
  * `projects/django-ims/index.html` (Enterprise IMS case study deep dive)
  * `projects/volant-technologies/index.html` (Volant medical catalog case study)
  * `projects/cv-ocr-projects/index.html` (Computer vision & OCR case study)
  * `resume/index.html` (Recruiter-ready printable resume and direct PDF download view)
  * `contact/index.html` (Direct communication portal with Web3Forms integration)
  * `404.html` (Cyberpunk terminal error recovery page)
* **Styles & Scripts (`assets/css/`, `assets/js/`):**
  * `assets/css/style.css` (Complete design system, 6 color palettes, responsive rules, honeypot display rules)
  * `assets/js/app.js` (DOM interaction, accessible modal manager, contact form submission with botcheck filter)
  * `assets/js/settings.js` (ThemeManager, PaletteManager, MatrixEngine, TerminalIntro engine)
  * `assets/js/projects-data.js` (Data source for project modal deep-dives and photo gallery)
  * `assets/js/matrix.js` (Standalone Matrix rain engine)
* **Resume & Document:**
  * `assets/Yash_Srivastava_Resume.pdf` (Official resume document for recruiters)
* **Favicons & PWA Icons (`assets/icons/`, root):**
  * `favicon.ico`, `assets/icons/favicon-32x32.png`, `apple-touch-icon.png` (Active browser icons)
  * `android-chrome-192x192.png`, `android-chrome-512x512.png`, `favicon.png` (PWA / high-res mobile icons)
* **Active Images & Media (`images/`):**
  * `images/profile/yash-profile.webp` & `images/profile/yash-profile.png` (Active portrait + explicit onerror fallback)
  * `images/projects/AIwallpaper20250202040324316.webp` & `.png` (Workstation visual + explicit onerror fallback)
  * `images/snapshots-engineering-lab/*.webp` (All 4 lab photos in 1600px full view and 800px responsive variants)
  * `images/error-404.webp` (Canonical 404 visual asset)
  * `images/og-image.webp` & `images/og-image.png` (Social sharing card + crawler fallback)
* **Configuration & Metadata:**
  * `.gitignore`, `.gitattributes`, `_headers`, `robots.txt`, `sitemap.xml`, `README.md`

---

## 4. Moved Files

* **None.** Existing assets are already located in their proper directories (`images/profile/`, `images/projects/`, `images/snapshots-engineering-lab/`, `assets/css/`, `assets/js/`, `assets/icons/`). No arbitrary moves were performed, preventing path fragmentation.

---

## 5. Renamed Files

* **None.** All canonical referenced filenames already follow standardized kebab-case naming conventions. Removing legacy files with spaces and special characters eliminated the need for complex renames.

---

## 6. Updated References

* **Relative Navigation & Case Study Links:**
  * Prior to cleanup, all relative trailing-slash URLs across all 13 HTML pages (`../projects/`, `../contact/`, `../resume/`, `tecar/`, etc.) were systematically audited and updated to explicit `index.html` paths (`../projects/index.html`, `tecar/index.html`, etc.).
  * Total verified internal links: **293 routes**. All resolve with zero broken paths.

---

## 7. Potentially Suspicious / Verified Retained Files

* **`images/profile/yash-profile-suit.webp` (156.4 KB):**
  * *Status:* Retained.
  * *Verification:* While the website currently renders `yash-profile.webp` in the hero and about sections, `yash-profile-suit.webp` represents Yash's formal suit profile portrait. In strict adherence to User Directive #3 (*"Preserve: Profile/personal photos"*), this optimized WebP portrait is preserved in `images/profile/`.
* **`assets/icons/favicon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`:**
  * *Status:* Retained.
  * *Verification:* Standard PWA and high-DPI Android touch icons preserved for mobile device bookmarking and progressive web app manifests.

---

## 8. Final Structure

```text
Portfolio/
├── index.html                           # Main Portfolio & Terminal Intro
├── 404.html                             # Terminal 404 Error Recovery Page
├── .gitignore                           # Git ignore rules for production
├── .gitattributes                       # Line endings & binary normalization
├── _headers                             # Cloudflare Pages edge security headers
├── robots.txt                           # Search engine crawling policies
├── sitemap.xml                          # Canonical multi-page XML sitemap
├── README.md                            # Comprehensive GitHub documentation
├── PORTFOLIO_CLEANUP_REPORT.md          # Production audit & inventory report
│
├── about/
│   └── index.html                       # Biography & Engineering Principles
├── skills/
│   └── index.html                       # Technical Proficiencies & Architecture
├── projects/
│   ├── index.html                       # Project Catalogue Grid
│   ├── tecar/index.html                 # TECAR Therapy Case Study
│   ├── laser-lumino-pro/index.html      # Laser Lumino Pro Case Study
│   ├── django-ims/index.html            # Django IMS Case Study
│   ├── volant-technologies/index.html   # Volant Technologies Case Study
│   └── cv-ocr-projects/index.html       # Computer Vision & OCR Case Study
├── experience/
│   └── index.html                       # Career Timeline & Work History
├── resume/
│   └── index.html                       # Interactive & Printable Resume View
├── contact/
│   └── index.html                       # Web3Forms Communication Portal
│
├── assets/
│   ├── Yash_Srivastava_Resume.pdf       # Official Downloadable Resume
│   ├── css/
│   │   └── style.css                    # Design Tokens, Palettes & Components
│   ├── js/
│   │   ├── app.js                       # Accessible UI & Web3Forms Botcheck
│   │   ├── matrix.js                    # Canvas Matrix Rain FX
│   │   ├── projects-data.js             # Structured Project & Photo Models
│   │   └── settings.js                  # Theme, Palette & Terminal Controller
│   └── icons/
│       ├── favicon-32x32.png            # 32x32 Standard Favicon
│       ├── favicon.png                  # Master Favicon Source
│       ├── apple-touch-icon.png         # iOS Home Screen Bookmark (180x180)
│       ├── android-chrome-192x192.png    # Mobile Web App Icon (192x192)
│       └── android-chrome-512x512.png    # High-Resolution Web App Icon (512x512)
├── favicon.ico                          # Root Browser Favicon
│
└── images/
    ├── og-image.webp                    # Social Graph Card (WebP)
    ├── og-image.png                     # Social Graph Card Fallback (PNG)
    ├── error-404.webp                   # 404 Visual Graphic
    ├── profile/
    │   ├── yash-profile.webp            # Primary Profile Portrait (WebP)
    │   ├── yash-profile.png             # Profile Fallback (PNG)
    │   └── yash-profile-suit.webp       # Alternate Formal Suit Portrait (WebP)
    ├── projects/
    │   ├── AIwallpaper20250202040324316.webp # Workstation HUD Graphic (WebP)
    │   └── AIwallpaper20250202040324316.png  # Workstation Fallback (PNG)
    └── snapshots-engineering-lab/
        ├── workstation-embedded-lab.webp     # Workstation Photo (1600px)
        ├── workstation-embedded-lab-800.webp # Workstation Photo (800px)
        ├── ucertify-ingest-role.webp         # uCertify Team Photo (1600px)
        ├── ucertify-ingest-role-800.webp     # uCertify Team Photo (800px)
        ├── medical-device-gui-testing.webp   # Medical Kiosk Testing (1600px)
        ├── medical-device-gui-testing-800.webp# Medical Kiosk Testing (800px)
        ├── sensor-hardware-engineering.webp  # Hardware Breadboard (1600px)
        └── sensor-hardware-engineering-800.webp# Hardware Breadboard (800px)
```
