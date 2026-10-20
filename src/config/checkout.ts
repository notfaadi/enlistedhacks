import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  enlisted: 'enlisted',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Checkout href for buttons and CTAs (enlisted = direct Levocheats URL). */
export function checkoutPath(product: CheckoutProduct = 'enlisted'): string {
  if (product === 'enlisted') {
    return CHECKOUT.enlisted;
  }
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('enlisted');

/** Levocheats enlisted checkout (same as Buy now on hack tiers). */
export const ENLISTED_CHECKOUT_URL = CHECKOUT.enlisted;

/** Open off-site checkout in a new tab when href is absolute. */
export function externalCheckoutLinkAttrs(href: string): Record<string, string> {
  if (!href.startsWith('http')) return {};
  return { target: '_blank', rel: 'noopener noreferrer' };
}

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'unlock-all':
      return checkoutPath('skinChanger');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'cloud-dma':
      return checkoutPath('enlisted');
    case 'lite':
    case 'pro':
    case 'elite':
    default:
      return checkoutPath('enlisted');
  }
}

/** Resolve blog CTA or legacy href values to checkout URLs. */
export function resolveCheckoutHref(href: string): string {
  const path = href.startsWith('/') ? href : `/${href}`;
  if (path === '/go/enlisted/' || path === '/go/enlisted') {
    return CHECKOUT.enlisted;
  }

  if (!href.startsWith('http')) {
    return path;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  // Legacy / encoded product paths → internal checkout
  if (
    href.includes('%2Fproducts%2Fcloud-dma') ||
    href.includes('/products/cloud-dma') ||
    href.includes('/products/enlisted-hacks/cloud-dma')
  ) {
    return checkoutPath('enlisted');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return checkoutPath('skinChanger');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (href.includes('%2Fproducts%2Fenlisted') || href.includes('/products/enlisted')) {
    return checkoutPath('enlisted');
  }

  return href;
}
