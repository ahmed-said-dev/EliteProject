import { apiService } from '../../services/api';

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orderCount: number;
}

export interface CategorySales {
  name: string;
  sales: number;
  orders: number;
}

export interface StatusDistribution {
  status: string;
  label: string;
  count: number;
  percentage: number;
}

export interface PaymentMethodDistribution {
  method: string;
  label: string;
  count: number;
  percentage: number;
}

export interface SalesGrowth {
  currentMonth: {
    sales: number;
    orders: number;
  };
  lastMonth: {
    sales: number;
    orders: number;
  };
  growth: {
    sales: number;
    orders: number;
  };
}

export const reportsService = {
  getSalesByPeriod: async (period: 'daily' | 'weekly' | 'monthly' = 'daily', days: number = 30): Promise<SalesData[]> => {
    const response = await apiService.get(`/admin/analytics/sales?period=${period}&days=${days}`);
    return response as SalesData[];
  },

  getTopCustomers: async (limit: number = 10): Promise<TopCustomer[]> => {
    const response = await apiService.get(`/admin/analytics/customers?limit=${limit}`);
    return response as TopCustomer[];
  },

  getSalesByCategory: async (): Promise<CategorySales[]> => {
    const response = await apiService.get('/admin/analytics/categories');
    return response as CategorySales[];
  },

  getOrderStatusDistribution: async (): Promise<StatusDistribution[]> => {
    const response = await apiService.get('/admin/analytics/orders-status');
    return response as StatusDistribution[];
  },

  getPaymentMethodDistribution: async (): Promise<PaymentMethodDistribution[]> => {
    const response = await apiService.get('/admin/analytics/payment-methods');
    return response as PaymentMethodDistribution[];
  },

  getSalesGrowth: async (): Promise<SalesGrowth> => {
    const response = await apiService.get('/admin/analytics/growth');
    return response as SalesGrowth;
  },

  getMonthlyRevenue: async (): Promise<number[]> => {
    const response = await apiService.get('/admin/revenue');
    return response as number[];
  }
};







