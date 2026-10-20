/** Canonical host + HTTPS before static assets (Workers _redirects are path-only). */
const CANONICAL_HOST = 'enlistedhacks.net';

/** @param {URL} url */
function isCanonicalRequest(url) {
  return url.hostname.toLowerCase() === CANONICAL_HOST && url.protocol === 'https:';
}

export default {
  /** @param {Request} request @param {{ ASSETS: { fetch: (r: Request) => Promise<Response> } }} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!isCanonicalRequest(url)) {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
