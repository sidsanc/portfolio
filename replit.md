# Siddhant Sancheti — Personal Portfolio

## Architecture

This is a full-stack pnpm monorepo with a React + Vite frontend and an Express API server.

### Artifacts
- **`artifacts/portfolio`** — React + Vite frontend (serves at `/`)
- **`artifacts/api-server`** — Express API server (serves at `/api`)

### Shared Libraries
- **`lib/db`** — Drizzle ORM + PostgreSQL schema (conversations, messages tables)
- **`lib/api-spec`** — OpenAPI spec (`openapi.yaml`) + codegen config
- **`lib/api-client-react`** — Generated React Query hooks (from codegen)
- **`lib/api-zod`** — Generated Zod validation schemas (from codegen)
- **`lib/integrations-openai-ai-server`** — OpenAI SDK server client (via Replit AI Integrations proxy)
- **`lib/integrations-openai-ai-react`** — OpenAI React audio hooks

## Portfolio Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Animated hero with name reveal, CTA buttons |
| `/about` | About | Bio, stats, education, interests |
| `/skills` | Skills | Technical skills grouped by category with neomorphic badges |
| `/experience` | Experience | Timeline of all work experience with details |
| `/projects` | Projects | Project cards (Hive, Lane Detection, Smart Image Store, GrantAide) |
| `/blog` | Blog | Links to Hashnode blog (hashnode.com/@sidsanc) |
| `/chat` | AI Chat | Real GPT-powered chatbot with RAG over resume data |
| `/contact` | Contact | Social links grid (GitHub, LinkedIn, Instagram, Hashnode, email) |

## Features

- **Neomorphism UI** — Soft extruded surfaces, inner/outer shadows (`.neo-card`, `.neo-inset`, `.neo-btn`)
- **Dark/Light mode** — `next-themes` with toggle button in navbar
- **Command Bar** — Cmd+K palette with navigation + social links (using `cmdk`)
- **AI Chat Agent** — Real streaming SSE chat powered by OpenAI GPT, trained on Siddhant's resume
- **Framer Motion** — Page transitions, staggered animations, scroll-triggered reveals

## AI Chat Backend

- `POST /api/openai/conversations` — creates a new conversation (returns `{ id, createdAt }`)
- `POST /api/openai/conversations/:id/messages` — streams GPT response via SSE
- `GET /api/openai/conversations/:id/messages` — fetches conversation history

The system prompt in `artifacts/api-server/src/routes/openai/index.ts` contains Siddhant's full resume data for RAG-style responses.

## Design System

- **Base color (light)**: `hsl(220, 20%, 93%)` — soft blue-grey
- **Base color (dark)**: `hsl(225, 20%, 13%)` — deep midnight blue
- **Primary accent**: `hsl(217, 91%, 60%)` — electric blue
- **Secondary accent**: `hsl(258, 90%, 66%)` — purple
- **Font**: Inter (sans-serif)

## Social Links

- Email: siddhantsanchetik@gmail.com
- GitHub: https://github.com/sidsanc
- LinkedIn: https://www.linkedin.com/in/siddhant-sancheti/
- Instagram: https://www.instagram.com/sid_sanc4998_/
- Blog: https://hashnode.com/@sidsanc

## Spotify Integration (PENDING)

Spotify OAuth connector (`connector:ccfg_spotify_01K49R1M6S088SR66BS9A0V4R7`) was proposed but dismissed.
To enable the now-playing widget and playlists, Siddhant must either:
1. Complete the Spotify OAuth flow via Replit Integrations panel, OR
2. Provide `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` as secrets

The now-playing widget is rendered as a placeholder on the home page until Spotify is connected.

## OpenAI Client — Dual Mode

`lib/integrations-openai-ai-server/src/client.ts` supports two modes automatically:
- **Replit**: set `AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY` → uses `gpt-5.1` via Replit proxy
- **External hosting**: set `OPENAI_API_KEY` → uses `gpt-4o` via direct OpenAI API
- Override model with `OPENAI_MODEL` env var on either platform

## External Free Deployment (Vercel + Render + Neon)

To host for free indefinitely:
1. **Push to GitHub** — authorize GitHub connector in Replit Integrations
2. **Frontend → Vercel** (free, no expiry): connect GitHub repo, set `VITE_API_URL` to Render URL
3. **API server → Render** (free tier, sleeps after 15min inactivity): set `OPENAI_API_KEY`, `DATABASE_URL` (from Neon), `SESSION_SECRET`
4. **Database → Neon** (free PostgreSQL, no expiry): copy connection string to Render env vars

## Environment Variables

- `AI_INTEGRATIONS_OPENAI_BASE_URL` — Replit AI Integrations proxy URL (Replit only)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — Replit AI Integrations API key (Replit only)
- `OPENAI_API_KEY` — Direct OpenAI key (external hosting)
- `OPENAI_MODEL` — Override model (optional, defaults to gpt-5.1 on Replit / gpt-4o external)
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — Session secret

## Codegen

After any OpenAPI spec changes:
```bash
pnpm --filter @workspace/api-spec run codegen
pnpm --filter @workspace/db run push
```
