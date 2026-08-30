function setPath(content, setContent, path, value) {
  const next = structuredClone(content);
  const keys = path.split(".");
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  setContent(next);
}

export default function Contact({ content, setContent }) {
  const contact = content.contact || {};
  const socials = content.socials || {};
  const footer = content.footer || {};

  return (
    <>
      <section className="panel">
        <h2>Contact page</h2>
        <div className="row">
          <div className="field">
            <label>Headline 1</label>
            <input
              value={contact.headline1 || ""}
              onChange={(e) =>
                setPath(content, setContent, "contact.headline1", e.target.value)
              }
            />
          </div>
          <div className="field">
            <label>Headline 2</label>
            <input
              value={contact.headline2 || ""}
              onChange={(e) =>
                setPath(content, setContent, "contact.headline2", e.target.value)
              }
            />
          </div>
        </div>
        <div className="field">
          <label>Subcopy</label>
          <input
            value={contact.subcopy || ""}
            onChange={(e) =>
              setPath(content, setContent, "contact.subcopy", e.target.value)
            }
          />
        </div>
        <div className="row">
          <div className="field">
            <label>Email</label>
            <input
              value={contact.email || ""}
              onChange={(e) =>
                setPath(content, setContent, "contact.email", e.target.value)
              }
            />
          </div>
          <div className="field">
            <label>Phone</label>
            <input
              value={contact.phone || ""}
              onChange={(e) =>
                setPath(content, setContent, "contact.phone", e.target.value)
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>Location</label>
            <input
              value={contact.location || ""}
              onChange={(e) =>
                setPath(content, setContent, "contact.location", e.target.value)
              }
            />
          </div>
          <div className="field">
            <label>Coordinates</label>
            <input
              value={contact.coordinates || ""}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contact.coordinates",
                  e.target.value,
                )
              }
            />
          </div>
        </div>
        <div className="field">
          <label>Status</label>
          <input
            value={contact.status || ""}
            onChange={(e) =>
              setPath(content, setContent, "contact.status", e.target.value)
            }
          />
        </div>
      </section>

      <section className="panel">
        <h2>Social links</h2>
        <div className="field">
          <label>Twitter / X</label>
          <input
            value={socials.twitter || ""}
            onChange={(e) =>
              setPath(content, setContent, "socials.twitter", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>LinkedIn</label>
          <input
            value={socials.linkedin || ""}
            onChange={(e) =>
              setPath(content, setContent, "socials.linkedin", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>GitHub</label>
          <input
            value={socials.github || ""}
            onChange={(e) =>
              setPath(content, setContent, "socials.github", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>Email link (mailto:…)</label>
          <input
            value={socials.email || ""}
            onChange={(e) =>
              setPath(content, setContent, "socials.email", e.target.value)
            }
          />
        </div>
      </section>

      <section className="panel">
        <h2>Footer</h2>
        <div className="field">
          <label>Slogan</label>
          <input
            value={footer.slogan || ""}
            onChange={(e) =>
              setPath(content, setContent, "footer.slogan", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>Brand</label>
          <input
            value={footer.brand || ""}
            onChange={(e) =>
              setPath(content, setContent, "footer.brand", e.target.value)
            }
          />
        </div>
        <div className="field">
          <label>Copyright</label>
          <input
            value={footer.copyright || ""}
            onChange={(e) =>
              setPath(content, setContent, "footer.copyright", e.target.value)
            }
          />
        </div>
      </section>
    </>
  );
}
