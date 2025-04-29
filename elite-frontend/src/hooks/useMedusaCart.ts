import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// تعريف واجهات البيانات للسلة
export interface LineItem {
  id: string;
  title: string;
  product_title?: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  thumbnail?: string;
  subtotal: number;
}

export interface Cart {
  id: string;
  items: LineItem[];
  total: number;
  region_id: string;
  shipping_address?: any;
  billing_address?: any;
}

// اختصار لتسهيل الوصول إلى API
const MEDUSA_API = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_API_KEY || 'pk_04a54058c713d71028745b4ac1752fb18abeedc461408c54e5c74d1d70cf47b7';

// تكوين الرؤوس الافتراضية للطلبات
const defaultHeaders = {
  'x-publishable-api-key': PUBLISHABLE_API_KEY,
  'Content-Type': 'application/json'
};

export const useMedusaCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // إنشاء سلة جديدة
  const createCart = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.post(`${MEDUSA_API}/store/carts`, {}, {
        headers: defaultHeaders
      });
      const newCart = response.data.cart;

      // حفظ معرف السلة في localStorage
      localStorage.setItem('medusa_cart_id', newCart.id);

      
      setCart(newCart);
      return newCart;
    } catch (err: any) {
      setError(err);
      console.error('Error creating cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // استرجاع سلة موجودة من localStorage
  const fetchCart = useCallback(async (cartId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${MEDUSA_API}/store/carts/${cartId}`, {
        headers: defaultHeaders
      });
      const fetchedCart = response.data.cart;
      setCart(fetchedCart);
      return fetchedCart;
    } catch (err: any) {
      // إذا كان هناك خطأ (مثل انتهاء صلاحية السلة)، ننشئ سلة جديدة
      console.error('Error fetching cart:', err);
      localStorage.removeItem('medusa_cart_id');
      return await createCart();
    } finally {
      setLoading(false);
    }
  }, [createCart]);

  // إضافة منتج إلى السلة
  const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!cart) {
      const newCart = await createCart();
      if (!newCart) return null;
    }

    const cartId = cart?.id || localStorage.getItem('medusa_cart_id');
    
    if (!cartId) {
      console.error('No cart found');
      return null;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cartId}/line-items`, {
        variant_id: variantId,
        quantity
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error adding item to cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart, createCart]);

  // تحديث كمية منتج في السلة
  const updateItem = useCallback(async (lineItemId: string, quantity: number) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        quantity
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error updating item quantity:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // حذف منتج من السلة
  const removeItem = useCallback(async (lineItemId: string) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.delete(`${MEDUSA_API}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error removing item from cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // بدء عملية الدفع
  const startCheckout = useCallback(async () => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      // تحويل السلة إلى طلب شراء
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/complete`, {}, {
        headers: defaultHeaders
      });
      
      // بعد إتمام الطلب، نحذف معرف السلة من localStorage ونعيد ضبط السلة
      localStorage.removeItem('medusa_cart_id');
      setCart(null);
      
      return response.data.order;
    } catch (err: any) {
      setError(err);
      console.error('Error completing checkout:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // تحديث عنوان الشحن
  const updateShippingAddress = useCallback(async (address: any) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/shipping-address`, {
        address
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error updating shipping address:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // التحقق من وجود السلة عند بدء تشغيل التطبيق
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem('medusa_cart_id');
      
      if (cartId) {
        await fetchCart(cartId);
      } else {
        await createCart();
      }
    };
    
    initializeCart();
  }, [createCart, fetchCart]);

  // إعداد طرق الدفع
  const createPaymentSessions = useCallback(async () => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/payment-sessions`, {}, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error creating payment sessions:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // اختيار طريقة دفع معينة
  const selectPaymentMethod = useCallback(async (providerId: string) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/payment-session`, {
        provider_id: providerId
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error selecting payment method:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // تحديث عنوان الفواتير
  const updateBillingAddress = useCallback(async (address: any) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/billing-address`, {
        address
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error updating billing address:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // الحصول على طرق الشحن المتاحة
  const getShippingOptions = useCallback(async () => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.get(`${MEDUSA_API}/store/shipping-options/${cart.id}`, {
        headers: defaultHeaders
      });
      
      return response.data.shipping_options;
    } catch (err: any) {
      setError(err);
      console.error('Error getting shipping options:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // اختيار طريقة شحن
  const addShippingMethod = useCallback(async (optionId: string) => {
    if (!cart) return null;
    
    try {
      setLoading(true);
      const response = await axios.post(`${MEDUSA_API}/store/carts/${cart.id}/shipping-methods`, {
        option_id: optionId
      }, {
        headers: defaultHeaders
      });
      
      const updatedCart = response.data.cart;
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      setError(err);
      console.error('Error adding shipping method:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return {
    cart,
    loading,
    error,
    createCart,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    startCheckout,
    updateShippingAddress,
    updateBillingAddress,
    createPaymentSessions,
    selectPaymentMethod,
    getShippingOptions,
    addShippingMethod
  };
};

export default useMedusaCart;
