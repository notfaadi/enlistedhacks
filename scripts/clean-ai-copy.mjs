import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['EnlistedHacksCheats Editorial', 'Enlisted Hacks & Cheats'],
  ['EnlistedHacksCheats Community Forum', 'Enlisted Hacks & Cheats Forum'],
  ['EnlistedHacksCheats Blog', 'Enlisted Hacks & Cheats Blog'],
  ['EnlistedHacksCheats Support', 'Enlisted Hacks & Cheats Support'],
  ['Join EnlistedHacksCheats on Discord', 'Join Enlisted Hacks & Cheats on Discord'],
  ['EnlistedHacksCheats home', 'Enlisted Hacks & Cheats home'],
  ['EnlistedHacksCheats', 'Enlisted Hacks & Cheats'],
  ["TITLE_PREFIX = 'Enlisted Hacks & Cheats'", "TITLE_PREFIX = 'Enlisted Hacks & Cheats'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing ranked play with enlisted aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Ranked Enlisted aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private enlisted hacks & cheats for Windows PC Battle Royale and Zero Build—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Enlisted hacks & cheats for Windows PC Battle Royale and Zero Build. Check status before you queue after a patch.',
  ],
  [
    'maintains private enlisted hacks & cheats for Windows PC Battle Royale and Zero Build. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Enlisted hacks & cheats for Windows PC Battle Royale and Zero Build. Check status before you queue after a patch.',
  ],
  [
    'maintains private enlisted hacks & cheats for Windows PC Battle Royale and Zero Build. Check live status before every patch-day queue.',
    'sells Enlisted hacks & cheats for Windows PC Battle Royale and Zero Build. Check status before you queue after a patch.',
  ],
  [
    'maintains private enlisted hacks & cheats for Windows PC Battle Royale and Zero Build.',
    'sells Enlisted hacks & cheats for Windows PC Battle Royale and Zero Build.',
  ],
  [
    'ships a modular external suite for Windows PC ranked—not lobby cheat codes. Aimbot tracks targets, loot assist clears POIs, ESP wallhack exposes third-parties, and utility tools like Radar Hack and Skin Changer round out the toolkit. This is the complete feature map across',
    'sells external Enlisted hacks & cheats for PC Ranked. Aimbot, loot assist, ESP wallhack, radar and Skin Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}
