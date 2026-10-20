/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Buy Undetected Enlisted Hacks | Aimbot, ESP & Wallhack',
    description:
      'Buy undetected Enlisted Hacks for PC — aimbot, ESP, wallhack, radar, loot radar and uniform changer. Updated after every BattlEye patch.',
  },
  '/products/enlisted-hacks/': {
    title: 'Buy Enlisted Hacks | Elite, HWID Spoofer & Uniform changer',
    description:
      'Shop Enlisted Hacks for PC: Elite aimbot & ESP wallhack, HWID spoofer, UGC recovery and Uniform changer. Instant delivery after checkout.',
  },
  '/products/enlisted-hacks/elite/': {
    title: 'Buy Enlisted Elite Hacks | Aimbot, ESP & Loot Assist',
    description:
      'Buy Enlisted Elite hacks with aimbot, ESP wallhack, loot assist, Auto Finish, Uniform changer and priority BattlEye patch updates.',
  },
  '/products/enlisted-hacks/cloud-dma/': {
    title: 'Buy Enlisted Cloud DMA | Aimbot, ESP & Wallhack',
    description:
      'Buy Enlisted Cloud DMA for Aimbot, ESP and Wallhack over hardware DMA—cloud firmware, profile sync and patch updates on supported PC setups.',
  },
  '/products/enlisted-hacks/hwid-spoofer/': {
    title: 'Buy Enlisted HWID Spoofer | Hardware Ban Bypass',
    description:
      'Buy a Enlisted HWID spoofer for PC hardware bans — disk/MAC tools, compatibility scan and post-spoof checks before you launch hacks again.',
  },
  '/products/enlisted-hacks/ugc/': {
    title: 'Buy Enlisted UGC | BattlEye & Epic Ban Appeal Tools',
    description:
      'Buy Enlisted UGC (Unban & Governance Control) to organize Epic and BattlEye ban appeals, dispute workflows and case tracking.',
  },
  '/products/enlisted-hacks/unlock-all/': {
    title: 'Buy Enlisted Uniform changer | Unlock all uniforms Cosmetics',
    description:
      'Buy Enlisted Uniform changer / Unlock all uniforms — local outfit, wrap and pickaxe previews with your Enlisted Hacks loadout.',
  },
  '/products/enlisted-hacks/utilities/': {
    title: 'Buy Enlisted Hack Utilities | HWID, UGC & Uniform changer',
    description:
      'Buy Enlisted hack utilities: HWID spoofer after hardware bans, UGC for Epic/BattlEye appeals, and local Uniform changer / Unlock all uniforms.',
  },
  '/blog/': {
    title: 'Enlisted Hack Guides | Aimbot, ESP Wallhack & EAC',
    description:
      'Read Enlisted hack guides on aimbot setup, ESP wallhack, Lite vs Pro, Custom battle practice and BattlEye patch-day checks.',
  },
  '/forum/': {
    title: 'Enlisted Hacks Forum | Aimbot, ESP & Setup Help',
    description:
      'Enlisted Hacks forum for aimbot configs, ESP wallhack setup, BattlEye status and product questions before you buy.',
  },
  '/faq/': {
    title: 'Enlisted Hacks FAQ | Aimbot, ESP, Bans & Setup',
    description:
      'Enlisted Hacks FAQ — tiers, aimbot, ESP wallhack, radar, HWID spoofer, Uniform changer, bans and loader setup before checkout.',
  },
  '/terms/': {
    title: 'Terms for Enlisted Hacks | License & Refunds',
    description:
      'Terms for buying Enlisted Hacks on enlistedhacks.net — license use, delivery, refunds and account risk.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Enlisted Hacks Shop',
    description:
      'How the Enlisted Hacks shop at enlistedhacks.net uses analytics, cookies and contact data.',
  },
  '/about/': {
    title: 'About Enlisted Hacks | Buy PC Aimbot & ESP',
    description:
      'About Enlisted Hacks — we sell PC Enlisted Hacks (aimbot, ESP, wallhack), guides and utilities at enlistedhacks.net.',
  },
  '/support/': {
    title: 'Enlisted Hacks Support | Loader, HWID & Checkout',
    description:
      'Enlisted Hacks support for loader setup, aimbot/ESP configs, HWID spoofing and checkout help — 24/7 Discord.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
