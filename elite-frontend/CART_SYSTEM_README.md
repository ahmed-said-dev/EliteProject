# نظام السلة الموحد (Unified Cart System)

## نظرة عامة

تم إنشاء نظام سلة تسوق شامل وموحد يدعم كلاً من منتجات Saleor ومنتجات Elite Store Backend. النظام مصمم بشكل مرن ليتعامل مع مصادر بيانات متعددة بطريقة سلسة.

## المكونات الرئيسية

### 1. UnifiedCartContext (`src/context/UnifiedCartContext.tsx`)
- **الوظيفة**: إدارة حالة السلة الموحدة
- **المميزات**:
  - دعم منتجات من مصادر متعددة (Saleor & Elite Store)
  - حفظ السلة في localStorage تلقائياً
  - إدارة الكميات والأسعار
  - حساب الإجماليات والعدد الكلي
  - دعم المخزون والحد الأقصى للكمية

### 2. UnifiedCartPage (`src/components/CartPage/UnifiedCartPage.tsx`)
- **الوظيفة**: صفحة عرض السلة المحدثة
- **المميزات**:
  - تصميم بنفسجي متناسق مع هوية الموقع
  - عرض المنتجات مع تفاصيلها الكاملة
  - أدوات تحكم في الكمية
  - حساب تفصيلي للأسعار والضرائب والشحن
  - دعم الخصومات والعروض
  - واجهة responsive تتكيف مع الشاشات المختلفة

### 3. StoreProductCard المحدث (`src/components/ProductsSection/StoreProductCard.tsx`)
- **الوظيفة**: كارت المنتج مع إمكانيات السلة
- **المميزات**:
  - زر "أضف للسلة" ديناميكي
  - عرض حالة المنتج في السلة
  - مؤشرات بصرية للمنتجات المضافة
  - دعم حالات التحميل والأخطاء
  - عرض معلومات المخزون

### 4. Header محدث (`src/components/Header/Header.jsx`)
- **الوظيفة**: عرض عداد السلة الموحد
- **المميزات**:
  - عداد موحد يجمع بين Saleor والـ Elite Store
  - تحديث فوري عند إضافة/إزالة المنتجات
  - تصميم متناسق مع باقي الموقع

### 5. صفحة Checkout (`pages/checkout.js`)
- **الوظيفة**: إتمام عملية الطلب
- **المميزات**:
  - نموذج شامل لمعلومات العميل
  - عرض ملخص الطلب
  - دعم طرق دفع متعددة
  - حساب الضرائب والشحن
  - رسائل تأكيد وحالات مختلفة

## طريقة الاستخدام

### 1. إعداد النظام
```javascript
// في _app.js
import { UnifiedCartProvider } from '@/context/UnifiedCartContext';

<UnifiedCartProvider>
  {/* باقي التطبيق */}
</UnifiedCartProvider>
```

### 2. استخدام السلة في المكونات
```javascript
import { useUnifiedCart } from '@/context/UnifiedCartContext';

function MyComponent() {
  const { 
    state, 
    addToCart, 
    updateQuantity, 
    removeFromCart,
    getCartCount,
    getCartTotal,
    isInCart
  } = useUnifiedCart();

  // إضافة منتج للسلة
  const handleAddToCart = () => {
    addToCart({
      name: 'اسم المنتج',
      price: 100,
      salePrice: 80,
      image: '/path/to/image.jpg',
      source: 'elite-store', // أو 'saleor'
      productId: 'product-id',
      stockQuantity: 10,
      // ... باقي البيانات
    }, 1);
  };
}
```

### 3. أنواع البيانات المدعومة

#### CartItem Interface
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
  source: 'saleor' | 'elite-store';
  
  // Saleor specific
  variantId?: string;
  lineId?: string;
  productSlug?: string;
  sku?: string;
  
  // Elite Store specific
  productId?: string;
  stockQuantity?: number;
  category?: {
    id: string;
    name: string;
  };
}
```

## المميزات المتقدمة

### 1. دعم مصادر متعددة
- يمكن للسلة أن تحتوي على منتجات من Saleor و Elite Store في نفس الوقت
- كل منتج يحتفظ بمعلومات مصدره لضمان المعالجة الصحيحة

### 2. الحفظ التلقائي
- تُحفظ السلة تلقائياً في localStorage
- استعادة السلة عند إعادة تحميل الصفحة

### 3. إدارة المخزون
- تحقق من توفر المنتجات
- منع إضافة كميات أكبر من المخزون المتاح
- عرض تحذيرات عند نفاد المخزون

### 4. حساب الأسعار
- دعم الأسعار العادية وأسعار الخصم
- حساب الضرائب والشحن
- خصومات ديناميكية

## الصفحات والمسارات

- `/cart` - صفحة السلة الرئيسية
- `/checkout` - صفحة إتمام الطلب
- `/products` - صفحة المنتجات مع إمكانية الإضافة للسلة

## التخصيص والتطوير

### إضافة مصدر بيانات جديد
1. أضف نوع جديد إلى `source` في `CartItem`
2. حدث `UnifiedCartContext` لدعم المصدر الجديد
3. أضف منطق المعالجة في `addToCart` و functions أخرى

### تخصيص التصميم
- جميع المكونات تستخدم Tailwind CSS
- الألوان الرئيسية: بنفسجي (`purple`) وإنديجو (`indigo`)
- تأثيرات Glass Morphism والـ gradients

## الملفات المتأثرة

1. `pages/_app.js` - إضافة UnifiedCartProvider
2. `src/context/UnifiedCartContext.tsx` - السياق الجديد
3. `src/components/CartPage/UnifiedCartPage.tsx` - صفحة السلة
4. `pages/cart.js` - استخدام المكون الجديد
5. `src/components/ProductsSection/StoreProductCard.tsx` - كارت المنتج المحدث
6. `src/components/Header/Header.jsx` - عداد السلة الموحد
7. `pages/checkout.js` - صفحة إتمام الطلب
8. `pages/products/[slug].js` - صفحة تفاصيل المنتج المحدثة

## المراحل التالية للتطوير

1. **نظام الطلبات الكامل**: إنشاء API endpoints في الباك-إند لإنشاء ومعالجة الطلبات
2. **دفع إلكتروني**: تكامل مع بوابات الدفع مثل Stripe أو PayPal
3. **إشعارات**: نظام إشعارات للطلبات والتحديثات
4. **تتبع الطلبات**: إمكانية تتبع حالة الطلب
5. **مفضلة**: نظام المنتجات المفضلة
6. **مقارنة المنتجات**: إمكانية مقارنة المنتجات
7. **كوبونات الخصم**: نظام كوبونات شامل
8. **تقييمات**: نظام تقييم المنتجات بعد الشراء

## الدعم الفني

للمشاكل والاقتراحات:
- تحقق من console للرسائل التشخيصية
- تأكد من تشغيل الباك-إند على المنفذ الصحيح
- راجع localStorage للتأكد من حفظ السلة

---

تم إنشاء هذا النظام بمعايير عالية من الجودة والمرونة ليدعم نمو المتجر والتوسع المستقبلي.
