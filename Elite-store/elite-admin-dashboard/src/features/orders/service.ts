import { apiService } from '../../services/api';

export interface OrderItemDto {
  id: string;
  productName: string;
  productSku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderDto {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  notes?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt?: string;
  items: OrderItemDto[];
}

export async function fetchOrders(params?: { status?: string; paymentStatus?: string }) {
  return apiService.get<OrderDto[]>('/orders', params);
}

export async function updateOrderStatus(id: string, status: string) {
  return apiService.patch<OrderDto>(`/orders/${id}/status`, { status });
}

export async function updatePaymentStatus(id: string, paymentStatus: string) {
  return apiService.patch<OrderDto>(`/orders/${id}/payment-status`, { paymentStatus });
}


