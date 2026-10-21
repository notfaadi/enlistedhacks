export const LEVOCHEATS_AFFILIATE = 'FDI';

/** @param {string} storePath e.g. `/cloud-dma` */
export function levocheatsGo(storePath) {
  const path = storePath.startsWith('/') ? storePath : `/${storePath}`;
  return `https://levocheats.com/go/${LEVOCHEATS_AFFILIATE}?to=${encodeURIComponent(path)}`;
}

/** Levocheats enlisted hacks store page (tiers / default checkout). */
export const LEVOCHEATS_ENLISTED_CHECKOUT = levocheatsGo('/enlisted-cheats');

/** Internal product slug → Levocheats store path (affiliate go link resolves to product page). */
export const LEVOCHEATS_STORE_PATH_BY_SLUG = {
  lite: '/enlisted-cheats',
  pro: '/enlisted-cheats',
  elite: '/enlisted-cheats',
  enlisted: '/enlisted-cheats',
  'cloud-dma': '/cloud-dma',
  'hwid-spoofer': '/hwid-spoofer',
  ugc: '/ugc',
  'unlock-all': '/skin-changer',
};

/** @param {string} productSlug */
export function levocheatsCheckoutForSlug(productSlug) {
  const storePath =
    LEVOCHEATS_STORE_PATH_BY_SLUG[productSlug] ?? LEVOCHEATS_STORE_PATH_BY_SLUG.enlisted;
  return levocheatsGo(storePath);
}

/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  enlisted: LEVOCHEATS_ENLISTED_CHECKOUT,
  skinChanger: levocheatsGo('/skin-changer'),
  hwidSpoofer: levocheatsGo('/hwid-spoofer'),
  ugc: levocheatsGo('/ugc'),
};

/** Checkout paths → Levocheats (legacy /go/* bookmarks still work). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/enlisted', CHECKOUT_URLS.enlisted],
  ['/go/enlisted/', CHECKOUT_URLS.enlisted],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
