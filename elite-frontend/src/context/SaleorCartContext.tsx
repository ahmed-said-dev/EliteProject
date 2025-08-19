import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useSaleorCart, Cart as SaleorCart, CartLine as SaleorCartLine } from '../hooks/useSaleorCart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
  variantId: string;
  productSlug: string;
  sku?: string;
}

interface CartContextType {
  // Cart data
  cart: SaleorCart | null;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  error: string | null;
  
  // Cart actions
  addToCart: (variantId: string, quantity?: number) => Promise<SaleorCart | null>;
  updateQuantity: (lineId: string, quantity: number) => Promise<SaleorCart | null>;
  removeFromCart: (lineId: string) => Promise<SaleorCart | null>;
  clearCart: () => void;
  clearError: () => void;
  
  // Cart management
  createCart: (lines?: Array<{ variantId: string; quantity: number }>) => Promise<SaleorCart | null>;
  fetchCart: (cartId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const saleorCart = useSaleorCart();

  // Convert Saleor cart lines to simplified cart items
  const cartItems: CartItem[] = useMemo(() => {
    if (!saleorCart.cart?.lines) return [];

    return saleorCart.cart.lines.map((line: SaleorCartLine) => ({
      id: line.id,
      name: line.variant.name || line.variant.product.name,
      price: line.variant.pricing?.price?.gross.amount || 0,
      image: line.variant.product.thumbnail?.url || '/placeholder-product.jpg',
      quantity: line.quantity,
      variantId: line.variant.id,
      productSlug: line.variant.product.slug,
      sku: line.variant.sku,
    }));
  }, [saleorCart.cart?.lines]);

  // Calculate cart count (total quantity of all items)
  const cartCount = useMemo(() => {
    return saleorCart.cart?.totalQuantity || 0;
  }, [saleorCart.cart?.totalQuantity]);

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return saleorCart.cart?.totalPrice?.gross.amount || 0;
  }, [saleorCart.cart?.totalPrice]);

  // Add to cart with variant ID
  const addToCart = async (variantId: string, quantity: number = 1): Promise<SaleorCart | null> => {
    return await saleorCart.addToCart(variantId, quantity);
  };

  // Update quantity by line ID
  const updateQuantity = async (lineId: string, quantity: number): Promise<SaleorCart | null> => {
    return await saleorCart.updateCartLine(lineId, quantity);
  };

  // Remove from cart by line ID
  const removeFromCart = async (lineId: string): Promise<SaleorCart | null> => {
    return await saleorCart.removeFromCart(lineId);
  };

  const contextValue: CartContextType = {
    // Cart data
    cart: saleorCart.cart,
    cartItems,
    cartCount,
    cartTotal,
    loading: saleorCart.loading,
    error: saleorCart.error,
    
    // Cart actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart: saleorCart.clearCart,
    clearError: saleorCart.clearError,
    
    // Cart management
    createCart: saleorCart.createCart,
    fetchCart: saleorCart.fetchCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;