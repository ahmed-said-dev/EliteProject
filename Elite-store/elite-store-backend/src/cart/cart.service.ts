import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findUserCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { userId, isActive: true },
      relations: ['items', 'items.product', 'items.product.images'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ userId, isActive: true });
      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItem(userId: number, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.findUserCart(userId);
    
    let cartItem = await this.cartItemRepository.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.findUserCart(userId);
  }

  async updateItemQuantity(userId: number, itemId: string, quantity: number): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId },
      relations: ['cart'],
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      await this.cartItemRepository.remove(cartItem);
    } else {
      cartItem.quantity = quantity;
      await this.cartItemRepository.save(cartItem);
    }

    return this.findUserCart(userId);
  }

  async removeItem(userId: number, itemId: string): Promise<Cart> {
    return this.updateItemQuantity(userId, itemId, 0);
  }

  async clearCart(userId: number): Promise<{ message: string }> {
    const cart = await this.findUserCart(userId);
    await this.cartItemRepository.delete({ cartId: cart.id });
    return { message: 'Cart cleared successfully' };
  }
}

 