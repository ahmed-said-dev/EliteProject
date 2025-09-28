import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export interface UnifiedServiceImage {
  url?: string;
}

export interface UnifiedServiceFeature { id?: number; text?: string }
export interface UnifiedServiceIcon { id?: number; icon: string }
export interface UnifiedServiceFaq { id?: number; question: string; answer: string }

export interface UnifiedServicePage {
  id: number;
  order: number;
  title: string;
  description?: string;
  badge?: string | null;
  isActive: boolean;
  image?: UnifiedServiceImage | null;
  features?: UnifiedServiceFeature[];
  icons?: UnifiedServiceIcon[];
  faq?: UnifiedServiceFaq[];
}

export interface UnifiedServiceEntry {
  id: number;
  documentId: string;
  locale: string;
  home?: Array<{ id?: number; title?: string; iconName?: string }>;
  pages?: UnifiedServicePage[];
}

export interface FormattedUnifiedServiceDetail {
  id: number;
  title: string;
  description?: string;
  image: string;
  badge?: string | null;
  isActive: boolean;
  order: number;
  features: UnifiedServiceFeature[];
  icons: UnifiedServiceIcon[];
  faq: UnifiedServiceFaq[];
}

function useUnifiedServiceById(id?: string | number) {
  const { locale } = useLanguage();
  const queryClient = useQueryClient();

  // Invalidate cache when locale changes to force fresh data fetch
  useEffect(() => {
    if (id && locale) {
      console.log(`🔄 [useUnifiedServiceById] Locale changed to ${locale}, invalidating cache for service ${id}`);
      queryClient.invalidateQueries(['unified-service-detail', id]);
    }
  }, [locale, id, queryClient]);

  const query = useQuery(
    ['unified-service-detail', id, locale],
    async () => {
      if (!id) return null;
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
      
      // Try first with documentId (recommended)
      let url = `${api}/api/unified-services?filters[documentId][$eq]=${id}&locale=${locale}`;
      console.log(`🔍 [useUnifiedServiceById] Fetching service by documentId with URL: ${url}`);
      
      try {
        let res = await axios.get(url, { headers: { Accept: 'application/json' } });
        
        // If found by documentId, use the first result
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          console.log(`✅ [useUnifiedServiceById] Service found by documentId:`, res.data.data[0]);
          return res.data.data[0] as UnifiedServiceEntry;
        }
        
        // Fallback: try with numeric ID for backward compatibility
        url = `${api}/api/unified-services/${id}?locale=${locale}`;
        console.log(`🔍 [useUnifiedServiceById] Fallback: fetching service by ID with URL: ${url}`);
        
        res = await axios.get(url, { headers: { Accept: 'application/json' } });
        console.log(`✅ [useUnifiedServiceById] Service found by ID:`, res.data?.data);
        return res.data?.data as UnifiedServiceEntry;
        
      } catch (error) {
        console.error(`❌ [useUnifiedServiceById] Error fetching service:`, error.response?.data || error.message);
        throw error;
      }
    },
    { 
      enabled: !!id,
      // Force refetch when locale changes
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      // Reduce stale time to ensure fresh data on locale change
      staleTime: 0,
      cacheTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  let formatted: FormattedUnifiedServiceDetail | null = null;
  const entry = query.data;
  if (entry && Array.isArray(entry.pages) && entry.pages.length > 0) {
    // Choose first page (order 0) or the lowest order
    const sorted = [...entry.pages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const p = sorted[0];
    const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';
    const imageUrl = p?.image?.url ? `${imageBase}${p.image.url}` : '/images/default-service.jpg';
    formatted = {
      id: p.id,
      title: p.title || 'Service',
      description: p.description || '',
      image: imageUrl,
      badge: p.badge ?? null,
      isActive: !!p.isActive,
      order: p.order ?? 0,
      features: Array.isArray(p.features) ? p.features : [],
      icons: Array.isArray(p.icons) ? p.icons : [],
      faq: Array.isArray(p.faq) ? p.faq : [],
    };
  }

  return {
    raw: entry,
    formatted,
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export default useUnifiedServiceById;
