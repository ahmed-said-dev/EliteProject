import { useState, useEffect, useCallback } from 'react';
import { gql } from '@apollo/client';
import { apolloClient } from '../lib/apollo';

// Types
export interface OrderLine {
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
  };
  unitPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  totalPrice: {
    gross: {
      amount: number;
      currency: string;
    };
  };
}

export interface Order {
  id: string;
  number: string;
  created: string;
  updatedAt: string;
  status: string;
  paymentStatus: string;
  statusDisplay: string;
  paymentStatusDisplay: string;
  userEmail?: string;
  isPaid: boolean;
  canFinalize: boolean;
  total: {
    gross: {
      amount: number;
      currency: string;
    };
  };
  subtotal: {
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
  lines: OrderLine[];
  shippingAddress?: {
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2?: string;
    city: string;
    postalCode: string;
    country: {
      code: string;
      country: string;
    };
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2?: string;
    city: string;
    postalCode: string;
    country: {
      code: string;
      country: string;
    };
  };
  fulfillments: Array<{
    id: string;
    status: string;
    trackingNumber?: string;
    lines: Array<{
      id: string;
      quantity: number;
      orderLine: {
        id: string;
        variant: {
          name: string;
          product: {
            name: string;
          };
        };
      };
    }>;
  }>;
}

// GraphQL Queries
const GET_USER_ORDERS = gql`
  query GetUserOrders($first: Int, $after: String) {
    me {
      orders(first: $first, after: $after) {
        edges {
          node {
            id
            number
            created
            updatedAt
            status
            paymentStatus
            statusDisplay
            paymentStatusDisplay
            userEmail
            isPaid
            canFinalize
            total {
              gross {
                amount
                currency
              }
            }
            subtotal {
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
              }
              unitPrice {
                gross {
                  amount
                  currency
                }
              }
              totalPrice {
                gross {
                  amount
                  currency
                }
              }
            }
            shippingAddress {
              firstName
              lastName
              streetAddress1
              streetAddress2
              city
              postalCode
              country {
                code
                country
              }
            }
            billingAddress {
              firstName
              lastName
              streetAddress1
              streetAddress2
              city
              postalCode
              country {
                code
                country
              }
            }
            fulfillments {
              id
              status
              trackingNumber
              lines {
                id
                quantity
                orderLine {
                  id
                  variant {
                    name
                    product {
                      name
                    }
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`;

const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    order(id: $id) {
      id
      number
      created
      updatedAt
      status
      paymentStatus
      statusDisplay
      paymentStatusDisplay
      userEmail
      isPaid
      canFinalize
      total {
        gross {
          amount
          currency
        }
      }
      subtotal {
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
        }
        unitPrice {
          gross {
            amount
            currency
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      shippingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
          country
        }
      }
      billingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country {
          code
          country
        }
      }
      fulfillments {
        id
        status
        trackingNumber
        lines {
          id
          quantity
          orderLine {
            id
            variant {
              name
              product {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  totalCount: number;
  loadMore: () => void;
  refresh: () => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useSaleorOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  // Fetch user orders
  const fetchOrders = useCallback(async (loadMore: boolean = false) => {
    try {
      setLoading(true);
      if (!loadMore) {
        setError(null);
      }

      const { data } = await apolloClient.query({
        query: GET_USER_ORDERS,
        variables: {
          first: 20,
          after: loadMore ? endCursor : undefined,
        },
        fetchPolicy: 'network-only',
      });

      if (data.me?.orders) {
        const newOrders = data.me.orders.edges.map((edge: any) => edge.node);
        
        if (loadMore) {
          setOrders(prev => [...prev, ...newOrders]);
        } else {
          setOrders(newOrders);
        }
        
        setHasNextPage(data.me.orders.pageInfo.hasNextPage);
        setEndCursor(data.me.orders.pageInfo.endCursor);
        setTotalCount(data.me.orders.totalCount || 0);
      } else {
        setOrders([]);
        setHasNextPage(false);
        setTotalCount(0);
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError('فشل في جلب الطلبات');
      if (!loadMore) {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  }, [endCursor]);

  // Load more orders
  const loadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      fetchOrders(true);
    }
  }, [hasNextPage, loading, fetchOrders]);

  // Refresh orders
  const refresh = useCallback(() => {
    setEndCursor(null);
    fetchOrders(false);
  }, [fetchOrders]);

  // Get specific order by ID
  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders(false);
  }, []);

  return {
    orders,
    loading,
    error,
    hasNextPage,
    totalCount,
    loadMore,
    refresh,
    getOrderById,
  };
};

// Hook for single order
export const useSaleorOrder = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await apolloClient.query({
        query: GET_ORDER_BY_ID,
        variables: { id: orderId },
        fetchPolicy: 'network-only',
      });

      setOrder(data.order);
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError('فشل في جلب الطلب');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return {
    order,
    loading,
    error,
    refetch: fetchOrder,
  };
};

// Helper functions for order status
export const getOrderStatusText = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    DRAFT: 'مسودة',
    UNCONFIRMED: 'غير مؤكد',
    UNFULFILLED: 'لم يتم الشحن',
    PARTIALLY_FULFILLED: 'تم الشحن جزئياً',
    FULFILLED: 'تم الشحن',
    CANCELED: 'ملغي',
    PARTIALLY_RETURNED: 'تم الإرجاع جزئياً',
    RETURNED: 'تم الإرجاع',
    EXPIRED: 'منتهي الصلاحية',
  };
  return statusMap[status] || status;
};

export const getPaymentStatusText = (paymentStatus: string): string => {
  const statusMap: { [key: string]: string } = {
    NOT_CHARGED: 'لم يتم الدفع',
    PENDING: 'في الانتظار',
    PARTIALLY_CHARGED: 'تم الدفع جزئياً',
    FULLY_CHARGED: 'تم الدفع بالكامل',
    PARTIALLY_REFUNDED: 'تم الاسترداد جزئياً',
    FULLY_REFUNDED: 'تم الاسترداد بالكامل',
    REFUSED: 'مرفوض',
    CANCELED: 'ملغي',
  };
  return statusMap[paymentStatus] || paymentStatus;
};

export const getFulfillmentStatusText = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    FULFILLED: 'تم الشحن',
    REFUNDED: 'تم الاسترداد',
    RETURNED: 'تم الإرجاع',
    REPLACED: 'تم الاستبدال',
    REFUNDED_AND_RETURNED: 'تم الاسترداد والإرجاع',
    CANCELED: 'ملغي',
    WAITING_FOR_APPROVAL: 'في انتظار الموافقة',
  };
  return statusMap[status] || status;
};

// Helper function to format currency
export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export default useSaleorOrders;