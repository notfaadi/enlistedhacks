import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { en } from '../src/i18n/en';
import { HOMEPAGE_DOCUMENT_TITLE } from '../src/data/seo/homepageTitle';
import { PAGE_META } from '../src/data/seo/pages';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

test('built HTML uses enlistedhacks.net (not legacy enlistedhack.net)', () => {
  assert.ok(fs.existsSync(dist), 'Run npm run build first');
  const htmlFiles: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  };
  walk(dist);
  const offenders: string[] = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    if (html.includes('enlistedhack.net')) {
      offenders.push(path.relative(root, file));
    }
  }
  assert.equal(offenders.length, 0, `Legacy domain in: ${offenders.slice(0, 5).join(', ')}`);
});

test('homepage hreflang is English-only (no phantom locale URLs)', () => {
  const indexPath = path.join(dist, 'index.html');
  assert.ok(fs.existsSync(indexPath), 'Run npm run build first');
  const html = fs.readFileSync(indexPath, 'utf8');
  const count = (html.match(/hreflang/g) ?? []).length;
  assert.ok(count <= 6, `expected at most 6 hreflang attrs (en, en-US, x-default), got ${count}`);
  assert.ok(!html.includes('hreflang="es"'), 'Spanish hreflang should not ship without /es/ pages');
});

test('homepage document title matches hero h1 lines', () => {
  assert.equal(PAGE_META['/'].title, HOMEPAGE_DOCUMENT_TITLE);
  const indexPath = path.join(dist, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  const title = html.match(/<title>([^<]+)/)?.[1]?.replace(/&amp;/g, '&');
  assert.equal(title, HOMEPAGE_DOCUMENT_TITLE);
  assert.ok(title?.includes(en.hero.titleLine1));
  assert.ok(title?.includes(en.hero.titleLine2));
});

test('homepage has exactly one h1 and self-referencing hreflang', () => {
  const indexPath = path.join(dist, 'index.html');
  assert.ok(fs.existsSync(indexPath), 'Run npm run build first');
  const html = fs.readFileSync(indexPath, 'utf8');
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  assert.equal(h1Count, 1, `homepage should have one h1, found ${h1Count}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const hreflangEn = html.match(/<link rel="alternate" hreflang="en" href="([^"]+)"/)?.[1];
  assert.ok(canonical, 'canonical link required');
  assert.equal(hreflangEn, canonical, 'hreflang en must match canonical URL');
  const hreflangEnUs = html.match(/<link rel="alternate" hreflang="en-US" href="([^"]+)"/)?.[1];
  assert.equal(hreflangEnUs, canonical, 'hreflang en-US must match canonical URL');
  const hreflangDefault = html.match(/<link rel="alternate" hreflang="x-default" href="([^"]+)"/)?.[1];
  assert.equal(hreflangDefault, canonical, 'hreflang x-default must match canonical URL');
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  assert.ok(desc.length >= 120 && desc.length <= 165, `homepage meta description length ${desc.length}`);
});

test('built HTML has no empty img alt on homepage', () => {
  const indexPath = path.join(dist, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  assert.ok(!html.includes('alt=""'), 'homepage images should have descriptive alt text');
});

test('each built page has at most one h1', () => {
  assert.ok(fs.existsSync(dist), 'Run npm run build first');
  const htmlFiles: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html') && entry.name !== '404.html') htmlFiles.push(full);
    }
  };
  walk(dist);
  const offenders: string[] = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    if ((html.match(/<h1[\s>]/g) ?? []).length > 1) {
      offenders.push(`${path.relative(root, file)} (${(html.match(/<h1[\s>]/g) ?? []).length} h1)`);
    }
  }
  assert.equal(offenders.length, 0, `Multiple h1: ${offenders.slice(0, 8).join('; ')}`);
});

test('GSC sitemap index references only files present in dist', () => {
  const indexPath = path.join(dist, 'sitemap.xml');
  assert.ok(fs.existsSync(indexPath), 'Run npm run build first');
  const indexXml = fs.readFileSync(indexPath, 'utf8');
  assert.ok(indexXml.includes('<sitemapindex'), 'sitemap.xml must be a sitemap index');
  const childLocs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(childLocs.length > 0, 'sitemap index must list child sitemaps');
  for (const loc of childLocs) {
    const file = path.basename(new URL(loc).pathname);
    const childPath = path.join(dist, file);
    assert.ok(fs.existsSync(childPath), `Missing child sitemap file: ${file} (${loc})`);
    const childXml = fs.readFileSync(childPath, 'utf8');
    assert.ok(childXml.includes('<urlset'), `${file} must be a urlset`);
  }
  const allPath = path.join(dist, 'sitemap-all.xml');
  assert.ok(fs.existsSync(allPath), 'sitemap-all.xml required for single-file GSC submit');
  const allXml = fs.readFileSync(allPath, 'utf8');
  const urlCount = (allXml.match(/<url>/g) ?? []).length;
  assert.ok(urlCount >= 50, `sitemap-all.xml should list indexable URLs, got ${urlCount}`);
});
