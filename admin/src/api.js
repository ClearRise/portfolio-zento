async function request(url, options = {}) {
  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || res.statusText || "Request failed");
  }
  return data;
}

export function getMe() {
  return request("/api/me");
}

export function login(password) {
  return request("/api/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function logout() {
  return request("/api/logout", { method: "POST" });
}

export function getContent() {
  return request("/api/content");
}

export function saveContent(content) {
  return request("/api/content", {
    method: "PUT",
    body: JSON.stringify(content),
  });
}

export async function uploadFile(file, { folder = "", kind = "image" } = {}) {
  const form = new FormData();
  form.append("file", file);
  const qs = new URLSearchParams({ folder, kind });
  return request(`/api/upload?${qs}`, { method: "POST", body: form });
}

export function assetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.replace(/^\.\//, "/");
}
