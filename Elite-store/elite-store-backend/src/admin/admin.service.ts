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
    // Get recent orders, users, etc.
    const recentOrders = await this.ordersService.findAll();
    const recentUsers = await this.usersService.findAll();
    
    return {
      recentOrders: recentOrders.slice(0, 10),
      recentUsers: recentUsers.slice(0, 10),
    };
  }
}

 