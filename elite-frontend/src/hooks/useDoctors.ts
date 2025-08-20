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
      const apiUrl = 'http://134.122.102.182:8080'; // الرابط المباشر للـ API
      const url = `${apiUrl}/api/doctor-homes?populate=image&locale=${locale}`;      
      
      console.log('🔗 محاولة الوصول للرابط:', url);
      
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
  const formattedDoctors = data?.data.map((doctor, index) => {
    // طباعة البيانات الأصلية للمساعدة في التصحيح
    console.log('🔍 البيانات الأصلية للدكتور:', doctor);
    
    // مصفوفة من الصور الافتراضية للأطباء
    const defaultImages = [
      '/DoctorsSections/Asset 28-.png',
      '/DoctorsSections/Asset 29-.png', 
      '/DoctorsSections/Asset 30-.png'
    ];
    
    const formattedDoctor = {
      id: doctor?.id,
      documentId: doctor?.documentId,
      // التعامل مباشرة مع البيانات على المستوى الأعلى بدلاً من attributes
      name: doctor?.name || `دكتور ${index + 1}`,
      specialty: doctor?.specialty || 'أخصائي بيطري',
      // استخدام صورة افتراضية بناءً على الفهرس أو من البيانات إذا كانت متوفرة
      image: doctor?.image?.url 
        ? `http://134.122.102.182:8080${doctor.image.url}`
        : defaultImages[index % defaultImages.length] // توزيع الصور الافتراضية
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
