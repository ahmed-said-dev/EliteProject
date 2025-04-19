/**
 * سكريبت لإضافة خدمات القسم الرئيسي
 * 
 * كيفية الاستخدام:
 * - تأكد من تشغيل خادم Strapi
 * - قم بتنفيذ السكريبت باستخدام الأمر:
 *   node scripts/seed-services-home.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// بيانات الربط بالـ API
const API_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'نحتاج إلى تحديد توكن API هنا';

// الخدمات التي سيتم إضافتها
const services = [
  {
    title: {
      en: 'General Wellness & Preventative Care Exams',
      ar: 'فحوصات العافية العامة والرعاية الوقائية'
    },
    iconName: 'faPaw',
  },
  {
    title: {
      en: 'Vaccinations, Antibody Tests, Microchipping',
      ar: 'التطعيمات واختبارات الأجسام المضادة والشرائح الإلكترونية'
    },
    iconName: 'faSyringe',
  },
  {
    title: {
      en: 'Routine Dental Procedures',
      ar: 'إجراءات طب الأسنان الروتينية'
    },
    iconName: 'faTooth',
  },
  {
    title: {
      en: 'Ophthalmology Exam',
      ar: 'فحص العيون'
    },
    iconName: 'faEye',
  },
  {
    title: {
      en: 'Internal Medicine',
      ar: 'الطب الباطني'
    },
    iconName: 'faBone',
  },
  {
    title: {
      en: 'Routine Surgeries',
      ar: 'العمليات الجراحية الروتينية'
    },
    iconName: 'faScissors',
  },
];

// دالة لإنشاء الخدمات
async function createServices() {
  try {
    console.log('بدء إنشاء خدمات القسم الرئيسي...');

    // إنشاء خدمة جديدة لكل عنصر
    for (const service of services) {
      // إنشاء الخدمة باللغة الإنجليزية (اللغة الافتراضية)
      const response = await axios.post(
        `${API_URL}/api/services-homes`,
        {
          data: {
            title: service.title.en,
            iconName: service.iconName,
            locale: 'en'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      // الحصول على معرف الخدمة التي تم إنشاؤها
      const serviceId = response.data.data.id;
      console.log(`تم إنشاء الخدمة باللغة الإنجليزية: ${service.title.en} [ID: ${serviceId}]`);

      // إضافة الترجمة العربية للخدمة
      await axios.post(
        `${API_URL}/api/services-homes/${serviceId}/localizations`,
        {
          title: service.title.ar,
          iconName: service.iconName,
          locale: 'ar'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      console.log(`تم إضافة الترجمة العربية للخدمة: ${service.title.ar}`);
    }

    console.log('تم الانتهاء من إنشاء جميع الخدمات بنجاح!');
  } catch (error) {
    console.error('حدث خطأ أثناء إنشاء الخدمات:', error.message);
    if (error.response) {
      console.error('استجابة الخطأ:', error.response.data);
    }
  }
}

// تنفيذ الدالة الرئيسية
createServices();
