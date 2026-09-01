import fs from "fs";

const target = "public/assets/js/index.js";
let src = fs.readFileSync(target, "utf8");

function replaceOnce(label, find, replacement) {
  if (!src.includes(find)) {
    console.warn("SKIP:", label);
    return;
  }
  src = src.replace(find, replacement);
  console.log("OK:", label);
}

replaceOnce(
  "preloader brand",
  'children: "ZENTO",',
  'children: (window.__PORTFOLIO__?.preloader?.brandName) || "ZENTO",',
);

replaceOnce(
  "work intro",
  'children: "Intoduction",',
  'children: (window.__PORTFOLIO__?.ui?.workIntro) || "Introduction",',
);

replaceOnce(
  "work meta description",
  'content: (window.__PORTFOLIO__?.ui?.workMetaName) || "ZENTO | 作品一覧",',
  'content: (window.__PORTFOLIO__?.ui?.workMetaDescription) || (window.__PORTFOLIO__?.ui?.workMetaName) || "ZENTO | My Projects",',
);

replaceOnce(
  "contact meta description",
  'content:\n                    "Contact Page | Contact me to create something extraordinary!How can we help you?",',
  'content: (window.__PORTFOLIO__?.ui?.contactMetaDescription) || "Contact Page | Contact me to create something extraordinary! How can we help you?",',
);

replaceOnce(
  "chatwork href",
  'href: "#",\n                          target: "_blank",\n                          className: "social-link",\n                          ref: u,',
  'href: (window.__PORTFOLIO__?.socials?.chatwork) || "#",\n                          target: "_blank",\n                          className: "social-link",\n                          ref: u,',
);

replaceOnce(
  "mailto subject",
  '?subject=はじめまして。",',
  '?subject=" + encodeURIComponent((window.__PORTFOLIO__?.contact?.mailSubject) || "はじめまして。") + "",',
);

// Contact form
replaceOnce(
  "form heading1",
  '"Fill this out and we\'ll get back to you as soon as we can..",',
  '(window.__PORTFOLIO__?.contactForm?.heading1) || "Fill this out and we\'ll get back to you as soon as we can..",',
);

replaceOnce(
  "form heading2",
  'O.jsx("h1", { children: "Open to any and all opportunities." }),',
  'O.jsx("h1", { children: (window.__PORTFOLIO__?.contactForm?.heading2) || "Open to any and all opportunities." }),',
);

replaceOnce(
  "placeholder name",
  'placeholder: "First & Last Name",',
  'placeholder: (window.__PORTFOLIO__?.contactForm?.placeholderName) || "First & Last Name",',
);

replaceOnce(
  "placeholder company",
  'placeholder: "Company",',
  'placeholder: (window.__PORTFOLIO__?.contactForm?.placeholderCompany) || "Company",',
);

replaceOnce(
  "placeholder email",
  'placeholder: "Email",\n                  className: "txt-field is-half",\n                  name: "user_email",',
  'placeholder: (window.__PORTFOLIO__?.contactForm?.placeholderEmail) || "Email",\n                  className: "txt-field is-half",\n                  name: "user_email",',
);

replaceOnce(
  "placeholder phone",
  'placeholder: "Phone",\n                  className: "txt-field is-half",\n                  name: "user_phone",',
  'placeholder: (window.__PORTFOLIO__?.contactForm?.placeholderPhone) || "Phone",\n                  className: "txt-field is-half",\n                  name: "user_phone",',
);

replaceOnce(
  "placeholder message",
  'placeholder: "Project details...",',
  'placeholder: (window.__PORTFOLIO__?.contactForm?.placeholderMessage) || "Project details...",',
);

replaceOnce(
  "submit label",
  'children: "Send",',
  'children: (window.__PORTFOLIO__?.contactForm?.submitLabel) || "Send",',
);

replaceOnce(
  "invalid email",
  'i("Please enter a valid email address")',
  'i((window.__PORTFOLIO__?.contactForm?.invalidEmail) || "Please enter a valid email address")',
);

replaceOnce(
  "invalid phone",
  'i("Please enter a valid phone number")',
  'i((window.__PORTFOLIO__?.contactForm?.invalidPhone) || "Please enter a valid phone number")',
);

replaceOnce(
  "success message",
  'i("Thank you for your message!!"),',
  'i((window.__PORTFOLIO__?.contactForm?.successMessage) || "Thank you for your message!!"),',
);

replaceOnce(
  "error message",
  'i("Something went wrong, please try again later"),',
  'i((window.__PORTFOLIO__?.contactForm?.errorMessage) || "Something went wrong, please try again later"),',
);

fs.writeFileSync(target, src);
console.log("Done");
