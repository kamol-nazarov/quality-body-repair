import { useEffect } from 'react';
import { BUSINESS, IMAGES, SERVICES } from '../lib/data';
import Cursor from './Cursor';
import Nav from './Nav';
import Contact from './Contact';
import Footer from './Footer';

function imageKey(file) {
  return file.replace('.jpg', '');
}

export default function ServicePage({ service }) {
  useEffect(() => {
    document.title = service.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', service.seoDescription);
  }, [service]);

  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <div className="relative min-h-screen bg-coal text-ink">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav ready />
      <main className="px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
          <a href="/" className="transition-colors hover:text-ember">
            {BUSINESS.name}
          </a>
          <span className="text-ember"> / </span>
          {service.title}
        </p>
        <h1 className="mt-6 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">
          {service.h1}
        </h1>
        <img
          src={IMAGES[imageKey(service.image)]}
          alt={service.title}
          className="mt-10 aspect-[16/9] w-full object-cover"
        />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-smoke">{service.desc}</p>
        {service.body.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-xl text-sm leading-relaxed text-smoke">
            {paragraph}
          </p>
        ))}
        <ul className="mt-8 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-smoke"
            >
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={BUSINESS.phoneHref}
          className="mt-10 inline-flex items-center justify-center bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal transition-colors hover:bg-ink"
        >
          Call {BUSINESS.phoneDisplay}
        </a>
        <p className="mt-8 flex flex-wrap gap-4">
          {others.map((item) => (
            <a key={item.slug} href={`/${item.slug}`} className="text-sm text-ember underline underline-offset-4">
              {item.title}
            </a>
          ))}
        </p>
      </main>
      <Contact />
      <Footer />
    </div>
  );
}

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found | Quality Body Repair';
  }, []);

  return (
    <div className="relative min-h-screen bg-coal text-ink">
      <div className="grain" aria-hidden="true" />
      <Nav ready />
      <main className="px-5 py-24 md:px-10 md:pt-36">
        <h1 className="font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">Page not found</h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-smoke">That address is not a page on this site.</p>
        <p className="mt-8">
          <a href="/" className="text-ember underline underline-offset-4">
            {BUSINESS.name}
          </a>
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="mt-8 inline-flex bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal"
        >
          {BUSINESS.phoneDisplay}
        </a>
      </main>
    </div>
  );
}
