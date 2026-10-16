# Quality Body Repair — Brooklyn

Award-style marketing site for Quality Body Repair, a collision & paint shop in
Bensonhurst, Brooklyn (221 Bay 37th St, NY 11214 · 718-266-3100).

**Live:** https://qualitybodyrepair.com

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (design tokens in `src/index.css` via `@theme`)
- GSAP + ScrollTrigger — scroll-driven reveals, parallax, section choreography
- Lenis — smooth scrolling (exposed as `window.__lenis` for testing)
- Self-hosted fonts via @fontsource (the production CSP allows no third-party styles)

## Structure

```
src/
  App.jsx            page composition, Lenis/GSAP wiring, global reveals
  index.css          design system: fonts, colors, keyframes, utilities
  lib/
    data.js          business info (address, hours, services, insurers)
    motion.jsx       shared primitives: Chars/Words splitters, Magnetic, flags
    icons.jsx        inline SVG icons + logo mark
  components/        Preloader, Cursor, Nav, Hero, Ticker, Services,
                     Process, About, Insurers, CtaBanner, Contact, Footer
```

All imagery is local (`src/assets/`). The contact block calls 718-266-3100.
The page does not submit a form.

`npm run build` writes crawlable HTML for `/`, `/collision-repair`,
`/paint-refinish`, and `/dent-repair`, plus `404.html`, into `dist/`.

## Deploying (tk-server)

Production is the read-only container `qbr-static` (rootless user `qbr-prod`),
published on 127.0.0.1:5030. Host nginx terminates TLS and proxies to it.
A git pull in `/var/www/quality-body-repair` does not change the live site.

`deploy/Dockerfile` builds from the local `qbr-static` image, replaces the
site files, and installs `deploy/default.conf`. That config serves only files
that exist and returns 404 for anything else. Host nginx redirects `www` to
`https://qualitybodyrepair.com`.

nginx specifics (config: `/etc/nginx/sites-enabled/qualitybodyrepair`):

- Strict CSP (`script-src 'self'; style-src 'self'` …) — keep all assets,
  fonts, and styles self-hosted; no inline `style=` attributes.
- `Cache-Control: no-cache` on HTML, 30-day cache on `/assets/`
  (Vite filenames are content-hashed) — deploys appear on next reload.
- Backups of previous configs live in `/etc/nginx/backups/`.

## Commands

```bash
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the build
```
