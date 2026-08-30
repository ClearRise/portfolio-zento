import "dotenv/config";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { ADMIN_DIST, PUBLIC_DIR } from "./auth.js";
import contentRouter from "./routes/content.js";
import uploadRouter from "./routes/upload.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

app.use(
  cors({
    origin: isProd ? false : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(
  session({
    name: "port_admin",
    secret: process.env.SESSION_SECRET || "dev-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

app.post("/api/login", (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  req.session.authenticated = true;
  res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("port_admin");
    res.json({ ok: true });
  });
});

app.get("/api/me", (req, res) => {
  res.json({ authenticated: Boolean(req.session?.authenticated) });
});

app.use("/api/content", contentRouter);
app.use("/api/upload", uploadRouter);

app.use(express.static(PUBLIC_DIR));

if (fs.existsSync(ADMIN_DIST)) {
  app.use("/admin", express.static(ADMIN_DIST));
  app.get(/^\/admin(\/.*)?$/, (_req, res) => {
    res.sendFile(path.join(ADMIN_DIST, "index.html"));
  });
} else {
  app.get("/admin", (_req, res) => {
    res
      .status(503)
      .send(
        "Admin not built yet. Run `npm run build` or start the Vite admin with `npm run dev:admin`.",
      );
  });
}

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/admin")) {
    return next();
  }
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio server http://localhost:${PORT}`);
  console.log(`Admin (prod build) http://localhost:${PORT}/admin`);
  if (!isProd) {
    console.log(`Admin (dev)        http://localhost:5173`);
  }
});
