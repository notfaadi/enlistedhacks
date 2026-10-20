# Canonical host redirects (Cloudflare dashboard)

**Live `enlistedhacks.net` must use this Worker** (`worker.mjs` + `wrangler deploy`) or these **Bulk Redirects** on the zone that currently serves the site.

Workers static `_redirects` only supports **relative** paths. Configure these as **Bulk Redirects** in Cloudflare → **enlistedhacks.net** → Rules → Redirect Rules (or Bulk Redirects):

| Source | Target | Status |
|--------|--------|--------|
| `https://www.enlistedhacks.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `http://enlistedhacks.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `https://enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `http://enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `https://www.enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |

After adding rules, purge cache for `/` and re-run your SEO crawler against `https://enlistedhacks.net/`.
