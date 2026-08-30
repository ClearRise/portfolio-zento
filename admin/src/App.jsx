import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getContent, getMe, logout, saveContent } from "./api.js";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Works from "./pages/Works.jsx";
import Contact from "./pages/Contact.jsx";

function Shell({ content, setContent, onLogout }) {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      await saveContent(content);
      setStatus("Saved.");
    } catch (err) {
      setStatus(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="shell">
      <div className="topbar">
        <h1>Portfolio Admin</h1>
        <div className="actions">
          <button type="button" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save all"}
          </button>
          <button type="button" className="secondary" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
      <nav className="nav">
        <NavLink to="/" end>
          Profile
        </NavLink>
        <NavLink to="/works">Works</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <a href="/" target="_blank" rel="noreferrer">
          View site
        </a>
      </nav>
      {status && (
        <p className={`status ${status === "Saved." ? "ok" : "err"}`}>
          {status}
        </p>
      )}
      <Routes>
        <Route
          path="/"
          element={<Profile content={content} setContent={setContent} />}
        />
        <Route
          path="/works"
          element={<Works content={content} setContent={setContent} />}
        />
        <Route
          path="/contact"
          element={<Contact content={content} setContent={setContent} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await getMe();
        if (!alive) return;
        setAuth(me.authenticated);
        if (me.authenticated) {
          const data = await getContent();
          if (alive) setContent(data);
        }
      } catch (err) {
        if (alive) {
          setAuth(false);
          setError(err.message);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function handleLogin() {
    const data = await getContent();
    setContent(data);
    setAuth(true);
    navigate("/");
  }

  async function handleLogout() {
    await logout();
    setAuth(false);
    setContent(null);
  }

  if (auth === null) {
    return (
      <div className="login-wrap">
        <p>Loading…</p>
      </div>
    );
  }

  if (!auth) {
    return <Login onSuccess={handleLogin} />;
  }

  if (!content) {
    return (
      <div className="login-wrap">
        <p>{error || "Loading content…"}</p>
      </div>
    );
  }

  return (
    <Shell content={content} setContent={setContent} onLogout={handleLogout} />
  );
}
