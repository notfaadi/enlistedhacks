import { CHECKOUT_URLS, LEVOCHEATS_ENLISTED_CHECKOUT } from './checkout-redirects.mjs';

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

/** All product slugs → Levocheats enlisted checkout. */
export function checkoutForSlug(_slug: string): string {
  return LEVOCHEATS_ENLISTED_CHECKOUT;
}

/** Resolve blog CTA or legacy href values to Levocheats checkout. */
export function resolveCheckoutHref(href: string): string {
  const path = href.startsWith('/') ? href : `/${href}`;
  if (path.startsWith('/go/')) {
    return LEVOCHEATS_ENLISTED_CHECKOUT;
  }

  if (!href.startsWith('http')) {
    return path;
  }

  if (href.includes('zadeyo.com') || href.includes('levocheats.com')) {
    return LEVOCHEATS_ENLISTED_CHECKOUT;
  }

  if (
    href.includes('%2Fproducts%2F') ||
    href.includes('/products/enlisted') ||
    href.includes('/products/hwid') ||
    href.includes('/products/ugc') ||
    href.includes('/products/skin')
  ) {
    return LEVOCHEATS_ENLISTED_CHECKOUT;
  }

  return href;
}
