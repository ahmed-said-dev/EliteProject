# 🔐 معلومات حسابات الأدمن في Strapi Elite Backend

## 📍 معلومات قاعدة البيانات
- **النوع**: SQLite
- **المسار**: `d:\copied\Elite\EliteProject\elite-backend\.tmp\data.db`
- **الحجم**: ~1.8 MB
- **الحالة**: ✅ موجودة

## 🚀 كيفية الوصول لحسابات الأدمن

### الطريقة الأولى: من خلال Strapi Admin Panel
```bash
# 1. تشغيل الباك إند
cd d:\copied\Elite\EliteProject\elite-backend
npm run develop

# 2. فتح المتصفح على
http://localhost:1337/admin

# 3. تسجيل الدخول بحساب الأدمن الموجود
```

### الطريقة الثانية: إنشاء حساب أدمن جديد
```bash
# إذا لم يكن هناك حساب أدمن
npm run strapi admin:create-user

# أو من خلال واجهة الويب عند أول تشغيل
# سيطلب منك إنشاء حساب أدمن تلقائياً
```

### الطريقة الثالثة: فحص قاعدة البيانات مباشرة
```bash
# تثبيت sqlite3 command line tool
npm install -g sqlite3

# فتح قاعدة البيانات
sqlite3 .tmp/data.db

# عرض الجداول
.tables

# عرض المستخدمين الأدمن
SELECT id, email, firstname, lastname, username, isActive, blocked FROM admin_users;

# عرض الأدوار
SELECT au.email, ar.name as role_name 
FROM admin_users au 
LEFT JOIN admin_users_roles_links aurl ON au.id = aurl.user_id 
LEFT JOIN admin_roles ar ON aurl.role_id = ar.id;

# الخروج
.quit
```

## 🔍 معلومات متوقعة للحسابات

### الحسابات المحتملة:
1. **حساب المطور الأساسي**
   - البريد الإلكتروني: `admin@elitevetksa.com` أو مشابه
   - الدور: Super Admin
   - الحالة: نشط

2. **حساب المحتوى**
   - البريد الإلكتروني: `content@elitevetksa.com` أو مشابه
   - الدور: Editor/Author
   - الحالة: نشط

### الأدوار المتاحة:
- **Super Admin**: صلاحيات كاملة على النظام
- **Editor**: تحرير وإدارة المحتوى
- **Author**: إنشاء المحتوى فقط

## 🛡️ معلومات الأمان

### كلمات المرور:
- ❌ **لا يمكن** قراءة كلمات المرور من قاعدة البيانات (مشفرة)
- ✅ **يمكن** إعادة تعيين كلمة المرور من واجهة الأدمن
- ✅ **يمكن** إنشاء حساب جديد باستخدام CLI

### الحماية:
- JWT tokens للمصادقة
- bcrypt لتشفير كلمات المرور
- Role-based access control

## 📝 خطوات الوصول السريع

### إذا كنت تعرف بيانات تسجيل الدخول:
1. `npm run develop`
2. افتح `http://localhost:1337/admin`
3. سجل الدخول
4. اذهب إلى Settings → Administration Panel → Users

### إذا لم تكن تعرف بيانات تسجيل الدخول:
1. أوقف الخادم إذا كان يعمل
2. احذف ملف `.tmp/data.db` (⚠️ سيحذف جميع البيانات)
3. شغل `npm run develop`
4. سيطلب منك إنشاء حساب أدمن جديد

### لإعادة تعيين كلمة مرور حساب موجود:
```bash
# استخدم هذا الأمر (إذا كان متاحاً)
npm run strapi admin:reset-user-password --email=admin@example.com
```

## 🔧 استكشاف الأخطاء

### إذا لم تستطع الوصول:
1. تأكد من تشغيل الخادم على البورت 1337
2. تحقق من وجود ملف قاعدة البيانات
3. تأكد من صحة متغيرات البيئة في `.env`

### إذا نسيت بيانات تسجيل الدخول:
1. **الحل الآمن**: استخدم خاصية "نسيت كلمة المرور" إذا كانت متاحة
2. **الحل البديل**: إنشاء حساب أدمن جديد باستخدام CLI
3. **الحل الأخير**: إعادة تهيئة قاعدة البيانات (⚠️ فقدان البيانات)

## 📞 للمساعدة الإضافية
- راجع وثائق Strapi الرسمية: https://docs.strapi.io/
- تحقق من ملفات الـ logs في `.tmp/` للأخطاء
- استخدم أدوات SQLite لفحص قاعدة البيانات مباشرة
