// Elite Store backend API client

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const BASE_URL = process.env.NEXT_PUBLIC_STORE_API_URL || 'http://134.122.102.182:3001/api';

let eliteToken: string | null = null;

export function setEliteToken(token: string | null) {
  eliteToken = token;
  if (typeof window !== 'undefined') {
    if (token) localStorage.setItem('elite_token', token);
    else localStorage.removeItem('elite_token');
  }
}

export function getEliteToken(): string | null {
  if (eliteToken) return eliteToken;
  if (typeof window !== 'undefined') {
    eliteToken = localStorage.getItem('elite_token');
  }
  return eliteToken;
}

async function request<T>(path: string, method: HttpMethod = 'GET', body?: any, params?: Record<string, any>): Promise<T> {
  const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  // Only add auth token for protected endpoints
  if (path.includes('/my-orders') || path.includes('/auth/')) {
    const token = getEliteToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : undefined;
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export const eliteApi = {
  // Auth (optional wiring if needed later)
  login: (email: string, password: string) => request<{ accessToken: string; user: any }>(`/auth/login`, 'POST', { email, password }),
  register: (payload: any) => request(`/auth/register`, 'POST', payload),

  // Cart
  getCart: () => request(`/cart`, 'GET'),
  addToCart: (productId: string, quantity: number) => request(`/cart/add`, 'POST', { productId, quantity }),
  updateCartItem: (itemId: string, quantity: number) => request(`/cart/items/${itemId}`, 'PATCH', { quantity }),
  removeCartItem: (itemId: string) => request(`/cart/items/${itemId}`, 'DELETE'),
  clearCart: () => request<{ message: string }>(`/cart`, 'DELETE'),

  // Payments
  createPaymentIntent: (amount: number, currency = 'usd') => request<{ clientSecret: string }>(`/payments/create-intent`, 'POST', { amount, currency }),

  // Orders
  createOrder: (payload: any) => request(`/orders`, 'POST', payload),
  myOrders: () => request(`/orders/my-orders`, 'GET'),
  getOrderById: (id: string) => request(`/orders/${id}`, 'GET'),
};

export default eliteApi;


