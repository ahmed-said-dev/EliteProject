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
  id?: number;
  // New: fetch a single service by slug instead of id
  slug?: string;
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
  // إضافة معرف الخدمة أو السلاج (إذا كان موجودًا) إلى مفتاح الاستعلام
  const isDetail = !!params.id || !!params.slug;
  const queryKey = isDetail
    ? ['service-page', locale, params.id ?? null, params.slug ?? null]
    : ['service-pages', locale, currentPage, pageSize];
  
  // استخدام React Query مع Axios لجلب البيانات
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<any, Error>(
    queryKey,
    async () => {
      // إضافة معلمات التصفح واللغة إلى عنوان URL
      let url;
      
      // إذا تم تحديد معرف خدمة محددة
      if (params.id) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages/${params.id}?populate=*&locale=${locale}`;
        console.log(`🔍 طلب تفاصيل خدمة برقم المعرف: ${params.id} باللغة: ${locale}`);
      } else if (params.slug) {
        // جلب تفاصيل خدمة واحدة باستخدام الـ slug عبر الفلاتر
        const encodedSlug = encodeURIComponent(params.slug);
        // 1) حاول باللغة الحالية أولاً
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?populate=*&filters[slug][$eq]=${encodedSlug}&locale=${locale}`;
        console.log(`🔍 طلب تفاصيل خدمة بالـ slug: ${params.slug} باللغة: ${locale}`);
      } else {
        // طلب قائمة الخدمات بالطريقة المعتادة
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?populate=*&locale=${locale}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&sort=order:asc`;
        console.log(`🔍 طلب قائمة الخدمات باللغة: ${locale}`);
      }
      
      const response = await axios.get(url);

      // إذا كان الجلب بالـ slug ولم نجد نتيجة في اللغة الحالية، نحاول الاستدلال عبر documentId
      if (params.slug) {
        const list = response.data?.data;
        if (Array.isArray(list) && list.length === 0) {
          console.log('⚠️ لم يتم العثور على خدمة بهذا الـ slug في هذه اللغة. سنحاول إيجادها عبر جميع اللغات ثم اختيار النسخة الموافقة للغة المطلوبة');
          const encodedSlug = encodeURIComponent(params.slug);
          // 2) ابحث في كل اللغات عن نفس slug للحصول على documentId
          const allLocalesUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?populate=*&filters[slug][$eq]=${encodedSlug}&locale=all`;
          const allLocalesRes = await axios.get(allLocalesUrl);
          const allList = allLocalesRes.data?.data;
          if (Array.isArray(allList) && allList.length > 0) {
            const baseItem = allList[0];
            const documentId = baseItem?.documentId || baseItem?.attributes?.documentId;
            if (documentId) {
              // 3) اطلب بالـ documentId مع اللغة الحالية
              const byDocUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages?populate=*&filters[documentId][$eq]=${encodeURIComponent(documentId)}&locale=${locale}`;
              const byDocRes = await axios.get(byDocUrl);
              const byDocList = byDocRes.data?.data;
              if (Array.isArray(byDocList) && byDocList.length > 0) {
                console.log('✅ تم العثور على النسخة المطابقة للغة عبر documentId');
                return { data: byDocList[0] };
              }
              console.log('🔄 لم يتم العثور على نسخة بهذه اللغة عبر documentId. سيتم استخدام أول عنصر كـ fallback');
              return { data: baseItem };
            }
          }
        }
      }

      if (params.id || params.slug) {
        console.log('🔍 استجابة API لتفاصيل الخدمة:', response.data);
      } else {
        console.log('🔍 استجابة API لقائمة الخدمات:', response.data);
      }

      return response.data;
    },
    {
      refetchOnWindowFocus: false, // تعطيل إعادة التحميل عند التركيز على النافذة
      staleTime: 0, // اعتبار البيانات قديمة فوراً
      cacheTime: 0, // عدم تخزين البيانات في الكاش نهائياً
      refetchOnMount: true, // إعادة جلب البيانات عند تحميل المكون
      refetchOnReconnect: true, // إعادة جلب البيانات عند إعادة الاتصال
      // إضافة كود إعادة المحاولة في حالة فشل الاتصال
      retry: 2,
      // استدعاء عند نجاح جلب البيانات
      onSuccess: (data) => {
        if (params.id) {
          console.log(`✅ تم جلب تفاصيل الخدمة بنجاح باللغة ${locale}:`, data);
        } else {
          console.log(`✅ تم جلب بيانات صفحات الخدمات بنجاح باللغة ${locale}:`, data);
        }
      },
      // استدعاء عند فشل جلب البيانات
      onError: (error) => {
        if (params.id) {
          console.error(`❌ حدث خطأ أثناء جلب تفاصيل الخدمة رقم ${params.id} باللغة ${locale}:`, error);
        } else {
          console.error(`❌ حدث خطأ أثناء جلب بيانات صفحات الخدمات باللغة ${locale}:`, error);
        }
      }
    }
  );
  
  // إعادة جلب البيانات عند تغيير اللغة
  useEffect(() => {
    console.log(`🌐 تغيرت اللغة إلى: ${locale} - سيتم إعادة جلب البيانات فوراً`);
    
    // إزالة جميع البيانات المخزنة مؤقتاً لهذا الاستعلام
    queryClient.removeQueries(queryKey);
    
    // إبطال الكاش وإعادة تحميل البيانات عند تغيير اللغة
    queryClient.invalidateQueries(queryKey);
    
    // إعادة جلب البيانات فوراً
    queryClient.refetchQueries(queryKey);
  }, [locale, queryClient, queryKey]);

  // استخدام interval لعمل تحديث دوري للبيانات (يشبه polling) - فقط للقوائم وليس للتفاصيل
  useEffect(() => {
    // لا داعي للتحديث الدوري في حالة جلب تفاصيل خدمة واحدة
    if (params.id) return;
    
    // إنشاء تحديث دوري كل 30 ثانية
    const intervalId = setInterval(() => {
      console.log('🔄 جاري التحقق من وجود تحديثات لصفحات الخدمات...');
      // إبطال الكاش وإعادة تحميل البيانات
      queryClient.invalidateQueries(queryKey);
    }, 30000); // 30 ثانية
    
    // تنظيف interval عند إزالة المكون
    return () => clearInterval(intervalId);
  }, [queryClient, queryKey, params.id]);
  
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
  let formattedServicePages: FormattedServicePage[] = [];
  
  // معالجة البيانات حسب نوع الاستجابة (تفاصيل خدمة واحدة أو قائمة خدمات)
  if ((params.id || params.slug) && data?.data) {
    // حالة تفاصيل خدمة واحدة
    // في حالة الجلب بالـ id، data.data كائن واحد
    // في حالة الجلب بالـ slug، data.data مصفوفة ونحتاج أول عنصر
    const service = Array.isArray(data.data) ? data.data[0] : data.data;
    
    // طباعة بيانات الخدمة الكاملة للتصحيح
    console.log('Service data from API:', service);
    
    // استخراج الـ features بالتنسيق المطلوب
    let features = [];
    
    // تحقق من وجود الـ features وإضافتها بالتنسيق الصحيح
    if (service?.features && Array.isArray(service.features)) {
      features = service.features;
    } else if (service?.attributes?.features) {
      // الحالة البديلة إذا كانت الـ features متداخلة في كائن attributes
      features = service.attributes.features;
    } else {
      // بيانات الـ features الافتراضية
      features = [
        {
          "id": 5,
          "text": "test feature 1"
        },
        {
          "id": 6,
          "text": "test feature 2"
        },
        {
          "id": 7,
          "text": "test feature 3"
        }
      ];
    }
    
    // طباعة الـ features
    console.log('Service features:', features);
    
    formattedServicePages = [{
      id: service.id,
      title: service?.title || service?.attributes?.title || 'خدمة بدون عنوان',
      description: service?.description || service?.attributes?.description || '',
      image: service?.image ? 
        `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${service.image.url}` : 
        '/images/default-service.jpg',
      badge: service?.badge || service?.attributes?.badge || '',
      isActive: service?.isActive || service?.attributes?.isActive || false,
      order: service?.order || service?.attributes?.order || 0,
      slug: service?.slug || service?.attributes?.slug || `service-${service.id}`,
      delay: '0.1s',
      features: features,
      icons: (service?.icons && service.icons.length > 0) ? 
        service.icons : [
          { icon: 'fa-microscope' },
          { icon: 'fa-heartbeat' },
          { icon: 'fa-shield-virus' },
          { icon: 'fa-stethoscope' }
        ]
    }];
  } else if (data?.data) {
    // حالة قائمة الخدمات
    formattedServicePages = data.data.map((service: any, index: number) => {
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
    });
  }
  
  // ترتيب الخدمات حسب حقل الترتيب (فقط للقوائم)
  const sortedServicePages = params.id ? formattedServicePages : [...formattedServicePages].sort((a, b) => a.order - b.order);
  
  // دالة لإبطال صلاحية التخزين المؤقت وإعادة جلب البيانات
  const invalidateServicePages = () => {
    return queryClient.invalidateQueries(queryKey);
  };

  // دالة لإزالة الكاش تماماً وإعادة جلب البيانات
  const forceRefreshServicePages = () => {
    console.log('🗑️ إزالة الكاش تماماً وإعادة جلب البيانات...');
    queryClient.removeQueries(queryKey);
    queryClient.invalidateQueries(queryKey);
    return queryClient.refetchQueries(queryKey);
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
    // إضافة البيانات الخام كما هي من الـ API (مفيد لاستخدامات متقدمة)
    rawData: data,
    // إضافة خاصية جديدة للحصول على تفاصيل خدمة واحدة
    serviceDetail: params.id ? (data?.data || null) : null,
    // القائمة الكاملة للخدمات (فارغة في حالة طلب تفاصيل خدمة واحدة)
    servicePages: params.id ? [] : (data?.data || []),
    isLoading,
    error,
    // القائمة المعالجة والجاهزة للاستخدام (تحتوي على عنصر واحد في حالة تفاصيل خدمة واحدة)
    formattedServicePages: sortedServicePages,
    // عنصر تفاصيل الخدمة المطلوبة (جاهز للاستخدام)
    formattedServiceDetail: params.id ? (sortedServicePages[0] || null) : null,
    // معلومات عن آخر تحديث
    lastUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    // إتاحة وظائف لتحديث البيانات من الخارج
    refetch,           // إعادة جلب البيانات يدويًا
    invalidateServicePages, // إبطال صلاحية البيانات في التخزين المؤقت
    forceRefreshServicePages, // إزالة الكاش تماماً وإعادة جلب البيانات
    refresh: invalidateServicePages, // اختصار لتسهيل الاستخدام
    forceRefresh: forceRefreshServicePages, // اختصار لإجبار التحديث
    // معلومات ودوال التصفح (فقط في حالة قوائم الخدمات)
    pagination: params.id ? null : (data?.meta?.pagination || { page: 1, pageSize, pageCount: 1, total: 0 }),
    currentPage: params.id ? null : currentPage,
    pageSize: params.id ? null : pageSize,
    loadNextPage: params.id ? null : loadNextPage,
    loadPreviousPage: params.id ? null : loadPreviousPage,
    goToPage: params.id ? null : goToPage,
    hasNextPage: params.id ? false : (data?.meta?.pagination ? currentPage < data.meta.pagination.pageCount : false),
    hasPreviousPage: params.id ? false : currentPage > 1
  };
};

export default useServicePages;
