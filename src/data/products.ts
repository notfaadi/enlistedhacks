import { t } from '../i18n';
import { ENLISTED_CHECKOUT_URL } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['enlisted-esp-wallhack-setup', 'enlisted-lite-vs-pro', 'enlisted-radar-hack-guide', 'eac-patch-day-checklist'],
  pro: [
    'enlisted-aimbot-ranked-guide',
    'enlisted-aimbot-combat-guide',
    'enlisted-lite-vs-pro',
    'enlisted-stream-proof-setup',
  ],
  elite: [
    'enlisted-elite-tier-guide',
    'enlisted-cheats-features-guide',
    'enlisted-esp-wallhack-setup',
    'eac-patch-day-checklist',
    'how-to-buy-enlisted-cheats-2026',
  ],
  'hwid-spoofer': [
    'enlisted-hwid-spoofer-after-ban',
    'eac-bypass-enlisted-guide',
    'eac-patch-day-checklist',
    'enlisted-external-cheat-guide',
  ],
  ugc: [
    'eac-bypass-enlisted-guide',
    'enlisted-hwid-spoofer-after-ban',
    'how-to-buy-enlisted-cheats-2026',
  ],
  'unlock-all': [
    'enlisted-skin-changer-guide',
    'enlisted-cheats-features-guide',
    'enlisted-stream-proof-setup',
  ],
  'cloud-dma': [
    'enlisted-external-cheat-guide',
    'eac-patch-day-checklist',
    'how-to-buy-enlisted-cheats-2026',
  ],
};

const productBase = '/products/enlisted-hacks/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on enlistedhacks.net and Discord #status before purchase—especially after a Enlisted or BattlEye update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite Enlisted Hacks or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Gaijin platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue ranked or Combined arms.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Enlisted and BattlEye receive frequent updates. Confirm module availability on the live status panel at enlistedhacks.net before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Enlisted can violate Epic Terms of Service and lead to BattlEye bans or account action. You use this software at your own risk. Compatibility and availability can change after game, EAC, or Windows updates without notice.';

const enlistedSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqEpic', text: 'Current Enlisted client via Gaijin with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Enlisted published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/enlisted-esp-wallhack.png`,
    alt: 'Enlisted ESP wallhack with player boxes, tracers, and squad overlay in urban combat',
    caption: 'ESP wallhack',
    captionDesc: 'Live Enlisted hack overlay — boxes, tracers, and squad ESP.',
  },
  gpScripts: {
    src: `${gameplay}/enlisted-aimbot-combat.png`,
    alt: 'Enlisted infantry firefight with bolt-action rifles — official in-game screenshot',
    caption: 'Infantry combat',
    captionDesc: 'Close-quarters rifle engagements on PC.',
  },
  gpZoomHack: {
    src: `${gameplay}/enlisted-radar-hack.png`,
    alt: 'Enlisted battle with tanks and soldiers on an open field — official in-game screenshot',
    caption: 'Combined arms',
    captionDesc: 'Tanks and infantry fighting together.',
  },
  gpSkinChanger: {
    src: `${gameplay}/enlisted-skin-changer.png`,
    alt: 'Enlisted soldier aiming down sights in winter gear — official in-game screenshot',
    caption: 'Squad leader',
    captionDesc: 'First-person squad command in Enlisted.',
  },
  gpAutoKill: {
    src: `${gameplay}/enlisted-auto-aim.png`,
    alt: 'Enlisted sniper overlooking a battlefield from cover — official in-game screenshot',
    caption: 'Marksman',
    captionDesc: 'Long-range positioning and line of sight.',
  },
  gpFarmBot: {
    src: `${gameplay}/enlisted-loot-radar.png`,
    alt: 'Enlisted soldiers moving through rubble and debris — official in-game screenshot',
    caption: 'Objective push',
    captionDesc: 'Advance through destroyed streets.',
  },
  gpHeroEsp: {
    src: `${gameplay}/enlisted-player-esp.png`,
    alt: 'Enlisted multiplayer battle with multiple soldiers in frame — official in-game screenshot',
    caption: 'Squad fight',
    captionDesc: 'Large-scale WW2 multiplayer on PC.',
  },
  gpThermal: {
    src: `${gameplay}/enlisted-thermal-esp.png`,
    alt: 'Enlisted night or low-light combat scene — official in-game screenshot',
    caption: 'Low visibility',
    captionDesc: 'Fight through smoke, dust, and weather.',
  },
  gpBuildFight: {
    src: `${gameplay}/enlisted-build-fight-esp.png`,
    alt: 'Enlisted close combat inside damaged buildings — official in-game screenshot',
    caption: 'CQB',
    captionDesc: 'Room clearing and building fights.',
  },
  gpArena: {
    src: `${gameplay}/enlisted-arena-wallhack.png`,
    alt: 'Enlisted custom battle with heavy weapons deployed — official in-game screenshot',
    caption: 'Heavy weapons',
    captionDesc: 'Machine guns and explosives in action.',
  },
  gpSpawn: {
    src: `${gameplay}/enlisted-spawn-island-esp.png`,
    alt: 'Enlisted soldiers deploying at the start of a match — official in-game screenshot',
    caption: 'Deployment',
    captionDesc: 'Spawn in with your AI squad.',
  },
  gpLongRange: {
    src: `${gameplay}/enlisted-long-range-esp.png`,
    alt: 'Enlisted wide battlefield view with artillery and infantry — official in-game screenshot',
    caption: 'Front line',
    captionDesc: 'Large maps with dozens of players.',
  },
  gpAimLock: {
    src: `${gameplay}/enlisted-aimbot-lock.png`,
    alt: 'Enlisted soldier engaging enemies across an open field — official in-game screenshot',
    caption: 'Open field',
    captionDesc: 'Track targets at medium range.',
  },
  gpChams: {
    src: `${gameplay}/enlisted-chams-esp.png`,
    alt: 'Enlisted naval or coastal invasion scene — official in-game screenshot',
    caption: 'Amphibious assault',
    captionDesc: 'Landings and beachhead fights.',
  },
  gpSquad: {
    src: `${gameplay}/enlisted-squad-esp.png`,
    alt: 'Enlisted AI squad following the player through a village — official in-game screenshot',
    caption: 'AI squad',
    captionDesc: 'Command riflemen, medics, and engineers.',
  },
  gpCombat: {
    src: `${gameplay}/enlisted-combat-esp.png`,
    alt: 'Enlisted intense firefight with explosions and tracers — official in-game screenshot',
    caption: 'All-out war',
    captionDesc: '100-player WW2 battles on PC.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'enlisted-hacks';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Enlisted Lite is built for players who want map awareness first. In ranked, knowing enemy positions, chest locations and loot timings wins more fights than raw mechanics—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Enlisted Pro is the sweet spot for ranked grinders. Aimbot, Smooth Aim and Sticky Aim help you win squad fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Bone Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with aimbot that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Enlisted Elite is the private build for players who want everything—Loot Assist, Auto Finish, Auto suppression break, Uniform changer, full ESP wallhack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, chest and reboot-van locator, loot spawn timers, radar hack, and stream-safe overlay hiding. Config presets for squad battles and combined arms ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Sticky Aim with Prediction, Bone Priority and hotkey macros for heals and mobility. Smoothness sliders tunes cast timing so aimbot stay natural in ranked. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at enlistedhacks.net—enough firepower for high-rank lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first ranked session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Loot Assist, Rotation Assist AI, Auto Finish, Auto suppression break, Uniform changer and full ESP wallhack with smoke alerts. Use lobby testing before ranked—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Gaijin accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only BattlEye cases; see [UGC](/products/enlisted-hacks/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative hack profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Gaijin account restrictions, BattlEye bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some BattlEye bans cannot be reversed. UGC organizes evidence and follow-ups for Epic review. Pair with [HWID Spoofer](/products/enlisted-hacks/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Uniform changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
  'cloud-dma': [
    { type: 'h2', text: 'What Cloud DMA is' },
    {
      type: 'p',
      text: 'Cloud DMA delivers Aimbot, ESP and wallhack configs plus firmware and offset updates from our portal to your supported DMA hardware—your main PC runs the game while DMA-side logic stays on the card + cloud pipeline.',
    },
    { type: 'h2', text: 'Before you buy' },
    {
      type: 'p',
      text: 'You need compatible DMA hardware and a second PC or laptop for the radar/overlay path. Open Discord after checkout for onboarding and a hardware compatibility check.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpLongRange', 'gpSquad'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: enlistedSystemRequirements,
    fullFeatures: [
      'Player ESP & player boxes',
      'Chest & loot locator',
      'POI awareness',
      'Health & shield tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar hack',
      'Combined arms preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Enlisted Lite: ESP and radar',
      paragraphs: [
        'Lite is for player ESP, chest markers, loot timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in squad battles and combined arms without combat automation. Overlays are updated after Enlisted patches.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpAimLock', 'gpCombat'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: enlistedSystemRequirements,
    fullFeatures: [
      'All Lite ESP & ESP wallhack modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Bone Priority',
      'Hotkey macros (heals/shields)',
      'Auto Heal',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Enlisted Pro: aimbot plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for squad battles and combined arms. Bone priority and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpThermal', 'gpBuildFight'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: enlistedSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Loot Assist',
      'Rotation Assist AI',
      'Chest respawn timer',
      'Auto loadout manager',
      'Auto Finish',
      'Auto suppression break',
      'Full ESP wallhack suite',
      'Third-party alert system',
      'Visibility detector',
      'Uniform changer (Unlock all uniforms)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Enlisted Elite: full hack + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus loot assist, Auto Finish, Auto suppression break, Uniform changer, full ESP wallhack and faster patch priority.',
        'Slots are limited. Discord support helps you set safer profiles before Ranked. Check the status banner on enlistedhacks.net before you buy.',
      ],
    },
  },
  'cloud-dma': {
    images: slide('gpArena', 'gpLongRange', 'gpZoomHack'),
    goodToKnow:
      'Cloud DMA requires supported hardware and portal access. Check enlistedhacks.net status and Discord #status before patch days. Staff confirm card compatibility during onboarding.',
    limitations:
      'Not a software-only hack—DMA hardware is required. Unsupported cards and shared PCs may be declined. You accept all risk from hardware and game policy enforcement.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 on game PC and config/radar PC (dual-PC setup recommended).' },
      { icon: 'reqSettings', text: 'Supported DMA hardware with firmware slot for cloud-delivered profiles.' },
      { icon: 'reqWifi', text: 'Stable internet on both machines for portal sync and cloud firmware delivery.' },
      { icon: 'reqCpu', text: 'Follow the portal wiring guide before first Enlisted launch with Cloud DMA.' },
    ],
    fullFeatures: [
      'Aimbot, ESP & wallhack over DMA',
      'Cloud firmware delivery',
      'Portal profile & preset sync',
      'Patch-day DMA offset updates',
      'Dual-PC radar path setup',
      'Discord hardware onboarding',
      'Remote config rollback',
      'Status banner integration',
    ],
    overview: {
      title: 'Enlisted Cloud DMA — Aimbot, ESP & Wallhack',
      paragraphs: [
        'Cloud DMA is for operators who use hardware DMA with Enlisted. Aimbot, ESP and wallhack run on the DMA + cloud pipeline—firmware, configs and post-patch updates ship from the portal instead of loading hack modules on your game PC.',
        'Checkout includes Discord onboarding, compatibility verification and setup docs for supported cards. Cloud profiles cover aimbot smoothness, ESP boxes and wallhack visibility presets.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpSpawn', 'gpArena', 'gpChams'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Enlisted.',
    limitations:
      'Spoofing does not help account-only BattlEye cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Enlisted after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for Enlisted PC bans',
      paragraphs: [
        'Use the HWID Spoofer when BattlEye flags your PC hardware but the Gaijin account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only BattlEye bans. After spoofing, use a safer hack profile before Ranked.',
      ],
    },
  },
  ugc: {
    images: slide('gpZoomHack', 'gpFarmBot', 'gpLongRange'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent BattlEye bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on enlistedhacks.net or at checkout on enlistedhacks.net.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for Gaijin restrictions and BattlEye bans. It does not guarantee an unban.',
        'Track cases, keep evidence in one place and follow up from the dashboard. Discord support can walk you through steps when needed.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpSkinChanger', 'gpChams', 'gpCombat'),
    goodToKnow:
      'Unlock all uniforms previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify game inventory or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: enlistedSystemRequirements,
    fullFeatures: [
      'Outfit skin swap',
      'Skin & wrap preview',
      'Pickaxe & wrap customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Chest & loot replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Uniform changer / Unlock all uniforms',
      paragraphs: [
        'Unlock all uniforms lets you preview outfits, wraps and pickaxes on your Enlisted client. It does not change your game inventory or store purchases.',
        'Only you see the preview skins. Other players see your real inventory. Included with Elite, or buy it alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'Enlisted Lite' : cheat.name === 'Pro' ? 'Enlisted Pro' : 'Enlisted Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: ENLISTED_CHECKOUT_URL,
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: ENLISTED_CHECKOUT_URL,
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimLock', 'gpThermal', 'gpArena');

/** Homepage hero carousel only — keep to 6–7 slides. */
export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpZoomHack',
  'gpHeroEsp',
  'gpAutoKill',
  'gpCombat',
  'gpSquad',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Enlisted Elite hacks with aimbot and ESP, plus HWID spoofer, UGC recovery and Uniform changer for PC.',
  buyUrl: ENLISTED_CHECKOUT_URL,
};
