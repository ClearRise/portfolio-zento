import { useState } from "react";
import { assetUrl, uploadFile } from "../api.js";
import { Field, TextInput, setPath } from "../lib/content.jsx";

export default function Profile({ content, setContent }) {
  const [msg, setMsg] = useState("");
  const site = content.site || {};
  const profile = content.profile || {};
  const preloader = content.preloader || {};
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
          <Field label="Brand (header)">
            <TextInput
              value={site.brand}
              onChange={(e) =>
                setPath(content, setContent, "site.brand", e.target.value)
              }
            />
          </Field>
          <Field label="Brand short (footer logo)">
            <TextInput
              value={site.brandShort}
              onChange={(e) =>
                setPath(content, setContent, "site.brandShort", e.target.value)
              }
            />
          </Field>
        </div>
        <Field label="Main title">
          <TextInput
            value={site.title}
            onChange={(e) =>
              setPath(content, setContent, "site.title", e.target.value)
            }
          />
        </Field>
        <div className="row">
          <Field label="Mobile title line 1">
            <TextInput
              value={site.titleMobile1}
              onChange={(e) =>
                setPath(content, setContent, "site.titleMobile1", e.target.value)
              }
            />
          </Field>
          <Field label="Mobile title line 2">
            <TextInput
              value={site.titleMobile2}
              onChange={(e) =>
                setPath(content, setContent, "site.titleMobile2", e.target.value)
              }
            />
          </Field>
        </div>
        <Field label="Subtitle">
          <TextInput
            value={site.subtitle}
            onChange={(e) =>
              setPath(content, setContent, "site.subtitle", e.target.value)
            }
          />
        </Field>
      </section>

      <section className="panel">
        <h2>SEO (home page)</h2>
        <Field label="Browser title">
          <TextInput
            value={site.metaTitle}
            onChange={(e) =>
              setPath(content, setContent, "site.metaTitle", e.target.value)
            }
          />
        </Field>
        <Field label="Meta name">
          <TextInput
            value={site.metaName}
            onChange={(e) =>
              setPath(content, setContent, "site.metaName", e.target.value)
            }
          />
        </Field>
        <Field label="Meta description">
          <textarea
            value={site.metaDescription || ""}
            onChange={(e) =>
              setPath(content, setContent, "site.metaDescription", e.target.value)
            }
            style={{ minHeight: 80 }}
          />
        </Field>
      </section>

      <section className="panel">
        <h2>Preloader (splash screen)</h2>
        <Field label="Brand name" hint="Shown on the left during loading.">
          <TextInput
            value={preloader.brandName}
            onChange={(e) =>
              setPath(content, setContent, "preloader.brandName", e.target.value)
            }
          />
        </Field>
        <p className="hint">Role text is under Labels → Nav panel & status.</p>
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
          <Field label="Profile photo">
            <input type="file" accept="image/*" onChange={onPhoto} />
          </Field>
        </div>
        <Field label="About">
          <textarea
            value={profile.about || ""}
            onChange={(e) =>
              setPath(content, setContent, "profile.about", e.target.value)
            }
            style={{ minHeight: 180 }}
          />
        </Field>
        {msg && <p className="status ok">{msg}</p>}
      </section>

      <section className="panel">
        <h2>Marquee</h2>
        <p className="hint">One phrase per line.</p>
        <Field label="Phrases">
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
        </Field>
      </section>

      <section className="panel">
        <h2>Home contact block</h2>
        <Field label="Title">
          <TextInput
            value={content.homeContact?.title}
            onChange={(e) =>
              setPath(content, setContent, "homeContact.title", e.target.value)
            }
          />
        </Field>
        <Field label="Paragraph">
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
        </Field>
        <Field label="Button label">
          <TextInput
            value={content.homeContact?.button}
            onChange={(e) =>
              setPath(content, setContent, "homeContact.button", e.target.value)
            }
          />
        </Field>
      </section>
    </>
  );
}
