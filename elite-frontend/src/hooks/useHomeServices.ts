import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useEffect } from 'react';

// تعريف الواجهة (Interface) لنوع بيانات الخدمة
export interface HomeService {
  id: number;
  documentId: string;
  title: string;
  iconName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// واجهة لبيانات الصفحة
interface ServicePage {
  id: number;
  title: string;
  description: string;
  badge?: string;
  isActive: boolean;
  image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  features?: Array<{
    id: number;
    text: string;
  }>;
  icons?: Array<{
    id: number;
    icon: string;
  }>;
  faq?: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

// واجهة لنوع البيانات المرجعة من unified-services API
interface UnifiedServicesResponse {
  data: {
    id: number;
    documentId: string;
    home: HomeService[];
    pages: ServicePage[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
  meta: object;
}

/**
 * Hook لجلب بيانات خدمات الصفحة الرئيسية من Strapi API
 * مع دعم التحديث التلقائي
 */
export const useHomeServices = () => {
  const { locale } = useLanguage();
  // الحصول على مرجع لـ queryClient للتحكم في تخزين البيانات المؤقت
  const queryClient = useQueryClient();
  
  // تعريف مفتاح الاستعلام لاستخدامه في التخزين المؤقت وعمليات الإبطال
  const queryKey = ['home-services', locale];
  
  // استخدام React Query مع Axios لجلب البيانات
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<UnifiedServicesResponse, Error>(
    queryKey,
    async () => {
      // استخدام unified-services endpoint
      const url = `http://localhost:1337/api/unified-services`;      
      
      const response = await axios.get(url);
      
      console.log('🔍 استجابة API الخدمات الموحدة:', response.data);
      
      return response.data;
    },
    {
      refetchOnWindowFocus: true, // إعادة التحميل عند التركيز على النافذة
      staleTime: 60 * 1000, // اعتبار البيانات قديمة بعد دقيقة
      // إضافة كود إعادة المحاولة في حالة فشل الاتصال
      retry: 2,
      // استدعاء عند نجاح جلب البيانات
      onSuccess: (data) => {
        console.log('✅ تم جلب بيانات الخدمات بنجاح:', data);
      },
      // استدعاء عند فشل جلب البيانات
      onError: (error) => {
        console.error('❌ حدث خطأ أثناء جلب بيانات الخدمات:', error);
      }
    }
  );
  
  // استخدام interval لعمل تحديث دوري للبيانات (يشبه polling)
  useEffect(() => {
    // إنشاء تحديث دوري كل 30 ثانية
    const intervalId = setInterval(() => {
      console.log('🔄 جاري التحقق من وجود تحديثات...');
      // إبطال الكاش وإعادة تحميل البيانات
      queryClient.invalidateQueries(queryKey);
    }, 30000); // 30 ثانية
    
    // تنظيف interval عند إزالة المكون
    return () => clearInterval(intervalId);
  }, [queryClient, queryKey]);
  
  // التحقق من التغييرات في البيانات وتنبيه المستخدم (اختياري)
  useEffect(() => {
    if (dataUpdatedAt) {
      const lastUpdateTime = new Date(dataUpdatedAt);
      console.log(`🔄 تم تحديث البيانات في: ${lastUpdateTime.toLocaleTimeString()}`);
    }
  }, [dataUpdatedAt]);
  
  // تحويل البيانات للصيغة المطلوبة - استخراج البيانات من data[0].home
  const formattedServices = data?.data?.[0]?.home?.map(service => ({
    id: service.id,
    title: service.title,
    iconName: service.iconName,
  })) || [];
  
  // دالة لإبطال صلاحية التخزين المؤقت وإعادة جلب البيانات
  const invalidateServices = () => {
    return queryClient.invalidateQueries(queryKey);
  };
  
  return {
    services: data?.data?.[0]?.home || [],
    pages: data?.data?.[0]?.pages || [],
    isLoading,
    error,
    formattedServices,
    // معلومات عن آخر تحديث
    lastUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    // إتاحة وظائف لتحديث البيانات من الخارج
    refetch,           // إعادة جلب البيانات يدويًا
    invalidateServices, // إبطال صلاحية البيانات في التخزين المؤقت
    refresh: invalidateServices // اختصار لتسهيل الاستخدام
  };
};

export default useHomeServices;
