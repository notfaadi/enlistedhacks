/**
 * Attach Workers custom domains for Enlisted (requires zone on the same Cloudflare account).
 * Usage: CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... node scripts/cloudflare-attach-domains.mjs
 */
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
const service = 'enlistedhacks';

const HOSTS = [
  { hostname: 'enlistedhack.net', zone_name: 'enlistedhack.net' },
  { hostname: 'www.enlistedhack.net', zone_name: 'enlistedhack.net' },
  { hostname: 'enlistedhacks.net', zone_name: 'enlistedhacks.net' },
  { hostname: 'www.enlistedhacks.net', zone_name: 'enlistedhacks.net' },
];

if (!accountId || !token) {
  console.error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN.');
  process.exit(1);
}

async function api(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(`${init.method ?? 'GET'} ${path}: ${JSON.stringify(body.errors ?? body)}`);
  }
  return body.result;
}

async function zoneIdFor(name) {
  const zones = await api(`/zones?name=${encodeURIComponent(name)}`);
  return zones[0]?.id ?? null;
}

for (const { hostname, zone_name } of HOSTS) {
  const zoneId = await zoneIdFor(zone_name);
  if (!zoneId) {
    console.warn(`skip ${hostname}: zone ${zone_name} not on this account`);
    continue;
  }
  try {
    const result = await api(`/accounts/${accountId}/workers/domains`, {
      method: 'PUT',
      body: JSON.stringify({
        hostname,
        service,
        environment: 'production',
        zone_id: zoneId,
      }),
    });
    console.log(`ok ${hostname} → ${result.service}`);
  } catch (e) {
    console.error(`fail ${hostname}:`, e.message);
  }
}
