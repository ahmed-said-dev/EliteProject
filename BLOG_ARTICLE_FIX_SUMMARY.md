# حل مشكلة صفحة تفاصيل المقالة

## المشكلة المحددة
```
Request URL: https://elitevetksa.com/api/blog-articles/understanding-pet-behavior?populate=*&locale=en
Status Code: 400 Bad Request
```

## الحلول المطبقة

### 1. إصلاح Backend Controller
**الملف**: `elite-backend/src/api/blog-article/controllers/blog-article.ts`

**التغييرات الرئيسية:**
- تحديث `findOne` method لاستخدام `strapi.db.query` بدلاً من `entityService`
- إصلاح البحث بالـ slug والـ ID
- إضافة logging مفصل للتشخيص
- تحسين error handling
- إصلاح update لعدد المشاهدات

**المميزات الجديدة:**
- البحث بالـ slug: `/api/blog-articles/understanding-pet-behavior`
- البحث بالـ ID: `/api/blog-articles/5`
- دعم كامل للـ i18n (العربية والإنجليزية)
- logging للتشخيص والتطوير

### 2. تحسين Frontend Hook
**الملف**: `elite-frontend/src/hooks/useBlogApi.ts`

**التغييرات:**
- إضافة logging مفصل في `useBlogArticle`
- تحسين error handling
- إصلاح `useRelatedArticles` للتعامل مع عدم وجود `/related` endpoint
- إضافة fallback للمقالات العشوائية

### 3. إنشاء Scripts للاختبار والبيانات
**الملفات الجديدة:**
- `test-blog-api.js`: اختبار شامل للـ API
- `add-test-articles.js`: إضافة بيانات تجريبية شاملة

## الاستخدام

### 1. تشغيل الباك اند:
```bash
cd elite-backend
npm run develop
```

### 2. إضافة بيانات تجريبية:
```bash
cd elite-backend
node add-test-articles.js
```

### 3. اختبار الـ API:
```bash
cd elite-backend
node test-blog-api.js
```

### 4. تشغيل الفرونت اند:
```bash
cd elite-frontend
npm run dev
```

## URLs للاختبار

### Backend API:
- جميع المقالات: `http://localhost:1337/api/blog-articles?populate=*`
- المقالات الإنجليزية: `http://localhost:1337/api/blog-articles?populate=*&locale=en`
- المقالات العربية: `http://localhost:1337/api/blog-articles?populate=*&locale=ar`
- مقالة بالـ slug: `http://localhost:1337/api/blog-articles/understanding-pet-behavior?populate=*&locale=en`
- مقالة بالـ ID: `http://localhost:1337/api/blog-articles/1?populate=*&locale=en`

### Frontend:
- صفحة المقالات: `http://localhost:3000/media`
- تفاصيل المقالة: `http://localhost:3000/media/understanding-pet-behavior`
- العربية: `http://localhost:3000/ar/media/understanding-pet-behavior-ar`

## البيانات التجريبية المُضافة

### مقالات إنجليزية:
1. **Understanding Pet Behavior** - `understanding-pet-behavior`
2. **Nutrition Guidelines for Healthy Pets** - `nutrition-guidelines-healthy-pets`
3. **Preventive Care: The Key to Pet Health** - `preventive-care-pet-health`

### مقالات عربية:
1. **فهم سلوك الحيوانات الأليفة** - `understanding-pet-behavior-ar`
2. **إرشادات التغذية للحيوانات الأليفة الصحية** - `nutrition-guidelines-healthy-pets-ar`

### فئات:
- Pet Care / رعاية الحيوانات الأليفة
- Nutrition / التغذية
- Health / الصحة
- Behavior / السلوك

### مؤلفين:
- Dr. Sarah Johnson / د. سارة جونسون
- Dr. Ahmed Mohamed / د. أحمد محمد

## استكشاف الأخطاء

### إذا كانت المقالات لا تظهر:
1. تأكد من تشغيل Strapi على `http://localhost:1337`
2. تشغيل script إضافة البيانات: `node add-test-articles.js`
3. فحص logs في الكونسول للتشخيص

### إذا كان الـ deployment لا يعمل:
1. تأكد من رفع الملفات المحدثة للسيرفر
2. إعادة تشغيل Strapi على السيرفر
3. فحص أن قاعدة البيانات تحتوي على المقالات

## الملفات المعدلة:
1. `elite-backend/src/api/blog-article/controllers/blog-article.ts`
2. `elite-backend/src/api/blog-article/routes/blog-article.ts`
3. `elite-frontend/src/hooks/useBlogApi.ts`
4. `elite-backend/test-blog-api.js` (جديد)
5. `elite-backend/add-test-articles.js` (جديد)

## التأكد من النجاح:
✅ API يرجع 200 بدلاً من 400  
✅ صفحة تفاصيل المقالة تعمل  
✅ البحث بالـ slug يعمل  
✅ دعم العربية والإنجليزية  
✅ المقالات ذات الصلة تظهر  
✅ عدد المشاهدات يزيد
