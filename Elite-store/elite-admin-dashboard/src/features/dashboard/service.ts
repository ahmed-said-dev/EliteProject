import { apiService } from '../../services/api';
import type { DashboardStats, Order, Product } from '../../types';

export const dashboardService = {
  // Get dashboard statistics (maps /admin/dashboard to DashboardStats shape)
  async getStats(): Promise<DashboardStats> {
    const resp = await apiService.get<any>('/admin/dashboard');
    const d = resp as any;
    const summary = d?.summary || {};
    return {
      totalProducts: summary.totalProducts ?? 0,
      totalOrders: summary.totalOrders ?? 0,
      totalUsers: summary.totalUsers ?? 0,
      totalRevenue: summary.totalRevenue ?? 0,
      monthlyRevenue: [],
      recentOrders: [],
      topProducts: [],
      lowStockProducts: [],
    } as DashboardStats;
  },

  // Get recent orders (from /admin/activity)
  async getRecentOrders(limit: number = 5): Promise<Order[]> {
    const activity = await apiService.get<any>('/admin/activity');
    const items: any[] = (activity as any)?.recentOrders || [];
    const mapped = items.slice(0, limit).map((o: any) => ({
      id: o.id,
      orderNumber: o.orderNumber || o.number || '',
      status: o.status,
      totalAmount: Number(o.totalAmount ?? o.total ?? 0),
      subtotal: Number(o.subtotal ?? 0),
      taxAmount: Number(o.taxAmount ?? 0),
      shippingAmount: Number(o.shippingAmount ?? o.shippingCost ?? 0),
      discountAmount: Number(o.discountAmount ?? 0),
      currency: o.currency || 'EGP',
      paymentStatus: o.paymentStatus,
      paymentMethod: o.paymentMethod,
      shippingAddress: o.shippingAddress || '',
      billingAddress: o.billingAddress || '',
      notes: o.notes,
      userId: o.userId,
      user: o.user || (o.customerFirstName ? { firstName: o.customerFirstName, lastName: o.customerLastName } : undefined),
      items: o.items || [],
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    })) as Order[];
    return mapped;
  },

  // Get top selling products
  async getTopProducts(limit: number = 5): Promise<Product[]> {
    const activity = await apiService.get<any>('/admin/activity');
    const items: Product[] = ((activity as any)?.topProducts || []).slice(0, limit);
    return items as unknown as Product[];
  },

  // Get low stock products
  async getLowStockProducts(limit: number = 10): Promise<Product[]> {
    const activity = await apiService.get<any>('/admin/activity');
    const items: Product[] = ((activity as any)?.lowStock || []).slice(0, limit);
    return items as unknown as Product[];
  },

  // Get monthly revenue data
  async getMonthlyRevenue(months: number = 12): Promise<number[]> {
    const response = await apiService.get<number[]>(`/admin/revenue`);
    return (response as any) as number[];
  },

  // Stubs for analytics (optional)
  async getSalesAnalytics(period: 'week' | 'month' | 'year' = 'month') {
    return { period };
  },

  async getUserAnalytics(period: 'week' | 'month' | 'year' = 'month') {
    return { period };
  },
};
 