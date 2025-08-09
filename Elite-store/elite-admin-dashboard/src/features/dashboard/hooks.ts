import { useQuery } from '@tanstack/react-query';
import { dashboardService } from './service';

// Dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};

// Recent orders
export const useRecentOrders = (limit: number = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-orders', limit],
    queryFn: () => dashboardService.getRecentOrders(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Top selling products
export const useTopProducts = (limit: number = 5) => {
  return useQuery({
    queryKey: ['dashboard', 'top-products', limit],
    queryFn: () => dashboardService.getTopProducts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Low stock products
export const useLowStockProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'low-stock', limit],
    queryFn: () => dashboardService.getLowStockProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Monthly revenue
export const useMonthlyRevenue = (months: number = 12) => {
  return useQuery({
    queryKey: ['dashboard', 'monthly-revenue', months],
    queryFn: () => dashboardService.getMonthlyRevenue(months),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Sales analytics
export const useSalesAnalytics = (period: 'week' | 'month' | 'year' = 'month') => {
  return useQuery({
    queryKey: ['dashboard', 'sales-analytics', period],
    queryFn: () => dashboardService.getSalesAnalytics(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// User analytics
export const useUserAnalytics = (period: 'week' | 'month' | 'year' = 'month') => {
  return useQuery({
    queryKey: ['dashboard', 'user-analytics', period],
    queryFn: () => dashboardService.getUserAnalytics(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
 