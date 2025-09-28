# معلومات حسابات الأدمن في Strapi

## 📍 موقع قاعدة البيانات
- المسار: `d:\copied\Elite\EliteProject\elite-backend\.tmp\data.db`
- النوع: SQLite
- الحجم: ~1.8 MB

## 🔍 كيفية الوصول لمعلومات الأدمن

### الطريقة الأولى: من خلال Strapi Admin Panel
1. تشغيل الباك إند: `npm run develop`
2. فتح المتصفح على: `http://localhost:1337/admin`
3. تسجيل الدخول بحساب الأدمن
4. الذهاب إلى Settings > Administration Panel > Users

### الطريقة الثانية: من خلال قاعدة البيانات
```sql
-- الاستعلام للحصول على جميع المستخدمين الأدمن
SELECT 
  id,
  email,
  firstname,
  lastname,
  username,
  isActive,
  blocked,
  preferedLanguage,
  created_at,
  updated_at
FROM admin_users;

-- الاستعلام للحصول على أدوار المستخدمين
SELECT 
  au.email,
  au.firstname,
  au.lastname,
  ar.name as role_name,
  ar.description as role_description
FROM admin_users au
LEFT JOIN admin_users_roles_links aurl ON au.id = aurl.user_id
LEFT JOIN admin_roles ar ON aurl.role_id = ar.id
ORDER BY au.email, ar.name;
```

### الطريقة الثالثة: باستخدام أدوات SQLite
```bash
# تثبيت sqlite3 command line tool
npm install -g sqlite3

# فتح قاعدة البيانات
sqlite3 .tmp/data.db

# تشغيل الاستعلامات
.tables
SELECT * FROM admin_users;
.quit
```

## 🔐 معلومات الأمان

### كلمات المرور
- كلمات المرور مشفرة باستخدام bcrypt
- لا يمكن قراءة كلمات المرور الأصلية من قاعدة البيانات
- لإعادة تعيين كلمة المرور، استخدم واجهة Strapi Admin

### الأدوار الافتراضية
- **Super Admin**: صلاحيات كاملة
- **Editor**: تحرير المحتوى
- **Author**: إنشاء المحتوى

## 📝 ملاحظات مهمة
1. تأكد من تشغيل Strapi قبل محاولة الوصول للبيانات
2. احتفظ بنسخة احتياطية من قاعدة البيانات
3. لا تشارك معلومات تسجيل الدخول مع أطراف غير موثوقة

## 🚀 إنشاء حساب أدمن جديد
```bash
# من خلال Strapi CLI
npm run strapi admin:create-user

# أو من خلال واجهة الويب عند أول تشغيل
http://localhost:1337/admin
```
