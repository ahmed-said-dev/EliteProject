const strapi = require('@strapi/strapi');

const sampleData = {
  // بيانات تجريبية كاملة للخدمات الموحدة
  unified_service_data: {
    // بيانات الصفحة الرئيسية - العناصر التي تظهر في قسم الخدمات
    home: [
      {
        title: 'Emergency Care',
        iconName: 'emergency'
      },
      {
        title: 'Vaccination',
        iconName: 'vaccine'
      },
      {
        title: 'Surgery',
        iconName: 'surgery'
      },
      {
        title: 'Dental Care',
        iconName: 'dental'
      },
      {
        title: 'Grooming',
        iconName: 'grooming'
      },
      {
        title: 'Pet Boarding',
        iconName: 'boarding'
      }
    ],
    // بيانات صفحة الخدمات - التفاصيل الكاملة لكل خدمة
    pages: [
      {
        title: 'Emergency Veterinary Care',
        description: 'Our emergency veterinary services are available 24/7 to provide immediate care for your pet in critical situations. We have state-of-the-art equipment and experienced veterinarians ready to handle any emergency.',
        badge: 'Available 24/7',
        isActive: true,
        order: 1,
        features: [
          { name: '24/7 Emergency Service', description: 'Round-the-clock emergency care' },
          { name: 'Critical Care Unit', description: 'Advanced life support systems' },
          { name: 'Emergency Surgery', description: 'Immediate surgical intervention when needed' },
          { name: 'Trauma Care', description: 'Specialized trauma treatment protocols' }
        ],
        icons: [
          { name: 'emergency', url: '/icons/emergency.svg' },
          { name: 'heart', url: '/icons/heart.svg' }
        ]
      },
      {
        title: 'Vaccination Services',
        description: 'Comprehensive vaccination programs to protect your pets from common diseases. We follow international vaccination protocols and maintain detailed vaccination records.',
        badge: 'Preventive Care',
        isActive: true,
        order: 2,
        features: [
          { name: 'Core Vaccines', description: 'Essential vaccines for dogs and cats' },
          { name: 'Non-Core Vaccines', description: 'Additional protection based on lifestyle' },
          { name: 'Vaccination Schedule', description: 'Customized vaccination timeline' },
          { name: 'Health Certificates', description: 'Official vaccination documentation' }
        ],
        icons: [
          { name: 'vaccine', url: '/icons/vaccine.svg' },
          { name: 'shield', url: '/icons/shield.svg' }
        ]
      },
      {
        title: 'Surgical Services',
        description: 'Advanced surgical procedures performed by experienced veterinary surgeons using modern equipment and techniques. From routine spaying/neutering to complex orthopedic surgeries.',
        badge: 'Advanced Care',
        isActive: true,
        order: 3,
        features: [
          { name: 'Routine Surgery', description: 'Spaying, neutering, and minor procedures' },
          { name: 'Orthopedic Surgery', description: 'Bone and joint surgical procedures' },
          { name: 'Soft Tissue Surgery', description: 'Internal organ and tissue procedures' },
          { name: 'Post-Surgical Care', description: 'Comprehensive recovery monitoring' }
        ],
        icons: [
          { name: 'surgery', url: '/icons/surgery.svg' },
          { name: 'medical', url: '/icons/medical.svg' }
        ]
      },
      {
        title: 'Dental Care',
        description: 'Complete dental care services including cleaning, extractions, and oral health maintenance. Dental health is crucial for your pet\'s overall wellbeing.',
        badge: 'Oral Health',
        isActive: true,
        order: 4,
        features: [
          { name: 'Dental Cleaning', description: 'Professional dental scaling and polishing' },
          { name: 'Tooth Extractions', description: 'Safe removal of damaged teeth' },
          { name: 'Oral Surgery', description: 'Advanced oral surgical procedures' },
          { name: 'Dental X-rays', description: 'Digital dental radiography' }
        ],
        icons: [
          { name: 'dental', url: '/icons/dental.svg' },
          { name: 'tooth', url: '/icons/tooth.svg' }
        ]
      },
      {
        title: 'Pet Grooming',
        description: 'Professional grooming services to keep your pets clean, healthy, and looking their best. Our experienced groomers handle all breeds with care and expertise.',
        badge: 'Beauty & Hygiene',
        isActive: true,
        order: 5,
        features: [
          { name: 'Full Grooming', description: 'Complete wash, cut, and styling' },
          { name: 'Nail Trimming', description: 'Professional nail care' },
          { name: 'Ear Cleaning', description: 'Thorough ear hygiene' },
          { name: 'Flea Treatment', description: 'Specialized flea and tick removal' }
        ],
        icons: [
          { name: 'grooming', url: '/icons/grooming.svg' },
          { name: 'scissors', url: '/icons/scissors.svg' }
        ]
      },
      {
        title: 'Pet Boarding',
        description: 'Safe and comfortable boarding facilities for when you need to travel. Your pets will receive excellent care, exercise, and attention in our modern facility.',
        badge: 'Accommodation',
        isActive: true,
        order: 6,
        features: [
          { name: 'Climate Controlled', description: 'Comfortable temperature year-round' },
          { name: 'Daily Exercise', description: 'Regular play and exercise sessions' },
          { name: 'Medical Monitoring', description: 'Health checks by veterinary staff' },
          { name: 'Special Diets', description: 'Customized feeding programs' }
        ],
        icons: [
          { name: 'boarding', url: '/icons/boarding.svg' },
          { name: 'home', url: '/icons/home.svg' }
        ]
      }
    ]
  },

  // النسخة العربية
  unified_service_data_ar: {
    home: [
      {
        title: 'الرعاية الطارئة',
        iconName: 'emergency'
      },
      {
        title: 'التطعيمات',
        iconName: 'vaccine'
      },
      {
        title: 'العمليات الجراحية',
        iconName: 'surgery'
      },
      {
        title: 'رعاية الأسنان',
        iconName: 'dental'
      },
      {
        title: 'العناية والتجميل',
        iconName: 'grooming'
      },
      {
        title: 'إيواء الحيوانات',
        iconName: 'boarding'
      }
    ],
    pages: [
      {
        title: 'الرعاية البيطرية الطارئة',
        description: 'خدمات الطوارئ البيطرية متاحة على مدار 24/7 لتوفير الرعاية الفورية لحيوانك الأليف في الحالات الحرجة. لدينا معدات حديثة وأطباء بيطريون ذوو خبرة جاهزون للتعامل مع أي حالة طارئة.',
        badge: 'متاح 24/7',
        isActive: true,
        order: 1,
        features: [
          { name: 'خدمة الطوارئ 24/7', description: 'رعاية طارئة على مدار الساعة' },
          { name: 'وحدة العناية المركزة', description: 'أنظمة دعم الحياة المتقدمة' },
          { name: 'جراحة الطوارئ', description: 'التدخل الجراحي الفوري عند الحاجة' },
          { name: 'رعاية الصدمات', description: 'بروتوكولات علاج الصدمات المتخصصة' }
        ],
        icons: [
          { name: 'emergency', url: '/icons/emergency.svg' },
          { name: 'heart', url: '/icons/heart.svg' }
        ]
      },
      {
        title: 'خدمات التطعيم',
        description: 'برامج تطعيم شاملة لحماية حيواناتك الأليفة من الأمراض الشائعة. نتبع بروتوكولات التطعيم الدولية ونحتفظ بسجلات تطعيم مفصلة.',
        badge: 'الرعاية الوقائية',
        isActive: true,
        order: 2,
        features: [
          { name: 'التطعيمات الأساسية', description: 'التطعيمات الضرورية للكلاب والقطط' },
          { name: 'التطعيمات الإضافية', description: 'حماية إضافية حسب نمط الحياة' },
          { name: 'جدول التطعيم', description: 'جدول زمني مخصص للتطعيمات' },
          { name: 'شهادات صحية', description: 'توثيق رسمي للتطعيمات' }
        ],
        icons: [
          { name: 'vaccine', url: '/icons/vaccine.svg' },
          { name: 'shield', url: '/icons/shield.svg' }
        ]
      },
      {
        title: 'الخدمات الجراحية',
        description: 'إجراءات جراحية متقدمة يقوم بها جراحون بيطريون ذوو خبرة باستخدام معدات وتقنيات حديثة. من العمليات الروتينية للتعقيم إلى جراحات العظام المعقدة.',
        badge: 'الرعاية المتقدمة',
        isActive: true,
        order: 3,
        features: [
          { name: 'الجراحة الروتينية', description: 'التعقيم والإجراءات البسيطة' },
          { name: 'جراحة العظام', description: 'الإجراءات الجراحية للعظام والمفاصل' },
          { name: 'جراحة الأنسجة الرخوة', description: 'إجراءات الأعضاء الداخلية والأنسجة' },
          { name: 'الرعاية ما بعد الجراحة', description: 'مراقبة شاملة للتعافي' }
        ],
        icons: [
          { name: 'surgery', url: '/icons/surgery.svg' },
          { name: 'medical', url: '/icons/medical.svg' }
        ]
      },
      {
        title: 'رعاية الأسنان',
        description: 'خدمات رعاية أسنان كاملة تشمل التنظيف والخلع والحفاظ على صحة الفم. صحة الأسنان أمر بالغ الأهمية لصحة حيوانك الأليف العامة.',
        badge: 'صحة الفم',
        isActive: true,
        order: 4,
        features: [
          { name: 'تنظيف الأسنان', description: 'تنظيف وتلميع الأسنان المهني' },
          { name: 'خلع الأسنان', description: 'إزالة آمنة للأسنان التالفة' },
          { name: 'جراحة الفم', description: 'إجراءات جراحية متقدمة للفم' },
          { name: 'أشعة الأسنان', description: 'تصوير رقمي للأسنان' }
        ],
        icons: [
          { name: 'dental', url: '/icons/dental.svg' },
          { name: 'tooth', url: '/icons/tooth.svg' }
        ]
      },
      {
        title: 'تجميل الحيوانات الأليفة',
        description: 'خدمات تجميل احترافية للحفاظ على نظافة حيواناتك الأليفة وصحتها ومظهرها الأفضل. خبراء التجميل ذوو الخبرة يتعاملون مع جميع السلالات بعناية وخبرة.',
        badge: 'الجمال والنظافة',
        isActive: true,
        order: 5,
        features: [
          { name: 'التجميل الكامل', description: 'غسيل وقص وتصفيف كامل' },
          { name: 'تقليم الأظافر', description: 'عناية احترافية بالأظافر' },
          { name: 'تنظيف الأذن', description: 'نظافة شاملة للأذن' },
          { name: 'علاج البراغيث', description: 'إزالة متخصصة للبراغيث والقراد' }
        ],
        icons: [
          { name: 'grooming', url: '/icons/grooming.svg' },
          { name: 'scissors', url: '/icons/scissors.svg' }
        ]
      },
      {
        title: 'إيواء الحيوانات الأليفة',
        description: 'مرافق إيواء آمنة ومريحة عندما تحتاج للسفر. ستتلقى حيواناتك الأليفة رعاية ممتازة وتمارين واهتمام في منشأتنا الحديثة.',
        badge: 'الإقامة',
        isActive: true,
        order: 6,
        features: [
          { name: 'تحكم في المناخ', description: 'درجة حرارة مريحة على مدار السنة' },
          { name: 'تمارين يومية', description: 'جلسات لعب وتمارين منتظمة' },
          { name: 'مراقبة طبية', description: 'فحوصات صحية من قبل الطاقم البيطري' },
          { name: 'حميات خاصة', description: 'برامج تغذية مخصصة' }
        ],
        icons: [
          { name: 'boarding', url: '/icons/boarding.svg' },
          { name: 'home', url: '/icons/home.svg' }
        ]
      }
    ]
  }
};

async function seedUnifiedServices() {
  console.log('🌱 Starting unified services seeding...');
  
  try {
    // حذف البيانات الموجودة
    const existingEntries = await strapi.entityService.findMany('api::unified-service.unified-service');
    for (const entry of existingEntries) {
      await strapi.entityService.delete('api::unified-service.unified-service', entry.id);
    }
    console.log('✅ Cleared existing unified services');

    // إضافة البيانات الإنجليزية
    const englishEntry = await strapi.entityService.create('api::unified-service.unified-service', {
      data: {
        ...sampleData.unified_service_data,
        publishedAt: new Date(),
        locale: 'en'
      }
    });
    console.log('✅ Created English unified service entry:', englishEntry.id);

    // إضافة البيانات العربية
    const arabicEntry = await strapi.entityService.create('api::unified-service.unified-service', {
      data: {
        ...sampleData.unified_service_data_ar,
        publishedAt: new Date(),
        locale: 'ar'
      }
    });
    console.log('✅ Created Arabic unified service entry:', arabicEntry.id);

    console.log('🎉 Unified services seeding completed successfully!');
    console.log('📝 Test the endpoints:');
    console.log('   English: GET /api/unified-services?locale=en');
    console.log('   Arabic:  GET /api/unified-services?locale=ar');
    
  } catch (error) {
    console.error('❌ Error seeding unified services:', error);
    throw error;
  }
}

// تشغيل السكريبت
async function main() {
  try {
    // تحديد مسار Strapi
    const strapiPath = process.cwd().includes('elite-backend') 
      ? process.cwd() 
      : require('path').join(process.cwd(), 'elite-backend');
    
    process.chdir(strapiPath);
    
    // تحميل Strapi
    const strapi = require('@strapi/strapi');
    const app = await strapi({
      dir: strapiPath,
      autoReload: false,
      serveAdminPanel: false,
    }).load();
    
    // تعيين global strapi
    global.strapi = app;
    
    await seedUnifiedServices();
    await app.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { seedUnifiedServices, sampleData };












