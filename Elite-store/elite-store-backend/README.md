# Elite Store Backend

نظام متطور وشامل لإدارة المتجر الإلكتروني مبني بـ NestJS مع جميع المزايا والوظائف المطلوبة لتطبيق ecommerce متكامل.

## 🚀 المزايا الرئيسية

### 🔐 Authentication & Authorization
- نظام تسجيل دخول وتسجيل جديد متطور
- JWT tokens مع انتهاء صلاحية قابل للتخصيص
- نظام أدوار مستخدمين (Admin, Moderator, User)
- تأكيد البريد الإلكتروني
- استعادة كلمة المرور
- حماية متقدمة مع Guards و Decorators

### 🛍️ إدارة المنتجات
- CRUD كامل للمنتجات
- فئات هرمية للمنتجات
- نظام صور متعددة لكل منتج
- نظام تقييمات ومراجعات
- إدارة المخزون والأسعار
- البحث والتصفية المتقدم

### 🛒 إدارة سلة التسوق
- سلة تسوق ديناميكية
- إضافة وتعديل وحذف المنتجات
- حفظ السلة للمستخدمين المسجلين
- دعم المستخدمين الضيوف

### 📦 إدارة الطلبات
- نظام طلبات متكامل
- تتبع حالة الطلب
- إدارة تفاصيل الشحن والفوترة
- تاريخ كامل للطلبات
- إشعارات بريد إلكتروني تلقائية

### 💳 نظام الدفع
- تكامل مع Stripe
- دعم طرق دفع متعددة
- معالجة آمنة للمدفوعات
- نظام استرداد

### 📊 لوحة تحكم الإدارة
- إحصائيات شاملة
- إدارة المستخدمين
- إدارة المنتجات والطلبات
- تقارير المبيعات

### 🎨 واجهات برمجة متقدمة
- REST API كامل مع Swagger documentation
- GraphQL API مع Apollo Server
- دعم كامل للـ TypeScript
- Validation شامل مع Class Validator

## 📋 متطلبات النظام

- Node.js 18 أو أحدث
- npm أو yarn
- SQLite (مثبت تلقائياً)

## 🛠️ التثبيت والإعداد

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد متغيرات البيئة
انسخ ملف `.env.example` إلى `.env` وعدل القيم حسب احتياجاتك:

```bash
cp .env.example .env
```

### 3. إنشاء قاعدة البيانات
```bash
npm run typeorm:migration:run
```

### 4. إنشاء بيانات تجريبية (اختياري)
```bash
npm run seed
```

### 5. تشغيل التطبيق
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## 🌐 الوصول للتطبيق

بعد تشغيل التطبيق، ستتمكن من الوصول إلى:

- **API Server**: http://localhost:3001
- **Swagger Documentation**: http://localhost:3001/api/docs
- **GraphQL Playground**: http://localhost:3001/graphql

## 📝 Scripts متاحة

```bash
# Development
npm run start:dev          # تشغيل في وضع التطوير مع Hot Reload
npm run start:debug        # تشغيل مع Debugger

# Production
npm run build              # بناء للإنتاج
npm run start:prod         # تشغيل في وضع الإنتاج

# Testing
npm run test               # تشغيل الاختبارات
npm run test:watch         # تشغيل الاختبارات مع المراقبة
npm run test:e2e           # اختبارات End-to-End

# Database
npm run typeorm:migration:generate -- MigrationName  # إنشاء migration جديد
npm run typeorm:migration:run      # تطبيق migrations
npm run typeorm:migration:revert   # التراجع عن آخر migration
npm run seed                       # إنشاء بيانات تجريبية

# Code Quality
npm run lint               # فحص الكود
npm run format             # تنسيق الكود
```

## 🗂️ هيكل المشروع

```
src/
├── admin/                 # لوحة تحكم الإدارة
├── auth/                  # نظام المصادقة
│   ├── decorators/        # Custom Decorators
│   ├── dto/              # Data Transfer Objects
│   ├── guards/           # Route Guards
│   └── strategies/       # Passport Strategies
├── cart/                 # إدارة سلة التسوق
├── categories/           # إدارة فئات المنتجات
├── config/               # ملفات التكوين
├── emails/               # خدمة البريد الإلكتروني
├── orders/               # إدارة الطلبات
├── payments/             # نظام الدفع
├── products/             # إدارة المنتجات
├── uploads/              # رفع الملفات
└── users/                # إدارة المستخدمين
```

## 🔧 APIs المتاحة

### Authentication APIs
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/verify-email` - تأكيد البريد الإلكتروني
- `POST /api/auth/request-password-reset` - طلب استعادة كلمة المرور
- `POST /api/auth/reset-password` - إعادة تعيين كلمة المرور

### Products APIs
- `GET /api/products` - جلب جميع المنتجات
- `GET /api/products/:id` - جلب منتج بالـ ID
- `GET /api/products/featured` - جلب المنتجات المميزة
- `GET /api/products/search` - البحث في المنتجات

### Categories APIs
- `GET /api/categories` - جلب جميع الفئات
- `GET /api/categories/root` - جلب الفئات الرئيسية
- `GET /api/categories/:id` - جلب فئة بالـ ID

### Cart APIs
- `GET /api/cart` - جلب سلة التسوق
- `POST /api/cart/add` - إضافة منتج للسلة
- `PATCH /api/cart/items/:itemId` - تحديث كمية منتج
- `DELETE /api/cart/items/:itemId` - حذف منتج من السلة

### Orders APIs
- `GET /api/orders/my-orders` - جلب طلبات المستخدم
- `GET /api/orders/:id` - جلب طلب بالـ ID
- `GET /api/orders` - جلب جميع الطلبات (Admin only)

## 🔒 الأمان

التطبيق مؤمن بـ:
- Helmet.js للحماية من هجمات شائعة
- CORS configuration
- JWT tokens مع انتهاء صلاحية
- Password hashing مع bcrypt
- Input validation مع Class Validator
- Rate limiting مع Throttler

## 📧 إعداد البريد الإلكتروني

لتفعيل خدمة البريد الإلكتروني، قم بتحديث الإعدادات في ملف التكوين:

```typescript
email: {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'your-email@gmail.com',
  password: 'your-app-password',
}
```

## 💳 إعداد Stripe

لتفعيل نظام الدفع، أضف مفاتيح Stripe:

```typescript
stripe: {
  publishableKey: 'pk_test_your_stripe_publishable_key',
  secretKey: 'sk_test_your_stripe_secret_key',
}
```

## 📚 التوثيق

- **Swagger UI**: متاح على `/api/docs`
- **GraphQL Playground**: متاح على `/graphql`
- **Postman Collection**: متاح في مجلد `/docs`

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم

للدعم والمساعدة، تواصل معنا على:
- Email: support@elitestore.com
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---
تم تطوير هذا المشروع بـ ❤️ لفريق Elite Store
