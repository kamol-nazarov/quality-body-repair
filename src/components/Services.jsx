import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FINE_POINTER, Words } from '../lib/motion';
import { SERVICES, IMAGES, BUSINESS } from '../lib/data';
import { IconArrow } from '../lib/icons';

export default function Services() {
  const root = useRef(null);
  const preview = useRef(null);
  const active = useRef(0);

  useEffect(() => {
    if (!FINE_POINTER) return;
    const p = preview.current;
    const list = root.current.querySelector('[data-svc-list]');

    const xTo = gsap.quickTo(p, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(p, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const enterRow = (i) => {
      if (active.current !== i) {
        active.current = i;
        const imgs = p.querySelectorAll('img');
        imgs.forEach((img, k) =>
          gsap.to(img, { autoAlpha: k === i ? 1 : 0, scale: k === i ? 1 : 1.15, duration: 0.45, ease: 'power3.out' }),
        );
        const num = p.querySelector('[data-svc-preview-num]');
        if (num) num.textContent = SERVICES[i].num;
      }
      gsap.to(p, { autoAlpha: 1, scale: 1, rotation: -4, duration: 0.45, ease: 'power3.out' });
    };
    const leaveList = () => {
      gsap.to(p, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'power3.out' });
    };

    gsap.set(p, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.85 });
    list.addEventListener('mousemove', move, { passive: true });
    list.addEventListener('mouseleave', leaveList);
    root.current.querySelectorAll('[data-svc-row]').forEach((row, i) => {
      row.addEventListener('mouseenter', () => enterRow(i));
    });
    return () => {
      list.removeEventListener('mousemove', move);
      list.removeEventListener('mouseleave', leaveList);
    };
  }, []);

  return (
    <section ref={root} id="services" className="relative py-24 md:py-36">
      <div className="px-5 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ember" data-fade>
              01 / What we do
            </p>
            <h2 className="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]" data-split>
              <Words text="Complete" />{' '}
              <span className="text-outline">
                <Words text="restoration." />
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-smoke lg:pb-3 lg:text-right" data-fade>
            Old-school craftsmanship, modern technology. Every vehicle that leaves our shop meets strict factory
            safety specifications.
          </p>
        </div>

        <div data-svc-list className="mt-14 border-t border-line md:mt-20">
          {SERVICES.map((s) => (
            <a
              key={s.num}
              href="#contact"
              data-svc-row
              data-hover
              className="group grid grid-cols-12 items-center gap-x-4 gap-y-6 border-b border-line py-8 transition-colors duration-500 hover:bg-panel md:py-12"
            >
              <span className="col-span-2 font-mono text-sm text-ember md:col-span-1">{s.num}</span>
              <h3 className="col-span-10 font-display text-4xl uppercase leading-[0.95] text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:text-ember md:col-span-6 md:text-6xl">
                {s.title}
              </h3>
              <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-8">
                {/* inline image for touch devices */}
                <div className="mb-5 aspect-[16/9] w-full overflow-hidden md:hidden">
                  <img src={IMAGES[s.image.replace('.jpg', '')]} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="max-w-md text-sm leading-relaxed text-smoke">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden justify-self-end md:col-span-1 md:flex">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-coal">
                  <IconArrow size={20} />
                </span>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke" data-fade>
          Don't see your issue? <a href={BUSINESS.phoneHref} className="text-ember underline underline-offset-4 hover:text-ink">Call us — {BUSINESS.phoneDisplay}</a>
        </p>
      </div>

      {/* Floating cursor preview (desktop) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-[320px] w-[250px] overflow-hidden md:block"
      >
        {SERVICES.map((s) => (
          <img
            key={s.num}
            src={IMAGES[s.image.replace('.jpg', '')]}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${s.num !== '01' ? 'opacity-0' : ''}`}
          />
        ))}
        <span
          data-svc-preview-num
          className="absolute bottom-3 left-3 bg-ember px-2 py-1 font-mono text-[11px] font-medium text-coal"
        >
          01
        </span>
      </div>
    </section>
  );
}
