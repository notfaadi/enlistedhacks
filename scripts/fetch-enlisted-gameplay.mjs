/**
 * Enlisted-only images: official Steam store screenshots (app 2051620).
 * Skips files already written by import-user-gameplay.mjs unless FORCE=1.
 *
 * Run: node scripts/fetch-enlisted-gameplay.mjs && node scripts/optimize-images.mjs
 */
import { writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const FORCE = process.env.FORCE === '1';
const STEAM_APP = 2051620;
const STEAM_CDN = `https://cdn.akamai.steamstatic.com/steam/apps/${STEAM_APP}`;

const STEAM_SHOTS = [
  'ss_3af5885c5d82652d7c7f2d2dd471a5b291b68dbe',
  'ss_f70e197a7f18377bc3b6add009184f711f6b749b',
  'ss_1f510ebc043e1bedbe9684222db4491bc5c43e50',
  'ss_87e3c5ccaa59c0f7fff374969f2f908243df1026',
  'ss_2ac72917f736c25582de10f28a8b70aa1f6cd575',
  'ss_031d70cb8a8c56d74cbf812594059232dd7adaf8',
  'ss_17f319f4886ecd0f09f8e316299811a394885490',
  'ss_b20a2c210249f648fb45a740d135966c6cfefffd',
  'ss_1a75f674badf9fccce7b0868b843e04188666492',
  'ss_7810572dc7875282e420f958972d5a21326a0fa7',
  'ss_684aa49a67cfd3b3f1821178d1f35f86c16d9875',
  'ss_65545bcb2e9c9e3285afd2c5a8cded75db24555f',
];

const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');
const publicDir = path.resolve('public');

function shot(i) {
  const hash = STEAM_SHOTS[i % STEAM_SHOTS.length];
  return `${STEAM_CDN}/${hash}.1920x1080.jpg`;
}

const GAMEPLAY = [
  'enlisted-esp-wallhack.png',
  'enlisted-aimbot-combat.png',
  'enlisted-radar-hack.png',
  'enlisted-skin-changer.png',
  'enlisted-auto-aim.png',
  'enlisted-loot-radar.png',
  'enlisted-player-esp.png',
  'enlisted-thermal-esp.png',
  'enlisted-build-fight-esp.png',
  'enlisted-arena-wallhack.png',
  'enlisted-spawn-island-esp.png',
  'enlisted-long-range-esp.png',
  'enlisted-aimbot-lock.png',
  'enlisted-chams-esp.png',
  'enlisted-squad-esp.png',
  'enlisted-combat-esp.png',
];

const BLOG_BASES = [
  'enlisted-cheat-codes-guide',
  'enlisted-console-cheats-tips',
  'how-to-use-enlisted-cheat-codes',
  'enlisted-cheats-features-guide',
  'enlisted-console-commands-cheats',
  'enlisted-lite-vs-pro',
  'enlisted-elite-tier-guide',
  'enlisted-aimbot-ranked-guide',
  'enlisted-esp-wallhack-setup',
  'enlisted-radar-hack-guide',
  'enlisted-skin-changer-guide',
  'eac-patch-day-checklist',
  'enlisted-hwid-spoofer-after-ban',
  'how-to-buy-enlisted-cheats-2026',
  'enlisted-aimbot-combat-guide',
  'eac-bypass-enlisted-guide',
  'enlisted-external-cheat-guide',
  'enlisted-stream-proof-setup',
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function fetchPng(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnlistedHacksCheatsSite/1.0)' },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const input = Buffer.from(await res.arrayBuffer());
  return sharp(input).resize({ width: 1280, withoutEnlargement: true }).png().toBuffer();
}

async function saveIfNeeded(dir, file, url) {
  const dest = path.join(dir, file);
  if (!FORCE && (await exists(dest))) {
    console.log('keep', file, '(local Enlisted import)');
    return null;
  }
  const buf = await fetchPng(url);
  await writeFile(dest, buf);
  console.log('saved', file, buf.length);
  return buf;
}

await mkdir(gameplayDir, { recursive: true });
await mkdir(blogDir, { recursive: true });

let hero = null;
for (let i = 0; i < GAMEPLAY.length; i++) {
  const file = GAMEPLAY[i];
  try {
    const buf = await saveIfNeeded(gameplayDir, file, shot(i));
    if (file === 'enlisted-esp-wallhack.png' && buf) hero = buf;
    if (file === 'enlisted-esp-wallhack.png' && !buf && (await exists(path.join(gameplayDir, file)))) {
      hero = await sharp(path.join(gameplayDir, file)).png().toBuffer();
    }
  } catch (err) {
    console.warn('skip', file, err.message);
  }
}

for (let i = 0; i < BLOG_BASES.length; i++) {
  const base = BLOG_BASES[i];
  try {
    await saveIfNeeded(blogDir, `${base}.png`, shot(i + 3));
  } catch (err) {
    console.warn('skip blog', base, err.message);
  }
}

if (hero) {
  try {
    const logo = await sharp(hero).resize(512, 512, { fit: 'cover' }).png().toBuffer();
    for (const { name, size } of [
      { name: 'favicon-16.png', size: 16 },
      { name: 'favicon-32.png', size: 32 },
      { name: 'favicon-48.png', size: 48 },
      { name: 'favicon-192.png', size: 192 },
      { name: 'favicon-512.png', size: 512 },
      { name: 'apple-touch-icon.png', size: 180 },
    ]) {
      await writeFile(path.join(publicDir, name), await sharp(logo).resize(size, size).png().toBuffer());
    }
    await writeFile(path.join(publicDir, 'favicon.ico'), await sharp(logo).resize(32, 32).png().toBuffer());
    console.log('updated favicons from Enlisted art');
  } catch (err) {
    console.warn('favicon update skipped (file may be locked):', err.message);
  }
}

console.log('Done — Enlisted Steam images only (no Fortnite / third-party game CDN).');
