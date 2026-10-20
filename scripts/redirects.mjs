/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/enlisted-hacks/'],
  ['/cheats/', '/products/enlisted-hacks/'],
  ['/cheats/lite', '/products/enlisted-hacks/'],
  ['/cheats/lite/', '/products/enlisted-hacks/'],
  ['/cheats/pro', '/products/enlisted-hacks/'],
  ['/cheats/pro/', '/products/enlisted-hacks/'],
  ['/cheats/elite', '/products/enlisted-hacks/elite/'],
  ['/cheats/elite/', '/products/enlisted-hacks/elite/'],
  ['/cheats/compare', '/blog/enlisted-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/enlisted-lite-vs-pro/'],
  ['/products/enlisted-hacks/utilities', '/products/enlisted-hacks/utilities/'],
  ['/products/enlisted-hacks', '/products/enlisted-hacks/'],
  ['/products/enlisted-hacks/account-recovery', '/products/enlisted-hacks/ugc/'],
  ['/products/enlisted-hacks/account-recovery/', '/products/enlisted-hacks/ugc/'],
  ['/products/dota-2-cheats', '/products/enlisted-hacks/'],
  ['/products/dota-2-cheats/', '/products/enlisted-hacks/'],
  ['/products/dota-2-cheats/elite', '/products/enlisted-hacks/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/enlisted-hacks/elite/'],
  ['/products/dota-2-cheats/utilities', '/products/enlisted-hacks/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/enlisted-hacks/utilities/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
