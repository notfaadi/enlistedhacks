/**
 * Fortnite Cheats → Enlisted Hacks & Cheats (localhost dev).
 * Run from project root: node scripts/rebrand-enlisted.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);

/** Ordered longest-first replacements. */
const REPLACEMENTS = [
  ['https://fortnite-cheats.com', 'http://localhost:4321'],
  ['fortnite-cheats.com', 'localhost:4321'],
  ['Fortnite Cheats & Hacks', 'Enlisted Hacks & Cheats'],
  ['Fortnite cheats & hacks', 'Enlisted hacks & cheats'],
  ['Fortnite Cheats', 'Enlisted Hacks & Cheats'],
  ['Fortnite cheats', 'Enlisted hacks & cheats'],
  ['fortnite cheats', 'enlisted hacks & cheats'],
  ['FortniteCheats', 'EnlistedHacksCheats'],
  ['fortnitecheats', 'enlistedhackscheats'],
  ['@fortnitecheats', '@enlistedhackscheats'],

  ['/products/fortnite-cheats', '/products/enlisted-hacks'],
  ['products/fortnite-cheats', 'products/enlisted-hacks'],
  ['%2Fproducts%2Ffortnite', '%2Fproducts%2Fenlisted'],
  ['https://zadeyo.com/products/fortnite', 'https://zadeyo.com/products/enlisted'],
  ['/go/fortnite/', '/go/enlisted/'],
  ['/go/fortnite', '/go/enlisted'],

  ["checkoutPath('fortnite')", "checkoutPath('enlisted')"],
  ['checkoutPath("fortnite")', 'checkoutPath("enlisted")'],
  ["product: 'fortnite'", "product: 'enlisted'"],
  ["'fortnite'", "'enlisted'"],
  ['"fortnite"', '"enlisted"'],
  ['  fortnite:', '  enlisted:'],
  ['fortnite:', 'enlisted:'],
  ['CHECKOUT_URLS.fortnite', 'CHECKOUT_URLS.enlisted'],

  ['Fortnite', 'Enlisted'],
  ['fortnite', 'enlisted'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'fortnite-cheats');
  const to = path.join(root, 'src', 'pages', 'products', 'enlisted-hacks');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → enlisted-hacks');
  }
}

renameProductDir();

const files = walk(root).filter((f) => TEXT_EXTS.has(path.extname(f).toLowerCase()));
let changed = 0;
for (const file of files) {
  if (file.endsWith(`${path.sep}rebrand-enlisted.mjs`)) continue;
  if (file.endsWith(`${path.sep}rebrand-fortnite.mjs`)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
