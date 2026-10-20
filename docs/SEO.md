# SEO metadata (enlistedhacks.net)

All page titles, descriptions, keywords, Open Graph fields, and schema flags live in **`src/data/seo.ts`** (backed by `src/data/seo/pages.ts`, `locales.ts`, `faq.ts`, and `lists.ts`).

## Adding a new page

1. **Register the English path** in `src/data/seo/locales.ts`:
   - Add a `SeoRouteKey` entry.
   - Set `EN_PATH_BY_ROUTE['/your-path/']`.
   - Add localized slugs under `LOCALIZED` when you have translated URLs (optional locales fall back to `/{locale}/your-path/`).

2. **Add metadata** in `src/data/seo/pages.ts` inside `PAGE_META`:
   - Use exact `title`, `description`, `ogImage`, `ogImageAlt`, and `keywords` (global baseline + page extras via `kw()`).
   - Set `breadcrumbs` and optional flags: `includeProduct`, `includeFaqPage`, `includeBlogCollection`, `includeReviewItemList`.

3. **Map legacy paths** (if any) in `PATH_TO_SEO_ROUTE` so `getPageMetaForPath()` resolves correctly.

4. **Wire the page** in Astro:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---
   <BaseLayout seoRoute="/your-path/">
     …
   </BaseLayout>
   ```

5. **Run checks**:
   ```bash
   npm run test:seo
   npx astro build
   ```

## Head output

`src/components/BaseHead.astro` renders canonical, robots, keywords, OG/Twitter (1920×1080 webp), hreflang alternates (22 locales + `x-default`), and JSON-LD from `buildSeoGraph()`.

For one-off pages (blog posts, product detail), use `mergePageMeta()` and pass `pageMeta` to `BaseLayout`, plus `extraJsonLd` when needed.

## OG images

Spec paths under `/images/` (e.g. `enlisted-hacks-combat.webp`) are generated with:

```bash
node scripts/generate-seo-og-images.mjs
```

## Hreflang

`buildHreflangAlternates(route, origin)` uses `localePathForRoute()` — keep locale slugs in `LOCALIZED` in sync with real routes when you add i18n pages.
