# Canonical host redirects (Cloudflare dashboard)

Workers static `_redirects` only supports **relative** paths. Configure these as **Bulk Redirects** (or Page Rules) in Cloudflare for zone `enlistedhacks.net`:

| Source | Target | Status |
|--------|--------|--------|
| `https://www.enlistedhacks.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `http://enlistedhacks.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `https://enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `http://enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |
| `https://www.enlistedhack.net/*` | `https://enlistedhacks.net/${1}` | 301 |

After adding rules, purge cache for `/` and re-run your SEO crawler against `https://enlistedhacks.net/`.
