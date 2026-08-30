import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, "..");
export const DATA_PATH = path.join(ROOT, "data", "content.json");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const IMAGE_DIR = path.join(PUBLIC_DIR, "assets", "image");
export const ADMIN_DIST = path.join(ROOT, "admin", "dist");

export function requireAuth(req, res, next) {
  if (req.session?.authenticated) return next();
  return res.status(401).json({ error: "Unauthorized" });
}
