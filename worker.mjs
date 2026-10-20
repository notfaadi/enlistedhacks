/** Canonical origin for production HTML + SEO. */
const CANONICAL_HOST = 'enlistedhacks.net';

/** Hostnames that must 301 to https://enlistedhacks.net (same path/query). */
const REDIRECT_HOSTS = new Set([
  'www.enlistedhacks.net',
  'enlistedhack.net',
  'www.enlistedhack.net',
]);

/** @param {URL} url */
function shouldRedirectToCanonical(url) {
  const host = url.hostname.toLowerCase();
  if (REDIRECT_HOSTS.has(host)) return true;
  if (host === CANONICAL_HOST && url.protocol !== 'https:') return true;
  return false;
}

export default {
  /** @param {Request} request @param {{ ASSETS: { fetch: (r: Request) => Promise<Response> } }} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (shouldRedirectToCanonical(url)) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
