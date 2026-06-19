# Deployment Guide

## Stack

| Layer    | Service                     | URL pattern         |
|----------|-----------------------------|---------------------|
| Frontend | Cloudflare Pages            | `siddhantsancheti.com` |
| API      | Cloudflare Workers (Hono)   | `portfolio-api.*.workers.dev/api/*` |
| Database | Neon PostgreSQL             | (connection string secret) |

---

## Part 1 — Cloudflare Workers API (`artifacts/workers-api`)

### Prerequisites

```bash
npm install -g wrangler
wrangler login          # opens browser OAuth flow
```

### 1. Create a KV namespace

The Worker uses one KV namespace for Spotify token caching, blog post caching, and rate limiting.

```bash
cd artifacts/workers-api

wrangler kv namespace create "KV"
# ↑ prints:  id = "abc123..."
wrangler kv namespace create "KV" --preview
# ↑ prints:  preview_id = "def456..."
```

Edit `wrangler.toml` and replace the placeholder IDs:

```toml
[[kv_namespaces]]
binding = "KV"
id = "abc123..."           # from above
preview_id = "def456..."   # from above
```

### 2. Set secrets

```bash
wrangler secret put DATABASE_URL
# paste: postgresql://user:password@host/dbname?sslmode=require

wrangler secret put OPENAI_API_KEY
# paste your OpenAI API key

wrangler secret put SPOTIFY_CLIENT_ID
wrangler secret put SPOTIFY_CLIENT_SECRET
wrangler secret put SPOTIFY_REFRESH_TOKEN

# Optional — only needed if you have a Hashnode Pro token:
wrangler secret put HASHNODE_TOKEN
```

### 3. (Optional) Update ALLOWED_ORIGIN

Edit `wrangler.toml` `[vars]` section if your Pages URL differs:

```toml
[vars]
ALLOWED_ORIGIN = "https://siddhantsancheti.com"
```

### 4. Deploy

```bash
wrangler deploy
```

The Worker is now live at `https://portfolio-api.<your-subdomain>.workers.dev`.

Note the Worker URL — you'll need it for the frontend env var.

### 5. Local development

```bash
wrangler dev
```

Creates a local server at `http://localhost:8787`. Secrets are read from `.dev.vars`:

```bash
# artifacts/workers-api/.dev.vars  (gitignored — never commit)
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

---

## Part 2 — Cloudflare Pages Frontend (`artifacts/portfolio`)

### 1. Connect GitHub repository

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. **Create a project → Connect to Git**
3. Select the `portfolio` repository
4. Configure build settings:

| Setting            | Value                                    |
|--------------------|------------------------------------------|
| Framework preset   | Vite                                     |
| Build command      | `pnpm --filter @workspace/portfolio run build` |
| Build output dir   | `artifacts/portfolio/dist/public`        |
| Root directory     | *(leave blank — monorepo root)*          |

### 2. Set environment variables (Pages → Settings → Environment variables)

| Variable       | Value                                                   |
|----------------|---------------------------------------------------------|
| `VITE_API_URL` | `https://portfolio-api.<subdomain>.workers.dev` (your Worker URL) |

### 3. Deploy

Cloudflare Pages automatically deploys on every push to `main`.

### 4. Custom domain

In Pages → Custom domains, add `siddhantsancheti.com` and follow the DNS instructions.

---

## Replit (local dev — unchanged)

The original Express API (`artifacts/api-server`) continues to run on Replit for local development. No changes needed.

```
Portfolio preview → http://localhost:PORT (via Vite)
API              → /api/* (via Replit proxy → Express)
```

---

## Route reference

| Method | Path                                     | Description                |
|--------|------------------------------------------|----------------------------|
| GET    | `/api/healthz`                           | Health check               |
| GET    | `/api/blog/posts`                        | Hashnode posts (KV-cached) |
| GET    | `/api/spotify/now-playing`               | Now playing / recent track |
| POST   | `/api/openai/conversations`              | Create conversation        |
| GET    | `/api/openai/conversations/:id/messages` | Get message history        |
| POST   | `/api/openai/conversations/:id/messages` | Send message (SSE stream)  |
