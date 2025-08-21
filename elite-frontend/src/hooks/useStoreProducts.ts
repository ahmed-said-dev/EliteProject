import { useCallback, useEffect, useMemo, useState } from 'react';
import { getJson, resolveAssetUrl } from '@/lib/storeApi';

export interface StoreProductImage { id: string; url: string; isPrimary?: boolean }
export interface StoreProduct { id: string; name: string; price?: number; salePrice?: number; images?: StoreProductImage[]; category?: { id: string; name: string } }

export interface StoreProductsResponse { data: StoreProduct[]; totalPages?: number }

export interface StoreQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  featured?: boolean;
  published?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export function useStoreProducts(initial: StoreQueryParams = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' }) {
  const [params, setParams] = useState<StoreQueryParams>(initial);
  const [data, setData] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getJson<StoreProduct[] | StoreProductsResponse>('/products', params);
      const arrRaw = Array.isArray(res) ? res : res.data;
      const arr = (arrRaw || []).map((p) => ({
        ...p,
        images: (p.images || []).map((img) => ({ ...img, url: resolveAssetUrl(img.url) || img.url })),
      }));
      setData(arr || []);
      setTotalPages((!Array.isArray(res) && res.totalPages) ? res.totalPages : 1);
    } catch (e: any) {
      setError(e?.message || 'فشل جلب المنتجات');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const setFilter = useCallback((patch: Partial<StoreQueryParams>) => setParams(prev => ({ ...prev, page: 1, ...patch })), []);

  return { products: data, loading, error, totalPages, params, setParams, setFilter, refetch: fetchProducts };
}
