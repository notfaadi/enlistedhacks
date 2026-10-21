import {
  CHECKOUT_URLS,
  LEVOCHEATS_ENLISTED_CHECKOUT,
  levocheatsCheckoutForSlug,
} from './checkout-redirects.mjs';

/**
 * External checkout URLs — all products use Levocheats enlisted checkout.
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ legacy redirect routes. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  enlisted: 'enlisted',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Checkout href for every Buy now / header CTA. */
export function checkoutPath(_product: CheckoutProduct = 'enlisted'): string {
  return LEVOCHEATS_ENLISTED_CHECKOUT;
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('enlisted');

export const ENLISTED_CHECKOUT_URL = LEVOCHEATS_ENLISTED_CHECKOUT;

/** Open off-site checkout in a new tab when href is absolute. */
export function externalCheckoutLinkAttrs(href: string): Record<string, string> {
  if (!href.startsWith('http')) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
}

/** Product slug → Levocheats store page for that product. */
export function checkoutForSlug(slug: string): string {
  return levocheatsCheckoutForSlug(slug);
}

/** Levocheats affiliate `?to=` store path → internal product slug. */
function slugFromLevocheatsStorePath(storePath: string): string | null {
  const path = decodeURIComponent(storePath).replace(/\/+$/, '');
  if (/cloud-dma/i.test(path)) return 'cloud-dma';
  if (/hwid-spoofer/i.test(path)) return 'hwid-spoofer';
  if (/unlock-all/i.test(path)) return 'unlock-all';
  if (/\/ugc$/i.test(path) || path === '/ugc' || path === 'ugc') return 'ugc';
  if (/enlisted-cheats/i.test(path)) return 'enlisted';
  const product = path.match(/\/products\/enlisted-hacks\/([^/?#]+)/i)?.[1];
  if (product) return product === 'skin-changer' ? 'unlock-all' : product;
  return null;
}

function slugFromCheckoutHref(href: string): string | null {
  if (href.includes('levocheats.com/go/')) {
    try {
      const to = new URL(href).searchParams.get('to');
      if (to) return slugFromLevocheatsStorePath(to);
    } catch {
      return null;
    }
  }

  const path = href.startsWith('http') ? href : href.startsWith('/') ? href : `/${href}`;

  const product = path.match(/\/products\/enlisted-hacks\/([^/?#]+)/i)?.[1];
  if (product) return product === 'skin-changer' ? 'unlock-all' : product;

  if (path.startsWith('/go/')) {
    const legacy = path.replace(/^\/go\//, '').replace(/\/$/, '');
    if (legacy === 'skin-changer') return 'unlock-all';
    if (legacy === 'enlisted') return 'enlisted';
    if (legacy) return legacy;
  }

  if (/cloud-dma/i.test(path)) return 'cloud-dma';
  if (/hwid-spoofer/i.test(path)) return 'hwid-spoofer';
  if (/unlock-all/i.test(path)) return 'unlock-all';
  if (/\/ugc\b/i.test(path)) return 'ugc';

  return null;
}

/** Resolve blog CTA or legacy href values to Levocheats checkout. */
export function resolveCheckoutHref(href: string): string {
  const path = href.startsWith('/') ? href : `/${href}`;

  if (path.startsWith('/go/')) {
    const slug = slugFromCheckoutHref(path);
    return slug ? checkoutForSlug(slug) : LEVOCHEATS_ENLISTED_CHECKOUT;
  }

  if (!href.startsWith('http')) {
    const slug = slugFromCheckoutHref(href);
    if (slug) return checkoutForSlug(slug);
    return path;
  }

  if (href.includes('zadeyo.com')) {
    return LEVOCHEATS_ENLISTED_CHECKOUT;
  }

  const slug = slugFromCheckoutHref(href);
  if (slug) return checkoutForSlug(slug);

  if (href.includes('levocheats.com')) {
    return href;
  }

  return href;
}
