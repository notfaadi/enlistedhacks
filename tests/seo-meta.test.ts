import assert from 'node:assert/strict';
import test from 'node:test';
import { PAGE_META } from '../src/data/seo/pages';

test('SEO titles and descriptions meet length guidelines', () => {
  for (const [route, meta] of Object.entries(PAGE_META)) {
    assert.ok(
      meta.title.length <= 60,
      `${route} title is ${meta.title.length} chars (max 60): ${meta.title}`,
    );
    assert.ok(
      meta.description.length >= 118 && meta.description.length <= 160,
      `${route} description is ${meta.description.length} chars (want ~120–160)`,
    );
  }
});
