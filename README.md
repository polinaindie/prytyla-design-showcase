# Prytula

Monorepo for the Prytula Foundation site and design system.

## Structure

```
├── .cursor/rules/              # Cursor rules (design system + Figma→showcase)
│   ├── prytula-design-system.mdc
│   └── prytula-figma-to-showcase.mdc
├── design-tokens/              # Figma variable export → CSS/TS
│   ├── data/figma-variables.tsv
│   ├── scripts/build.mjs
│   └── dist/                   # tokens.css, tokens.ts (generated)
└── web/                        # Vite + React app
    ├── src/
    │   ├── components/         # Product UI (pages, sections)
    │   ├── design-system/    # DS components (generated from Figma)
    │   ├── showcase/         # DS documentation (to be built)
    │   └── styles/tokens.css # Generated entry (npm run build:tokens)
    ├── package.json
    └── vite.config.ts
```

## Commands

From repo root:

```bash
npm run build:tokens   # design-tokens/dist + web/src/styles/tokens.css
npm run dev            # Vite dev server (web/)
npm run build:web      # Production build
```

After updating `design-tokens/data/figma-variables.tsv` from Figma, always run `npm run build:tokens`.

## Figma

- **Prytula-Responsive:** [Figma file](https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive)
