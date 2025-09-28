import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';

export type FormattedServicePage = {
  id: number;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  isActive: boolean;
  order: number;
  slug: string;
  features?: Array<{ id?: number; text?: string }>;
  icons?: Array<{ id?: number; icon: string }>;
};

type UseUnifiedServicesOptions = { enabled?: boolean };

function useUnifiedServices(options?: UseUnifiedServicesOptions) {
  const { locale } = useLanguage();
  const router = useRouter();
  const path = typeof router?.asPath === 'string' ? router.asPath : '';
  const isServiceDetail = /^\/(ar\/)?service-detail\//.test(path);
  const enabled = options?.enabled ?? !isServiceDetail;

  const query = useQuery(
    ['unified-services', locale],
    async () => {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
      const url = `${api}/api/unified-services?locale=${locale}`;
      console.log(`🔍 [useUnifiedServices] Fetching services with URL: ${url}`);
      
      try {
        const res = await axios.get(url);
        const entries = res?.data?.data || [];
        console.log(`✅ [useUnifiedServices] Services data received:`, entries);
        
        const selected = entries.find((e: any) => Array.isArray(e.pages) && e.pages.length > 0) || entries[0] || { pages: [], home: [] };

        const formattedServicePages: FormattedServicePage[] = (selected.pages || []).map((p: any, idx: number) => ({
          id: p.id ?? idx,
          title: p.title ?? 'Service',
          description: p.description ?? '',
          image: p?.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''}${p.image.url}` : '/images/default-service.jpg',
          badge: p.badge ?? '',
          isActive: !!p.isActive,
          order: typeof p.order === 'number' ? p.order : idx,
          slug: p.slug ?? `service-${p.id ?? idx}`,
          features: Array.isArray(p.features) ? p.features : [],
          icons: Array.isArray(p.icons) ? p.icons : [],
        })).sort((a, b) => a.order - b.order);

        const home = (selected.home || []).map((h: any, i: number) => ({
          id: h.id ?? i,
          title: h.title ?? 'Service',
          iconName: h.iconName ?? 'faPaw',
        }));

        return { formattedServicePages, home };
      } catch (error) {
        console.error(`❌ [useUnifiedServices] Error fetching services:`, error.response?.data || error.message);
        throw error;
      }
    },
    { 
      staleTime: 30_000, // Reduce stale time for better locale switching
      enabled,
      refetchOnMount: true,
      refetchOnWindowFocus: false
    }
  );

  return {
    formattedServicePages: query.data?.formattedServicePages || [],
    homeServices: query.data?.home || [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export default useUnifiedServices;


