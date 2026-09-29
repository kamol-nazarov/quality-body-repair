export const BUSINESS = {
  name: 'Quality Body Repair',
  short: 'QBR',
  phoneDisplay: '718-266-3100',
  phoneHref: 'tel:7182663100',
  address: '221 Bay 37th Street',
  city: 'Brooklyn, NY 11214',
  neighborhood: 'Bensonhurst',
  hours: [
    { days: 'Monday — Friday', time: '8:00 AM — 5:00 PM' },
    { days: 'Saturday — Sunday', time: 'Closed' },
  ],
  languages: 'English · Русский',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.3512434285379!2d-73.99313305750185!3d40.59414482956964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245a8c0db75db%3A0x52a30c0be40c63e2!2s221%20Bay%2037th%20St%2C%20Brooklyn%2C%20NY%2011214!5e0!3m2!1sen!2sus!4v1765559958166!5m2!1sen!2sus',
  directions:
    'https://www.google.com/maps/dir//221+Bay+37th+St,+Brooklyn,+NY+11214',
};

export const SERVICES = [
  {
    num: '01',
    title: 'Collision Repair',
    desc: 'Major structural repairs using laser-measuring systems to ensure your frame is straightened to the millimeter — restored to factory safety specification.',
    tags: ['Frame straightening', 'Laser measuring', 'Structural'],
    image: 'why-choose-us.jpg',
  },
  {
    num: '02',
    title: 'Paint & Refinish',
    desc: 'Computerized color matching and a dust-free downdraft booth guarantee a showroom shine that lasts a lifetime.',
    tags: ['Color matching', 'Downdraft booth', 'Showroom finish'],
    image: 'paint-refinish.jpg',
  },
  {
    num: '03',
    title: 'Dent & Scratch',
    desc: 'From door dings to deep scratches, we use Paintless Dent Repair (PDR) and blending techniques to erase damage.',
    tags: ['Paintless dent repair', 'Blending', 'Detailing'],
    image: 'driveaway.jpg',
  },
];

export const PROCESS = [
  {
    num: '01',
    title: 'Free estimate',
    desc: 'Walk in — no appointment necessary. We assess the damage and put the scope in writing before anyone touches your car.',
  },
  {
    num: '02',
    title: 'Insurance, handled',
    desc: 'We file directly with your provider — GEICO to USAA — with direct billing and full supplement handling. You never chase paperwork.',
  },
  {
    num: '03',
    title: 'Precision repair',
    desc: 'Laser frame measuring, OEM-spec structural work, computerized color match sprayed in a dust-free downdraft booth.',
  },
  {
    num: '04',
    title: 'Keys back',
    desc: 'Panels aligned, paint polished, safety systems verified to factory spec. You drive away like it never happened.',
  },
];

export const INSURERS_ROW_1 = ['GEICO', 'STATE FARM', 'ALLSTATE', 'PROGRESSIVE', 'LIBERTY MUTUAL'];
export const INSURERS_ROW_2 = ['USAA', 'NATIONWIDE', 'FARMERS', 'TRAVELERS', 'AAA'];

export const TICKER_ITEMS = [
  'Free estimates — no appointment',
  'All insurance accepted',
  'Direct billing',
  'Мы говорим по-русски',
  'Mon–Fri 8AM–5PM',
  'Factory-spec repairs',
];

export const IMAGES = Object.fromEntries(
  [
    'hero.jpg',
    'engine-detail.jpg',
    'driveaway.jpg',
    'collision-repair.jpg',
    'paint-refinish.jpg',
    'why-choose-us.jpg',
  ].map((f) => [f.replace('.jpg', ''), new URL(`../assets/${f}`, import.meta.url).href]),
);
