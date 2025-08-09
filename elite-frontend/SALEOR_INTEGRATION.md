# 🛒 Saleor Integration Guide

تم استبدال **Medusa** بـ **Saleor** - أقوى منصة ecommerce مفتوحة المصدر!

## 🚀 الميزات الجديدة

### ✨ Saleor Core Features
- **GraphQL API قوي جداً** مع إمكانيات متقدمة
- **Dashboard إداري احترافي** لإدارة المتجر
- **نظام مصادقة متقدم** مع إدارة العملاء
- **إدارة المنتجات والأصناف** المتطورة
- **نظام سلة تسوق ذكي** مع حفظ الحالة
- **إدارة الطلبات وتتبع الشحنات**
- **نظام دفع متقدم** يدعم عدة بوابات
- **نظام خصومات وعروض قوي**
- **دعم متعدد العملات واللغات**

## 🏗️ الهيكل الجديد

### Core Files
```
elite-frontend/
├── src/
│   ├── hooks/
│   │   ├── useSaleorAuth.ts      # مصادقة العملاء
│   │   ├── useSaleorCart.ts      # إدارة سلة التسوق
│   │   ├── useSaleorProducts.ts  # إدارة المنتجات
│   │   └── useSaleorOrders.ts    # إدارة الطلبات
│   ├── context/
│   │   ├── SaleorAuthContext.tsx # Context للمصادقة
│   │   └── SaleorCartContext.tsx # Context لسلة التسوق
│   └── lib/
│       └── apollo.ts             # إعداد Apollo Client
├── saleor.config.js              # إعدادات Saleor
└── .env.local                    # متغيرات البيئة
```

### Saleor Commerce (Backend)
```
elite-commerce/
├── docker-compose.yml            # إعداد Docker
├── backend.env                   # إعدادات Backend
└── common.env                    # إعدادات مشتركة
```

## 🔧 الإعداد

### 1. Saleor Backend (يعمل حالياً ✅)
```bash
cd elite-commerce
docker compose up -d
```

**الخدمات المتاحة:**
- API: http://localhost:8000
- Dashboard: http://localhost:9000
- Jaeger: http://localhost:16686
- Mailpit: http://localhost:8025

**بيانات الدخول للإدارة:**
- البريد: `admin@example.com`
- كلمة المرور: `admin`

### 2. Frontend Setup
```bash
cd elite-frontend
npm install
npm run dev
```

## 📚 كيفية الاستخدام

### 🔐 نظام المصادقة
```typescript
import { useAuth } from '@/context/SaleorAuthContext';

function LoginComponent() {
  const { login, register, user, isAuthenticated } = useAuth();
  
  const handleLogin = async () => {
    const success = await login('user@example.com', 'password');
    if (success) {
      console.log('تم تسجيل الدخول بنجاح');
    }
  };
}
```

### 🛒 إدارة سلة التسوق
```typescript
import { useCart } from '@/context/SaleorCartContext';

function ProductComponent() {
  const { addToCart, cartItems, cartCount, cartTotal } = useCart();
  
  const handleAddToCart = async (variantId: string) => {
    await addToCart(variantId, 1);
  };
}
```

### 📦 المنتجات
```typescript
import { useSaleorProducts, useSaleorProduct } from '@/hooks/useSaleorProducts';

// جلب قائمة المنتجات
function ProductsList() {
  const { products, loading, loadMore } = useSaleorProducts({
    first: 20,
    search: 'keyword',
    categories: ['category-id'],
  });
}

// جلب منتج واحد
function ProductPage({ slug }: { slug: string }) {
  const { product, loading } = useSaleorProduct(slug);
}
```

### 📋 الطلبات
```typescript
import { useSaleorOrders } from '@/hooks/useSaleorOrders';

function OrdersPage() {
  const { orders, loading, loadMore } = useSaleorOrders();
  
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>طلب #{order.number}</h3>
          <p>الحالة: {getOrderStatusText(order.status)}</p>
          <p>المجموع: {formatPrice(order.total.gross.amount)}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 تحديث المكونات الموجودة

### تحديث AuthContext
```typescript
// قديم
import { useAuth } from '@/context/AuthContext';

// جديد
import { useAuth } from '@/context/SaleorAuthContext';
```

### تحديث CartContext
```typescript
// قديم
import { useCart } from '@/context/CartContext';

// جديد  
import { useCart } from '@/context/SaleorCartContext';
```

## 🔄 GraphQL Queries المتاحة

### المنتجات
- `GET_PRODUCTS` - جلب قائمة المنتجات مع فلترة وترتيب
- `GET_PRODUCT_BY_SLUG` - جلب منتج واحد بالتفصيل
- `GET_CATEGORIES` - جلب الأصناف
- `GET_COLLECTIONS` - جلب المجموعات

### سلة التسوق
- `CREATE_CHECKOUT` - إنشاء سلة جديدة
- `GET_CHECKOUT` - جلب سلة موجودة
- `ADD_TO_CART` - إضافة منتج للسلة
- `UPDATE_CART_LINE` - تحديث كمية منتج
- `REMOVE_FROM_CART` - حذف منتج من السلة

### المصادقة
- `LOGIN_MUTATION` - تسجيل الدخول
- `REGISTER_MUTATION` - إنشاء حساب جديد
- `TOKEN_VERIFY_MUTATION` - التحقق من الجلسة
- `USER_QUERY` - جلب بيانات المستخدم

### الطلبات
- `GET_USER_ORDERS` - جلب طلبات المستخدم
- `GET_ORDER_BY_ID` - جلب طلب محدد

## 🌟 المزايا الجديدة

### مقارنة مع Medusa

| الميزة | Medusa | Saleor |
|--------|---------|---------|
| **API** | REST محدود | GraphQL قوي جداً |
| **Dashboard** | بسيط | احترافي ومتقدم |
| **المصادقة** | معقدة | سهلة ومرنة |
| **الأداء** | متوسط | ممتاز |
| **التوثيق** | محدود | شامل ومفصل |
| **المجتمع** | صغير | كبير ونشط |
| **التكامل** | صعب | سهل جداً |

### الإمكانيات الجديدة
- ✅ **Multi-tenant support** - دعم متاجر متعددة
- ✅ **Advanced filtering** - فلترة متقدمة للمنتجات
- ✅ **Real-time updates** - تحديثات فورية
- ✅ **Webhook support** - دعم Webhooks
- ✅ **Plugin system** - نظام إضافات
- ✅ **Advanced SEO** - تحسين محركات البحث
- ✅ **Inventory management** - إدارة المخزون
- ✅ **Gift cards** - بطاقات الهدايا
- ✅ **Promotions engine** - محرك العروض
- ✅ **Analytics** - تحليلات متقدمة

## 🚨 نقاط مهمة

### التحويل من Medusa
1. ✅ تم حذف جميع مكونات Medusa
2. ✅ تم إنشاء hooks جديدة لـ Saleor
3. ✅ تم إعداد Apollo Client
4. ✅ تم إنشاء Context جديد
5. 🔄 **المطلوب:** تحديث المكونات لاستخدام Context الجديد

### الخطوات التالية
1. تحديث صفحات المنتجات لاستخدام `useSaleorProducts`
2. تحديث صفحة تسجيل الدخول لاستخدام `SaleorAuthContext`
3. تحديث سلة التسوق لاستخدام `SaleorCartContext`
4. تحديث صفحات الطلبات لاستخدام `useSaleorOrders`
5. اختبار التكامل الكامل

## 📞 الدعم

في حالة وجود أي مشاكل:
1. تأكد من تشغيل Saleor: `docker compose ps`
2. تحقق من الـ logs: `docker compose logs api`
3. تأكد من المتغيرات البيئية في `saleor.config.js`

---

**🎉 مبروك! لديك الآن أقوى منصة ecommerce للعمل معها!** 🎉