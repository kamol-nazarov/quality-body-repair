import { BUSINESS, PROCESS, SERVICES, INSURERS_ROW_1, INSURERS_ROW_2 } from '../lib/data.js';
import { HOME_H1, escapeAttr, escapeText } from '../lib/seo.js';

const insurers = [...INSURERS_ROW_1, ...INSURERS_ROW_2].join(', ');

function phoneLink() {
  return `<a href="${escapeAttr(BUSINESS.phoneHref)}" class="mt-8 inline-flex items-center justify-center bg-ember px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.15em] text-coal">${escapeText(BUSINESS.phoneDisplay)}</a>`;
}

function addressBlock() {
  const hours = BUSINESS.hours
    .map((row) => `<li class="text-sm text-ink">${escapeText(row.days)}: ${escapeText(row.time)}</li>`)
    .join('');
  return `<p class="mt-8 text-sm leading-relaxed text-smoke">${escapeText(BUSINESS.address)}, ${escapeText(BUSINESS.city)}. ${escapeText(BUSINESS.neighborhood)}.</p>
    <ul class="mt-4 space-y-2">${hours}</ul>
    <p class="mt-4 text-sm text-smoke">${escapeText(BUSINESS.languages)}</p>`;
}

export function homeCrawlHtml() {
  const services = SERVICES.map(
    (service) => `<li class="border-b border-line py-8">
        <a href="/${escapeAttr(service.slug)}" class="font-display text-4xl uppercase leading-[0.95] text-ink">${escapeText(service.title)}</a>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-smoke">${escapeText(service.desc)}</p>
      </li>`,
  ).join('');
  const steps = PROCESS.map(
    (step) => `<li class="border-b border-line py-6">
        <h3 class="font-display text-2xl uppercase text-ink">${escapeText(step.title)}</h3>
        <p class="mt-3 max-w-xl text-sm leading-relaxed text-smoke">${escapeText(step.desc)}</p>
      </li>`,
  ).join('');

  return `<main id="qbr-crawl" class="bg-coal px-5 py-24 text-ink md:px-10">
    <p class="font-mono text-[11px] uppercase tracking-[0.35em] text-ember">${escapeText(BUSINESS.name)} — ${escapeText(BUSINESS.neighborhood)}</p>
    <h1 class="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">${escapeText(HOME_H1)}</h1>
    <p class="mt-8 max-w-xl text-lg leading-relaxed text-smoke">We take the stress out of accidents. From filing the claim to the final coat of paint, we handle the entire process directly with your insurance provider.</p>
    ${phoneLink()}
    ${addressBlock()}
    <section id="services" class="mt-14">
      <h2 class="font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">What we do</h2>
      <ul class="mt-8 border-t border-line">${services}</ul>
    </section>
    <section class="mt-14">
      <h2 class="font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">How a repair goes</h2>
      <ol class="mt-8 border-t border-line">${steps}</ol>
      <p class="mt-8 max-w-xl text-sm leading-relaxed text-smoke">Direct billing: ${escapeText(insurers)}.</p>
    </section>
  </main>`;
}

export function serviceCrawlHtml(service) {
  const others = SERVICES.filter((item) => item.slug !== service.slug)
    .map(
      (item) =>
        `<a href="/${escapeAttr(item.slug)}" class="text-sm text-ember underline underline-offset-4">${escapeText(item.title)}</a>`,
    )
    .join('');
  const paragraphs = service.body
    .map((paragraph) => `<p class="mt-4 max-w-xl text-sm leading-relaxed text-smoke">${escapeText(paragraph)}</p>`)
    .join('');
  const tags = service.tags
    .map(
      (tag) =>
        `<li class="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">${escapeText(tag)}</li>`,
    )
    .join('');

  return `<main id="qbr-crawl" class="bg-coal px-5 py-24 text-ink md:px-10">
    <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-smoke"><a href="/" class="text-ember">${escapeText(BUSINESS.name)}</a> / ${escapeText(service.title)}</p>
    <h1 class="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">${escapeText(service.h1)}</h1>
    <img src="/media/${escapeAttr(service.image)}" alt="${escapeAttr(service.title)}" class="mt-8 aspect-[16/9] w-full object-cover">
    <p class="mt-8 max-w-xl text-lg leading-relaxed text-smoke">${escapeText(service.desc)}</p>
    ${paragraphs}
    <ul class="mt-8 flex flex-wrap gap-2">${tags}</ul>
    ${phoneLink()}
    ${addressBlock()}
    <p class="mt-8 flex flex-wrap gap-4">${others}</p>
  </main>`;
}

export function notFoundCrawlHtml() {
  return `<main class="bg-coal px-5 py-24 text-ink md:px-10">
    <p class="font-mono text-[11px] uppercase tracking-[0.35em] text-ember">${escapeText(BUSINESS.name)}</p>
    <h1 class="mt-5 font-display uppercase leading-[0.9] text-ink text-[clamp(2.8rem,8vw,7.5rem)]">Page not found</h1>
    <p class="mt-8 max-w-xl text-lg leading-relaxed text-smoke">That address is not a page on this site.</p>
    <p class="mt-8"><a href="/" class="text-ember underline underline-offset-4">${escapeText(BUSINESS.name)}</a></p>
    ${phoneLink()}
  </main>`;
}
