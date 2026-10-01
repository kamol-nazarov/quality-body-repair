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

All imagery is local (`src/assets/`). The callback form is front-end only
(simulated submit) — wire it to EmailJS or a backend before going live.

## Deploying (tk-server)

The site is served by nginx on `tk-server` (SSH alias, 100.71.45.59) from
`/var/www/quality-body-repair/dist` — a clone of this repo.

```bash
git push origin main
ssh tk-server
  cd /var/www/quality-body-repair
  git pull origin main
  npm ci
  npm run build        # vite base is '/' outside GitHub Actions
```

nginx specifics (config: `/etc/nginx/sites-enabled/qualitybodyrepair`):

- Strict CSP (`script-src 'self'; style-src 'self'` …) — keep all assets,
  fonts, and styles self-hosted; no inline `style=` attributes.
- `Cache-Control: no-cache` on index.html, 30-day cache on `/assets/`
  (Vite filenames are content-hashed) — deploys appear on next reload.
- Backups of previous configs live in `/etc/nginx/backups/`.

## Commands

```bash
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the build
```
