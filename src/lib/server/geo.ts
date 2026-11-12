// Where a request came from, without storing the IP. Works on both hosts:
// - our DigitalOcean server behind Cloudflare: CF-IPCountry (always), and cf-ipcity / cf-region when Cloudflare's
//   "Add visitor location headers" Managed Transform is on (Cloudflare → Rules → Transform Rules → Managed Transforms).
// - Vercel: x-vercel-ip-country / -city / -country-region.

const dec = (v: string | null) => {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

export function geo(h: Headers) {
  let country = h.get("cf-ipcountry") || h.get("x-vercel-ip-country");
  if (country && !/^[A-Z]{2}$/i.test(country)) country = null; // Cloudflare uses XX (unknown) and T1 (Tor)
  if (country === "XX") country = null;
  return {
    country: country ? country.toUpperCase() : null,
    region: dec(h.get("cf-region") || h.get("x-vercel-ip-country-region")),
    city: dec(h.get("cf-ipcity") || h.get("x-vercel-ip-city")),
  };
}
