import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useLanguage } from "@/context/LanguageContext";

// تعريف الواجهة (Interface) لنوع بيانات الأيقونة
export interface ServiceIcon {
  id?: number;
  icon: string;
}

// تعريف الواجهة (Interface) لنوع بيانات الميزة
export interface ServiceFeature {
  id?: number;
  text: string;
}

// تعريف الواجهة (Interface) لنوع بيانات الخدمة وفقًا للهيكل الجديد من الباك اند
export interface ServicePage {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  badge?: string;
  isActive: boolean;
  order: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  features: ServiceFeature[];
  icons: ServiceIcon[];
  localizations: any[];
}

// واجهة بيانات الخدمة المنسقة
export interface FormattedServicePage {
  id: number;
  title: string;
  description?: string;
  image: string;
  badge?: string;
  isActive: boolean;
  order: number;
  slug: string;
  delay?: string;
  features: ServiceFeature[];
  icons: ServiceIcon[];
}

// واجهة لنوع البيانات المرجعة من API
interface ServicePagesResponse {
  data: ServicePage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// معاملات التصفح للخدمات
export interface ServicePageParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  locale?: string;
  filters?: any;
}

/**
 * Hook لجلب بيانات صفحات الخدمات من Strapi API
 * مع دعم التحديث التلقائي والتدويل والتصفح
 */
export const useServicePages = (params: ServicePageParams = {}) => {
  const { locale } = useLanguage();
  const [currentPage, setCurrentPage] = useState<number>(params.page || 1);
  const [pageSize] = useState<number>(params.pageSize || 6); // عدد الخدمات في كل صفحة
  
  // الحصول على مرجع لـ queryClient للتحكم في تخزين البيانات المؤقت
  const queryClient = useQueryClient();
  
  // تعريف مفتاح الاستعلام لاستخدامه في التخزين المؤقت وعمليات الإبطال
  const queryKey = ['service-pages', locale, currentPage, pageSize];
  
  // استخدام React Query مع Axios لجلب البيانات
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<ServicePagesResponse, Error>(
    queryKey,
    async () => {
      // إضافة معلمات التصفح واللغة إلى عنوان URL
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?populate=*&locale=${locale}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=order:asc`;      
      
      const response = await axios.get(url);
      
      console.log('🔍 استجابة API صفحات الخدمات:', response.data);
      
      return response.data;
    },
    {
      refetchOnWindowFocus: true, // إعادة التحميل عند التركيز على النافذة
      staleTime: 60 * 1000, // اعتبار البيانات قديمة بعد دقيقة
      // إضافة كود إعادة المحاولة في حالة فشل الاتصال
      retry: 2,
      // استدعاء عند نجاح جلب البيانات
      onSuccess: (data) => {
        console.log('✅ تم جلب بيانات صفحات الخدمات بنجاح:', data);
      },
      // استدعاء عند فشل جلب البيانات
      onError: (error) => {
        console.error('❌ حدث خطأ أثناء جلب بيانات صفحات الخدمات:', error);
      }
    }
  );
  
  // استخدام interval لعمل تحديث دوري للبيانات (يشبه polling)
  useEffect(() => {
    // إنشاء تحديث دوري كل 30 ثانية
    const intervalId = setInterval(() => {
      console.log('🔄 جاري التحقق من وجود تحديثات لصفحات الخدمات...');
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
      console.log(`🔄 تم تحديث بيانات صفحات الخدمات في: ${lastUpdateTime.toLocaleTimeString()}`);
    }
  }, [dataUpdatedAt]);
  
  // استخراج مسار الصورة بشكل آمن وفقًا للهيكل الجديد للبيانات
  const getImageUrl = (service: ServicePage): string => {
    try {
      if (!service?.image) {
        return '/images/default-service.jpg'; // صورة افتراضية
      }

      const image = service.image;
      
      // استخراج URL من formats بالترتيب (medium، small، thumbnail) أو الأصلية
      if (image.formats?.medium) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image.formats.medium.url}`;
      } else if (image.formats?.small) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image.formats.small.url}`;
      } else if (image.formats?.thumbnail) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image.formats.thumbnail.url}`;
      } else if (image.url) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image.url}`;
      }
      
      return '/images/default-service.jpg'; // صورة افتراضية إذا لم يتم العثور على أي URL
    } catch (error) {
      console.error('خطأ في الحصول على URL الصورة:', error);
      return '/images/default-service.jpg';
    }
  };
  
  // تحويل البيانات للصيغة المطلوبة للمكون وفقًا للهيكل الجديد
  const formattedServicePages: FormattedServicePage[] = data?.data.map((service, index) => {
    // التحقق من وجود الـ service لتجنب الأخطاء
    if (!service) {
      console.warn('⚠️ تم استلام بيانات خدمة غير صالحة:', service);
      return {
        id: index,
        title: 'خدمة غير معروفة',
        description: '',
        image: '/images/default-service.jpg',
        badge: '',
        isActive: false,
        order: index,
        slug: `service-${index}`,
        delay: `0.${index + 1}s`,
        features: [],
        icons: [
          { icon: 'fa-microscope' },
          { icon: 'fa-heartbeat' },
          { icon: 'fa-shield-virus' },
          { icon: 'fa-stethoscope' }
        ]
      } as FormattedServicePage;
    }

    // تجهيز بيانات الخدمة بأمان مع التحقق من وجود الخصائص وفقًا للهيكل الجديد
    return {
      id: service.id,
      title: service.title || 'خدمة بدون عنوان',
      description: service.description || '',
      image: getImageUrl(service),
      badge: service.badge || '',
      isActive: service.isActive || false,
      order: service.order || index,
      slug: service.slug || `service-${service.id}`,
      delay: `0.${index + 1}s`,
      features: service.features || [],
      // إضافة أيقونات افتراضية إذا كانت القائمة فارغة أو غير موجودة
      icons: (service.icons && service.icons.length > 0) ? service.icons : [
        { icon: 'fa-microscope' },
        { icon: 'fa-heartbeat' },
        { icon: 'fa-shield-virus' },
        { icon: 'fa-stethoscope' }
      ]
    };
  }) || [];
  
  // ترتيب الخدمات حسب حقل الترتيب
  const sortedServicePages = [...formattedServicePages].sort((a, b) => a.order - b.order);
  
  // دالة لإبطال صلاحية التخزين المؤقت وإعادة جلب البيانات
  const invalidateServicePages = () => {
    return queryClient.invalidateQueries(queryKey);
  };
  
  // دوال للتعامل مع التصفح
  const loadNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const loadPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    servicePages: data?.data || [],
    isLoading,
    error,
    formattedServicePages: sortedServicePages,
    // معلومات عن آخر تحديث
    lastUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    // إتاحة وظائف لتحديث البيانات من الخارج
    refetch,           // إعادة جلب البيانات يدويًا
    invalidateServicePages, // إبطال صلاحية البيانات في التخزين المؤقت
    refresh: invalidateServicePages, // اختصار لتسهيل الاستخدام
    // معلومات ودوال التصفح
    pagination: data?.meta?.pagination || { page: 1, pageSize, pageCount: 1, total: 0 },
    currentPage,
    pageSize,
    loadNextPage,
    loadPreviousPage,
    goToPage,
    hasNextPage: data?.meta?.pagination ? currentPage < data.meta.pagination.pageCount : false,
    hasPreviousPage: currentPage > 1
  };
};

export default useServicePages;
