# Portfolio + CMS

React/Three.js portfolio with a Node JSON CMS and minimal admin.

## Structure

- `public/` — portfolio site (styles & WebGL bundle unchanged)
- `data/content.json` — editable content
- `server/` — Express API + static hosting
- `admin/` — Vite React admin at `/admin`

## Setup

```bash
npm run install:all
```

Copy `.env.example` to `.env` and set `ADMIN_PASSWORD`.

## Develop

```bash
# terminal 1 — API + portfolio
npm run dev

# terminal 2 — admin UI (http://localhost:5173/admin/)
npm run dev:admin
```

Portfolio: http://localhost:3000  
Admin: http://localhost:5173/admin/ (proxies API to :3000)

## Production

```bash
npm run build
npm start
```

Then open http://localhost:3000 and http://localhost:3000/admin

Default admin password (change in `.env`): `admin123`
