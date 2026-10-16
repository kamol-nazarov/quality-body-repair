import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICES } from '../src/lib/data.js';
import {
  ORIGIN,
  HOME_TITLE,
  HOME_DESCRIPTION,
  HOME_H1,
  OG_IMAGE_ALT,
  homeJsonLd,
  serviceJsonLd,
  renderDocument,
} from '../src/lib/seo.js';
import { homeCrawlHtml, serviceCrawlHtml, notFoundCrawlHtml } from '../src/crawl/renderCrawl.js';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const built = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const styles = [...built.matchAll(/<link rel="stylesheet"[^>]*>/g)].map((match) => match[0]);
const preloads = [...built.matchAll(/<link rel="modulepreload"[^>]*>/g)].map((match) => match[0]);
const scripts = [...built.matchAll(/<script type="module"[^>]*><\/script>/g)].map((match) => match[0]);

if (styles.length !== 1 || scripts.length !== 1) {
  throw new Error(`expected one stylesheet and one module script, got ${styles.length} and ${scripts.length}`);
}
if (!scripts[0].includes('src="/assets/')) {
  throw new Error(`module script is not rooted at /assets/: ${scripts[0]}`);
}

const assetTags = [...preloads, ...styles].join('\n    ');
const scriptTags = scripts.join('\n    ');

function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function assertPage(file, html, { h1, canonical, index }) {
  const headings = html.match(/<h1[\s>]/gi) || [];
  if (headings.length !== 1) throw new Error(`${file} has ${headings.length} h1 tags`);
  if (!html.includes(h1)) throw new Error(`${file} is missing its h1 text`);
  if (html.includes('style=')) throw new Error(`${file} has a style attribute`);
  if (/AggregateRating|reviewCount|ratingValue/i.test(html)) throw new Error(`${file} contains a rating`);
  if (!html.includes('718-266-3100')) throw new Error(`${file} is missing the phone`);
  if (index) {
    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) throw new Error(`${file} canonical mismatch`);
    if (!html.includes('content="index, follow"')) throw new Error(`${file} is not indexable`);
    if (!html.includes('id="qbr-crawl"')) throw new Error(`${file} is missing the crawl document`);
    if (!html.includes('<div id="root"></div>')) throw new Error(`${file} is missing the app root`);
  } else {
    if (html.includes('rel="canonical"')) throw new Error(`${file} should not declare a canonical`);
    if (!html.includes('content="noindex, follow"')) throw new Error(`${file} should be noindex`);
    if (html.includes('type="module"')) throw new Error(`${file} should not load the app`);
    if (html.includes('id="qbr-crawl"')) throw new Error(`${file} should not use the crawl slot`);
    if (html.includes('id="root"')) throw new Error(`${file} should not mount the app`);
  }
}

const home = renderDocument({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  canonical: `${ORIGIN}/`,
  robots: 'index, follow',
  imageAlt: OG_IMAGE_ALT,
  jsonLd: homeJsonLd(),
  body: `${homeCrawlHtml()}\n    <div id="root"></div>`,
  styles: assetTags,
  scripts: scriptTags,
});
write('index.html', home);
assertPage('index.html', home, { h1: HOME_H1, canonical: `${ORIGIN}/`, index: true });
for (const service of SERVICES) {
  if (!home.includes(`href="/${service.slug}"`)) throw new Error(`home is missing /${service.slug}`);
}
if (home.length < 4000) throw new Error(`home HTML is still a shell (${home.length} bytes)`);

for (const service of SERVICES) {
  const canonical = `${ORIGIN}/${service.slug}`;
  const html = renderDocument({
    title: service.seoTitle,
    description: service.seoDescription,
    canonical,
    robots: 'index, follow',
    imageAlt: service.title,
    jsonLd: serviceJsonLd(service),
    body: `${serviceCrawlHtml(service)}\n    <div id="root"></div>`,
    styles: assetTags,
    scripts: scriptTags,
  });
  write(`${service.slug}/index.html`, html);
  assertPage(`${service.slug}/index.html`, html, { h1: service.h1, canonical, index: true });
}

const missing = renderDocument({
  title: 'Page not found | Quality Body Repair',
  description: 'That address is not a page on the Quality Body Repair site.',
  canonical: '',
  robots: 'noindex, follow',
  imageAlt: OG_IMAGE_ALT,
  jsonLd: null,
  body: notFoundCrawlHtml(),
  styles: assetTags,
  scripts: '',
});
write('404.html', missing);
assertPage('404.html', missing, { h1: 'Page not found', canonical: '', index: false });

for (const required of [
  'robots.txt',
  'sitemap.xml',
  'og.jpg',
  'media/why-choose-us.jpg',
  'media/paint-refinish.jpg',
  'media/driveaway.jpg',
]) {
  if (!fs.existsSync(path.join(dist, required))) throw new Error(`missing ${required}`);
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expected = [`${ORIGIN}/`, ...SERVICES.map((service) => `${ORIGIN}/${service.slug}`)];
if (locs.join('\n') !== expected.join('\n')) {
  throw new Error(`sitemap locs:\n${locs.join('\n')}\nexpected:\n${expected.join('\n')}`);
}
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) throw new Error('robots.txt is missing the sitemap');
if (!robots.includes('Allow: /')) throw new Error('robots.txt does not allow the site');

console.log(`prerendered ${1 + SERVICES.length} pages and a 404`);
for (const rel of ['index.html', ...SERVICES.map((service) => `${service.slug}/index.html`), '404.html']) {
  console.log(`${rel} ${fs.statSync(path.join(dist, rel)).size}`);
}
