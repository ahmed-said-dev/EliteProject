import { useQuery } from 'react-query';
import { useLanguage } from "@/context/LanguageContext";

// تعريف الواجهة (Interface) لنوع بيانات الخدمة
export interface Service {
  id: number;
  title: string;
  iconName: string;
  shortDescription?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// واجهة لنوع البيانات المرجعة من API
interface ServicesResponse {
  data: Service[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Hook لجلب بيانات الخدمات من Strapi API
 */
export const useServices = () => {
  const { locale } = useLanguage();
  
  // استخدام React Query لجلب البيانات
  const { data, isLoading, error } = useQuery<any, Error>(
    ['services-home', locale], // مفتاح التخزين المؤقت (يتغير مع تغير اللغة)
    async () => {
      // إضافة معلمات اللغة إلى عنوان URL للحصول على البيانات بلغة المستخدم الحالية
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/services-homes?locale=${locale}`;      
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('فشل في جلب بيانات الخدمات');
      }
      
      const responseData = await response.json();
      
      // عرض بيانات الاستجابة الأصلية من API في وحدة التحكم
      console.log('🔍 بيانات الخدمات من API:', responseData);
      
      return responseData;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 دقائق
    }
  );
  
  // تحويل البيانات للصيغة المطلوبة
  const formattedServices = data?.data.map(service => {
    return {
      id: service?.id,
      title: service?.attributes?.title,
      iconName: service?.attributes?.iconName,
      shortDescription: service?.attributes?.shortDescription,
      order: service?.attributes?.order
    };
  }) || [];
  
  return {
    services: data?.data || [],
    isLoading,
    error,
    formattedServices
  };
};

export default useServices;
