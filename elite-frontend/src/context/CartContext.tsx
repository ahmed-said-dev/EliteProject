import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMedusaCart, Cart as MedusaCart, LineItem as MedusaLineItem } from '../hooks/useMedusaCart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
  variant_id: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (lineItemId: string) => void;
  updateQuantity: (lineItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  error: Error | null;
  startCheckout: () => Promise<any>;
  cart: MedusaCart | null;
  
  // حالة سلة التسوق
  fetchCart: (cartId: string) => Promise<any>;
  
  // عنوان الشحن والفواتير
  updateShippingAddress: (address: any) => Promise<any>;
  updateBillingAddress: (address: any) => Promise<any>;
  
  // إعدادات الشحن
  getShippingOptions: () => Promise<any>;
  addShippingMethod: (optionId: string) => Promise<any>;
  
  // طرق الدفع
  createPaymentSessions: () => Promise<any>;
  selectPaymentMethod: (providerId: string) => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    startCheckout,
    fetchCart,
    updateShippingAddress,
    updateBillingAddress,
    createPaymentSessions,
    selectPaymentMethod,
    getShippingOptions,
    addShippingMethod
  } = useMedusaCart();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // تحديث حالة UI للسلة عندما تتغير بيانات السلة الحقيقية من API
  useEffect(() => {
    if (cart && cart.items) {
      // تحويل منتجات السلة من API إلى تنسيق واجهة المستخدم
      const items: CartItem[] = cart.items.map(item => ({
        id: item.id,
        name: item.product_title || item.title,
        price: item.unit_price, // عرض السعر كما هو بدون تحويل
        image: item.thumbnail || '',
        quantity: item.quantity,
        variant_id: item.variant_id
      }));
      
      setCartItems(items);
      
      // حساب إجمالي المنتجات
      const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
      setCartCount(itemCount);
      
      // حساب المبلغ الإجمالي
      const total = cart.total ? cart.total / 100 : 0; // تحويل من السنتات إلى الدولارات
      setCartTotal(total);
    } else {
      // في حالة عدم وجود سلة، إعادة تعيين القيم
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);
    }
  }, [cart]);

  // إضافة منتج إلى سلة التسوق عبر Medusa API
  const addToCart = async (product: any, quantity: number = 1) => {
    try {
      // التحقق من وجود متغير للمنتج
      if (!product.variants || product.variants.length === 0) {
        console.error('Product has no variants', product);
        return;
      }
      
      // استخدام أول متغير للمنتج (يمكن تعديل هذا لاختيار المتغير المناسب)
      const variantId = product.original_id 
        ? product.variants[0].id
        : product.variant_id || product.variants[0].id;
        
      // إضافة المنتج إلى السلة باستخدام Medusa API
      await addItem(variantId, quantity);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  // إزالة منتج من سلة التسوق عبر Medusa API
  const removeFromCart = async (lineItemId: string) => {
    try {
      await removeItem(lineItemId);
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  // تحديث كمية منتج في سلة التسوق عبر Medusa API
  const updateQuantity = async (lineItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(lineItemId);
        return;
      }
      
      await updateItem(lineItemId, quantity);
    } catch (err) {
      console.error('Error updating item quantity:', err);
    }
  };

  // إفراغ سلة التسوق بالكامل
  const clearCart = async () => {
    try {
      if (cart && cart.items) {
        // إزالة كل عنصر من السلة بالتتابع
        for (const item of cart.items) {
          await removeItem(item.id);
        }
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      loading,
      error,
      startCheckout,
      cart,
      // جميع وظائف API الجديدة
      fetchCart,
      updateShippingAddress,
      updateBillingAddress,
      createPaymentSessions,
      selectPaymentMethod,
      getShippingOptions,
      addShippingMethod
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
