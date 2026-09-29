import { BUSINESS } from '../lib/data';
import { LogoMark, IconPhone, IconPin } from '../lib/icons';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'The Shop', href: '#about' },
  { label: 'Insurance', href: '#insurers' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark size={38} />
            <span className="flex flex-col font-mono text-[10px] uppercase leading-tight tracking-[0.25em] text-ink">
              <span>Quality Body</span>
              <span className="text-ember">Repair — BKlyn</span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-smoke">
            Expert collision repair and color matching in Bensonhurst. We bring your vehicle back to factory
            condition — without the stress.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Sitemap</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ink/80 transition-colors hover:text-ember">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Contact</p>
          <a
            href={BUSINESS.phoneHref}
            className="mt-5 flex items-center gap-2.5 text-lg font-semibold text-ink transition-colors hover:text-ember"
          >
            <IconPhone size={15} /> {BUSINESS.phoneDisplay}
          </a>
          <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-smoke">
            <IconPin size={15} className="mt-0.5 shrink-0" />
            <span>
              {BUSINESS.address}
              <br />
              {BUSINESS.city}
            </span>
          </p>
          <a
            href={BUSINESS.directions}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ember hover:text-ink"
          >
            Get directions →
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Hours</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex flex-col text-ink/80">
              Mon — Fri
              <span className="text-smoke">8:00 AM — 5:00 PM</span>
            </li>
            <li className="flex flex-col text-ink/80">
              Sat — Sun
              <span className="text-smoke">Closed</span>
            </li>
          </ul>
          <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-400" />
            Accepting claims
          </p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="px-5 md:px-10" data-fade aria-hidden="true">
        <p className="select-none whitespace-nowrap text-center font-display uppercase leading-[0.82] text-ink text-[13.5vw]">
          Quality <span className="text-outline">Body</span>
        </p>
        <p className="select-none text-center font-display uppercase leading-[0.82] text-ember text-[13.5vw]">
          Repair.
        </p>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line px-5 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke md:flex-row md:px-10">
        <span>© 2026 {BUSINESS.name}. All rights reserved.</span>
        <span className="hidden md:block">Collision · Paint · PDR</span>
        <span>Built in Bensonhurst</span>
      </div>
    </footer>
  );
}
