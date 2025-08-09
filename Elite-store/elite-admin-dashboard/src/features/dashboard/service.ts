import { apiService } from '../../services/api';
import type { DashboardStats, Order, Product } from '../../types';

export const dashboardService = {
  // Get dashboard statistics
  async getStats(): Promise<DashboardStats> {
    const response = await apiService.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  // Get recent orders
  async getRecentOrders(limit: number = 5): Promise<Order[]> {
    const response = await apiService.get<Order[]>(`/orders/recent?limit=${limit}`);
    return response.data;
  },

  // Get top selling products
  async getTopProducts(limit: number = 5): Promise<Product[]> {
    const response = await apiService.get<Product[]>(`/products/top-selling?limit=${limit}`);
    return response.data;
  },

  // Get low stock products
  async getLowStockProducts(limit: number = 10): Promise<Product[]> {
    const response = await apiService.get<Product[]>(`/products/low-stock?limit=${limit}`);
    return response.data;
  },

  // Get monthly revenue data
  async getMonthlyRevenue(months: number = 12): Promise<number[]> {
    const response = await apiService.get<number[]>(`/dashboard/revenue?months=${months}`);
    return response.data;
  },

  // Get sales analytics
  async getSalesAnalytics(period: 'week' | 'month' | 'year' = 'month') {
    const response = await apiService.get(`/dashboard/analytics/sales?period=${period}`);
    return response.data;
  },

  // Get user analytics
  async getUserAnalytics(period: 'week' | 'month' | 'year' = 'month') {
    const response = await apiService.get(`/dashboard/analytics/users?period=${period}`);
    return response.data;
  },
};
 