import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PageBanner from '@/components/PageBanner/PageBanner';
import ProductDetail from '@/components/ProductDetail';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (id) {
      // تعيين حالة التحميل
      setLoading(true);
      
      // جلب بيانات المنتج من Medusa API
      // استخدام معرف المنتج كما هو دون تعديله
      axios.get(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products/${id}`, {
        headers: {
          'x-publishable-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
      })
      .then(res => {
        if (res.data && res.data.product) {
          // تحويل بيانات المنتج من API إلى التنسيق المطلوب لمكون ProductDetail
          const apiProduct = res.data.product;
          
          // استخراج سعر المنتج من أول متغير إذا كان متوفراً
          let price = 0;
          let salePrice = undefined;
          
          if (apiProduct.variants && apiProduct.variants.length > 0 && 
              apiProduct.variants[0].prices && apiProduct.variants[0].prices.length > 0) {
            price = apiProduct.variants[0].prices[0].amount / 100;
            
            // تطبيق خصم عشوائي لبعض المنتجات (يمكن تعديله حسب البيانات الفعلية)
            if (Math.random() > 0.7) {
              salePrice = price * 0.85;
            }
          }
          
          // استخراج الصورة
          const image = apiProduct.images && apiProduct.images.length > 0 
            ? apiProduct.images[0].url 
            : apiProduct.thumbnail;
          
          // تجهيز التقييم والبيانات الأخرى
          const rating = 4.5; // قيمة افتراضية للتقييم
          const reviewCount = Math.floor(Math.random() * 100) + 5; // عدد عشوائي للمراجعات
          
          // تحويل البيانات إلى التنسيق المطلوب
          const formattedProduct = {
            id: Number(apiProduct.id.replace('prod_', '')) || 0,
            original_id: apiProduct.id, // إضافة معرف API الأصلي
            name: apiProduct.title,
            price: price,
            salePrice: salePrice,
            description: apiProduct.description || apiProduct.subtitle || '',
            image: image,
            rating: rating,
            reviewCount: reviewCount,
            petType: 'cat', // قيمة افتراضية
            productType: 'food', // قيمة افتراضية
            brand: 'Elite', // قيمة افتراضية
            inStock: true, // قيمة افتراضية
            soldCount: Math.floor(Math.random() * 200) + 10, // قيمة عشوائية
            releaseDate: apiProduct.created_at || new Date().toISOString(),
            isBestSeller: Math.random() > 0.7, // قيمة عشوائية
            isNew: apiProduct.created_at 
              ? new Date(apiProduct.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
              : Math.random() > 0.8, // منتج جديد إذا تم إنشاؤه في آخر 30 يوم
            isSale: salePrice !== undefined, // يعتبر في حالة بيع إذا كان له سعر خصم
            
            // إضافة متغيرات المنتج المطلوبة لسلة التسوق
            variants: apiProduct.variants || [{
              id: apiProduct.variants && apiProduct.variants.length > 0 
                ? apiProduct.variants[0].id 
                : `variant_${apiProduct.id}`,
              title: apiProduct.title,
              prices: [{
                amount: price * 100,
                currency_code: 'USD'
              }]
            }]
          };
          
          setProduct(formattedProduct);
          setError(null);
        } else {
          // لم يتم العثور على المنتج
          setError('Product not found');
          setProduct(null);
        }
      })
      .catch(err => {
        console.error('Error fetching product data:', err);
        setError(err.message || 'Failed to load product');
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, [id]);
  
  // Mostrar un estado de carga mientras se obtienen los datos
  if (loading) {
    return (
      <main>
        <PageBanner 
          title="Loading Product..."
          backgroundImage="/images/banner/bnr1.webp"
        />
        <div className="container mx-auto py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }
  
  // Si no se encuentra el producto
  if (!product) {
    return (
      <main>
        <PageBanner 
          title="Product Not Found"
          backgroundImage="/images/banner/bnr1.webp"
        />
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Sorry, the product you're looking for could not be found</h2>
          <button 
            onClick={() => router.push('/products')}
            className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
          >
            Browse All Products
          </button>
        </div>
      </main>
    );
  }
  
  return (
    <main>
      <PageBanner 
        title={product.name}
        backgroundImage="/images/banner/bnr1.webp"
      />
      <ProductDetail product={product} />
    </main>
  );
}
