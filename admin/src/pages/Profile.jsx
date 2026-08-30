import { useState } from "react";
import { assetUrl, uploadFile } from "../api.js";

function setPath(content, setContent, path, value) {
  const next = structuredClone(content);
  const keys = path.split(".");
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  setContent(next);
}

export default function Profile({ content, setContent }) {
  const [msg, setMsg] = useState("");
  const site = content.site || {};
  const profile = content.profile || {};
  const marquee = content.marquee || [];

  async function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMsg("Uploading…");
    try {
      const { path } = await uploadFile(file, { kind: "profile" });
      setPath(content, setContent, "profile.photo", path + "?t=" + Date.now());
      setMsg("Photo uploaded. Click Save all.");
    } catch (err) {
      setMsg(err.message);
    } finally {
      e.target.value = "";
    }
  }

  return (
    <>
      <section className="panel">
        <h2>Site</h2>
        <div className="row">
          <div className="field">
            <label>Brand</label>
            <input
              value={site.brand || ""}
              onChange={(e) =>
                setPath(content, setContent, "site.brand", e.target.value)
              }
            />
          </div>
          <div className="field">
            <label>Brand short</label>
            <input
              value={site.brandShort || ""}
              onChange={(e) =>
                setPath(content, setContent, "site.brandShort", e.target.value)
              }
            />
          </div>
        </div>
        <div className="field">
          <label>Main title</label>
          <input
            value={site.title || ""}
            onChange={(e) =>
              setPath(content, setContent, "site.title", e.target.value)
            }
          />
        </div>
        <div className="row">
          <div className="field">
            <label>Mobile title line 1</label>
            <input
              value={site.titleMobile1 || ""}
              onChange={(e) =>
                setPath(content, setContent, "site.titleMobile1", e.target.value)
              }
            />
          </div>
          <div className="field">
            <label>Mobile title line 2</label>
            <input
              value={site.titleMobile2 || ""}
              onChange={(e) =>
                setPath(content, setContent, "site.titleMobile2", e.target.value)
              }
            />
          </div>
        </div>
        <div className="field">
          <label>Subtitle</label>
          <input
            value={site.subtitle || ""}
            onChange={(e) =>
              setPath(content, setContent, "site.subtitle", e.target.value)
            }
          />
        </div>
      </section>

      <section className="panel">
        <h2>Profile</h2>
        <div className="preview-row" style={{ marginBottom: "1rem" }}>
          {profile.photo && (
            <img
              className="thumb"
              src={assetUrl(profile.photo.split("?")[0])}
              alt="Profile"
            />
          )}
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Profile photo</label>
            <input type="file" accept="image/*" onChange={onPhoto} />
          </div>
        </div>
        <div className="field">
          <label>About</label>
          <textarea
            value={profile.about || ""}
            onChange={(e) =>
              setPath(content, setContent, "profile.about", e.target.value)
            }
            style={{ minHeight: 180 }}
          />
        </div>
        {msg && <p className="status ok">{msg}</p>}
      </section>

      <section className="panel">
        <h2>Marquee</h2>
        <p className="hint">One phrase per line.</p>
        <div className="field">
          <label>Phrases</label>
          <textarea
            value={marquee.join("\n")}
            onChange={(e) => {
              const next = structuredClone(content);
              next.marquee = e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
              setContent(next);
            }}
          />
        </div>
      </section>

      <section className="panel">
        <h2>Home contact block</h2>
        <div className="field">
          <label>Title</label>
          <input
            value={content.homeContact?.title || ""}
            onChange={(e) =>
              setPath(content, setContent, "homeContact.title", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>Paragraph</label>
          <textarea
            value={content.homeContact?.paragraph || ""}
            onChange={(e) =>
              setPath(
                content,
                setContent,
                "homeContact.paragraph",
                e.target.value,
              )
            }
          />
        </div>
        <div className="field">
          <label>Button label</label>
          <input
            value={content.homeContact?.button || ""}
            onChange={(e) =>
              setPath(content, setContent, "homeContact.button", e.target.value)
            }
          />
        </div>
      </section>
    </>
  );
}
