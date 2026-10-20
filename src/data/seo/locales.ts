/** Supported hreflang locales (22). */
export const SEO_LOCALES = [
  'en',
  'es',
  'fr',
  'de',
  'pt',
  'it',
  'nl',
  'pl',
  'ru',
  'tr',
  'ar',
  'ja',
  'ko',
  'zh',
  'hi',
  'id',
  'th',
  'vi',
  'uk',
  'cs',
  'ro',
  'sv',
] as const;

export type SeoLocale = (typeof SEO_LOCALES)[number];

export type SeoRouteKey =
  | '/'
  | '/enlisted-hacks/'
  | '/features/'
  | '/pricing/'
  | '/enlisted-esp/'
  | '/enlisted-aimbot/'
  | '/enlisted-vehicles/'
  | '/faq/'
  | '/updates/'
  | '/setup/'
  | '/support/'
  | '/reviews/'
  | '/blog/'
  | '/privacy-policy/'
  | '/terms/'
  | '/refund-policy/';

/** English canonical paths per route key. */
export const EN_PATH_BY_ROUTE: Record<SeoRouteKey, string> = {
  '/': '/',
  '/enlisted-hacks/': '/enlisted-hacks/',
  '/features/': '/features/',
  '/pricing/': '/pricing/',
  '/enlisted-esp/': '/enlisted-esp/',
  '/enlisted-aimbot/': '/enlisted-aimbot/',
  '/enlisted-vehicles/': '/enlisted-vehicles/',
  '/faq/': '/faq/',
  '/updates/': '/updates/',
  '/setup/': '/setup/',
  '/support/': '/support/',
  '/reviews/': '/reviews/',
  '/blog/': '/blog/',
  '/privacy-policy/': '/privacy-policy/',
  '/terms/': '/terms/',
  '/refund-policy/': '/refund-policy/',
};

/**
 * Localized path segments (leading/trailing slash) per locale.
 * Locales omitted fall back to English path under `/{locale}/…`.
 */
const LOCALIZED: Partial<Record<SeoRouteKey, Partial<Record<SeoLocale, string>>>> = {
  '/': {
    en: '/',
    es: '/es/',
    fr: '/fr/',
    de: '/de/',
    pt: '/pt/',
    it: '/it/',
    nl: '/nl/',
    pl: '/pl/',
    ru: '/ru/',
    tr: '/tr/',
    ar: '/ar/',
    ja: '/ja/',
    ko: '/ko/',
    zh: '/zh/',
    hi: '/hi/',
    id: '/id/',
    th: '/th/',
    vi: '/vi/',
    uk: '/uk/',
    cs: '/cs/',
    ro: '/ro/',
    sv: '/sv/',
  },
  '/blog/': {
    en: '/blog/',
    es: '/blog/',
    fr: '/blog/',
    de: '/blog/',
    pt: '/blog/',
    it: '/blog/',
    nl: '/blog/',
    pl: '/blog/',
    ru: '/blog/',
    tr: '/blog/',
    ar: '/blog/',
    ja: '/blog/',
    ko: '/blog/',
    zh: '/blog/',
    hi: '/blog/',
    id: '/blog/',
    th: '/blog/',
    vi: '/blog/',
    uk: '/blog/',
    cs: '/blog/',
    ro: '/blog/',
    sv: '/blog/',
  },
  '/features/': {
    es: '/es/caracteristicas-trucos-enlisted/',
    fr: '/fr/fonctionnalites-triche-enlisted/',
    ru: '/ru/funkcii-chitov-enlisted/',
    tr: '/tr/enlisted-hile-ozellikleri/',
    uk: '/uk/funkcii-chitiv-enlisted/',
  },
  '/pricing/': {
    es: '/es/precios-trucos-enlisted/',
    fr: '/fr/prix-triche-enlisted/',
    ru: '/ru/ceny-chitov-enlisted/',
    uk: '/uk/ciny-chitiv-enlisted/',
  },
  '/enlisted-esp/': {
    es: '/es/trucos-enlisted-esp/',
    de: '/de/enlisted-esp-wallhack/',
    ru: '/ru/enlisted-esp-chity/',
  },
  '/enlisted-aimbot/': {
    es: '/es/trucos-enlisted-aimbot/',
    ru: '/ru/enlisted-aimbot-chity/',
  },
  '/enlisted-vehicles/': {
    es: '/es/radar-hack-trucos-enlisted/',
    ru: '/ru/radar-hack-chity-enlisted/',
  },
  '/faq/': {
    es: '/es/preguntas-trucos-enlisted/',
    ru: '/ru/faq-chitov-enlisted/',
  },
  '/updates/': {
    es: '/es/actualizaciones-trucos-enlisted/',
    ru: '/ru/obnovleniya-chitov-enlisted/',
  },
  '/setup/': {
    es: '/es/instalacion-trucos-enlisted/',
    ru: '/ru/ustanovka-chitov-enlisted/',
  },
  '/support/': {
    es: '/es/soporte-trucos-enlisted/',
    ru: '/ru/podderzhka-chitov-enlisted/',
  },
  '/privacy-policy/': {
    es: '/es/politica-privacidad/',
    de: '/de/datenschutz/',
    ru: '/ru/politika-konfidencialnosti/',
  },
  '/terms/': {
    es: '/es/terminos-uso/',
    de: '/de/nutzungsbedingungen/',
    ru: '/ru/usloviya-ispolzovaniya/',
  },
  '/refund-policy/': {
    es: '/es/politica-reembolso/',
    de: '/de/rueckerstattung/',
    ru: '/ru/politika-vozvrata/',
  },
  '/enlisted-hacks/': {
    es: '/es/hacks-trucos-enlisted/',
    fr: '/fr/hacks-triche-enlisted/',
    ru: '/ru/haksy-chity-enlisted/',
  },
};

export function localePathForRoute(route: SeoRouteKey, locale: SeoLocale): string {
  const enPath = EN_PATH_BY_ROUTE[route];
  const map = LOCALIZED[route];
  if (map?.[locale]) return map[locale]!;
  if (locale === 'en') return enPath;
  if (route === '/' || route === '/blog/') {
    return locale === 'en' ? enPath : `/${locale}/`;
  }
  if (route === '/blog/') return '/blog/';
  const stripped = enPath.replace(/^\//, '').replace(/\/$/, '');
  return `/${locale}/${stripped}/`;
}

export function buildHreflangAlternates(
  route: SeoRouteKey,
  origin: string,
): { hreflang: string; href: string }[] {
  const links = SEO_LOCALES.map((locale) => ({
    hreflang: locale,
    href: `${origin}${localePathForRoute(route, locale)}`,
  }));
  links.push({
    hreflang: 'x-default',
    href: `${origin}${EN_PATH_BY_ROUTE[route]}`,
  });
  return links;
}

/** Map live Astro paths to SEO route keys. */
export const PATH_TO_SEO_ROUTE: Record<string, SeoRouteKey> = {
  '/': '/',
  '/enlisted-hacks/': '/enlisted-hacks/',
  '/products/enlisted-hacks/': '/enlisted-hacks/',
  '/features/': '/features/',
  '/pricing/': '/pricing/',
  '/enlisted-esp/': '/enlisted-esp/',
  '/enlisted-aimbot/': '/enlisted-aimbot/',
  '/enlisted-vehicles/': '/enlisted-vehicles/',
  '/faq/': '/faq/',
  '/updates/': '/updates/',
  '/setup/': '/setup/',
  '/support/': '/support/',
  '/reviews/': '/reviews/',
  '/blog/': '/blog/',
  '/privacy-policy/': '/privacy-policy/',
  '/privacy/': '/privacy-policy/',
  '/terms/': '/terms/',
  '/refund-policy/': '/refund-policy/',
};

export function normalizePathname(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function seoRouteFromPathname(pathname: string): SeoRouteKey | undefined {
  const path = normalizePathname(pathname);
  return PATH_TO_SEO_ROUTE[path];
}
