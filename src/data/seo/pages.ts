import { GLOBAL_KEYWORDS } from './constants';
import type { SeoRouteKey } from './locales';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PageMeta {
  route: SeoRouteKey;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  keywords: string;
  breadcrumbs: BreadcrumbItem[];
  includeProduct?: boolean;
  includeFaqPage?: boolean;
  includeBlogCollection?: boolean;
  includeReviewItemList?: boolean;
}

const kw = (extra: string) => `${GLOBAL_KEYWORDS}, ${extra}`;

export const PAGE_META: Record<SeoRouteKey, PageMeta> = {
  '/': {
    route: '/',
    title: 'Buy Undetected Enlisted Hacks | Aimbot, ESP & Wallhack',
    description:
      'Buy undetected Enlisted hacks for Windows PC — aimbot, ESP, wallhack, radar and Cloud DMA plans. Updated after Easy Anti-Cheat patches with instant delivery.',
    ogImage: '/images/enlisted-hacks-hero-1024w.webp',
    ogImageAlt: 'Enlisted Hacks homepage hero — ESP and aimbot for Enlisted',
    keywords: kw('enlisted hacks official site, enlisted hacks pc, buy enlisted hacks'),
    breadcrumbs: [{ name: 'Home', path: '/' }],
    includeProduct: true,
    includeFaqPage: true,
  },
  '/enlisted-hacks/': {
    route: '/enlisted-hacks/',
    title: 'Enlisted Hacks | Undetected ESP & Aimbot',
    description:
      'Buy undetected enlisted hacks for Enlisted on Windows PC. ESP, aimbot, skeleton, health, vehicles, recoil control, and streamproof mode with instant delivery.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks product page — ESP, aimbot, and radar',
    keywords: kw('undetected enlisted hacks, enlisted cheat package, instant delivery'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Enlisted Hacks', path: '/enlisted-hacks/' },
    ],
    includeProduct: true,
  },
  '/features/': {
    route: '/features/',
    title: 'Enlisted Features | Enlisted Hacks',
    description:
      'Everything in one Enlisted license for Windows PC — ESP, aimbot, skeleton, health, vehicles, recoil control, and streamproof mode with Easy Anti-Cheat updates.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks features — ESP, soft aim, and radar screenshots',
    keywords: kw('enlisted esp, enlisted aimbot, skeleton esp, vehicle esp, recoil control, streamproof mode'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Features', path: '/features/' },
    ],
  },
  '/pricing/': {
    route: '/pricing/',
    title: 'Enlisted Store | Enlisted Hacks',
    description:
      'Enlisted Cloud DMA plans for Windows PC — 1 week, 1 month, or lifetime. Aimbot, ESP and wallhack with instant Levocheats delivery.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks Cloud DMA store plans',
    keywords: kw('enlisted hacks price, enlisted cloud dma, enlisted cheats monthly, enlisted hacks lifetime'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Store', path: '/pricing/' },
    ],
    includeProduct: true,
  },
  '/enlisted-esp/': {
    route: '/enlisted-esp/',
    title: 'Enlisted ESP | Enlisted Hacks',
    description:
      'Enlisted ESP and skeleton overlay for Enlisted on Windows PC — player boxes, health bars, distance, and clear overlays in squad battles.',
    ogImage: '/images/enlisted-hacks-esp.webp',
    ogImageAlt: 'Enlisted ESP player boxes and distance readouts in a raid',
    keywords: kw('enlisted esp, enlisted wallhack, player boxes, health bars, distance readouts'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'ESP', path: '/enlisted-esp/' },
    ],
  },
  '/enlisted-aimbot/': {
    route: '/enlisted-aimbot/',
    title: 'Enlisted Aimbot | Enlisted Hacks',
    description:
      'Enlisted aimbot and recoil control for Enlisted on Windows PC — FOV, smoothness, bone priority, and recoil compensation you can tune per weapon.',
    ogImage: '/images/enlisted-hacks-aimbot.webp',
    ogImageAlt: 'Enlisted aimbot and soft aim controls on Windows PC',
    keywords: kw('enlisted aimbot, soft aim, fov, smoothness, bone priority, recoil control'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Aimbot', path: '/enlisted-aimbot/' },
    ],
  },
  '/enlisted-vehicles/': {
    route: '/enlisted-vehicles/',
    title: 'Enlisted Vehicles | Enlisted Hacks',
    description:
      'Enlisted vehicle ESP for Enlisted on Windows PC — tank, aircraft, and armored vehicle detection with distance readouts.',
    ogImage: '/images/enlisted-hacks-esp.webp',
    ogImageAlt: 'Enlisted 2D radar overlay showing nearby threats',
    keywords: kw('enlisted vehicle esp, tank esp, aircraft detection, 2d radar'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Vehicles', path: '/enlisted-vehicles/' },
    ],
  },
  '/faq/': {
    route: '/faq/',
    title: 'Enlisted FAQ | Enlisted Hacks',
    description:
      'Short answers about Enlisted Hacks for Enlisted — delivery, setup, Easy Anti-Cheat updates, refunds, and Windows PC system notes before you buy.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks FAQ — delivery, setup, and update answers',
    keywords: kw('enlisted hacks faq, easy anti-cheat, enlisted hacks delivery, refunds'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq/' },
    ],
    includeFaqPage: true,
  },
  '/updates/': {
    route: '/updates/',
    title: 'Enlisted Status | Enlisted Hacks',
    description:
      'Live undetected status for Enlisted Hacks after Enlisted or Easy Anti-Cheat patches. Check here before you queue a battle on Windows PC today.',
    ogImage: '/images/enlisted-hacks-hero-1024w.webp',
    ogImageAlt: 'Enlisted Hacks live status after Easy Anti-Cheat and game patches',
    keywords: kw('enlisted hacks status, undetected, anti-cheat updates, patch rebuilds'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Status', path: '/updates/' },
    ],
  },
  '/setup/': {
    route: '/setup/',
    title: 'Enlisted Setup | Enlisted Hacks',
    description:
      'Install and launch Enlisted Hacks on Windows PC after checkout. Short setup steps so you can battle faster. Follow each step before your first match.',
    ogImage: '/images/enlisted-hacks-esp.webp',
    ogImageAlt: 'Enlisted Hacks setup guide screenshot for Windows PC',
    keywords: kw('enlisted hacks setup, how to install enlisted hacks'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Setup', path: '/setup/' },
    ],
  },
  '/support/': {
    route: '/support/',
    title: 'Enlisted Support | Enlisted Hacks',
    description:
      'Get help with Enlisted Hacks on Windows PC. Email support@enlistedhacks.net with your order ID for setup, delivery, or billing help after you buy.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks support page for license and setup help',
    keywords: kw('enlisted hacks support, license help'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Support', path: '/support/' },
    ],
  },
  '/reviews/': {
    route: '/reviews/',
    title: 'Enlisted Hacks Reviews | Buyer Feedback',
    description:
      'Buyer reviews for Enlisted Hacks — ESP, aimbot, skeleton, vehicles, and patch updates for Enlisted on Windows PC. Real feedback from license holders.',
    ogImage: '/images/enlisted-hacks-hero-1024w.webp',
    ogImageAlt: 'Enlisted Hacks customer reviews',
    keywords: kw('enlisted hacks reviews, buyer feedback'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Reviews', path: '/reviews/' },
    ],
    includeReviewItemList: true,
  },
  '/blog/': {
    route: '/blog/',
    title: 'Enlisted Intel | Enlisted Hacks',
    description:
      'Guides and notes for Enlisted — aim settings, ESP tips, vehicle combat, recoil control, and Easy Anti-Cheat update coverage for Windows PC players.',
    ogImage: '/images/enlisted-hacks-hero-1024w.webp',
    ogImageAlt: 'Enlisted Hacks Intel',
    keywords: kw('enlisted guides, enlisted tips, patch notes, scav runs, loot routes'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Intel', path: '/blog/' },
    ],
    includeBlogCollection: true,
  },
  '/privacy-policy/': {
    route: '/privacy-policy/',
    title: 'Privacy Policy | Enlisted Hacks',
    description:
      'Privacy policy for Enlisted Hacks. How we handle support emails, order data, and checkout for enlisted hacks licenses on enlistedhacks.net.',
    ogImage: '/images/enlisted-hacks-aimbot.webp',
    ogImageAlt: 'Enlisted Hacks privacy policy page',
    keywords: kw('enlisted hacks privacy policy'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy/' },
    ],
  },
  '/terms/': {
    route: '/terms/',
    title: 'Terms of Use 2026 | Enlisted Hacks Rules',
    description:
      'Terms of use for enlistedhacks.net and Enlisted Hacks licenses. Usage rules, anti-cheat risk, and liability for Windows PC cheats.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks terms of use page',
    keywords: kw('enlisted hacks terms of use'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms/' },
    ],
  },
  '/refund-policy/': {
    route: '/refund-policy/',
    title: 'Refund Policy | Enlisted Hacks',
    description:
      'Refund policy for Enlisted Hacks. Digital delivery terms and eligibility for enlisted hacks packages with ESP, soft aim, and radar.',
    ogImage: '/images/enlisted-hacks-combat.webp',
    ogImageAlt: 'Enlisted Hacks refund policy page',
    keywords: kw('enlisted hacks refund policy'),
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Refund Policy', path: '/refund-policy/' },
    ],
  },
};

/** Minimal head tags for 404 — noindex in layout; no keywords or rich schema. */
export const ERROR_404_PAGE_META: PageMeta = {
  route: '/',
  title: '404 Not Found',
  description: 'The requested URL is not available on this site.',
  ogImage: '/images/enlisted-hacks-hero-1024w.webp',
  ogImageAlt: '',
  keywords: '',
  breadcrumbs: [],
  includeProduct: false,
  includeFaqPage: false,
  includeBlogCollection: false,
  includeReviewItemList: false,
};
