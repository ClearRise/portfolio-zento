(async function loadPortfolioContent() {
  const FALLBACK = {
    site: {
      brand: "ZENTO.",
      brandShort: "Z.",
      title: "Building Your Digital Vision",
      titleMobile1: "Building Your",
      titleMobile2: "Digital Vision",
      subtitle: "Innovation in Every Pixel",
      metaTitle: "ZENTO | Building your digital vision",
      metaName: "ZENTO | Designer + Engineer",
      metaDescription:
        "動きと体験設計を得意とするデザイナー兼エンジニア、ZENTOのポートフォリオサイトです。",
    },
    preloader: { brandName: "ZENTO" },
    profile: { photo: "./assets/image/picture-2.webp", about: "" },
    marquee: [
      "Interactive Experiences",
      "Creative Vision",
      "High-Performance Websites",
      "Creates Endless Possibilities",
    ],
    works: [],
    homeContact: {
      title: "Let's work together",
      paragraph: "次の大きなアイデアを、一緒に現実にしましょう。",
      button: "Connect with Me",
    },
    contact: {
      headline1: "Let's Work",
      headline2: "together!",
      subcopy: "we'll create something extraordinary!",
      email: "",
      phone: "",
      location: "Remote from Japan",
      coordinates: "",
      status: "Available",
      mailSubject: "はじめまして。",
    },
    contactForm: {
      heading1: "Fill this out and we'll get back to you as soon as we can..",
      heading2: "Open to any and all opportunities.",
      placeholderName: "First & Last Name",
      placeholderCompany: "Company",
      placeholderEmail: "Email",
      placeholderPhone: "Phone",
      placeholderMessage: "Project details...",
      submitLabel: "Send",
      successMessage: "Thank you for your message!!",
      errorMessage: "Something went wrong, please try again later",
      invalidEmail: "Please enter a valid email address",
      invalidPhone: "Please enter a valid phone number",
    },
    socials: {
      twitter: "https://www.lancers.jp/profile/bunoketta",
      linkedin: "#",
      github: "#",
      email: "mailto:",
      chatwork: "",
    },
    footer: {
      slogan: "Creative Digital Experiences",
      copyright: "©2024 ZENTO. Creative Engineer",
      brand: "ZENTO",
    },
    ui: {
      menu: "Menu",
      back: "Back.",
      home: "Home",
      work: "Work",
      contact: "Contact",
      recentWork: "Recent Work",
      clickDetail: "Click screen to view detail.",
      workIntro: "Introduction",
      role: "Role",
      year: "Year",
      exploreSite: "Explore Live Website",
      discoverMore: "discover more projects",
      localTime: "Local Time",
      currentStatus: "Current Status",
      remoteFrom: "Remote from",
      locationShort: "Ishikawa, Japan",
      preloaderRole: "Web Developer",
      twitter: "Lancers",
      linkedin: "Linkedin",
      github: "Github",
      email: "Email",
      workMetaTitle: "Work | ZENTO",
      workMetaName: "ZENTO | My Projects",
      workMetaDescription: "ZENTO | My Projects",
      contactMetaTitle: "Contact | ZENTO",
      contactMetaName: "ZENTO | Let's Work Together",
      contactMetaDescription:
        "Contact Page | Contact me to create something extraordinary! How can we help you?",
    },
  };

  try {
    const res = await fetch("/api/content");
    if (!res.ok) throw new Error("content fetch failed");
    window.__PORTFOLIO__ = await res.json();
  } catch (err) {
    console.warn("[content-loader] using fallback", err);
    window.__PORTFOLIO__ = FALLBACK;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = "./assets/js/index.js";
  document.head.appendChild(script);
})();
