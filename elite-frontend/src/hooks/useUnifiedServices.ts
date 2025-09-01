import { useQuery } from 'react-query';
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

function useUnifiedServices() {
  const { locale } = useLanguage();

  const query = useQuery(
    ['unified-services', locale],
    async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/unified-services?locale=${locale}`;
      const res = await axios.get(url);
      const entries = res?.data?.data || [];
      const selected = entries.find((e: any) => Array.isArray(e.pages) && e.pages.length > 0) || entries[0] || { pages: [], home: [] };

      const formattedServicePages: FormattedServicePage[] = (selected.pages || []).map((p: any, idx: number) => ({
        id: p.id ?? idx,
        title: p.title ?? 'Service',
        description: p.description ?? '',
        image: p?.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${p.image.url}` : '/images/default-service.jpg',
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
    },
    { staleTime: 60_000 }
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


