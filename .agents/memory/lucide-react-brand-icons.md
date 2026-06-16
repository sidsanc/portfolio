---
name: lucide-react brand icons barrel export
description: Github and other brand icons are not exported from the main lucide-react barrel — must import from individual file
---

## Rule
`import { Github } from 'lucide-react'` silently resolves to `undefined` — the icon renders nothing.

**Why:** Brand icons (Github, Figma, etc.) are deprecated in lucide-react and removed from the main barrel export, but still exist as individual ESM files.

**How to apply:**
```ts
// Wrong — silent undefined
import { Github } from 'lucide-react';

// Correct
import Github from 'lucide-react/dist/esm/icons/github';
```

Same pattern applies to other brand icons: Figma, Codepen, Dribbble, etc.
