const axios = require('axios');

const API_BASE = 'http://localhost:1337/api';

// بيانات الصور التجريبية للسلايدر
const galleryImages = [
  {
    title: 'خدمات الفحص الشامل',
    description: 'فحص شامل ودقيق لحيوانك الأليف باستخدام أحدث التقنيات',
    altText: 'فحص بيطري شامل',
    order: 1,
    isActive: true,
    locale: 'ar'
  },
  {
    title: 'العمليات الجراحية',
    description: 'عمليات جراحية متقدمة بأيدي أطباء متخصصين',
    altText: 'عملية جراحية بيطرية',
    order: 2,
    isActive: true,
    locale: 'ar'
  },
  {
    title: 'العناية بالأسنان',
    description: 'تنظيف وعلاج أسنان الحيوانات الأليفة',
    altText: 'عناية أسنان الحيوانات',
    order: 3,
    isActive: true,
    locale: 'ar'
  },
  {
    title: 'التطعيمات الوقائية',
    description: 'برنامج تطعيمات شامل لحماية حيوانك الأليف',
    altText: 'تطعيمات الحيوانات الأليفة',
    order: 4,
    isActive: true,
    locale: 'ar'
  },
  {
    title: 'العناية بالجروح',
    description: 'علاج وتضميد الجروح بعناية فائقة',
    altText: 'علاج جروح الحيوانات',
    order: 5,
    isActive: true,
    locale: 'ar'
  },
  {
    title: 'الفحص بالأشعة',
    description: 'تشخيص دقيق باستخدام أحدث أجهزة الأشعة',
    altText: 'أشعة بيطرية',
    order: 6,
    isActive: true,
    locale: 'ar'
  }
];

// النسخة الإنجليزية
const galleryImagesEn = [
  {
    title: 'Comprehensive Health Check',
    description: 'Complete and accurate examination of your pet using the latest technology',
    altText: 'Comprehensive veterinary examination',
    order: 1,
    isActive: true,
    locale: 'en'
  },
  {
    title: 'Surgical Operations',
    description: 'Advanced surgical procedures by specialized veterinarians',
    altText: 'Veterinary surgical operation',
    order: 2,
    isActive: true,
    locale: 'en'
  },
  {
    title: 'Dental Care',
    description: 'Cleaning and treatment of pet teeth',
    altText: 'Pet dental care',
    order: 3,
    isActive: true,
    locale: 'en'
  },
  {
    title: 'Preventive Vaccinations',
    description: 'Comprehensive vaccination program to protect your pet',
    altText: 'Pet vaccinations',
    order: 4,
    isActive: true,
    locale: 'en'
  },
  {
    title: 'Wound Care',
    description: 'Treatment and dressing of wounds with exceptional care',
    altText: 'Animal wound treatment',
    order: 5,
    isActive: true,
    locale: 'en'
  },
  {
    title: 'X-Ray Examination',
    description: 'Accurate diagnosis using the latest X-ray equipment',
    altText: 'Veterinary X-ray',
    order: 6,
    isActive: true,
    locale: 'en'
  }
];

async function createGalleryImage(imageData) {
  try {
    const response = await axios.post(`${API_BASE}/gallery-images`, {
      data: imageData
    });
    
    console.log(`✅ تم إنشاء صورة السلايدر: ${imageData.title}`);
    return response.data;
  } catch (error) {
    console.error(`❌ خطأ في إنشاء صورة السلايدر ${imageData.title}:`, error.response?.data || error.message);
    return null;
  }
}

async function seedGalleryImages() {
  console.log('🖼️ بدء إضافة صور السلايدر...');
  
  try {
    // إضافة الصور العربية
    console.log('\n📝 إضافة الصور العربية...');
    for (const imageData of galleryImages) {
      await createGalleryImage(imageData);
      await new Promise(resolve => setTimeout(resolve, 500)); // تأخير قصير
    }
    
    // إضافة الصور الإنجليزية
    console.log('\n📝 إضافة الصور الإنجليزية...');
    for (const imageData of galleryImagesEn) {
      await createGalleryImage(imageData);
      await new Promise(resolve => setTimeout(resolve, 500)); // تأخير قصير
    }
    
    console.log('\n🎉 تم إنشاء جميع صور السلايدر بنجاح!');
    console.log('\n📋 ملاحظات مهمة:');
    console.log('1. تحتاج لرفع الصور الفعلية من لوحة تحكم Strapi');
    console.log('2. اذهب إلى: http://localhost:1337/admin/content-manager/collectionType/api::gallery-image.gallery-image');
    console.log('3. قم بتحرير كل عنصر وإضافة الصورة المناسبة');
    console.log('4. تأكد من نشر العناصر (Publish)');
    
  } catch (error) {
    console.error('❌ خطأ عام في إضافة صور السلايدر:', error);
  }
}

// تشغيل السكربت
if (require.main === module) {
  seedGalleryImages();
}

module.exports = { seedGalleryImages };
