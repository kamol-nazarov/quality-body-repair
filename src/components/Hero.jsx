import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED, FINE_POINTER, Chars, Magnetic } from '../lib/motion';
import { BUSINESS, IMAGES } from '../lib/data';
import { IconPhone, IconArrowRight, IconCheck } from '../lib/icons';

export default function Hero({ ready }) {
  const root = useRef(null);

  useEffect(() => {
    if (!ready || REDUCED) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('[data-hero-bg]', { scale: 1.25, duration: 2, ease: 'power3.out' }, 0)
        .from('[data-hero-char]', { yPercent: 118, duration: 1.05, stagger: 0.03 }, 0.15)
        .from('[data-hero-fade]', { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, 0.7)
        .from('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.inOut' }, 0.9);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" data-parallax-wrap>
        <img
          src={IMAGES.hero}
          alt="Car at dusk on a Brooklyn street after a flawless repair"
          className="h-[118%] w-full object-cover"
          data-hero-bg
          data-parallax="8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/45 to-coal/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/80 via-transparent to-transparent" />
        <div className="hero-glow absolute -bottom-32 left-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl" />
      </div>

      {/* Meta strip */}
      <div
        data-hero-fade
        className="absolute left-0 right-0 top-24 hidden justify-between px-10 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60 md:flex lg:top-28"
      >
        <span>Insurance claim specialists</span>
        <span>{BUSINESS.neighborhood} — Brooklyn, NY</span>
        <span className="text-ember">Free estimates</span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pb-10 pt-40 md:px-10 md:pb-14">
        <h1 className="font-display uppercase leading-[0.88] tracking-[0.005em] text-ink">
          <span className="block overflow-hidden pb-[0.06em] text-[clamp(3.6rem,12.5vw,11.5rem)]">
            <Chars text="Collision" />
          </span>
          <span className="block overflow-hidden pb-[0.06em] text-[clamp(3.6rem,12.5vw,11.5rem)]">
            <span className="mb-[0.1em] mr-[0.18em] inline-block overflow-hidden rounded-full align-bottom">
              <img src={IMAGES['paint-refinish']} alt="" className="h-[0.62em] w-[1.15em] rounded-full object-cover" />
            </span>{' '}
            <Chars text="repair," />
          </span>
          <span className="block overflow-hidden pb-[0.06em] text-[clamp(3.6rem,12.5vw,11.5rem)]">
            <span className="text-ember">
              <Chars text="simplified." />
            </span>
          </span>
        </h1>

        <div data-hero-rule className="mt-8 h-px w-full bg-ink/20 md:mt-10" />

        <div className="mt-8 flex flex-col gap-8 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl" data-hero-fade>
            <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
              We take the stress out of accidents. From filing the claim to the final coat of paint, we handle the
              entire process directly with your insurance provider.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center justify-center gap-3 bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal transition-colors hover:bg-ink"
                >
                  <IconPhone size={16} /> Call {BUSINESS.phoneDisplay}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="group flex items-center justify-center gap-3 border border-ink/30 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-ink transition-colors hover:border-ember hover:text-ember"
                >
                  Get an estimate
                  <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5" data-hero-fade>
            {['We accept all insurance', 'Direct billing', 'Fast turnaround'].map((t) => (
              <li key={t} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
                <span className="text-ember">
                  <IconCheck size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div data-hero-fade className="absolute bottom-10 right-10 z-10 hidden flex-col items-center gap-3 lg:flex">
        <span className="vertical-rl font-mono text-[10px] uppercase tracking-[0.35em] text-ink/50">
          Scroll
        </span>
        <div className="h-16 w-px overflow-hidden">
          <div className="animate-scrollcue h-full w-full bg-ember" />
        </div>
      </div>
    </section>
  );
}
