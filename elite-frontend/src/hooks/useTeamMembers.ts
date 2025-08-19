import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from 'react';

// تعريف الواجهة (Interface) لنوع بيانات عضو الفريق
export interface TeamMemberData {
  id: number;
  
    name: string;
    position: string;
    isActive: boolean;
    animationDelay: string;
    // دعم لتنسيق الصورة القديم
    imageSrc?: {
      data: {
          url: string;
          attributes?: {
            url: string;
          }
      }
    };
    // دعم لتنسيق الصورة الجديد من Strapi
    image?: {
      id?: number;
      url?: string;
      name?: string;
      width?: number;
      height?: number;
      formats?: {
        thumbnail?: {
          url: string;
        };
        small?: {
          url: string;
        };
        medium?: {
          url: string;
        };
      };
      data?: any; // لدعم التنسيق المختلف من Strapi v4
    } | any; // السماح بأي نوع للتوافق مع الاستجابات المختلفة
    specialties: {
      icon: string;
      text: string;
    }[];
    socialLinks: {
      platform: string;
      url: string;
      icon: string;
    }[];
  }


// واجهة لنوع البيانات المرجعة من API
interface TeamMembersResponse {
  data: TeamMemberData[];
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
 * Hook لجلب بيانات أعضاء الفريق من Strapi API
 * مع دعم التحديث التلقائي والتدويل
 */
export const useTeamMembers = () => {
  const { locale } = useLanguage();
  // الحصول على مرجع لـ queryClient للتحكم في تخزين البيانات المؤقت
  const queryClient = useQueryClient();
  
  // تعريف مفتاح الاستعلام لاستخدامه في التخزين المؤقت وعمليات الإبطال
  const queryKey = ['team-members', locale];
  
  // استخدام React Query مع Axios لجلب البيانات
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery<TeamMembersResponse, Error>(
    queryKey,
    async () => {
      // إضافة معلمات اللغة إلى عنوان URL للحصول على البيانات بلغة المستخدم الحالية
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/team-members?populate=*&locale=${locale}`;      
      
      const response = await axios.get(url);
      
      console.log('🔍 استجابة API للفريق:', response.data);
      
      return response.data;
    },
    {
      refetchOnWindowFocus: true, // إعادة التحميل عند التركيز على النافذة
      staleTime: 60 * 1000, // اعتبار البيانات قديمة بعد دقيقة
      // إضافة كود إعادة المحاولة في حالة فشل الاتصال
      retry: 2,
      // استدعاء عند نجاح جلب البيانات
      onSuccess: (data) => {
        console.log('✅ تم جلب بيانات الفريق بنجاح:', data);
      },
      // استدعاء عند فشل جلب البيانات
      onError: (error) => {
        console.error('❌ حدث خطأ أثناء جلب بيانات الفريق:', error);
      }
    }
  );
  
  // استخدام interval لعمل تحديث دوري للبيانات (يشبه polling)
  useEffect(() => {
    // إنشاء تحديث دوري كل 30 ثانية
    const intervalId = setInterval(() => {
      console.log('🔄 جاري التحقق من وجود تحديثات للفريق...');
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
      console.log(`🔄 تم تحديث بيانات الفريق في: ${lastUpdateTime.toLocaleTimeString()}`);
    }
  }, [dataUpdatedAt]);
  
  // معالجة وتحويل البيانات للصيغة المطلوبة للمكون
  const formattedTeamMembers = data?.data.map(member => {
    // الحصول على مسار الصورة بشكل آمن مع توفير صورة افتراضية في حالة عدم وجود صورة
    const getImageUrl = () => {
      // في حالة عدم وجود بيانات الصورة على الإطلاق
      if (!member?.image) {
        return '/images/default-doctor.jpg'; // صورة افتراضية
      }

      // معالجة صورة Strapi بجميع التنسيقات الممكنة
      try {
        const image = member.image;
        let imageUrl = '';

        // الحالة 1: الصورة هي كائن كامل مع formats
        if (image.formats && image.formats.thumbnail) {
          imageUrl = image.formats.thumbnail.url;
        }
        // الحالة 2: الصورة لها مسار url مباشر
        else if (image.url) {
          imageUrl = image.url;
        }
        // الحالة 3: مصفوفة صور، نأخذ الأولى
        else if (Array.isArray(image) && image.length > 0) {
          if (image[0].formats && image[0].formats.thumbnail) {
            imageUrl = image[0].formats.thumbnail.url;
          } else if (image[0].url) {
            imageUrl = image[0].url;
          }
        }
        // الحالة 4: الصورة هي كائن Strapi v4 API مع data و attributes
        else if (image.data) {
          const imageData = image.data;
          if (Array.isArray(imageData) && imageData.length > 0) {
            // مصفوفة صور في data
            if (imageData[0].attributes && imageData[0].attributes.url) {
              imageUrl = imageData[0].attributes.url;
            } else if (imageData[0].formats && imageData[0].formats.thumbnail) {
              imageUrl = imageData[0].formats.thumbnail.url;
            }
          } else if (imageData.attributes) {
            // كائن واحد
            if (imageData.attributes.url) {
              imageUrl = imageData.attributes.url;
            } else if (imageData.attributes.formats && imageData.attributes.formats.thumbnail) {
              imageUrl = imageData.attributes.formats.thumbnail.url;
            }
          }
        }

        // إضافة عنوان URL الأساسي للصورة إذا كان المسار نسبيًا
        if (imageUrl && imageUrl.startsWith('/')) {
          return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${imageUrl}`;
        } else if (imageUrl) {
          return imageUrl; // إذا كان المسار مطلقًا، أعده كما هو
        }
      } catch (error) {
        console.error('خطأ في معالجة مسار الصورة:', error);
      }
      
      // إذا وصلنا إلى هنا، فقد فشلت كل المحاولات
      return '/images/default-doctor.jpg';
    };

    return {
      id: member?.id,
      name: member?.name || 'Doctor Name',
      position: member?.position || 'Veterinarian',
      imageSrc: getImageUrl(),
      isActive: member?.isActive || true,
      animationDelay: member?.animationDelay || '0.2s',
      specialties: Array.isArray(member?.specialties) ? member.specialties : [],
      socialLinks: Array.isArray(member?.socialLinks) ? member.socialLinks : [
        { platform: 'facebook', icon: 'fab fa-facebook-f', url: '#' },
        { platform: 'twitter', icon: 'fab fa-twitter', url: '#' },
        { platform: 'linkedin', icon: 'fab fa-linkedin-in', url: '#' }
      ]
    };
  }) || [];
  
  // دالة لإبطال صلاحية التخزين المؤقت وإعادة جلب البيانات
  const invalidateTeamMembers = () => {
    return queryClient.invalidateQueries(queryKey);
  };
  
  return {
    teamMembers: data?.data || [],
    isLoading,
    error,
    formattedTeamMembers,
    // معلومات عن آخر تحديث
    lastUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    // إتاحة وظائف لتحديث البيانات من الخارج
    refetch,           // إعادة جلب البيانات يدويًا
    invalidateTeamMembers, // إبطال صلاحية البيانات في التخزين المؤقت
    refresh: invalidateTeamMembers // اختصار لتسهيل الاستخدام
  };
};

export default useTeamMembers;
