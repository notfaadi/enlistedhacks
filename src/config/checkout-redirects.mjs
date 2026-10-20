/** Checkout destinations keyed by internal product id (no affiliate codes). */
export const CHECKOUT_URLS = {
  enlisted: 'https://levocheats.com/go/FDI?to=%2Fenlisted-cheats',
  skinChanger: 'https://zadeyo.com/products/skin-changer',
  hwidSpoofer: 'https://zadeyo.com/products/hwid-spoofer',
  ugc: 'https://zadeyo.com/products/ugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
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
