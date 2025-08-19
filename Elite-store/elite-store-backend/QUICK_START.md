# 🚀 Elite Store Backend - دليل البدء السريع

## التثبيت والتشغيل في 3 خطوات

### 1️⃣ تثبيت التبعيات
```bash
npm install
```

### 2️⃣ إعداد متغيرات البيئة
```bash
# انسخ ملف التكوين
cp config.example.env .env

# عدل الإعدادات حسب احتياجاتك (اختياري للتجربة)
nano .env
```

### 3️⃣ تشغيل المشروع
```bash
# تشغيل مع بيانات تجريبية
npm run dev:setup

# أو تشغيل عادي
npm run start:dev
```

## ✅ تأكد من نجاح التشغيل

بعد التشغيل، افتح المتصفح وادخل على:

- **🌐 API**: http://localhost:3001
- **📚 Swagger Docs**: http://localhost:3001/api/docs  
- **🎯 GraphQL**: http://localhost:3001/graphql

## 🔑 تسجيل الدخول كمدير

إذا قمت بتشغيل `npm run dev:setup`، ستجد حساب مدير جاهز:

- **البريد**: admin@elitestore.com
- **كلمة المرور**: [use_your_admin_password]

## 📱 اختبار APIs

### تسجيل مستخدم جديد
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### تسجيل الدخول
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elitestore.com",
    "password": "[your_admin_password]"
  }'
```

### جلب المنتجات
```bash
curl http://localhost:3001/api/products
```

## 🐳 تشغيل مع Docker

```bash
# التطوير
docker-compose up elite-store-dev

# الإنتاج  
docker-compose up elite-store-api
```

## 🛠️ Scripts مفيدة

```bash
# التطوير
npm run start:dev        # تشغيل مع Hot Reload
npm run start:debug      # تشغيل مع Debugger

# الإنتاج
npm run build           # بناء المشروع
npm run start:prod      # تشغيل الإنتاج

# قاعدة البيانات
npm run seed           # إنشاء بيانات تجريبية

# الجودة
npm run lint           # فحص الكود
npm run test           # تشغيل الاختبارات
npm run format         # تنسيق الكود
```

## 🔧 حل المشاكل الشائعة

### المنفذ مستخدم
```bash
# تغيير المنفذ في .env
PORT=3002
```

### مشاكل قاعدة البيانات
```bash
# حذف قاعدة البيانات وإعادة إنشائها
rm elite-store.db
npm run start:dev
```

### مشاكل التبعيات
```bash
# إعادة تثبيت التبعيات
npm run clean:install
```

## 📞 الدعم

- 📖 **التوثيق الكامل**: راجع `README.md`
- 🌐 **Swagger UI**: http://localhost:3001/api/docs
- 🎯 **GraphQL**: http://localhost:3001/graphql

---

🎉 **تهانينا!** لديك الآن نظام ecommerce كامل ومتطور جاهز للاستخدام!
 