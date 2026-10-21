import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEVO_ENLISTED = 'https://levocheats.com/go/FDI?to=%2Fenlisted-cheats';
const LEVO_CLOUD_DMA = 'https://levocheats.com/go/FDI?to=%2Fcloud-dma';
const LEVO_HWID = 'https://levocheats.com/go/FDI?to=%2Fhwid-spoofer';

test('homepage Cloud DMA checkout uses Levocheats and plan tiers', () => {
  const indexPath = path.join(root, 'dist', 'index.html');
  assert.ok(fs.existsSync(indexPath), 'Run npm run build first');

  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(!html.includes('href="https://zadeyo.com'), 'homepage must not link to zadeyo checkout');
  assert.ok(html.includes('Enlisted Cloud DMA'), 'homepage should feature Cloud DMA');
  assert.ok(html.includes('1 Week') && html.includes('1 Month') && html.includes('Lifetime'));
  assert.ok(html.includes(LEVO_CLOUD_DMA), 'Cloud DMA buy should link to Levocheats cloud-dma store');
  assert.ok(!html.includes('Enlisted HWID Spoofer'), 'homepage carousel utilities removed');
});

test('resolveCheckoutHref keeps Cloud DMA Levocheats go link (not Enlisted)', async () => {
  const { resolveCheckoutHref } = await import('../src/config/checkout.ts');
  const cloudGo = 'https://levocheats.com/go/FDI?to=%2Fcloud-dma';
  assert.equal(resolveCheckoutHref(cloudGo), cloudGo);
  assert.ok(!resolveCheckoutHref(cloudGo).includes('enlisted-cheats'));
});

test('enlisted-hacks catalog Cloud DMA Buy now uses Levocheats cloud-dma', () => {
  const hub = path.join(root, 'dist', 'enlisted-hacks', 'index.html');
  assert.ok(fs.existsSync(hub), 'Run npm run build first');
  const html = fs.readFileSync(hub, 'utf8');
  assert.ok(html.includes(LEVO_CLOUD_DMA), 'Cloud DMA card must link to Levocheats cloud-dma');
});

test('product pages link Buy now to matching Levocheats store paths', () => {
  const cloud = path.join(root, 'dist', 'products', 'enlisted-hacks', 'cloud-dma', 'index.html');
  const hwid = path.join(root, 'dist', 'products', 'enlisted-hacks', 'hwid-spoofer', 'index.html');
  assert.ok(fs.existsSync(cloud) && fs.existsSync(hwid), 'Run npm run build first');
  assert.ok(fs.readFileSync(cloud, 'utf8').includes(LEVO_CLOUD_DMA));
  assert.ok(fs.readFileSync(hwid, 'utf8').includes(LEVO_HWID));
});

test('404 page is noindex without homepage SEO keywords', () => {
  const file = path.join(root, 'dist', '404.html');
  assert.ok(fs.existsSync(file), 'Run npm run build first');
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /noindex,\s*nofollow/i, '404 must be noindex,nofollow');
  assert.ok(!html.includes('rel="canonical"'), '404 should not declare a canonical URL');
  assert.ok(!html.includes('name="keywords"'), '404 should not emit meta keywords');
  assert.ok(!html.includes('Page not found | Enlisted Hacks'), '404 title must not mirror marketing titles');
});

test('legacy /go/ routes redirect to Levocheats in dist', () => {
  const expected: Record<string, string> = {
    'hwid-spoofer': encodeURIComponent('/hwid-spoofer'),
    ugc: encodeURIComponent('/ugc'),
    'skin-changer': encodeURIComponent('/unlock-all'),
  };
  for (const slug of Object.keys(expected)) {
    const file = path.join(root, 'dist', 'go', slug, 'index.html');
    assert.ok(fs.existsSync(file), `missing static redirect page /go/${slug}/`);
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(html.includes(expected[slug]!), `/go/${slug}/ should redirect to matching Levocheats product`);
    assert.ok(!html.includes('zadeyo.com'), `/go/${slug}/ must not reference zadeyo`);
  }
});
