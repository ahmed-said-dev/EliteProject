# إصلاح مشكلة روابط تفاصيل الخدمات وتغيير اللغة

## المشكلة الأساسية

عند الانتقال من صفحة الخدمات لصفحة تفاصيل الخدمة، كانت المشكلة تحدث في المراحل التالية:

### السيناريو الإشكالي:
1. **زيارة صفحة الخدمات بالإنجليزية**: `/services`
2. **الضغط على خدمة معينة**: ينقل لـ `/service-detail/101` (page ID)
3. **تغيير اللغة للعربية**: يحاول الذهاب لـ `/ar/service-detail/101`
4. **المشكلة**: ID 101 موجود فقط بالإنجليزية، العربي له ID مختلف (مثل 201)
5. **النتيجة**: خطأ "الخدمة غير موجودة"

## سبب المشكلة

```javascript
// في صفحة الخدمات (services.js) - الكود الخاطئ
<Link href={`/service-detail/${service.id}`}>  // service.id = page ID (مختلف لكل لغة)
```

كل `page` في Strapi له ID مختلف حسب اللغة:
- **الإنجليزية**: page ID = 101, 102, 103...
- **العربية**: page ID = 201, 202, 203...

ولكن كلاهما ينتمي لنفس الخدمة الرئيسية (parent service) التي لها ID ثابت.

## الحل المطبق

### 1. تحديث useHomeServices Hook

```typescript
// إضافة parentServiceId للـ pages للاستخدام في الروابط
const pagesWithParentId = data?.data?.[0]?.pages?.map(page => ({
  ...page,
  parentServiceId: data?.data?.[0]?.id // ID الخدمة الرئيسية
})) || [];

return {
  // ... other properties
  pages: pagesWithParentId,  // بدلاً من pages الأصلية
};
```

### 2. تحديث صفحة الخدمات (services.js)

```javascript
// الكود الجديد المُصحح
<Link href={`/service-detail/${service.parentServiceId || service.id}`}>
```

### 3. تحديث TypeScript Interface

```typescript
interface ServicePage {
  id: number;
  parentServiceId?: number; // إضافة الحقل الجديد
  title: string;
  // ... other properties
}
```

## كيف يعمل الحل

### البيانات من API:
```json
{
  "data": [
    {
      "id": 1,           // ← ID الخدمة الرئيسية (ثابت)
      "documentId": "service-123",
      "locale": "en",
      "pages": [
        {
          "id": 101,     // ← Page ID (مختلف لكل لغة)
          "title": "Vaccination Services"
        }
      ]
    }
  ]
}
```

### النتيجة بعد المعالجة:
```javascript
pages: [
  {
    id: 101,                // Page ID الأصلي
    parentServiceId: 1,     // ID الخدمة الرئيسية المضاف
    title: "Vaccination Services"
  }
]
```

### الروابط المُحدّثة:
- **الإنجليزية**: `/service-detail/1` (بدلاً من `/service-detail/101`)
- **العربية**: `/ar/service-detail/1` (بدلاً من `/ar/service-detail/201`)

## آلية العمل في الخلفية

Backend controller `unified-service.ts` يحتوي على منطق ذكي:

```typescript
// إذا تم طلب لغة مختلفة عن المُخزنة
if (locale && baseEntry.locale !== locale) {
  const documentId = baseEntry.documentId;
  if (documentId) {
    // البحث عن نفس الخدمة بالـ documentId واللغة المطلوبة
    const localizedList = await strapi.entityService.findMany(
      'api::unified-service.unified-service',
      {
        filters: { documentId },
        locale,
        populate,
        limit: 1,
      }
    );
    // إرجاع النسخة باللغة المطلوبة
    if (localizedList.length > 0) {
      return localizedList[0];
    }
  }
}
```

## اختبار الحل

### 1. الاختبار المحلي:
```bash
cd elite-frontend
npm run dev
```

### 2. سيناريو الاختبار:
1. اذهب لـ `http://localhost:3000/services`
2. اضغط على أي خدمة
3. لاحظ الـ URL: `http://localhost:3000/service-detail/1` (ID ثابت)
4. غير اللغة للعربية
5. لاحظ الـ URL: `http://localhost:3000/ar/service-detail/1` (نفس الـ ID)
6. المحتوى يظهر بالعربية ✅

### 3. اختبار التحديث:
1. كن في `http://localhost:3000/ar/service-detail/1`
2. اضغط F5 (تحديث)
3. يجب أن يظهر المحتوى العربي بدون خطأ ✅

## الملفات المُحدّثة

1. **`src/hooks/useHomeServices.ts`**:
   - إضافة `parentServiceId`
   - تحديث TypeScript interface
   - تحديث منطق معالجة البيانات

2. **`pages/services.js`**:
   - تحديث الروابط لاستخدام `parentServiceId`

3. **التحديثات السابقة**:
   - `src/context/LanguageContext.js` (تم إصلاحه مسبقاً)
   - `src/hooks/useUnifiedServiceById.ts` (تم تحسينه مسبقاً)

## النشر على الخادم

```bash
# رفع الملفات المُحدّثة
scp src/hooks/useHomeServices.ts root@134.122.102.182:/var/www/EliteProject/Elite-Frontend/src/hooks/
scp pages/services.js root@134.122.102.182:/var/www/EliteProject/Elite-Frontend/pages/

# الدخول للخادم وإعادة البناء
ssh root@134.122.102.182
cd /var/www/EliteProject/Elite-Frontend
npm run build
pm2 restart elite-frontend
```

## خلاصة الحل

✅ **المشكلة**: الروابط تستخدم Page IDs مختلفة لكل لغة  
✅ **الحل**: استخدام Parent Service ID الثابت  
✅ **النتيجة**: تغيير اللغة يحافظ على نفس ID في الـ URL  
✅ **الدعم**: Backend يدعم هذا المنطق عبر documentId lookup  

الآن تغيير اللغة في صفحة تفاصيل الخدمة يعمل بشكل مثالي!
