import { useCallback, useEffect, useState } from 'react'
import { getJson, resolveAssetUrl } from '@/lib/storeApi'

export interface StoreProductImage { id: string; url: string; isPrimary?: boolean }
export interface StoreCategory { id: string; name: string }

export interface StoreProductFull {
  id: string
  name: string
  slug?: string
  description?: string
  shortDescription?: string
  price?: number
  salePrice?: number | null
  stockQuantity?: number
  status?: string
  tags?: string[]
  category?: StoreCategory | null
  images?: StoreProductImage[]
}

export interface StoreRelatedProduct {
  id: string
  name: string
  price?: number
  salePrice?: number | null
  images?: StoreProductImage[]
}

export function useStoreProduct(id?: string) {
  const [product, setProduct] = useState<StoreProductFull | null>(null)
  const [related, setRelated] = useState<StoreRelatedProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const p = await getJson<StoreProductFull>(`/products/${id}`)
      // Resolve asset URLs
      const withResolved: StoreProductFull = {
        ...p,
        images: (p.images || []).map(img => ({ ...img, url: resolveAssetUrl(img.url) || img.url })),
      }
      setProduct(withResolved)

      // Related products (best-effort)
      try {
        const rel = await getJson<StoreRelatedProduct[]>(`/products/${id}/related`)
        const relResolved = (rel || []).map(r => ({
          ...r,
          images: (r.images || []).map(img => ({ ...img, url: resolveAssetUrl(img.url) || img.url })),
        }))
        setRelated(relResolved)
      } catch (_) {
        setRelated([])
      }
    } catch (e: any) {
      setError(e?.message || 'فشل في جلب تفاصيل المنتج')
      setProduct(null)
      setRelated([])
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetchProduct() }, [fetchProduct])

  return { product, related, loading, error, refetch: fetchProduct }
}


