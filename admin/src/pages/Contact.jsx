import { Field, TextInput, setPath } from "../lib/content.jsx";

export default function Contact({ content, setContent }) {
  const contact = content.contact || {};
  const socials = content.socials || {};
  const footer = content.footer || {};
  const form = content.contactForm || {};

  return (
    <>
      <section className="panel">
        <h2>Contact page hero</h2>
        <div className="row">
          <Field label="Headline 1">
            <TextInput
              value={contact.headline1}
              onChange={(e) =>
                setPath(content, setContent, "contact.headline1", e.target.value)
              }
            />
          </Field>
          <Field label="Headline 2">
            <TextInput
              value={contact.headline2}
              onChange={(e) =>
                setPath(content, setContent, "contact.headline2", e.target.value)
              }
            />
          </Field>
        </div>
        <Field label="Subcopy">
          <TextInput
            value={contact.subcopy}
            onChange={(e) =>
              setPath(content, setContent, "contact.subcopy", e.target.value)
            }
          />
        </Field>
      </section>

      <section className="panel">
        <h2>Contact details</h2>
        <div className="row">
          <Field label="Email">
            <TextInput
              value={contact.email}
              onChange={(e) =>
                setPath(content, setContent, "contact.email", e.target.value)
              }
            />
          </Field>
          <Field label="Phone">
            <TextInput
              value={contact.phone}
              onChange={(e) =>
                setPath(content, setContent, "contact.phone", e.target.value)
              }
            />
          </Field>
        </div>
        <div className="row">
          <Field label="Location label">
            <TextInput
              value={contact.location}
              onChange={(e) =>
                setPath(content, setContent, "contact.location", e.target.value)
              }
            />
          </Field>
          <Field label="Coordinates">
            <TextInput
              value={contact.coordinates}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contact.coordinates",
                  e.target.value,
                )
              }
            />
          </Field>
        </div>
        <Field label="Availability status">
          <TextInput
            value={contact.status}
            onChange={(e) =>
              setPath(content, setContent, "contact.status", e.target.value)
            }
          />
        </Field>
        <Field
          label="Email subject (nav mail link)"
          hint="Used when opening email from the menu icon."
        >
          <TextInput
            value={contact.mailSubject}
            onChange={(e) =>
              setPath(content, setContent, "contact.mailSubject", e.target.value)
            }
          />
        </Field>
      </section>

      <section className="panel">
        <h2>Contact form</h2>
        <Field label="Heading 1">
          <TextInput
            value={form.heading1}
            onChange={(e) =>
              setPath(content, setContent, "contactForm.heading1", e.target.value)
            }
          />
        </Field>
        <Field label="Heading 2">
          <TextInput
            value={form.heading2}
            onChange={(e) =>
              setPath(content, setContent, "contactForm.heading2", e.target.value)
            }
          />
        </Field>
        <div className="row">
          <Field label="Name placeholder">
            <TextInput
              value={form.placeholderName}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.placeholderName",
                  e.target.value,
                )
              }
            />
          </Field>
          <Field label="Company placeholder">
            <TextInput
              value={form.placeholderCompany}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.placeholderCompany",
                  e.target.value,
                )
              }
            />
          </Field>
        </div>
        <div className="row">
          <Field label="Email placeholder">
            <TextInput
              value={form.placeholderEmail}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.placeholderEmail",
                  e.target.value,
                )
              }
            />
          </Field>
          <Field label="Phone placeholder">
            <TextInput
              value={form.placeholderPhone}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.placeholderPhone",
                  e.target.value,
                )
              }
            />
          </Field>
        </div>
        <Field label="Message placeholder">
          <TextInput
            value={form.placeholderMessage}
            onChange={(e) =>
              setPath(
                content,
                setContent,
                "contactForm.placeholderMessage",
                e.target.value,
              )
            }
          />
        </Field>
        <Field label="Submit button">
          <TextInput
            value={form.submitLabel}
            onChange={(e) =>
              setPath(
                content,
                setContent,
                "contactForm.submitLabel",
                e.target.value,
              )
            }
          />
        </Field>
        <Field label="Success message">
          <TextInput
            value={form.successMessage}
            onChange={(e) =>
              setPath(
                content,
                setContent,
                "contactForm.successMessage",
                e.target.value,
              )
            }
          />
        </Field>
        <Field label="Error message">
          <TextInput
            value={form.errorMessage}
            onChange={(e) =>
              setPath(
                content,
                setContent,
                "contactForm.errorMessage",
                e.target.value,
              )
            }
          />
        </Field>
        <div className="row">
          <Field label="Invalid email message">
            <TextInput
              value={form.invalidEmail}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.invalidEmail",
                  e.target.value,
                )
              }
            />
          </Field>
          <Field label="Invalid phone message">
            <TextInput
              value={form.invalidPhone}
              onChange={(e) =>
                setPath(
                  content,
                  setContent,
                  "contactForm.invalidPhone",
                  e.target.value,
                )
              }
            />
          </Field>
        </div>
      </section>

      <section className="panel">
        <h2>Social links</h2>
        <Field label="Lancers">
          <TextInput
            value={socials.twitter}
            placeholder="https://www.lancers.jp/profile/..."
            onChange={(e) =>
              setPath(content, setContent, "socials.twitter", e.target.value)
            }
          />
        </Field>
        <Field label="LinkedIn">
          <TextInput
            value={socials.linkedin}
            onChange={(e) =>
              setPath(content, setContent, "socials.linkedin", e.target.value)
            }
          />
        </Field>
        <Field label="GitHub">
          <TextInput
            value={socials.github}
            onChange={(e) =>
              setPath(content, setContent, "socials.github", e.target.value)
            }
          />
        </Field>
        <Field label="Email link (mailto:…)">
          <TextInput
            value={socials.email}
            onChange={(e) =>
              setPath(content, setContent, "socials.email", e.target.value)
            }
          />
        </Field>
        <Field label="Chatwork URL" hint="Menu sidebar Chatwork icon.">
          <TextInput
            value={socials.chatwork}
            placeholder="https://..."
            onChange={(e) =>
              setPath(content, setContent, "socials.chatwork", e.target.value)
            }
          />
        </Field>
      </section>

      <section className="panel">
        <h2>Footer</h2>
        <Field label="Slogan">
          <TextInput
            value={footer.slogan}
            onChange={(e) =>
              setPath(content, setContent, "footer.slogan", e.target.value)
            }
          />
        </Field>
        <Field label="Brand">
          <TextInput
            value={footer.brand}
            onChange={(e) =>
              setPath(content, setContent, "footer.brand", e.target.value)
            }
          />
        </Field>
        <Field label="Copyright">
          <TextInput
            value={footer.copyright}
            onChange={(e) =>
              setPath(content, setContent, "footer.copyright", e.target.value)
            }
          />
        </Field>
      </section>
    </>
  );
}
