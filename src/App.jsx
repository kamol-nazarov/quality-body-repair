import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { REDUCED } from './lib/motion';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Insurers from './components/Insurers';
import CtaBanner from './components/CtaBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { TICKER_ITEMS } from './lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const lenisRef = useRef(null);

  /* Lenis smooth scrolling driven by GSAP's ticker */
  useEffect(() => {
    if (REDUCED) {
      setRevealed(true);
      return;
    }
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  /* Mobile menu locks scrolling */
  useEffect(() => {
    const onMenu = (e) => {
      if (!lenisRef.current) return;
      e.detail.open ? lenisRef.current.stop() : lenisRef.current.start();
    };
    window.addEventListener('qbr:menu', onMenu);
    return () => window.removeEventListener('qbr:menu', onMenu);
  }, []);

  /* Smooth anchor navigation */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* Site-wide scroll-driven reveals */
  useEffect(() => {
    if (!revealed || REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-split]').forEach((group) => {
        gsap.from(group.querySelectorAll('[data-word]'), {
          yPercent: 125,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
      gsap.utils.toArray('[data-parallax]').forEach((img) => {
        const amt = parseFloat(img.dataset.parallax) || 8;
        gsap.fromTo(
          img,
          { yPercent: -amt },
          {
            yPercent: amt,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-parallax-wrap]') || img.parentElement,
              start: 'start end',
              end: 'end start',
              scrub: true,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, [revealed]);

  const handleReveal = useCallback(() => setRevealed(true), []);

  return (
    <div className="relative min-h-screen bg-coal text-ink">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Preloader onReveal={handleReveal} />
      <Nav ready={revealed} />
      <main>
        <Hero ready={revealed} />
        <Ticker
          items={TICKER_ITEMS}
          className="border-y-4 border-coal bg-ember py-4 text-coal md:py-5"
          itemClass="font-display uppercase text-2xl md:text-4xl"
        />
        <Services />
        <Process />
        <About />
        <Insurers />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
