import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED, Words } from '../lib/motion';
import { BUSINESS, IMAGES } from '../lib/data';
import { IconCheck, IconPin } from '../lib/icons';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT =
  'At Quality Body Repair, every car is treated like it belongs to our own family. Dealing with an accident is stressful enough — your repair shop should not be.';

const POINTS = [
  'We handle all insurance paperwork for you',
  'Fast turnaround without cutting corners',
  'Мы говорим по-русски — Russian spoken',
  'Free estimates, no appointment necessary',
];

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      const words = root.current.querySelectorAll('[data-hl]');
      gsap.fromTo(
        words,
        { color: '#4a4a4f' },
        {
          color: '#f2efe7',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current.querySelector('[data-hl-wrap]'),
            start: 'top 78%',
            end: 'top 30%',
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="relative overflow-hidden py-24 md:py-36">
      <div className="grid gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Image column */}
        <div className="relative lg:col-span-5">
          <div className="relative" data-fade>
            <div data-parallax-wrap className="aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES['collision-repair']}
                alt="Driver assessing damage after a collision"
                className="h-[116%] w-full object-cover"
                data-parallax="7"
                loading="lazy"
              />
            </div>
            <p className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
              <span>Fig. 01 — The bad day</span>
              <span className="text-ember">We take it from here</span>
            </p>
            <div className="absolute -bottom-8 -right-3 rotate-3 bg-ember p-5 text-coal md:-right-8 md:p-6">
              <p className="font-display text-2xl uppercase leading-none md:text-3xl">Free estimate</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">No appointment necessary</p>
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className="lg:col-span-7 lg:pl-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
            03 / The shop
          </p>
          <h2 className="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,7vw,6.5rem)]" data-split>
            <Words text="Why Bensonhurst" />
            <br />
            <span className="text-outline">
              <Words text="chooses us." />
            </span>
          </h2>

          <p data-hl-wrap className="mt-10 max-w-2xl text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug text-[#4a4a4f]">
            {HIGHLIGHT.split(' ').map((w, i) => (
              <span key={i} data-hl className="transition-colors duration-200">
                {w}{' '}
              </span>
            ))}
          </p>

          <div className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p} className="flex items-start gap-3" data-fade>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-ember text-coal">
                  <IconCheck size={12} />
                </span>
                <span className="text-sm leading-relaxed text-ink/85">{p}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-line pt-8" data-fade>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center bg-panel2 text-ember">
                <IconPin size={18} />
              </span>
              <div>
                <p className="font-semibold text-ink">{BUSINESS.address}</p>
                <p className="font-mono text-xs text-smoke">{BUSINESS.city}</p>
              </div>
            </div>
            <a
              href={BUSINESS.directions}
              target="_blank"
              rel="noreferrer"
              className="group font-mono text-xs uppercase tracking-[0.25em] text-ember hover:text-ink"
            >
              Get directions
              <span className="mt-1 block h-px w-full bg-current transition-transform duration-300 group-hover:scale-x-105" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
