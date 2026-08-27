

## Standalone Local Assets

The Tagpuan admin panel includes its visual assets in `client/public/assets/tagpuan/`, so a fresh clone can run without access to Manus-hosted `/manus-storage/...` URLs. The React pages reference these files using root-relative paths such as `/assets/tagpuan/next-gathering.jpg`.

The local asset set contains the Tagpuan mark and the four event photographs used throughout the Overview, Events, Recaps, Projects, and Media views. These are intentionally tracked as frontend assets because they are required for a complete local preview.

## Local Development

```bash
pnpm install
pnpm dev
```

Then open the local Vite URL printed in the terminal. For a release check, run:

```bash
pnpm check
pnpm build
```

This project remains a frontend-only static app. The admin interactions use local client state until a backend data source is connected.
