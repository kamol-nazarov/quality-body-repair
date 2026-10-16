export function siteHref(href) {
  if (!href.startsWith('#')) return href;
  if (typeof window === 'undefined') return href;
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return href;
  if (href === '#contact') return '#contact';
  return `/${href}`;
}
