export const STORE_API_BASE = process.env.NEXT_PUBLIC_STORE_API_URL || 'http://localhost:3001/api';
// Prefer explicit assets base to avoid wrong path when API is mounted under /store-api
export const STORE_ASSETS_BASE = process.env.NEXT_PUBLIC_STORE_ASSETS_BASE
  || (STORE_API_BASE.includes('/api') ? STORE_API_BASE.replace(/\/api\/?$/, '') : STORE_API_BASE);

export async function getJson<T>(path: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(path.startsWith('http') ? path : `${STORE_API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      const isEmptySearch = key === 'search' && value === '';
      if (isEmptySearch || (value !== undefined && value !== null && value !== '')) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  const res = await fetch(url.toString(), { credentials: 'include' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function resolveAssetUrl(url?: string): string | undefined {
  if (!url) return undefined;
  // If it's absolute (http/https), rewrite to our domain assets base using the same pathname
  if (/^https?:\/\//i.test(url)) {
    // If it's already pointing to our assets base, return as-is to avoid double prefix
    if (url.startsWith(STORE_ASSETS_BASE)) return url;
    try {
      const u = new URL(url);
      // If the path already contains /store-assets/, keep it as-is
      if (u.pathname.startsWith('/store-assets/')) return url;
      return `${STORE_ASSETS_BASE}${u.pathname}`;
    } catch {
      // Fallback to returning as-is if parsing fails
      return url;
    }
  }
  const normalized = url.startsWith('/') ? url : `/${url}`;
  return `${STORE_ASSETS_BASE}${normalized}`;
}
