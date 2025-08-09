import { useState, useEffect, useCallback } from 'react';
import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo';

// Types
export interface CartLine {
  id: string;
  quantity: number;
  variant: {
    id: string;
    name: string;
    sku?: string;
    product: {
      id: string;
      name: string;
      slug: string;
      thumbnail?: {
        url: string;
        alt?: string;
      };
    };
    pricing?: {
      price?: {
        gross: {
          amount: number;
          currency: string;
        };
      };
    };
  };
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  subtotalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  shippingPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  totalQuantity: number;
  isShippingRequired: boolean;
  availableShippingMethods: Array<{
    id: string;
    name: string;
    price: {
      amount: number;
      currency: string;
    };
  }>;
}

// GraphQL Queries and Mutations
const GET_CHECKOUT = gql`
  query GetCheckout($id: ID!) {
    checkout(id: $id) {
      id
      lines {
        id
        quantity
        variant {
          id
          name
          sku
          product {
            id
            name
            slug
            thumbnail {
              url
              alt
            }
          }
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      totalPrice {
        gross {
          amount
          currency
        }
      }
      subtotalPrice {
        gross {
          amount
          currency
        }
      }
      shippingPrice {
        gross {
          amount
          currency
        }
      }
      totalQuantity
      isShippingRequired
      availableShippingMethods {
        id
        name
        price {
          amount
          currency
        }
      }
    }
  }
`;

const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            sku
            product {
              id
              name
              slug
              thumbnail {
                url
                alt
              }
            }
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          totalPrice {
            gross {
              amount
              currency
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        totalQuantity
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation CheckoutLinesAdd($id: ID!, $lines: [CheckoutLineInput!]!) {
    checkoutLinesAdd(id: $id, lines: $lines) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            sku
            product {
              id
              name
              slug
              thumbnail {
                url
                alt
              }
            }
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          totalPrice {
            gross {
              amount
              currency
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        totalQuantity
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const UPDATE_CART_LINE = gql`
  mutation CheckoutLinesUpdate($id: ID!, $lines: [CheckoutLineUpdateInput!]!) {
    checkoutLinesUpdate(id: $id, lines: $lines) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            sku
            product {
              id
              name
              slug
              thumbnail {
                url
                alt
              }
            }
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          totalPrice {
            gross {
              amount
              currency
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        totalQuantity
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation CheckoutLinesDelete($id: ID!, $linesIds: [ID!]!) {
    checkoutLinesDelete(id: $id, linesIds: $linesIds) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
            sku
            product {
              id
              name
              slug
              thumbnail {
                url
                alt
              }
            }
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          totalPrice {
            gross {
              amount
              currency
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        totalQuantity
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

export const useSaleorCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem('saleor_cart_id');
    if (cartId) {
      fetchCart(cartId);
    }
  }, []);

  // Fetch existing cart
  const fetchCart = useCallback(async (cartId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.query({
        query: GET_CHECKOUT,
        variables: { id: cartId },
        fetchPolicy: 'network-only',
      });

      if (data.checkout) {
        setCart(data.checkout);
      } else {
        // Cart doesn't exist, remove from localStorage
        localStorage.removeItem('saleor_cart_id');
        setCart(null);
      }
    } catch (err: any) {
      console.error('Error fetching cart:', err);
      setError('فشل في جلب السلة');
      // If cart doesn't exist, remove from localStorage
      localStorage.removeItem('saleor_cart_id');
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new cart
  const createCart = useCallback(async (lines: Array<{ variantId: string; quantity: number }> = []) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.mutate({
        mutation: CREATE_CHECKOUT,
        variables: {
          input: {
            channel: 'default-channel', // Default channel
            lines: lines.map(line => ({
              variantId: line.variantId,
              quantity: line.quantity,
            })),
          },
        },
      });

      if (data.checkoutCreate.errors && data.checkoutCreate.errors.length > 0) {
        const errorMessage = data.checkoutCreate.errors[0].message;
        setError(errorMessage);
        return null;
      }

      if (data.checkoutCreate.checkout) {
        const newCart = data.checkoutCreate.checkout;
        localStorage.setItem('saleor_cart_id', newCart.id);
        setCart(newCart);
        return newCart;
      }

      return null;
    } catch (err: any) {
      console.error('Error creating cart:', err);
      setError('فشل في إنشاء السلة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      let currentCart = cart;

      // Create cart if it doesn't exist
      if (!currentCart) {
        currentCart = await createCart([{ variantId, quantity }]);
        return currentCart;
      }

      // Check if item already exists in cart
      const existingLine = currentCart.lines.find(line => line.variant.id === variantId);
      
      if (existingLine) {
        // Update existing line
        return await updateCartLine(existingLine.id, existingLine.quantity + quantity);
      } else {
        // Add new line
        const { data } = await apolloClient.mutate({
          mutation: ADD_TO_CART,
          variables: {
            id: currentCart.id,
            lines: [{ variantId, quantity }],
          },
        });

        if (data.checkoutLinesAdd.errors && data.checkoutLinesAdd.errors.length > 0) {
          const errorMessage = data.checkoutLinesAdd.errors[0].message;
          setError(errorMessage);
          return null;
        }

        if (data.checkoutLinesAdd.checkout) {
          setCart(data.checkoutLinesAdd.checkout);
          return data.checkoutLinesAdd.checkout;
        }
      }

      return null;
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      setError('فشل في إضافة المنتج إلى السلة');
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart, createCart]);

  // Update cart line quantity
  const updateCartLine = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return null;

    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.mutate({
        mutation: UPDATE_CART_LINE,
        variables: {
          id: cart.id,
          lines: [{ id: lineId, quantity }],
        },
      });

      if (data.checkoutLinesUpdate.errors && data.checkoutLinesUpdate.errors.length > 0) {
        const errorMessage = data.checkoutLinesUpdate.errors[0].message;
        setError(errorMessage);
        return null;
      }

      if (data.checkoutLinesUpdate.checkout) {
        setCart(data.checkoutLinesUpdate.checkout);
        return data.checkoutLinesUpdate.checkout;
      }

      return null;
    } catch (err: any) {
      console.error('Error updating cart line:', err);
      setError('فشل في تحديث كمية المنتج');
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart) return null;

    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.mutate({
        mutation: REMOVE_FROM_CART,
        variables: {
          id: cart.id,
          linesIds: [lineId],
        },
      });

      if (data.checkoutLinesDelete.errors && data.checkoutLinesDelete.errors.length > 0) {
        const errorMessage = data.checkoutLinesDelete.errors[0].message;
        setError(errorMessage);
        return null;
      }

      if (data.checkoutLinesDelete.checkout) {
        setCart(data.checkoutLinesDelete.checkout);
        return data.checkoutLinesDelete.checkout;
      }

      return null;
    } catch (err: any) {
      console.error('Error removing from cart:', err);
      setError('فشل في حذف المنتج من السلة');
      return null;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Clear cart
  const clearCart = useCallback(() => {
    localStorage.removeItem('saleor_cart_id');
    setCart(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartLine,
    removeFromCart,
    clearCart,
    clearError,
    createCart,
    fetchCart,
  };
};

export default useSaleorCart;