import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully', type: Cart })
  async getUserCart(@CurrentUser() user: User): Promise<Cart> {
    return this.cartService.findUserCart(user.id);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 200, description: 'Item added to cart successfully', type: Cart })
  async addItem(
    @CurrentUser() user: User,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    return this.cartService.addItem(user.id, productId, quantity);
  }

  @Patch('items/:itemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully', type: Cart })
  async updateItemQuantity(
    @CurrentUser() user: User,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    return this.cartService.updateItemQuantity(user.id, itemId, quantity);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully', type: Cart })
  async removeItem(
    @CurrentUser() user: User,
    @Param('itemId') itemId: string,
  ): Promise<Cart> {
    return this.cartService.removeItem(user.id, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  async clearCart(@CurrentUser() user: User): Promise<{ message: string }> {
    return this.cartService.clearCart(user.id);
  }
}

 