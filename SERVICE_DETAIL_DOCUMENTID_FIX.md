# حل مشكلة تغيير اللغة في صفحة تفاصيل الخدمة

## المشكلة
عند تغيير اللغة في صفحة تفاصيل الخدمة، كان الموقع يستخدم ID مختلف لكل لغة، مما يؤدي إلى:
- عرض خدمة مختلفة عند تغيير اللغة
- رسالة "الخدمة غير موجودة" في بعض الحالات
- عدم استمرارية تجربة المستخدم

## السبب
كان النظام يستخدم الـ `id` الرقمي في URLs، وهذا الـ ID مختلف لكل locale في Strapi:
```json
{
  "id": 5,           // مختلف لكل لغة
  "documentId": "u8avc36yv9lduz58a05cefzp", // ثابت لجميع اللغات
  "locale": "en"
}
```

## الحل المطبق

### 1. تحديث Hook للبحث بـ documentId
**الملف:** `src/hooks/useUnifiedServiceById.ts`
- إضافة البحث بـ `documentId` أولاً باستخدام Strapi filters
- الاحتفاظ بـ fallback للـ `id` للتوافق مع النظام القديم
- URL المستخدم: `${api}/api/unified-services?filters[documentId][$eq]=${id}&locale=${locale}`

### 2. تحديث جميع اللينكات لاستخدام documentId
تم تحديث الملفات التالية لاستخدام `documentId` بدلاً من `id`:

**الصفحات:**
- `pages/services.js`: صفحة قائمة الخدمات
- `pages/service-detail/[id].tsx`: صفحة تفاصيل الخدمة

**المكونات:**
- `src/components/Services.tsx`: مكون الخدمات في الصفحة الرئيسية
- `src/components/Header/Header.jsx`: قائمة الخدمات في الهيدر
- `src/components/Footer/Footer.jsx`: روابط الخدمات في الفوتر
- `src/components/ServiceDetail/components/ServiceRelated.tsx`: الخدمات المرتبطة

### 3. آلية التوافق مع النظام القديم
تم إضافة fallback في جميع المكونات:
```javascript
// استخدام documentId إذا متوفر، والعودة إلى id للتوافق
const serviceIdentifier = service.documentId || service.id;
```

## النتيجة
- **URL ثابت:** نفس الخدمة تحافظ على نفس الـ documentId في جميع اللغات
- **تجربة مستخدم متسقة:** تغيير اللغة يعرض نفس الخدمة بلغة مختلفة
- **توافق عكسي:** النظام يعمل مع الـ IDs القديمة

## مثال على الاستخدام

### قبل الإصلاح:
```
الإنجليزية: /service-detail/5
العربية: /service-detail/12  ← خدمة مختلفة!
```

### بعد الإصلاح:
```
الإنجليزية: /service-detail/u8avc36yv9lduz58a05cefzp
العربية: /ar/service-detail/u8avc36yv9lduz58a05cefzp  ← نفس الخدمة!
```

## ملاحظات للمطورين
1. **إنشاء لينكات جديدة:** استخدم دائماً `documentId` للخدمات الجديدة
2. **API Response:** تأكد أن API يرجع `documentId` في response
3. **اختبار:** تأكد من اختبار تغيير اللغة على جميع الخدمات

## ملفات تم تعديلها
1. `src/hooks/useUnifiedServiceById.ts`
2. `pages/services.js`
3. `src/components/Services.tsx`
4. `src/components/Header/Header.jsx`
5. `src/components/Footer/Footer.jsx`
6. `src/components/ServiceDetail/components/ServiceRelated.tsx`
