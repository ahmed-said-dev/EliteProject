import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types for different product sources
export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
  maxQuantity?: number;
  
  // Source information
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

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

// Cart Actions
type CartAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart Context Type
interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string, source: 'saleor' | 'elite-store') => boolean;
  getCartItem: (productId: string, source: 'saleor' | 'elite-store') => CartItem | undefined;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
      
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && 
               item.source === action.payload.source
      );
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { ...action.payload, id: `${action.payload.source}-${action.payload.productId || action.payload.variantId}` }];
      }
      
      return {
        ...state,
        items: newItems,
        totalQuantity: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: newItems,
        totalQuantity: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: newItems,
        totalQuantity: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: newItems.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0),
      };
    }
    
    case 'CLEAR_CART':
      return { ...initialState };
      
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        totalQuantity: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: action.payload.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0),
      };
      
    default:
      return state;
  }
};

// Create context
const UnifiedCartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const UnifiedCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('unified_cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('unified_cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>, quantity: number = 1) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...item, quantity } as CartItem
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Get total cart value
  const getCartTotal = () => state.totalAmount;

  // Get total item count
  const getCartCount = () => state.totalQuantity;

  // Check if product is in cart
  const isInCart = (productId: string, source: 'saleor' | 'elite-store'): boolean => {
    return state.items.some(item => 
      (item.productId === productId || item.variantId === productId) && 
      item.source === source
    );
  };

  // Get cart item by product ID
  const getCartItem = (productId: string, source: 'saleor' | 'elite-store'): CartItem | undefined => {
    return state.items.find(item => 
      (item.productId === productId || item.variantId === productId) && 
      item.source === source
    );
  };

  const contextValue: CartContextType = {
    state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    getCartItem,
  };

  return (
    <UnifiedCartContext.Provider value={contextValue}>
      {children}
    </UnifiedCartContext.Provider>
  );
};

// Hook to use unified cart
export const useUnifiedCart = (): CartContextType => {
  const context = useContext(UnifiedCartContext);
  if (!context) {
    throw new Error('useUnifiedCart must be used within a UnifiedCartProvider');
  }
  return context;
};

export default UnifiedCartContext;
