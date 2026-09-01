(async function loadPortfolioContent() {
  try {
    const res = await fetch("/api/content");
    if (!res.ok) throw new Error("content fetch failed");
    window.__PORTFOLIO__ = await res.json();
  } catch (err) {
    console.warn("[content-loader] using fallback", err);
    window.__PORTFOLIO__ = {
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
      profile: {
        photo: "./assets/image/picture-2.webp",
        about: "",
      },
      marquee: [
        "Interactive Experiences",
        "Creative Vision",
        "High-Performance Websites",
        "Creates Endless Possibilities",
      ],
      works: [],
      homeContact: {
        title: "Let's work together",
        paragraph:
          "次の大きなアイデアを、一緒に現実にしましょう。まずはお気軽にご連絡ください。",
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
      },
      socials: {
        twitter: "https://www.lancers.jp/profile/bunoketta",
        linkedin: "#",
        github: "#",
        email: "mailto:",
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
      },
    };
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = "./assets/js/index.js";
  document.head.appendChild(script);
})();
