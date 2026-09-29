# Quality Body Repair — Brooklyn

Award-style marketing site for Quality Body Repair, a collision & paint shop in
Bensonhurst, Brooklyn (221 Bay 37th St, NY 11214 · 718-266-3100).

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (design tokens in `src/index.css` via `@theme`)
- GSAP + ScrollTrigger — scroll-driven reveals, parallax, section choreography
- Lenis — smooth scrolling (exposed as `window.__lenis` for testing)

## Structure

```
src/
  App.jsx            page composition, Lenis/GSAP wiring, global reveals
  index.css          design system: colors, fonts, keyframes, utilities
  lib/
    data.js          business info (address, hours, services, insurers)
    motion.jsx       shared primitives: Chars/Words splitters, Magnetic, flags
    icons.jsx        inline SVG icons + logo mark
  components/        Preloader, Cursor, Nav, Hero, Ticker, Services,
                     Process, About, Insurers, CtaBanner, Contact, Footer
```

All imagery is local (`src/assets/`). The callback form is front-end only
(simulated submit) — wire it to EmailJS or a backend before going live.

## Commands

```bash
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the build
```
