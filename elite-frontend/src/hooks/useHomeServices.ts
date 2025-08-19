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

// واجهة لنوع البيانات المرجعة من API
interface HomeServicesResponse {
  data: HomeService[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<HomeServicesResponse, Error>(
    queryKey,
    async () => {
      // إضافة معلمات اللغة إلى عنوان URL للحصول على البيانات بلغة المستخدم الحالية
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/home-services?locale=${locale}`;      
      
      const response = await axios.get(url);
      
      console.log('🔍 استجابة API الخدمات:', response.data);
      
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
  
  // تحويل البيانات للصيغة المطلوبة
  const formattedServices = data?.data.map(service => ({
    id: service.id,
    title: service.title,
    iconName: service.iconName,
  })) || [];
  
  // دالة لإبطال صلاحية التخزين المؤقت وإعادة جلب البيانات
  const invalidateServices = () => {
    return queryClient.invalidateQueries(queryKey);
  };
  
  return {
    services: data?.data || [],
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
