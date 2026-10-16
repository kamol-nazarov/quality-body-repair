import { BUSINESS } from './data.js';

export const ORIGIN = 'https://qualitybodyrepair.com';

export const HOME_TITLE =
  'Quality Body Repair — Collision & Paint Specialists · Bensonhurst, Brooklyn';
export const HOME_DESCRIPTION =
  "Brooklyn's collision repair shop. Free estimates, all insurance accepted with direct billing, factory-spec structural repair and computerized color matching. 221 Bay 37th St, Bensonhurst. Мы говорим по-русски.";
export const HOME_H1 = 'Collision repair, simplified.';
export const OG_TITLE = 'Quality Body Repair — Collision Repair. Simplified.';
export const OG_DESCRIPTION =
  'From the insurance claim to the final coat of paint — we handle everything. Bensonhurst, Brooklyn.';
export const OG_IMAGE = `${ORIGIN}/og.jpg`;
export const OG_IMAGE_ALT = 'Car at dusk on a Brooklyn street after a flawless repair';

const SHOP_ID = `${ORIGIN}/#shop`;
const WEBSITE_ID = `${ORIGIN}/#website`;

export function shopNode() {
  return {
    '@type': 'AutoBodyShop',
    '@id': SHOP_ID,
    name: BUSINESS.name,
    url: `${ORIGIN}/`,
    image: OG_IMAGE,
    telephone: '+1-718-266-3100',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '221 Bay 37th Street',
      addressLocality: 'Brooklyn',
      addressRegion: 'NY',
      postalCode: '11214',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.59414482956964,
      longitude: -73.99313305750185,
    },
    openingHours: ['Mo-Fr 08:00-17:00'],
    areaServed: [
      { '@type': 'Place', name: 'Bensonhurst' },
      { '@type': 'City', name: 'Brooklyn' },
    ],
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${ORIGIN}/`,
    name: BUSINESS.name,
    publisher: { '@id': SHOP_ID },
  };
}

export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [shopNode(), websiteNode()],
  };
}

export function serviceJsonLd(service) {
  const url = `${ORIGIN}/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      shopNode(),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: service.seoTitle,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SHOP_ID },
      },
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        url,
        provider: { '@id': SHOP_ID },
        areaServed: 'Bensonhurst, Brooklyn',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: BUSINESS.name,
            item: `${ORIGIN}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: service.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function jsonScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function escapeText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeAttr(value) {
  return escapeText(value).replace(/"/g, '&quot;');
}

function meta(name, content) {
  return `<meta name="${escapeAttr(name)}" content="${escapeAttr(content)}">`;
}

function prop(property, content) {
  return `<meta property="${escapeAttr(property)}" content="${escapeAttr(content)}">`;
}

export function renderDocument({
  title,
  description,
  canonical,
  robots,
  imageAlt,
  jsonLd,
  body,
  styles,
  scripts,
}) {
  const head = [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `<title>${escapeText(title)}</title>`,
    meta('description', description),
    meta('robots', robots),
    '<meta name="theme-color" content="#0a0a0b">',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    canonical ? `<link rel="canonical" href="${escapeAttr(canonical)}">` : '',
    prop('og:title', title === HOME_TITLE ? OG_TITLE : title),
    prop('og:description', canonical === `${ORIGIN}/` ? OG_DESCRIPTION : description),
    prop('og:type', 'website'),
    canonical ? prop('og:url', canonical) : '',
    prop('og:image', OG_IMAGE),
    prop('og:image:alt', imageAlt || OG_IMAGE_ALT),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title === HOME_TITLE ? OG_TITLE : title),
    meta('twitter:description', canonical === `${ORIGIN}/` ? OG_DESCRIPTION : description),
    meta('twitter:image', OG_IMAGE),
    jsonLd ? jsonScript(jsonLd) : '',
    styles,
    scripts,
  ]
    .filter(Boolean)
    .join('\n    ');

  return `<!doctype html>
<html lang="en">
  <head>
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>
`;
}
