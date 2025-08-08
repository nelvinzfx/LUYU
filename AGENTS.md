# Repository Guidelines

## Project Structure & Module Organization
- Root contains the static entry point: `index.html`.
- Recommended folders (create as needed):
  - `css/` for stylesheets (e.g., `css/styles.css`).
  - `js/` for scripts (e.g., `js/app.js`).
  - `img/` or `assets/` for images and media.
- Keep third‑party libraries in `vendor/` to separate them from first‑party code.

## Build, Test, and Development Commands
- Run a local dev server (no build step required):
  - Python: `python3 -m http.server 8080` then open `http://localhost:8080`.
  - Node (if available): `npx serve .` or `npx http-server .`
- Minify/optimize (optional): use your preferred tool (e.g., `npx terser js/app.js -o js/app.min.js`).

## Coding Style & Naming Conventions
- HTML: semantic tags (`<header>`, `<main>`, `<footer>`), 2‑space indentation.
- CSS: BEM‑style class names (e.g., `card`, `card__title`, `card--primary`).
- JS: ES modules when possible; camelCase for variables/functions, PascalCase for classes.
- Filenames: lowercase with dashes (`about-page.html`, `site-header.css`).
- Formatting: run Prettier if available (`npx prettier -w .`).

## Testing Guidelines
- Smoke test locally: verify navigation, forms, and console shows no errors.
- Accessibility: use browser audits (Lighthouse) and keyboard‑only navigation.
- Links/images: confirm relative paths work when served from `/`.
- Optional: add a link checker (e.g., `npx linkinator .`).

## Commit & Pull Request Guidelines
- Commits: clear, imperative subject line (e.g., "Add hero section markup").
- Scope small, commit often; group related file changes together.
- PRs: include a short description, screenshots for UI changes, and test notes.
- Link any related issues; request at least one review before merge.

## Security & Configuration Tips
- Avoid embedding secrets in HTML/JS; use environment‑specific configs at deploy time.
- Set proper caching headers at the host/CDN; fingerprint assets (`app.[hash].css`) if you add a build step.
- Validate third‑party scripts and pin versions.
