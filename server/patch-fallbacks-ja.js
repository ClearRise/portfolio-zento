import fs from "fs";

const p = "public/assets/js/index.js";
let s = fs.readFileSync(p, "utf8");

const reps = [
  ['" Avaiable"', '(window.__PORTFOLIO__?.contact?.status) || "受付中"'],
  ['|| "Avaiable"', '|| "受付中"'],
  ["Creative Digital Experiences", "クリエイティブとデジタル体験"],
  ["Building Your Digital Vision", "デジタルのビジョンを、かたちに"],
  ['titleMobile1) || "Building Your"', 'titleMobile1) || "デジタルのビジョンを、"'],
  ['titleMobile2) || "Digital Vision"', 'titleMobile2) || "かたちに"'],
  ["Innovation in Every Pixel", "一画素に込める、こだわりと革新"],
  ["Let's work together", "一緒にものづくりをしませんか"],
  ["Connect with Me", "お問い合わせ"],
  ["Remote from Japan", "日本からリモート対応"],
  [
    "I'm here to help you make your next big idea a reality. Contact me now.",
    "次の大きなアイデアを、一緒に現実にしましょう。まずはお気軽にご連絡ください。",
  ],
  [
    "I’m here to help you make your next big idea a reality. Contact me now.",
    "次の大きなアイデアを、一緒に現実にしましょう。まずはお気軽にご連絡ください。",
  ],
];

for (const [a, b] of reps) {
  const n = s.split(a).length - 1;
  if (n) {
    s = s.split(a).join(b);
    console.log("OK", n, a.slice(0, 40));
  } else {
    console.warn("SKIP", a.slice(0, 40));
  }
}

fs.writeFileSync(p, s);
console.log("done");
