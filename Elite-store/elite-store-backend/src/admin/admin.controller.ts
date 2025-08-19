import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics (Admin only)' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics retrieved successfully' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get recent activity (Admin only)' })
  @ApiResponse({ status: 200, description: 'Recent activity retrieved successfully' })
  async getRecentActivity() {
    return this.adminService.getRecentActivity();
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get monthly revenue array (Admin only)' })
  @ApiResponse({ status: 200, description: 'Monthly revenue retrieved successfully' })
  async getMonthlyRevenue() {
    return this.adminService.getMonthlyRevenue(12);
  }

  @Get('analytics/sales')
  @ApiOperation({ summary: 'Get sales by period (Admin only)' })
  @ApiQuery({ name: 'period', enum: ['daily', 'weekly', 'monthly'], required: false })
  @ApiQuery({ name: 'days', type: Number, required: false })
  @ApiResponse({ status: 200, description: 'Sales data retrieved successfully' })
  async getSalesByPeriod(
    @Query('period') period: 'daily' | 'weekly' | 'monthly' = 'daily',
    @Query('days') days: number = 30
  ) {
    return this.adminService.getSalesByPeriod(period, days);
  }

  @Get('analytics/customers')
  @ApiOperation({ summary: 'Get top customers (Admin only)' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiResponse({ status: 200, description: 'Top customers retrieved successfully' })
  async getTopCustomers(@Query('limit') limit: number = 10) {
    return this.adminService.getTopCustomers(limit);
  }

  @Get('analytics/categories')
  @ApiOperation({ summary: 'Get sales by category (Admin only)' })
  @ApiResponse({ status: 200, description: 'Sales by category retrieved successfully' })
  async getSalesByCategory() {
    return this.adminService.getSalesByCategory();
  }

  @Get('analytics/orders-status')
  @ApiOperation({ summary: 'Get order status distribution (Admin only)' })
  @ApiResponse({ status: 200, description: 'Order status distribution retrieved successfully' })
  async getOrderStatusDistribution() {
    return this.adminService.getOrderStatusDistribution();
  }

  @Get('analytics/payment-methods')
  @ApiOperation({ summary: 'Get payment method distribution (Admin only)' })
  @ApiResponse({ status: 200, description: 'Payment method distribution retrieved successfully' })
  async getPaymentMethodDistribution() {
    return this.adminService.getPaymentMethodDistribution();
  }

  @Get('analytics/growth')
  @ApiOperation({ summary: 'Get sales growth data (Admin only)' })
  @ApiResponse({ status: 200, description: 'Sales growth data retrieved successfully' })
  async getSalesGrowth() {
    return this.adminService.getSalesGrowth();
  }
}

 