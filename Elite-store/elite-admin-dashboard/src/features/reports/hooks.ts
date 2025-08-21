import { useQuery } from '@tanstack/react-query';
import { reportsService } from './service';

export const useSalesByPeriod = (period: 'daily' | 'weekly' | 'monthly' = 'daily', days: number = 30) => {
  return useQuery({
    queryKey: ['reports', 'sales', period, days],
    queryFn: () => reportsService.getSalesByPeriod(period, days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTopCustomers = (limit: number = 10) => {
  return useQuery({
    queryKey: ['reports', 'customers', limit],
    queryFn: () => reportsService.getTopCustomers(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSalesByCategory = () => {
  return useQuery({
    queryKey: ['reports', 'categories'],
    queryFn: () => reportsService.getSalesByCategory(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useOrderStatusDistribution = () => {
  return useQuery({
    queryKey: ['reports', 'status-distribution'],
    queryFn: () => reportsService.getOrderStatusDistribution(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePaymentMethodDistribution = () => {
  return useQuery({
    queryKey: ['reports', 'payment-methods'],
    queryFn: () => reportsService.getPaymentMethodDistribution(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSalesGrowth = () => {
  return useQuery({
    queryKey: ['reports', 'growth'],
    queryFn: () => reportsService.getSalesGrowth(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMonthlyRevenue = () => {
  return useQuery({
    queryKey: ['reports', 'monthly-revenue'],
    queryFn: () => reportsService.getMonthlyRevenue(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};





