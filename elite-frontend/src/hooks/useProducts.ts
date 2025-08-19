import { useState, useEffect } from 'react';
import axios from 'axios';

export interface ProductVariant {
  id: string;
  title: string;
  prices?: Array<{
    amount: number;
    currency_code: string;
  }>;
  options?: Array<{
    id: string;
    value: string;
    option: {
      id: string;
      title: string;
    };
  }>;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductCollection {
  id: string;
  title: string;
  handle: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  handle: string;
  thumbnail: string;
  is_giftcard: boolean;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  collection?: ProductCollection;
  options?: Array<{
    id: string;
    title: string;
    values: Array<{
      id: string;
      value: string;
    }>;
  }>;
  // هذه الحقول قد لا تكون موجودة في API ولكن نحتاجها في واجهة المستخدم
  price?: number;
  petType?: string;
  productType?: string;
  brand?: string;
  rating?: number;
  availability?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products`, {
        headers: {
          'x-publishable-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
      });
      // تحويل بيانات المنتجات لتناسب واجهة التطبيق
      if (response.data && response.data.products) {
        const mappedProducts = response.data.products.map((product: any) => {
          // استخراج سعر المنتج من أول variant إذا كان موجودًا
          let price = 0;
          if (product.variants && product.variants.length > 0 && 
              product.variants[0].prices && product.variants[0].prices.length > 0) {
            price = product.variants[0].prices[0].amount / 100; // تحويل السعر من السنتات إلى الدولارات
          }
          
          return {
            ...product,
            price,
            image: product.thumbnail,
            // إضافة حقول افتراضية للمنتج إذا لم تكن موجودة
            petType: 'cat', // قيمة افتراضية
            productType: 'food', // قيمة افتراضية
            brand: 'Elite', // قيمة افتراضية
            rating: 4.5, // قيمة افتراضية
            availability: 'In Stock' // قيمة افتراضية
          };
        });
        setProducts(mappedProducts);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};
