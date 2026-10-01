import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { REDUCED, Magnetic } from '../lib/motion';
import { BUSINESS } from '../lib/data';
import { LogoMark, IconBurger, IconClose, IconPhone, IconPin } from '../lib/icons';

const LINKS = [
  { n: '01', label: 'Services', href: '#services' },
  { n: '02', label: 'Process', href: '#process' },
  { n: '03', label: 'The Shop', href: '#about' },
  { n: '04', label: 'Contact', href: '#contact' },
];

export default function Nav({ ready }) {
  const header = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!ready || REDUCED) return;
    gsap.from(header.current, { yPercent: -100, duration: 1, ease: 'power4.out', delay: 0.2 });
  }, [ready]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('qbr:menu', { detail: { open } }));
  }, [open]);

  return (
    <>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open ? 'border-b border-line bg-coal/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="Quality Body Repair — home">
            <LogoMark size={36} />
            <span className="flex flex-col font-mono text-[10px] uppercase leading-tight tracking-[0.25em] text-ink">
              <span>Quality Body</span>
              <span className="text-ember">Repair — BKlyn</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`group relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-ink ${
                  scrolled ? 'text-smoke' : 'text-ink/75'
                }`}
              >
                <sup className="mr-1 text-[8px] text-ember">{l.n}</sup>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-7">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 font-mono text-sm tracking-wider text-ink transition-colors hover:text-ember md:flex"
            >
              <IconPhone size={15} />
              {BUSINESS.phoneDisplay}
            </a>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="hidden bg-ember px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-coal transition-colors hover:bg-ink sm:block"
              >
                Free estimate
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center border border-line text-ink lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <IconClose /> : <IconBurger />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed inset-0 z-[110] flex flex-col bg-coal transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="hazard h-2 w-full opacity-90" />
        <nav className="menu-stagger flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <span className="font-mono text-xs text-ember">{l.n}</span>
              <span className="font-display text-5xl uppercase leading-none text-ink transition-colors group-hover:text-ember">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4 px-6 pb-10">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-3 font-mono text-lg text-ink">
            <IconPhone size={16} /> {BUSINESS.phoneDisplay}
          </a>
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-smoke">
            <IconPin size={14} /> {BUSINESS.address}, {BUSINESS.city}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-smoke">
            Mon–Fri 8:00–17:00 · Sat–Sun closed
          </p>
        </div>
      </div>
    </>
  );
}
