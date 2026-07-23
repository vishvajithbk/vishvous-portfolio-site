# Vishvous

Vishvous is a minimal personal index built with React, TypeScript, the Next-style
App Router provided by Vinext, and CSS. It is designed for fast, public,
read-only content with Light and Dark appearances.

## Development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

## Structure

- `app/layout.tsx` owns document metadata, the early appearance script, and the
  shared header.
- `app/site-config.ts` is the single source for site identity, navigation,
  appearance options, and the browser-storage key.
- `app/globals.css` contains the design tokens, appearance palettes, global
  interaction states, accessibility helpers, and shared header styles.
- Each route lives in `app/<route>/page.tsx`.
- Route-specific components, content, and CSS modules stay beside their route.
  Posts and People are the current examples: their gallery/timeline components,
  typed content files, and CSS modules are intentionally co-located.
- `worker/index.ts`, `vite.config.ts`, `build/`, and `.openai/hosting.json` are
  hosting infrastructure; keep them separate from product UI.

## Rules for future changes

1. Use the tokens in `app/globals.css` before adding new visual values. Keep
   page-specific layout rules in CSS modules.
2. Put growing editorial content in typed data files beside its route; keep
   rendering components focused on presentation.
3. Extract a shared component only after at least two real pages use the same
   pattern. Do not create generic wrappers for one-line placeholder pages.
4. Preserve semantic HTML, keyboard focus, reduced-motion behavior, responsive
   layouts, and the current Light/Dark contract.
5. Add authentication, persistence, uploads, or a CMS only when an approved
   feature requires them.

## Verification

- `npm run build` verifies the production build.
- `npm test` builds the site and checks the shared shell and every route.
