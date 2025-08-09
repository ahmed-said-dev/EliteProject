# Elite Veterinary Product Filters System

نظام فلاتر المنتجات المتقدم للمشروع البيطري مع دعم العربية والإنجليزية

## 🎯 المميزات الرئيسية

### 🔍 نظام فلترة شامل:
- **فلتر الفئات**: تصفح هرمي للفئات مع عداد المنتجات
- **فلتر العلامات التجارية**: بحث وتحديد العلامات التجارية
- **فلتر نطاق السعر**: منزلق مزدوج لتحديد نطاق الأسعار
- **فلتر حالة المخزون**: فلترة حسب توفر المنتجات
- **فلتر التصنيفات**: تصنيفات إضافية للمنتجات

### 🌍 دعم التوطين:
- **العربية والإنجليزية**: واجهة كاملة بكلا اللغتين
- **RTL Support**: دعم كامل للكتابة من اليمين لليسار
- **أسماء محلية**: أسماء المنتجات والفئات بالعربية

### 📱 تصميم متجاوب:
- **Mobile First**: مُحسن للهواتف المحمولة
- **Desktop Experience**: تجربة مميزة على الحاسوب
- **Touch Friendly**: واجهة سهلة اللمس

---

## 🚀 كيفية التشغيل

### 1. إعداد Vendure Backend:

```bash
# انتقل لمجلد elite-commerce
cd elite-commerce

# تثبيت المتطلبات
npm install

# بناء المشروع
npm run build

# تشغيل السيرفر
npm run dev
```

### 2. إعداد Elite Store (Medusa):

```bash
# انتقل لمجلد elite-store
cd elite-store

# تثبيت المتطلبات
npm install

# تشغيل السيرفر
npm run dev
```

### 3. إعداد Frontend:

```bash
# انتقل لمجلد elite-frontend
cd elite-frontend

# تثبيت المتطلبات
npm install

# تشغيل السيرفر
npm run dev
```

---

## 📂 هيكل المشروع

```
elite-frontend/
├── src/
│   ├── components/filters/           # مكونات الفلاتر
│   │   ├── ProductFilters.tsx       # المكون الرئيسي للفلاتر
│   │   ├── CategoryFilter.tsx       # فلتر الفئات
│   │   ├── BrandFilter.tsx          # فلتر العلامات التجارية
│   │   ├── PriceRangeFilter.tsx     # فلتر نطاق السعر
│   │   ├── TagFilter.tsx            # فلتر التصنيفات
│   │   ├── StockFilter.tsx          # فلتر حالة المخزون
│   │   ├── ProductSort.tsx          # ترتيب المنتجات
│   │   ├── ProductResults.tsx       # عرض النتائج
│   │   └── index.ts                 # تصدير المكونات
│   ├── utils/vendure/               # أدوات Vendure API
│   │   ├── client.ts                # عميل GraphQL
│   │   ├── queries.ts               # استعلامات GraphQL
│   │   ├── types.ts                 # أنواع TypeScript
│   │   └── hooks.ts                 # React Hooks
│   ├── styles/
│   │   └── range-slider.css         # تنسيقات منزلق النطاق
│   └── app/products/
│       └── page.tsx                 # صفحة المنتجات الرئيسية

elite-commerce/
├── src/plugins/product-filter/      # إضافة Vendure للفلاتر
│   ├── types.ts                     # أنواع البيانات
│   ├── services/                    # خدمات البيانات
│   ├── api/                         # GraphQL API
│   └── product-filter.plugin.ts     # الإضافة الرئيسية
```

---

## 🔧 كيفية الاستخدام

### 1. استخدام مكونات الفلاتر:

```tsx
import {
  ProductFilters,
  ProductSort,
  ProductResults,
  useFilteredProducts
} from '@/components/filters';

function ProductsPage() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name_ASC');

  const { products, loading } = useFilteredProducts(
    { take: 12, skip: 0 },
    filters,
    'en'
  );

  return (
    <div>
      <ProductFilters
        onFilterChange={setFilters}
        language="ar"
      />
      
      <ProductSort
        currentSort={sortBy}
        onSortChange={setSortBy}
        language="ar"
      />
      
      <ProductResults
        products={products}
        loading={loading}
        language="ar"
        pagination={{ page: 1, limit: 12, total: 100 }}
        onPageChange={() => {}}
      />
    </div>
  );
}
```

### 2. استخدام Hooks:

```tsx
import { useProductFilters, useFilteredProducts } from '@/components/filters';

function MyComponent() {
  // جلب الفلاتر المتاحة
  const { filters, loading } = useProductFilters('electronics', 'ar');
  
  // جلب المنتجات المفلترة
  const { products, totalItems } = useFilteredProducts(
    { take: 20 },
    { categoryIds: ['1'], minPrice: 100 },
    'ar'
  );
}
```

### 3. تخصيص اللغة:

```tsx
// تغيير اللغة للعربية
<ProductFilters language="ar" />

// تغيير اللغة للإنجليزية  
<ProductFilters language="en" />
```

---

## 🛠️ التخصيص والإعدادات

### 1. إضافة فلتر جديد:

```tsx
// إنشاء مكون فلتر جديد
function CustomFilter({ onFilterChange, language }) {
  return (
    <div>
      {/* مكون الفلتر المخصص */}
    </div>
  );
}

// إضافته للفلاتر الرئيسية
<ProductFilters
  customFilters={[CustomFilter]}
  onFilterChange={setFilters}
/>
```

### 2. تخصيص التصميم:

```css
/* تخصيص ألوان الفلاتر */
.filter-container {
  --primary-color: #3B82F6;
  --secondary-color: #64748B;
}

/* تخصيص للغة العربية */
[dir="rtl"] .filter-item {
  text-align: right;
}
```

### 3. إضافة ترجمات جديدة:

```tsx
const translations = {
  ar: {
    categories: 'الفئات',
    brands: 'العلامات التجارية',
    priceRange: 'نطاق السعر'
  },
  en: {
    categories: 'Categories',
    brands: 'Brands',
    priceRange: 'Price Range'
  }
};
```

---

## 🔌 API Endpoints

### GraphQL Queries المتاحة:

```graphql
# جلب الفلاتر المتاحة
query GetProductFilters($languageCode: LanguageCode) {
  productFilters(languageCode: $languageCode) {
    categories { id name nameAr count }
    brands { id name nameAr count }
    priceRange { min max currency }
    stockStatus { inStock outOfStock lowStock }
    tags { id name nameAr count }
  }
}

# جلب المنتجات المفلترة
query GetFilteredProducts($input: SearchInput!, $filters: ProductFilterInput) {
  filteredProducts(input: $input, filters: $filters) {
    items {
      productId
      productName
      price { min max }
      productAsset { preview }
    }
    totalItems
    facetValues {
      facetValue { name }
      count
    }
  }
}

# جلب خيارات الترتيب
query GetSortOptions($languageCode: LanguageCode) {
  sortOptions(languageCode: $languageCode) {
    key
    value
    nameEn
    nameAr
  }
}
```

---

## 🌐 متغيرات البيئة المطلوبة

### Frontend (.env.local):
```env
NEXT_PUBLIC_VENDURE_API_URL=http://localhost:3000/shop-api
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SUPPORTED_LANGUAGES=en,ar
```

### Vendure (.env):
```env
APP_ENV=dev
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elite_commerce
SUPERADMIN_USERNAME=admin@elite.com
SUPERADMIN_PASSWORD=admin123
COOKIE_SECRET=elite_commerce_cookie_secret_2024
```

### Medusa (.env):
```env
DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/elite_medusa_store
STORE_CORS=http://localhost:3000,http://localhost:3001
ADMIN_CORS=http://localhost:3000,http://localhost:7001,http://localhost:9000
AUTH_CORS=http://localhost:3000,http://localhost:7001,http://localhost:9000
JWT_SECRET=elite_vet_jwt_secret_key_2024
COOKIE_SECRET=elite_vet_cookie_secret_key_2024
PORT=9000
NODE_ENV=development
```

---

## 🎨 مميزات UI/UX

### 🎯 تجربة مستخدم محسنة:
- **تحديث فوري**: تحديث النتائج فور تغيير الفلاتر
- **مؤشرات التحميل**: عرض حالة التحميل للمستخدم
- **حفظ الحالة**: حفظ الفلاتر المحددة في URL
- **رسائل خطأ واضحة**: عرض رسائل خطأ مفهومة

### 📱 للأجهزة المحمولة:
- **فلاتر منبثقة**: فلاتر في نافذة منبثقة للهواتف
- **أزرار كبيرة**: أزرار سهلة اللمس
- **قوائم قابلة للطي**: توفير مساحة الشاشة

### 🖥️ للحاسوب:
- **شريط جانبي**: فلاتر في شريط جانبي ثابت
- **معاينة سريعة**: معاينة سريعة للمنتجات
- **اختصارات لوحة المفاتيح**: تنقل سريع

---

## 🔍 نصائح للتطوير

### 1. إضافة بيانات تجريبية:
```bash
# إضافة منتجات تجريبية
npm run seed:products

# إضافة فئات تجريبية  
npm run seed:categories
```

### 2. تشخيص الأخطاء:
```tsx
// تفعيل وضع التشخيص
const { products, error } = useFilteredProducts(input, filters, 'en');
console.log('Products:', products);
console.log('Error:', error);
```

### 3. اختبار الأداء:
```tsx
// قياس وقت الاستجابة
const startTime = performance.now();
const result = await queryVendure(query, variables);
console.log(`Query took ${performance.now() - startTime}ms`);
```

---

## 📞 الدعم الفني

للحصول على المساعدة:
1. راجع الوثائق أعلاه
2. تحقق من ملفات الأمثلة في المشروع
3. ابحث في Issues على GitHub
4. اتصل بفريق التطوير

---

## 🎉 اكتمل النظام!

تم إنشاء نظام فلاتر متكامل مع:
- ✅ دعم العربية والإنجليزية
- ✅ فلاتر متقدمة (فئات، علامات تجارية، أسعار، مخزون)
- ✅ تصميم متجاوب وأنيق
- ✅ أداء محسن وسريع
- ✅ سهولة التخصيص والتطوير

**استمتع بتطوير متجرك البيطري! 🐾**