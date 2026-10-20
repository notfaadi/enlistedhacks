# Canonical host redirects (Cloudflare dashboard)

**Important:** `enlistedhacks.net` is on Cloudflare nameservers (`coen.ns.cloudflare.com`, `lindsey.ns.cloudflare.com`) but **not** on the same account as this repo’s Worker (`notfaadiroziroti@gmail.com`). Until that zone is added to your account (or you deploy from the account that owns it), SEO crawlers will keep seeing the **old** site (22 hreflang locales, no www→apex 301).

After the zone is on your account:

1. Uncomment the `enlistedhacks.net` / `www.enlistedhacks.net` routes in `wrangler.toml`.
2. Run `node scripts/cloudflare-attach-domains.mjs` (with API token).
3. `npx wrangler deploy`.

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
