---
name: Workers API porting decisions
description: Key decisions when rewriting Express API as Cloudflare Worker with Hono — driver choices, SSE pattern, caching.
---

# Workers API — Porting decisions

## Rules

**Use `drizzle-orm/neon-http` (not `neon-serverless` WebSocket variant).**
The HTTP driver uses `fetch` only, works in Workers without any special WebSocket setup.
**Why:** `@workspace/db` uses `pg` (node-postgres TCP sockets) which cannot run in Workers. The neon-http driver is the minimal-friction replacement.
**How to apply:** `import { neon } from "@neondatabase/serverless"; import { drizzle } from "drizzle-orm/neon-http";`

**Inline the Drizzle schema in the workers package.**
Cannot import `@workspace/db` in Workers because it imports `pg`.
**Why:** `pg` uses Node.js `net` module which is absent in Workers runtime even with `nodejs_compat`.
**How to apply:** Copy only the schema table definitions into `src/lib/schema.ts`; no `drizzle-zod`, no `insertSchema`.

**Use `btoa()` not `Buffer.from(...).toString("base64")` for Spotify auth header.**
`btoa` is a Workers global; `Buffer` is Node-only even with `nodejs_compat` in some edge cases.
**Why:** Guards against runtime errors on token refresh.

**SSE streaming pattern in Workers:**
```typescript
const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
const writer = writable.getWriter();
const encoder = new TextEncoder();
// fire-and-forget IIFE streams chunks; return new Response(readable, {...})
```
**Why:** Express `res.write` / `res.end` do not exist in Workers. TransformStream + ReadableStream is the idiomatic Workers SSE approach.

**One KV namespace (`KV`) with key prefixes covers all caching needs:**
- `spotify:token` → Spotify OAuth access token
- `blog:posts` → Hashnode post list (5-min TTL)
- `ratelimit:{ip}:{minute}` → per-IP rate limit counter (2-min TTL)

**Rate limiting uses `CF-Connecting-IP` header (always present in Workers).**
In Express the IP came from `req.ip`; in Workers use `c.req.header("CF-Connecting-IP")`.

**`wrangler.toml` requires `compatibility_flags = ["nodejs_compat"]`**
Needed for `crypto.randomUUID()`, `TextEncoder`, and the OpenAI SDK's internal use of Node APIs.
