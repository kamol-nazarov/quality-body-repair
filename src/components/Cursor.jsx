import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED, FINE_POINTER } from '../lib/motion';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!FINE_POINTER || REDUCED) return;

    document.documentElement.classList.add('has-cursor');

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e) => {
      const hot = e.target.closest('a, button, [data-hover]');
      gsap.to(ring.current, {
        scale: hot ? 2.1 : 1,
        opacity: hot ? 0.9 : 1,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot.current, { scale: hot ? 0.4 : 1, duration: 0.35, ease: 'power3.out' });
    };

    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
    const leave = () => {
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
      shown = false;
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-2 w-2 rounded-full bg-ink mix-blend-difference md:block"
      />
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-9 w-9 rounded-full border border-ink/50 mix-blend-difference md:block"
      />
    </>
  );
}
