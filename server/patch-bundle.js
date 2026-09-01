import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, "../public/assets/js/index.js");

let src = fs.readFileSync(target, "utf8");
const originalLen = src.length;

function replaceOnce(label, find, replacement) {
  const idx = src.indexOf(find);
  if (idx < 0) throw new Error(`Missing marker: ${label}`);
  const count = src.split(find).length - 1;
  if (count !== 1) {
    console.warn(`Warning: ${label} matched ${count} times, replacing first only`);
  }
  src = src.slice(0, idx) + replacement + src.slice(idx + find.length);
  console.log(`OK: ${label}`);
}

function replaceBetween(label, startMarker, endMarker, replacement) {
  const start = src.indexOf(startMarker);
  if (start < 0) throw new Error(`Missing start: ${label}`);
  const end = src.indexOf(endMarker, start + startMarker.length);
  if (end < 0) throw new Error(`Missing end: ${label}`);
  src =
    src.slice(0, start) +
    replacement +
    src.slice(end + endMarker.length);
  console.log(`OK: ${label}`);
}

// --- 1) Dynamic assets (b4) ---
const newB4 = `const b4 = (() => {
  const P = window.__PORTFOLIO__ || { works: [], profile: {} };
  const works = P.works || [];
  const photo = (P.profile && P.profile.photo) || "./assets/image/picture-2.webp";
  const models = [
    { name: "foxModel", type: "gltfModel", path: "./assets/models/Fox/glTF/Fox.gltf" },
    { name: "macbookModel", type: "gltfModel", path: "./assets/models/macbook.gltf" },
    { name: "macModel", type: "gltfModel", path: "./assets/models/mac-draco.glb" },
    { name: "contactModel", type: "gltfModel", path: "./assets/models/contact-1.glb" },
    { name: "flowerModel", type: "gltfModel", path: "./assets/models/flower.glb" },
    { name: "iphoneModel", type: "gltfModel", path: "./assets/models/iphone.gltf" },
    { name: "shipModel", type: "gltfModel", path: "./assets/models/ship.glb" },
  ];
  const workTextures = works.flatMap((w) => [
    {
      name: w.project + "Preview",
      type: "texture",
      path: w.preview || "./assets/image/" + w.project + "/preview.webp",
    },
    {
      name: w.project + "Mac",
      type: "texture",
      path: w.homeMac || "./assets/image/" + w.project + "/homeMac.webp",
    },
  ]);
  return [
    ...models,
    { name: "myPhoto", type: "texture", path: photo },
    ...workTextures,
    { name: "matcapTexture", type: "texture", path: "./assets/image/Matcap.webp" },
    {
      name: "environmentMapTexture",
      type: "cubeTexture",
      path: [
        "./assets/image/environmentMaps/px.webp",
        "./assets/image/environmentMaps/nx.webp",
        "./assets/image/environmentMaps/py.webp",
        "./assets/image/environmentMaps/ny.webp",
        "./assets/image/environmentMaps/pz.webp",
        "./assets/image/environmentMaps/nz.webp",
      ],
    },
  ];
})()`;

replaceBetween(
  "b4 assets",
  "const b4 = [",
  "],\n  zc = kc",
  newB4 + ",\n  zc = kc",
);
// endMarker removed by replaceBetween; replacement re-adds "zc = kc" prefix

// --- 2) Works array Ol ---
const olStart = src.indexOf("  Ol = [\n    {\n      name: \"Protecia Skincare\"");
if (olStart < 0) throw new Error("Ol start not found");
const olEndMarker = "\n  ];\nfunction ju(n) {";
const olEnd = src.indexOf(olEndMarker, olStart);
if (olEnd < 0) throw new Error("Ol end not found");
src =
  src.slice(0, olStart) +
  "  Ol = (window.__PORTFOLIO__ && window.__PORTFOLIO__.works) || [];\nfunction ju(n) {" +
  src.slice(olEnd + olEndMarker.length);
console.log("OK: Ol works");

// --- 3) Header brand ---
replaceOnce(
  "header brand",
  'children: "ZENTO." }),',
  'children: (window.__PORTFOLIO__?.site?.brand) || "ZENTO." }),',
);

// --- 4) Footer slogan / socials / copyright ---
replaceOnce(
  "footer slogan",
  'children: "Creative Digital Experiences",',
  'children: (window.__PORTFOLIO__?.footer?.slogan) || "Creative Digital Experiences",',
);

replaceOnce(
  "footer logo Z.",
  'children: O.jsx("div", { className: "logo", children: "Z." }),',
  'children: O.jsx("div", { className: "logo", children: (window.__PORTFOLIO__?.site?.brandShort) || "Z." }),',
);

replaceOnce(
  "twitter href",
  'href: "https://twitter.com/Kusou1_",',
  'href: (window.__PORTFOLIO__?.socials?.twitter) || "https://www.lancers.jp/profile/bunoketta",',
);

replaceOnce(
  "linkedin href",
  'href: "https://www.linkedin.com/in/lewis-zhang-9bb26b202/",',
  'href: (window.__PORTFOLIO__?.socials?.linkedin) || "https://www.linkedin.com/in/lewis-zhang-9bb26b202/",',
);

replaceOnce(
  "github href",
  'href: "https://github.com/Kusou1",',
  'href: (window.__PORTFOLIO__?.socials?.github) || "https://github.com/Kusou1",',
);

replaceOnce(
  "mailto footer",
  'href: "mailto:hello@lewiszhang.dev",',
  'href: (window.__PORTFOLIO__?.socials?.email) || "mailto:hello@lewiszhang.dev",',
);

replaceOnce(
  "footer brand link",
  'O.jsx(rf, { to: "/", className: "icon", children: "ZENTO" }),',
  'O.jsx(rf, { to: "/", className: "icon", children: (window.__PORTFOLIO__?.footer?.brand) || "ZENTO" }),',
);

replaceOnce(
  "footer copyright",
  'children: "©2024 ZENTO. Creative Engineer",',
  'children: (window.__PORTFOLIO__?.footer?.copyright) || "©2024 ZENTO. Creative Engineer",',
);

// --- 5) Home titles / about / photo / marquee / contact ---
replaceOnce(
  "meta title",
  'children: "ZENTO | Building your digital vision",',
  'children: (window.__PORTFOLIO__?.site?.metaTitle) || "ZENTO | Building your digital vision",',
);

replaceOnce(
  "meta name",
  'content: "ZENTO | Designer + Engineer",',
  'content: (window.__PORTFOLIO__?.site?.metaName) || "ZENTO | Designer + Engineer",',
);

replaceOnce(
  "main title",
  'children: "Building Your Digital Vision",',
  'children: (window.__PORTFOLIO__?.site?.title) || "Building Your Digital Vision",',
);

replaceOnce(
  "main title mobile 1",
  'children: "Building Your",',
  'children: (window.__PORTFOLIO__?.site?.titleMobile1) || "Building Your",',
);

replaceOnce(
  "main title mobile 2",
  'children: "Digital Vision",',
  'children: (window.__PORTFOLIO__?.site?.titleMobile2) || "Digital Vision",',
);

replaceOnce(
  "subtitle",
  'children: "Innovation in Every Pixel",',
  'children: (window.__PORTFOLIO__?.site?.subtitle) || "Innovation in Every Pixel",',
);

// About paragraph — match the Japanese block start uniquely via the children array opener
const aboutNeedle =
  'children: [\n                        "こんにちは。ZENTO2025です。';
const aboutIdx = src.indexOf(aboutNeedle);
if (aboutIdx < 0) throw new Error("about text not found");
const aboutEnd = src.indexOf('O.jsx("br", {})', aboutIdx);
if (aboutEnd < 0) throw new Error("about end not found");
src =
  src.slice(0, aboutIdx) +
  'children: [\n                        (window.__PORTFOLIO__?.profile?.about) || "",\n                        ' +
  src.slice(aboutEnd);
console.log("OK: about text");

replaceOnce(
  "photo desktop src",
  'src: "./assets/image/picture-2.webp",\n                      className: "homeMediaImage",\n                      "data-src": "myPhoto",',
  'src: (window.__PORTFOLIO__?.profile?.photo) || "./assets/image/picture-2.webp",\n                      className: "homeMediaImage",\n                      "data-src": "myPhoto",',
);

replaceOnce(
  "photo mobile src",
  'src: "./assets/image/picture-2.webp",\n                  className: "homeMediaImage",\n                  "data-src": "myPhoto",',
  'src: (window.__PORTFOLIO__?.profile?.photo) || "./assets/image/picture-2.webp",\n                  className: "homeMediaImage",\n                  "data-src": "myPhoto",',
);

// Marquee texts — replace the introMarquee children block with dynamic builder
const marqueeStart = src.indexOf(
  'className: "introMarquee",\n            children: O.jsxs(tfe, {\n              inverted: !0,\n              duration: 60,\n              children: [',
);
if (marqueeStart < 0) throw new Error("marquee start not found");
const marqueeChildrenStart = src.indexOf("children: [", marqueeStart);
const marqueeEndMarker =
  '],\n            }),\n          }),\n          O.jsx("div", {\n            className: "webgl-pin"';
const marqueeChildrenEnd = src.indexOf(marqueeEndMarker, marqueeChildrenStart);
if (marqueeChildrenEnd < 0) throw new Error("marquee end not found");

const marqueeDyn = `children: ((window.__PORTFOLIO__?.marquee) || ["Interactive Experiences","Creative Vision","High-Performance Websites","Creates Endless Possibilities"]).flatMap((txt, idx) => [
                O.jsx("div", {
                  className: "introMarqueeItem",
                  children: O.jsx("div", {
                    className: idx % 2 === 0 ? "marqueeText1" : "marqueeText2",
                    children: txt,
                  }),
                }),
                O.jsx("div", {
                  className: "introMarqueeItem",
                  children: O.jsx("div", {
                    className: "marqueeDot",
                    children: "·",
                  }),
                }),
              ])`;
src =
  src.slice(0, marqueeChildrenStart) +
  marqueeDyn +
  ",\n            }),\n          }),\n          O.jsx(\"div\", {\n            className: \"webgl-pin\"" +
  src.slice(marqueeChildrenEnd + marqueeEndMarker.length);
console.log("OK: marquee");

replaceOnce(
  "home contact title",
  'children: O.jsx("p", { children: "Let\'s work together" }),',
  'children: O.jsx("p", { children: (window.__PORTFOLIO__?.homeContact?.title) || "Let\'s work together" }),',
);

replaceOnce(
  "home contact paragraph",
  'children:\n                        "I’m here to help you make your next big idea a reality. Contact me now.",',
  'children:\n                        (window.__PORTFOLIO__?.homeContact?.paragraph) || "I’m here to help you make your next big idea a reality. Contact me now.",',
);

replaceOnce(
  "home contact button",
  'children: "Connect with Me",',
  'children: (window.__PORTFOLIO__?.homeContact?.button) || "Connect with Me",',
);

// --- 6) Mac uniforms use first two works ---
replaceOnce(
  "mac uniforms",
  "uTexture1: { value: i.current.proteciaMac },\n        uTexture2: { value: i.current.voirMac },",
  `uTexture1: { value: i.current[((window.__PORTFOLIO__?.works?.[0]?.project) || "protecia") + "Mac"] },
        uTexture2: { value: i.current[((window.__PORTFOLIO__?.works?.[1]?.project) || "voir") + "Mac"] },`,
);

// --- 7) Contact page ---
replaceOnce(
  "contact headline1",
  'children: "Let\'s Work",',
  'children: (window.__PORTFOLIO__?.contact?.headline1) || "Let\'s Work",',
);

replaceOnce(
  "contact headline2",
  'children: "together!",',
  'children: (window.__PORTFOLIO__?.contact?.headline2) || "together!",',
);

replaceOnce(
  "contact subcopy",
  'children: "we\'ll create something extraordinary!",',
  'children: (window.__PORTFOLIO__?.contact?.subcopy) || "we\'ll create something extraordinary!",',
);

replaceOnce(
  "contact email",
  'children: "seniordev745@gmail.com",',
  'children: (window.__PORTFOLIO__?.contact?.email) || "seniordev745@gmail.com",',
);

replaceOnce(
  "contact phone",
  'children: "+86 13305969555",',
  'children: (window.__PORTFOLIO__?.contact?.phone) || "+86 13305969555",',
);

replaceOnce(
  "contact location",
  'children: "Remote from Japan",',
  'children: (window.__PORTFOLIO__?.contact?.location) || "Remote from Japan",',
);

replaceOnce(
  "contact coordinates",
  'children: "37° 29′ 36″ N / 139° 55′ 50″ E",',
  'children: (window.__PORTFOLIO__?.contact?.coordinates) || "37° 29′ 36″ N / 139° 55′ 50″ E",',
);

replaceOnce(
  "contact status",
  '"Avaiable",',
  '(window.__PORTFOLIO__?.contact?.status) || "Avaiable",',
);

// Work page preview paths already use ./assets/image/${S.project}/preview.webp
// Override to use work.preview when present — patch the template usages carefully.
// The data-src already uses project slug; textures come from b4. Image src for work cards:
src = src.replaceAll(
  "src: `./assets/image/${S.project}/preview.webp`",
  'src: (S.preview || `./assets/image/${S.project}/preview.webp`)',
);
console.log("OK: work preview src templates");

// Router was built for GitHub-pages style /port base; serve at site root instead
if (src.includes('base: "/port"')) {
  src = src.replace('base: "/port"', 'base: ""');
  console.log("OK: router base /port -> empty");
} else if (src.includes('base: ""')) {
  console.log("OK: router base already empty");
} else {
  console.warn("Warning: router base marker not found");
}

fs.writeFileSync(target, src);
console.log(`Patched ${target}`);
console.log(`Size: ${originalLen} -> ${src.length}`);
