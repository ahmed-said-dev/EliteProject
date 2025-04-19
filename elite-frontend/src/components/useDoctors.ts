import { useQuery } from 'react-query';
import { useLanguage } from "@/context/LanguageContext";

// تعريف الواجهة (Interface) لنوع بيانات الدكتور
export interface Doctor {
  id: number;
  documentId: string;
  name: string;
  specialty: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    formats: {
      thumbnail?: {
        url: string;
      }
    };
    // ... المزيد من خصائص الصورة
  };
}

// واجهة لنوع البيانات المرجعة من API
interface DoctorsResponse {
  data: Doctor[];
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
 * Hook لجلب بيانات الأطباء من Strapi API
 */
export const useDoctors = () => {
  const { locale } = useLanguage();
  
  // استخدام React Query لجلب البيانات
  const { data, isLoading, error } = useQuery<any, Error>(
    ['doctors', locale], // مفتاح التخزين المؤقت (يتغير مع تغير اللغة)
    async () => {
      // إضافة معلمات اللغة إلى عنوان URL للحصول على البيانات بلغة المستخدم الحالية
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/doctor-homes?populate=image&locale=${locale}`;      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('فشل في جلب بيانات الأطباء');
      }
      
      const responseData = await response.json();
      
      // عرض بيانات الاستجابة الأصلية من API في وحدة التحكم
      console.log('🔍 بيانات الأطباء من API:', responseData);
      console.log('🔍 هيكل بيانات الدكتور الأول من API:', responseData.data?.[0]);
      
      return responseData;
    },
    {
      refetchOnWindowFocus: false, // عدم إعادة الجلب عند التركيز على النافذة
      staleTime: 5 * 60 * 1000, // تعتبر البيانات قديمة بعد 5 دقائق
    }
  );
  
  // تحويل البيانات للصيغة المطلوبة
  const formattedDoctors = data?.data.map(doctor => {
    // طباعة البيانات الأصلية للمساعدة في التصحيح
    console.log('🔍 البيانات الأصلية للدكتور:', doctor);
    
    const formattedDoctor = {
      id: doctor?.id,
      // التعامل مباشرة مع البيانات على المستوى الأعلى بدلاً من attributes
      name: doctor?.name,
      specialty: doctor?.specialty,
      // بناء URL كامل للصورة
      image: doctor?.image
        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${doctor.image.url}`
        : '/DoctorsSections/Asset 28-.png' // صورة افتراضية
    };
    
    // عرض بيانات الدكتور بعد التحويل في وحدة التحكم
    console.log('✅ بيانات الدكتور بعد التحويل:', formattedDoctor);
    
    return formattedDoctor;
  }) || [];
  
  return {
    doctors: data?.data || [],
    isLoading,
    error,
    formattedDoctors
  };
};

export default useDoctors;
