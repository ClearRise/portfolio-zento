export function setPath(content, setContent, path, value) {
  const next = structuredClone(content);
  const keys = path.split(".");
  let cur = next;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  setContent(next);
}

export function Field({ label, hint, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {hint && <p className="hint" style={{ margin: "0 0 0.35rem" }}>{hint}</p>}
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value || ""}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
