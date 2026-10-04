export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "mobile" | "ai" | "fullstack" | "enterprise" | "system";
  badge: string;
  featured?: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  metrics?: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export const PORTFOLIO_PROFILE = {
  name: "Chittipriya Verma",
  role: "Full-Stack & Mobile App Architect",
  tagline: "Building high-performance mobile apps, scalable cloud systems, and AI-driven products.",
  shortBio:
    "Software Engineer specializing in Flutter, React Native, Next.js, and Generative AI. Passionate about crafting fluid user experiences and reliable distributed architectures.",
  email: "chitti1890@gmail.com",
  github: "https://github.com/chittipriya0010",
  githubUsername: "chittipriya0010",
  linkedin: "https://linkedin.com/in/chittipriya0010",
  location: "India • Remote Worldwide",
  availability: "Available for Full-time Roles & High-Impact Projects",
  stats: [
    { label: "Mobile Apps Built", value: "3+" },
    { label: "GitHub Repositories", value: "22+" },
    { label: "Core Technologies", value: "15+" },
    { label: "Production Uptime", value: "99.9%" },
  ],
};

export const MOBILE_SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: "fintech-app",
    title: "PayMitra - Retailer Banking & FinTech Platform",
    tagline: "Merchant application for AEPS, DMT, BBPS & Multi-Operator Recharges",
    description:
      "A comprehensive fintech platform built for retail merchants, enabling Aadhaar Enabled Payment System (AEPS) biometric withdrawals, Domestic Money Transfer (DMT), Bharat Bill Payment System (BBPS) utilities, and multi-operator mobile/DTH/FASTag recharges with real-time wallet commission accounting.",
    category: "mobile",
    badge: "Merchant FinTech",
    featured: true,
    technologies: ["Flutter", "Dart", "Biometric RD Service", "BBPS API", "AEPS SDK", "Node.js", "PostgreSQL"],
    metrics: "Sub-50ms Transaction Latency • 99.98% Payout Success Rate",
    highlights: [
      "AEPS (Aadhaar Enabled Payment System): Biometric cash withdrawal, mini-statement & balance enquiry with Mantra/Morpho RD service integration",
      "DMT (Domestic Money Transfer): 24x7 instant IMPS/NEFT fund transfers with automatic IFSC verification and smart route failovers",
      "BBPS (Bharat Bill Payment System): One-stop bill payments for electricity, gas, water, municipal tax, broadband, and loan repayments",
      "Mobile & DTH Recharge: Instant prepaid/postpaid recharges, FASTag top-ups, and DTH plans with real-time commission ledger settlement",
      "Retailer Ledger & Hardware: Daily transaction passbook, Bluetooth thermal printer receipts, and biometric security encryption",
    ],
  },
  {
    id: "cricket-live-app",
    title: "CricPulse - Real-time Cricket Score & Analytics",
    tagline: "Ball-by-ball commentary, predictive odds & match notifications",
    description:
      "A high-speed cricket scoring and live tournament companion mobile app providing instant ball-by-ball updates, wagon-wheel analytics, player comparison cards, and push notifications.",
    category: "mobile",
    badge: "Live Sports App",
    featured: true,
    technologies: ["Flutter", "Dart", "WebSockets", "Riverpod", "REST API", "FCM Alerts"],
    metrics: "Instant Ball Telemetry • Zero Stream Delay",
    highlights: [
      "Real-time ball-by-ball commentary stream with visual pitch maps and boundary indicators",
      "Granular player stats, head-to-head match-up metrics, and run-rate predictive graphs",
      "Low-latency push notifications for wickets, milestones, super-overs, and match results",
      "Offline caching for past match archives and player career stats",
    ],
  },
  {
    id: "ai-attendance-app",
    title: "FaceAttend AI - Smart Facial Recognition Attendance",
    tagline: "Edge computer-vision check-in with geo-fencing & spoof detection",
    description:
      "Mobile-first contactless attendance system utilizing on-device facial detection and deep learning verification to log employee check-ins within milliseconds.",
    category: "mobile",
    badge: "Computer Vision AI",
    featured: true,
    technologies: ["Flutter", "Python", "OpenCV", "TensorFlow Lite", "FastAPI", "PostgreSQL"],
    metrics: "99.4% Face Accuracy • <200ms Verification",
    highlights: [
      "On-device facial embedding extraction with anti-spoofing liveness detection (blink/smile checks)",
      "Strict GPS geo-fencing boundary verification ensuring on-premise check-ins",
      "Automated shift logging, leaves tracking, and PDF timesheet generation for HR",
      "Offline sync mode buffering verification events during network dropouts",
    ],
  },
];

export const ALL_PROJECTS: ProjectItem[] = [
  ...MOBILE_SHOWCASE_PROJECTS,
  {
    id: "nex-erp",
    title: "NexERP - Enterprise Resource Planning Suite",
    tagline: "Unified supply chain, inventory management & workforce orchestration",
    description:
      "Full-scale enterprise ERP platform integrating automated warehouse inventory tracking, purchase order lifecycles, role-based departmental permissions, supplier management, and real-time business financial reporting.",
    category: "enterprise",
    badge: "Enterprise Solution",
    featured: true,
    technologies: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Redis"],
    metrics: "Multi-branch Inventory • Role-Based Access Control",
    highlights: [
      "Real-time stock alert thresholds and automated multi-warehouse stock replenishment",
      "Comprehensive procurement order lifecycle with approval chains and invoice generation",
      "Granular Role-Based Access Control (Admin, Finance, Warehouse Manager, Staff)",
      "Interactive analytics dashboard showing burn rate, profit margins, and supply forecasts",
    ],
  },
  {
    id: "medical-report-analyser",
    title: "Medical Report Analyser (AI)",
    tagline: "Automated diagnostic report summarization using Gemini AI & Python",
    description:
      "AI-powered medical report scanner that automates the analysis of complex diagnostic test reports, extracting abnormal biomarkers and generating clear doctor-ready summaries.",
    category: "ai",
    badge: "8 ★ on GitHub",
    featured: true,
    technologies: ["Python", "Streamlit", "Google Gemini AI", "Medical OCR", "Pandas"],
    githubUrl: "https://github.com/chittipriya0010/medical-report-analyser",
    liveUrl: "https://medical-report-analyser-fdgmlxyxdxjqs6z2chvgz4.streamlit.app/",
    metrics: "8 Stars on GitHub • Deployed Live on Streamlit",
    highlights: [
      "Multimodal document parsing for blood tests, pathology panels, and radiology sheets",
      "Gemini AI reasoning identifying critical flagged ranges with safety caveats",
      "Streamlit UI tailored for healthcare workflows and instant report query chat",
    ],
  },
  {
    id: "plant-identifier",
    title: "Plant Identifier AI",
    tagline: "Gemini Vision powered drag-and-drop botanical identifier",
    description:
      "Interactive plant classification platform where users drag-and-drop botanical images to instantly obtain species identification, watering schedules, sunlight needs, and botanical care guides.",
    category: "ai",
    badge: "AI Vision",
    technologies: ["Next.js", "React", "Gemini Vision AI", "Tailwind CSS"],
    githubUrl: "https://github.com/chittipriya0010/plant-identifier",
    liveUrl: "https://plant-identifier-cyan.vercel.app/",
    highlights: [
      "Instant multi-angle image analysis identifying species taxonomy and diseases",
      "Curated botanical care guidelines and indoor environment compatibility ratings",
      "Responsive drag-and-drop file upload with optimistic UI states",
    ],
  },
  {
    id: "task-mgmt-api",
    title: "Task Management High-Concurrency API",
    tagline: "Blazing-fast backend engine engineered in Rust",
    description:
      "Microservice architecture built from the ground up in Rust offering ultra-low latency task scheduling, asynchronous job worker queues, and resilient database transactions.",
    category: "system",
    badge: "Rust Systems",
    technologies: ["Rust", "Tokio", "Actix Web", "SQLx", "PostgreSQL"],
    githubUrl: "https://github.com/chittipriya0010/task-management-api",
    metrics: "Sub-millisecond P99 Response Time",
    highlights: [
      "Zero-cost abstractions with Rust memory safety guarantees and no garbage collection pauses",
      "Asynchronous request pipelining with Tokio and connection pool optimization",
      "Comprehensive REST API contract for workflow tracking and status transitions",
    ],
  },
  {
    id: "ecommerce-stripe",
    title: "Stripe-Powered E-Commerce Store",
    tagline: "Full-stack modern shop with secure Stripe checkout flow",
    description:
      "Production-ready digital store featuring dynamic catalog search, responsive shopping cart drawer, webhook-verified Stripe payment processing, and customer order receipts.",
    category: "fullstack",
    badge: "Full Stack",
    technologies: ["Next.js", "TypeScript", "Stripe API", "Tailwind CSS", "Zustand"],
    githubUrl: "https://github.com/chittipriya0010/ecommerce-app-stripe",
    liveUrl: "https://ecommerce-app-stripe.vercel.app",
    highlights: [
      "PCI-compliant Stripe checkout integration with automated webhook payment verification",
      "State-managed cart system with persistent local storage and dynamic tax calculations",
      "Clean product filtering by category, price, and stock availability",
    ],
  },
  {
    id: "kubeerr-ai",
    title: "Kubeerr AI Compliance & Data Explorer",
    tagline: "Automate EDA and conversational querying over organizational datasets",
    description:
      "Enterprise AI compliance intelligence system enabling natural language conversations over complex tabular data files, exploratory data analytics, and anomaly prediction.",
    category: "ai",
    badge: "Data Intelligence",
    technologies: ["Python", "Gemini AI", "FastAPI", "Data Analysis", "Pandas"],
    githubUrl: "https://github.com/chittipriya0010/Kubeerr-AI-Compliance",
    highlights: [
      "Natural language question-to-SQL / EDA pipeline translating queries into statistical summaries",
      "Automated compliance audit report generation highlighting outliers and compliance risks",
    ],
  },
  {
    id: "classic-space-portfolio",
    title: "Classic Space 3D Portfolio (V1)",
    tagline: "Interactive 3D Three.js universe featuring cosmic particle fields",
    description:
      "The original space-themed portfolio built with Three.js, React Three Fiber, Framer Motion, and cosmic blackhole animations.",
    category: "fullstack",
    badge: "Original V1 Portfolio",
    technologies: ["Three.js", "React Three Fiber", "Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/chittipriya0010/animate-space-portfolio",
    highlights: [
      "Physics-based rotating 3D starfield particles rendered in WebGL",
      "Dynamic blackhole cosmic video layer with smooth scroll-linked reveal animations",
      "Direct one-click toggle to view the full Classic Space Mode anytime",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Mobile App Development",
    iconName: "mobile",
    skills: [
      { name: "Flutter", level: "Expert" },
      { name: "Dart", level: "Expert" },
      { name: "React Native", level: "Proficient" },
      { name: "Riverpod / Bloc", level: "Advanced" },
      { name: "Firebase Suite", level: "Advanced" },
      { name: "REST & WebSockets", level: "Expert" },
      { name: "TensorFlow Lite", level: "Intermediate" },
    ],
  },
  {
    title: "Frontend Engineering",
    iconName: "layout",
    skills: [
      { name: "React 18", level: "Expert" },
      { name: "Next.js 14", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Framer Motion", level: "Advanced" },
      { name: "Redux Toolkit", level: "Advanced" },
      { name: "HTML5 / CSS3", level: "Expert" },
    ],
  },
  {
    title: "Backend & Systems",
    iconName: "server",
    skills: [
      { name: "Node.js & Express", level: "Advanced" },
      { name: "Rust", level: "Intermediate" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MongoDB", level: "Advanced" },
      { name: "Prisma ORM", level: "Advanced" },
      { name: "Stripe API", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
    ],
  },
  {
    title: "AI & Innovation",
    iconName: "cpu",
    skills: [
      { name: "Google Gemini AI", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "Computer Vision", level: "Intermediate" },
      { name: "Streamlit", level: "Advanced" },
      { name: "Git & GitHub CI", level: "Expert" },
      { name: "Figma UI/UX", level: "Proficient" },
    ],
  },
];

export const RESUME_DATA = {
  name: "Chittipriya Verma",
  title: "Full-Stack Software Engineer & Mobile Developer",
  email: "chitti1890@gmail.com",
  github: "https://github.com/chittipriya0010",
  location: "India",
  summary:
    "Dynamic and results-driven Software Engineer with proven expertise in building high-performance cross-platform mobile apps (Flutter, React Native), scalable full-stack web applications (Next.js, TypeScript, Rust, Node.js), and AI-driven solutions (Gemini AI, Computer Vision). Proven track record of architecting user-centric products with fluid motion design, robust APIs, and modern cloud databases.",
  experience: [
    {
      role: "Mobile & Full-Stack Developer",
      company: "Independent Projects & Open Source",
      period: "2023 - Present",
      bullets: [
        "Architected NovaPay, a cross-platform fintech wallet with biometric authentication, sub-50ms transaction latency, and real-time budgeting telemetry.",
        "Built CricPulse, a high-throughput live cricket scoring application using WebSockets for instant ball-by-ball updates and commentary.",
        "Created FaceAttend AI, a mobile facial recognition attendance system with on-device TFLite edge models, achieving 99.4% accuracy.",
        "Engineered NexERP, an enterprise management suite streamlining multi-warehouse inventory, procurement lifecycles, and role-based permissions.",
        "Authored Medical Report Analyser (8 GitHub stars) utilizing Gemini AI for automated laboratory diagnostic summarization.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "University Institute of Technology",
      year: "2021 - 2025",
      details: "Focus: Data Structures, Distributed Systems, Software Engineering, Mobile Architecture.",
    },
  ],
  certifications: [
    "Next.js & React Enterprise Application Architecture",
    "Flutter & Dart Cross-Platform Mobile Development",
    "Building AI Applications with Google Gemini API",
  ],
};
