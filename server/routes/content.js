import { Router } from "express";
import fs from "fs/promises";
import { DATA_PATH, requireAuth } from "../auth.js";

const router = Router();

async function readContent() {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeContent(data) {
  const cleaned = JSON.parse(
    JSON.stringify(data, (_key, value) =>
      typeof value === "string" && value.includes("./assets/")
        ? value.split("?")[0]
        : value,
    ),
  );
  await fs.writeFile(DATA_PATH, JSON.stringify(cleaned, null, 2), "utf8");
}

router.get("/", async (_req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read content" });
  }
});

router.put("/", requireAuth, async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid content body" });
    }
    await writeContent(req.body);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save content" });
  }
});

export default router;
export { readContent };
