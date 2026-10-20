import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEVO = 'https://levocheats.com/go/FDI?to=%2Fenlisted-cheats';

test('homepage Cloud DMA checkout uses Levocheats and plan tiers', () => {
  const indexPath = path.join(root, 'dist', 'index.html');
  assert.ok(fs.existsSync(indexPath), 'Run npm run build first');

  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(!html.includes('href="https://zadeyo.com'), 'homepage must not link to zadeyo checkout');
  assert.ok(html.includes('Enlisted Cloud DMA'), 'homepage should feature Cloud DMA');
  assert.ok(html.includes('1 Week') && html.includes('1 Month') && html.includes('Lifetime'));
  assert.ok(html.includes(LEVO), 'checkout should link to Levocheats');
  assert.ok(!html.includes('Enlisted HWID Spoofer'), 'homepage carousel utilities removed');
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
  for (const slug of ['hwid-spoofer', 'ugc', 'skin-changer']) {
    const file = path.join(root, 'dist', 'go', slug, 'index.html');
    assert.ok(fs.existsSync(file), `missing static redirect page /go/${slug}/`);
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(
      html.includes(encodeURIComponent('/enlisted-cheats')) || html.includes(LEVO),
      `/go/${slug}/ should redirect to Levocheats`,
    );
    assert.ok(!html.includes('zadeyo.com'), `/go/${slug}/ must not reference zadeyo`);
  }
});
