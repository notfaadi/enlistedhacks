/**
 * Single source of truth for page metadata (titles, descriptions, OG, keywords, schema flags).
 * @see docs/SEO.md
 */
export type { PageMeta, BreadcrumbItem } from './seo/pages';
export { PAGE_META } from './seo/pages';
export type { SeoRouteKey, SeoLocale } from './seo/locales';
export {
  SEO_LOCALES,
  buildHreflangAlternates,
  seoRouteFromPathname,
  normalizePathname,
  PATH_TO_SEO_ROUTE,
  EN_PATH_BY_ROUTE,
  localePathForRoute,
} from './seo/locales';
export {
  SEO_SITE_ORIGIN,
  SEO_SITE_NAME,
  SEO_SUPPORT_EMAIL,
  SEO_ROBOTS,
  SEO_THEME_COLOR,
  SEO_AUTHOR,
  SEO_OG_IMAGE_WIDTH,
  SEO_OG_IMAGE_HEIGHT,
  SEO_OG_IMAGE_TYPE,
} from './seo/constants';

import { PAGE_META, type PageMeta } from './seo/pages';
import {
  EN_PATH_BY_ROUTE,
  normalizePathname,
  seoRouteFromPathname,
  type SeoRouteKey,
} from './seo/locales';
import { SEO_SITE_ORIGIN } from './seo/constants';

export function getPageMeta(route: SeoRouteKey): PageMeta {
  return PAGE_META[route];
}

export function getPageMetaForPath(pathname: string): PageMeta {
  const route = seoRouteFromPathname(pathname);
  if (route) return PAGE_META[route];
  return PAGE_META['/'];
}

export function canonicalForRoute(route: SeoRouteKey): string {
  return `${SEO_SITE_ORIGIN}${EN_PATH_BY_ROUTE[route]}`;
}

export function canonicalForPathname(pathname: string): string {
  const route = seoRouteFromPathname(pathname);
  if (route) return canonicalForRoute(route);
  return `${SEO_SITE_ORIGIN}${normalizePathname(pathname)}`;
}

/** Override selected fields while keeping the SEO route key (for blog posts, products, 404). */
export function mergePageMeta(
  base: PageMeta,
  overrides: Partial<Omit<PageMeta, 'route'>>,
): PageMeta {
  return { ...base, ...overrides, route: base.route };
}
