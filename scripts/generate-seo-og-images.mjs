import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outDir = path.join(root, 'public', 'images');

const targets = [
  { out: 'enlisted-hacks-hero-1024w.webp', source: 'hero-enlisted-dark.jpg' },
  { out: 'enlisted-hacks-combat.webp', source: 'hero-enlisted-dark.jpg' },
  { out: 'enlisted-hacks-esp.webp', source: 'hero-enlisted-dark.jpg' },
  { out: 'enlisted-hacks-aimbot.webp', source: 'hero-enlisted-dark.jpg' },
];

async function toOgWebp(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(1920, 1080, { fit: 'cover', position: 'centre' })
    .webp({ quality: 90 })
    .toFile(outputPath);
  console.log(`Wrote ${path.relative(root, outputPath)}`);
}

async function logo() {
  const logoPath = path.join(outDir, 'enlisted-hacks-logo.png');
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 3,
      background: { r: 10, g: 12, b: 8 },
    },
  })
    .png()
    .toFile(logoPath);
  console.log(`Wrote ${path.relative(root, logoPath)}`);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const defaultSource = path.join(outDir, 'hero-enlisted-dark.jpg');
if (!fs.existsSync(defaultSource)) {
  console.warn('generate-seo-og-images: missing hero-enlisted-dark.jpg — skipping OG outputs.');
  process.exit(0);
}

for (const { out, source } of targets) {
  const input = path.join(outDir, source);
  if (!fs.existsSync(input)) continue;
  await toOgWebp(input, path.join(outDir, out));
}

await logo();
