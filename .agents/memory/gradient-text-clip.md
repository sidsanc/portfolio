---
name: Gradient text in React inline styles
description: background-clip:text unreliable for dark gradient colors in React inline styles — causes solid color bar instead of text
---

## Rule
Never use `WebkitBackgroundClip: 'text'` + `WebkitTextFillColor: 'transparent'` with dark gradient colors (e.g. `#0f172a`, `#312e81`) in React inline styles in this Vite/mockup-sandbox context.

**Why:** When the gradient colors are dark and the clip fails, the browser renders the full-width background bar as a solid dark rectangle instead of clipping to letter shapes. Light gradient colors (cyan, lavender, pink) on dark backgrounds may appear to work only because the failure is less visible.

**How to apply:**
- Dark background → use bright/light gradient colors (`#7dd3fc`, `#a5b4fc`, `#e879f9`) → gradient text works reliably
- Light background → use **solid dark color** (`color: '#0f172a'`) — no gradient clip trick
- Always apply gradient text to a `<span>` (inline element) inside the block element, never directly on `<h2>`, `<div>`, etc.
- `display: 'inline'` on the span is correct; `display: 'inline-block'` does NOT reliably fix the clip failure for dark colors
