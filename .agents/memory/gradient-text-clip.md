---
name: Gradient text in React inline styles
description: background-clip:text unreliable via React inline style objects — use injected <style> tag with real CSS strings instead
---

## Rule
Never rely on `WebkitBackgroundClip: 'text'` + `WebkitTextFillColor: 'transparent'` in React camelCase inline style objects. Use a `<style>` tag with raw CSS strings instead.

**Why:** React's inline style system doesn't always emit `-webkit-background-clip` and `-webkit-text-fill-color` in the correct paint order. When it fails, the browser renders a solid gradient rectangle instead of clipping to the letter shapes. This is environment-specific (Vite/canvas iframe) and affects dark gradient colors most visibly.

**How to apply:**
```tsx
// At module level — actual CSS string
const GRADIENT_CSS = `
  .my-gradient-text {
    background: linear-gradient(135deg, #1d4ed8, #7c3aed, #be185d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// In component render — inject the style tag
export function MyComponent() {
  return (
    <>
      <style>{GRADIENT_CSS}</style>
      {/* ... */}
      <span className="my-gradient-text">Name here</span>
    </>
  );
}
```

**Gradient color choice for contrast:**
- Dark background → use light/pastel gradient colors (e.g. cyan `#7dd3fc`, lavender `#a5b4fc`, pink `#e879f9`)
- Light background → use vivid mid-range colors (e.g. blue-700 `#1d4ed8`, violet-700 `#7c3aed`, pink-800 `#be185d`)
- Avoid near-identical dark shades (e.g. `#0f172a → #312e81`) — gradient transition is invisible at that luminosity range
