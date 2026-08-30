import { useState } from "react";
import { assetUrl, uploadFile } from "../api.js";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n) || full.length !== 6) return { r: 0, g: 0, b: 0 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function Works({ content, setContent }) {
  const works = content.works || [];
  const [editId, setEditId] = useState(works[0]?.id || null);
  const [msg, setMsg] = useState("");
  const work = works.find((w) => w.id === editId) || null;

  function updateWork(id, patch) {
    const next = structuredClone(content);
    next.works = next.works.map((w) => (w.id === id ? { ...w, ...patch } : w));
    setContent(next);
  }

  function move(id, dir) {
    const next = structuredClone(content);
    const idx = next.works.findIndex((w) => w.id === id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= next.works.length) return;
    [next.works[idx], next.works[j]] = [next.works[j], next.works[idx]];
    setContent(next);
  }

  function addWork() {
    const slug = `work${Date.now().toString(36)}`;
    const item = {
      id: slug,
      name: "New Project",
      project: slug,
      type: "web",
      desc: "",
      role: "Web Developer",
      year: new Date().getFullYear(),
      link: "",
      color1: "#cccccc",
      color1Rgb: hexToRgb("#cccccc"),
      color2: "#ffffff",
      color2Rgb: hexToRgb("#ffffff"),
      subColor: "#cccccc",
      preview: `./assets/image/${slug}/preview.webp`,
      homeMac: `./assets/image/${slug}/homeMac.webp`,
    };
    const next = structuredClone(content);
    next.works = [...next.works, item];
    setContent(next);
    setEditId(slug);
  }

  function removeWork(id) {
    if (!confirm("Remove this work?")) return;
    const next = structuredClone(content);
    next.works = next.works.filter((w) => w.id !== id);
    setContent(next);
    setEditId(next.works[0]?.id || null);
  }

  async function upload(kind, file) {
    if (!work || !file) return;
    setMsg("Uploading…");
    try {
      const { path } = await uploadFile(file, {
        folder: work.project,
        kind,
      });
      updateWork(work.id, { [kind]: path + "?t=" + Date.now() });
      setMsg("Image uploaded. Click Save all.");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <>
      <section className="panel">
        <h2>Works</h2>
        <p className="hint">
          Edit project text and images. New works need preview + Mac images for
          the 3D screen.
        </p>
        <div className="actions" style={{ marginTop: 0, marginBottom: "1rem" }}>
          <button type="button" onClick={addWork}>
            Add work
          </button>
        </div>
        <div className="work-list">
          {works.map((w, i) => (
            <div className="work-item" key={w.id}>
              <div>
                <strong>{w.name}</strong>
                <span>
                  {w.type} · {w.year}
                </span>
              </div>
              <div className="actions" style={{ marginTop: 0 }}>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => move(w.id, -1)}
                  disabled={i === 0}
                >
                  Up
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => move(w.id, 1)}
                  disabled={i === works.length - 1}
                >
                  Down
                </button>
                <button type="button" onClick={() => setEditId(w.id)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => removeWork(w.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {work && (
        <section className="panel">
          <h2>Edit: {work.name}</h2>
          <div className="row">
            <div className="field">
              <label>Name</label>
              <input
                value={work.name}
                onChange={(e) => updateWork(work.id, { name: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Slug (folder / texture key)</label>
              <input
                value={work.project}
                onChange={(e) => {
                  const project = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                  updateWork(work.id, {
                    project,
                    id: project || work.id,
                    preview: `./assets/image/${project}/preview.webp`,
                    homeMac: `./assets/image/${project}/homeMac.webp`,
                  });
                  setEditId(project || work.id);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>Type</label>
              <input
                value={work.type}
                onChange={(e) => updateWork(work.id, { type: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Year</label>
              <input
                type="number"
                value={work.year}
                onChange={(e) =>
                  updateWork(work.id, { year: Number(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <div className="field">
            <label>Link</label>
            <input
              value={work.link}
              onChange={(e) => updateWork(work.id, { link: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Role</label>
            <input
              value={work.role}
              onChange={(e) => updateWork(work.id, { role: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              value={work.desc}
              onChange={(e) => updateWork(work.id, { desc: e.target.value })}
              style={{ minHeight: 140 }}
            />
          </div>
          <div className="row">
            <div className="field">
              <label>Color 1</label>
              <input
                type="color"
                value={work.color1 || "#cccccc"}
                onChange={(e) =>
                  updateWork(work.id, {
                    color1: e.target.value,
                    color1Rgb: hexToRgb(e.target.value),
                  })
                }
              />
            </div>
            <div className="field">
              <label>Color 2</label>
              <input
                type="color"
                value={work.color2 || "#ffffff"}
                onChange={(e) =>
                  updateWork(work.id, {
                    color2: e.target.value,
                    color2Rgb: hexToRgb(e.target.value),
                  })
                }
              />
            </div>
            <div className="field">
              <label>Sub color</label>
              <input
                type="color"
                value={work.subColor || "#cccccc"}
                onChange={(e) =>
                  updateWork(work.id, { subColor: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label className="hint">Preview image</label>
              <div className="preview-row">
                {work.preview && (
                  <img
                    className="thumb wide"
                    src={assetUrl(work.preview.split("?")[0])}
                    alt=""
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    upload("preview", e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
            <div>
              <label className="hint">Mac screen image</label>
              <div className="preview-row">
                {work.homeMac && (
                  <img
                    className="thumb wide"
                    src={assetUrl(work.homeMac.split("?")[0])}
                    alt=""
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    upload("homeMac", e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </div>
          {msg && <p className="status ok">{msg}</p>}
        </section>
      )}
    </>
  );
}
