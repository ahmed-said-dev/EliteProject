import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ObjectType, ID, Int, Float } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
@Entity('cart_items')
export class CartItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column()
  cartId: string;

  @Field(() => Cart)
  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Field()
  @Column()
  productId: string;

  @Field(() => Product)
  @ManyToOne(() => Product, product => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  @Field(() => Float)
  get price(): number {
    return this.product?.finalPrice || 0;
  }

  @Field(() => Float)
  get total(): number {
    return this.price * this.quantity;
  }
}
 