/**
 * ============================================================================
 * YASH SRIVASTAVA — DEVELOPER PORTFOLIO PROJECT DATA & PHOTO CONFIGURATION
 * ============================================================================
 * 
 * PHOTO MANAGEMENT INSTRUCTIONS:
 * ----------------------------------------------------------------------------
 * // Replace this image with Yash's actual profile photograph:
 * Main Solo Profile Photo: images/profile/yash-profile.webp
 * - Recommended specs: 800x1000px (4:5 portrait) or 1:1 square.
 * - Supported formats: JPG, PNG, WebP (WebP preferred for production).
 * - Meaningful alt text: "Yash Srivastava"
 * 
 * // Add additional personal photographs to this directory:
 * Personal Gallery Directory: images/snapshots-engineering-lab/ and images/ucertify/
 * - Slot 01: images/snapshots-engineering-lab/Workstation & Embedded Lab.webp (Workstation & Embedded Lab)
 * - Slot 02: images/ucertify/uCertify — Ingest Role.webp (uCertify — Ingest Role)
 * - Slot 03: images/snapshots-engineering-lab/Medical Device GUI Testing.webp (Medical Device GUI Testing)
 * - Slot 04: images/snapshots-engineering-lab/Sensor & Hardware Engineering.webp (Sensor & Hardware Engineering)
 * ----------------------------------------------------------------------------
 * 
 * RULES FOR PROJECT DATA:
 * - Accurate representation only based on verified specifications.
 * - No fabricated statistics, clients, awards, or dates.
 * - TECAR and Laser (Lumino Pro) are maintained as two completely separate projects.
 */

// Personal photo registry for dynamic gallery & lightbox loading
const personalPhotos = [
  {
    id: "profile-main",
    src: "images/profile/yash-profile.webp",
    alt: "Yash Srivastava",
    title: "Yash Srivastava — Profile Portrait",
    caption: "",
    category: "profile"
  },
  {
    id: "photo-01",
    src: "images/snapshots-engineering-lab/Workstation & Embedded Lab.webp",
    alt: "Yash Srivastava workstation and embedded lab setup with Raspberry Pi CM5",
    title: "Workstation & Embedded Lab",
    caption: "",
    category: "gallery"
  },
  {
    id: "photo-02",
    src: "images/ucertify/uCertify — Ingest Role.webp",
    alt: "Yash Srivastava — Ingest Role at uCertify",
    title: "uCertify — Ingest Role",
    caption: "",
    category: "gallery"
  },
  {
    id: "photo-03",
    src: "images/snapshots-engineering-lab/Medical Device GUI Testing.webp",
    alt: "Yash Srivastava testing medical therapy GUI and touchscreen controls",
    title: "Medical Device GUI Testing",
    caption: "",
    category: "gallery"
  },
  {
    id: "photo-04",
    src: "images/snapshots-engineering-lab/Sensor & Hardware Engineering.webp",
    alt: "Yash Srivastava working with sensor circuits and microcontroller test bench",
    title: "Sensor & Hardware Engineering",
    caption: "",
    category: "gallery"
  }
];

const projectsData = [
  // ==========================================================================
  // PROJECT 1: TECAR — Medical Therapy Control Software
  // ==========================================================================
  {
    id: "tecar",
    title: "TECAR — Medical Therapy Control Software",
    subtitle: "Raspberry Pi-Based Capacitive & Resistive Therapy Control System",
    category: "medical",
    categoryLabel: "Medical Technology | Python | PyQt6 | Raspberry Pi | Hardware Integration",
    cardTheme: "tecar",
    visualCues: {
      type: "tecar",
      badge: "⚡ RF & SENSOR INTERFACE",
      icon: "⚡"
    },
    shortDescription: "A Raspberry Pi-based software interface for controlling and managing TECAR therapy workflows through a touch-first graphical interface, integrating real-time sensor measurements and safety interlocks.",
    image: "images/projects/AIwallpaper20250202040324316.webp",
    status: "Active Engineering Project",
    statusType: "active",
    featured: true,
    tags: [
      "Python",
      "PyQt6",
      "Raspberry Pi",
      "Touch UI",
      "Therapy Protocols",
      "GPIO",
      "Hardware Integration",
      "SQLite",
      "Timers",
      "Audio Feedback",
      "Footswitch Integration",
      "ADS1115",
      "MLX90614",
      "PCA9685"
    ],
    overview: "A full-screen touch control software application engineered for physical therapy equipment. The application manages Capacitive and Resistive Energy Transfer (TECAR) modalities, coordinates precise multi-phase therapy countdown timers, reads continuous electrode impedance and contactless infrared patient temperature, and enforces safety interlocks through hardware footswitch verification.",
    architecture: {
      steps: [
        { title: "Touch UI Layer (PyQt6)", desc: "Touchscreen interface with virtual rotary dials, dual CAP/RES mode switches, and custom numerical keypad." },
        { title: "Therapy & Protocol Manager", desc: "Coordinates therapy modalities, timer countdowns, security locks, and clinician session presets in SQLite." },
        { title: "Hardware Abstraction Layer (HAL)", desc: "Multi-threaded driver layer polling analog sensors asynchronously via I2C and SPI, preventing GUI thread blocking." },
        { title: "Sensors & Signal Acquisition", desc: "ADS1115 16-bit ADC reading electrode delivery current/impedance, and MLX90614 contactless IR patient temperature." },
        { title: "Physical Hardware & Safety Interlocks", desc: "Hardware footswitch verification with instant millisecond energy shut-off, PCA9685 PWM modulation, and acoustic alerts." }
      ],
      flowDiagram: `Touch UI (PyQt6: Virtual Dials, Keypad, CAP/RES Mode)
    ↓
Therapy & Protocol Manager (State Machine & SQLite Presets)
    ↓
Hardware Abstraction Layer (Asynchronous Threading / Signals)
    ↓
Sensors (ADS1115 16-Bit ADC, MLX90614 IR Temp, PCA9685 PWM)
    ↓
Safety Interlocks (GPIO Footswitch Cutoff & Acoustic Feedback)`
    },
    details: {
      problem: "Medical electrotherapy equipment requires a high-reliability, responsive touch interface that operates safely without desktop interruptions. The operator needs instant tactile control over power intensity, real-time feedback on electrode contact impedance, patient skin temperature monitoring to prevent thermal discomfort, and fail-safe cutoff mechanisms that immediately halt power when the operator steps off the footswitch.",
      solution: "Engineered a touch-first PyQt6 application running on Raspberry Pi. Built complete therapy workflows, asynchronous hardware communication drivers for ADC and temperature sensors over I2C, persistent SQLite protocol profiles, and instant hardware footswitch interlock monitoring.",
      keyFeatures: [
        "Touch-first graphical interface with virtual rotary dials and numerical keypad",
        "Dual Capacitive (CAP) and Resistive (RES) therapy mode configuration workflows",
        "Real-time electrode impedance and current monitoring via ADS1115 16-bit ADC over I2C",
        "Contactless patient temperature sensing using MLX90614 infrared sensor to prevent overheating",
        "Hardware footswitch safety interlock with instant energy shut-off and audio warning cues",
        "Persistent SQLite protocol storage for clinician presets and treatment histories",
        "Treatment session countdown timers with phase indicators and auditory completion tones",
        "Raspberry Pi OS deployment with auto-starting kiosk mode and robust error recovery"
      ],
      technologies: [
        "Python 3",
        "PyQt6 / Qt GUI",
        "Raspberry Pi OS (Linux)",
        "I2C & SPI Serial Buses",
        "ADS1115 16-Bit ADC",
        "MLX90614 Contactless IR Temperature Sensor",
        "PCA9685 PWM Modulation",
        "GPIO Safety Footswitch Detection",
        "SQLite3 Database",
        "Linux Audio Feedback Subsystem"
      ],
      myContribution: "Designed and implemented the touch-first PyQt6 GUI components; developed custom virtual keypad and dial widgets; integrated hardware abstraction scripts for ADS1115 ADC and MLX90614 temperature sensors over I2C; wired and programmed the GPIO footswitch safety cutoff logic; and structured SQLite storage for therapy protocol persistence.",
      hardwareIntegration: "Direct embedded integration on Raspberry Pi using I2C bus 1 for sensor communication. ADS1115 ADC samples analog voltages corresponding to electrode delivery current and impedance feedback. MLX90614 communicates over SMBus/I2C to sample non-contact skin temperature in real time. GPIO pins are wired with hardware debouncing to monitor the therapist's foot pedal switch. All sensor acquisition runs in dedicated Python background threads, dispatching Qt signals to maintain a fluid 60 FPS graphical interface without latency.",
      challenges: [
        {
          challenge: "High-frequency ADC and temperature sensor polling causing GUI stutter on embedded Raspberry Pi.",
          mitigation: "Decoupled hardware I/O into a dedicated QThread worker loop with thread-safe Qt Signals, preventing sensor bus latency from impacting touch interaction."
        },
        {
          challenge: "Fail-safe hardware interlock requirements during sudden power cut or footswitch release.",
          mitigation: "Engineered hardware interrupt-driven GPIO listeners that instantly drop power modulation within milliseconds of pedal release and cleanly persist session state."
        }
      ],
      currentStatus: "Active medical technology engineering project. Interface, sensor drivers, and therapy workflows developed and tested on Raspberry Pi embedded hardware.",
      futureImprovements: "Dynamic real-time impedance graphing on-screen, multi-language clinician localization, and automated USB export for treatment logs.",
      disclaimer: "Engineered as software and embedded interface platform. Does not claim medical certification or regulatory approval."
    },
    links: {
      github: "",
      demo: "",
      note: "Proprietary medical technology software project — architecture and technical documentation available for technical discussions."
    }
  },

  // ==========================================================================
  // PROJECT 2: Laser (Lumino Pro) — Medical Laser Therapy Software
  // ==========================================================================
  {
    id: "laser-lumino-pro",
    title: "Laser (Lumino Pro) — Medical Laser Therapy Software",
    subtitle: "Dedicated Full-Screen Kiosk Laser Therapy Management Platform on Raspberry Pi",
    category: "medical",
    categoryLabel: "Medical Technology | Python | PyQt6 | Raspberry Pi | Embedded Systems",
    cardTheme: "laser",
    visualCues: {
      type: "laser",
      badge: "🔆 LASER KIOSK & PROTOCOLS",
      icon: "🔆"
    },
    shortDescription: "A dedicated medical laser therapy software platform running on Raspberry Pi, featuring a full-screen kiosk interface, secure multi-user PIN access, protocol management, timer controls, and treatment history.",
    image: "images/projects/AIwallpaper20250202040324316.webp",
    status: "Active Embedded Project",
    statusType: "active",
    featured: true,
    tags: [
      "Python",
      "PyQt6",
      "Raspberry Pi",
      "Touch-first GUI",
      "Therapy Workflows",
      "Kiosk Interface",
      "Protocol Management",
      "Settings",
      "History",
      "Timer",
      "Password/Lock",
      "GPIO",
      "SQLite",
      "systemd",
      "Raspberry Pi OS",
      "Deployment"
    ],
    overview: "A specialized software solution for clinical medical laser systems. Built as a tamper-resistant kiosk application for Raspberry Pi OS, Lumino Pro provides clinicians with secure multi-level password authentication, structured therapy protocol selection across acute and chronic conditions, precise dosage and pulse frequency timing, hardware emergency interlocks, and persistent session auditing.",
    architecture: {
      steps: [
        { title: "Kiosk UI Shell (PyQt6)", desc: "Full-screen appliance-style interface with high-contrast clinical theme, virtual keypad, and therapy controls." },
        { title: "Security & PIN Authentication", desc: "Multi-tier password/PIN barrier preventing unauthorized laser emission or tampering with calibration." },
        { title: "Laser Protocol & Waveform Engine", desc: "Preset protocols for acute, chronic, and rehabilitation therapy with configurable pulse frequency and duration." },
        { title: "GPIO Emergency & Interlock Handler", desc: "Monitors emergency shutoff switch and hardware interlock loop, immediately asserting laser disable state." },
        { title: "Audit Trail & SQLite Persistence", desc: "Logs patient treatment sessions, joules delivered, duration, and operator IDs into an encrypted SQLite database." }
      ],
      flowDiagram: `Appliance Kiosk Shell (PyQt6 / Raspberry Pi OS systemd)
    ↓
Security & PIN Authentication Layer (Operator Verification)
    ↓
Laser Protocol Management Engine (Acute / Chronic Presets)
    ↓
Hardware Interlock & Emergency Cutoff (GPIO Monitoring)
    ↓
Session History & Audit Trail (SQLite Treatment Database)`
    },
    details: {
      problem: "Medical laser therapy systems require foolproof operational safety, tamper-resistant access to prevent unauthorized emission, repeatable protocol delivery for clinical consistency, and an uninterrupted appliance-style kiosk experience that boots instantly without desktop exposure.",
      solution: "Engineered a dedicated full-screen PyQt6 kiosk platform deployed on Raspberry Pi OS. Features a secure PIN authorization gate, intuitive therapy protocol library, treatment history auditing, GPIO emergency interlocks, and systemd kiosk automation with automatic restart policies.",
      keyFeatures: [
        "Appliance-style full-screen kiosk interface eliminating desktop overhead and accidental minimization",
        "Multi-level security lock and PIN pad modal requiring clinician authorization prior to laser activation",
        "Therapy protocol management system with presets for acute pain, chronic rehabilitation, and tissue repair",
        "Precise laser timer and pulse frequency control with real-time countdown alerts",
        "Clinician settings panel for system calibration, sound levels, screen brightness, and user permissions",
        "Comprehensive treatment history logging recording energy delivered, duration, and session timestamps",
        "Hardware/software emergency interlock listening to GPIO cutoff triggers",
        "Linux systemd kiosk daemon enabling instant auto-boot on startup and crash self-recovery"
      ],
      technologies: [
        "Python 3",
        "PyQt6 / Qt GUI",
        "Raspberry Pi OS (Linux)",
        "Linux systemd Kiosk Automation",
        "GPIO Interfacing & Emergency Cutoff",
        "SQLite3 Relational Storage",
        "Touchscreen Calibration Protocols",
        "Qt Custom Widget Architecture (QSS)",
        "Headless Remote Deployment (SSH/SCP)"
      ],
      myContribution: "Engineered the full-screen touch-optimized kiosk GUI in PyQt6; implemented role-protected security lock and pinpad access controls; designed the structured protocol management engine with editable dosage/wavelength presets; authored systemd kiosk deployment scripts for automated boot on Raspberry Pi OS; and integrated treatment history auditing in SQLite.",
      hardwareIntegration: "Deployed on Raspberry Pi embedded platform with custom systemd service configuration that launches the application directly into X11/Wayland kiosk mode without displaying a desktop environment. Raspberry Pi GPIO pins are utilized for hardware emergency stop switches, interlock beam enable signals, and status indicators. Includes automatic restart policies and custom Plymouth boot splash screen for a professional medical appliance experience.",
      challenges: [
        {
          challenge: "Ensuring foolproof kiosk security and preventing clinical operators from accessing the underlying Linux shell.",
          mitigation: "Configured dedicated systemd user service with restricted window manager settings, disabled desktop shortcuts/consoles, and trapped all unhandled Qt exceptions."
        },
        {
          challenge: "Strict parameter validation to prevent excessive laser duration or dosage settings.",
          mitigation: "Built dual-stage validation in both UI spinbox controllers and the underlying protocol SQLite engine, preventing values exceeding safety thresholds."
        }
      ],
      currentStatus: "Dedicated medical laser therapy software project in active development. Kiosk shell, security authentication, protocol engine, and deployment scripts established.",
      futureImprovements: "Integration with optical barcode/RFID badge scanners for instant clinician login, remote diagnostics reporting over local network, and custom protocol cloud sync.",
      disclaimer: "Engineered as software and embedded interface platform. Does not claim medical certification or regulatory approval."
    },
    links: {
      github: "",
      demo: "",
      note: "Proprietary medical laser therapy software platform — architecture and technical documentation available for technical discussions."
    }
  },

  // ==========================================================================
  // PROJECT 3: IMS / CIMS — Inventory & Management Information System
  // ==========================================================================
  {
    id: "django-ims",
    title: "IMS / CIMS",
    subtitle: "Inventory & Management Information System",
    category: "enterprise",
    categoryLabel: "Django | Enterprise Software | Database",
    cardTheme: "enterprise",
    visualCues: {
      type: "enterprise",
      badge: "🏢 ENTERPRISE ORM & QR",
      icon: "🏢"
    },
    shortDescription: "A comprehensive enterprise-grade inventory and management information system engineered with Python and Django, featuring QR/serial tracking and role-based workflows.",
    image: "images/projects/AIwallpaper20250202040324316.webp",
    status: "In Development",
    statusType: "active",
    featured: true,
    tags: [
      "Python",
      "Django",
      "MySQL",
      "Django ORM",
      "JavaScript",
      "QR Tracking",
      "Role-Based Access"
    ],
    overview: "A multi-tier enterprise management application designed to centralize inventory stock management, serial number tracking, quality inspection logs, and service ticket dispatches across organizational departments.",
    architecture: {
      steps: [
        { title: "Role-Based Authentication", desc: "Granular access control for Admin, Inventory Manager, Employee, Dealer, and Customer." },
        { title: "Service & Inventory Engine", desc: "Django ORM coordinating inventory stock levels, batches, and service workflows." },
        { title: "QR / Serial Tracking Layer", desc: "Automated QR code generation and serial tracking across dispatch and receiving." },
        { title: "Quality Control & Issue Mgmt", desc: "Dedicated modules for inspection logging, issue reporting, and escalation workflows." },
        { title: "Audit Logging & Reporting", desc: "Immutable system activity logging, audit trails, and inventory movement analytics." }
      ],
      flowDiagram: `User Request (Role-Based)
    ↓
Django Security & Permissions
    ↓
Core Business Logic (Inventory / Service / QC / Accounts)
    ↓
QR & Serial Number Tracking Engine
    ↓
Django ORM ↔ MySQL Relational Database
    ↓
Audit Logs & Dynamic Reporting`
    },
    details: {
      problem: "Growing technical enterprises face inventory discrepancies, untracked component serials, fragmented quality control logs, and lack of visibility between service and accounting departments.",
      solution: "Designing a unified Django-based enterprise platform that centralizes inventory tracking, QR-driven serial verification, service requests, and quality control into a single role-gated system.",
      keyFeatures: [
        "Comprehensive modules: Service, Quality Control, Accounts, Inventory, Requests, Issue Management, and Reports",
        "End-to-end QR code generation and serial/batch tracking for precision auditing",
        "Multi-tier role-based access workflows (Admin, Inventory Manager, Employee, Dealer, Customer)",
        "Audit log subsystem tracking every transaction and state change",
        "Dynamic dashboard metrics showing stock levels, pending requests, and QC inspection statuses",
        "Robust relational data model built on MySQL and managed via Django ORM"
      ],
      technologies: [
        "Python",
        "Django Framework",
        "MySQL",
        "Django ORM",
        "JavaScript / HTML5 / CSS3",
        "QR Code Generation & Scanning",
        "Role-Based Access Control (RBAC)"
      ],
      myContribution: "Architecting the Django data models, designing role-based view permissions, implementing QR code generation and lookup mechanisms, and developing module workflows for inventory management and audit logging.",
      hardwareIntegration: "Integration with physical handheld barcode/QR optical scanners via standard HID USB and serial inputs for warehouse dispatch verification.",
      challenges: [
        {
          challenge: "Ensuring database transaction integrity during bulk inventory transfers.",
          mitigation: "Leveraged Django atomic database transactions (transaction.atomic) to guarantee consistent state updates across inventory items and audit logs."
        }
      ],
      currentStatus: "Enterprise-style management system currently under active development. Core modules and role workflows being refined.",
      futureImprovements: "Barcode scanner API integration, automated PDF invoice/dispatch generation, and real-time stock alert notifications."
    },
    links: {
      github: "",
      demo: "",
      note: "Enterprise internal software system currently being engineered."
    }
  },

  // ==========================================================================
  // PROJECT 5: Volant Technologies — Medical Equipment Product Platform
  // ==========================================================================
  {
    id: "volant-technologies",
    title: "Volant Technologies",
    subtitle: "Medical Equipment Product Platform",
    category: "medical",
    categoryLabel: "Web Development | Medical Technology",
    cardTheme: "volant",
    visualCues: {
      type: "volant",
      badge: "🌐 MEDICAL CATALOG",
      icon: "🌐"
    },
    shortDescription: "A dedicated product showcase platform for physiotherapy and advanced medical technology equipment, featuring structured JSON catalogs and high-performance WebP media delivery.",
    image: "images/projects/AIwallpaper20250202040324316.webp",
    status: "Completed / Active",
    statusType: "completed",
    featured: true,
    tags: [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Medical Technology",
      "WebP Optimization",
      "JSON Architecture"
    ],
    overview: "A digital clinical catalog platform showcasing specialized medical physiotherapy technologies, built with modular JSON data architecture and responsive image delivery.",
    architecture: {
      steps: [
        { title: "Product Catalog Data", desc: "Structured JSON schema organizing medical equipment categories, specifications, and IDs." },
        { title: "Dynamic Product Views", desc: "Rendered product detail pages with optimized WebP imagery and responsive specifications." },
        { title: "Interactive Navigation", desc: "Category filtering across Physiotherapy, TECAR, Shockwave, Laser, and Cryotherapy." },
        { title: "Client Inquiry Flow", desc: "Integrated contact interfaces and geographic location mapping for clinical inquiries." }
      ],
      flowDiagram: `Client Browser
    ↓
Category Filtering (Physiotherapy, TECAR, Shockwave, Laser, Cryo, etc.)
    ↓
Structured Product JSON Engine
    ↓
Product Detail Page & High-Res WebP Gallery
    ↓
Inquiry & Location Integration`
    },
    details: {
      problem: "Specialized clinical physiotherapy and rehabilitation devices require clear, professional technical presentation, accurate category separation, and fast-loading visual assets for medical practitioners.",
      solution: "Built a responsive medical equipment website structured around product categories and modular JSON data, showcasing devices such as Cryo7, EmField Pro, EnPulse Pro, Axion, CL Trac, Icelab, Opton, and Physioflo.",
      keyFeatures: [
        "Product category filtering: Physiotherapy, TECAR, Shockwave, Laser, Magnetotherapy, Cryotherapy, Traction, and Diagnostic equipment",
        "Individual product detail showcases featuring Cryo7, EmField Pro, EnPulse Pro, Axion, CL Trac, Icelab, Opton, and Physioflo",
        "Structured JSON product data architecture with unique product IDs and specifications",
        "High-performance WebP image asset pipeline ensuring rapid page load times",
        "Interactive navigation with contact details and location/map integration for inquiries"
      ],
      technologies: [
        "HTML5 / Semantic Markup",
        "CSS3 / Responsive Layouts",
        "JavaScript (ES6+)",
        "JSON Data Modeling",
        "WebP Image Pipeline",
        "Location & Map Embeds"
      ],
      myContribution: "Organized the medical device catalog data hierarchy, developed responsive product detail layouts, integrated category filtering, and optimized WebP image rendering for high-resolution medical hardware photos.",
      hardwareIntegration: "Client-side web platform engineered for responsive viewing across medical tablet kiosks, desktop workstations, and mobile devices.",
      challenges: [
        {
          challenge: "Displaying extensive medical equipment lines without overwhelming page load speed.",
          mitigation: "Converted image assets to modern WebP format and implemented efficient client-side rendering from structured JSON data."
        }
      ],
      currentStatus: "Completed and functioning as a comprehensive digital product showcase for medical therapy technologies.",
      futureImprovements: "Interactive 3D model viewer for clinical devices and automated inquiry quote generator."
    },
    links: {
      github: "",
      demo: "",
      note: "Commercial medical device catalog platform."
    }
  },

  // ==========================================================================
  // PROJECT 6: Computer Vision & OCR Projects
  // ==========================================================================
  {
    id: "cv-ocr-projects",
    title: "Computer Vision & OCR Projects",
    subtitle: "Image Processing & Recognition Systems",
    category: "ai",
    categoryLabel: "Computer Vision | Python | AI/ML",
    cardTheme: "cv",
    visualCues: {
      type: "cv",
      badge: "👁 OPENCV & OCR",
      icon: "👁"
    },
    shortDescription: "Practical computer vision and optical character recognition implementations in Python, covering face recognition, text extraction, and digital image processing pipelines.",
    image: "images/projects/AIwallpaper20250202040324316.webp",
    status: "Completed Implementations",
    statusType: "completed",
    featured: false,
    tags: [
      "Python",
      "Computer Vision",
      "OCR",
      "Face Recognition",
      "Image Processing",
      "OpenCV"
    ],
    overview: "A suite of practical computer vision and optical character recognition modules built with Python and OpenCV for automated feature detection, facial analysis, and document parsing.",
    architecture: {
      steps: [
        { title: "Image Preprocessing", desc: "Grayscale conversion, thresholding, noise reduction, and edge detection." },
        { title: "Feature Extraction", desc: "Facial landmark detection and bounding box segmentation for text areas." },
        { title: "Recognition Engine", desc: "OCR character classification and face recognition match algorithms." },
        { title: "Structured Output", desc: "Extracted textual data or identity confidence score returned to the user." }
      ],
      flowDiagram: `Input Image / Camera Stream
    ↓
Preprocessing (Thresholding, Filtering, Edge Detection)
    ↓
Segmentation & Feature Extraction
    ↓
Recognition Engine (OCR / Facial Encoding)
    ↓
Structured Data Output`
    },
    details: {
      problem: "Extracting actionable data from physical documents and identifying faces in camera streams requires robust image processing pipelines that handle varying lighting and resolution.",
      solution: "Developed practical Python scripts and modules utilizing computer vision techniques and OCR algorithms to detect facial features, classify patterns, and parse textual characters from imagery.",
      keyFeatures: [
        "Optical Character Recognition (OCR) pipeline for extracting text from scanned documents",
        "Face recognition prototypes utilizing feature vector comparison",
        "Image preprocessing routines: adaptive thresholding, bilateral filtering, and contour detection",
        "Practical Python implementations focused on foundational computer vision concepts"
      ],
      technologies: [
        "Python 3",
        "OpenCV",
        "OCR Libraries",
        "NumPy",
        "Image Processing Algorithms"
      ],
      myContribution: "Authored Python processing scripts, tuned image filters for optimal character clarity, and tested recognition algorithms under diverse lighting conditions.",
      hardwareIntegration: "Compatible with standard USB webcams, Raspberry Pi Camera Module v3, and CSI/MIPI camera interfaces.",
      challenges: [
        {
          challenge: "Handling noisy or low-contrast text in OCR pipelines.",
          mitigation: "Applied Otsu thresholding and morphological transformations to isolate character contours before text recognition."
        }
      ],
      currentStatus: "Completed practical foundational projects in AI and computer vision.",
      futureImprovements: "Integration with lightweight edge-inference models on Raspberry Pi for real-time video stream detection."
    },
    links: {
      github: "",
      demo: "",
      note: "Practical exploratory engineering repositories in Python."
    }
  }
];

// Attach to window for browser access
if (typeof window !== 'undefined') {
  window.projectsData = projectsData;
  window.personalPhotos = personalPhotos;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData, personalPhotos };
}
