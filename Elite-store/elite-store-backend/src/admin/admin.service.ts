import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class AdminService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private categoriesService: CategoriesService,
  ) {}

  async getDashboardStats() {
    const [userStats, productStats, orderStats] = await Promise.all([
      this.usersService.getStats(),
      this.productsService.getStats(),
      this.ordersService.getStats(),
    ]);

    return {
      users: userStats,
      products: productStats,
      orders: orderStats,
      summary: {
        totalUsers: userStats.total,
        totalProducts: productStats.total,
        totalOrders: orderStats.total,
        totalRevenue: orderStats.totalRevenue,
      },
    };
  }

  async getRecentActivity() {
    const [recentOrders, recentUsers, topProducts, lowStock] = await Promise.all([
      this.ordersService.findAll(),
      this.usersService.findAll(),
      this.productsService.getTopSelling(5),
      this.productsService.getLowStock(10),
    ]);

    return {
      recentOrders: recentOrders.slice(0, 10),
      recentUsers: recentUsers.slice(0, 10),
      topProducts,
      lowStock,
    };
  }

  async getMonthlyRevenue(months: number = 12): Promise<number[]> {
    // naive: sum revenue per month from Orders
    const all = await this.ordersService.findAll();
    const now = new Date();
    const data: number[] = new Array(months).fill(0);
    all.forEach((o: any) => {
      const d = new Date(o.createdAt);
      const diffMonths = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
      if (diffMonths >= 0 && diffMonths < months) {
        data[months - 1 - diffMonths] += Number(o.total || 0);
      }
    });
    return data.map((v) => Math.round(v * 100) / 100);
  }

  async getSalesByPeriod(period: 'daily' | 'weekly' | 'monthly' = 'daily', days: number = 30) {
    const all = await this.ordersService.findAll();
    const now = new Date();
    const data: Array<{ date: string; sales: number; orders: number }> = [];

    // Create date ranges based on period
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      let dateKey: string;
      if (period === 'daily') {
        dateKey = date.toISOString().split('T')[0];
      } else if (period === 'weekly') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        dateKey = weekStart.toISOString().split('T')[0];
      } else {
        dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      // Find orders for this period
      const periodOrders = all.filter((o: any) => {
        const orderDate = new Date(o.createdAt);
        if (period === 'daily') {
          return orderDate.toISOString().split('T')[0] === dateKey;
        } else if (period === 'weekly') {
          const weekStart = new Date(orderDate);
          weekStart.setDate(orderDate.getDate() - orderDate.getDay());
          return weekStart.toISOString().split('T')[0] === dateKey;
        } else {
          return `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}` === dateKey;
        }
      });

      const sales = periodOrders.reduce((sum, o: any) => sum + Number(o.total || 0), 0);
      
      // Avoid duplicates
      const existing = data.find(d => d.date === dateKey);
      if (!existing) {
        data.push({
          date: dateKey,
          sales: Math.round(sales * 100) / 100,
          orders: periodOrders.length
        });
      }
    }

    return data.sort((a, b) => a.date.localeCompare(b.date));
  }

  async getTopCustomers(limit: number = 10) {
    const orders = await this.ordersService.findAll();
    const customerStats = new Map<string, { id: string; name: string; email: string; totalSpent: number; orderCount: number }>();

    orders.forEach((order: any) => {
      if (order.user) {
        const customerId = order.user.id;
        const existing = customerStats.get(customerId);
        
        if (existing) {
          existing.totalSpent += Number(order.total || 0);
          existing.orderCount += 1;
        } else {
          customerStats.set(customerId, {
            id: customerId,
            name: `${order.user.firstName} ${order.user.lastName}`,
            email: order.user.email,
            totalSpent: Number(order.total || 0),
            orderCount: 1
          });
        }
      }
    });

    return Array.from(customerStats.values())
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit)
      .map(customer => ({
        ...customer,
        totalSpent: Math.round(customer.totalSpent * 100) / 100
      }));
  }

  async getSalesByCategory() {
    const orders = await this.ordersService.findAll();
    const categories = await this.categoriesService.findAll();
    const categoryStats = new Map<string, { name: string; sales: number; orders: number }>();

    // Initialize categories
    categories.forEach((cat: any) => {
      categoryStats.set(cat.id, {
        name: cat.name,
        sales: 0,
        orders: 0
      });
    });

    // Add uncategorized
    categoryStats.set('uncategorized', {
      name: 'غير مصنف',
      sales: 0,
      orders: 0
    });

    orders.forEach((order: any) => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          const categoryId = item.product?.categoryId || 'uncategorized';
          const stat = categoryStats.get(categoryId);
          if (stat) {
            stat.sales += Number(item.price || 0) * Number(item.quantity || 1);
            stat.orders += 1;
          }
        });
      }
    });

    return Array.from(categoryStats.values())
      .filter(stat => stat.sales > 0)
      .sort((a, b) => b.sales - a.sales)
      .map(stat => ({
        ...stat,
        sales: Math.round(stat.sales * 100) / 100
      }));
  }

  async getOrderStatusDistribution() {
    const orders = await this.ordersService.findAll();
    const statusCount = new Map<string, number>();

    orders.forEach((order: any) => {
      const status = order.status || 'pending';
      statusCount.set(status, (statusCount.get(status) || 0) + 1);
    });

    const statusLabels = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التسليم',
      cancelled: 'ملغي'
    };

    return Array.from(statusCount.entries()).map(([status, count]) => ({
      status,
      label: statusLabels[status] || status,
      count,
      percentage: Math.round((count / orders.length) * 100)
    }));
  }

  async getPaymentMethodDistribution() {
    const orders = await this.ordersService.findAll();
    const methodCount = new Map<string, number>();

    orders.forEach((order: any) => {
      const method = order.paymentMethod || 'cash';
      methodCount.set(method, (methodCount.get(method) || 0) + 1);
    });

    const methodLabels = {
      cash: 'نقدي',
      card: 'بطاقة ائتمان',
      paypal: 'PayPal',
      bank_transfer: 'تحويل بنكي'
    };

    return Array.from(methodCount.entries()).map(([method, count]) => ({
      method,
      label: methodLabels[method] || method,
      count,
      percentage: Math.round((count / orders.length) * 100)
    }));
  }

  async getSalesGrowth() {
    const currentMonth = new Date();
    const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);

    const orders = await this.ordersService.findAll();
    
    const currentMonthOrders = orders.filter((o: any) => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= currentMonthStart;
    });

    const lastMonthOrders = orders.filter((o: any) => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= lastMonth && orderDate < currentMonthStart;
    });

    const currentMonthSales = currentMonthOrders.reduce((sum, o: any) => sum + Number(o.total || 0), 0);
    const lastMonthSales = lastMonthOrders.reduce((sum, o: any) => sum + Number(o.total || 0), 0);

    const salesGrowth = lastMonthSales > 0 ? 
      Math.round(((currentMonthSales - lastMonthSales) / lastMonthSales) * 100) : 0;

    const ordersGrowth = lastMonthOrders.length > 0 ? 
      Math.round(((currentMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100) : 0;

    return {
      currentMonth: {
        sales: Math.round(currentMonthSales * 100) / 100,
        orders: currentMonthOrders.length
      },
      lastMonth: {
        sales: Math.round(lastMonthSales * 100) / 100,
        orders: lastMonthOrders.length
      },
      growth: {
        sales: salesGrowth,
        orders: ordersGrowth
      }
    };
  }
}

 