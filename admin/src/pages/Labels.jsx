import { Field, TextInput, setPath } from "../lib/content.jsx";

function UiFields({ content, setContent, fields }) {
  const ui = content.ui || {};
  return fields.map(({ key, label, hint }) => (
    <Field key={key} label={label} hint={hint}>
      <TextInput
        value={ui[key]}
        onChange={(e) => setPath(content, setContent, `ui.${key}`, e.target.value)}
      />
    </Field>
  ));
}

export default function Labels({ content, setContent }) {
  return (
    <>
      <section className="panel">
        <h2>Navigation</h2>
        <UiFields
          content={content}
          setContent={setContent}
          fields={[
            { key: "menu", label: "Menu button" },
            { key: "back", label: "Back button" },
            { key: "home", label: "Home" },
            { key: "work", label: "Work" },
            { key: "contact", label: "Contact" },
          ]}
        />
      </section>

      <section className="panel">
        <h2>Home & work sections</h2>
        <UiFields
          content={content}
          setContent={setContent}
          fields={[
            { key: "recentWork", label: "Recent work heading" },
            { key: "clickDetail", label: "Mac screen hint" },
            { key: "workIntro", label: "Work detail intro label" },
            { key: "role", label: "Role label" },
            { key: "year", label: "Year label" },
            { key: "exploreSite", label: "Explore site button" },
            { key: "discoverMore", label: "Discover more text" },
          ]}
        />
      </section>

      <section className="panel">
        <h2>Nav panel & status</h2>
        <UiFields
          content={content}
          setContent={setContent}
          fields={[
            { key: "remoteFrom", label: "Remote from label" },
            { key: "locationShort", label: "Location value" },
            { key: "localTime", label: "Local time label" },
            { key: "currentStatus", label: "Status label" },
            { key: "preloaderRole", label: "Preloader role text" },
          ]}
        />
      </section>

      <section className="panel">
        <h2>Social link labels</h2>
        <UiFields
          content={content}
          setContent={setContent}
          fields={[
            { key: "twitter", label: "Lancers label" },
            { key: "linkedin", label: "LinkedIn label" },
            { key: "github", label: "GitHub label" },
            { key: "email", label: "Email label" },
          ]}
        />
      </section>

      <section className="panel">
        <h2>Page meta (browser title & SEO)</h2>
        <UiFields
          content={content}
          setContent={setContent}
          fields={[
            { key: "workMetaTitle", label: "Work page title" },
            { key: "workMetaName", label: "Work page meta name" },
            {
              key: "workMetaDescription",
              label: "Work page meta description",
            },
            { key: "contactMetaTitle", label: "Contact page title" },
            { key: "contactMetaName", label: "Contact page meta name" },
            {
              key: "contactMetaDescription",
              label: "Contact page meta description",
            },
          ]}
        />
      </section>
    </>
  );
}
