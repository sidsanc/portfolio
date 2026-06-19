---
name: Cloudflare Pages SPA routing
description: Correct SPA fallback routing for this portfolio on Cloudflare Pages
---

Cloudflare Pages rejects `/* /index.html 200` in `_redirects` with "Infinite loop detected" because Pages strips `.html` extensions by default — `/index.html` → `/index` → matches `/*` → loops.

**Fix:** Empty the `_redirects` file and copy `index.html` to `404.html` after the Vite build. Cloudflare Pages automatically serves `404.html` for any unmatched route.

Build script in `artifacts/portfolio/package.json`:
```
"build": "vite build --config vite.config.ts && cp dist/public/index.html dist/public/404.html"
```

**Why:** Cloudflare Pages serves `404.html` as the fallback for unmatched routes (SPA mode). This is the officially supported alternative to the broken `_redirects` approach.

**How to apply:** This is already set up. If `_redirects` is ever re-added with the problematic rule, remove it or empty it.
