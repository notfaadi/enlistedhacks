/**
 * Copy Enlisted cheat/game screenshots from _import/enlisted/ into public/images.
 * Supports .png, .jpg, .jpeg, .webp — skips obvious non-Enlisted filenames (Valorant, Fortnite, etc.).
 *
 * Run: node scripts/import-user-gameplay.mjs && node scripts/fetch-enlisted-gameplay.mjs && node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const importDir = path.resolve('_import/enlisted');
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');

const BLOCKED_NAME = /fortnite|valorant|dota|apex|pubg|call-of-duty|warzone|overwatch|csgo|cs2|minecraft|roblox/i;

const GAMEPLAY = [
  { file: 'enlisted-esp-wallhack.png', alt: 'Enlisted ESP wallhack with player boxes, tracers, and squad overlay in urban combat' },
  { file: 'enlisted-aimbot-combat.png', alt: 'Enlisted aimbot and ESP during infantry firefight — in-game cheat overlay' },
  { file: 'enlisted-player-esp.png', alt: 'Enlisted player ESP showing squad positions and enemy markers' },
  { file: 'enlisted-radar-hack.png', alt: 'Enlisted radar and minimap awareness in combined-arms battle' },
  { file: 'enlisted-auto-aim.png', alt: 'Enlisted marksman aim assist view with ESP labels' },
  { file: 'enlisted-loot-radar.png', alt: 'Enlisted objective push with squad ESP in ruined streets' },
  { file: 'enlisted-skin-changer.png', alt: 'Enlisted first-person squad command with overlay HUD' },
  { file: 'enlisted-thermal-esp.png', alt: 'Enlisted combat in smoke and low visibility with ESP' },
  { file: 'enlisted-build-fight-esp.png', alt: 'Enlisted close-quarters building fight with Enlisted ESP' },
  { file: 'enlisted-arena-wallhack.png', alt: 'Enlisted heavy weapons and explosives on the battlefield' },
  { file: 'enlisted-spawn-island-esp.png', alt: 'Enlisted squad deployment at match start' },
  { file: 'enlisted-long-range-esp.png', alt: 'Enlisted wide front-line battle with tanks and infantry' },
  { file: 'enlisted-aimbot-lock.png', alt: 'Enlisted medium-range engagement with aim lock overlay' },
  { file: 'enlisted-chams-esp.png', alt: 'Enlisted coastal or urban assault gameplay' },
  { file: 'enlisted-squad-esp.png', alt: 'Enlisted AI squad advancing with player ESP' },
  { file: 'enlisted-combat-esp.png', alt: 'Enlisted large-scale WW2 firefight on PC' },
];

const BLOG = [
  'enlisted-cheat-codes-guide.png',
  'enlisted-console-cheats-tips.png',
  'how-to-use-enlisted-cheat-codes.png',
  'enlisted-cheats-features-guide.png',
  'enlisted-console-commands-cheats.png',
  'enlisted-lite-vs-pro.png',
  'enlisted-elite-tier-guide.png',
  'enlisted-aimbot-ranked-guide.png',
  'enlisted-esp-wallhack-setup.png',
  'enlisted-radar-hack-guide.png',
  'enlisted-skin-changer-guide.png',
  'eac-patch-day-checklist.png',
  'enlisted-hwid-spoofer-after-ban.png',
  'how-to-buy-enlisted-cheats-2026.png',
  'enlisted-aimbot-combat-guide.png',
  'eac-bypass-enlisted-guide.png',
  'enlisted-external-cheat-guide.png',
  'enlisted-stream-proof-setup.png',
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listSources() {
  if (!fs.existsSync(importDir)) return [];
  return fs
    .readdirSync(importDir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .filter((f) => !BLOCKED_NAME.test(f))
    .sort()
    .map((f) => path.join(importDir, f));
}

async function writeResizedPng(src, dest) {
  const buf = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  console.log('wrote', path.relative(process.cwd(), dest), buf.length);
}

ensureDir(importDir);
ensureDir(gameplayDir);
ensureDir(blogDir);

const sources = listSources();
console.log(`Found ${sources.length} Enlisted source image(s) in _import/enlisted/`);

if (!sources.length) {
  console.log('No local imports — run fetch-enlisted-gameplay.mjs for Steam screenshots only.');
  process.exit(0);
}

const alts = [];
for (let i = 0; i < Math.min(sources.length, GAMEPLAY.length); i++) {
  const src = sources[i];
  const dest = path.join(gameplayDir, GAMEPLAY[i].file);
  await writeResizedPng(src, dest);
  alts.push({ file: GAMEPLAY[i].file, alt: GAMEPLAY[i].alt, srcIndex: i });
}

for (let i = 0; i < Math.min(sources.length, BLOG.length); i++) {
  await writeResizedPng(sources[i], path.join(blogDir, BLOG[i]));
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'gameplay-image-alts.json'),
  JSON.stringify({ gameplay: alts, sourceCount: sources.length }, null, 2),
);

console.log('Done importing Enlisted screenshots.');
