import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/entities/user.entity';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order])
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => [Order])
  async myOrders(@CurrentUser() user: User): Promise<Order[]> {
    return this.ordersService.findUserOrders(user.id);
  }

  @Query(() => Order)
  async order(@Args('id', { type: () => ID }) id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  async updateOrderStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }
}

 