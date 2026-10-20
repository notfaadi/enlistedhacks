/** Levocheats enlisted checkout — all Buy now buttons use this URL. */
export const LEVOCHEATS_ENLISTED_CHECKOUT =
  'https://levocheats.com/go/FDI?to=%2Fenlisted-cheats';

/** Checkout destinations keyed by internal product id (all → Levocheats enlisted). */
export const CHECKOUT_URLS = {
  enlisted: LEVOCHEATS_ENLISTED_CHECKOUT,
  skinChanger: LEVOCHEATS_ENLISTED_CHECKOUT,
  hwidSpoofer: LEVOCHEATS_ENLISTED_CHECKOUT,
  ugc: LEVOCHEATS_ENLISTED_CHECKOUT,
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
