import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { IMAGE_DIR, requireAuth } from "../auth.js";

const router = Router();

function sanitize(value, fallback = "") {
  return String(value || fallback).replace(/[^a-zA-Z0-9_-]/g, "");
}

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    const folder = sanitize(req.query.folder);
    const dest = folder ? path.join(IMAGE_DIR, folder) : IMAGE_DIR;
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename(req, file, cb) {
    const kind = sanitize(req.query.kind, "image");
    const ext = path.extname(file.originalname).toLowerCase() || ".webp";
    const allowed = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"];
    const safeExt = allowed.includes(ext) ? ext : ".webp";

    if (kind === "profile") {
      cb(null, `picture-2${safeExt}`);
      return;
    }
    if (kind === "preview") {
      cb(null, `preview${safeExt}`);
      return;
    }
    if (kind === "homeMac") {
      cb(null, `homeMac${safeExt}`);
      return;
    }
    const base = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${base}-${Date.now()}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only images are allowed"));
      return;
    }
    cb(null, true);
  },
});

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const folder = sanitize(req.query.folder);
    const relative = folder
      ? `./assets/image/${folder}/${req.file.filename}`
      : `./assets/image/${req.file.filename}`;
    res.json({ ok: true, path: relative });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

export default router;
