/**
 * Rebrand all user-facing copy to Enlisted Hacks + Enlisted game context.
 * Run: node scripts/rebrand-enlisted-hacks-copy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const TEXT_EXTS = new Set(['.ts', '.tsx', '.astro', '.mjs', '.json', '.md', '.txt', '.webmanifest']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);
const SKIP_FILES = new Set([
  'rebrand-enlisted-hacks-copy.mjs',
  'rebrand-enlisted.mjs',
  'rebrand-fortnite.mjs',
]);

/** Protect URL slugs / paths from word replacements. */
const CODE_PLACEHOLDERS = [
  ['t.cheats', '@@T_CHEATS@@'],
  ['  cheats: {', '@@CHEATS_OBJ@@'],
  ['CheatsSection', '@@CHEATS_SECTION@@'],
  ['cheatPages', '@@CHEAT_PAGES@@'],
  ['cheatPath', '@@CHEAT_PATH@@'],
  ['getCheatPage', '@@GET_CHEAT_PAGE@@'],
  ['getAllCheatSlugs', '@@GET_ALL_CHEAT_SLUGS@@'],
  ['cheatsHubSlides', '@@CHEATS_HUB@@'],
  ['navCheats', '@@NAV_CHEATS@@'],
  ['faqBlogVsCheats', '@@FAQ_BLOG_CHEATS@@'],
  ['faqPrivateCheats', '@@FAQ_PRIVATE_CHEATS@@'],
  ['browseCheats', '@@BROWSE_CHEATS@@'],
  ['browseCheatsMobile', '@@BROWSE_CHEATS_MOB@@'],
  ['id="cheats"', '@@ID_CHEATS@@'],
  ['#cheats', '@@HASH_CHEATS@@'],
  ['cheats-title', '@@CHEATS_TITLE@@'],
  ['cheats-', '@@CHEATS_PREFIX@@'],
  ['product-cheat-page', '@@PRODUCT_CHEAT_PAGE@@'],
];

const SLUG_PLACEHOLDERS = [
  ['enlisted-cheats-features-guide', '@@SLUG_EC_FEATURES@@'],
  ['enlisted-console-cheats-tips', '@@SLUG_EC_CONSOLE_TIPS@@'],
  ['enlisted-console-commands-cheats', '@@SLUG_EC_CONSOLE_CMD@@'],
  ['how-to-use-enlisted-cheat-codes', '@@SLUG_USE_CODES@@'],
  ['enlisted-cheat-codes-guide', '@@SLUG_CODES_GUIDE@@'],
  ['how-to-buy-enlisted-cheats-2026', '@@SLUG_BUY_2026@@'],
  ['/cheats/', '@@PATH_CHEATS@@'],
  ['/products/enlisted-hacks/', '@@PRODUCT_BASE@@'],
];

const REPLACEMENTS = [
  ['Enlisted Hacks & Cheats', 'Enlisted Hacks'],
  ['enlisted hacks & cheats', 'Enlisted hacks'],
  ['Enlisted hacks & cheats', 'Enlisted hacks'],
  ['Easy Anti-Cheat', 'BattlEye'],
  ['easy anti-cheat', 'BattlEye'],
  ['EAC ban', 'BattlEye ban'],
  ['EAC bans', 'BattlEye bans'],
  ['EAC patch', 'BattlEye patch'],
  ['EAC patches', 'BattlEye patches'],
  ['EAC update', 'BattlEye update'],
  ['EAC updates', 'BattlEye updates'],
  [' after EAC', ' after BattlEye'],
  [' a EAC', ' a BattlEye'],
  [' an EAC', ' a BattlEye'],
  ['(EAC)', '(BattlEye)'],
  [' EAC ', ' BattlEye '],
  ['EAC/', 'BattlEye/'],
  ['/EAC', '/BattlEye'],
  ['Epic Games Launcher', 'Gaijin Launcher'],
  ['Epic Games', 'Gaijin'],
  ['Epic account', 'Gaijin account'],
  ['Epic restrictions', 'Gaijin restrictions'],
  ['Epic locker', 'game inventory'],
  ['Epic store', 'in-game store'],
  [' on Epic', ' on Gaijin'],
  ['Battle Royale and Zero Build', 'squad battles and combined arms'],
  ['Battle Royale, Zero Build', 'Squad, Combined arms'],
  ['Battle Royale', 'Squad battles'],
  ['Zero Build', 'Combined arms'],
  ['Creative islands', 'custom battle maps'],
  ['Creative lobby', 'custom lobby'],
  ['Creative practice', 'Custom battle practice'],
  ['Creative or', 'Custom battles or'],
  ['Creative maps', 'Custom battle maps'],
  ['Creative', 'Custom battles'],
  ['Ranked Arena', 'Ranked squads'],
  ['bot lobbies', 'training lobbies'],
  ['chest ESP', 'objective ESP'],
  ['Chest ESP', 'Objective ESP'],
  ['chests, loot', 'objectives, loot'],
  ['Chest and floor-loot ESP', 'Objective and loot ESP'],
  ['loot ESP', 'loot radar'],
  ['Loot / Chest ESP', 'Loot / Objective ESP'],
  ['Auto Shield Break', 'Auto suppression break'],
  ['Skin Changer', 'Uniform changer'],
  ['skin changer', 'uniform changer'],
  ['Unlock All', 'Unlock all uniforms'],
  ['Fortnite', 'Enlisted'],
  ['fortnite', 'enlisted'],
  ['Cheat tiers', 'Hack tiers'],
  ['cheat tiers', 'hack tiers'],
  ['Cheat features', 'Hack features'],
  ['cheat features', 'hack features'],
  ['cheat modules', 'hack modules'],
  ['Cheat modules', 'Hack modules'],
  ['cheat shop', 'hack shop'],
  ['cheat guides', 'hack guides'],
  ['Cheat guides', 'Hack guides'],
  ['cheat guide', 'hack guide'],
  ['Cheat guide', 'Hack guide'],
  ['cheat codes', 'hack tools'],
  ['Cheat codes', 'Hack tools'],
  ['cheat suite', 'hack suite'],
  ['Cheat suite', 'Hack suite'],
  ['cheat logic', 'hack logic'],
  ['cheat modules', 'hack modules'],
  ['cheat profile', 'hack profile'],
  ['cheat tiers', 'hack tiers'],
  ['cheat tools', 'hack tools'],
  ['third-party cheats', 'third-party hacks'],
  ['third-party cheat', 'third-party hack'],
  ['enlisted cheat', 'Enlisted hack'],
  ['Enlisted cheat', 'Enlisted hack'],
  ['Enlisted cheats', 'Enlisted hacks'],
  ['enlisted cheats', 'Enlisted hacks'],
  [' Elite cheats', ' Elite hacks'],
  [' elite cheats', ' elite hacks'],
  ['Buy cheats', 'Buy hacks'],
  ['buy cheats', 'buy hacks'],
  ['View all cheats', 'View all hacks'],
  ['Browse cheats', 'Browse hacks'],
  ['Browse Cheats', 'Browse Hacks'],
  ['cheats FAQ', 'hacks FAQ'],
  ['Cheats FAQ', 'Hacks FAQ'],
  ['cheats for', 'hacks for'],
  ['Cheats for', 'Hacks for'],
  ['cheats on', 'hacks on'],
  ['cheats.', 'hacks.'],
  ['cheats,', 'hacks,'],
  ['cheats ', 'hacks '],
  ['cheats/', 'hacks/'],
  [' cheats', ' hacks'],
  ['Cheats ', 'Hacks '],
  ['Cheats.', 'Hacks.'],
  ['Cheats,', 'Hacks,'],
  ['Cheats/', 'Hacks/'],
  ['Cheats', 'Hacks'],
  ['cheats', 'hacks'],
  ['Cheat ', 'Hack '],
  [' cheat ', ' hack '],
  [' cheat.', ' hack.'],
  [' cheat,', ' hack,'],
  [' cheat—', ' hack—'],
  [' cheat-', ' hack-'],
  ['Cheat/', 'Hack/'],
  ['#status channel', '#status on Discord'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (TEXT_EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function protectTokens(text, pairs) {
  let next = text;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function restoreTokens(text, pairs) {
  let next = text;
  for (const [from, to] of pairs) {
    if (next.includes(to)) next = next.split(to).join(from);
  }
  return next;
}

function protectSlugs(text) {
  return protectTokens(text, [...CODE_PLACEHOLDERS, ...SLUG_PLACEHOLDERS]);
}

function restoreSlugs(text) {
  return restoreTokens(text, [...CODE_PLACEHOLDERS, ...SLUG_PLACEHOLDERS]);
}

function applyCopy(text) {
  let next = protectSlugs(text);
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return restoreSlugs(next);
}

const targets = walk(path.join(root, 'src')).concat(
  walk(path.join(root, 'public')).filter((f) => !f.includes('images')),
);

let changed = 0;
for (const file of targets) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  if (file.includes(`${path.sep}components${path.sep}starwind${path.sep}`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyCopy(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} files.`);
