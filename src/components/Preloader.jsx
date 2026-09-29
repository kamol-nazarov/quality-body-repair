import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/motion';
import { BUSINESS } from '../lib/data';

export default function Preloader({ onReveal }) {
  const root = useRef(null);
  const num = useRef(null);
  const bar = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (REDUCED) {
      onReveal();
      setGone(true);
      return;
    }
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => setGone(true),
      });
      tl.from('[data-pl-line] > *', { yPercent: 115, duration: 0.8, stagger: 0.09 }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.1,
        )
        .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0.1)
        /* hand off to the page a beat before the curtain finishes lifting */
        .call(onReveal, null, '+=0.25')
        .to('[data-pl-out]', { yPercent: -120, duration: 0.55, ease: 'power3.in', stagger: 0.06 }, '+=0.1')
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.35');
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col justify-between bg-coal px-5 py-6 md:px-10 md:py-8">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-smoke" data-pl-out>
        <span>{BUSINESS.neighborhood} — Brooklyn</span>
        <span className="hidden sm:block">Collision · Paint · PDR</span>
        <span className="text-ember">Est. Free</span>
      </div>

      <div className="self-center text-center">
        <h1 className="font-display uppercase leading-[0.9] text-ink text-[clamp(3rem,11vw,10rem)]">
          <span className="block overflow-hidden" data-pl-line>
            <span className="block">Quality</span>
          </span>
          <span className="block overflow-hidden" data-pl-line>
            <span className="block text-outline">Body</span>
          </span>
          <span className="block overflow-hidden" data-pl-line>
            <span className="block">Repair<span className="text-ember">.</span></span>
          </span>
        </h1>
      </div>

      <div data-pl-out>
        <div className="flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">Loading the booth</span>
          <span ref={num} className="font-display text-6xl md:text-8xl leading-none text-ember">
            000
          </span>
        </div>
        <div className="mt-4 h-[3px] w-full bg-line">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-ember" />
        </div>
      </div>
    </div>
  );
}
