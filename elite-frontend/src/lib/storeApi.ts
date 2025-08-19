export const STORE_API_BASE = process.env.NEXT_PUBLIC_ELITE_API || 'http://localhost:3001/api';
export const STORE_ASSETS_BASE = STORE_API_BASE.replace(/\/api\/?$/, '');

export async function getJson<T>(path: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(path.startsWith('http') ? path : `${STORE_API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
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
  if (/^https?:\/\//i.test(url)) return url;
  const normalized = url.startsWith('/') ? url : `/${url}`;
  return `${STORE_ASSETS_BASE}${normalized}`;
}
