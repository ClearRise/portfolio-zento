import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "../public/assets/js/index.js");
let src = fs.readFileSync(target, "utf8");

function replaceOnce(label, find, replacement) {
  const idx = src.indexOf(find);
  if (idx < 0) {
    console.warn("SKIP:", label);
    return;
  }
  src = src.slice(0, idx) + replacement + src.slice(idx + find.length);
  console.log("OK:", label);
}

function replaceAllExact(label, find, replacement) {
  const count = src.split(find).length - 1;
  if (count === 0) {
    console.warn("SKIP:", label);
    return;
  }
  src = src.split(find).join(replacement);
  console.log(`OK: ${label} (${count})`);
}

// Header
replaceOnce(
  "menu",
  'children: O.jsx("h1", { className: "menu", children: "Menu" })',
  'children: O.jsx("h1", { className: "menu", children: (window.__PORTFOLIO__?.ui?.menu) || "メニュー" })',
);
replaceOnce(
  "back",
  '"Back.",',
  '(window.__PORTFOLIO__?.ui?.back) || "戻る.",',
);

// Footer social + page links (first block)
replaceOnce(
  "footer twitter",
  'children: O.jsx("span", { children: "Twitter/X" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.twitter) || "X" })',
);
replaceOnce(
  "footer linkedin",
  'children: O.jsx("span", { children: "Linkedin" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.linkedin) || "LinkedIn" })',
);
replaceOnce(
  "footer github",
  'children: O.jsx("span", { children: "Github" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.github) || "GitHub" })',
);
replaceOnce(
  "footer email",
  'children: O.jsx("span", { children: "Email" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.email) || "メール" })',
);

// Footer page links — unique context with page-line
replaceOnce(
  "footer home",
  'to: "/",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: "Home" })',
  'to: "/",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.home) || "ホーム" })',
);
replaceOnce(
  "footer work",
  'to: "/work",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: "Work" })',
  'to: "/work",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.work) || "作品" })',
);
replaceOnce(
  "footer contact",
  'to: "/contact",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: "Contact" })',
  'to: "/contact",\n                      "data-animation": "link",\n                      children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.contact) || "お問い合わせ" })',
);

// Home works section
replaceOnce(
  "recent work",
  'children: "Recent Work"',
  'children: (window.__PORTFOLIO__?.ui?.recentWork) || "最近の作品"',
);
replaceOnce(
  "click detail",
  'children: "Click screen to view detail."',
  'children: (window.__PORTFOLIO__?.ui?.clickDetail) || "画面をクリックして詳細を見る"',
);

// Work page
replaceOnce(
  "work title",
  'O.jsx("title", { children: "Work | ZENTO" })',
  'O.jsx("title", { children: (window.__PORTFOLIO__?.ui?.workMetaTitle) || "作品 | ZENTO" })',
);
replaceOnce(
  "work meta name",
  'O.jsx("meta", { name: "name", content: "Work | ZENTO" })',
  'O.jsx("meta", { name: "name", content: (window.__PORTFOLIO__?.ui?.workMetaTitle) || "作品 | ZENTO" })',
);
replaceOnce(
  "work meta projects",
  'content: "ZENTO | My Projects"',
  'content: (window.__PORTFOLIO__?.ui?.workMetaName) || "ZENTO | 作品一覧"',
);
replaceOnce(
  "role label",
  'children: "Role"',
  'children: (window.__PORTFOLIO__?.ui?.role) || "担当"',
);
replaceOnce(
  "year label",
  'children: "Year"',
  'children: (window.__PORTFOLIO__?.ui?.year) || "年"',
);
replaceOnce(
  "explore live",
  'children: "Explore Live Website"',
  'children: (window.__PORTFOLIO__?.ui?.exploreSite) || "サイトを見る"',
);
replaceOnce(
  "discover more",
  '"discover more projects"',
  '(window.__PORTFOLIO__?.ui?.discoverMore) || "もっと作品を見る"',
);

// Contact page
replaceOnce(
  "contact title",
  'O.jsx("title", { children: "Contact | ZENTO" })',
  'O.jsx("title", { children: (window.__PORTFOLIO__?.ui?.contactMetaTitle) || "お問い合わせ | ZENTO" })',
);
replaceOnce(
  "contact meta",
  'content: "ZENTO | Let\'s Work Together"',
  'content: (window.__PORTFOLIO__?.ui?.contactMetaName) || "ZENTO | 一緒につくりましょう"',
);
replaceAllExact(
  "local time",
  'children: "Local Time"',
  'children: (window.__PORTFOLIO__?.ui?.localTime) || "現地時間"',
);
replaceAllExact(
  "current status",
  'children: "Current Status"',
  'children: (window.__PORTFOLIO__?.ui?.currentStatus) || "現在の状況"',
);

// Nav panel
replaceOnce(
  "nav remote from",
  'children: "Remote from"',
  'children: (window.__PORTFOLIO__?.ui?.remoteFrom) || "拠点"',
);
replaceOnce(
  "nav fukushima",
  'children: "Fukushima, Japan"',
  'children: (window.__PORTFOLIO__?.ui?.locationShort) || "福島、日本"',
);

// Nav letter links — Home / Work / Contact spans in nav
replaceAllExact(
  'nav span Home',
  'children: O.jsx("span", { children: "Home" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.home) || "ホーム" })',
);
replaceAllExact(
  'nav span Work',
  'children: O.jsx("span", { children: "Work" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.work) || "作品" })',
);
replaceAllExact(
  'nav span Contact',
  'children: O.jsx("span", { children: "Contact" })',
  'children: O.jsx("span", { children: (window.__PORTFOLIO__?.ui?.contact) || "お問い合わせ" })',
);

// Preloader
replaceOnce(
  "preloader role",
  'children: ["Web Developer ", O.jsx("span", { children: "*" })]',
  'children: [((window.__PORTFOLIO__?.ui?.preloaderRole) || "Webエンジニア") + " ", O.jsx("span", { children: "*" })]',
);

fs.writeFileSync(target, src);
console.log("Done patching Japanese UI strings");
