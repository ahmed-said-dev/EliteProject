# إعداد Strapi المحلي مع الـ Frontend

دليل شامل لربط الـ Frontend بـ Strapi backend المحلي بدلاً من الخادم البعيد.

## 🚀 التشغيل السريع

### الخطوة 1: تشغيل Scripts التبديل

```bash
# للتبديل للتطوير المحلي
./switch-to-local.bat

# للعودة للخوادم البعيدة
./switch-to-remote.bat
```

### الخطوة 2: تشغيل الخوادم

```bash
# 1. تشغيل Strapi Backend المحلي
cd elite-backend
npm run dev

# 2. تشغيل Elite Store Backend (في نافذة أخرى)
cd Elite-store/elite-store-backend
npm start

# 3. تشغيل Frontend (في نافذة ثالثة)
cd elite-frontend
npm run dev
```

## 📋 التفاصيل الفنية

### إعدادات البيئة المحلية

عند استخدام `.env.local`:

```env
# Strapi Backend المحلي
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:1337

# Elite Store API (محلي)
NEXT_PUBLIC_STORE_API_URL=http://localhost:3001/api

# Saleor GraphQL (محلي)
NEXT_PUBLIC_SALEOR_API_URL=http://localhost:8000/graphql/
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
```

### إعدادات البيئة البعيدة

عند حذف `.env.local` (الافتراضي):

```env
# Strapi Backend البعيد
NEXT_PUBLIC_API_URL=http://134.122.102.182:8080
NEXT_PUBLIC_STRAPI_URL=http://134.122.102.182:8080
NEXT_PUBLIC_IMAGE_BASE_URL=http://134.122.102.182:8080

# Elite Store API (بعيد)
NEXT_PUBLIC_STORE_API_URL=http://134.122.102.182:3001/api

# Saleor GraphQL (بعيد)
NEXT_PUBLIC_GRAPHQL_URL=http://134.122.102.182/graphql
```

## 🔧 APIs المتأثرة

### Strapi APIs (ستستخدم localhost:1337)

- ✅ **الأطباء**: `/api/doctor-homes`
- ✅ **الخدمات**: `/api/services`
- ✅ **المقالات**: `/api/blog-posts`
- ✅ **أعضاء الفريق**: `/api/team-members`
- ✅ **خدمات الصفحة الرئيسية**: `/api/home-services`
- ✅ **المواعيد**: `/api/appointments`
- ✅ **العضويات**: `/api/memberships`

### Elite Store APIs (ستبقى على localhost:3001)

- 🛒 **المنتجات**: `/api/products`
- 🛒 **السلة**: `/api/cart`
- 🛒 **الطلبات**: `/api/orders`
- 🔐 **المصادقة**: `/api/auth`

### Saleor GraphQL (للمنتجات المتقدمة)

- 📦 **GraphQL**: `localhost:8000/graphql`

## 🧪 اختبار الاتصال

### اختبار Strapi المحلي

```bash
# اختبار أساسي
curl http://localhost:1337/admin

# اختبار API
curl "http://localhost:1337/api/doctor-homes?populate=*"
```

### اختبار Elite Store

```bash
curl http://localhost:3001/api/health
```

## 📁 ملفات الإعداد المحدثة

### `next.config.js`
- ✅ تم تحديثه لاستخدام متغيرات البيئة
- ✅ يدعم القيم الافتراضية المحلية

### `src/utils/api.js`
- ✅ يستخدم `NEXT_PUBLIC_API_URL` 
- ✅ يدعم التبديل التلقائي

### Scripts الجديدة
- ✅ `switch-to-local.bat` - للتطوير المحلي
- ✅ `switch-to-remote.bat` - للخوادم البعيدة
- ✅ `local-config.env` - نموذج الإعدادات المحلية

## 🚨 نصائح مهمة

### للتطوير المحلي:
1. **تأكد من تشغيل Strapi**: `cd elite-backend && npm run dev`
2. **تحقق من المنفذ**: Strapi يجب أن يعمل على `1337`
3. **امسح Cache المتصفح**: `Ctrl+Shift+R`

### للنشر:
1. **احذف `.env.local`** قبل النشر
2. **تأكد من URLs البعيدة** في `next.config.js`
3. **اختبر الاتصال** بالخوادم البعيدة

## 🔄 التبديل بين البيئات

### التبديل للمحلي:
```bash
./switch-to-local.bat
npm run dev
```

### التبديل للبعيد:
```bash
./switch-to-remote.bat
npm run dev
```

## 📞 استكشاف الأخطاء

### خطأ: "API URL not responding"
```bash
# تحقق من تشغيل Strapi
curl http://localhost:1337/admin

# إعادة تشغيل Strapi
cd elite-backend
npm run dev
```

### خطأ: "CORS issues"
- تأكد من إعدادات CORS في Strapi
- تحقق من الروابط في `next.config.js`

### خطأ: "Images not loading"
- تأكد من `NEXT_PUBLIC_IMAGE_BASE_URL`
- تحقق من مجلد `uploads` في Strapi

---

🎉 **الآن يمكنك التطوير محلياً مع Strapi!**
