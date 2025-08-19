import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Cart)
@UseGuards(JwtAuthGuard)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => Cart)
  async myCart(@CurrentUser() user: User): Promise<Cart> {
    return this.cartService.findUserCart(user.id);
  }

  @Mutation(() => Cart)
  async addToCart(
    @CurrentUser() user: User,
    @Args('productId') productId: string,
    @Args('quantity') quantity: number,
  ): Promise<Cart> {
    return this.cartService.addItem(user.id, productId, quantity);
  }

  @Mutation(() => Cart)
  async updateCartItem(
    @CurrentUser() user: User,
    @Args('itemId') itemId: string,
    @Args('quantity') quantity: number,
  ): Promise<Cart> {
    return this.cartService.updateItemQuantity(user.id, itemId, quantity);
  }

  @Mutation(() => String)
  async clearCart(@CurrentUser() user: User): Promise<string> {
    const result = await this.cartService.clearCart(user.id);
    return result.message;
  }
}

 